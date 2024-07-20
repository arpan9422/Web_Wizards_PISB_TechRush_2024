import {add_transaction,  refresh_transactions } from "./transactions.mjs";

document.addEventListener("DOMContentLoaded", function () {
    let t_div = document.getElementById("transactions-view-this-month");
    refresh_transactions(t_div);	// refresh transactions on load
});
