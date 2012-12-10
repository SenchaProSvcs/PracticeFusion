Ext.define('MyApp.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.DataView',
        'Ext.field.Select',
        'MyApp.view.ListItem'
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
                        xtype: 'dataview',
                        useComponents: true,
                        defaultType: 'mylistitem',
                        store: 'Employees',
                        flex: 2
                    },{
                        xtype: 'list',
                        store: 'Employees',
                        itemTpl: '{name}',
                        flex: 1
                    }
                ]
                
            }
        ]
    }
});
