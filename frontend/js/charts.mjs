


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

    var chart = new ApexCharts(document.querySelector(chart_name), options);

    return chart;
}

export async function create_line_graph()
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

    var chart = new ApexCharts(document.querySelector("#ity_chart_line"), options);

    chart.render();
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

