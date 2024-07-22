document.getElementById('addGoal').addEventListener('click',function(){
    var popupAccount = document.getElementById("addGoalModal");
    var btnAccount = document.getElementById("addGoal");
    var spanAccount = document.getElementsByClassName("closeBtnGoal")[0];

    console.log(popupAccount);
    console.log(btnAccount);
    console.log(spanAccount);

    btnAccount.onclick = function () {
        popupAccount.classList.remove("hidden");
    }

    spanAccount.onclick = function () {
        popupAccount.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popupAccount) {
            popupAccount.classList.add("hidden");
        }
    }
})

document.getElementById('provisionMoney').addEventListener('click',function(){
    var popupAccount = document.getElementById("provisionMoneyModal");
    var btnAccount = document.getElementById("provisionMoney");
    var spanAccount = document.getElementsByClassName("closeBtnMoney")[0];

    console.log(popupAccount);
    console.log(btnAccount);
    console.log(spanAccount);

    btnAccount.onclick = function () {
        popupAccount.classList.remove("hidden");
    }

    spanAccount.onclick = function () {
        popupAccount.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popupAccount) {
            popupAccount.classList.add("hidden");
        }
    }
})