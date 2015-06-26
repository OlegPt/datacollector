/**
 * Controller for Histogram Chart.
 */

angular
  .module('dataCollectorApp.home')
  .controller('HistogramChartController', function($scope, $translate) {

    var recordType,
      label = {
        'inputRecords' : 'Input Records Per Batch',
        'outputRecords': 'Output Records Per Batch',
        'errorRecords' : 'Error Records Per Batch',
        'errors' :  'Errors Per Batch'
      },
      color = {
        'inputRecords' :'#1f77b4',
        'outputRecords': '#5cb85c',
        'errorRecords' :'#FF3333',
        'errors' :'#d62728'
      };


    var getColor = function(d) {
      return d.color;
    };

    angular.forEach(label, function(value, key) {
      $translate('home.detailPane.summaryTab.histogram.' + key).then(function(translation) {
        label[key] = [translation];
      });
    });

    angular.extend($scope, {
      chartOptions: {
        chart: {
          type: 'multiBarHorizontalChart',
          stacked: true,
          height: 250,
          showLabels: true,
          duration: 0,
          x: function(d) {
            return d[0];
          },
          y: function(d) {
            return d[1];
          },
          color: getColor,
          showLegend: true,
          staggerLabels: true,
          showValues: false,
          yAxis: {
            tickValues: 0
          },
          valueFormat: $scope.formatValue(),
          margin: {
            left: 55,
            top: 20,
            bottom: 20,
            right: 20
          },
          reduceXTicks: false,
          showControls: false
        }
      },
      timerData:[],

      init: function(type) {
        recordType = type;
      },

      getTooltipContent: function() {
        return function(key, x, y, e, graph) {
          return '<p>' + key + ' </p><p>' + x + ': ' + y +'</p>';
        };
      }
    });


    $scope.$on('summaryDataUpdated', function() {
      var list = $scope.timerData,
        listBackup = angular.copy($scope.timerData);
      list.splice(0, list.length);
      angular.forEach($scope.histogramList, function(recordType, index) {
        var data = $scope.summaryHistograms[recordType];
        if(data) {
          list.push({
            key: label[recordType],
            values: [
              ["Mean" , data.mean ],
              ["Std Dev" , data.stddev ],
              ["99.9%" , data.p999 ],
              ["99%" , data.p99 ],
              ["98%" , data.p98 ],
              ["95%" , data.p95 ],
              ["75%" , data.p75 ],
              ["50%" , data.p50 ]
            ],
            color: color[recordType],
            disabled: (listBackup && listBackup.length > index) ? listBackup[index].disabled : false
          });
        }
      });
    });

  });