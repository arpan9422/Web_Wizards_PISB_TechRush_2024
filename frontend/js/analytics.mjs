async function get_analytics(scope)
{
    let result =  await fetch("/user/fetchAnalytics", {
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

export async function update_analytics(scope, chart, balance_text, income_text, expense_text)
{

    
    
    let balance_elem = document.getElementById(balance_text);
    let income_elem = document.getElementById(income_text);
    let expense_elem = document.getElementById(expense_text);

    let analytics = await get_analytics(scope);

    console.log(analytics);

    balance_elem.innerText = analytics["balance"];
    income_elem.innerText = analytics["income"];
    expense_elem.innerText = analytics["expense"];

    let values = [];
    let keys = Object.keys(analytics["expense_fractions"]);

    keys.forEach((key) => values.push(analytics["expense_fractions"][key]));

    chart.updateOptions({
	labels: keys,
	series: values
    });
    
    //chart.render();
}
