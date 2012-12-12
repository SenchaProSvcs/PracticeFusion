Ext.define('MyApp.view.phone.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'mainphone',

    requires: [
        'MyApp.view.employee.List',
        'MyApp.view.employee.Form'
    ],

    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Welcome',
                iconCls: 'home',
                layout: 'card',
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

});