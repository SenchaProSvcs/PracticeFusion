Ext.define('MyApp.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        controllers: ['Main'],  //located at controller/phone/
        views: ['Main']         //located at view/phone 
    },

    isActive: function(){
        return Ext.os.is.Phone;
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('MyApp.view.phone.Main'));
    }
});