from django import forms


class EmployeeForm(forms.Form):
    id = forms.CharField(
        label='Employee ID',
        widget=forms.TextInput(attrs={
            'id': 'id',
            'name': 'id',
            'class': 'input-field',
            'minlength': 8,
            'maxlength': 8,
            'required': True,
            'placeholder': '20230000',
        }),
        disabled=True
    )
    name = forms.CharField(
        label='Name',
        widget=forms.TextInput(attrs={
            'id': 'name',
            'name': 'name',
            'class': 'input-field',
            'maxlength': 50,
            'pattern': '[a-zA-Z\s]{3,15}',
            'placeholder': 'Monte Carlo',
            'required': True
        })
    )
    email = forms.EmailField(
        label='Email',
        widget=forms.EmailInput(attrs={
            'id': 'email',
            'name': 'email',
            'class': 'input-field',
            'maxlength': 50,
            'placeholder': 'email@gmail.com',
            'required': True
        })
    )
    address = forms.CharField(
        label='Address',
        widget=forms.TextInput(attrs={
            'id': 'address',
            'name': 'address',
            'class': 'input-field',
            'maxlength': 100,
            'placeholder': '30 Ahmed Zewail - Dokki',
            'required': True
        })
    )
    phoneNumber = forms.CharField(
        label='Phone Number',
        widget=forms.TextInput(attrs={
            'id': 'phoneNumber',
            'name': 'phoneNumber',
            'class': 'input-field',
            'pattern': '[0-9]{11,20}',
            'placeholder': '01120554765',
            'required': True
        })
    )
    maritalStatus = forms.ChoiceField(
        label='Marital Status',
        choices=[('M', 'Married'), ('S', 'Single')],
        widget=forms.RadioSelect(attrs={
            'id': 'maritalStatus',
            'name': 'maritalStatus',
            'class': 'input-field',
            'required': True
        })
    )
    availableVacationDays = forms.IntegerField(
        label='Available vacation days',
        min_value=0,
        max_value=120,
        widget=forms.NumberInput(attrs={
            'id': 'availableVacationDays',
            'name': 'availableVacationDays',
            'class': 'input-field',
            'required': True
        })
    )
    approvedVacationDays = forms.IntegerField(
        label='Approved vacation days',
        min_value=0,
        max_value=120,
        widget=forms.NumberInput(attrs={
            'id': 'approvedVacationDays',
            'name': 'approvedVacationDays',
            'class': 'input-field',
            'required': True
        })
    )
    salary = forms.DecimalField(
        label='Salary',
        min_value=0,
        max_value=1000000,
        widget=forms.NumberInput(attrs={
            'id': 'salary',
            'name': 'salary',
            'class': 'input-field',
            'required': True
        })
    )