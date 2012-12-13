Ext.define('MyApp.controller.History', {
    extend: 'Ext.app.Controller',

    config: {

        stores: ['History']
        
    },

    init: function(){
        this.getApplication().on({
            'loadhistory': this.loadSaved,
            'savehistory': this.onSaveHistory,
            scope: this
        });
    },


    onSaveHistory: function(route){
        var me = this,
            store = Ext.getStore('History'),
            record = store.last();

        if(!record){
           store.add({route: route});
        }else{
            record.set('route', route);
        }

        console.log('history saved');
    },


    loadSaved: function(){
        var me = this,
            store = Ext.getStore('History'),
            history = store.last();

        if(history){
            me.redirectTo(history.get('route'));
        }

        console.log('history loaded', history);
    }


});