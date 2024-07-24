import { server_addr } from "./server.mjs";

export async function get_analytics(scope)
{
    let result =  await fetch(server_addr + "/user/fetchAnalytics", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},

	body: JSON.stringify({
	    scope: scope
	})
    });

    console.log(result);
    
    let json_body = await result.json();

    return json_body;
}

export async function get_monthly_analytics(scope)
{
    let result =  await fetch("/user/fetchMonthlyAnalytics", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},

	body: JSON.stringify({
	    scope: scope
	})
    });

    console.log(result);
    
    let json_body = await result.json();

    return json_body;
}


