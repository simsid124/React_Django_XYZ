from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Customer, Product, Subscription
from .serializers import CustomerSerializer, ProductSerializer, SubscriptionSerializer
from rest_framework import status
from datetime import date

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            customer_id = request.data.get('customer')
            product_id = request.data.get('product')
            start_date = request.data.get('start_date')
            end_date = request.data.get('end_date')
            no_of_users = request.data.get('no_of_users')

            if not customer_id or not product_id or not start_date or not end_date or not no_of_users:
                return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                import datetime
                datetime.datetime.strptime(start_date, '%Y-%m-%d')
                datetime.datetime.strptime(end_date, '%Y-%m-%d')
            except ValueError:
                return Response({'error': 'Invalid date format. Use YYYY-MM-DD'}, status=status.HTTP_400_BAD_REQUEST)

            customer = Customer.objects.get(id=customer_id)
            product = Product.objects.get(id=product_id)
            subscription = Subscription(
                customer=customer,
                product=product,
                subscription_start_date=start_date,
                subscription_end_date=end_date,
                no_of_users_subscribed=no_of_users
            )
            subscription.save()

            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_201_CREATED)

        except Customer.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    def partial_update(self, request, *args, **kwargs):
        subscription = self.get_object()
        end_date = request.data.get('end_date')

        if end_date:
            subscription.subscription_end_date = end_date
            subscription.save()
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_200_OK)
        
        return Response({'error': 'End date is required'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        subscription = self.get_object()
        end_date = request.data.get('end_date')

        if end_date:
            subscription.subscription_end_date = end_date
            subscription.save()
            return Response(SubscriptionSerializer(subscription).data, status=status.HTTP_200_OK)
        
        return Response({'error': 'End date is required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_subscriptions(request):
    subscriptions = Subscription.objects.all()
    serializer = SubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def extend_subscription(request, pk):
    try:
        subscription = Subscription.objects.get(pk=pk)
        new_end_date = request.GET.get('end_date')

        if new_end_date:
            subscription.subscription_end_date = new_end_date
            subscription.save()
            return Response({'message': 'Subscription extended successfully!'}, status=status.HTTP_200_OK)
        
        return Response({'error': 'New end date is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    except Subscription.DoesNotExist:
        return Response({'error': 'Subscription not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def revenue_report(request):
    try:
        subscriptions = Subscription.objects.all()
        total_revenue = sum(
            sub.product.annual_subscription_cost_per_user * sub.no_of_users_subscribed
            for sub in subscriptions
        )
        return Response({'revenue': total_revenue}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
