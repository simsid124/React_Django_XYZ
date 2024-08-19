from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomerViewSet,
    ProductViewSet,
    SubscriptionViewSet,
    revenue_report,
    list_subscriptions,
    extend_subscription,
)

router = DefaultRouter()
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'subscriptions', SubscriptionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/revenue/', revenue_report, name='revenue_report'),
    path('api/subscriptions/list/', list_subscriptions, name='list_subscriptions'),
    path('api/subscriptions/extend/<int:pk>/', extend_subscription, name='extend_subscription'),
]
