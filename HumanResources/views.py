from .models import Employee, Vacation
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')


def home(request):
    return render(request, 'pages/home.html')


def searchEmployee(request):
    return render(request, 'pages/search-employees.html', {
        'employees': Employee.objects.all()
    })


# done.
def addEmployee(request):
    if request.method == 'POST':
        employeeID = request.POST.get('id')
        if Employee.objects.filter(id=employeeID).exists():
            return render(request, 'pages/add-employee.html', {'errorMessage': 'Employee ID already exists'})
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
        
        Employee.objects.create (
            id = employeeID, name=employeeName, email=employeeEmail, 
            phoneNumber=employeePhoneNumber, address=employeeAddress, gender=employeeGender, 
            maritalStatus=employeeMaritalStatus, availableVacationDays=employeeAvailableVacationDays, 
            approvedVacationDays=employeeApprovedVacationDays, birthDay=employeeBirthDate, salary=employeeSalary
        )
        return render(request, 'pages/search-employees.html', {
            'employees': Employee.objects.all()
        })
    return render(request, 'pages/add-employee.html')


# to be tested.
def editEmployee(request, employeeId):
    if request.method == 'POST':
        employee = Employee()
        if not Employee.objects.filter(id=request.POST.get('id')).exists():
            return render(request, 'pages/add-employee.html', {'errorMessage': 'Employee ID does not exist'})
        employee.name = request.POST.get('name')
        employee.email = request.POST.get('email')
        employee.phoneNumber = request.POST.get('phoneNumber')
        employee.address = request.POST.get('address')
        employee.gender = request.POST.get('gender')
        employee.maritalStatus = request.POST.get('maritalStatus')
        employee.availableVacationDays = request.POST.get('availableVacationDays')
        employee.approvedVacationDays = request.POST.get('approvedVacationDays')
        employee.birthDay = request.POST.get('birthDay')
        employee.salary = request.POST.get('salary')
        employee.save()
        return render(request, 'pages/search-employees.html', {
            'employees': Employee.objects.all()
        })
    employee = Employee.objects.filter(id=employeeId)
    return render(request, f'pages/edit-employee.html/{employeeId}', {
        'employee': employee
    })


def vacationForm(request):
    return render(request, 'pages/vacation-form.html')


def vacations(request):
    vacations = Vacation.objects.filter(status='P')
    return render(request, 'pages/vacations.html', {
        'vacations': vacations
    })
