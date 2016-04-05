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

        
        return el;
    } 
}