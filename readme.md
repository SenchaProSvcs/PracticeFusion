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
- Associations (belongsTo, hasMany, hasOne)
- Stores and Proxies
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

"Ext.Viewport is a instance created when you use Ext.setup. Because Ext.Viewport extends from Ext.Container, it has as layout (which defaults to Ext.layout.Card). This means you can add items to it at any time, from anywhere in your code. The Ext.Viewport fullscreen configuration is true by default, so it will take up your whole screen."

Ext.application in this case calls Ext.setup behind the scenes. So you have the viewport created when launch method is executed.

### Complex Layouts (hbox, vbox, fit, card)




