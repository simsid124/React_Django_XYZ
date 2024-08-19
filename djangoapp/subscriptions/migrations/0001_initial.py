# Generated by Django 5.1 on 2024-08-17 17:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customer_id', models.CharField(max_length=20, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('pan', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=50, unique=True)),
                ('description', models.TextField()),
                ('annual_subscription_cost_per_user', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subscription_start_date', models.DateField()),
                ('subscription_end_date', models.DateField()),
                ('no_of_users_subscribed', models.IntegerField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subscriptions.customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subscriptions.product')),
            ],
        ),
    ]
