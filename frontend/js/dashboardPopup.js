
import {add_transaction,  refresh_transactions } from "./transactions.mjs";
import { get_analytics } from "./analytics.mjs";
import { create_donut_chart, update_chart } from "./charts.mjs";

const selected_class = "text-lg text-center lg:text-left w-auto shadow font-medium bg-blue-50 py-1.5 px-4 rounded-s-md text-blue-800 border-r border-gray-200";
const deselected_class = "text-lg text-center lg:text-left shadow font-medium hover:bg-blue-50 py-1.5 px-4 hover:text-blue-800 border-r border-gray-200";

async function get_username()
{
    let result =  await fetch("/user/fetchUserData", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
    });

    let json_body = await result.json();
    return json_body["name"];
}

async function refresh_username()
{
    let username = await get_username();
    let username_greet = document.getElementById('username-greet');

    username_greet.innerText = `Hello ${username}!`;
}

var dashboard_scope = { "type":"month", "range":new Date() }

function set_scope(type, range)
{
    dashboard_scope = {"type":type, "range":range};
}

async function update_analytics(scope, chart, balance_text, income_text, expense_text)
{
    
    let balance_elem = document.getElementById(balance_text);
    let income_elem = document.getElementById(income_text);
    let expense_elem = document.getElementById(expense_text);

    let analytics = await get_analytics(scope);

    balance_elem.innerText = analytics["balance"];
    income_elem.innerText = analytics["income"];
    expense_elem.innerText = analytics["expense"];

    update_chart(chart, analytics, "expense_fractions");
    //chart.render();
}

//Add EXPENSES
document.addEventListener("DOMContentLoaded", function () {

    refresh_username();		// fetch and display username

    let t_div = document.getElementById("transactionList");
    refresh_transactions(t_div);	// refresh transactions on load

    // fetch and display analytics
    chart = create_donut_chart("#tm_chart");
    chart.render();
    update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");

    let tm_button = document.getElementById("this-month-button");
    let lm_button = document.getElementById("last-month-button");
    let ty_button = document.getElementById("this-year-button");

    var btn_expense = document.getElementById("addExpensesBtn");
    var btn_income = document.getElementById("add-income-button")
    var btn_transfer = document.getElementById("addTransferBtn");

    
    
    tm_button.addEventListener("click", () => {
	set_scope("month", new Date());
	console.log("tm");
	update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");

	tm_button.classList = selected_class;
	lm_button.classList = deselected_class;
	ty_button.classList = deselected_class;

	btn_expense.classList.remove("hidden");
	btn_income.classList.remove("hidden");
	btn_transfer.classList.remove("hidden");


    });
    
    lm_button.addEventListener("click", () => {
	set_scope("month", (new Date()).setDate(0));
	console.log("lm");
	update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");

	tm_button.classList = deselected_class;
	lm_button.classList = selected_class;
	ty_button.classList = deselected_class;
	
	btn_expense.classList.add("hidden");
	btn_income.classList.add("hidden");
	btn_transfer.classList.add("hidden");


	
    });

    ty_button.addEventListener("click", () => {
	set_scope("year", new Date());
	console.log("ty");
	update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");

	tm_button.classList = deselected_class;
	lm_button.classList = deselected_class;
	ty_button.classList = selected_class;
			
	btn_expense.classList.add("hidden");
	btn_income.classList.add("hidden");
	btn_transfer.classList.add("hidden");


    });
    
    var popup_expense = document.getElementById("addExpensesModal");

    var span_expense = document.getElementsByClassName("closeBtnExpenses")[0];


    var expense_form = document.getElementById("addExpenseForm");
    var expense_type = document.getElementById("expense-type");
    var expense_amt = document.getElementById("expenseAmount");
    var expense_date = document.getElementById("expenseDate");

    expense_form.onsubmit = async function (e) {
	e.preventDefault();

	const name = expense_type.value;
	const amt = Number(expense_amt.value);
	const date = new Date(expense_date.value);

	await add_transaction(-amt, date, name);

	popup_expense.classList.add("hidden");
	expense_form.reset();

	refresh_transactions(t_div);
	update_analytics(dashboard_scope,  chart, "this-month-balance", "this-month-income", "this-month-expense");
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
    var popup_income = document.getElementById("addIncomeModal");

    var span1 = document.getElementsByClassName("closeBtnIncome")[0];

    var income_form = document.getElementById("addIncomeForm");
    var income_type = document.getElementById("income-type");
    var income_amt = document.getElementById("incomeAmount")
    var income_date = document.getElementById("incomeDate");

    income_form.onsubmit = async function (e) {
	e.preventDefault();

	const name = income_type.value;
	const amt = Number(income_amt.value);
	const date = new Date(income_date.value);

	await add_transaction(amt, date, name);

	popup_income.classList.add("hidden");
	income_form.reset();

	refresh_transactions(t_div);
	update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");
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


    var popup_transfer = document.getElementById("addTransferModal");

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

	refresh_transactions(t_div);
	update_analytics(dashboard_scope, chart, "this-month-balance", "this-month-income", "this-month-expense");
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
