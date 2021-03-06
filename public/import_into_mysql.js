const fs = require("fs");
const mysql = require("mysql");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("recombee.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        csvData.shift();
        // create a new connection to the database
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "pakistan1",
            database: "recombee"
        });
        // open the connection
        connection.connect(error => {
            if (error) {
                console.error(error);
            } else {
                let query = "INSERT INTO PRODUCTS (SKU, NAME, PRICE, COST, INSTOCK, URL, IMAGE) VALUES ?";
                connection.query(query, [csvData], (error, response) => {
                    console.log(error || response);
                });
            }
        });
    });

stream.pipe(csvStream);