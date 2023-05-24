import { isValidVacationDuration, markField } from "./helper-validations.js";

document.addEventListener('DOMContentLoaded', () => {
    const submit = document.getElementById('submit-btn');
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    const startDateError = document.getElementById('start-date-error')
    const endDateError = document.getElementById('end-date-error');

    submit.addEventListener('click', (e) => {
        let isValidVacationDates = isValidVacationDuration(startDate.value, endDate.value);

        let isValidForm = 
            markField(() => isValidVacationDates, startDate, startDateError, "Dates Are Not Correct")
        isValidForm = 
            markField(() => isValidVacationDates, endDate, endDateError, "Dates Are Not Correct");

        if (!isValidForm) {
            e.preventDefault();
        }
    })
})

