import { isValidEmployeeForm } from "./helper-validations.js";

const saveButton = document.getElementById('save-btn');
const deleteButton = document.getElementById('delete-btn');
const form = document.getElementById('edit-employee-form');

saveButton.addEventListener('click', (event) => {
    if (isValidEmployeeForm()) {
        const data = new FormData(form);

        const putReq = new XMLHttpRequest();

        putReq.open(
            'PUT',
            '/employee-detail/' + employeeId
        );

        putReq.onreadystatechange = () => {
            if (putReq.readyState === XMLHttpRequest.DONE) {
                if (putReq.status == 200) {
                    window.location.replace('/search-employee');
                }
                else {
                    alert('BAD REQUEST.\n' + putReq.responseText);
                }
            }
        }

        putReq.send(data);
    }
});

deleteButton.addEventListener('click', (event) => {
    if (confirm('Are you sure you want to delete this employee?')) {
        
        const deleteReq = new XMLHttpRequest();
        deleteReq.open(
            'DELETE',
            '/employee-detail/' + employeeId
        )

        deleteReq.onreadystatechange = () => {
            if (deleteReq.readyState === XMLHttpRequest.DONE) {
                if (deleteReq.status == 204) {
                    window.location.replace('/search-employee');
                }
                else {
                    alert('NOT FOUND.\n' + deleteReq.responseText);
                }
            }
        }

        deleteReq.send();
    }
});
