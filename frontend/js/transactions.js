import { refresh_transactions } from "./transactions.mjs";

import { get_analytics, get_monthly_analytics } from "./analytics.mjs";
import { create_donut_chart, create_line_graph, update_chart, update_monthly_chart } from "./charts.mjs";

var income_or_expense = "expense_fractions";
var scope = { "type":"month", "range":new Date() };;

const selected_income_expense_button_class = "flex shadow justify-center w-6/12 p-4 border-r rounded-s-lg border-gray-200 bg-blue-50 text-blue-800";
const deselected_income_expense_button_class = "flex justify-center w-6/12 p-4 hover:bg-slate-200 hover:text-blue-800";

const selected_scope_class = "text-lg text-center lg:text-left w-auto shadow font-medium bg-blue-50 py-1.5 px-4 rounded-s-md text-blue-800 border-gray-200";
const deselected_scope_class = "text-lg text-center lg:text-left shadow font-medium hover:bg-blue-50 py-1.5 px-4 hover:text-blue-800 border-gray-200";

document.addEventListener("DOMContentLoaded", async function () {
    let t_div = document.getElementById("transactions-view-this-month");
    refresh_transactions(t_div);	// refresh transactions on load

    chart = create_donut_chart("#chart");
    console.log("chart: " + chart);
    chart.render();

    let line_chart = create_line_graph("#ity_chart_line");
    console.log(line_chart);
    line_chart.render();
    
    let analytics = await get_analytics(scope);
    update_chart(chart, analytics, "expense_fractions");

    
	
    let income_btn = document.getElementById("income-button");
    let expense_btn = document.getElementById("expense-button");
    let tm_btn = document.getElementById("this-month-button");
    let lm_btn = document.getElementById("last-month-button");
    let ty_btn = document.getElementById("this-year-button");

    let monthly_graph_container = document.getElementById("monthly-graph-container");
    let transaction_view_container = document.getElementById("transactions-view-container");

    let trans_tm = document.getElementById("trans-this-month");
    let trans_lm = document.getElementById("trans-last-month");
    let trans_ty = document.getElementById("trans-this-year");

    let trans_ly = document.getElementById("trans-last-year");
    let trans_ty_2 = document.getElementById("trans-this-year-2");

    
    var trans_disp_month = document.getElementById("trans-disp-month");
    var trans_disp_year = document.getElementById("trans-disp-year");


    {
	let tm_analytics = await get_analytics({ "type":"month", "range":new Date() });
	let lm_analytics = await get_analytics({ "type":"month", "range":new Date().setDate(0) });
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });

	let tm_value = income_or_expense == "income_fractions" ? tm_analytics["income"] : tm_analytics["expense"];
	let lm_value = income_or_expense == "income_fractions" ? lm_analytics["income"] : lm_analytics["expense"];
	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	
	trans_tm.innerText = "Rs. " + tm_value;
	trans_lm.innerText = "Rs. " + lm_value;
	trans_ty.innerText = "Rs. " + ty_value;
    }

    
    income_btn.addEventListener("click", async () => {
	
	let analytics = await get_analytics(scope);
	
	income_or_expense = "income_fractions";
	update_chart(chart, analytics, income_or_expense);

	income_btn.className = selected_income_expense_button_class;
	expense_btn.className = deselected_income_expense_button_class;

	
	let tm_analytics = await get_analytics({ "type":"month", "range":new Date() });
	let lm_analytics = await get_analytics({ "type":"month", "range":new Date().setDate(0) });
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });

	let tm_value = income_or_expense == "income_fractions" ? tm_analytics["income"] : tm_analytics["expense"];
	let lm_value = income_or_expense == "income_fractions" ? lm_analytics["income"] : lm_analytics["expense"];
	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	
	trans_tm.innerText = "Rs. " + tm_value;
	trans_lm.innerText = "Rs. " + lm_value;
	trans_ty.innerText = "Rs. " + ty_value;
    });

    expense_btn.addEventListener("click", async () => {

	let analytics = await get_analytics(scope);
	
	income_or_expense = "expense_fractions";
	update_chart(chart, analytics, income_or_expense);

	income_btn.className = deselected_income_expense_button_class;
	expense_btn.className = selected_income_expense_button_class;

	let tm_analytics = await get_analytics({ "type":"month", "range":new Date() });
	let lm_analytics = await get_analytics({ "type":"month", "range":new Date().setDate(0) });
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });

	let tm_value = income_or_expense == "income_fractions" ? tm_analytics["income"] : tm_analytics["expense"];
	let lm_value = income_or_expense == "income_fractions" ? lm_analytics["income"] : lm_analytics["expense"];
	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	
	trans_tm.innerText = "Rs. " + tm_value;
	trans_lm.innerText = "Rs. " + lm_value;
	trans_ty.innerText = "Rs. " + ty_value;

    });

    tm_btn.addEventListener("click", async () => {
	scope = { "type":"month", "range":new Date() };
	
	let analytics = await get_analytics(scope);
	
	update_chart(chart, analytics, income_or_expense);

	monthly_graph_container.classList.add("hidden");
	transaction_view_container.classList.remove("hidden");

	tm_btn.className = selected_scope_class;
	lm_btn.className = deselected_scope_class;
	ty_btn.className = deselected_scope_class;

	trans_disp_month.classList.remove("hidden");
	trans_disp_year.classList.add("hidden");

	let tm_analytics = await get_analytics({ "type":"month", "range":new Date() });
	let lm_analytics = await get_analytics({ "type":"month", "range":new Date().setDate(0) });
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });

	let tm_value = income_or_expense == "income_fractions" ? tm_analytics["income"] : tm_analytics["expense"];
	let lm_value = income_or_expense == "income_fractions" ? lm_analytics["income"] : lm_analytics["expense"];
	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	
	trans_tm.innerText = "Rs. " + tm_value;
	trans_lm.innerText = "Rs. " + lm_value;
	trans_ty.innerText = "Rs. " + ty_value;
	
    });

    lm_btn.addEventListener("click", async () => {
	scope = { "type":"month", "range":(new Date()).setDate(0) };
	
	let analytics = await get_analytics(scope);
	
	update_chart(chart, analytics, income_or_expense);

	monthly_graph_container.classList.add("hidden");
	transaction_view_container.classList.remove("hidden");

	
	tm_btn.className = deselected_scope_class;
	lm_btn.className = selected_scope_class;
	ty_btn.className = deselected_scope_class;

	trans_disp_month.classList.remove("hidden");
	trans_disp_year.classList.add("hidden");

	let tm_analytics = await get_analytics({ "type":"month", "range":new Date() });
	let lm_analytics = await get_analytics({ "type":"month", "range":new Date().setDate(0) });
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });

	let tm_value = income_or_expense == "income_fractions" ? tm_analytics["income"] : tm_analytics["expense"];
	let lm_value = income_or_expense == "income_fractions" ? lm_analytics["income"] : lm_analytics["expense"];
	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	
	trans_tm.innerText = "Rs. " + tm_value;
	trans_lm.innerText = "Rs. " + lm_value;
	trans_ty.innerText = "Rs. " + ty_value;
	
    });

    ty_btn.addEventListener("click", async () => {
	scope = { "type":"year", "range":new Date() };
	
	let analytics = await get_monthly_analytics(scope);
	
	update_monthly_chart(line_chart, analytics, "balance");

	monthly_graph_container.classList.remove("hidden");
	transaction_view_container.classList.add("hidden");

	
	tm_btn.className = deselected_scope_class;
	lm_btn.className = deselected_scope_class;
	ty_btn.className = selected_scope_class;

	trans_disp_month.classList.add("hidden");
	trans_disp_year.classList.remove("hidden");

	var d = new Date();
	d.setFullYear(d.getFullYear() - 1);
	
	let ty_analytics = await get_analytics({ "type":"year", "range":new Date() });
	let ly_analytics = await get_analytics({ "type":"year", "range": d });

	let ty_value = income_or_expense == "income_fractions" ? ty_analytics["income"] : ty_analytics["expense"];
	let ly_value = income_or_expense == "income_fractions" ? ly_analytics["income"] : ly_analytics["expense"];
	
	trans_ly.innerText = "Rs. " + ly_value;
	trans_ty_2.innerText = "Rs. " + ty_value;
	
    });
    
});
