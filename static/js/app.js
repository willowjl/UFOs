//import the data from data.js
const tableData = data;

//Reference the HTML table using d3
var tbody = d3.select("tbody")

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// creating empty filter variable 
// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement = d3.select(this);
    console.log(changedElement);

    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    console.log(changedElement);

    // 4c. Save the id of the filter that was changed as a variable.
    let filterID = changedElement.attr("id");
    console.log(filterID);

    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
        filters[filterID] = elementValue;
    }
    else {
        delete filters[filterID];
    }
    //console.log(filters);
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();

  }

// step 7 function to filter the table when data is queried
function filterTable(){
  //step 8
  var filteredData=tableData;

  // Step 9 looping through the data
  Object.entries(filters).forEach(([key, value])=> {
    filteredData = filteredData.filter(row => row[key] === value);
  });

       // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    //step 10
  buildTable(filteredData);
}
  


  
  // Attach an event to listen for the form button
d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
buildTable(tableData);