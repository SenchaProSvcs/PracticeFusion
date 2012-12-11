/**
 *
 */
Ext.define('MyApp.model.Employee', {
	extend: 'Ext.data.Model',

	config: {

		fields: [
			'id',
			'first',	
			'last',
			//the name field doesn't exist on the data retrieved. It is a dynamic field created for each 
			//record returning a string with the form {last}, {first}
			{
				name: 'name',
				convert: function(value, record){
					return record.get('last') + ', ' + record.get('first');
				}
			}
		],

		associations: [
			{
				type: 'belongsTo',
				model: 'MyApp.model.Company',
				foreignKey: 'company_id',
				name : 'company',
				store: 'Companies'
			}
		],

		//this store will load employees from a fake endpoint, in this case a json file under data
		proxy: {
	        type: "ajax",
	        url : "data/employees.json",
	        reader: {
	            type: "json",
	            rootProperty: "employees"
	        }
	    }


	}



});