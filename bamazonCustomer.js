// Dependencies, mysql & inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

// Connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

// displayItems function will call on the connection to bamazon_db query
// will select from products table
function displayItems() {
    connection.query("SELECT * FROM products",
        function (err, res) {
            // If error throw error
            if (err) throw err;
            // Console.table(response)
            console.table(res);
            // Invoke customerOrder
            customerOrder();
        });
}

// customerOrder function with inquirer prompt 
function customerOrder() {
    // Input prompt for user to enter item ID
    inquirer.prompt([{
        name: "item_id",
        message: "Enter item ID",
        type: "input"
    }, {
        // Input prompt for user to enter requested quantity 
        name: "quantity",
        message: "How many?",
        type: "input",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }])

        // Use user input to update and match table
        .then(function (answer) {
            var itemId = answer.item_id;
            var itemQuantity = answer.quantity;

            // Pull from sql "products" table where item_id is equal to users selection 
            // connection function will take arguments error and response
            connection.query("SELECT * FROM products WHERE item_id =" +
                itemId, function (err, res) {
                    var selected = res[0];

                    // ALert will display to user if there are not enough items in stock to match their order
                    if (itemQuantity > selected.stock_quantity) {
                        console.log("Not enough in stock");
                        // Invoke displayItems
                        displayItems();
                    }
                    else {
                        // Else condition call to place order if enough in stock
                        placeOrder(itemId, itemQuantity, selected.price);

                    }
                });
        });
}
// placeOrder function will call on "products" table
function placeOrder(itemId, itemQuantity, price) {
    // will update and set row stock_quantity after user makes a selection
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id= ?", [itemQuantity, itemId],
        function (err, res) {
            // will call on function to take error and response
            if (err) throw err;

            // Console.log that order has been placed
            console.log("Your order has been placed.");
            // Console.log total cost of purchase
            console.log("The total cost of your purchase is $ " + (price + itemQuantity) + ".");
            stillShopping();
        })
}
// stillShopping function will push inquirer prompt for user to continue shopping or exit
//  type: confirm 
function stillShopping() {
    inquirer.prompt([{
        name: "shop",
        message: "Continue shopping?",
        type: "confirm"
    }
    ])
        // call on user's answer to invoke displayItems when user wishes to continue
        .then(function (answer) {
            if (answer.shop) {
                displayItems();

            }
            // or else condition to console.log "Thank you" and exit shopping connection
            else {
                console.log("Thank you for shopping!")
                exit();
            }
        })
}
// End connection
function exit() {
    connection.end();
}