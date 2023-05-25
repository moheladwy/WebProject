export function isValidEmployeeForm()
{
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const mail = document.getElementById('email');
    const address = document.getElementById('address');
    const phone = document.getElementById('phoneNumber');
    const availableVacationDays = document.getElementById('availableVacationDays');
    const approvedVacationDays = document.getElementById('approvedVacationDays');
    const salary = document.getElementById('salary');
    const dob = document.getElementById('birthDay');

    
    let isValidForm = true;

    isValidForm = markField(() => isValidId(id.value), id, document.getElementById('idError'), "Please Enter a valid id") && isValidForm;
    isValidForm = markField(() => isValidMail(mail.value), mail, document.getElementById('emailError'), "Please Enter a valid mail") && isValidForm;
    isValidForm = markField(() => isValidName(name.value), name, document.getElementById('nameError'), "Please Enter a valid name") && isValidForm;
    isValidForm = markField(() => isValidEgyptPhone(phone.value), phone, document.getElementById('phoneNumberError'), "Please Enter a valid Phone Number") && isValidForm;
    isValidForm = markField(() => isValidAddress(address.value), address, document.getElementById('addressError'), "Please Enter a valid Address") && isValidForm;
    isValidForm = markField(() => isValidVacationDays(availableVacationDays.value), availableVacationDays, document.getElementById('availableVacationDaysError'), "days cannot be > 120") && isValidForm;
    isValidForm = markField(() => isValidVacationDays(approvedVacationDays.value), approvedVacationDays, document.getElementById('approvedVacationDaysError'), "days cannot be > 120") && isValidForm;
    isValidForm = markField(() => isValidSalary(salary.value), salary, document.getElementById('salaryError'), "Salary Cannot be > 1,000,000") && isValidForm;
    isValidForm = markField(() => isValidDob(Date.parse(dob.value)), dob, document.getElementById('birthDayError'), "listen kid, you spoiled naive brat, go drink milk and play fortnite, You must be Greater than 18 yo") && isValidForm;

    return isValidForm;
}

export function markField(isValid, inputField, errorLabel, message) {
    if (!isValid())
    {
        displayError(inputField, errorLabel, message);
        return false;
    }
    
    displaySuccess(inputField, errorLabel);
    return true;
}

export function isValidVacationDuration(startDateStr, endDateStr) {
    if (!startDateStr || !endDateStr)
        return false;

    let startDateInMs = new Date(Date.parse(startDateStr));
    let endDateInMs = new Date(Date.parse(endDateStr));
    if (startDateInMs > endDateInMs)
        return false;

    let currTime = new Date(Date.now());
    
    return startDateInMs.getDate() >= currTime.getDate();
}

export function isValidReason(message)
{
    return message.length >= 100 && message.length <= 1000;
}


export function isValidId(id) {
    const regex = /^(2023)(\d){4}$/;
    return regex.test(id);
}


export function isValidName(name) {
    return !(name.length < 3 || name.length > 60);
}

export function isValidEgyptPhone(phoneNumber) {
    const regex = /^(\+20)(1)[0125](\d){8}$/;
    return regex.test(phoneNumber);
}

export function isValidMail(mail) {
    const regex = new RegExp("^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,63}$");
    return regex.test(mail);
}

export function isValidAddress(address) {
    return !(address.length < 15 || address.length > 60);
}

export function isValidVacationDays(days) {
    if (!days)
        return false;
        
    return !(!isNaN(salary) || days < 0 || days > 120);
}

export function isValidSalary(salary) {
    if (!salary)
        return false;
        
    return !(isNaN(salary) || Number(salary) > 1_000_000 || Number(salary) < 0);
}

export function isValidDob(birthDate) {
    const ageInMilliseconds = new Date(Date.now() - birthDate);
    const ageInYears = ageInMilliseconds.getFullYear() - 1970;
    return ageInYears >= 18;
}


export function getDateInYear(dateStr) {
    const year = new Date(Date.parse(dateStr)).getFullYear();

    return year;
}


export function displayError(inputField, errorLabel, message) {
    inputField.className = 'input-field error';
    errorLabel.style.visibility = 'visible';
    errorLabel.textContent = message;
    errorLabel.style.color = 'red';
}

export function displaySuccess(inputField, errorLabel) {
    inputField.className = 'input-field success';
    errorLabel.style.visibility = 'hidden';
}