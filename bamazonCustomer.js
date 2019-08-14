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
    displyItems();
  });

  function displyItems() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
        console.table(res);
    customerOrder();
    });
  }

function customerOrder(){
    inquirer.prompt([{
        name: "item_id",
        message: "Please enter the id of the item you would like to order.",
        type: "input"
    },{
        name: "quantity",
        message: "Please enter the quantity of the item you would like to order.",
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
        console.log("Sorry, there is not engouh items in a stock.");
        displyItems();
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

console.log("Congratulation! You just placed your order.");
console.log("The total cost of your purchase is $ " + (price * itemQuantity) +  ".");
stillShopping();
  })
}

function stillShopping(){
    inquirer.prompt([
        {
            name: "shop",
            message: "Whould you like to purchase more items?",
            type: "confirm"
        }
     ]).then(function(answer){
        if(answer.shop){
        displyItems();
        }
     else{
        console.log("Thank you for shopping with Bamazon! Have a nice day!")
        exit();
    }
})
}

function exit(){
    connection.end();
}