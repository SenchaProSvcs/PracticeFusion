Ext.define('MyApp.view.employee.DataView', {
    extend: 'Ext.dataview.DataView',
    xtype: 'employeedataview',

    requires: ['MyApp.view.employee.ListItem'],

    config: {
        useComponents: true,
        defaultType: 'mylistitem',
        store: 'Employees'
    }
});