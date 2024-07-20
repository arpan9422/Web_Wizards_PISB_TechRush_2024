
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
  
  var chart = new ApexCharts(document.querySelector("#chart1"), options);
  
  chart.render();

// -------------------------------------------------------------------------------------

  // graph2_1
  const data = {
    monthly: [4, 4, 4, 4, 5, 5, 6],
    annually: [48, 51, 53, 56, 64, 69, 78]
  };

  var options = {
    series: [{
      data: data.monthly
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
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: 'light',
        colors: ["#615E83"]
      }
    },
    xaxis: {
      categories: ['Household', 'Education', 'Transportation', 'Fashion & Entertainment', 'Health', 'Grocery', 'Miscellaneous'],
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
      },
      min: 0,
        max: 10
    },
    yaxis: {
      labels: {
        show: false,
        formatter: function (value) {
          return value + 'k';
        },
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
 

  

  function updateChart(data, max) {
    chart2.updateOptions({
      series: [{
        data: data
      }],
      xaxis: {
        min: 0,
        max: max
      }
    });
  }

 
  

  