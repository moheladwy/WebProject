import { isValidEmployeeForm } from "./helper-validations.js";

document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-btn');

    saveBtn.addEventListener('click', (e) => {
        if (!isValidEmployeeForm())
            e.preventDefault();
    })
});