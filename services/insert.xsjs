$.response.contentType = "application/text";
var body='';
var aCmd = $.request.parameters.get('dataobject');
var obj=JSON.parse(aCmd);
var id= obj.ID ;
var NAME=obj.NAME;
var tx_data_query="";
function getTxtData()
{
    var connection = $.db.getConnection();
    var statement = null;
    var resultSet = null;
    tx_data_query ='INSERT INTO "TABLE"."STUDENTS" (ID,NAME) VALUES (' + id + ',\'' + NAME +  '\')';
   try
    {
     statement = connection.prepareStatement(tx_data_query);
    resultSet= statement.execute();
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
          $.response.contentType = "application/json";  $.response.contentType = "text/plain";  $.response.setBody(getTxtData());
          }  catch(err) {
             $.response.contentType = "text/plain";  $.response.setBody("Error while executing query: [" +err.message +"]");  $.response.returnCode = 200;
          }
}
doGet();


