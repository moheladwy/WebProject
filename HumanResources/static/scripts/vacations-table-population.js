const tempForm = document.getElementById('temp-form');

document.body.onload = beginLoadVacations;

function beginLoadVacations(event) {
    const vacationsReq = new XMLHttpRequest();
    vacationsReq.open(
        'GET',
        window.location.href + 'vacation-list'
    );

    vacationsReq.onreadystatechange = () => {
        if (vacationsReq.readyState === XMLHttpRequest.DONE && vacationsReq.status === 200) {
            const vacations = JSON.parse(vacationsReq.responseText);

            populateVacationsTable(vacations);
        }
    };

    vacationsReq.send();
}

function getCSRFToken() {
    return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
}

function populateVacationsTable(vacations) {
    const tbody = document.querySelector('.full-table').querySelector('tbody');
    tbody.innerHTML = '';

    for (const v of vacations) {
        // if the vacation is pending, show it
        if (v.status == 'P') {
            const tr = templateTableRow();

            tr.querySelector('.employee-id').innerHTML = v.employee.id;
            tr.querySelector('.employee-name').innerHTML = v.employee.name;
            tr.querySelector('.employee-email').innerHTML = v.employee.email;
            tr.querySelector('.employee-phone-number').innerHTML = v.employee.phoneNumber;
            tr.querySelector('.vacation-start-date').innerHTML = v.startDate;
            tr.querySelector('.vacation-end-date').innerHTML = v.endDate;
            tr.querySelector('.vacation-reason').innerHTML = v.vacationReason;

            tbody.appendChild(tr);

            tr.querySelector('.approve-button').addEventListener('click', () => {
                const putReq = new XMLHttpRequest();
                putReq.open(
                    'PUT',
                    '/vacations/update-vacation/' + v.id
                );

                putReq.onreadystatechange = () => {
                    if (putReq.readyState === XMLHttpRequest.DONE) {
                        beginLoadVacations();
                    }
                };

                data = new FormData(tempForm);
                data.append('status', 'R');
                
                putReq.send(data);
            });

            tr.querySelector('.reject-button').addEventListener('click', () => {
                const putReq = new XMLHttpRequest();
                putReq.open(
                    'PUT',
                    '/vacations/update-vacation/' + v.id
                );

                putReq.onreadystatechange = () => {
                    if (putReq.readyState === XMLHttpRequest.DONE) {
                        beginLoadVacations();
                    }
                };

                data = new FormData(tempForm);
                data.append('status', 'R');

                putReq.send(data);
            });
        }
    }
}

function templateTableRow() {
    const templateRow = document.createElement('tr');
    templateRow.innerHTML = `
    <td class="employee-id"></td>
    <td class="employee-name"></td>
    <td class="employee-email"></td>
    <td class="employee-phone-number"></td>
    <td class="vacation-start-date"></td>
    <td class="vacation-end-date"></td>
    <td class="vacation-reason"></td>
    <td>
        <button class="approve-button" type="button"><i class="fa-regular fa-circle-check"></i></button>
        <button class="reject-button" type="button"><i class="fa-regular fa-circle-xmark"></i></button>
    </td>
`;
    return templateRow;
}


