// Wait for the page to load
window.addEventListener("load", function() {

  // Find the "Check Zipcode" button and attach a click event listener to it
  var checkButton = document.getElementById("checkZipcode");
  checkButton.addEventListener("click", function() {

    // Get the entered zipcode
    var enteredZipcode = document.getElementById("zipcode").value.trim();
    console.log("Entered zipcode: " + enteredZipcode);

    // Load the zipcodes file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_EfjdAsf2pcOi-ywIICtH-2K6-ZF6zzuoH5PC6O4CIy9yQvUHTeqsWvBEbgi5wX6SM1zwlYITVQX1/pub?gid=0&single=true&output=csv");
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log("CSV file loaded successfully.");

        // Parse the CSV data using Papa.parse()
        var results = Papa.parse(xhr.responseText, { header: true });

        // Get an array of zipcodes from the CSV data
        var zipcodes = results.data.map(function(row) {
          return row.zipcode;
        });

        // Check if the entered zipcode is found in the file
        if (zipcodes.includes(enteredZipcode)) {
          console.log("Match found: " + enteredZipcode);
          // Display message that we deliver to this address
          var resultDiv = document.getElementById("result");
          resultDiv.innerHTML = "Vi levererar till denna adress!";
        } else {
          console.log("No match found.");
          // Display message that we do not deliver to this address
          var resultDiv = document.getElementById("result");
          resultDiv.innerHTML = "Vi levererar inte till denna adress för tillfället.";
        }

      } else {
        console.log("Error loading CSV file: " + xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.log("Error loading CSV file.");
    };
    xhr.send();

  });

});


  