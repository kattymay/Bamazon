// Boiler Plates
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
// Invoke allProducts
connection.connect(function (err) {
    if (err) throw err;
    allProducts();
});

// allProducts function will call on the connection to bamazon_db query
// will select from products table
function allProducts() {
    connection.query("SELECT * FROM products",
        function (err, res) {
            // If error throw error
            if (err) throw err;
            // Console.table(response)
            console.table(res);
            // Invoke call to userOrder function
            userOrder();
        });
}

// userOrder function to request user input
function userOrder() {
    // Input prompt for user to enter item ID
    // type: input
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Enter Item ID"
        }, {
            // Input prompt for user to enter requested quantity 
            type: "input",
            name: "quantity",
            message: "How many?",

        }])

        // Use user input to update and match table
        // Variables to use when matching with user answer's
        .then(function (answer) {
            var product = answer.product;
            var quantity = answer.quantity;

            // Pull from sql "products" table where item_id is equal to users selection
            connection.query("SELECT * FROM products WHERE item_id =" +
                product, function (err, res) {
                    var selected = res[0];
                    // Check quantity in bamazon.db according to selected item_id
                    // Alert will display to user if there are not enough items in stock to match their order
                    if (quantity > selected.stock_quantity) {
                        console.log("Not enough in stock");
                        // Invoke allProducts
                        allProducts();
                    }
                    else {
                        // Else condition call to  invoke placeOrder if enough in stock
                        placeOrder(product, quantity, selected.price);

                    }
                });
        });
}
// placeOrder function will call on "products" table
function placeOrder(product, quantity, price) {
    // will update and set row stock_quantity after user makes a selection
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id= ?", [quantity, product],
        function (err, res) {
            // will call on function to take error and response
            if (err) throw err;

            // Console.log that order has been placed
            console.log("Your order has been placed.");
            // Console.log total cost of purchase
            console.log("The total cost of your purchase is $ " + (price + quantity) + ".");
            stillShopping();
        })
}
// stillShopping function will show prompt for user to continue shopping or exit
//  type: confirm 
function stillShopping() {
    inquirer.prompt([{
        type: "confirm",
        name: "shop",
        message: "Continue shopping?",
    }
    ])
        // call on user's answer to invoke allProducts when user wishes to continue
        .then(function (answer) {
            if (answer.shop) {
                allProducts();

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