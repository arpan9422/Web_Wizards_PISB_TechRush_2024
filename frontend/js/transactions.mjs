import { server_addr } from "./server.mjs";

export async function get_transactions()
{
    let result =  await fetch(server_addr + "/user/fetchTransactions", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
    });

    let json_body = await result.json();

    return json_body["transactions"];
}

export function add_transaction_entry(parent_elem, transaction)
{
    console.log(transaction);
    
    let name = transaction["name"];
    let amt = transaction["delta"];
    let date = transaction["date"];
    let method = "Bank A/c";//transaction["method"];
    
    let div_elem = document.createElement("div");
    div_elem.setAttribute("class", "px-6 flex w-full border-b border-gray-200 items-center h-10");

    let date_string = (new Date(date)).toLocaleDateString('en-GB');
    
    div_elem.innerHTML = `
          <h3 class="w-4/12 text-base ">${name}</h3>
          <h3 class="w-3/12 text-base  text-gray-600">${method}</h3>
          <h3 class="w-3/12 text-base  text-gray-600">${date_string}</h3>
          <h3 class="w-2/12 text-base ">₹${amt}</h3>`;

    parent_elem.appendChild(div_elem);
}

export async function refresh_transactions(t_div)
{
    
    t_div.innerHTML = "";	// clear previous transactions

    
    let transactions = await get_transactions();

    let rev_transactions = transactions.reverse();

    let no_of_entries = 5;
    if (rev_transactions.length < 5)
	no_of_entries = rev_transactions.length;
    
    for (let i=0;i<no_of_entries;i++)
    {
	add_transaction_entry(t_div, rev_transactions[i]);
    }
}

export async function add_transaction(amt, date, name, recipient="You", method="", tags="")
{
    await fetch("/user/setTransactions", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    operation: "add",
	    delta: amt,
	    date: date,
	    name: name,
	    recipient: recipient,
	    method: method,
	    tags: tags
	})
    });
}
