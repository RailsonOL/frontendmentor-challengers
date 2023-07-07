document.addEventListener("DOMContentLoaded", function () {
    let datForm = document.querySelector('.date-form')
    let dataInputs = document.querySelectorAll('.date-form > * > input')
    let labelErrors = document.querySelectorAll('.date-form > * > .label-error')

    let dayInput = dataInputs[0];
    let monthInput = dataInputs[1];
    let yearInput = dataInputs[2];

    let dayLabelError = labelErrors[0];
    let monthLabelError = labelErrors[1];
    let yearLabelError = labelErrors[2];

    let submitBtn = document.querySelector('.submit-button')

    submitBtn.addEventListener('click', validateDateInput)

    //validating the form
    dataInputs.forEach(element => {
        element.addEventListener('input', function (e) {
            const inputValue = e.target.value
            const numericValue = inputValue.replace(/\D/g, '')

            e.target.value = numericValue
        })

        // element.addEventListener('input', validateDateInput)
    });

    function validateDateInput() {
        const dayValue = dayInput.value;
        const monthValue = monthInput.value;
        const yearValue = yearInput.value;
        const validDateRes = validateDate(dayValue, monthValue, yearValue);

        console.log(validDateRes)

        if(!validDateRes.day && !validDateRes.month && !validDateRes.year) {
            dayLabelError.innerHTML = 'Must be a valid date';
            return
        }

        if(validDateRes.day) {
            dayLabelError.innerHTML = '';
            dayInput.classList.remove('error');
        }else{
            dayLabelError.innerHTML = 'Must be a valid day';
            dayInput.classList.add('error');
        }

        if(validDateRes.month) {
            monthLabelError.innerHTML = '';
            monthInput.classList.remove('error');
        }else{
            monthLabelError.innerHTML = 'Must be a valid month';
            monthInput.classList.add('error');
        }

        if(validDateRes.year) {
            yearLabelError.innerHTML = '';
            yearInput.classList.remove('error');
        }else{
            yearLabelError.innerHTML = 'Must be a valid year';
            yearInput.classList.add('error');
        }

        // if (isValid.day) {
        //     dayLabelError.innerHTML = '';
        //     datForm.classList.remove('error');
        //     dayInput.classList.remove('error');
        // } else {
        //     dayLabelError.innerHTML = 'Must be a valid day';
        //     dayInput.classList.add('error');
        //     datForm
        // }

        // if (isValid.month) {
        //     monthLabelError.innerHTML = '';
        //     monthInput.classList.remove('error');
        // } else {
        //     monthLabelError.innerHTML = 'Must be a valid month';
        //     monthInput.classList.add('error');
        // }

        // if (isValid.year) {
        //     yearLabelError.innerHTML = '';
        //     yearInput.classList.remove('error');
        // } else {
        //     yearLabelError.innerHTML = 'Must be a valid year';
        //     yearInput.classList.add('error');
        // }
    }

});

function validateDate(day, month, year) {
    const date = new Date(year, month - 1, day);

    const isValidDate =
        date.getDate() == day &&
        date.getMonth() == month - 1 &&
        date.getFullYear() == year;

    console.log(date)
    console.log(date.getMonth())

    const isInvalidDay = date.getDate() != day;
    const isInvalidMonth = date.getMonth() != month - 1;
    const isInvalidYear = date.getFullYear() != year;

    let res = { day: true, month: true, year: true}

    if (!isValidDate) {
        if (isInvalidDay) {
            res.day = false;
        } 
        if (isInvalidMonth) {
            res.month = false;
        } 
        if (isInvalidYear) {
            res.year = false;
        }

        return res;
    }

    return res;
}

// function validateDate(day, month, year) {
//     const dayInt = parseInt(day, 10);
//     const monthInt = parseInt(month, 10);
//     const yearInt = parseInt(year, 10);

//     // Validações específicas da data
//     if (
//         isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt) ||
//         dayInt < 1 || dayInt > 31 ||
//         monthInt < 1 || monthInt > 12 ||
//         yearInt < 1000 || yearInt > 9999
//     ) {
//         return false;
//     }

//     const dateObj = new Date(yearInt, monthInt - 1, dayInt);

//     return { day: dateObj.getDate(), month: dateObj.getMonth() + 1, year: dateObj.getFullYear() }
// }