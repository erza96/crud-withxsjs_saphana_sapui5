sap.ui.jsview("products.students", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf products.students
	*/ 
	getControllerName : function() {
		return "products.students";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf products.students
	*/ 
	 createContent : function(oController) {
		 
		 var oMatrix = sap.ui.commons.layout.MatrixLayout({
				
				latoutFixed:true,
				width: '300px',
				columns: 3
		});

		oMatrix.createRow(
				
		new sap.ui.commons.Button({
		
			text: "Create",
			press: function() {
				oController.create();
				
			}
		}),
		new sap.ui.commons.Button({
			
			text: "Edit",
			press: function() {
				oController.edit();
				
			}
		}),
		new sap.ui.commons.Button({
			
			text: "Delete",
			press: function() {
				oController.remove();
				
			}
		})
		);
		
		var oLayout = new sap.ui.layout.form.SimpleForm("formId",{
			
			title: "Students",
			content: [
					//forma posht 
			new sap.ui.commons.Label({text:"ID"}),	
			new sap.ui.commons.TextField("id",{width:'200px'} ),
			
			new sap.ui.commons.Label({text:"Name"}),	
			new sap.ui.commons.TextField("name",{width:'200px'} ),
			
			
			new sap.ui.commons.Label({text:""}),
			new sap.ui.commons.Button({
				text:"Save",
				press:function(){
					oController.save()
				}
			})
			
				]
		});
		
		
//		
//	var oLayout = new sap.ui.layout.form.SimpleForm("formId_edit",{
//			
//			title: "Students",
//			content: [
//					//forma posht 
//			new sap.ui.commons.Label({text:"ID"}),	
//			new sap.ui.commons.TextField("id_ed",{width:'200px', editable: false} ),
//			
//			new sap.ui.commons.Label({text:"Name"}),	
//			new sap.ui.commons.TextField("name_ed",{width:'200px'} ),
//			
//			
//			new sap.ui.commons.Label({text:""}),
//			new sap.ui.commons.Button({
//				text:"Save",
//				press:function(){
//					oController.save()
//				}
//			})
//			
//				]
//		});
		//tabela e pare me te dhena
		var oTable = new sap.ui.table.Table("tableId",{
			visibleRowCount: 5,
			editable: false
			
		});
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text: "ID"}),
			visible:true,
			template: new sap.ui.commons.TextView({text: "{products>ID}"})
		}));
		
		oTable.addColumn(new sap.ui.table.Column({
			
			label: new sap.ui.commons.Label({text: "Name"}),
			visible:true,
			template: new sap.ui.commons.TextView({text: "{products>NAME}"})		
		}))
		
		
		oTable.bindRows("products>/students");
		
		var ele = [oMatrix,oTable, oLayout];
		
		return ele;
	}
		 
//		 var oModel = new sap.ui.model.odata.ODataModel("test.xsodata/",false);
//		 oTable = new sap.ui.table.Table("Test",{visibleRowCount:5});
//		 oTable.setTitle("Test Details");
//		 var testID = new sap.ui.table.Column({label: new sap.ui.commons.Label({text: "ID"}),               
//		                     template: new sap.ui.commons.TextView().bindProperty("text", "ID")  ,
//		                      width: "100%"});
//		 oTable.addColumn(testID);
//		 var testName = new sap.ui.table.Column({label: new sap.ui.commons.Label({text: "NAME"}),               
//		                         template: new sap.ui.commons.TextView().bindProperty("text", "NAME")  ,
//		                          width: "100%"});
//		 oTable.addColumn(testName);
//		 oTable.setModel(oModel);
//		 oTable.bindRows("/students");
//		
//		 return oTable;
		//}

});
