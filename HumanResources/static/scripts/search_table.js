let searchBySelectedIndex; // stores which index to search by an element


// is it ok/readable to make select has a value that is the index of the data to search by?
// check options value in search-emps.html
document.addEventListener('DOMContentLoaded', () => {
    const searchBy = document.querySelector(".search-by-options");   
    searchBySelectedIndex = searchBy.value;

    searchBy.addEventListener("change", () => {
        searchBySelectedIndex =  searchBy.value;
        filterTableRows();
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector(".input-bar");
    inputField.addEventListener("keyup", () => {
        filterTableRows();
    });
});

// hides un-wanted rows from search results
function filterTableRows() {
    const inputField = document.querySelector(".input-bar");
    let inputLowerText = inputField.value.toLowerCase();
    
    const table = document.getElementsByTagName("table")[0];
    let tableRows = table.getElementsByTagName("tr");
    for (let i = 0; i < tableRows.length; i++) {
        let tableCell = tableRows[i].getElementsByTagName("td")[searchBySelectedIndex];
        if (tableCell) {
            tableCellLowerText = tableCell.textContent.toLowerCase();

            if (tableCellLowerText.indexOf(inputLowerText) > -1) {
                tableRows[i].style.display = ""; // display
            }
            else {
                tableRows[i].style.display = "none"; // hide
            }
        }
    }
};
;