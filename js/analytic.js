
// graph1

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
        data: [45, 52, 87, 95, 87, 57, 57, 77, 89, 56, 23, 34] 
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
  
  var chart = new ApexCharts(document.querySelector("#chart1"), options);
  
  chart.render();

// -------------------------------------------------------------------------------------

  // graph2_1

  var options = {
    series: [{
      data: [400, 430, 448, 470, 540, 580, 690,]
    }],
    chart: {
      type: 'bar',
      height: 620,
     
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '30%',
        distributed: true, 
        dataLabels: {
          position: 'top' 
        }
      }
    },
    colors: ['#4A3AFF', '#9291A5'], 
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        return opts.w.globals.labels[opts.dataPointIndex];
      },
      offsetY: -30,
      
      style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: 'light',
        colors: ["#615E83"]
      }
    },
    xaxis: {
      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',],
      labels: {
        show: true,
        formatter: function (value) {
          return value + 'k';
        },
      },
      axisBorder: {
        show: true,
        color: '#ccc',
        height: 1,
        width: '100%',
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: true,
        borderType: 'solid',
        color: '#ccc',
        height: 6,
        offsetX: 0,
        offsetY: 0
      },
      lines: {
        show: true,
        opacity: 0.1
      }
    },
    yaxis: {
      labels: {
        show: false,
        style: {
          fontSize: '14px',
          colors: ['#000']
        }
        
      }
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      row: {
        colors: undefined,
        opacity: 0.1
      },
      column: {
        colors: undefined,
        opacity: 0.1
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    legend: {
      show: false, 
    }
  };
  
  var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
  chart2.render();