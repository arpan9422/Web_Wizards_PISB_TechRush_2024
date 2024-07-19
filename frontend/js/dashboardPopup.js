
async function add_transaction(amt, date, name, recipient="You", method="", tags="")
{
    await fetch("/user/setTransactions", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    operation: "add",
	    delta: amt,
	    date: date,
	    name: name,
	    recipient: recipient,
	    method: method,
	    tags: tags
	})
    });
}

function add_transaction_entry(parent_elem, amt, date, name, recipient, method)
{
    let div_elem = document.createElement("div");
    div_elem.setAttribute("class", "px-6 flex w-full border-b border-gray-200 items-center h-auto lg:h-10");

    let date_string = date.toLocaleDateString('en-GB');
    
    div_elem.innerHTML = `
          <h3 class="w-5/12 text-base ">${name}</h3>
          <h3 class="w-3/12 text-base  text-gray-600">${method}</h3>
          <h3 class="w-2/12 text-base  text-gray-600">${date_string}</h3>
          <h3 class="w-2/12 text-base ">₹${amt}</h3>`;

    parent_elem.appendChild(div_elem);
}

function refresh_transactions()
{
    let transactions_div = document.getElementById("");
}

//Add EXPENSES
document.addEventListener("DOMContentLoaded", function () {
    
    var popup_expense = document.getElementById("addExpensesModal");
    var btn_expense = document.getElementById("addExpensesBtn");
    var span_expense = document.getElementsByClassName("closeBtnExpenses")[0];


    var expense_form = document.getElementById("addExpenseForm")
    var expense_name = document.getElementById("expenseName")
    var expense_amt = document.getElementById("expenseAmount")
    var expense_date = document.getElementById("expenseDate");

    expense_form.onsubmit = async function (e) {
	e.preventDefault();

	const name = expense_name.value;
	const amt = Number(expense_amt.value);
	const date = new Date(expense_date.value);

	await add_transaction(-amt, date, name);

	popup_expense.classList.add("hidden");
	expense_form.reset();
    }
    
    
    btn_expense.onclick = function () {
        popup_expense.classList.remove("hidden");
    }

    span_expense.onclick = function () {
        popup_expense.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popup_expense) {
            popup_expense.classList.add("hidden");
        }
    }
    

    // Add INCOME
    var popup_income = document.getElementById("addIncomeModal")
    var btn_income = document.getElementById("add-income-button")
    var span1 = document.getElementsByClassName("closeBtnIncome")[0];

    var income_form = document.getElementById("addIncomeForm")
    var income_name = document.getElementById("incomeName")
    var income_amt = document.getElementById("incomeAmount")
    var income_date = document.getElementById("incomeDate");

    income_form.onsubmit = async function (e) {
	e.preventDefault();

	const name = income_name.value;
	const amt = Number(income_amt.value);
	const date = new Date(income_date.value);

	await add_transaction(amt, date, name);

	popup_income.classList.add("hidden");
	income_form.reset();
    }

    btn_income.onclick = function () {
        popup_income.classList.remove("hidden");
    }

    span1.onclick = function () {
        popup_income.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popup_income) {
            popup_income.classList.add("hidden");
        }
    }


    var popup_transfer = document.getElementById("addTransferModal")
    var btn_transfer = document.getElementById("addTransferBtn")
    var span2 = document.getElementsByClassName("closeBtnTransfer")[0];

    var transfer_form = document.getElementById("addTransferForm")
    var transfer_name = document.getElementById("transferName")
    var transfer_amt = document.getElementById("transferAmount")
    var transfer_date = document.getElementById("transferDate");

    transfer_form.onsubmit = async function (e) {
	e.preventDefault();

	const name = transfer_name.value;
	const amt = Number(transfer_amt.value);
	const date = new Date(transfer_date.value);

	await add_transaction(-amt, date, "Transfer", name);

	popup_transfer.classList.add("hidden");
	transfer_form.reset();
    }
    

    btn_transfer.onclick = function () {
        popup_transfer.classList.remove("hidden");
    }

    span2.onclick = function () {
        popup_transfer.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popup_transfer) {
            popup_transfer.classList.add("hidden");
        }
    }
});

document.addEventListener("DOMContentLoaded", function(){
    
})



document.getElementById("refresh").addEventListener('click', function(){
    window.location.reload()
})