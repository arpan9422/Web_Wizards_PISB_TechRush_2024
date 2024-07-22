


export function create_donut_chart(chart_name)
{
    let options = {
	chart: {
            type: 'donut',
            expandOnClick: true,
	},
	series: [],
	labels: [],
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

    let chart = new ApexCharts(document.querySelector(chart_name), options);

    return chart;
}

export function create_line_graph()
{
    var options = {
        chart: {
            height: 280,
            type: "area"
        },
        dataLabels: {
            enabled: false
        },
        series: [
            {
                name: "Series 1",
                data: [2612, 2700, 2796, 3130, 3326, 3080, 1528]
            }
        ],
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ]
        }
    };

    let chart = new ApexCharts(document.querySelector("#ity_chart_line"), options);

    return chart;
}

export function create_purple_line_graph()
{
    var options = {
	chart: {
	    height: 280,
	    type: "area",
	    toolbar: {
		show: false
	    }
	},
	colors: ['#4A3AFF'], 
	dataLabels: {
	    enabled: false
	},
	series: [
	    {
		name: "Series 1",
		data: [45, 52, 87, 95, 87, 57, 34, 0, 0, 0, 0, 0] 
	    }
	],
	fill: {
	    type: "gradient",
	    gradient: {
		shadeIntensity: 1,
		opacityFrom: 0.4,
		opacityTo: 0.9,
		stops: [0, 90, 100]
	    }
	},
	xaxis: {
	    categories: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"June",
		"July",
		"Aug",
		"Sept",
		"Oct",
		"Nov",
		"Dec",
	    ]
	},
	yaxis: {
	    labels: {
		formatter: function (value) {
		    return value + 'k';
		}
	    },
	    style: {
		fontFamily: 'Arial, sans-serif', 
		fontSize: '12px',
		fontWeight: 'bold',
		colors: '#333' 
	    },
	    tickAmount: 5
	},
	grid: {
	    borderColor: '#e7e7e7',
	    strokeDashArray: 4,
	    opacity: 0.2 
	}
    };

    let chart = new ApexCharts(document.querySelector("#monthly-expense-chart"), options);

    //chart.render();

    return chart;
}

export async function update_chart(chart, analytics, key)
{
    let values = [];
    let keys = Object.keys(analytics[key]);

    keys.forEach((k) => values.push(analytics[key][k]));

    chart.updateOptions({
	labels: keys,
	series: values
    });
}

export async function update_monthly_chart(chart, analytics, key)
{
    let values = [];
    let keys = Object.keys(analytics);

    console.log("keys " + keys);

    keys.forEach((k) => values.push(analytics[k][key]));

    console.log("vals " + values);
    
    chart.updateOptions({
	xaxis: {categories: keys},
	series: [{ name: "Series 1", data: values}]
    });
}

