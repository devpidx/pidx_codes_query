var Products = ["B25", "B29", "B37", "D11", "D2k",
"D6N", "D80", "P18", "P2R","P36","P42","O21","O73","P42","O21","O73","O8I","OUB"]; 
d3.json('http://api.pidx.org:8080/data').then(function(response) {
// d3.csv(fileName, function(error, data) {
    var countryproduct = {};
    response.result.forEach(function(d) {
        var country = d.country;
        countryproduct[country] = [];
        // { countryName: [ bar1Val, bar2Val, ... ] }
        Products.forEach(function(field) {
            countryproduct[country].push( +d[field] );
        });
    });
    makeVis(countryproduct);
});
var makeVis = function(countryproduct) {
    // Define dimensions of vis
    var margin = { top: 30, right: 10, bottom: 30, left: 100 },
        width  = 1000 - margin.left - margin.right,
        height = 400 - margin.top  - margin.bottom;
    // Make x scale
    var xScale = d3version3.scale.ordinal()
        .domain(Products)
        .rangeRoundBands([0, width], 0.1);
    // Make y scale, the domain will be defined on bar update
    var yScale = d3version3.scale.linear()
        .range([height, 0]);
    // Create canvas
        var canvas = d3.select("#vis-container")
      .append("svg")
        .attr("width",  width  + margin.left + margin.right)
        .attr("height", height + margin.top  + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // Make x-axis and add to canvas
    var xAxis = d3version3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    // Make y-axis and add to canvas
    var yAxis = d3version3.svg.axis()
        .scale(yScale)
        .orient("left");
    var yAxisHandleForUpdate = canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    yAxisHandleForUpdate.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Value");
    var updateBars = function(data) {
        // First update the y-axis domain to match data
        yScale.domain( d3.extent(data) );
        yAxisHandleForUpdate.call(yAxis);
        var bars = canvas.selectAll(".bar").data(data);
        // Add bars for new data
        bars.enter()
          .append("rect")
            .attr("class", "bar")
            .attr("x", function(d,i) { return xScale( Products[i] ); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height - yScale(d); });
        // Update old ones, already have x / width from before
        bars
            .transition().duration(250)
            .attr("y", function(d,i) { return yScale(d); })
            .attr("height", function(d,i) { return height - yScale(d); });
        // Remove old ones
        bars.exit().remove();
    };
    // Handler for dropdown value change
    var dropdownChange = function() {
        var newcountry = d3.select(this).property('value'),
            newData   = countryproduct[newcountry];
        updateBars(newData);
    };
    // Get names of country, for dropdown
    var countries = Object.keys(countryproduct).sort();
    var dropdown = d3.select("#vis-container")
        .insert("select", "svg")
        .on("change", dropdownChange);
    dropdown.selectAll("option")
        .data(countries)
      .enter().append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) {
            return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
        });
    var initialData = countryproduct[ countries[0] ];
    updateBars(initialData);
};