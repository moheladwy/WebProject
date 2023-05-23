from django.db import models


# Create your models here.
class Employee(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )

    MARITAL_STATUS_CHOICES = (
        ('S', 'Single'),
        ('M', 'Married'),
    )

    id = models.IntegerField(default=20230000, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(default="mail@gmail.com")
    phoneNumber = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    gender = models.CharField(
        max_length=1, choices=GENDER_CHOICES, default='M')
    maritalStatus = models.CharField(
        max_length=1, choices=MARITAL_STATUS_CHOICES, null=True)
    availableVacationDays = models.IntegerField(default=0)
    approvedVacationDays = models.IntegerField(default=0)
    salary = models.IntegerField()
    birthDay = models.DateField(null=True)

    def __str__(self) -> str:
        return f"Employee: {self.name}"
    


class Vacation(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('A', 'Approved'),
        ('R', 'Rejected'),
    )
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name='vacation')
    startDate = models.DateField()
    endDate = models.DateField()
    vacationReason = models.TextField()
    status = models.CharField(
        max_length=1, choices=STATUS_CHOICES, default='P')

    def __str__(self) -> str:
        return f"{self.employee} wants to take a vacation from {self.startDate} to {self.endDate}."
