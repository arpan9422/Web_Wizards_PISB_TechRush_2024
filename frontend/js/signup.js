
const form = document.getElementById("signup-form");
const username = document.getElementById("username");
const pass1 = document.getElementById("password");
const pass2 = document.getElementById("password-confirm");

const server_addr = "http://localhost:3000/user/signup"

function post_signup_request(user, pass)
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
	.then((json) => alert("SUCCESS, userid: " + JSON.stringify(json)));
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // stops from reloading the page

    //check if passwords match or not
    if (pass1.value !== pass2.value)
    {
	alert('two passwords do not match');
	return;
    }

    post_signup_request(username.value, pass1.value);
    
});
