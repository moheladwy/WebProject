import { isValidEmployeeForm } from "./helper-validations.js";

const form = document.querySelector('#add-employee-form');
const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener('click', (e) => {
    if (isValidEmployeeForm) {

        // get data from form
        const data = new FormData(form);
        
        const postReq = new XMLHttpRequest();

        postReq.open(
            'PUT',
            '/employee-list'
        );

        postReq.onreadystatechange = () => {
            if (postReq.readyState === XMLHttpRequest.DONE) {
                if (postReq.status == 200) {
                    window.location.replace('/search-employee');
                }
                else {
                    alert('BAD REQUEST.\n' + postReq.responseText);
                }
            }
        }

        postReq.send(data);
    }
});

form.querySelector('#approvedVacationDays').disabled = true;

