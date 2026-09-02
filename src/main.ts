import "./style.css";

const form = document.querySelector("form") as HTMLFormElement;
const clearBtn = document.querySelector("button[type='button']") as HTMLButtonElement;
const amountInput = document.getElementById("mortgage-amount") as HTMLInputElement;

const termInput = document.getElementById("mortgage-term") as HTMLInputElement;
const rateInput = document.getElementById("interest-rate") as HTMLInputElement;
const repaymentRadio = document.querySelector('input[name="mortgage-type"]') as HTMLInputElement;
const interestOnlyRadio = document.querySelectorAll('input[name="mortgage-type"]')[1] as HTMLInputElement;
const monthlyResult = document.getElementById("monthly-result") as HTMLParagraphElement;
const totalResult = document.getElementById("total-result") as HTMLParagraphElement;

const amountError = document.getElementById("amount-error") as HTMLParagraphElement;
const termError = document.getElementById("term-error") as HTMLParagraphElement;
const rateError = document.getElementById("rate-error") as HTMLParagraphElement;
const typeError = document.getElementById("type-error") as HTMLParagraphElement;

const amountBox = amountInput.parentElement as HTMLDivElement;
const termBox = termInput.parentElement as HTMLDivElement;
const rateBox = rateInput.parentElement as HTMLDivElement;
const repaymentBox = repaymentRadio.parentElement as HTMLLabelElement;
const interestOnlyBox = interestOnlyRadio.parentElement as HTMLLabelElement;
const amountUnit = amountBox.querySelector("span") as HTMLSpanElement;
const termUnit = termBox.querySelector("span") as HTMLSpanElement;
const rateUnit = rateBox.querySelector("span") as HTMLSpanElement;

const emptyState = document.querySelector("aside > div:first-child") as HTMLDivElement;
const completedState = document.querySelector("aside > div:last-child") as HTMLDivElement;
completedState.classList.add("hidden");

amountInput.addEventListener("input", () => {
  if (amountInput.validity.valid) {
    amountError.classList.add("hidden");
    amountBox.classList.remove("border-red-500");
    amountUnit.classList.remove("bg-red-500", "text-white");
  }
});

termInput.addEventListener("input", () => {
  if (termInput.validity.valid) {
    termError.classList.add("hidden");
    termBox.classList.remove("border-red-500");
    termUnit.classList.remove("bg-red-500", "text-white");
  }
});

rateInput.addEventListener("input", () => {
  if (rateInput.validity.valid) {
    rateError.classList.add("hidden");
    rateBox.classList.remove("border-red-500");
    rateUnit.classList.remove("bg-red-500", "text-white");
  }
});

repaymentRadio.addEventListener("change", () => {
  typeError.classList.add("hidden");

  repaymentBox.classList.remove("border-red-500");
  interestOnlyBox.classList.remove("border-red-500");
});

interestOnlyRadio.addEventListener("change", () => {
  typeError.classList.add("hidden");

  repaymentBox.classList.remove("border-red-500");
  interestOnlyBox.classList.remove("border-red-500");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.classList.add("show-errors");

    if (!amountInput.validity.valid) {
      amountError.classList.remove("hidden");
      amountBox.classList.add("border-red-500");
      amountUnit.classList.add("bg-red-500", "text-white");
    }

    if (!termInput.validity.valid) {
      termError.classList.remove("hidden");
      termBox.classList.add("border-red-500");
      termUnit.classList.add("bg-red-500", "text-white");
    }

    if (!rateInput.validity.valid) {
      rateError.classList.remove("hidden");
      rateBox.classList.add("border-red-500");
      rateUnit.classList.add("bg-red-500", "text-white");
    }

    if (!repaymentRadio.checked && !interestOnlyRadio.checked) {
      typeError.classList.remove("hidden");

      repaymentBox.classList.add("border-red-500");
      interestOnlyBox.classList.add("border-red-500");
    }

    return;
  }

  form.classList.remove("show-errors");

  amountError.classList.add("hidden");
  termError.classList.add("hidden");
  rateError.classList.add("hidden");

  amountBox.classList.remove("border-red-500");
  termBox.classList.remove("border-red-500");
  rateBox.classList.remove("border-red-500");

  amountUnit.classList.remove("bg-red-500", "text-white");
  termUnit.classList.remove("bg-red-500", "text-white");
  rateUnit.classList.remove("bg-red-500", "text-white");

  const amount = Number(amountInput.value);
  const term = Number(termInput.value);
  const rate = Number(rateInput.value);

  const isRepayment = repaymentRadio.checked;

  let monthlyPayment: number;

  if (isRepayment) {
    monthlyPayment = calculateRepayment(amount, term, rate);
  } else {
    monthlyPayment = calculateInterestOnly(amount, rate);
  }

  const totalPayment = monthlyPayment * term * 12;

  monthlyResult.textContent = `£${monthlyPayment.toFixed(2)}`;
  totalResult.textContent = `£${totalPayment.toFixed(2)}`;

  emptyState.classList.add("hidden");
  completedState.classList.remove("hidden");
});

clearBtn.addEventListener("click", () => {
  form.reset();

  form.classList.remove("show-errors");

  amountError.classList.add("hidden");
  termError.classList.add("hidden");
  rateError.classList.add("hidden");

  amountBox.classList.remove("border-red-500");
  termBox.classList.remove("border-red-500");
  rateBox.classList.remove("border-red-500");

  amountUnit.classList.remove("bg-red-500", "text-white");
  termUnit.classList.remove("bg-red-500", "text-white");
  rateUnit.classList.remove("bg-red-500", "text-white");

  emptyState.classList.remove("hidden");
  completedState.classList.add("hidden");
});

const calculateRepayment = (amount: number, term: number, rate: number): number => {
  const monthlyRate = rate / 100 / 12;

  const numberOfPayments = term * 12;

  const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment;
};

const calculateInterestOnly = (amount: number, rate: number): number => {
  return (amount * (rate / 100)) / 12;
};
