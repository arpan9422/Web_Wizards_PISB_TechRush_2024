
const form = document.getElementById("login-form");
const username = document.getElementById("username");
const pass = document.getElementById("password");

const server_addr = "http://localhost:3000/user/Login"

function post_login_request(user, pass)
{
    fetch(server_addr, {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    email: user,
	    password: pass
	})
    })
	.then((response) => response.json())
	.then((json) => {alert("SUCCESS, userid: " + JSON.stringify(json));});
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stops from reloading the page

    post_login_request(username.value, pass.value);
    
});
