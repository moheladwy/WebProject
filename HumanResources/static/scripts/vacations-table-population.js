document.addEventListener('DOMContentLoaded', beginLoadVacations);

function beginLoadVacations(event) {
    const vacationsReq = new XMLHttpRequest();
    vacationsReq.open(
        'GET',
        window.location.href + 'vacation-list'
    );

    vacationsReq.onreadystatechange = () => {
        if (vacationsReq.readyState === XMLHttpRequest.DONE) {
            if (vacationsReq.status === 200) {
                const vacations = JSON.parse(vacationsReq.responseText);
                populateVacationsTable(vacations);
            }
            else {
                console.error('Error loading vacations', vacationsReq.responseText);
            }
        }
    };

    vacationsReq.send();
}

function getCSRFToken() {
    return document.querySelector('input[name="csrfmiddlewaretoken"]').value;
}

function populateVacationsTable(vacations) {
    const tbody = document.querySelector('.full-table tbody');
    tbody.innerHTML = '';

    for (const v of vacations) {
        // if the vacation is pending, show it
        if (v.status == 'P') {
            const tr = createTableRow(v);

            tbody.appendChild(tr);
        }
    }
}

function createTableRow(vacation) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
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
    
    const approveButton = tr.querySelector('.approve-button');
    approveButton.addEventListener('click', () => handleVacationStatusChange(vacation.id, 'A'));

    const rejectButton = tr.querySelector('.reject-button');
    rejectButton.addEventListener('click', () => handleVacationStatusChange(vacation.id, 'R'));

    return tr;
}

function handleVacationStatusChange(vacationId, status) {
    const putReq = new XMLHttpRequest();

    putReq.open(
        'PUT',
        '/vacations/update-vacation/' + vacationId
    );

    putReq.onreadystatechange = () => {
        if (putReq.readyState === XMLHttpRequest.DONE) {
            beginLoadVacations();
        }
    };

    const tempForm = document.getElementById('temp-form');
    data = new FormData(tempForm);
    data.append('status', status);
    
    putReq.send(data);
}



