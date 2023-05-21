const employees = loadFromStorage();
const currentEmployee = employees[localStorage.getItem('current_edit')];
const currentEmployeeId = currentEmployee.id;
const saveButton = document.getElementById('save-btn');
const cancelButton = document.getElementById('cancel-btn');
const deleteButton = document.getElementById('delete-btn');
const form = document.getElementById('edit-employee-form');

populateForm();

function populateForm() {
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
}

saveButton.addEventListener('click', (event) => {
    const formData = new FormData(form);
    let employee = {};
    for (const [key, value] of formData.entries()) {
        employee[key] = value;
    }

    if (employee.id !== currentEmployee.id) {
        delete employees[currentEmployee.id];
    }

    employees[employee.id] = employee;

    saveToStorage(employees);
});

cancelButton.addEventListener('click', (event) => {
    // add logic if something is edited?
});

deleteButton.addEventListener('click', (event) => {
    // prompt for confirmation
    delete employees[currentEmployee.id];
    saveToStorage(employees);
});

function saveToStorage(employees) {
    localStorage.setItem('employees', JSON.stringify(employees));
}

function loadFromStorage() {
    if (!localStorage.getItem('employees'))
        return null;

    return JSON.parse(localStorage.getItem('employees'));
}

localStorage.removeItem('current_edit');
