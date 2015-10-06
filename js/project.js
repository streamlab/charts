var riffle2 = [];
var riffle4 = [];
var riffle6 = [];

$.getJSON('data/data.json',function(readings) {

  for (i = 0; i <= readings.length - 1; i++) {
    
    // parse the timestamp into moment.js
    var readingtime = moment.utc(readings[i].timestamp);
    
    if (readingtime.isAfter('2015-10-05 17:00:00')) {
    
      readingtime = readingtime.valueOf();
  
      
      if (readings[i].device_id == "RiffleBottle2") {
        riffle2.push([readingtime, parseFloat(readings[i].conductivity)]);
      }
    
      if (readings[i].device_id == "RiffleBottle4") {
        riffle4.push([readingtime, parseFloat(readings[i].conductivity)]);
      }
    
      if (readings[i].device_id == "RiffleBottle6") {
        riffle6.push([readingtime, parseFloat(readings[i].conductivity)]);
      }
    }
  
  }
  
  
  console.log(riffle4);
  
  $(function () {
      $('#container').highcharts({
          chart: {
            type: 'spline',
            height: 600
          },
          title: {
              text: 'Live Streamlab Riffle Data'
          },
          subtitle: {
              text: 'More info at streamlab.cc'
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: { // don't display the dummy year
                   day:"%b %e"
              },
              title: {
                  text: 'Time'
                
              }
          },
          yAxis: {
              title: {
                  text: 'Conductivity'
              },
              min: 0
          },
          tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x:%b %e %k:%M UTC}<br>Reading: {point.y:.2f}'
          },

          plotOptions: {
              spline: {
                  marker: {
                      enabled: true
                  }
              }
          },

          series: [{
            name: "Riffle 2",
            data: riffle2
          }, {
            name: "Riffle 4",
            data: riffle4
          },{ 
            name: "Riffle 6",
            data: riffle6
          }]
      });
  });

});

