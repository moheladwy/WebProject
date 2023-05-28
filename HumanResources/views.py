from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpRequest, JsonResponse, HttpResponse
from HumanResources.serializers import *
from .models import Employee, Vacation
from .form import EmployeeForm
import json


# done.
def index(request: HttpRequest):
    return render(request, 'index.html')


# done.
def home(request: HttpRequest):
    return render(request, 'pages/home.html')


# done.
def searchEmployee(request: HttpRequest):
    return render(request, 'pages/search-employees.html')


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
        employee = Employee.objects.get(id=employeeId)
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


def edit_employee_page(request, employeeId):
    try:
        employee = Employee.objects.get(id=employeeId)
    except Employee.DoesNotExist:
        return render(request, 'pages/edit-employee.html', status=404)
    
    return render(request, 'pages/edit-employee.html', {
        'id': employeeId
    })


@api_view(['GET', 'POST'])
def employee_list(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = EmployeeDetailSerializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail(request, employeeId):
    try:
        employee = Employee.objects.get(id=employeeId)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = EmployeeDetailSerializer(employee)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = EmployeeDetailSerializer(instance=employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
def vacation_form(request: HttpRequest, employeeId):
    return render(request, 'pages/vacation-form.html')


# done.
def vacations_page(request: HttpRequest):
    return render(request, 'pages/vacations.html')


# done.
@api_view(['GET', 'POST'])
def vacation_list(request):
    if (request.method == 'GET'):
        vacations = Vacation.objects.all()
        serializer = VacationDetailSerializer(vacations, many=True)
        return Response(serializer.data)
    
    elif (request.method == 'POST'):
        employee_id = request.data.get('employee-id')
        vacation_data = json.loads(request.data.get('vacation'))
        
        if not employee_id or not vacation_data:
            return Response({'error': 'Invalid request data'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            employee = Employee.objects.get(id=employee_id)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = VacationSerializer(data=vacation_data)
        if serializer.is_valid():
            vacation = serializer.save(employee=employee)
            return Response(VacationDetailSerializer(vacation).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            


@api_view(['PUT'])
def update_vacation(request, vacationId):
    try:
        vacation = Vacation.objects.get(pk=vacationId)
    except Vacation.DoesNotExist:
        return Response({'error': 'Vacation not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        status_value = request.data.get('status')

        if status_value not in ['A', 'R', 'P']:  # Approved, Rejected, Pending
            return Response({'error': 'Invalid status value'}, status=status.HTTP_400_BAD_REQUEST)

        vacation.status = status_value
        vacation.save()

        if vacation.status == 'A':  # Approved
            vacation_days = (vacation.endDate - vacation.startDate).days
            vacation.employee.availableVacationDays -= vacation_days
            vacation.employee.approvedVacationDays += vacation_days
            vacation.employee.save()

        return Response({'message': 'Vacation updated'}, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# TODO: to be tested.
def getEmployees(request: HttpRequest):
    return JsonResponse({'employees': list(Employee.objects.all().values())})


