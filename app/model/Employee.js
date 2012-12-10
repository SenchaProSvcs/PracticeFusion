Ext.define('MyApp.model.Employee', {
	extend: 'Ext.data.Model',

	config: {

		fields: [
			'id',
			'first',	
			'last',
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