/**
 *
 */
Ext.define('MyApp.view.employee.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'employeeform',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Select',
        'Ext.Toolbar',
        'Ext.TitleBar',
        'Ext.Button'
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
                xtype: 'fieldset',
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
                    },
                    {
                        xtype : 'selectfield',
                        label : 'Company',
                        store : 'Companies',
                        name  : 'company_id',
                        valueField: 'id',
                        displayField: 'name'

                    }
                ]
            }
        ]
    },

    /**
     *  This will remove the error messages
     */
    cleanErrors: function(){
        var me = this,
            fieldset = me.down('fieldset');

         fieldset.setInstructions('');   
    },

    /**
     * A method to show the errors on the form. We add'em to the instructions field in the fieldset.
     * You can show a message, or target the fields to change the class, etc.
     */
    showErrors: function(errors){
        var me = this,
            fieldset = me.down('fieldset'),
            message = '<ul>';

        errors.each(function(error){
            var field = error.getField(),
                msg = error.getMessage();

             message += '<li>' + field + ' ' + msg + '. </li>';  

        }, me);

        message += '</ul>';

        fieldset.setInstructions(message);
    }
});