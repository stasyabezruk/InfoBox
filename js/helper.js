'use strict'
var helper = {
    getEl: function (query, parent) {
        var context = document.querySelector(parent) || document;
        return context.querySelector(query);
    },
    create: function (name, attributes) {
        var el = document.createElement(name),
            val,
            i;

        if (typeof attributes == 'object') {
            for (i in attributes) {
                el.setAttribute(i, attributes[i]);

                if ( i.toLowerCase() == 'class' ) {
                    el.className = attributes[i]; // for IE compatibility

                } else if ( i.toLowerCase() == 'style' ) {
                    el.style.cssText = attributes[i]; // for IE compatibility
                }
            }
        }        
        
        for (i = 2; i < arguments.length; i++) {
            val = arguments[i];
            if ( typeof val == 'string' ) {
                val = document.createTextNode(val)
            };
            el.appendChild(val);
        }
        
        return el;
    } 
}