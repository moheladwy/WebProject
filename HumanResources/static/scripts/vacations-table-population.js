document.body.onload = function (event) {

    const xhttp = new XMLHttpRequest();
    xhttp.open(
        'GET',
        window.location.href + 'get-all'
    );

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            const response = JSON.parse(xhttp.responseText);
            const vacations = response['vacations'];

            populateVacationsTable(vacations);
        }
    };

    xhttp.send();
}

function populateVacationsTable(vacations) {
    const tr = document.createElement('tr');
    
}
