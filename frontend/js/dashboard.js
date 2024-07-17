//Add EXPENSES
document.addEventListener("DOMContentLoaded", function () {
    var popup = document.getElementById("addExpensesModal");
    var btn = document.getElementById("addExpensesBtn");
    var span = document.getElementsByClassName("closeBtnExpenses")[0];

    btn.onclick = function () {
        popup.classList.remove("hidden");
    }

    span.onclick = function () {
        popup.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.classList.add("hidden");
        }
    }

// Add INCOME
    var popup_income = document.getElementById("addIncomeModal")
    var btn_income = document.getElementById("addIncomeBtn")
    var span1 = document.getElementsByClassName("closeBtnIncome")[0];

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