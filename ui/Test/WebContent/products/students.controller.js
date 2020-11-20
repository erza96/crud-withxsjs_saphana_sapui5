sap.ui.controller("products.students", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf products.students
*/
	onInit: function() {
		
		 var oModel = new sap.ui.model.odata.ODataModel("https://hxehost:xxxx/demo/ui/Test/WebContent/products/test.xsodata")
		//var oModel = new sap.ui.model.odata.ODataModel("read.xsjs");
		oModel.oHeaders = {
			"DataServiceVersion": "2.0",
			"MaxDataServiceVersion": "4.0"
			
		}
		
		sap.ui.getCore().setModel(oModel, "products");
	},
	
	// form should be hidden in the beginning
	onAfterRendering: function() {
		$("#formId").hide();
		$("#formId_edit").hide();
	},
    
	mode: 0,
	id_studentit: 0,

	resetForm: function() {
		$("#name").val('');
		$('#id').val('');
		
	},
	
	create: function() {
		
		this.mode = 'create';
		this.resetForm();
		console.log(this.mode);
		$("#formId").slideDown(300, function() {
			
			//var id = sap.ui.getCore().byId('tableId')._getRowCount();
			//$("#id").val(id);
			
		});
		
	},

edit: function(){
	this.mode = 'edit';
		this.resetForm();
		
			$("#formId").slideDown(300, function() {
				
				//var id = sap.ui.getCore().byId('tableId')._getRowCount();
				//$("#id").val(id);
				
			});
			
		
		var oTable = sap.ui.getCore().byId('tableId');
		var selected = oTable.getSelectedIndex();
		
		var oID = oTable.getContextByIndex(selected);
		
		var path = oID.sPath;
		var path2 = "";
		var a=0;
		for(var i=0; i<path.length; i++ ){
			
			//console.log(path[i]);
			a++;
			if(a<path.length){
				path2 +=path[a];
			}
			
			
		}
	
		//console.log(path2);
	
		//alert(selected);

		
		if(selected == -1){
			alert("select a row");
		} else {
			$("#formId").slideDown(300, function() {
				
				var data = oTable.getModel('products').oData[path2];
				
				console.log("tek elsi i edit");
				 console.log(data);
				var id = data.ID;
		        var name = data.NAME;
		        id_studentit = id;
		        console.log("id: ");
		        console.log(id_studentit);
		        
		        $("#id").val(id);
		        $("#name").val(name);
				//console.log(data);
			})
		}
		
	},
	
	remove: function(){
		
		this.mode ='remove';
		var oTable = sap.ui.getCore().byId('tableId');
		var selected = oTable.getSelectedIndex();
		
		
		var oID = oTable.getContextByIndex(selected);
		console.log(oID);
		
		path = oID.sPath;
		var path2 = "";
		var a=0;
		for(var i=0; i<path.length; i++ ){
			a++;
			if(a<path.length){
				path2 +=path[a];
			}
			
			
		}
		console.log(this.mode);  
	
		//alert(selected);
		if(selected == -1){
			alert("select a row");
		} else {
			
				
				var data = oTable.getModel('products').oData[path2];
				
				console.log("tek elsi i remove");
				 console.log(data);
				var id = data.ID;
		  
		        
		        var jurl="/demo/services/delete.xsjs";
				jQuery.ajax({

		        url: jurl,
		        async :false,
		        TYPE: 'POST' ,
		        data:{
		            "ID":id
		            },
		        method: 'GET',
		        dataType: 'text',
		        success: function(data) {
//		        alert(data);
//		        console.log(data);
		  
		        }
		 
		          
		 
		    });
				
			sap.ui.getCore().getModel('products').refresh();
		}
	}, 
	save: function() {
	
     
     if(this.mode == 'create'){
    	 
    		var id_ = sap.ui.getCore().byId("id").getValue();
    		var name_ = sap.ui.getCore().byId("name").getValue();
    		 var data1=
             {
             ID:id_ ,
             NAME:name_
              };
    		 
    	 var datavalue=JSON.stringify(data1);
         //alert(datavalue);
    	 
         var jurl="/demo/services/insert.xsjs";

         jQuery.ajax({
             
        	    url: jurl,
        	              async :false,
        	              TYPE: 'POST' ,
        	              data:{dataobject:datavalue},
        	              method: 'GET',
        	              dataType: 'text',
        	              success: function(data) {
//        	              alert(data);
//        	              console.log(data);
        	              }
        	              });
         console.log(this.mode);
    	 
     }
     else if(this.mode == 'edit'){
    	 
    		var id_ = sap.ui.getCore().byId("id").getValue();
    		var name_ = sap.ui.getCore().byId("name").getValue();
    		 var data1=
             {
             ID:id_ ,
             NAME:name_,
             ID_OLD:id_studentit
              };
    		 
    	 var datavalue=JSON.stringify(data1);
       alert(datavalue);
    	 
  
    	 var jurl="/demo/services/update.xsjs";
         
         jQuery.ajax({
    
    url: jurl,
            async :false,
            TYPE: 'POST' ,
            data:{dataobject:datavalue},
            method: 'GET',
            dataType: 'text',
            success: function(data) {
//            alert(data);
//            console.log(data);
      
            }
     
     
        });
      
     } 

     
     sap.ui.getCore().getModel('products').refresh();
		$("#formId").slideUp();
		   
	
	}
	
});
