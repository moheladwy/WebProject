from rest_framework import serializers
from .models import *


class EmployeeDetailSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Employee
        fields = ['id', 'name', 'name', 'email', 'phoneNumber', 'address', 'gender', 'maritalStatus', 'availableVacationDays', 'approvedVacationDays', 'salary', 'birthDay']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'name', 'name', 'email', 'phoneNumber',]
                  

class VacationDetailSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    
    class Meta:
        model = Vacation
        fields = ['id', 'employee', 'startDate', 'endDate', 'vacationReason', 'status']
        

class VacationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacation
        fields = ['id' ,'startDate', 'endDate', 'vacationReason', 'status']
