// app.js is the main routine to handle the PIDX product
// code searches from the api.pidx.org:8080 website
// Get a reference to the table body
const tbody = d3.select("tbody") ;
var tableData;
var filteredData;
var newdata;
var returnData;

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
var SearchFF;

MnVal = 0;
MxVal = 20;
SearchFF = false;

// Get all the product codes from the api.pidx.org API and load into data
// top level collection is called 'result'

d3.json('http://api.pidx.org:8080/api/v1/resources/codes/all', function(data) {
  SearchFF = false ;
  newdata = data;
  tableData = newdata;
  filteredData = tableData;

  // Select the input element and get the raw HTML node
  codeElement = d3.select("#code");
  ProductdefElement = d3.select("#product_definition");
  cetaneoctaneElement = d3.select("#cetane_octane");
  requesterElement = d3.select("#requester");

  // Display the table data all rows from data initially
  displaydata(tableData);

  // Set up the buttons
  button = d3.select("#filter-btn");
  nextButton = d3.select("#nextButton")
  prevButton = d3.select("#prevButton")
  resetButton= d3.select("#reset-btn")

  //------ NEXT BUTTON ------
  // Next button click function definition
  nextButton.on("click", function(){
   if (MxVal < 3376){
    MnVal = MnVal + 20 ;
    MxVal = MxVal + 20 ;
    if (SearchFF === false) {
     displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
    } else if (SearchFF === true) {
     displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
    }
   }
  })
  //------ END NEXT BUTTON ------

  //------ PREV BUTTON ------
  // Previous button click function definition
  prevButton.on("click", function(){
   if (MnVal > 0){
    MnVal = MnVal - 20 ;
    MxVal = MxVal - 20 ;
    if (SearchFF === false) {
     displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
    }
    if (SearchFF === true) {
     displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
    }
   }
  })
  //------ END PREV BUTTON ------

  //------ SEARCH BUTTON ------
  // Search button "filter" click function definition, reset all data to original full table
  button.on("click", function() {
   SearchFF = true;
   tableData = newdata;
   filteredData = tableData;

   // Get the value property of the input elements from the form and convert to upper case for filtering
   codeValue = codeElement.property("value");
   codeValue = codeValue.toUpperCase();
   ProductdefValue = ProductdefElement.property("value");
   ProductdefValue = ProductdefValue.toUpperCase();
   cetaneoctaneValue = cetaneoctaneElement.property("value");
   cetaneoctaneValue = cetaneoctaneValue.toString();
   requesterValue = requesterElement.property("value");
   requesterValue = requesterValue.toUpperCase();

   // Set the codeValue filtered data and display to webpage
   if (codeValue != "") filteredData = codeFilter(filteredData);

   // Set the cetaneoctaneValue filtered data and display to webpage
   if (cetaneoctaneValue != "") filteredData = cetaneoctaneFilter(filteredData);

   // Set the requesterValue filtered data and display to webpage
   if (requesterValue != "") filteredData = requesterFilter(filteredData);

   // Set the ProductdefValue filtered data and display to webpage
   if (ProductdefValue != "") filteredData = ProductdefFilter(filteredData);

   // set min max and call displayFilteredData to redraw table
   MnVal = 0 ;
   MxVal = 20 ;
   displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
  })
  //------ END SEARCH BUTTON ------


  //------ RESET BUTTON ------
  //  resetting the displayed data to the full dataset while keeping the filter values untouched
  resetButton.on("click", function() {
   SearchFF = false ;
   console.log("Clearing Old Entries");
   document.getElementById('code').value = '';
   document.getElementById('product_definition').value = '';
   document.getElementById('cetane_octane').value = '';
   document.getElementById('requester').value = '';
   MnVal = 0 ;
   MxVal = 20 ;
   tableData=newdata;
   displaydata(tableData, minVal=MnVal, maxVal=MxVal);
   filteredData = tableData;
  })
  //------ END RESET BUTTON ------
})


//------ FUNCTION DEFINITIONS ------
// Function to create and/or reset the entire display table
function displaydata(dispdata, minVal=MnVal, maxVal=MxVal){
   //clearing previous search filters and table data
   SearchFF = false ;
   tbody.text("");
   let selection = dispdata.result.slice(minVal,maxVal);
   selection.forEach((ProductData) => {
     var row = tbody.append("tr");
     Object.entries(ProductData).forEach(([key, value]) => {
       var cell = row.append("td");
       cell.text(value);
     })
   })
}

// Function to create a filtered display table
function displayfilterdata(fdata, minVal=MnVal, maxVal=MxVal){
  // Set filtered data flag to true , clear table data and recreate using filtered data
  SearchFF = true ;
  tbody.text("");
  let selection = fdata.slice(minVal,maxVal);
   selection.forEach((ProductData) => {
    var row = tbody.append("tr");
    Object.entries(ProductData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    })
  })
}

// Function to filter on codeValue ---------------------------------------
function codeFilter(codetableData){
 if(!(codetableData.hasOwnProperty('result'))){
  console.log("CODE Adding result to requester search");
  addResultString = "{\"result\": " + JSON.stringify(codetableData) + "}";
  codetableData = JSON.parse(addResultString);
 }
 let codereturnData = codetableData['result'].filter(d=>d.code.match(codeValue));
 return codereturnData
}

// Function to filter on ProductdefValue ---------------------------------
function ProductdefFilter(prodtableData){
 if(!(prodtableData.hasOwnProperty('result'))){
  console.log("PROD Adding result to requester search");
  addResultString = "{\"result\": " + JSON.stringify(prodtableData) + "}";
  prodtableData = JSON.parse(addResultString);
 }
 let prodreturnData = prodtableData['result'].filter(d=>d.product_definition.match(ProductdefValue));
 return prodreturnData
}

// Function to filter on cetaneoctaneValue -------------------------------
function cetaneoctaneFilter(cettableData){
 if(!(cettableData.hasOwnProperty('result'))){
  console.log("CET Adding result to requester search");
  addResultString = "{\"result\": " + JSON.stringify(cettableData) + "}";
  cettableData = JSON.parse(addResultString);
 }
 console.log("CET value = ", cetaneoctaneValue);
 let cetreturnData = cettableData['result'].filter(d=>d.cetane_octane.match(cetaneoctaneValue));
 return cetreturnData
}

// Function to filter on requesterValue ----------------------------------
function requesterFilter(reqtableData){
 if(!(reqtableData.hasOwnProperty('result'))){
  console.log("REQ Adding result to requester search");
  addResultString = "{\"result\": " + JSON.stringify(reqtableData) + "}";
  reqtableData = JSON.parse(addResultString);
 }
 let reqreturnData = reqtableData['result'].filter(d=>d.requester.match(requesterValue));
 return reqreturnData
}
//------ END OF FUNCTIONS DEFINITION ------
