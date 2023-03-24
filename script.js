fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vT_EfjdAsf2pcOi-ywIICtH-2K6-ZF6zzuoH5PC6O4CIy9yQvUHTeqsWvBEbgi5wX6SM1zwlYITVQX1/pub?gid=0&single=true&output=csv')
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        var zipcodes = Papa.parse(data.trim(), {
            header: true,
            delimiter: ",",
            skipEmptyLines: true
        }).data.map(function(row) {
            return row.zipcode;
        });

        var checkButton = document.getElementById("checkZipcode");
        checkButton.addEventListener("click", function() {
            var zipcode = document.getElementById("zipcode").value.trim();
            if (zipcodes.includes(zipcode)) {
                document.getElementById("result").innerHTML = "Vi levererar till din adress!";
            } else {
                document.getElementById("result").innerHTML = "Vi levererar inte till din adress ännu.";
            }
        });
    })
    .catch(function(error) {
        console.log("Error fetching zipcodes: " + error);
    });



  