# Generated by Django 4.2.1 on 2023-05-21 04:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HumanResources', '0002_alter_employee_salary'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Vacations',
            new_name='Vacation',
        ),
        migrations.AlterField(
            model_name='employee',
            name='email',
            field=models.EmailField(default='mail@gmail.com', max_length=254),
        ),
    ]
