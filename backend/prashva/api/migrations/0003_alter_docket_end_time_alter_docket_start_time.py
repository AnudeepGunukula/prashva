# Generated by Django 4.2.6 on 2023-10-18 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_dockets_docket'),
    ]

    operations = [
        migrations.AlterField(
            model_name='docket',
            name='end_time',
            field=models.TimeField(),
        ),
        migrations.AlterField(
            model_name='docket',
            name='start_time',
            field=models.TimeField(),
        ),
    ]
