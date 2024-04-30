<template>
    <v-layout wrap>
      <v-flex xs12>
        <v-layout wrap justify-center>
          <v-flex xs6>
            <v-layout style="background-color: white;" wrap justify-center>
              <v-flex xs5 pa-3>
                <!-- First radial bar chart -->
                <div id="radial-chart-1"></div>
              </v-flex>
              <v-flex xs5 pa-3>
                <!-- Second radial bar chart -->
                <div id="radial-chart-2"></div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 pl-lg-5>

            <v-layout style="background-color: white;" wrap justify-center>
            <v-flex xs12>
                shikara
            </v-flex>

            <v-flex xs12>
                houseboat
            </v-flex>
            </v-layout>
            
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 pt-lg-10>
        <!-- Line chart -->
        <div class="LexendFont" id="line-chart"></div>
      </v-flex>
    </v-layout>
  </template>
  
  <script>
  import ApexCharts from 'apexcharts';
  
  export default {
    mounted() {
      // Options for the line chart
      var lineChartOptions = {
        series: [{
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          fontFamily: 'LexendFont'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          colors: ['#F17343']
        },
        title: {
          text: 'Growth',
          align: 'left',
          style: {
            fontFamily: 'LexendFont'
          }
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            style: {
              fontFamily: 'LexendFont'
            }
          }
        }
      };
  
      // Options for the first radial bar chart
     // Options for the first radial bar chart
var radialChartOptions1 = {
  series: [70], // Representing 70% as 0.7 out of 1
  chart: {
    height: 310,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        // size: '70%',
      },
      colors: ['#000080'] // Navy blue color
    },
  },
  labels: ['Cricket'],
};

  
      // Options for the second radial bar chart
      var radialChartOptions2 = {
        series: [50],
        chart: {
          height: 310,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            hollow: {
              // size: '70%',
            }
          },
        },
        labels: ['Shikara'],
      };
  
      // Render the line chart
      var lineChart = new ApexCharts(document.querySelector("#line-chart"), lineChartOptions);
      lineChart.render();
  
      // Render the first radial bar chart
      var radialChart1 = new ApexCharts(document.querySelector("#radial-chart-1"), radialChartOptions1);
      radialChart1.render();
  
      // Render the second radial bar chart
      var radialChart2 = new ApexCharts(document.querySelector("#radial-chart-2"), radialChartOptions2);
      radialChart2.render();
    }
  };
  </script>
  
  <style>
  .LexendFont {
    font-family: LexendFont;
  }
  </style>
  