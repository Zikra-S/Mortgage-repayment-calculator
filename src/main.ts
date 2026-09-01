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

form.addEventListener("submit", (event) => {
  event.preventDefault();

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

  console.log(monthlyPayment);
  console.log(totalPayment);

  emptyState.classList.add("hidden");
  completedState.classList.remove("hidden");
});

clearBtn.addEventListener("click", () => {
  form.reset();

  emptyState.classList.remove("hidden");
  completedState.classList.add("hidden");
});

const calculateRepayment = (amount: number, term: number, rate: number): number => {
  const monthlyRate: number = rate / 100 / 12;
  const numberOfPayements: number = term * 12;

  const monthlyPayement = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayements)) / (Math.pow(1 + monthlyRate, numberOfPayements) - 1);
  return monthlyPayement;
};

const calculateInterestOnly = (amount: number, rate: number): number => {
  return (amount * (rate / 100)) / 12;
};
const emptyState = document.querySelector("aside > div:first-child") as HTMLDivElement;

const completedState = document.querySelector("aside > div:last-child") as HTMLDivElement;
completedState.classList.add("hidden");
