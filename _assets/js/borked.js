var tt = document.createElement('div'),
  leftOffset = -(~~$('html').css('padding-left').replace('px', '') + ~~$('body').css('margin-left').replace('px', '')),
  topOffset = -32;
tt.className = 'ex-tooltip';
document.body.appendChild(tt);

var data = {
  "xScale": "time",
  "yScale": "linear",
  "main": [
    {
      "className": ".borkedVMs",
      "data": [
        {
          "x": "2013-04-23",
          "y": 0
        },
        {
          "x": "2013-04-24",
          "y": 0
        },
        {
          "x": "2013-04-25",
          "y": 0
        },
        {
          "x": "2013-04-26",
          "y": 1
        },
        {
          "x": "2013-04-27",
          "y": 7
        },
        {
          "x": "2013-04-28",
          "y": 3
        },
        {
          "x": "2013-04-29",
          "y": 0
        }
      ]
    }
  ]
};
var opts = {
  "dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
  "tickFormatX": function (x) { return d3.time.format('%A')(x); },
  "mouseover": function (d, i) {
    var pos = $(this).offset();
    $(tt).text(d3.time.format('%A')(d.x) + ': ' + d.y)
      .css({top: topOffset + pos.top, left: pos.left + leftOffset})
      .show();
  },
  "mouseout": function (x) {
    $(tt).hide();
  }
};
var myChart = new xChart('line-dotted', data, '#example4', opts);