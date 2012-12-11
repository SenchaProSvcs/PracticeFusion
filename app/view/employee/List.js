Ext.define('MyApp.view.employee.List', {
    extend: 'Ext.dataview.List',
    xtype: 'employeelist',

    config: {
        store: 'Employees',
        itemTpl: '{last}, {first}'
    }
});