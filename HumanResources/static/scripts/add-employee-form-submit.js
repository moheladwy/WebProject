function addEmployeeActions() {
    const inputs = document.getElementsByClassName("input-field");
    const submit = document.getElementById("submit-btn");

    submit.addEventListener('click', (e) => {
        // e.preventDefault();

        // if not valid input yet => do nothing
        // .....

        // get data from form
        const data = new FormData(document.getElementById('add-employee-form'));

        // populate employee object with data entries(name: value)
        const employee = {};
        for (const [key, value] of data.entries()) {
            employee[key] = value;
        }

        // get stored employees map
        let employees = loadFromStorage();
        if (employees === null)
            employees = {};

        employees[employee.id] = employee;

        console.log(employees);

        // save modified map
        saveToStorage(employees);

        for (const [name, value] of data.entries()) {
            console.log(`${name}: ${value},`);
        }
    });

    submit.addEventListener('click', (e) => {
        document.getElementById('add-employee-form').className = 'submitted';
    });
}

const saveToStorage = (employees) => {
    localStorage.setItem('employees', JSON.stringify(employees));
}

const loadFromStorage = () => {
    if (!localStorage.getItem('employees'))
        return null;
    return JSON.parse(localStorage.getItem('employees'));
}
