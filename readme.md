# Practice Fusion Sample Application

## Introduction
This sample application aims to showcase some particular features from Sencha Touch 2.1 as described in the features list below. Each item is covered with some part of the code in this application. We provide as well a few code samples in this document to ilustrate the feature functionality when needed.

## App Structure
This sample application has been created using Sencha Cmd v3. The files and folders distribution follows the main skeleton defined by the Cmd tool. We have for instance, **view**, **controller**, **model** and **store** folders inside the **app** folder. We have added a **data** folder, outside the **app** just to keep some _.json_ files as fake data we use to populate stores/models.

## Pre-Requisites
In order to be able to compile/build the application you must download and install the latest version of Sencha Cmd [from here](http://www.sencha.com/products/sencha-cmd/download).
In development mode you can just publish the project in any webserver (Apache, Tomcat, IIS, etc.)

To learn more about Sencha Cmd, visit the [Sencha Cmd Guide for Sencha Touch](http://docs.sencha.com/touch/2-1/#!/guide/command)

## Features
This sample application covers, but it is not limited to, the following set of features:

- The app.js file and Viewport
- Use of complex layouts (hbox, vbox, fit, card, etc.)
- Models definitions
- Stores and Proxies
- Associations (belongsTo, hasMany, hasOne)
- Form panels, Models and Controllers.
- Using the Application as event bus.
- Proxies to read from files (.json) to emulate fake REST endpoints
- Locales/i18n
- Best Practices for Controllers/Views
- Using refs
- Using ComponentQueries with types, down/up methods
- Integrating ant tasks with the new Sencha Cmd - such as generating documentation with JSDuck - (For Touch 2.1 you have to migrate from SDK Tools to Sencha Cmd)
- Complex targets in Grids: Adding an input tag into an itemTpl and how to target it from a controller method.

## Features drill-down

### The app.js file and Viewport
The _app.js_ file is the entry point of any Sencha Touch Application. Here we basically define the Ext.application instance. We have several configuration properties we can specify when creating the application.
The **launch** method acts as the main method of the entry point application and it will be called after the document's onready event is fired.

In the sample code, we have defined a view called 'Main' which we use in the **launch** method to add a new instance to the Ext.Viewport. See [app.js](https://github.com/SenchaProSvcs/PracticeFusion/blob/master/app.js)

	Ext.application({
		name: 'MyApp',
		//...
		views: ['Main'],
		//...
		launch: function(){
			//...
			Ext.Viewport.add(Ext.create('MyApp.view.Main'));
		}
		//...
	});

from the documentation [Ext.Viewport](http://docs.sencha.com/touch/2-1/#!/api/Ext.Viewport):

>"Ext.Viewport is a instance created when you use Ext.setup. Because Ext.Viewport extends from Ext.Container, it has as layout (which defaults to Ext.layout.Card). This means you can add items to it at any time, from anywhere in your code. The Ext.Viewport fullscreen configuration is true by default, so it will take up your whole screen."

Ext.application in this case calls Ext.setup behind the scenes. So you have the viewport created when launch method is executed.

### Complex Layouts (hbox, vbox, fit, card)
Layouts are a very powerful feature in Sencha Touch. You can arrange your components in many different ways without specifying any pixel dimension.
This is important since you may want your application to run over different devices with different screen sizes. 
The Main view makes use of a layout **hbox** and **flex** properties on its childs to determine how they are positioned into the screen.

>#### A few words regarding layouts and items 
			
>We have to make a separation between items that will be part of the layout and the ones that are _'docked'_. A _docked_ item is usually **not part** of the layout process .Those are special items that will be positioned into the component to act as, for instance, toolbars.

The MyApp.view.Main class is a TabPanel, which has a Card Layout. This means that only one item will be displayed at a time.

In our sample, we have only one item for out TabPanel - the one with title **"Welcome"**
This item has an **hbox** layout, so the components defined inside it can be arranged as horizontal boxes. Remember, only those items that has no _docked_ definition will be part of the layout.

In this case we have only 2 items: a dataview and a list. The dataview has a _flex_ property of 2 and the list has a _flex_ property of 1. This means that the layout will count the remaining space as 3 (2+1) and each component will have a size of 2/3 in the first case, and 1/3 on the second one. This size is relative to the container of the panel, in this case the Main view, which has been added to the viewport instance. So, for this particular scenario, we have a container that takes fullscreen, added a docked toolbar - the tabBar which is positioned bottom - then added a component which has another toolbar docked on top and finally, the remaining space for width - because we are using an hbox layout - will be divided using the flex strategy. No matter where you display this component, you always will have a 2/3 + 1/3 of the screen size.


	Ext.define('MyApp.view.Main', {
		extend: 'Ext.tab.Panel',
		
		//...
		
		config: {
			//...
			
			//the items for the tabPanel
			items:[
				{
					title: 'Welcome',
					iconCls: 'home',
					layout: 'hbox', //layout for the first item 
					items: [
						//this component is docked so it is not part of the hbox layout.
						{
							docked: 'top',
							xtype: 'titlebar',
							title: 'Sample App',
							//...
						},
						//the first item on the hbox layout
						{
							xtype: 'dataview',
							//...
							flex: 2
						},
						{
							xtype: 'list',
							//...
							flex: 1
						}
					]				
				}
			]
		
		}
	
	});


### Models definitions
For the sample application we have defined a simple model to represent an Employee. This Employee has a few fields such _last_ and _first_ name and an _id_. The Model definition looks like this:

	Ext.define('MyApp.model.Employee', {
		extend: 'Ext.data.Model',
		
		config: {
			fields: ['id', 'first', 'last']
		}
	});
	

>#### Model Name Convention
> It is common to name the model as in a singular manner, leaving the plural for Stores (being a collection of X Model) 

That's the only thing we need to declare a Model. We can be more specific when declaring the fields:

	Ext.define('MyApp.model.Employee', {
		extend: 'Ext.data.Model',
		
		config: {
			fields: [
			
				//we can declare the type of the field
				{name: 'id', type: 'int'},
				
				//we can assing a different name, in this case the data will retrieve a 
				//'first' property which we will map to be 'firstName' on our Model.
			 	{name: 'firstName', mapping: 'first'}, 
			 	
			 	//Or we can just put the name of the property
			 	'last',
			 	
			 	//We can add a dynamic field too
			 	{
			 		name: 'name',
			 		convert: function(value, record){
			 			return record.get('last') + ', ' + record.get('firstName');
			 		}
			 	}
			 ]
		}
	});
	
### Stores and Proxies
As we have seen a Model represents a particular instance. For a collection of those instances we have Stores. 

Defining a Store is very simple: Let's assume we have an Employee model and we need a collection of them, so we define an Employees Store:

	Ext.define('MyApp.store.Employees', {
		extend: 'Ext.data.Store',
		
		config: {
			model: 'MyApp.model.Employee',
			
			data: [
				{"id": 1, "first": "Peter", "last": "Doe"}
				/*more inline data*/
			]
		}
		
	});
	
In the example above we have defined a simple Store named 'Employees' - remember that we use the plural of the model the Stores has defined - and we _"loaded"_ inline data.

In case we want to read from a datasource - which is not memory - we have to specify a **proxy** who will be responsible to fetch the data. 

Proxies can be specified in the Model (more recommended) or in the Store in itself. The rule is simple, the Store will use the proxy defined inside the Model at least it has its own proxy defined.

So in this case we want to load data from a _.json_ file we keep into _data_ folder. We just need to declare the proxy. So the Employee definition will look like this:

	Ext.define('MyApp.model.Employee', {
		extend: 'Ext.data.Model',
		
		config: {
			fields: [
				'id',
			 	{name: 'firstName', mapping: 'first'}, 
			 	'last',
			 	{
			 		name: 'name',
			 		convert: function(value, record){
			 			return record.get('last') + ', ' + record.get('firstName');
			 		}
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

So now we have an Store that will load data from a json file as a datasource.

### Associations (belongsTo, hasMany, hasOne)
We can declare associations between two models. You can use _hasMany_, _belongsTo_ and _hasOne_ associations. 
Here it is an example where an Employee _belongs to_ a Company and a Company _has many_ Employees.

	Ext.define('MyApp.model.Company', {
		extend: 'Ext.data.Model',
		
		config: {
			fields: ['id', 'name', 'address'],

			associations: [
				{
					type: 'hasMany',
					model : 'MyApp.model.Employee',
					name : 'employees',
					foreingKey: 'company_id',
					autoLoad: true
				}
			]
		}
	});


We have specified _autoLoad:**true**_ that means that every time I instantiate a Company model, the association will try to get the data related to that particular Company instance. Where does the association read that data from? Well, if you remember we specified a _proxy_ into the Employee model. That proxy will be used to query the datasource to retrieve Employees for that particular Company instance. Since we are using _fake_ data we would ending up with inconsistent data because we read a json file and retrieve the same data set no matter which parameter or filter we applied.

### Form panels, Models and Controllers
Let's assume that we want to edit/show a particular employee information in a form panel. So when a user tap on the Employees list the application will show a panel with the selected employee info.

To do so we have to perform some changes into our app. We will need a new Form - it might be called EmployeeForm -, an action on some Controller to perform a task when an Employee is selected, load the employee and finaly display the Form.

Remember that by now we have everything defined into our Main view. We have a dataview and a list for the employee. Now we are adding a new Form. 

#### Refactoring
Since we have a few components that would represent a particular entity, we can group them into a package, in this case we can have an **employee** package in our views.
So we can refactor the Main view to promote the dataview and employee list into classes and group them into the employee package.

Let's start with the List. We have this definition on the Main view:

		{
			xtype: 'list',
			store: 'Employees',
			itemTpl: '{name}',
			flex: 1
		} 	
		
We can define the EmployeesList as a class, but since we are going to create a new package named employee it is not so helpful to have a class name like:

	MyApp.view.employee.EmployeesList
	
What about this?

	MyApp.view.employee.List

We know we have a List - which indirectly means many - defined into an employee package, so we can easily guess that it is a List of Employees. This is just a naming convention, you can do whatever you want. This is just an example to repeat names in classes and packages.

Let's create the class and move some properties into it.

	Ext.define('MyApp.view.employee.List', {
    	extend : 'Ext.dataview.List',
		xtype  :  'employeelist'
				
    	config : {
        	store   : 'Employees',
        	itemTpl : '{name}'
    	}
	});

Now we have to do some changes to Main view. We have to add the new class into the requires array, and remove the reference to Ext.dataview.List. Then, we can just modify the list definition in the config as follows:

	Ext.define('MyApp.view.Main', {
		extend: 'Ext.tab.Panel',
		requires: [
			//...
			'MyApp.view.employee.List'
			//...
		]
		//...
		config: {
			items: [
				{
					title: 'Welcome',
					layout: 'hbox',
					//...
					items:[
						//...
						{
							xtype: 'employeelist',
							flex: 1
						}
					]
				}
			]
		}

	});
	
As you can see we just added a new require to specify the dependency with the new List class and changed the definition of the list instance. Please note that we have not moved the flex property into the class definition. We keep it in the instantiation since it depends on the container layout. This makes clear how the component is arranged in the screen just by reading the container definition.

We can do the same excercise with the dataview as well. So we will get a new class _MyApp.view.employee.DataView_. 


####Creating the Form
So now let's move on into the Form to edit an Employee. We can create a new class into the employee package called _Form_:

	Ext.define('MyApp.view.employee.Form', {
    	extend: 'Ext.form.Panel',
		xtype: 'employeeform',
		
    	requires: [
       		'Ext.field.Text'
    	],

    	config: {

        	items: [
            	{
                	xtype : 'textfield',
                	name  :  'first',
                	label : 'First Name'
            	},
            	{
               	 	xtype : 'textfield',
                	name  : 'last',
                	label : 'Last Name'
            	}
        	]
    	}
	});

#### Display the Employee Form
Now we have the form created we need to find out where and when the form will be displayed. In this case I decided to show the form in the same space where the list is shown. When an employee is selected from the list we will show the employee information in the same place.

To do that we have to refactor again the Main view a little bit. The idea is to have a component that can show one item at a time but it can keep more than one. That's doable by using a card layout. In this case we would need just a wrapper component to keep the list and the form. So the Main view will look like this:

	Ext.define('MyApp.view.Main', {
		extend: 'Ext.tab.Panel',
		requires: [
			//...
			'MyApp.view.employee.List',
			'MyApp.view.employee.Form'
			//...
		]
		//...
		config: {
			items: [
				{
					title: 'Welcome',
					layout: 'hbox',
					//...
					items:[
						//...
						{
							layout: 'card'
							flex: 1,
							items: [
								{
									xtype: 'employeelist'
								},
								{
									xtype: 'employeeform'
								}
							]
						}
					]
				}
			]
		}

	});		

Keep into account we have declared 'MyApp.view.employee.Form' as a dependency so we can use its xtype ('employeeform').

Now we have the form and the list we need to wire the events to display the form when the user taps on the list item. 
We will need a new Controller, just to avoid keeping all inside the Main one, so we can define a new Controller to respond to events in the employee list. Same as with views, we can create a package for employees controllers and define all of them inside that package.

	Ext.define('MyApp.controller.employee.List', {
    	extend: 'Ext.app.Controller',

    	config: {

        	control: {

            	'employeelist': {
                	'itemtap': 'showEmployeeForm'
            	}

        	}
    	},	

	
    	showEmployeeForm: function(){

    	}
	});	

This controller named List, will be responsible for the employee list view events. In this way we can keep responsibilites separated. Remember you need to add it to the app.js controllers definitions.
We can do this to show the form:

	showEmployeeForm: function(list, index, target, record, e, eOpts){
        var container = list.up('container'),
            form = container.down('formpanel');

        form.setRecord(record);
        container.setActiveItem(form);           
	}


If you take a look on the Form definition and the Model you will notice that the fields have the same name in both definitons. So in this case we can use a setRecord in the form to pass the model instance (record) and the form will show up populated with the fields values in the current record.

But here we are calling or modifying state into a view (the form) that is not responsibility of this particular controller. We may want to have the code to set the record into the form into a Form controller. 
There is a technique to separate this and to have two controller communicated between each other without having references between them. This technique involves using the application as an Event Bus.

### Using the application as an Event Bus
In the last example we saw a Controller modifying a view state that is not part of its boundaries. Let's refactor it a bit to do something better. First, let's create a new controller for the employee form and add it to the app.js

	Ext.define('MyApp.controller.employee.Form', {
    	extend: 'Ext.app.Controller',

	    config: {

    	    refs: {
        	    form: 'employeeform'
        	}

    	},

    	init: function(){

        	this.getApplication().on({
            	'showemployeeform': this.showEmployee,
            	scope: this
        	});

    	},

    	showEmployee: function(record){
        	var me = this,
            	form = me.getForm(),
            	container = form.up('container');

        	form.setRecord(record);
        	container.setActiveItem(form);
    	}

	});

And the new version of the List controller will look like this:

	Ext.define('MyApp.controller.employee.List', {
    	extend: 'Ext.app.Controller',

	    config: {

    	    control: {

	            'employeelist': {
    	            'itemtap': 'showEmployeeForm'
       		     }

        	}
    	},


	    showEmployeeForm: function(list, index, target, record, e, eOpts){
    	    this.getApplication().fireEvent('showemployeeform', record);
    	}
	});

Ok, that's better. You may no notice such a great difference between having 2 different controllers now, but in a few we are going to add more functionality to the Form that will be handled by its controller.

Up to here we have a list and we can select one item and display a form to edit it. So let's add more functionality to that form such as Save, Cancel, Back, etc..

I have added a few items inside the form.

	Ext.define('MyApp.view.employee.Form', {
	    extend: 'Ext.form.Panel',
	    xtype: 'employeeform',

	    requires: [
       		 'Ext.field.Text'
    	],

	    config: {

        	items: [
            	{
                	xtype: 'titlebar',
                	docked: 'top',
                	items: [
                    	{
                        	xtype: 'button',
                        	text: 'Prev',
                        	action: 'showprevious',
                        	ui: 'back',
                       		align: 'left'
                    	},
                    	{
                        	xtype: 'button',
                        	text: 'Next',
                        	action: 'shownext',
                        	ui: 'forward',
                       		align: 'right'
                   		}
                	]
            	},
            	{
                	xtype: 'toolbar',
                	docked: 'bottom',
                	items: [
                    	{
                        	xtype: 'button',
                        	text: 'Back',
                        	action: 'back',
                        	ui: 'back'
                    	},
                    	{
                       		xtype: 'spacer'
                    	},
                    	{
                        	xtype: 'button',
                        	text: 'Save',
                        	action: 'save',
                       	 	ui: 'confirm'
                    	},
                    	{
                        	xtype: 'button',
                        	text: 'Cancel',
                        	action: 'cancel',
                       		ui: 'decline'
                   	 	}
                	]
            	},
            	{
                	xtype : 'textfield',
                	name  :  'first',
                	label : 'First Name'
            	},
            	{
                	xtype : 'textfield',
                	name  : 'last',
                	label : 'Last Name'
            	}
        	]
    	}
	});

Basically we now have 2 toolbars on the Form. The top one allows the user to navigate between the records going back and forward in the store. The second one is located at bottom and will handle all the save/cancel operations and a back button to go back to the list.

So this is just the view code, we now have to add logic inside our Controllers to do what we want in those cases. The Form controller will look like this:


	Ext.define('MyApp.controller.employee.Form', {
    	extend: 'Ext.app.Controller',

	    config: {

    	    refs: {
        	    form: 'employeeform'
        	},

	        control: {
	        	'employeeform button[action=showprevious]': {
    	            'tap': 'showPreviousEmployee'
        	    },
            	'employeeform button[action=shownext]': {
                	'tap': 'showNextEmployee'
            	},
            	'employeeform button[action=save]': {
                	'tap': 'saveEmployee'
            	},
            	'employeeform button[action=cancel]': {
                	'tap': 'discardChanges'
            	},
            	'employeeform button[action=back]': {
                	'tap': 'goBackFromEmployeeForm'
            	}
        	}

    	},


    	init: function(){
        	this.getApplication().on({
            	'showemployeeform': this.showEmployee,
            	scope: this
        	});
    	},

	    saveEmployee: function(){
    	    var me = this,
        	    form = me.getForm(),
           	 	record = form.getRecord(),
           	 	values = form.getValues();
        
	        record.set(values);
    	},

	    discardChanges: function(){
    	    var me = this,
        	    form = me.getForm();

	        form.reset();        
    	},


	    showEmployee: function(record){
    	    var me = this,
        	    form = me.getForm(),
           	 	container = form.up('container');

	        form.setRecord(record);
    	    container.setActiveItem(form);
    	},

	    showPreviousEmployee: function(){
    	    var me = this,
        	    form = me.getForm(),
            	store = Ext.getStore('Employees'),
	            currentRecord = form.getRecord(),
    	        idx = store.indexOf(currentRecord),
        	    limit = 0,
            	record;

	        if(idx > limit){
    	        record = store.getAt(idx - 1);
        	    form.setRecord(record);    
        	}    

    	},

	    showNextEmployee: function(){
    	    var me = this,
        	    form = me.getForm(),
            	store = Ext.getStore('Employees'),
	            currentRecord = form.getRecord(),
    	        idx = store.indexOf(currentRecord),
        	    limit = store.getCount() - 1,
            	record;

	        if(idx < limit){
    	        record = store.getAt(idx + 1);
        	    form.setRecord(record);    
        	}    

	    },

    	goBackFromEmployeeForm: function(){
        	this.getApplication().fireEvent('showemployeelist');
	    }

	});
	
###Sencha Cmd: Integrating ant tasks
Let's move aside code for a while. The idea of this section is to explain a little bit how to integrate Sencha Cmd with other ant tasks. As an example we are going to add a new target to create documentation based on the code comments using **JSDuck**.

When you create an Application using Sencha Cmd a few files and folders are added to the project to keep information and properties definition to perform some tasks such as compile, build, minimize and process .scss files.

One of those files is located at the root folder and it is basically a **build.xml** file that allows definitions of ant tasks. 

JSDuck can be executed from an ant target. We just need to edit the build.xml file and add the following task definition:

	    <target name="docs" depends="init">
        	<property name="doc-src" value="${basedir}/doc-src"/>
        	<exec executable="jsduck" dir="." >
            	<arg value="${basedir}/app" />    
	            <arg value="${basedir}/ux" />    
            	<arg value="--title=My App Sample Documentation" />
            	<arg value="--output=${basedir}/docs" /> 
            	<arg value="--categories=${doc-src}/class-categories.json"/>
        	</exec>
    	</target>	
    	
This is a basic definition but as you can see you can add parameters or use a config.json file for jsduck.

To execute the task you just need to run:

	$ sencha ant docs

We have a **doc-src** folder where we keep all the resources related to docs. Since **docs** folder will be generated by JSDuck we don't want to keep track of that folder in our github repo so we have added it to _.gitignore_ file

