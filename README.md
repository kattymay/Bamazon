# Bamazon
Bamazon is an application that allows users to chose a product to purchase, as well as the quantity of the item they'd like to buy. The app then gives the user a shopping cart total.

The products table should have each of the following columns:
* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)

The app should then prompt users with two messages.

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.
Once the customer has placed the order, this application should check if your store has enough of the product to meet the customer's request.

If not, the app should log the phrase "Not enough in stock!", and then prevent the order from going through.
However, if the does have enough of the product, it will fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, it will show the customer the total cost of their purchase.