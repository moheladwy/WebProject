import { isValidEmployeeForm } from "./helper-validations.js";

formBtn.addEventListener('click', (e) => {
    if (!isValidEmployeeForm())
        e.preventDefault();
})



