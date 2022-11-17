function validateForm() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");

    const errorFirstName = document.getElementById("errorFirstName");
    const errorLastName = document.getElementById("errorLastName");
    const errorEmail = document.getElementById("errorEmail");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors(
        [firstNameInput, lastNameInput, emailInput],
        [errorFirstName, errorLastName, errorEmail, errorsSummary],
        errorsSummary
    );

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add(errorInputClassName);
        errorFirstName.innerText = errorRequiredText;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add(errorInputClassName);
        errorFirstName.innerText = getErrorLengthText(2, 60);
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add(errorInputClassName);
        errorLastName.innerText = errorRequiredText;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add(errorInputClassName);
        errorLastName.innerText = getErrorLengthText(2, 60);
    }

    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add(errorInputClassName);
        errorEmail.innerText = errorRequiredText;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add(errorInputClassName);
        errorEmail.innerText = getErrorLengthText(5, 60);
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add(errorInputClassName);
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    if (!valid) {
        errorsSummary.innerText = errorsSummaryText;
    }
    return valid;
}