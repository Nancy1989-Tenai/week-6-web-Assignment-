# SpendWise - Week 6 Update

## What improvements were made to SpendWise this week?
This week, SpendWise was transformed from a simple console-based prompt application into a fully interactive web application. Instead of using `prompt()` and `console.log()`, the app now features a visual dashboard, interactive forms, and real-time feedback. Users can set a budget, add multiple expenses, and instantly see their remaining balance update on the screen. The app also visually warns the user if they exceed their budget.

## How conditionals are used in the project
Conditional statements (`if/else`) are used extensively for validation and state management:
1. **Input Validation:** Before processing a budget or expense, conditionals check if the inputs are valid numbers greater than zero (`if (isNaN(budgetValue) || budgetValue <= 0)`).
2. **Over-Budget Warning:** A conditional checks if the remaining balance is less than zero (`if (remainingBalance < 0)`). If true, it dynamically adds a CSS class to turn the dashboard card red and formats the text to show a negative number.

## How arrays are used to store data
Instead of using separate variables for every expense, I created an array named `expenses`. 
* Every time a user adds an expense, an **object** containing the `name` and `amount` is created.
* This object is pushed into the `expenses` array using `expenses.push(newExpense)`.
* This allows the application to store an unlimited number of expense records in a single, organized collection.

## How the DOM is updated
The DOM (Document Object Model) is updated dynamically using JavaScript without reloading the page:
1. **Text Updates:** I used `document.getElementById()` to grab dashboard spans and updated their text using `.textContent` to reflect the new budget, total expenses, and remaining balance.
2. **Dynamic List Generation:** Inside the `updateDashboard()` function, I clear the existing HTML list (`expenseListContainer.innerHTML = ""`), then use a loop to create new `<li>`, `<span>` elements using `document.createElement()`, and append them to the DOM using `.appendChild()`.
3. **CSS Class Manipulation:** The DOM is updated visually by adding/removing the `over-budget` CSS class using `.classList.add()` and `.classList.remove()`.

## How user interactions are handled through events
User interactions are handled using **Event Listeners**. 
* I attached a `click` event listener to the "Set Budget" button (`btnSetBudget.addEventListener('click', ...)`).
* I attached a `click` event listener to the "Add Expense" button (`btnAddExpense.addEventListener('click', ...)`).
When the user clicks these buttons, the event listener triggers the corresponding JavaScript functions to process the form inputs, update the array, and refresh the DOM.

## Challenges encountered and how they were resolved
* **Challenge:** Initially, when adding a new expense, the list kept appending to the old list, creating duplicates on the screen.
  * **Resolution:** I resolved this by clearing the `innerHTML` of the list container at the start of the `updateDashboard()` function before looping through the array to rebuild the list from scratch.
* **Challenge:** Handling the "Over Budget" visual state.
  * **Resolution:** I used CSS classes combined with JavaScript's `classList` API. Instead of manually changing colors via JS, I wrote an `.over-budget` class in CSS and toggled it via JS conditionals, which is a cleaner separation of concerns.
