const mysql = require("mysql");
var recombee = require('recombee-api-client');

let rqs = recombee.requests;
let client = new recombee.ApiClient('ncra-dev', '0rjWbZdpqVRvPOggaNiXgtqLMoXuzNYhyp3SQUH8jJ1U2bNHrp1MB26NSJYocs7N');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pakistan1",
    database: "recombee"
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    // query data from MySQL
    connection.query("SELECT * FROM PRODUCTS", function (error, data, fields) {
        if (error) throw error;
        client.send(new rqs.Batch([
            new rqs.AddItemProperty('NAME', 'string'),
            new rqs.AddItemProperty('PRICE', 'int'),
            new rqs.AddItemProperty('COST', 'int'),
            new rqs.AddItemProperty('INSTOCK', 'string'),
            new rqs.AddItemProperty('URL', 'string'),
            new rqs.AddItemProperty('IMAGE', 'image')
        ]))
            .then((responses) => {
                const jsonData = JSON.parse(JSON.stringify(data));
                for (var index = 1; index < jsonData.length; index++) {
                    client.send(new rqs.SetItemValues(jsonData[index].SKU,
                        {
                            NAME: jsonData[index].NAME,
                            PRICE: jsonData[index].PRICE,
                            COST: jsonData[index].COST,
                            INSTOCK: jsonData[index].INSTOCK,
                            URL: jsonData[index].URL,
                            IMAGE: jsonData[index].IMAGE
                        },
                        // optional parameters
                        {
                            cascadeCreate: true
                        }
                    ),
                        (err, response) => {
                            console.log(err || 'Product uploaded successfully');
                        }
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});