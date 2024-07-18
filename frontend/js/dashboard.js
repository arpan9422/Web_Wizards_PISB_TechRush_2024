
const add_income_button = document.getElementById("add-income-button");

add_income_button.onclick = () => {
    const amt = Number(prompt("Enter amount"));
    const method = prompt("Enter method");
    const tags = prompt("Enter tags (categories separated by commas)");

    fetch("/user/setTransactions", {
	method: "POST",
	
	headers: {
	    "Content-Type": "application/json"
	},
	
	body: JSON.stringify({
	    operation: "add",
	    delta: amt,
	    recipient: "You",
	    method: method,
	    tags: tags.split(",").forEach((e) => e.trim())
	})
    })
}


var options = {
    chart: {
        type: 'donut',
        expandOnClick: true,
    },
    series: [41.35, 21.51, 13.47, 9.97, 3.35],
    labels: ['House', 'Credit card', 'Transportation', 'Groceries', 'Shopping'],
    colors: ['#6366F1', '#8B5CF6', '#A78BFA', '#C4B5FD', '#F04438'],
    plotOptions: {
        pie: {
	    expandOnClick: true,
	    donut: {
                size: '50%',
	    }
        }
    },
    dataLabels: {
        enabled: false // Show or hide data labels
    },
    legend: {
        show: true,// Show or hide the legend
        position: 'bottom'
    },
    tooltip: {
        enabled: true // Show or hide tooltips
    }

};

var chart = new ApexCharts(document.querySelector("#tm_chart"), options);
chart.render();
