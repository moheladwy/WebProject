var currentEmployee; // DO NOT USE BEFORE populateVacationForm RUNS!

document.body.onload = () => {

    const employeeId = window.location.href.split('/').pop();

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        '/get-employee/' + employeeId
    );

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            const data = JSON.parse(xhttp.responseText);
            populateVacationForm(data['employee']);
        }
    }

    xhttp.send();
};

function populateVacationForm(employee) {
    currentEmployee = employee;

    const form = document.getElementById('vacation-form');
    const idInput = form.querySelector('#id');
    idInput.disabled = true;
    idInput.value = employee.id;
}
