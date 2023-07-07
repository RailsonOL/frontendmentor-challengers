document.addEventListener("DOMContentLoaded", function () {
    let datForms = document.querySelectorAll('.date-form > div')
    let dataInputs = document.querySelectorAll('.date-form > * > input')
    let labelErrors = document.querySelectorAll('.date-form > * > .label-error')

    let dayInput = dataInputs[0];
    let monthInput = dataInputs[1];
    let yearInput = dataInputs[2];

    let dayLabelError = labelErrors[0];
    let monthLabelError = labelErrors[1];
    let yearLabelError = labelErrors[2];

    let submitBtn = document.querySelector('.submit-button')

    let yearsPh = document.querySelector('.years-placeholder')
    let monthsPh = document.querySelector('.months-placeholder')
    let daysPh = document.querySelector('.days-placeholder')

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

        if (validDateRes.day.valid) {
            dayLabelError.innerHTML = '';
            dayInput.classList.remove('error');
            datForms[0].classList.remove('error');
        } else {
            dayLabelError.innerHTML = validDateRes.day.error;
            dayInput.classList.add('error');
            datForms[0].classList.add('error');
        }

        if (validDateRes.month.valid) {
            monthLabelError.innerHTML = '';
            monthInput.classList.remove('error');
            datForms[1].classList.remove('error');
        } else {
            monthLabelError.innerHTML = validDateRes.month.error;
            monthInput.classList.add('error');
            datForms[1].classList.add('error');
        }

        if (validDateRes.year.valid) {
            yearLabelError.innerHTML = '';
            yearInput.classList.remove('error');
            datForms[2].classList.remove('error');
        } else {
            yearLabelError.innerHTML = validDateRes.year.error;
            yearInput.classList.add('error');
            datForms[2].classList.add('error');
        }
    }

    function validateDate(day, month, year) {

        yearsPh.innerHTML = '--';
        monthsPh.innerHTML = '--';
        daysPh.innerHTML = '--';

        let res = {
            day: { valid: true, error: '' },
            month: { valid: true, error: '' },
            year: { valid: true, error: '' },
        }

        if (day == '') {
            res.day.valid = false;
            res.day.error = 'This field is required';
        }

        if (month == '') {
            res.month.valid = false;
            res.month.error = 'This field is required';
        }

        if (year == '') {
            res.year.valid = false;
            res.year.error = 'This field is required';
        }

        if (day == '' || month == '' || year == '') {
            return res;
        }

        if (
            day < 1 || day > 31
        ) {
            res.day.valid = false;
            res.day.error = 'Must be a valid day';
        }

        if (month < 1 || month > 12) {
            res.month.valid = false;
            res.month.error = 'Must be a valid month';
        }

        if (year < 1000 || year > 9999) {
            res.year.valid = false;
            res.year.error = 'Must be a valid year';
        }

        if (year > new Date().getFullYear()) {
            res.year.valid = false;
            res.year.error = 'Must be in past';

            return res;
        }

        const date = new Date(year, month - 1, day);
        const isValidDate =
            date.getDate() == day &&
            date.getMonth() == month - 1 &&
            date.getFullYear() == year;

        if (!isValidDate) {
            res.day.valid = false;
            res.day.error = 'Must be a valid date';
            res.month.valid = false;
            res.month.error = '';
            res.year.valid = false;
            res.year.error = '';

        } else if (isValidDate) {
            //check is date is in future
            if (date > new Date()) {
                res.year.valid = false;
                res.year.error = 'Must be in past';
    
                return res;
            } else {

                //age calculator
                const today = new Date();
                const birthDate = new Date(year, month - 1, day);
                
                const yearsDiff = today.getUTCFullYear() - birthDate.getUTCFullYear();
                const monthsDiff = today.getUTCMonth() - birthDate.getUTCMonth();
                const daysDiff = today.getUTCDate() - birthDate.getUTCDate();
                
                let ageYears = yearsDiff;
                let ageMonths = monthsDiff;
                let ageDays = daysDiff;
                
                if (daysDiff < 0) {
                  const lastMonthDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), 0).getUTCDate();
                  ageMonths--;
                  ageDays += lastMonthDate;
                }
                
                if (monthsDiff < 0) {
                  ageYears--;
                  ageMonths += 12;
                }
                
                yearsPh.innerHTML = ageYears;
                monthsPh.innerHTML = ageMonths;
                daysPh.innerHTML = ageDays;
            }
        }

        return res;
    }
});