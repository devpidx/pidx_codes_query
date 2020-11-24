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
 d3.json('http://api.pidx.org:8080/api/v1/resources/codes/all', function(data) {
    FF = false ;
    tableData = data;
    filteredData = tableData; 
    // Select the input element and get the raw HTML node
        codeElement = d3.select("#code");
        ProductdefElement = d3.select("#Productdef");
        cetaneoctaneElement = d3.select("#cetaneoctane");
        requesterElement = d3.select("#requester");
      displaydata(tableData);
      button = d3.select("#filter-btn");
      nextButton = d3.select("#nextButton")
      prevButton = d3.select("#prevButton")
      resetButton= d3.select("#reset-btn")
      nextButton.on("click", function(){
        if (MxVal < 3376){
          console.log(FF);
          MnVal = MnVal + 20 ;
          MxVal = MxVal + 20 ;
          if (FF === false) {
            displaydata(filteredData, minVal=MnVal, maxVal=MxVal);
          }else if (FF === true) {
            displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal); 
          }
       };
      })
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
      button.on("click", function() {
        FF === true ;
        tableData = data;
        filteredData = tableData; 
       console.log("Filter Button Was Clicked");
       //clearing all values displayed on the webpage from previous filters
       console.log("Clearing Old Entries");
       tbody.text("");
       // Get the value property of the input element
       codeValue = codeElement.property("value");
       console.log(codeValue);
       ProductdefValue = ProductdefElement.property("value");
       console.log(ProductdefValue);
       cetaneoctaneValue = cetaneoctaneElement.property("value");
       cetaneoctaneValue =cetaneoctaneValue.toString() ;
       console.log(cetaneoctaneValue);
       requesterValue = requesterElement.property("value");
       requesterValue = requesterValue.toUpperCase();
       console.log(requesterValue);
       function codeFilter(tableData){
          // let returnData = tableData['result'].filter(d=>d.code === codeValue);
          let returnData = tableData['result'].filter(d=>d.code.match(codeValue));
         console.log(returnData)
         return returnData
       };
     function ProductdefFilter(tableData){
         let returnData = tableData['result'].filter(d=>d.product_definition.match(ProductdefValue));
        console.log(returnData)
        return returnData
      };
     function cetaneoctaneFilter(tableData){
       let returnData = tableData['result'].filter(d=>d.cetane_octane.match(cetaneoctaneValue));
      console.log(returnData)
      return returnData
      };
     function requesterFilter(tableData){
       let returnData = tableData['result'].filter(d=>d.requester.match(requesterValue));
      console.log(returnData)
      return returnData
    };
    //appending filtered data to webpage
     if (codeValue != "") {
         console.log(`Filter-Code: ${codeValue}`);
         filteredData = codeFilter(filteredData);
         MnVal = 0 ;
         MxVal = 20 ;
         displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
     }
     if (ProductdefValue != "") {
         console.log(`Filter-Productdef: ${ProductdefValue}`);
         filteredData = ProductdefFilter(filteredData);
         MnVal = 0 ;
         MxVal = 20 ;
         displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
     }
     if (cetaneoctaneValue != "") {
         console.log(`Filter-cetaneoctane: ${cetaneoctaneValue}`);
         filteredData = cetaneoctaneFilter(filteredData);
         MnVal = 0 ;
         MxVal = 20 ;
         displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
     }
     if (requesterValue != "") {
         console.log(`Filter-shape: ${requesterValue}`);
         filteredData = requesterFilter(filteredData);
         MnVal = 0 ;
         MxVal = 20 ;
         displayfilterdata(filteredData, minVal=MnVal, maxVal=MxVal);
     }
     });
 //  resetting the displayed data to the full dataset while keeping the filter values untouched
 resetButton.on("click", function() {
   reset()
 });
 function reset(){
        resetButtons()
        MnVal = 0 ;
        MxVal = 20 ;
        displaydata(tableData, minVal=MnVal, maxVal=MxVal);
        filteredData = tableData; 
      };
  function resetButtons(){
        FF = false ;
        console.log("Clearing Old Entries");
        tbody.text("");
        document.getElementById('code').value = '';
        document.getElementById('Productdef').value = '';
        document.getElementById('cetaneoctane').value = '';
        document.getElementById('requester').value = '';
        filteredData = tableData; 
      };
 });