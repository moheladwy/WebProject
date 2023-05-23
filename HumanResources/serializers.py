from rest_framework import serializers
from .models import *


class EmployeeSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Employee
        fields = ['id', 'name', 'name', 'email', 'phoneNumber', 'address', 'gender', 'maritalStatus', 'availableVacationDays', 'approvedVacationDays', 'salary', 'birthDay']


class VacationSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    
    class Meta:
        model = Vacation
        fields = ['id', 'employee', 'startDate', 'endDate', 'vacationReason', 'status']
        
    

