# Generated by Django 3.2.8 on 2022-02-02 23:06

from django.db import migrations, models
import django_mysql.models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='instructor',
            field=django_mysql.models.ListTextField(models.PositiveSmallIntegerField(), blank=True, null=True, size=100),
        ),
        migrations.AlterField(
            model_name='classes',
            name='sections',
            field=django_mysql.models.ListTextField(models.PositiveSmallIntegerField(), blank=True, null=True, size=100),
        ),
        migrations.AlterField(
            model_name='item',
            name='available',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='item',
            name='out',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='item',
            name='total',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
