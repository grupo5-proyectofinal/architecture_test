# Generated by Django 5.1 on 2024-09-09 23:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pool', '0007_productoimagen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pool',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pools', to='pool.producto'),
        ),
    ]