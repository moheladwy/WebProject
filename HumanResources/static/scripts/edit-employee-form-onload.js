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
    form.querySelector('#approvedVacationDays').disabled = true;
}

