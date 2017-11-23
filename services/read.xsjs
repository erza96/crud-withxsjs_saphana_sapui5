var select_all_sales_orders_query =
                    'SELECT * from "TABLE"."STUDENTS"';
function close(closables) {
          var closable;
          var i;
          for (i = 0; i < closables.length; i++) {
                    closable = closables[i];
                    if(closable) {
                              closable.close();
                    } 
          }
}
function getSalesOrders(){
          var salesOrdersList = [];
          var connection = $.db.getConnection();
          var statement = null;
          var resultSet = null;
          try{
                    statement = connection.prepareStatement(select_all_sales_orders_query);
                    resultSet = statement.executeQuery();
                    var salesOrder;
                
                    while (resultSet.next()) {
                              salesOrder = {};
                              salesOrder.ID = resultSet.getString(1);
                              salesOrder.NAME = resultSet.getString(2);
                              
                              salesOrdersList.push(salesOrder);
                    }
          } finally {
                    close([resultSet, statement, connection]);
          }
          return salesOrdersList;
}
function doGet() {
          try{
                    $.response.contentType = "application/json";
                    $.response.setBody(JSON.stringify(getSalesOrders()));
          }
          catch(err){
                    $.response.contentType = "text/plain";
                    $.response.setBody("Error while executing query: [" + err.message + "]");
                    $.response.returnCode = 200;
          }
}
doGet();