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
        'MyApp.view.employee.Form',
        'MyApp.view.phone.CoolTabPanel',
        'MyApp.view.Textarea'

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

                
            },
            {
                title: 'Form',
                xtype: 'formpanel',
                // scrollable: false,
                items: [
                    {
                        xtype: 'mytextarea',
                        maxRows: 4,
                        name: 'datextarea',
                        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel augue neque, sit amet tincidunt felis. Cras semper elit quis odio congue et sollicitudin massa blandit. Aliquam et lectus id libero mollis viverra at non leo. Ut urna urna, accumsan at iaculis in, mattis pharetra turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla eget lorem massa. Nunc vel nibh nec ante eleifend interdum. Cras magna turpis, sodales vel elementum a, congue et erat. Sed aliquam commodo augue nec vulputate. Pellentesque vitae iaculis augue. Etiam non ligula eu diam gravida dignissim. Sed sodales pretium mi, eu venenatis nisl aliquam et. Mauris porta egestas est id scelerisque. Integer elementum scelerisque libero, sollicitudin lacinia enim viverra non.'

                    }
                ]
            },
            {
                title: 'TabPanel',
                xtype: 'cooltabpanel',
                iconCls: 'favorites'
            }
        ]

    }
});
