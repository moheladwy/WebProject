// import { isValidEmployeeForm } from "./helper-validations.js";

const saveButton = document.getElementById('save-btn');
const deleteButton = document.getElementById('delete-btn');
const form = document.getElementById('edit-employee-form');
const employeeId = window.location.href.split('/').pop();

document.body.onload = () => {

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        '/employee-detail/' + employeeId,
        false
    );

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            const currentEmployee = JSON.parse(xhttp.responseText);
            populateEditEmployeeForm(currentEmployee);
        }
    }

    xhttp.send();
}

function populateEditEmployeeForm(currentEmployee) {
    const inputs = document.getElementsByClassName('input-field');

    for (const input of inputs) {
        if (input.type === 'radio') {
            if (input.value === currentEmployee[input.name]) {
                input.checked = true;
            }
        } else {
            input.value = currentEmployee[input.name];
        }
    }

    form.querySelector('#id').disabled = true;
}

saveButton.addEventListener('click', (event) => {
    // if (isValidEmployeeForm()) {
    if (true) {
        const data = new FormData(form);

        const postReq = new XMLHttpRequest();

        postReq.open(
            'POST',
            '/employee-detail/' + employeeId
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

deleteButton.addEventListener('click', (event) => {

    // TODO - Prompt for confirmation

    // TODO - Implement the logic for deleteing from server
    const deleteReq = new XMLHttpRequest();
    deleteReq.open(
        'DELETE',
        '/employee-detail/' + employeeId
    )

    deleteReq.onreadystatechange = () => {
        if (deleteReq.readyState === XMLHttpRequest.DONE) {
            if (deleteReq.status == 204) {
                window.location.replace('/search-employee');
            }
            else {
                alert('NOT FOUND.\n' + deleteReq.responseText);
            }
        }
    }

    deleteReq.send();
});


form.querySelector('#approvedVacationDays').disabled = true;
