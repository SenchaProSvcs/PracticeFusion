/**
 *
 */
Ext.define('MyApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',

    requires: [
        'Ext.TitleBar',
        'Ext.field.Select',
        'MyApp.view.employee.DataView',
        'MyApp.view.employee.List',
        'MyApp.view.employee.Form'
    ],
    
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                title: 'Welcome',
                iconCls: 'home',
                layout: 'hbox',
                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Sample App',
                        items: [
                            {
                                xtype: 'button',
                                action: 'foo',
                                text: 'Tap Me'
                            },
                            {
                                xtype: 'button',
                                action: 'focussearch',
                                text: 'Focus on Search'
                            },
                            {
                                xtype: 'selectfield',
                                name: 'where',
                                options: [
                                    {text: 'Name',  value: 'name'},
                                    {text: 'First',  value: 'first'},
                                    {text: 'Last',  value: 'last'},
                                    {text: 'Company', value: 'company'}
                                ],
                                align: 'right'
                            },
                            {
                                xtype: 'textfield',
                                name: 'filter',
                                placeHolder: 'Search ...',
                                align: 'right'
                            }
                        ]
                    },
                    {
                        xtype: 'employeedataview',
                        flex: 2
                    },
                    {
                        layout: 'card',
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
