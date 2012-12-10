Ext.define('MyApp.store.Companies', {
	extend: 'Ext.data.Store',

	requires: [ 'MyApp.model.Company'],

	config: {
		model: 'MyApp.model.Company',

		data: [
			{id: 1, name:'Company Inc.'},
			{id: 2, name:'Other Company Inc.'}
		]
	}
});