const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("money-plus");
const moneyMinus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

const goalForm = document.getElementById('goal-form');
const goalInput = document.getElementById('goal-input');
const goalDisplay = document.getElementById('goal-display');








let transactions = [];

// Add a transaction to the list
function addTransaction(text, amount) {
  const transaction = {
    id: generateID(),
    text,
    amount: parseFloat(amount),
  };
  transactions.push(transaction);
  updateLocalStorage();
  addTransactionDOM(transaction);
}

// Generate a random ID for the transaction
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to the DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(
    transaction.amount
  ).toFixed(2)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
  updateValues();
}

// Update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// Remove transaction from the list
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Get transactions from local storage
function getTransactions() {
  const transactionsJSON = localStorage.getItem("transactions");
  if (transactionsJSON != null) {
    transactions = JSON.parse(transactionsJSON);
  }
}

// Init the application
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter text and amount");
  } else {
    addTransaction(textInput.value, amountInput.value);
    textInput.value = "";
    amountInput.value = "";
  }
});
function setGoal() {
    const goalAmount = +goalInput.value;
  
    if (isNaN(goalAmount) || goalAmount <= 0) {
      alert('Please enter a valid goal amount');
      return;
    }
  
    localStorage.setItem('goalAmount', goalAmount);
    alert(`Your financial goal of $${goalAmount} has been set successfully.`);
  }
// Load initial data
getTransactions();
init();