Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',
	

	
	config : {

	    stores: ['Employees', 'Companies'],

	    refs: {
	    	searchOption: 'main titlebar selectfield[name=where]'
	    },

		control: {
			'main': {
				'activate': 'loadEmployees'
			},

			'main button[action=foo]': {
				tap: 'doSomething'
			},

			'main mylistitem button[action=bar]': {
				'tap': 'doSomethingOnButtonItem'
			},

			'main titlebar textfield[name=filter]': {
				'keyup': 'filterEmployeeList'
			}


		}

	},

	filterEmployeeList: function(textfield, event, eOpts){
		var me = this,
			what = textfield.getValue(),
			where = me.getSearchOption().getValue(),
			store = Ext.getStore('Employees');

		if(what){
			if('company' === where){
				store.filterBy(function(employee, id){
					var whatExp = new RegExp('^'+what+'+','i'),
						company = employee.getCompany().get('name');
					return company.match(whatExp);
				});
			}else{
				store.filter(where, what, true, false);
			}
		}else{
			store.clearFilter();
		}

	},

	loadEmployees: function(){
		Ext.getStore('Employees').load();
	},

	doSomething: function(){
		var employees = Ext.getStore('Employees'),
			employee = employees.getAt(0),
			company = employee.getCompany();

		console.log('First employee record', employee);
		console.log('Employee first name', employee.get('first'));
		console.log('Employee last name', employee.get('last'));

		console.log('Employee company record', company);
		console.log('Employee company name', company.get('name'));

	},

	doSomethingOnButtonItem: function(btn, event, eOpts){
		//getting the record of a given list item
		var employee = btn.up('mylistitem').getRecord();
		console.log('button tap for record', employee);
		console.log('name for employee', employee.get('first'));

	}

});