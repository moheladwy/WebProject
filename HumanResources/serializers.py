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
        
    
    def create(self, validated_data):
        employee_data = validated_data.pop('employee')
        vacation = Vacation.objects.create(**validated_data)
        vacation.employee = Employee.objects.get(id=employee_data['id'])
        return vacation
        
    

