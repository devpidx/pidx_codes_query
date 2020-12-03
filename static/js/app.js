// app.js is the main routine to handle the PIDX product
// code searches from the data api at the api.pidx.org:8080 website
// Get a reference to the table body
const tbody = d3.select("tbody") ;
var tableData;
var filteredData;

var codeElement;
var ProductdefElement;
var cetaneoctaneElement;
var requesterElement;

var button;

var codeValue;
var ProductdefValue;
var cetaneoctaneValue;
var requesterValue;

var codeFilter;
var ProductdefFilter;
var cetaneoctaneFilter;
var requesterFilter;

var addResultString;

var MxVal;
var MnVal;

MnVal = 0;
MxVal = 20;

// Get all the product codes from the api.pidx.org API and load into tableData variable
// top level collection is called 'result', call displayData function to built the html table
d3.json('http://api.pidx.org:8080/api/v1/resources/codes/all', function(tableData) {
  filteredData = tableData;
  displaydata(tableData);

  // Select the input element and get the raw HTML node
  codeElement = d3.select("#code");
  ProductdefElement = d3.select("#product_definition");
  cetaneoctaneElement = d3.select("#cetane_octane");
  requesterElement = d3.select("#requester");

  // Set up the buttons
  button = d3.select("#filter-btn");
  nextButton = d3.select("#nextButton")
  prevButton = d3.select("#prevButton")
  resetButton= d3.select("#reset-btn")

  //------ NEXT BUTTON ------ Next button click function definition
  nextButton.on("click", function(){
   if (MxVal < 3376){
    MnVal = MnVal + 20 ;
    MxVal = MxVal + 20 ;
    displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
   }
  })

  //------ PREV BUTTON ------ Previous button click function definition
  prevButton.on("click", function(){
   if (MnVal > 0){
    MnVal = MnVal - 20 ;
    MxVal = MxVal - 20 ;
    displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
   }
  })

  //------ SEARCH BUTTON ------ Search button "filter" click function definition, reset all data to original full table
  button.on("click", function() {
   filteredData = tableData;

   // Get the value property of the input elements from the form and convert to upper case for filtering
   codeValue = codeElement.property("value").toUpperCase();
   ProductdefValue = ProductdefElement.property("value").toUpperCase();
   cetaneoctaneValue = cetaneoctaneElement.property("value").toUpperCase();
   requesterValue = requesterElement.property("value").toUpperCase();

   // Get filtered data based of inputs from form above, clear slic counters and display filtered data
   MnVal = 0 ;
   MxVal = 20 ;
   filteredData = combinedFilter(filteredData);
   displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
  })

  //------ RESET BUTTON ------ resetting the displayed data to the full dataset while keeping the filter values untouched
  resetButton.on("click", function() {
   console.log("Clearing Old Entries");
   document.getElementById('code').value = '';
   document.getElementById('product_definition').value = '';
   document.getElementById('cetane_octane').value = '';
   document.getElementById('requester').value = '';

   // Reset filtered data to complete table data and display filtered data
   MnVal = 0 ;
   MxVal = 20 ;
   filteredData = tableData;
   displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
  })
})

//------ DISPLAYDATA FUNCTION ------ Function to create and/or reset the entire display table or display the filtered data
function displaydata(filteredData, minVal=MnVal, maxVal=MxVal){
   //clearing previous search filters and table data
   tbody.text("");
   let selection = filteredData.result.slice(minVal,maxVal);
   selection.forEach((ProductData) => {
     var row = tbody.append("tr");
     Object.entries(ProductData).forEach(([key, value]) => {
       var cell = row.append("td");
       cell.text(value);
     })
   })
}

//------ COMBINED FILTER ------ Function to filter on all four search items from the form
function combinedFilter(filteredData){
// if not result top level node, add one
 if(!(filteredData.hasOwnProperty('result'))){
  addResultString = "{\"result\": " + JSON.stringify(filteredData) + "}";
  filteredData = JSON.parse(addResultString);
 }

// Filter on codeValue and add top level result node
 filteredData = filteredData['result'].filter(d=>d.code.match(codeValue));
 addResultString = "{\"result\": " + JSON.stringify(filteredData) + "}";
 filteredData = JSON.parse(addResultString);

// Filter now on ProductdefValue and add top level result node
 filteredData = filteredData['result'].filter(d=>d.product_definition.match(ProductdefValue));
 addResultString = "{\"result\": " + JSON.stringify(filteredData) + "}";
 filteredData = JSON.parse(addResultString);

// Filter now on cetaneoctaneValue and add top level result node
 filteredData = filteredData['result'].filter(d=>d.cetane_octane.match(cetaneoctaneValue));
 addResultString = "{\"result\": " + JSON.stringify(filteredData) + "}";
 filteredData = JSON.parse(addResultString);

// Filter lastly on requesterValue and add top level result node
 filteredData = filteredData['result'].filter(d=>d.requester.match(requesterValue));
 addResultString = "{\"result\": " + JSON.stringify(filteredData) + "}";
 filteredData = JSON.parse(addResultString);

 return filteredData
}
