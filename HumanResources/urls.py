from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('vacations/', views.vacations_page, name='vacations'),
    path('vacations/vacation-list', views.vacation_list, name='getAllVacations'),
    path('search-employee/', views.searchEmployee, name='searchEmployee'),
    path('search-employee/add-employee/', views.addEmployee, name='addEmployee'),
    path('search-employee/edit-employee/', views.editEmployee, name='editEmployee'),
    #path('search-employee/edit-employee/<int:employeeId>', views.editEmployeeForm, name='editEmployeeForm'),
    path('search-employee/edit-employee/<int:employeeId>', views.edit_employee_page),
    path('search-employee/delete-employee/<int:employeeId>', views.deleteEmployee, name='deleteEmployee'),
    path('search-employee/vacation-form/<int:employeeId>', views.vacation_form, name='vacationForm'),
    path('employee-detail/<int:employeeId>', views.employee_detail),
    path('employee-list', views.employee_list, name='getAllEmployees'),
    path('vacations/update-vacation/<int:vacationId>', views.update_vacation),
]
