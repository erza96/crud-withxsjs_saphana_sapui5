$.response.contentType = "application/text";
var body='';
var aCmd = $.request.parameters.get('dataobject');
var obj=JSON.parse(aCmd);
var id= obj.ID ;
var id_S = obj.ID_OLD;
var NAME=obj.NAME;
var tx_data_query = "";

function getTxtData()
{
    var connection = $.db.getConnection();
    var statement = null;
    var resultSet = null;
  
  tx_data_query = 'UPDATE "TABLE"."STUDENTS" SET  NAME=\'' + NAME + '\' where ID=\''+id_S+ '\'';
    try
    {
    statement = connection.prepareStatement(tx_data_query);
    resultSet=statement.execute();
    connection.commit();
    } finally {
    statement.close();
    connection.close();
    }
    return resultSet;
}
function doGet()
{
          try
          {
          $.response.contentType = "application/json";
                    $.response.contentType = "text/plain";
                    $.response.setBody(getTxtData());
          }
          catch(err)
          {
                    $.response.contentType = "text/plain";
                    $.response.setBody("Error while executing query: ["+tx_data_query +err.message +"]");
                    $.response.returnCode = 200;
          }
}
doGet();