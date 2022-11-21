function validateForm() {
    const clientInput = document.getElementById("client");
    const recordInput = document.getElementById("record");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");

    const errorClient = document.getElementById("errorClient");
    const errorRecord = document.getElementById("errorRecord");
    const errorStartDate = document.getElementById("errorStartDate");
    const errorEndDate = document.getElementById("errorEndDate");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors(
        [clientInput, recordInput, startDateInput, endDateInput],
        [errorClient, errorRecord, errorStartDate, errorEndDate],
        errorsSummary
    );

    let valid = true;

    if (!checkRequired(clientInput.value)) {
        valid = false;
        clientInput.classList.add(errorInputClassName);
        errorClient.innerText = errorRequiredText;
    }

    if (!checkRequired(recordInput.value)) {
        valid = false;
        recordInput.classList.add(errorInputClassName);
        errorRecord.innerText = errorRequiredText;
    }

    let dateNow = new Date(),
        day = '' + dateNow.getUTCDate(),
        month = '' + (dateNow.getMonth() + 1),
        year = '' + dateNow.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    let nowString = [year, month, day].join('-');

    if (!checkRequired(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add(errorInputClassName);
        errorStartDate.innerText = errorRequiredText;
    } else if (!checkDate(startDateInput.value)) {
        valid = false;
        startDateInput.classList.add(errorInputClassName);
        errorStartDate.innerText = errorDateFormat;
    } else if (checkDateIfAfter(startDateInput.value, nowString)) {
        valid = false;
        startDateInput.classList.add(errorInputClassName);
        errorStartDate.innerText = "Data nie może być przyszła";
    } else if (document.contains(endDateInput) && checkRequired(endDateInput.value)) {
        if (!checkDate(endDateInput.value)) {
            valid = false;
            endDateInput.classList.add(errorInputClassName);
            errorEndDate.innerText = errorDateFormat;
        } else if (checkDateIfAfter(startDateInput.value, endDateInput.value)) {
            valid = false;
            endDateInput.classList.add(errorInputClassName);
            errorEndDate.innerText = "Data do musi być późniejsza niż Data od";
        }
    }

    if (!valid) {
        errorsSummary.innerText = errorsSummaryText;
    }
    return valid;
}