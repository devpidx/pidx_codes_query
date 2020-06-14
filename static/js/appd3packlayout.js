var data = {
    "name": "Total",
    "children": [
      {
        "name": "Europe",
        "children": [
         {
            "name": "Austria",
            "value": 8025585 ,
            "color": "#4e5d6c"
         },
         {
           "name": "Ireland",
           "value": 20054782,
           "color": "#4e5d6c"
         },
         {
           "name": "Germany",
           "value": 60325183,
           "color": "#4e5d6c"
         },
         {
           "name": "Denmark",
           "value": 2924925,
           "color": "#4e5d6c"
         },
         {
           "name": "Finland",
           "value": 2946598,
           "color": "#4e5d6c"
         },
         {
           "name": "Belgium",
           "value": 18067062,
           "color": "#4e5d6c"
         },
         {
           "name": "France",
           "value": 29601688,
           "color": "#4e5d6c"
         },
         {
           "name": "Estonia",
           "value": 858585,
           "color": "#4e5d6c"
         }
       ]
     },
     {
       "name": "Canada",
       "value": 91176172 ,
       "color" : "white"
     },
     {
       "name": "Australia",
       "value": 7815893 ,
       "color" : "darkgray"
     }
   ]
 };

 var packLayout = d3.pack()
 .size([520, 520])
 .padding(10)

var rootNode = d3.hierarchy(data)

rootNode.sum(function(d) {
  return d.value;
});

packLayout(rootNode);

d3.select('svg g')
  .selectAll('circle')
  .data(rootNode.descendants())
  .enter()
  .append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', function(d) { return d.r; })
  

  var nodes = d3.select('svg g')
  .selectAll('g')
  .data(rootNode.descendants())
  .enter()
  .append('g')
  .attr('transform', function(d) {return 'translate(' + [d.x, d.y] + ')'})

nodes
  .append('circle')
  .style("fill", function(d) { return d.children === undefined ? d.data.color : ''; } )
  .attr('r', function(d) { return d.r; })
  // .style("fill","red");

nodes
  .append('text')
  .attr('dy', 4)
  .attr("text-anchor", "middle")
  .text(function(d) {
     return d.children === undefined ? d.data.name : '';
  })
  .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
      .attr("dy", ".35em");

nodes
  .append("title")
  .text(function(d) { return d.count; });

  
function getSize(d) {
  var bbox = this.getBBox(),
      cbbox = this.parentNode.getBBox(),
      scale = Math.min(cbbox.width/bbox.width, cbbox.height/bbox.height);
  d.scale = scale;
}