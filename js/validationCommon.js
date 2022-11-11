const errorRequiredText = "Pole jest wymagane";
const errorsSummaryText = "Formularz zawiera błedy";
const errorDateFormat = "Data powinna być w formacie yyyy-mm-dd";
const errorInputClassName = "error-input";
const datePattern = /(\d{4})-(\d{2})-(\d{2})/;

function getErrorLengthText(min, max) {
    return `Pole powinno zawierać od ${min} do ${max} znaków`;
}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] !== null) {
            inputs[i].classList.remove("error-input");
        }
    }
    for (let i = 0; i < errorTexts.length; i++) {
        if (inputs[i] !== null) {
            errorTexts[i].innerText = "";
        }
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    return value !== "";
}

function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    return !((max && length > max) || (min && length < min));
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(value);
}

function checkNumber(value) {
    return !(!value || isNaN(value));
}

function checkNumberRange(value, min, max) {
    if (!value || isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value > max || value < min) {
        return false;
    }
    return true;
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    return datePattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value || !compareTo || !datePattern.test(value) || !datePattern.test(compareTo)) {
        return false;
    }
    if (new Date(value).getTime() <= new Date(compareTo).getTime()) {
        return false;
    }
    return true;
}


