var currentEmployee; // DO NOT USE BEFORE populateVacationForm RUNS!

document.body.onload = () => {

    const urlArray = window.location.href.split('/');
    const employeeId = urlArray.pop();
    let url = '';
    for (const i of urlArray) {
        url += (i + '/');
    }

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        url + 'get-employee/' + employeeId
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
