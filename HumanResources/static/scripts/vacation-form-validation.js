import { isValidReason, isValidVacationDuration, markField } from "./helper-validations.js";

document.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit-btn');
    
    submit.addEventListener('click', (e) => {
        if (!isValidVacationForm()) {
            e.preventDefault();
        }
    })
})

function isValidVacationForm()
{
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    const reasonMessage =  document.getElementById('reason');
    
    const startDateError = document.getElementById('start-date-error');
    const endDateError = document.getElementById('end-date-error');
    const reasonMessageError =  document.getElementById('reason-error');

    let isValidVacationDates = isValidVacationDuration(startDate.value, endDate.value);

    let isValidForm = 
        markField(() => isValidVacationDates, startDate, startDateError, "Dates Are Not Correct")
    isValidForm = 
        markField(() => isValidVacationDates, endDate, endDateError, "Dates Are Not Correct");
    isValidForm = 
        markField(() => isValidReason(reasonMessage.value), reasonMessage, reasonMessageError, "Reason Must Be Atleast 100 character and Atmost 1000") && isValidForm;

    return isValidForm;
}