// - Add their email and submit the form
// - See a success message with their email after successfully submitting the form
// - See form validation messages if:
//   - The field is left empty
//   - The email address is not formatted correctly
// - View the optimal layout for the interface depending on their device's screen size
// - See hover and focus states for all interactive elements on the page

let subscribePage = document.querySelector('div.subscribe-container')
let tnksPage = document.querySelector('div.tnks-msg-container ')

let emailInput = document.querySelector('input[for="email"]')
let emailLabelError = document.querySelector('label[for="email-error"]')

let btnSubmit = document.querySelector('button#subscribe')

let btnDismiss = document.querySelector('button.dimiss-btn')

let emailToShow = document.querySelector('strong#emailToShow')

let errorMsgs = ['Please provide a email', 'Valid Email required']

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
}

btnSubmit.addEventListener('click', () => {
    let email = emailInput.value

    if (email == '') {
        emailLabelError.innerHTML = errorMsgs[0]
        emailInput.classList.add('error')
    } else if (!validateEmail(email)) {
        emailInput.classList.add('error')
        emailLabelError.innerHTML = errorMsgs[1]
    } else {
        emailInput.classList.remove('error')
        emailLabelError.innerHTML = ''

        emailToShow.innerHTML = email

        subscribePage.classList.add('hidden')
        tnksPage.classList.remove('hidden')
    }
})

emailInput.addEventListener('focus', () => {
    emailInput.classList.remove('error')
    emailLabelError.innerHTML = ''
})

btnDismiss.addEventListener('click', () => {
    subscribePage.classList.remove('hidden')
    tnksPage.classList.add('hidden')
})