/**
 *
 */
Ext.define('MyApp.store.Employees', {
	extend: 'Ext.data.Store',

	requires: [ 'MyApp.model.Employee'],


	config: {
		model: 'MyApp.model.Employee'
		
		// data: [
		// 	{id: 1, first: 'John', last: 'Doe', company_id: 1},
		// 	{id: 2, first: 'John', last: 'Smith', company_id: 1},
		// 	{id: 3, first: 'Juan', last: 'Perez', company_id: 1}
		// ]
	}

});