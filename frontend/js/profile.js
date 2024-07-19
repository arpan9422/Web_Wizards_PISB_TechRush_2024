// ADD ACCOUNT
document.getElementById('addAccount').addEventListener('click',function(){
    var popupAccount = document.getElementById("addAccountModal");
    var btnAccount = document.getElementById("addAccount");
    var spanAccount = document.getElementsByClassName("closeBtnAccount")[0];

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


//LogoutBTN

document.getElementById('logoutBtn').addEventListener('click', function(){
    alert('You will be logged out if clicked twice');
})


document.getElementById('logoutBtn').addEventListener('dblclick', function(){
    alert('You will be logged out if clicked twice');
})