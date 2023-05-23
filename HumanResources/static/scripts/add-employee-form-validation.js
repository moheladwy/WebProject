


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementsByTagName('form')[0];
    const id = document.getElementById('id');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const availableVacationDays = document.getElementById('available-vacation-days');
    const approvedVacationDays = document.getElementById('approved-vacation-days');
    const salary = document.getElementById('salary');
    const dob = document.getElementById('birth-day');

    form.addEventListener('submit', () => {
        if (!isValidId(id.textContent))
        {
                
        }
    })
});




function isValidId(id) {
    const regex = /^(2023)(\d){4}$/;
    return regex.test(id);
}

function isValidEgyptPhone(phoneNumber) {
    const regex = /^(\+20)(1)[0125](\d){8}$/;
    return regex.test(phoneNumber);
}

function isValidEmail(email) {
    const regex = /^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\\w-]+\\.)+[a-zA-Z]{2,63}$/;
    return regex.test(email);
}