# Generated by Django 4.2.1 on 2023-05-21 06:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HumanResources', '0004_alter_vacation_employeeid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='vacation',
            old_name='employeeID',
            new_name='employee',
        ),
        migrations.AddField(
            model_name='vacation',
            name='status',
            field=models.CharField(choices=[('P', 'Pending'), ('A', 'Approved'), ('R', 'Rejected')], default='P', max_length=1),
        ),
    ]
