var mysql = require ("mysql");
var inquirer = require ("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
  });

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId + "\n");
    displayItems();
  });

  function displayItems() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
        console.table(res);
    customerOrder();
    });
  }

function customerOrder(){
    inquirer.prompt([{
        name: "item_id",
        message: "Enter item ID",
        type: "input"
    },{
        name: "quantity",
        message: "Enter wanted quantity of item",
        type: "input",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
    }])
    
.then(function(answer) {
    var itemId = answer.item_id;
    var itemQuantity = answer.quantity;
    //console.log(itemID, itemQuantity )
        
connection.query("SELECT * FROM  products WHERE  item_id =" + itemId, function(err, res){
    var selected = res[0];
    //console.log(selected);
    //console.log(selected.stock_quantity);
    //console.log(itemQuantity);

    if(itemQuantity > selected.stock_quantity){
        console.log("Not enough in stock");
        displayItems();
    }
    else{
        placeOrder(itemId, itemQuantity, selected.price);
    }
    //connection.end();
});
}
)}
//}

function placeOrder(itemId, itemQuantity, price){
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id= ?", [itemQuantity, itemId], function(err, res){
       if (err) throw err;
       //console.log(res);

console.log("Your order has been placed.");
console.log("The total cost of your purchase is $ " + (price * itemQuantity) +  ".");
stillShopping();
  })
}

function stillShopping(){
    inquirer.prompt([
        {
            name: "shop",
            message: "Continue shopping?",
            type: "confirm"
        }
     ]).then(function(answer){
        if(answer.shop){
        displayItems();
        }
     else{
        console.log("Thank you for shopping!")
        exit();
    }
})
}

function exit(){
    connection.end();
}