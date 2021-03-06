const mysql = require("mysql");
var recombee = require('recombee-api-client');

let rqs = recombee.requests;
let client = new recombee.ApiClient('ncra-dev', '0rjWbZdpqVRvPOggaNiXgtqLMoXuzNYhyp3SQUH8jJ1U2bNHrp1MB26NSJYocs7N');
let SKU_LIST = [];
let USERS_LIST = [];
var purchases = [];
var detailViews = [];
const PROBABILITY_PURCHASED = 0.1;
const PROBABILITY_VIEWED = 0.2;

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
    connection.query("SELECT SKU FROM PRODUCTS", function (error, data, fields) {
        if (error) throw error;
        const jsonData = JSON.parse(JSON.stringify(data));
        set_sku_list(jsonData);
        set_users_list(100);
        set_random_purchases();
        set_random_detailView();
        client.send(new rqs.Batch(purchases),
        (err, response) => {
            console.log(err || 'Products Purchases Sent Successfully');
        });
        client.send(new rqs.Batch(detailViews),
        (err, response) => {
            console.log(err || 'Products Views Sent Successfully');
        });
    });
});

function set_sku_list(jsonData) {
    for (var index = 1; index < jsonData.length; index++) {
        SKU_LIST.push(jsonData[index].SKU);
    }
}

function set_users_list(NUM) {
    USERS_LIST = Array.apply(0, Array(NUM)).map((_, i) => {
        return `user-${i}`;
    });
}

function set_random_purchases() {
    USERS_LIST.forEach((user) => {
        var purchased = SKU_LIST.filter(() => Math.random() < PROBABILITY_PURCHASED);
        purchased.forEach((SKU) => {
            purchases.push(new rqs.AddPurchase(user, SKU, { 'cascadeCreate': true }))
        });
    });
}


function set_random_detailView() {
    USERS_LIST.forEach((user) => {
        var viewed = SKU_LIST.filter(() => Math.random() < PROBABILITY_VIEWED);
        viewed.forEach((SKU) => {
            detailViews.push(new rqs.AddDetailView(user, SKU, {timestamp:'2014-07-20T02:49:45+02:00', 'cascadeCreate': true }))
        });
    });
}