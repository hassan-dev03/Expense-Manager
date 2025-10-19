let totalAmount = 0;

// function to update the total amount display
function updateTotalAmount() {
    document.querySelector("#totalAmount").innerHTML = "Total Expense: Rs." + totalAmount;
}

// function to load expenses from local storage
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => {
        addExpenseToTable(expense.name, expense.description, expense.amount, expense.category);
    });
}

// function to add an expense to the table
function addExpenseToTable(name, description, amount, category) {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${name}</td>
        <td>${description}</td>
        <td>Rs.${amount}</td>
        <td>${category}</td>
        <td><button id="delBtn">Delete</button></td>
    `;

    document.querySelector("#expense-list").appendChild(tr);
    totalAmount += amount;
    updateTotalAmount();

    tr.querySelector("#delBtn").addEventListener("click", function () {
        totalAmount -= amount;
        tr.remove();
        updateTotalAmount();

        // Remove expense from local storage
        removeExpenseFromLocalStorage(name);
    });
}

// Function to save an expense to local storage
function saveExpenseToLocalStorage(name, description, amount, category) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ name, description, amount, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to remove an expense from local storage
function removeExpenseFromLocalStorage(name) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.name !== name);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Load expenses when the page loads
onload = loadExpenses;

// Event listener to the button
document.querySelector("#addBtn").addEventListener("click", function () {
   

    let name = document.querySelector("#expense-name").value;
    let description = document.querySelector("#description").value;
    let amount = JSON.parse(document.querySelector("#expense-amount").value);
    let category = document.querySelector("#expense-category").value;

    addExpenseToTable(name, description, amount, category);
    saveExpenseToLocalStorage(name, description, amount, category);
    document.querySelector("#expense-name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#expense-amount").value = "";
    document.querySelector("#expense-category").value = "";
});