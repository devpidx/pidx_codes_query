// Get a reference to the table body
const tbody = d3.select("tbody") ;
 var tableData ;
 var filteredData ; 
 var codeElement ;
 var ProductdefElement ;
 var cetaneoctaneElement ;
 var requesterElement ;
 var button ;
 var codeValue ;
 var ProductdefValue ;
 var cetaneoctaneValue ;
 var requesterValue ;
 var codeFilter ;
 var ProductdefFilter ;
 var cetaneoctaneFilter ;
 var requesterFilter ;
 var MxVal ;
 var MnVal;
 var FF;
 MnVal = 0 ;
 MxVal = 20 ;
 FF = false ;

// Function to create a display table
 function displaydata(data, minVal=MnVal, maxVal=MxVal){
   FF = false ;
   //clearing previous filters
   tbody.text("");
   let selection = data.result.slice(minVal,maxVal);
   selection.forEach((ProductData) => {
     var row = tbody.append("tr");
     Object.entries(ProductData).forEach(([key, value]) => {
       var cell = row.append("td");
       cell.text(value);
     });
   });
 }

// Function to display filtered data
 function displayfilterdata(data, minVal=MnVal, maxVal=MxVal){ 
  FF = true ;
  //clearing previous filters
  tbody.text("");
  console.log("Display :" , data);
  console.log(FF);
  let selection = data.slice(minVal,maxVal);
  selection.forEach((ProductData) => {
    var row = tbody.append("tr");
    Object.entries(ProductData).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

// Get all the product codes from the api.pidx.org API
 d3.json('http://api.pidx.org:8080/api/v1/resources/codes/all', function(data) {
  console.log("API Loaded Data = ", data);
  FF = false ;
  tableData = data;
  filteredData = tableData;
  
  // Select the input element and get the raw HTML node
  codeElement = d3.select("#code");
  ProductdefElement = d3.select("#Productdef");
  cetaneoctaneElement = d3.select("#cetaneoctane");
  requesterElement = d3.select("#requester");
  
  // Display the table data
  displaydata(tableData);
  
  // Set up the buttons
  button = d3.select("#filter-btn");
  nextButton = d3.select("#nextButton")
  prevButton = d3.select("#prevButton")
  resetButton= d3.select("#reset-btn")
  
  // Next button click function definition
  nextButton.on("click", function(){
   if (MxVal < 3376){
    console.log(FF);
    MnVal = MnVal + 20 ;
    MxVal = MxVal + 20 ;
    if (FF === false) {
     displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
    } else if (FF === true) {
     displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
    }
   };
  })
  
  // Previous button click function definition
  prevButton.on("click", function(){
       if (MnVal > 0){
          MnVal = MnVal - 20 ;
          MxVal = MxVal - 20 ;
          if (FF === false) {
            displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
          }
          if (FF === true) {
            displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal); 
          }
       };
  })

  // Search button "filter" click function definition
  button.on("click", function() {
   console.log("Filter Button Was Clicked");
   FF === true;
   tableData = data;
   filteredData = tableData; 
   //clearing all values displayed on the webpage from previous filters and delete the table
   console.log("Clearing Old Entries");
   tbody.text("");

   // Get the value property of the input elements from the form
   codeValue = codeElement.property("value");
   //codeValue = codeValue.toUpperCase();
   console.log("codeValue = ", codeValue);

   ProductdefValue = ProductdefElement.property("value");
   //ProductdefValue = ProductdefValue.toUpperCase();
   console.log("ProductdefValue = ", ProductdefValue);
   
   cetaneoctaneValue = cetaneoctaneElement.property("value");
   //cetaneoctaneValue = cetaneoctaneValue.toString();
   console.log("cetaneoctaneValue = ", cetaneoctaneValue);
   
   requesterValue = requesterElement.property("value");
   //requesterValue = requesterValue.toUpperCase();
   console.log("requesterValue = ", requesterValue);
       
   // Function to filter on codeValue
   function codeFilter(tableData){
          // let returnData = tableData['result'].filter(d=>d.code === codeValue);
    let returnData = tableData['result'].filter(d=>d.code.match(codeValue));
    console.log(returnData)
    return returnData
   };

   // Function to filter on ProductdefValue
   function ProductdefFilter(tableData){
    let returnData = tableData['result'].filter(d=>d.product_definition.match(ProductdefValue));
    console.log(returnData)
    return returnData
   };

   // Function to filter on cetaneoctaneValue
   function cetaneoctaneFilter(tableData){
    let returnData = tableData['result'].filter(d=>d.cetane_octane.match(cetaneoctaneValue));
    console.log(returnData)
    return returnData
   };

   // Function to filter on requesterValue
   function requesterFilter(tableData){
    let returnData = tableData['result'].filter(d=>d.requester.match(requesterValue));
    console.log(returnData)
    return returnData
   };
   
   // Set the ProductdefValue filtered data and display to webpage
   if (ProductdefValue != "") {
    filteredData = ProductdefFilter(filteredData);
    MnVal = 0 ;
    MxVal = 20 ;
//    displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
   }
   
   // Set the codeValue filtered data and display to webpage
   if (codeValue != "") {
    filteredData = codeFilter(filteredData);
    MnVal = 0 ;
    MxVal = 20 ;
//    displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
   }

   // Set the cetaneoctaneValue filtered data and display to webpage
   if (cetaneoctaneValue != "") {
    filteredData = cetaneoctaneFilter(filteredData);
    MnVal = 0 ;
    MxVal = 20 ;
//    displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
   }
       
   // Set the requesterValue filtered data and display to webpage
   if (requesterValue != "") {
    filteredData = requesterFilter(filteredData);
    MnVal = 0 ;
    MxVal = 20 ;
//    displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
    }
    displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
  });
  
  //  resetting the displayed data to the full dataset while keeping the filter values untouched
  resetButton.on("click", function() {
   reset()
  });
  
  // Reset form data and table data
  function reset(){
   resetButtons()
   MnVal = 0 ;
   MxVal = 20 ;
   displaydata(tableData, minVal=MnVal, maxVal=MxVal);
   filteredData = tableData; 
  };
  
  // Reset the buttons on the search form then set filteredData to the total loaded tableData
  function resetButtons(){
   FF = false ;
   console.log("Clearing Old Entries");
   tbody.text("");
   document.getElementById('code').value = '';
   document.getElementById('Productdef').value = '';
   document.getElementById('cetaneoctane').value = '';
   document.getElementById('requester').value = '';
   //filteredData = tableData;
  };
 });
