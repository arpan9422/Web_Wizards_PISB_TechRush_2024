
const form = document.getElementById("login-form");
const username = document.getElementById("username");
const pass = document.getElementById("password");

const server_addr = "https://localhost:10000/user/Login"

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
	.then((response) => {
	    if(response.status == 200)
	    {
		return response.json();
	    }
	    else if (response.status == 410)
	    {
		// replace with appropriate frontend code
		alert("User not found");
		return null;
	    }
	    else if (response.status == 411)
	    {
		// replace with appropriate frontend code
		alert("Incorrect password");
		return null;
	    }
	    return null;
	})
	.then((json) => {
	    if (json)
	    {
		localStorage.setItem('token', json['token']);
		window.location.href = "/dashboard";
	    }
	});
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stops from reloading the page

    post_login_request(username.value, pass.value);
    
});
