Ext.define('MyApp.controller.employee.List', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            list: 'employeelist'
        },

        control: {

            'employeelist': {
                'itemtap': 'showEmployeeForm'
            }

        }
    },

    init: function(){
        this.getApplication().on({
            'showemployeelist': this.showEmployeeList,
            scope: this
        });
    },


    showEmployeeList: function(){
        var me = this,
            list = me.getList(),
            container = list.up('container');

        container.setActiveItem(list);
    },

    showEmployeeForm: function(list, index, target, record, e, eOpts){
        this.getApplication().fireEvent('showemployeeform', record);
    }
});
