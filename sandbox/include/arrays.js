/**
 @author: Ruben Tytgat
*/
define(function () {
    'use strict';
    
    return {
        resize: function(arr, desiredSize, newFunc, destroyFunc) {
            while(desiredSize < arr.length) {
                destroyFunc(arr.pop());
            }
            while(arr.length < desiredSize) {
                arr.push(newFunc(arr.length));
            }
        }
    }	
});