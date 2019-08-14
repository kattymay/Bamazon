// Dependencies
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

// Function to displayItems
// Pull from sql table "products"
function displayItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    // If error, throw error
    if (err) throw err;
    // Console.table(response)
    console.table(res);
    // Call customerOrder
    customerOrder();
  });
}

// Function customerOrder
function customerOrder() {
  // Prompt user to input selected item and quantity
  inquirer.prompt([{
    name: "item_id",
    message: "Enter item ID",
    type: "input"
  }, {
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
// If user has submitted choice, update table with answers
    .then(function (answer) {
      var itemId = answer.item_id;
      var itemQuantity = answer.quantity;

// Pull from sql table "products"
      connection.query("SELECT * FROM  products WHERE  item_id =" + itemId, function (err, res) {
        var selected = res[0];
  
// If not enough of item, display alert
        if (itemQuantity > selected.stock_quantity) {
          console.log("Not enough in stock");
          displayItems();
        }
        else {
          // Place order if enough in stock
          placeOrder(itemId, itemQuantity, selected.price);
        }
      });
    }
    )
}


// placeOrder function
// Update query with correct quantity of items
function placeOrder(itemId, itemQuantity, price) {
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id= ?", [itemQuantity, itemId], function (err, res) {
    // If error, throw error
    if (err) throw err;

    // Console.log to show order has been placed
    // Console.log to show total price of order, include itemQuantity
    console.log("Your order has been placed.");
    console.log("The total cost of your purchase is $ " + (price * itemQuantity) + ".");
    stillShopping();
  })
}
// Prompt function will display user choice to continue shopping
function stillShopping() {
  inquirer.prompt([
    {
      name: "shop",
      message: "Continue shopping?",
      type: "confirm"
    }
    // displayItems if user would like to continue
  ]).then(function (answer) {
    if (answer.shop) {
      displayItems();
    }
    else {
      // Console will exit if user is finished
      console.log("Thank you for shopping!")
      exit();
    }
  })
}
// End connection 
function exit() {
  connection.end();
}