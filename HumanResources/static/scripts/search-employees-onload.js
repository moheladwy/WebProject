document.body.onload = searchEmployeesOnload;

function searchEmployeesOnload() {
    populateTable();    
    addButtonEvents();
    addVacationButtonEvents();
}

function populateTable() {
    const employees = loadFromStorage();
    if (employees === null)
        return;

    const tableBody = document.getElementById('table-body');
    console.log(tableBody);
    
    for (const id in employees) {
        const record = templateTableRow();
        record.children[1].querySelector('.employee-id').innerHTML = employees[id].id;
        record.children[2].innerHTML = employees[id].name;
        record.children[3].innerHTML = employees[id].email;
        record.children[4].innerHTML = employees[id].phone_number;
        console.log(tableBody);
        tableBody.appendChild(record);
    }
}

const templateTableRow = () => {
    const templateRow = document.createElement('tr');
    templateRow.innerHTML =
        `<td><div class="employee-id"></div></td>
        <td></td>
        <td></td>
        <td></td>`;

    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = 
    `<a href="{% url 'vacationForm' %}"><button class="add-vacation-button"><i class="fa-solid fa-plus"></i>add vacation</button></a>
    <a href="{% url 'editEmployee' %}"><button class="edit-button"><i class="fa-solid fa-pen-to-square"></i>edit employee</button></a>`;

    templateRow.appendChild(actionsCell);
    return templateRow;
}

function loadFromStorage() {
    if (!localStorage.getItem('employees'))
        return null;

    return JSON.parse(localStorage.getItem('employees'));
}

function addButtonEvents() {
    const buttons = document.getElementsByClassName('edit-button');

    for (const button of buttons) {
        button.addEventListener('click', (e) => {
            const id = button.closest('tr').querySelector('.employee-id').innerHTML;
            localStorage.setItem('current_edit', id);
        });
    }
}

function addVacationButtonEvents() {
    const buttons = document.getElementsByClassName('add-vacation-button');

    for (const button of buttons) {
        button.addEventListener('click', (event) => {
           const id = button.closest('tr').querySelector('.employee-id').innerHTML;
           localStorage.setItem('currentAddVacation', id);
        });
    }
}
