// SELECTING HTML ELEMENTS
const NO_PAYMENT_OPTION_SELECTED_FEEDBACK_ELEM = document.getElementById(
  "no-payment-option-selected-feedback"
);
const INVALID_INPUTS_IN_PAYMENT_METHOD_FEEDBACK_ELEM = document.getElementById(
  "invalid-inputs-in-selected-payment-method-feedback"
);
const PAYMENT_METHOD_SELECTOR_ELEMS =
  document.getElementsByClassName("payment-selector");
const PAYMENT_METHOD_MODAL_INPUT_ELEMS =
  document.getElementsByClassName("modal-text-input");
const SELECT_PAYMENT_METHOD_TEXT_ELEM = document.getElementById(
  "selected-payment-method"
);
const PURCHASE_FORM_ELEM = document.getElementById("address-and-shipment");
const CREDIT_CARD_INPUT_ELEMS = document.getElementsByClassName(
  "credit-card-method-input"
);
const BANK_TRANSFER_INPUT_ELEMS = document.getElementsByClassName(
  "transfer-method-input"
);
const CREDIT_CARD_RADIO_SELECTOR_ELEM = document.getElementById(
  "credit-card-radio-selector"
);
const BANK_TRANSFER__RADIO_SELECTOR_ELEM = document.getElementById(
  "bank-trasnfer-radio-selector"
);
const PAYMENT_OPTIONS_MODAL_BUTTON_ELEM =
  document.getElementById("close-modal-button");
const CONFIRM_PURCHASE_BUTTON_ELEM =
  document.getElementById("form-submit-button");

// DECLARING FUNCTIONS
function validatePaymentMethodSelectionModal() {
  // Check if a payment method was choosed.
  let isAPaymentOptionSelected = false;
  let selectedPaymentMethod = "";
  for (const selectorElem of PAYMENT_METHOD_SELECTOR_ELEMS) {
    if (selectorElem.checked) {
      isAPaymentOptionSelected = true;
      selectedPaymentMethod = selectorElem.dataset.paymentType;
    }
  }

  // If not, display warning feedback.
  if (isAPaymentOptionSelected == false) {
    NO_PAYMENT_OPTION_SELECTED_FEEDBACK_ELEM.classList.remove("d-none");
    NO_PAYMENT_OPTION_SELECTED_FEEDBACK_ELEM.classList.add("d-inline");
    SELECT_PAYMENT_METHOD_TEXT_ELEM.classList.add("text-danger");
    SELECT_PAYMENT_METHOD_TEXT_ELEM.innerHTML = "No se ha seleccionado";
    return false;
  }

  // If yes, remove the previous warnings (if they exist)
  // and display the selected payment method.
  if (isAPaymentOptionSelected == true) {
    NO_PAYMENT_OPTION_SELECTED_FEEDBACK_ELEM.classList.remove("d-inline");
    NO_PAYMENT_OPTION_SELECTED_FEEDBACK_ELEM.classList.add("d-none");
    SELECT_PAYMENT_METHOD_TEXT_ELEM.classList.remove("text-danger");
    SELECT_PAYMENT_METHOD_TEXT_ELEM.innerHTML = `Seleccionado: ${selectedPaymentMethod}`;

    // Check if all inputs fields were valid once
    // a payment method was selected.
    let enabledInputElems = [];
    for (const inputElem of PAYMENT_METHOD_MODAL_INPUT_ELEMS) {
      if (!inputElem.disabled) {
        enabledInputElems.push(inputElem);
      }
    }

    let areAllInputsValid = true;
    for (const inputElem of enabledInputElems) {
      if (inputElem.checkValidity() == false) {
        areAllInputsValid = false;
      }
    }
    if (areAllInputsValid) {
      INVALID_INPUTS_IN_PAYMENT_METHOD_FEEDBACK_ELEM.classList.add("d-none");
      INVALID_INPUTS_IN_PAYMENT_METHOD_FEEDBACK_ELEM.classList.remove(
        "d-inline"
      );
    } else {
      INVALID_INPUTS_IN_PAYMENT_METHOD_FEEDBACK_ELEM.classList.add("d-inline");
      INVALID_INPUTS_IN_PAYMENT_METHOD_FEEDBACK_ELEM.classList.remove("d-none");
    }

    return isAPaymentOptionSelected && areAllInputsValid;
  }
}

function setInputsState(inputElements, inputsState) {
  for (const element of inputElements) {
    if (inputsState == "enabled") {
      element.disabled = false;
    }

    if (inputsState == "disabled") {
      element.disabled = true;
    }
  }
}

function displaySuccessfulPurchaseModal() {
  CONFIRM_PURCHASE_BUTTON_ELEM.setAttribute("data-bs-toggle", "modal");
  CONFIRM_PURCHASE_BUTTON_ELEM.setAttribute(
    "data-bs-target",
    "#purchase-successfull-modal"
  );
  CONFIRM_PURCHASE_BUTTON_ELEM.click();
}

// ADDING EVENT LISTENERS
PURCHASE_FORM_ELEM.addEventListener("submit", (event) => {
  event.preventDefault();
  let isThePurchaseFormValid = validatePaymentMethodSelectionModal();
  if (isThePurchaseFormValid) {
    displaySuccessfulPurchaseModal();
  }

  // Once the form was submitted once, the modal button
  // starts to validate and give feedback when you click it.
  PAYMENT_OPTIONS_MODAL_BUTTON_ELEM.addEventListener("click", (event) => {
    validatePaymentMethodSelectionModal();
  });
});

CREDIT_CARD_RADIO_SELECTOR_ELEM.addEventListener("input", () => {
  setInputsState(CREDIT_CARD_INPUT_ELEMS, "enabled");
  setInputsState(BANK_TRANSFER_INPUT_ELEMS, "disabled");
  SELECT_PAYMENT_METHOD_TEXT_ELEM.innerHTML =
    "Seleccionado: Tarjeta de Crédito";
});

BANK_TRANSFER__RADIO_SELECTOR_ELEM.addEventListener("input", () => {
  setInputsState(BANK_TRANSFER_INPUT_ELEMS, "enabled");
  setInputsState(CREDIT_CARD_INPUT_ELEMS, "disabled");
  SELECT_PAYMENT_METHOD_TEXT_ELEM.innerHTML =
    "Seleccionado: Transferencia Bancaria";
});
