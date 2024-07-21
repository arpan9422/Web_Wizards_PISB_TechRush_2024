
import {add_transaction,  refresh_transactions } from "./transactions.mjs";
import { update_analytics } from "./analytics.mjs";

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


function create_chart(chart_name)
{
    let options = {
	chart: {
            type: 'donut',
            expandOnClick: true,
	},
	series: [],
	labels: [],
	colors: ['#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#F04438'],
	plotOptions: {
	    pie: {
		expandOnClick: true,
		donut: {
		    size: '50%',
		}
	    }
	},
	dataLabels: {
	    enabled: false // Show or hide data labels
	},
	legend: {
	    show: true,// Show or hide the legend
	    position: 'bottom'
	},
	tooltip: {
	    enabled: true // Show or hide tooltips
	}

    };

    var chart = new ApexCharts(document.querySelector(chart_name), options);

    return chart;
}

//Add EXPENSES
document.addEventListener("DOMContentLoaded", function () {

    refresh_username();		// fetch and display username

    let t_div = document.getElementById("transactionList");
    refresh_transactions(t_div);	// refresh transactions on load

    // fetch and display analytics
    chart = create_chart("#tm_chart");
    chart.render();
    update_analytics("this-month", chart, "this-month-balance", "this-month-income", "this-month-expense");
    
    var popup_expense = document.getElementById("addExpensesModal");
    var btn_expense = document.getElementById("addExpensesBtn");
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
	update_analytics("this-month",  chart, "this-month-balance", "this-month-income", "this-month-expense");
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
	update_analytics("this-month", chart, "this-month-balance", "this-month-income", "this-month-expense");
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

	refresh_transactions(t_div);
	update_analytics("this-month", chart, "this-month-balance", "this-month-income", "this-month-expense");
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
