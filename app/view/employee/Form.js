/**
 *
 */
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