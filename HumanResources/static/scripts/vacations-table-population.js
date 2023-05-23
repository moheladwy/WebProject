document.body.onload = function (event) {

    const vacationsReq = new XMLHttpRequest();
    vacationsReq.open(
        'GET',
        window.location.href + 'get-all'
    );

    vacationsReq.onreadystatechange = () => {
        if (vacationsReq.readyState === XMLHttpRequest.DONE && vacationsReq.status === 200) {
            const response = JSON.parse(vacationsReq.responseText);
            const vacations = response['vacations'];

            // get each vacation its employee
            for (const v of vacations) {
                const employeeReq = new XMLHttpRequest();
                employeeReq.open(
                    'GET',
                    '/get-employee/' + v.employee_id,
                    false
                )

                employeeReq.onreadystatechange = () => {
                    if (employeeReq.readyState === XMLHttpRequest.DONE
                        && employeeReq.status === 200) {
                        const e = JSON.parse(employeeReq.responseText);
                        v.employee = e['employee'];
                    }  
                }

                employeeReq.send();
            }

            // console.log(vacations);

            populateVacationsTable(vacations);
        }
    };

    vacationsReq.send();
}

function populateVacationsTable(vacations) {
    const tbody = document.querySelector('.full-table').querySelector('tbody');

    for (const v of vacations) {
        // if the vacation is pending, show it
        if (v.status == 'P') {
            const tr = templateTableRow();

            tr.querySelector('#employee-id').innerHTML = v.employee.id;
            tr.querySelector('#employee-name').innerHTML = v.employee.name;
            tr.querySelector('#employee-email').innerHTML = v.employee.email;
            tr.querySelector('#employee-phone-number').innerHTML = v.employee.phoneNumber;
            tr.querySelector('#vacation-start-date').innerHTML = v.startDate;
            tr.querySelector('#vacation-end-date').innerHTML = v.endDate;
            tr.querySelector('#vacation-reason').innerHTML = v.vacationReason;
            
            tbody.appendChild(tr);
        }
    }
}

function templateTableRow() {
    const templateRow = document.createElement('tr');
    templateRow.innerHTML = `
    <td id="employee-id"></td>
    <td id="employee-name"></td>
    <td id="employee-email"></td>
    <td id="employee-phone-number"></td>
    <td id="vacation-start-date"></td>
    <td id="vacation-end-date"></td>
    <td id="vacation-reason"></td>
    <td>
        <button class="approve-button" type="button"><i class="fa-regular fa-circle-check"></i></button>
        <button class="reject-button" type="button"><i class="fa-regular fa-circle-xmark"></i></button>
    </td>
`;
    
    return templateRow;
}
