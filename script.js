// ==========================================
// 1. WORK WITH MULTIPLE RECORDS (ARRAYS)
// ==========================================
// We use an array of objects to store multiple expense records
let expenses = []; 
let totalBudget = 0;

// ==========================================
// 4. UPDATE THE DASHBOARD DYNAMICALLY (DOM MANIPULATION)
// ==========================================
// Grab references to the HTML elements we want to update
const displayBudget = document.getElementById('displayBudget');
const displayExpenses = document.getElementById('displayExpenses');
const displayRemaining = document.getElementById('displayRemaining');
const remainingCard = document.getElementById('remainingCard');
const expenseListContainer = document.getElementById('expenseListContainer');
const emptyMessage = document.getElementById('emptyMessage');

// Grab form inputs and buttons
const inputBudget = document.getElementById('inputBudget');
const btnSetBudget = document.getElementById('btnSetBudget');

const inputExpenseName = document.getElementById('inputExpenseName');
const inputExpenseAmount = document.getElementById('inputExpenseAmount');
const btnAddExpense = document.getElementById('btnAddExpense');


// ==========================================
// 5. HANDLE USER INTERACTIONS (EVENT LISTENERS)
// ==========================================

// Event Listener 1: Setting the Budget
btnSetBudget.addEventListener('click', function() {
    let budgetValue = parseFloat(inputBudget.value);

    // 1. IMPLEMENT DECISION MAKING (CONDITIONALS)
    if (isNaN(budgetValue) || budgetValue <= 0) {
        alert("Please enter a valid budget greater than 0.");
    } else {
        totalBudget = budgetValue;
        expenses = []; // Reset expenses when a new budget is set
        updateDashboard();
        inputBudget.value = ""; // Clear input
    }
});

// Event Listener 2: Adding an Expense
btnAddExpense.addEventListener('click', function() {
    let expName = inputExpenseName.value.trim();
    let expAmount = parseFloat(inputExpenseAmount.value);

    // 1. IMPLEMENT DECISION MAKING (CONDITIONALS)
    // Validate input
    if (expName === "" || isNaN(expAmount) || expAmount <= 0) {
        alert("Please enter a valid expense name and amount greater than 0.");
        return; // Stop execution if invalid
    }

    // Check if budget is set
    if (totalBudget === 0) {
        alert("Please set your total budget first!");
        return;
    }

    // Add the new expense object to our array
    const newExpense = {
        name: expName,
        amount: expAmount
    };
    
    expenses.push(newExpense);

    // Clear inputs
    inputExpenseName.value = "";
    inputExpenseAmount.value = "";

    // Update the UI
    updateDashboard();
});


// ==========================================
// CORE LOGIC: LOOPS, CONDITIONALS & DOM UPDATES
// ==========================================
function updateDashboard() {
    // 3. PROCESS DATA WITH LOOPS
    // Calculate total expenses using a standard for loop
    let totalExpenses = 0;
    for (let i = 0; i < expenses.length; i++) {
        totalExpenses += expenses[i].amount;
    }

    // Calculate remaining balance
    let remainingBalance = totalBudget - totalExpenses;

    // Update Dashboard Text (DOM Manipulation)
    displayBudget.textContent = totalBudget.toFixed(2);
    displayExpenses.textContent = totalExpenses.toFixed(2);
    displayRemaining.textContent = remainingBalance.toFixed(2);

    // 1. IMPLEMENT DECISION MAKING (CONDITIONALS)
    // Change UI based on budget status
    if (remainingBalance < 0) {
        remainingCard.classList.add('over-budget');
        displayRemaining.textContent = "-" + Math.abs(remainingBalance).toFixed(2);
    } else {
        remainingCard.classList.remove('over-budget');
    }

    // Render the Expense List using a Loop (DOM Manipulation)
    expenseListContainer.innerHTML = ""; // Clear existing list
    
    if (expenses.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
        
        // Loop through the array to create HTML elements dynamically
        for (let i = 0; i < expenses.length; i++) {
            let li = document.createElement('li');
            
            let nameSpan = document.createElement('span');
            nameSpan.textContent = expenses[i].name;
            
            let amountSpan = document.createElement('span');
            amountSpan.textContent = "$" + expenses[i].amount.toFixed(2);
            amountSpan.classList.add('expense-amount');
            
            li.appendChild(nameSpan);
            li.appendChild(amountSpan);
            expenseListContainer.appendChild(li);
        }
    }
}
