import uuid
from django.core.management.base import BaseCommand
from subscriptions.models import Customer, Product, Subscription
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Populate the database with dummy data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        # Clear existing data
        Customer.objects.all().delete()
        Product.objects.all().delete()
        Subscription.objects.all().delete()
        
        # Create dummy products
        products = [
            Product(product_name=fake.unique.word(), description=fake.text(), annual_subscription_cost_per_user=random.uniform(10, 100))
            for _ in range(5)
        ]
        Product.objects.bulk_create(products)
        
        # Create dummy customers
        customers = [
            Customer(customer_id=uuid.uuid4().hex[:8], name=fake.name(), pan=fake.bothify(text='??######??'))
            for _ in range(10)
        ]
        Customer.objects.bulk_create(customers)
        
        # Create dummy subscriptions
        subscriptions = [
            Subscription(
                customer=random.choice(customers),
                product=random.choice(products),
                subscription_start_date=fake.date_this_year(),
                subscription_end_date=fake.date_this_year(),
                no_of_users_subscribed=random.randint(1, 10)
            )
            for _ in range(15)
        ]
        Subscription.objects.bulk_create(subscriptions)
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the database with dummy data.'))
