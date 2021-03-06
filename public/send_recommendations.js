const mysql = require("mysql");
var recombee = require('recombee-api-client');

let rqs = recombee.requests;
let client = new recombee.ApiClient('ncra-dev', '0rjWbZdpqVRvPOggaNiXgtqLMoXuzNYhyp3SQUH8jJ1U2bNHrp1MB26NSJYocs7N');
let SKU_LIST = [];
let USERS_LIST = [];
let random_generated_recommendations = 50; // How many random recommendations will be generated to send to random users 
let num_of_recommendations = 3;  // Number of recommended products to show to user

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
        send_recommendations(random_generated_recommendations, num_of_recommendations);
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

function send_recommendations(TOTAL, INDIVIDUAL) {
    for (let index = 1; index < TOTAL; index++) {
        let SKU = SKU_LIST[Math.floor(Math.random() * SKU_LIST.length)];
        let USER = USERS_LIST[Math.floor(Math.random() * USERS_LIST.length)];
        console.log('Recommended user ' + USER + ' ' + INDIVIDUAL + ' products who viewed product ' + SKU);
        client.send(new rqs.RecommendItemsToItem(SKU, USER, INDIVIDUAL,
            {
                'scenario': 'product_detail',
                'returnProperties': true,
                'cascadeCreate': true
            }
        ),
            (err, recommended) => {
                // console.log(err || recommended);
            }
        );
    };

}
