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
        vacation = {}
        
        const data = new FormData(form);
        for (const [kye, value] of data.entries()) {
            vacation[kye] = value;
        }

        vacation.employee = currentEmployee;

        const postReq = new XMLHttpRequest();
        postReq.open(
            'POST',
            '/vacations/'
        )

        postReq.setRequestHeader('Content-type', 'application/json');

        postReq.onreadystatechange = () => {
            if (postReq.readyState === XMLHttpRequest.DONE && postReq.status === 200) {
                window.location.replace('/vacations');
            }
        }

        let urlEncodedDataPairs = [];
        for (const name in vacation) {
            urlEncodedDataPairs.push(encodeURIComponent(name)+'='+encodeURIComponent(vacation[name]));
        }

        

        postReq.send(urlEncodedDataPairs);
    }
}

function validateForm() {
    // TODO - (Shehab) implement plz

    return true;
}
