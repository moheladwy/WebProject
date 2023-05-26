document.body.onload = function (event) {
    const employeesRequest = new XMLHttpRequest();
    employeesRequest.open(
        'GET',
        '/employee-list'
    );

    employeesRequest.onreadystatechange = () => {
        if (employeesRequest.readyState == XMLHttpRequest.DONE && employeesRequest.status == 200) {
            const employees = JSON.parse(employeesRequest.responseText);
            populateEmployeesTable(employees);
        }
    }
    employeesRequest.send();
};

function populateEmployeesTable(employees) {
    const tbody = document.querySelector('tbody');
    if (employees) {
        for (const employee of employees) {
            const tr = templateSearchTableRow();

            tr.querySelector('.employee-id').innerHTML = employee.id;
            tr.querySelector('.employee-name').innerHTML = employee.name;
            tr.querySelector('.employee-email').innerHTML = employee.email;
            tr.querySelector('.employee-phone-number').innerHTML = employee.phoneNumber;
            tr.querySelector('#add-vacation-link').href = `/search-employee/vacation-form/${employee.id}`;
            tr.querySelector('#edit-employee-link').href = `/search-employee/edit-employee/${employee.id}`;

            tbody.appendChild(tr);
        }
    }
    else {
        const tr = "<tr>No Employees, try to add one!</tr>";
        tbody.innerHTML = tr;
    }
}

function templateSearchTableRow() {
    const templateRow = document.createElement('tr');
    templateRow.innerHTML = `
    <td class="employee-id"></td>
    <td class="employee-name"></td>
    <td class="employee-email"></td>
    <td class="employee-phone-number"></td>
    <td class="buttons">
        <a id="add-vacation-link" href=""><button class="add-vacation-button"><i class="fa-solid fa-plus"></i>add vacation</button></a>
        <a id="edit-employee-link" href=""><button class="edit-button"><i class="fa-solid fa-pen-to-square"></i>edit employee</button></a>
    </td>
    `;
    return templateRow;
}