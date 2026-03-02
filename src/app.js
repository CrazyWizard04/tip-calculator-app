const billAmtInput = document.getElementById("bill-amount");
const customTipInput = document.getElementById("custom-tip");
const peopleAmtInput = document.getElementById("people-amount");

const tipButtons = document.querySelectorAll(".tip-btn");
const resetButton = document.querySelector(".reset-btn");

const calculatorForm = document.getElementById("calculator-form");
const tipAmtResult = document.querySelector(".tip-amount-result");
const totalAmtResult = document.querySelector(".total-amount-result");

let billAmt = 0;
let tipPct = 0;
let peopleAmt = 0;

const getTipAmount = () => {
  return ((billAmt * (tipPct / 100)) / peopleAmt).toFixed(2);
};

const getTotalAmount = () => {
  return ((billAmt * (1 + tipPct / 100)) / peopleAmt).toFixed(2);
};

const toggleActiveButtons = () => {
  tipButtons.forEach((btn) => {
    btn.classList.toggle("active", Number(btn.dataset.value) === tipPct);
  });
};

const setError = (el, msg) => {
  const formElement = el.closest(".form-element-container");
  const errorDisplay = formElement.querySelector(".error-display");

  errorDisplay.textContent = msg;

  if (msg) {
    el.classList.add("error");
  } else {
    el.classList.remove("error");
  }
};

const validateInput = (input) => {
  setError(input, "");
  if (!input.value.trim()) return false;

  if (input.value <= 0) {
    setError(input, "Can't be 0 or lower");
    return false;
  }

  return true;
};

const handleState = (input, setState) => {
  if (!validateInput(input)) return;

  setState(Number(input.value));
  calculate();
};

const calculate = () => {
  if (billAmt <= 0 || tipPct <= 0 || peopleAmt <= 0) return;

  tipAmtResult.textContent = `$${getTipAmount()}`;
  totalAmtResult.textContent = `$${getTotalAmount()}`;

  resetButton.disabled = false;
};

const resetCalculator = () => {
  billAmt = 0;
  tipPct = 0;
  peopleAmt = 0;

  tipAmtResult.textContent = "$0.00";
  totalAmtResult.textContent = "$0.00";

  calculatorForm.reset();
  toggleActiveButtons();
  resetButton.disabled = true;
};

billAmtInput.addEventListener("input", () => {
  handleState(billAmtInput, (value) => (billAmt = value));
});

customTipInput.addEventListener("input", () => {
  handleState(customTipInput, (value) => {
    tipPct = value;
    toggleActiveButtons();
  });
});

peopleAmtInput.addEventListener("input", () => {
  handleState(peopleAmtInput, (value) => (peopleAmt = value));
});

tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const dataValue = Number(btn.dataset.value);
    if (tipPct === dataValue) return;

    tipPct = dataValue;
    customTipInput.value = "";

    toggleActiveButtons();
    calculate();
  });
});

resetButton.addEventListener("click", resetCalculator);
