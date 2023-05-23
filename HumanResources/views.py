from django.shortcuts import render, redirect
from django.http import HttpRequest
from django.http import JsonResponse
import json
from .models import Employee, Vacation
from .form import EmployeeForm
from django.core import serializers
import json


# done.
def index(request: HttpRequest):
    return render(request, 'index.html')


# done.
def home(request: HttpRequest):
    return render(request, 'pages/home.html')


# done.
def searchEmployee(request: HttpRequest):
    return render(request, 'pages/search-employees.html', {
        'employees': Employee.objects.all()
    })


# done.
def addEmployee(request: HttpRequest):
    if request.method == 'POST':
        employeeID = request.POST.get('id')
        try:
            Employee.objects.get(id=employeeID)
            return render(request, 'pages/add-employee.html', {'errorMessage': 'Employee ID already exists'})
        except:
            pass
        employeeName = request.POST.get('name')
        employeeEmail = request.POST.get('email')
        employeePhoneNumber = request.POST.get('phoneNumber')
        employeeAddress = request.POST.get('address')
        employeeGender = request.POST.get('gender')
        employeeMaritalStatus = request.POST.get('maritalStatus')
        employeeAvailableVacationDays = request.POST.get('availableVacationDays')
        employeeApprovedVacationDays = request.POST.get('approvedVacationDays')
        employeeBirthDate = request.POST.get('birthDay')
        employeeSalary = request.POST.get('salary')

        Employee.objects.create(
            id=employeeID, name=employeeName, email=employeeEmail,
            phoneNumber=employeePhoneNumber, address=employeeAddress, gender=employeeGender,
            maritalStatus=employeeMaritalStatus, availableVacationDays=employeeAvailableVacationDays,
            approvedVacationDays=employeeApprovedVacationDays, birthDay=employeeBirthDate, salary=employeeSalary
        )
        return redirect('searchEmployee')
    return render(request, 'pages/add-employee.html')


# done.
def initialFormData(employee: Employee, isDesiabled: bool = True) -> EmployeeForm:
    initialData = {
        'id': employee.id,
        'name': employee.name,
        'email': employee.email,
        'address': employee.address,
        'phoneNumber': employee.phoneNumber,
        'gender': employee.gender,
        'maritalStatus': employee.maritalStatus,
        'availableVacationDays': employee.availableVacationDays,
        'approvedVacationDays': employee.approvedVacationDays,
        'salary': employee.salary,
        'birthDay': employee.birthDay
    }
    form = EmployeeForm(initial=initialData)
    return form


# done.
def editEmployee(request: HttpRequest):
    return render(request, 'pages/edit-employee.html', {
        'errorMessage': 'You did not choose any employee to be edited or deleted.'
    })


# done.
def editEmployeeForm(request: HttpRequest, employeeId: int):
    if request.method == 'POST':
        employee = Employee()
        employee = Employee.objects.get(id=employeeId)
        employee.id = request.POST.get('id')
        employee.name = request.POST.get('name')
        employee.phoneNumber = request.POST.get('phoneNumber')
        employee.address = request.POST.get('address')
        employee.maritalStatus = request.POST.get('maritalStatus')
        employee.availableVacationDays = request.POST.get('availableVacationDays')
        employee.approvedVacationDays = request.POST.get('approvedVacationDays')
        employee.salary = request.POST.get('salary')
        employee.save()
        return redirect('searchEmployee')

    employee = Employee.objects.get(id=employeeId)
    form = initialFormData(employee)
    return render(request, 'pages/edit-employee.html', {
        'form': form,
        'id': employee.id
    })


# done.
def deleteEmployee(request: HttpRequest, employeeId: int):
    try:
        employee = Employee.objects.get(id=employeeId)
        employee.delete()
    except:
        return render(request, 'pages/edit-employee.html', {
            'errorMessage': 'Employee does not exist to be deleted.',
            'id': employeeId,
            'form': EmployeeForm()
        })
    return redirect('searchEmployee')


# done.
def vacationForm(request: HttpRequest, employeeId):
    return render(request, 'pages/vacation-form.html')


# done.
def vacations(request: HttpRequest):
    return render(request, 'pages/vacations.html')


# done.
def getVacations(request: HttpRequest):
    vacations = Vacation.objects.all().values()
    return JsonResponse({"vacations": list(vacations)})


# done.
def getEmployee(request: HttpRequest, employeeId: int):
    employee = Employee.objects.filter(id=employeeId).values()[0]
    return JsonResponse({'employee': employee})
