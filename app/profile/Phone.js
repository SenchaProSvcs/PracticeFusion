/**
 * Phone profile definition. This profile will became active if the application
 * is executed on a Phone. We can declare here the views and controllers specific
 * for this profile.
 * The views and controller will be located under the name of the profile as a namespace
 * for instance, all views referenced here into the _views_ configuration will be loaded
 * automatically from **app/view/phone** folder.
 */
Ext.define('MyApp.profile.Phone', {
    extend: 'Ext.app.Profile',

    config: {
        controllers: ['Main'],  //located at controller/phone/
        views: ['Main']         //located at view/phone
    },

    isActive: function(){
        return false;// Ext.os.is.Phone;
    },

    launch: function(){
        Ext.Viewport.add(Ext.create('MyApp.view.phone.Main'));
        //load history if History Controller is present
        this.getApplication().fireEvent('loadhistory');
    }
});