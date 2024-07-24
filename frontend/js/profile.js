
import { server_addr } from "./server.mjs"

async function get_username()
{
    let result =  await fetch(server_addr + "/user/fetchUserData", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
    });

    let json_body = await result.json();
    return json_body["name"];
}

async function schedule_reminder(email, time, status)
{
    let result =  await fetch(server_addr + "/schedule-reminder", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    "Email":email,
	    "time":time,
	    "status":status
	})
    });

    let json_body = await result.json();
    return json_body["name"];
}

// ADD ACCOUNT
document.getElementById('addReminder').addEventListener('click',function(){
    var popupReminder = document.getElementById("addReminderModal");
    var btnReminder = document.getElementById("addReminder");
    var spanReminder = document.getElementsByClassName("closeBtnReminder")[0];

    console.log(popupReminder);
    console.log(btnReminder);
    console.log(spanReminder);

    btnReminder.onclick = function () {
        popupReminder.classList.remove("hidden");
    }

    spanReminder.onclick = function () {
        popupReminder.classList.add("hidden");
    }

    window.onclick = function (event) {
        if (event.target == popupReminder) {
            popupReminder.classList.add("hidden");
        }
    }
});


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
});

document.getElementById("addReminderForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    let time_input = document.getElementById("reminder-time");
    let reminder_popup = document.getElementById("addReminderModal");

    var checkedValue = null; 
    var inputElements = document.getElementsByClassName('checkbox');
    for(var i=0; inputElements[i]; ++i){
	if(inputElements[i].checked){
            checkedValue = inputElements[i].value;
            break;
	}
    }
    
    let username = await get_username();

    let status = checkedValue ? "ON" : "OFF";

    console.log(status);
    
    schedule_reminder(username, time_input.value, status);

    reminder_popup.classList.add("hidden");
    
});


//LogoutBTN

// document.getElementById('logoutBtn').addEventListener('click', function(){
//     alert('You will be logged out if clicked twice');
// })


// document.getElementById('logoutBtn').addEventListener('dblclick', function(){
//     alert('You will be logged out if clicked twice');
// })
