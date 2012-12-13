Ext.define('MyApp.store.History', {
    extend: 'Ext.data.Store',

    requires: ['MyApp.model.History'],

    config: {
        autoLoad: true,
        autoSync: true,
        model: 'MyApp.model.History'
    }
});