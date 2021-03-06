let client = new recombee.ApiClient('ncra-dev', 'mCjmWe9VWXXBDqMAHyN35g1wcndEU7cvcnTzEQnl0Ism4aQ4B03ziLFdpxfMMAud');
let SKU_LIST = ['d-2198', 'd-2051', 'd-2159', 'D-2197-b', 'D-1652', 'D-2143', 'D-2256', 'd-2263', 'd-2156', 'D-2228', 'D-2199-B', 'D-2180-A', 'd-2266', 'D-2200-B', 'D-2232-A', 'D-2212-n', 'D-2130', 'D-2216', 'D-2249', 'D-2209', 'd-2258-a', 'D-2179', 'D-2214', 'D-2212-C', 'D-2221', 'D-2196-B', 'AY-2146', 'D-2265', 'D-2215', 'D-2175-B'];
let USERS_LIST = [];

function set_users() {
    var USERS = document.getElementById('USERS');
    USERS_LIST = Array.apply(0, Array(100)).map((_, i) => {
        return `user-${i}`;
    });
    USERS_LIST.forEach(USER);
    function USER(item, index) {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        USERS.appendChild(option);
    }
}

function set_products() {
    var PRODUCTS = document.getElementById('PRODUCTS');
    SKU_LIST.forEach(PRODUCT);
    function PRODUCT(item, index) {
        var option = document.createElement("option");
        option.value = item;
        option.text = item;
        PRODUCTS.appendChild(option);
    }
}

function set_recommendations() {
    var RECOMMENDATIONS = document.getElementById('NUM');
    ADD('3', 3);
    ADD('6', 6);
    ADD('9', 9);
    function ADD(item, index) {
        var option = document.createElement("option");
        option.value = index;
        option.text = item;
        RECOMMENDATIONS.appendChild(option);
    }
}

function send_recommendation() {
    var user_name = document.getElementById('USERS').value;
    var product_name = document.getElementById('PRODUCTS').value;
    var recommendations = parseInt(document.getElementById('NUM').value);
    client.send(new recombee.RecommendItemsToItem(product_name, user_name, recommendations,
        {
            'scenario': 'product_detail',
            'returnProperties': true,
            'cascadeCreate': true
        }
    ),
        (err, recommended) => {
            console.log(err || recommended);
            alert(err || 'Recommedation Successfully Sent');
        }
    );
}

window.addEventListener("load", (e) => {
    set_products();
    set_users();
    set_recommendations();
});