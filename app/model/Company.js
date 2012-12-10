Ext.define('MyApp.model.Company', {
	extend: 'Ext.data.Model',

	config: {
		fields: ['id', 'name', 'address'],

		associations: [
			{
				type: 'hasMany',
				model : 'MyApp.model.Employee',
				name : 'employees',
				associationKey: 'employees'
			}
		]
	}
});