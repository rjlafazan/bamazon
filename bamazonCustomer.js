var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon",
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection ID: " + connection.threadID);
  bamazonInquiry();
});

function bamazonInquiry() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    for (i = 0; i < res.length; i++) {
      console.log(
        "ID: " + res[i].item_id + " " + res[i].product_name + " " + res[i].price
      );
    }
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the product ID?",
        },
        {
          name: "quantity",
          type: "input",
          message: "How many?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then(function(answer) {
        var itemChoice;
        for (i = 0; i < res.length; i++) {
          if (answer.item == res[i].item_id) {
            itemChoice = res[i];
          }
        }
        if (itemChoice.stock_quantity >= answer.quantity) {
          var quantity =
            parseInt(itemChoice.stock_quantity) - parseInt(answer.quantity);
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [{ stock_quantity: quantity }, { item_id: itemChoice.item_id }],
            function(err) {
              if (err) throw err;
              console.log(
                "Total price is $" + itemChoice.price * answer.quantity
              );
              inquirer
                .prompt([
                  {
                    name: "continue",
                    type: "list",
                    message: "Would you like to keep shopping?",
                    choices: ["Yasss", "Nahhh"],
                  },
                ])
                .then(function(answer) {
                  if (answer.continue == "Yasss") {
                    bamazonInquiry();
                  } else {
                    console.log("Thank you, come again!");
                  }
                });
            }
          );
        } else {
          console.log("Inventory too low :'(");
          inquirer
            .prompt([
              {
                name: "continue",
                type: "list",
                message: "Would you like to keep shopping?",
                choices: ["Yasss", "Nahhh"],
              },
            ])
            .then(function(answer) {
              if (answer.continue == "Yasss") {
                bamazonInquiry();
              } else {
                console.log("Thank you, come again!");
              }
            });
        }
      });
  });
}
