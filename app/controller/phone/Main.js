/**
 * This Controller will execute actions based on events over the Main view
 * but it is specific for the Phone profile.
 */
Ext.define('MyApp.controller.phone.Main', {
    extend: 'Ext.app.Controller',

    config: {

        stores: ['Employees', 'Companies'],

        control: {
            'mainphone' : {
                'activate': 'loadEmployees'
            }

        }
    },


    /**
     * Load te employees store using the store proxy configuration
     */
    loadEmployees: function(){
        Ext.getStore('Employees').load();
    }
});