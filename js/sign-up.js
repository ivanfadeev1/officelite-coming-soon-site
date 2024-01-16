/* Required fields validation */

const form = document.querySelector('.sign-up__form');
const inputsToCheck = document.querySelectorAll('.form__input-box--to-be-checked');

const handleInputValidation = (inputToCheck) => {
    const input = inputToCheck.querySelector('.form__input-box-input');
    const button = inputToCheck.querySelector('.form__input-box-button');

    if (input.value === '+7') {
        // Resets phone field
        input.value = '';
        inputToCheck.classList.remove('form__input-box--active');
        button.setAttribute('aria-hidden', 'true');
        button.disabled = true;
    } else if (input.value !== '' && !input.checkValidity()) {
        inputToCheck.classList.add('form__input-box--active');
        button.setAttribute('aria-hidden', 'false');
        button.disabled = false;
    }
};

const handleInputFocus = (inputToCheck) => {
    const input = inputToCheck.querySelector('.form__input-box-input');
    const button = inputToCheck.querySelector('.form__input-box-button');

    if (inputToCheck.classList.contains('form__input-box--active')) {
        inputToCheck.classList.remove('form__input-box--active');
        button.setAttribute('aria-hidden', 'true');
        button.disabled = true;
    }
};

const handleResetButtonClick = (inputToCheck) => {
    const input = inputToCheck.querySelector('.form__input-box-input');
    const button = inputToCheck.querySelector('.form__input-box-button');

    inputToCheck.classList.remove('form__input-box--active');
    input.value = '';
    input.focus();
    button.setAttribute('aria-hidden', 'true');
    button.disabled = true;
};

inputsToCheck.forEach((inputToCheck) => {
    const input = inputToCheck.querySelector('.form__input-box-input');
    const button = inputToCheck.querySelector('.form__input-box-button');

    input.addEventListener('blur', () => {
        handleInputValidation(inputToCheck);
    });

    input.addEventListener('focus', () => {
        handleInputFocus(inputToCheck);
    });

    button.addEventListener('click', () => {
        handleResetButtonClick(inputToCheck);
    });
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    inputsToCheck.forEach((inputToCheck) => {
        const input = inputToCheck.querySelector('.form__input-box-input');

        if (input.value === '') {
            inputToCheck.classList.add('form__input-box--missing');
        }

        input.addEventListener('focus', () => {
            inputToCheck.classList.remove('form__input-box--missing');
        });
    });

    const inputs = document.querySelectorAll('.form__input-box-input');

    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });

    if (isValid) {
        inputs.forEach(input => {
            input.value = '';
        });
    }
});

/* Custom select */

const select = document.querySelector('.form__select');
const selectButton = document.querySelector('.form__select-button');
const inputsToDisable = document.querySelectorAll('.form__input-box--to-be-disabled');
const selectedName = document.querySelector('.form__select-button-value-name');
const selectedPrice = document.querySelector('.form__select-button-value-price');
const optionsList = document.querySelectorAll('.form__select-dropdown-option');

function toggleSelect() {
    select.classList.toggle('form__select--active');
    selectButton.setAttribute('aria-expanded', select.classList.contains('form__select--active'));

    inputsToDisable.forEach(inputToDisable => {
        const input = inputToDisable.querySelector('.form__input-box-input');
        input.disabled = select.classList.contains('form__select--active');
    });
}

function selectOption() {
    inputsToDisable.forEach(inputToDisable => {
        const input = inputToDisable.querySelector('.form__input-box-input');
        input.disabled = false;
    });
}

function handleOptionSelection(e) {
    if ((e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) || e.key === 'Enter') {
        selectedName.textContent = this.querySelector('.form__select-dropdown-option-label-name').textContent;
        selectedPrice.textContent = this.querySelector('.form__select-dropdown-option-label-price').textContent;

        select.classList.remove('form__select--active');
        select.dispatchEvent(new Event('optionSelected'));
    }
}

selectButton.addEventListener('click', toggleSelect);
select.addEventListener('optionSelected', selectOption);

optionsList.forEach(option => {
    option.addEventListener('keyup', handleOptionSelection);
    option.addEventListener('click', handleOptionSelection);

    option.addEventListener('keydown', e => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            option.click();
        }
    });

    option.addEventListener('keyup', e => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
        }
    });
});

/* Phone number formatting */

const phoneInput = document.querySelector('#phone-field');

const handleFocus = () => {
    if (phoneInput.value === '') {
        phoneInput.value = '+7';
    }
};

const handleInput = () => {
    phoneInput.value = formatPhoneNumber(phoneInput.value);
};

const handleBeforeInput = (evt) => {
    if (evt.inputType === 'deleteContentBackward') {
        const value = evt.target.value;
        const selectionStart = evt.target.selectionStart;
        if (value.charAt(selectionStart - 2) === '-') {
            evt.preventDefault();
            evt.target.value = value.slice(0, selectionStart - 2) + value.slice(selectionStart);
            evt.target.setSelectionRange(selectionStart - 2, selectionStart - 2);
        }
    }
};

function formatPhoneNumber(value) {
    if (!value) return value;
    const phoneNumber = value.replace(/\D/g, '');

    if (phoneNumber.length < 2) {
        return `+7`;
    }
    if (phoneNumber.length < 5) {
        return `+7 (${phoneNumber.slice(1)}`;
    }
    if (phoneNumber.length < 8) {
        return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    }
    if (phoneNumber.length < 10) {
        return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    }
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
}

phoneInput.addEventListener('focus', () => handleFocus());
phoneInput.addEventListener('input', () => handleInput());
phoneInput.addEventListener('beforeinput', (evt) => handleBeforeInput(evt));