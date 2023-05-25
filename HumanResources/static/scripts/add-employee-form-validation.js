import { isValidEmployeeForm } from "./helper-validations.js";

document.addEventListener('DOMContentLoaded', () => {
    const formBtn = document.getElementById('submit-btn');

    formBtn.addEventListener('click', (e) => {
        if (!isValidEmployeeForm()) 
            e.preventDefault();
    })
});



