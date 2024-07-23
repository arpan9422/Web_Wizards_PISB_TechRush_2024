
import { get_monthly_analytics } from "./analytics.mjs"

import { create_purple_line_graph, update_monthly_chart } from "./charts.mjs";

// graph1

document.addEventListener("DOMContentLoaded", async (doc, ev) => {
    let monthly_expense_chart = create_purple_line_graph();
    monthly_expense_chart.render();

    let analytics = await get_monthly_analytics({ "type":"year", "range":new Date() });

    update_monthly_chart(monthly_expense_chart, analytics, "expense");
});



// -------------------------------------------------------------------------------------

// graph2_1




// -------------------------------------------------------------------------------------

// graph3

var options = {
    chart: {
	type: 'donut',
	width: 450, // Adjust width as needed
	height: 450, // Adjust height as needed
	expandOnClick: true,
    },
    series: [41.35, 2, 13.47, 9.97, 1.35],
    labels: ['Salary', 'Rental', 'Bonus', 'Awards', 'Miscellaneous'],
    colors: ['#BBC3DD', '#ADBBF0', '#95AAFE', '#2D5BFF', '#4A3AFF'],
    plotOptions: {
	pie: {
	    expandOnClick: true,
	    donut: {
		size: '0%',
	    }
	}
    },
    dataLabels: {
	enabled: false // Show or hide data labels
    },
    legend: {
	show: true, // Show or hide the legend
	position: 'bottom',
	fontSize: '14px',
	fontFamily: 'Inter, sans-serif',
    },
    tooltip: {
	enabled: true // Show or hide tooltips
    }
};

var chart3 = new ApexCharts(document.querySelector("#chart3"), options);
chart3.render();

// -------------------------------------------------------------------------------------

// graph4

var options = {
    chart: {
	height: 400,
	type: "radialBar",
    },
    series: [80],
    colors: ["#20E647"],
    plotOptions: {
	radialBar: {
            hollow: {
		margin: 0,
		size: "60%",
		background: "#293450"
            },
            track: {
		dropShadow: {
		    enabled: true,
		    top: 2,
		    left: 0,
		    blur: 4,
		    opacity: 0.15
		}
            },
            dataLabels: {
		name: {
		    offsetY: -10,
		    color: "#fff",
		    fontSize: "13px"
		},
		value: {
		    formatter: function() {
			return "Rs.13,245"; // Display the value here
		    },
		    color: "#fff",
		    fontSize: "30px",
		    show: true
		}
            }
	}
    },
    fill: {
	type: "gradient",
	gradient: {
            shade: "dark",
            type: "vertical",
            gradientToColors: ["#4A3AFF"],
            stops: [0, 100]
	}
    },
    stroke: {
	lineCap: "round"
    },
    labels: ["Total Saving"]
};

var chart4 = new ApexCharts(document.querySelector("#chart4"), options);

chart4.render();


//-----------------------------------------
// graph5


var options = {
    chart: {
	height: 600,
	type: 'line',
    },
    series: [
	{
            name: 'Expenses',
            type: 'column',
            data: [900, 1200, 800, 1300, 900, 1400, 1000]
	},
	{
            name: 'Budget',
            type: 'line',
            data: [1000, 1100, 900, 1200, 800, 1100, 900]
	}
    ],
    xaxis: {
	categories: ['Household ', 'Education', 'Transportation', 'Fashion & Entertainment', 'Health', 'Grocery', 'Miscellaneous']
    },
    yaxis: [
	{
            title: {
		text: 'Expenses ($)'
            }
	},
	{
            opposite: true,
            title: {
		text: 'Budget ($)'
            }
	}
    ],
    tooltip: {
	shared: true,
	intersect: false
    },
    plotOptions: {
	bar: {
            horizontal: false
	}
    },
    dataLabels: {
	enabled: false
    },
    stroke: {
	curve: 'smooth'
    },
    legend: {
	position: 'top'
    }
};

var chart5 = new ApexCharts(document.querySelector("#chart5"), options);
chart5.render();




//monthly and anuual button changing js







