document.addEventListener('DOMContentLoaded', () => {
    const formBtn = document.getElementById('submit-btn');

    formBtn.addEventListener('click', (e) => {

        if (!isValidAddEmployeeForm()) 
            e.preventDefault();
    })
});

function isValidAddEmployeeForm()
{
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const mail = document.getElementById('email');
    const address = document.getElementById('address');
    const phone = document.getElementById('phoneNumber');
    const availableVacationDays = document.getElementById('availableVacationDays');
    const approvedVacationDays = document.getElementById('approvedVacationDays');
    const salary = document.getElementById('salary');
    const dob = document.getElementById('birth-day');

    
    let isValidForm = true;

    isValidForm = markField(() => isValidId(id.value), id, document.getElementById('id-error'), "Please Enter a valid id") && isValidForm;
    isValidForm = markField(() => isValidMail(mail.value), mail, document.getElementById('email-error'), "Please Enter a valid mail") && isValidForm;
    isValidForm = markField(() => isValidName(name.value), name, document.getElementById('name-error'), "Please Enter a valid name") && isValidForm;
    isValidForm = markField(() => isValidEgyptPhone(phone.value), phone, document.getElementById('phoneNumber-error'), "Please Enter a valid Phone Number") && isValidForm;
    isValidForm = markField(() => isValidAddress(address.value), address, document.getElementById('address-error'), "Please Enter a valid Address") && isValidForm;
    isValidForm = markField(() => {return availableVacationDays.value < 120}, availableVacationDays, document.getElementById('availableVacationDays-error'), "days cannot be > 120") && isValidForm;
    isValidForm = markField(() => {return approvedVacationDays.value < 120}, approvedVacationDays, document.getElementById('approvedVacationDays-error'), "days cannot be > 120") && isValidForm;
    isValidForm = markField(() => isValidSalary(salary.value), salary, document.getElementById('salary-error'), "Salary Cannot be > 1,000,000") && isValidForm;
    isValidForm = markField(() => isValidDob(Date.parse(dob.value)), dob, document.getElementById('birth-day-error'), "listen kid, you spoiled naive brat, go drink milk and play fortnite, You must be Greater than 18 yo") && isValidForm;

    return isValidForm;
}


function markField(isValid, inputField, errorLabel, message)
{
    if (!isValid())
    {
        displayError(inputField, errorLabel, message);
        return false;
    }

    displaySuccess(inputField, errorLabel);
    return true;
}

function isValidName(name) {
    return !(name.length < 3 || name.length > 60);
}

function isValidAddress(address)
{
    return !(address.length < 15 || address.length > 60);
}

function isValidSalary(salary)
{
    if (!salary)
        return false;
        
    return !(isNaN(salary) || Number(salary) > 1_000_000);
}

function isValidDob(birthDate) {
    const ageInMilliseconds = new Date(Date.now() - birthDate);
    const ageInYears = ageInMilliseconds.getFullYear() - 1970;
    return ageInYears >= 18;
}

function isValidId(id) {
    const regex = /^(2023)(\d){4}$/;
    return regex.test(id);
}

function isValidEgyptPhone(phoneNumber) {
    const regex = /^(\+20)(1)[0125](\d){8}$/;
    return regex.test(phoneNumber);
}

function isValidMail(mail) {
    const regex = new RegExp("^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,63}$");
    return regex.test(mail);
}

function getDateInYear(dateStr)
{
    const year = new Date(Date.parse(dateStr)).getFullYear();

    return year;
}


function displayError(inputField, errorLabel, message)
{
    inputField.className = 'input-field error';
    errorLabel.style.visibility = 'visible';
    errorLabel.textContent = message;
    errorLabel.style.color = 'red';
}

function displaySuccess(inputField, errorLabel)
{
    inputField.className = 'input-field success';
    errorLabel.style.visibility = 'hidden';
}