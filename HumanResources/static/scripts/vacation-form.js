const pendingVacations = getPendingVacations();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('vacation-form');
    const submitButton = document.getElementById('submit-btn');
    const vacationReason = document.getElementById('reason');

    const startDateInput = document.getElementById('start-date');
    const startDateErrorSpan = document.getElementById('start-date-error');
    const endDateInput = document.getElementById('end-date');
    const endDateErrorSpan = document.getElementById('end-date-error');
    
    // setInputID(employeeID);
    setMinStartDate(startDateInput);

    startDateInput.addEventListener('input', function() {
        // get the value of the start-date input
        const startDateValue = startDateInput.value;
        if (startDateValue < startDateInput.getAttribute('min')) {
            startDateErrorSpan.style.display = 'block';
            startDateInput.setAttribute('value', '');
        }
        else {
            startDateErrorSpan.style.display = 'none';
            // set the minimum date for the end-date input to the value of the start-date input
            endDateInput.setAttribute('min', startDateValue);
        }
    });
    endDateInput.addEventListener('input', function () {
        console.log(startDateInput.value);
        const endDateValue = endDateInput.value;
        if (endDateValue < startDateInput.value) {
            endDateErrorSpan.innerText = 'end date cannot be before the start date.';
            endDateErrorSpan.style.display = 'block';
            endDateInput.setAttribute('value', '');
        }
        else if (dateDiffInDays(startDateInput.value, endDateValue) + 1 > availableVacationDays) {
            endDateErrorSpan.innerText = `end date cannot not exceeds the available days left for the employee which is = ${availableVacationDays}`;
            endDateErrorSpan.style.display = 'block';
            endDateInput.setAttribute('value', '');
        }
        else {
            endDateErrorSpan.style.display = 'none';
        }
    });
    
    submitButton.addEventListener('click', (event) => {
        const differenceInDays = dateDiffInDays(startDateInput.value, endDateInput.value) + 1;
        const pendingVacation = {};
        pendingVacation["ID"] = employeeID;
        pendingVacation["startDate"] = startDateInput.value;
        pendingVacation["endDate"] = endDateInput.value;
        pendingVacation["vacationReason"] = vacationReason.value;
        pendingVacation["availableVacationDays"] = availableVacationDays;
        pendingVacation["numberVacationDays"] = differenceInDays.toString();
        form.submit();
    });
});

function setInputID(employeeID) {
    const id = document.getElementById('id');
    id.value = employeeID;
}

function setMinStartDate(startDateInput) {
    // set the minimum date for the start-date input to today
    const todayDate = new Date().toISOString().split('T')[0];
    startDateInput.setAttribute('min', todayDate);
}

function dateDiffInDays(dateStr1, dateStr2) {
    const date1 = new Date(Date.parse(dateStr1));
    const date2 = new Date(Date.parse(dateStr2));

    const diffInMs = date2 - date1;
    const diffInDays = diffInMs / (24 * 60 * 60 * 1000);
    return Math.floor(diffInDays);
}