/**
 * This is just a workaround intent to solve issue with textareas scroll
 * @author Maximiliano Fierro
 */
Ext.define('MyApp.view.Textarea', {
    extend: 'Ext.field.TextArea',
    alias: 'widget.mytextarea',

    initialize: function(){
        var me = this;

        me.callParent();

        me.getComponent().input.on({
            scope: this,
            'dragstart': me._onStart,
            'drag' : me._onMove,
            'dragend' : me._onEnd
        });
    },

    _onStart: function(e){
        e.stopPropagation();
        return false;
    },

    _onMove: function(e, element){
        var me = this,
            input = me.getComponent().input,
            deltaY = - e.previousDeltaY,
            deltaX = - e.previousDeltaX;

        if(element === input.dom){

            element.scrollTop = element.scrollTop + deltaY;
            element.scrollLeft = element.scrollLeft + deltaX;
        }

        e.stopPropagation();
        
        return false;
    },

    _onEnd: function(e){
        e.stopPropagation();
        return false;

    }


});