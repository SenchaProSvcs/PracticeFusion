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
- Form panels, using actions in buttons and names in fields to target controllers actions.
- Using the Application as event bus to communicate between Controllers avoiding a Controller having a reference to another one.
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

	