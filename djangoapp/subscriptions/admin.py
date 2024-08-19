from django.contrib import admin
from .models import Customer, Product, Subscription

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('customer_id', 'name', 'pan')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name', 'description', 'annual_subscription_cost_per_user')

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('customer', 'product', 'subscription_start_date', 'subscription_end_date', 'no_of_users_subscribed')
