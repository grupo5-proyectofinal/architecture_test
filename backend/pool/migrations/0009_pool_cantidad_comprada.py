# Generated by Django 5.1 on 2024-09-17 21:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pool', '0008_alter_pool_producto'),
    ]

    operations = [
        migrations.AddField(
            model_name='pool',
            name='cantidad_comprada',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
