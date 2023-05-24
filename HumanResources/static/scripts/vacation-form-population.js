const form = document.getElementById('vacation-form');

var currentEmployee;

document.body.onload = () => {

    const employeeId = window.location.href.split('/').pop();

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        '/get-employee/' + employeeId,
        false
    );

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            currentEmployee = JSON.parse(xhttp.responseText);
            populateVacationForm();
        }
    }

    xhttp.send();
};

function populateVacationForm() {
    const idInput = form.querySelector('#id');
    idInput.disabled = true;
    idInput.value = currentEmployee.id;
}


document.getElementById('submit-btn').onclick = () => {
    if (validateForm()) {
        const data = new FormData(form);

        data.append('employee', JSON.stringify(currentEmployee));
        data.append('status', 'P');

        const postReq = new XMLHttpRequest();

        postReq.open(
            'POST',
            '/vacations/vacation-list'
        )

        postReq.onreadystatechange = () => {
            if (postReq.readyState === XMLHttpRequest.DONE) {
                if (postReq.status === 201)
                    window.location.replace('/vacations');
                else
                    prompt('BAD REQUEST.');
            }
        }

        postReq.send(data);
    }
}

function validateForm() {
    // TODO - (Shehab) implement plz

    return true;
}
