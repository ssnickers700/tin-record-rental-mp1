function validateForm() {
    const recordNameInput = document.getElementById("recordName");
    const artistNameInput = document.getElementById("artistName");
    const priceInput = document.getElementById("price");
    const unitInput = document.getElementById("unit");

    const errorRecordName = document.getElementById("errorRecordName");
    const errorArtistName = document.getElementById("errorArtistName");
    const errorPrice = document.getElementById("errorPrice");
    const errorUnit = document.getElementById("errorUnit");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors(
        [recordNameInput, artistNameInput, priceInput, unitInput],
        [errorRecordName, errorArtistName, errorPrice, errorUnit],
        errorsSummary);

    let valid = true;

    if (!checkRequired(recordNameInput.value)) {
        valid = false;
        recordNameInput.classList.add(errorInputClassName);
        errorRecordName.innerText = errorRequiredText;
    } else if (!checkTextLengthRange(recordNameInput.value, 1, 60)) {
        valid = false;
        recordNameInput.classList.add(errorInputClassName);
        errorRecordName.innerText = getErrorLengthText(1, 60);
    }

    if (!checkRequired(artistNameInput.value)) {
        valid = false;
        artistNameInput.classList.add(errorInputClassName);
        errorArtistName.innerText = errorRequiredText;
    } else if (!checkTextLengthRange(artistNameInput.value, 1, 60)) {
        valid = false;
        artistNameInput.classList.add(errorInputClassName);
        errorArtistName.innerText = getErrorLengthText(1, 60);
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add(errorInputClassName);
        errorPrice.innerText = errorRequiredText;
    } else if (!checkNumber(priceInput.value)) {
        valid = false;
        priceInput.classList.add(errorInputClassName);
        errorPrice.innerText = "Wartość powinna być liczbą";
    } else if (!checkNumberRange(priceInput.value, 0, 1_000_000)) {
        valid = false;
        priceInput.classList.add(errorInputClassName);
        errorPrice.innerText = "Podaj wartość od 0 do 1,000,000";
    }

    if (!checkRequired(unitInput.value)) {
        valid = false;
        unitInput.classList.add(errorInputClassName);
        errorUnit.innerText = errorRequiredText;
    } else if (!checkNumber(unitInput.value)) {
        valid = false;
        unitInput.classList.add(errorInputClassName);
        errorUnit.innerText = "Wartość powinna być liczbą";
    } else if (!checkNumberRange(unitInput.value, 0, 1_000_000)) {
        valid = false;
        unitInput.classList.add(errorInputClassName);
        errorUnit.innerText = "Podaj wartość od 0 do 1,000,000";
    } else if (!checkInteger(unitInput.value)) {
        valid = false;
        unitInput.classList.add(errorInputClassName);
        errorUnit.innerText = "Wartość powinna być liczbą całkowitą";
    }

    if (!valid) {
        errorsSummary.innerText = errorsSummaryText;
    }
    return valid;
}