/**
 * This is an custom implementation of Ext.dataview.component.DataItem to display
 * a component into a row. In this case we have a row that is compossed of 2 buttons.
 * Each button displays the first and last name of the employee record aligned into a 
 * 'hbox' layout.
 */
Ext.define('MyApp.view.employee.ListItem', {
	extend: 'Ext.dataview.component.DataItem',
	xtype: 'mylistitem',

	requires: [
		'Ext.Button'
	],

	config: {
		/**
		 * @cfg layout
		 * Set the layout to hbox
		 */
		layout: 'hbox',

		/**
		 * @cfg
		 * helper to create the button for the first name.
		 * @private
		 */
		firstNameButton: {
			action: 'bar',
			flex: 1
		},

		/**
		 * @cfg
		 * helper to create the button for the last name
		 */
		lastNameButton: {
			flex: 3
		},

		/**
		 * @cfg
		 * use the record fields to set data on each component
		 */
		dataMap: {
			/*
			 * this will call setText method on the firstNameButton and pass record.get('first') as parameter
			 */
			getFirstNameButton: {
                setText: 'first'
            },
			/*
			 * this will call setText method on the lastNameButton and pass record.get('last') as parameter
			 */
            getLastNameButton: {
            	setText: 'last'
            }
		}
	},

	/**
	 * the apply method is responsible here to create the component and return it. It is also asigned to the value 
	 * returned by this.getFirstNameButton()
	 * @private
	 */
	applyFirstNameButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getFirstNameButton());
    },


    /**
     * the updater method is responsible to remove the old component if it exists, and add the new one
     * to the current row.
     * @private
     */
    updateFirstNameButton: function(newNameButton, oldNameButton) {
        if (oldNameButton) {
            this.remove(oldNameButton);
        }

        if (newNameButton) {
            this.add(newNameButton);
        }
    },

	/**
	 * the apply method is responsible here to create the component and return it. It is also asigned to the value 
	 * returned by this.getLastNameButton()
	 * @private
	 */
	applyLastNameButton: function(config) {
        return Ext.factory(config, Ext.Button, this.getLastNameButton());
    },

    /**
     * the updater method is responsible to remove the old component if it exists, and add the new one
     * to the current row.
     * @private
     */
    updateLastNameButton: function(newNameButton, oldNameButton) {
        if (oldNameButton) {
            this.remove(oldNameButton);
        }

        if (newNameButton) {
            this.add(newNameButton);
        }
    }


});