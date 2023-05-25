import { isValidAddress, isValidDob, isValidEgyptPhone, isValidId, isValidMail, isValidName, isValidSalary, markField } from "./helper-validations.js";

// document.addEventListener('DOMContentLoaded', () => {
//     const formBtn = document.getElementById('submit-btn');

//     formBtn.addEventListener('click', (e) => {
//         if (!isValidAddEmployeeForm()) 
//             e.preventDefault();
//     })
// });



export function isValidAddEmployeeForm()
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