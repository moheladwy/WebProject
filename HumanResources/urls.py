from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('vacations/', views.vacations, name='vacations'),
    path('search-employee/', views.searchEmployee, name='searchEmployee'),
    path('search-employee/add-employee/', views.addEmployee, name='addEmployee'),
    path('search-employee/edit-employee/', views.editEmployee, name='editEmployee'),
    path('search-employee/adit-employee/<int:employeeId>', views.editEmployeeForm, name='editEmployeeForm'),
    path('search-employee/delete-employee/<int:employeeId>', views.deleteEmployee, name='deleteEmployee'),
    path('search-employee/vacation-form/', views.vacationForm, name='vacationForm')
]
