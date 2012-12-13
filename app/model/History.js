Ext.define('MyApp.model.History', {
    extend: 'Ext.data.Model',

    config: {
        fields: ['id', 'route'],

        proxy: {
            type: 'localstorage',
            id: 'history-local'
        }
    }
});