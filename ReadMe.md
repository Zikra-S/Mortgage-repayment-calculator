# 🏠 Mortgage Repayment Calculator

A responsive mortgage repayment calculator built with **HTML, CSS, and TypeScript**.

Enter your mortgage details and the calculator instantly works out your **monthly repayment** and **total repayment** based on the information provided.

## ✨ Features

* 💰 Calculate monthly mortgage repayments
* 📊 Calculate total repayment over the mortgage term
* 🔄 Clear all inputs with one click
* 📱 Fully responsive design
* 🎨 Clean and accessible user interface
* ⚡ Instant results without refreshing the page

## 🛠️ Built With

* **HTML5** — Structure and semantic markup
* **CSS3** — Styling, layout, and responsive design
* **TypeScript** — Form handling, calculations, validation, and DOM manipulation

## 🧮 How It Works

The calculator uses the mortgage amount, interest rate, and mortgage term entered by the user to calculate the repayment.

For a repayment mortgage, the monthly payment is calculated using:

```text
M = P × [r(1 + r)ⁿ] / [(1 + r)ⁿ − 1]
```

Where:

* `M` = Monthly repayment
* `P` = Mortgage amount
* `r` = Monthly interest rate
* `n` = Total number of monthly payments

The calculator then uses the monthly repayment to determine the total amount paid over the entire mortgage term.

## 📸 Preview

### Empty State

![Mortgage Calculator Preview](./src/assets/design/desktop-design-empty.jpg)

### Results

![Mortgage Calculator Results](./src/assets/design/desktop-design-completed.jpg)
