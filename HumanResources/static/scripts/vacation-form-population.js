import { isValidVacationForm } from "./vacation-form-validation.js";

const form = document.getElementById('vacation-form');

var currentEmployee;

document.body.onload = () => {
    const employeeId = window.location.href.split('/').pop();

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        '/employee-detail/' + employeeId
    );

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            currentEmployee = JSON.parse(xhttp.responseText);
            populateVacationForm(currentEmployee);
        }
    }

    xhttp.send();
};

function populateVacationForm(currentEmployee) {
    const idInput = form.querySelector('#id');
    idInput.disabled = true;
    idInput.value = currentEmployee.id;
}

function getCSRFToken() {
    return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
}

document.getElementById('submit-btn').onclick = () => {
    if (isValidVacationForm()) {
        
        // this does not belong to the functionality, this is a solution 
        // for a really bad problem I had some morning back in the day
        const vac = {
            employeeId: currentEmployee,
            startDate: form.querySelector('#start-date').value,
            endDate: form.querySelector('#end-date').value,
            vacationReason: form.querySelector('#reason').value,
            status: 'P',
        }

        const newData = new FormData();
        newData.append('csrfmiddlewaretoken', getCSRFToken());
        newData.append('vac', JSON.stringify(vac));
        // ************************************************************
        
        const data = new FormData();
        const vacation = {
            startDate: form.querySelector('#start-date').value,
            endDate: form.querySelector('#end-date').value,
            vacationReason: form.querySelector('#reason').value,
            status: 'P',
        };

        data.append('csrfmiddlewaretoken', getCSRFToken());
        data.append('vacation', JSON.stringify(vacation));
        data.append('employee-id', currentEmployee.id);

        const postReq = new XMLHttpRequest();

        postReq.open(
            'POST',
            '/vacations/vacation-list'
        );

        postReq.onreadystatechange = () => {
            if (postReq.readyState === XMLHttpRequest.DONE) {
                if (postReq.status === 201)
                    window.location.replace('/vacations');
                else
                    prompt('BAD REQUEST.');
            }
        };

        postReq.send(data);
    }
}
