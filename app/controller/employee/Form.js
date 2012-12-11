Ext.define('MyApp.controller.employee.Form', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            form: 'employeeform'
        },

        control: {
            'employeeform button[action=showprevious]': {
                'tap': 'showPreviousEmployee'
            },
            'employeeform button[action=shownext]': {
                'tap': 'showNextEmployee'
            },
            'employeeform button[action=save]': {
                'tap': 'saveEmployee'
            },
            'employeeform button[action=cancel]': {
                'tap': 'discardChanges'
            },
            'employeeform button[action=back]': {
                'tap': 'goBackFromEmployeeForm'
            }

        }

    },

    init: function(){

        this.getApplication().on({
            'showemployeeform': this.showEmployee,
            scope: this
        });

    },

    saveEmployee: function(){
        var me = this,
            form = me.getForm(),
            record = form.getRecord(),
            values = form.getValues();
        
        record.set(values);
    },

    discardChanges: function(){
        var me = this,
            form = me.getForm();

        form.reset();        
    },


    showEmployee: function(record){
        var me = this,
            form = me.getForm(),
            container = form.up('container');

        form.setRecord(record);
        container.setActiveItem(form);
    },


    showPreviousEmployee: function(){
        var me = this,
            form = me.getForm(),
            store = Ext.getStore('Employees'),
            currentRecord = form.getRecord(),
            idx = store.indexOf(currentRecord),
            limit = 0,
            record;

        if(idx > limit){
            record = store.getAt(idx - 1);
            form.setRecord(record);    
        }    

    },

    showNextEmployee: function(){
        var me = this,
            form = me.getForm(),
            store = Ext.getStore('Employees'),
            currentRecord = form.getRecord(),
            idx = store.indexOf(currentRecord),
            limit = store.getCount() - 1,
            record;

        if(idx < limit){
            record = store.getAt(idx + 1);
            form.setRecord(record);    
        }    

    },

    goBackFromEmployeeForm: function(){
        this.getApplication().fireEvent('showemployeelist');
    }

});