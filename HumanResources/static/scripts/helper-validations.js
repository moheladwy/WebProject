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

export function isValidSalary(salary) {
    if (!salary)
        return false;
        
    return !(isNaN(salary) || Number(salary) > 1_000_000);
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