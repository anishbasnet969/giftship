# Generated by Django 4.0.1 on 2022-01-28 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='picture',
            field=models.ImageField(default='defaultgiftlogo.png', upload_to='product_images'),
        ),
    ]
