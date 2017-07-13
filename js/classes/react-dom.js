"use strict";

/*
* React elems update
* 
*/

var ReactDom = new function(){
	var domElems = {};

	//Build reactive elements list
	document.addEventListener('DOMContentLoaded', function(){

		var reactive = document.querySelectorAll('.reactive');

		[].forEach.call(reactive, function(elem){
			var n = elem.dataset.source;
			if(n){
				if(!domElems.hasOwnProperty(n)) domElems[n] = [];
				domElems[n].push(elem);
			} 
		});

	});

	/*
	* Update element content
	* @param n elements name in dom list
	* @param val new value
	*/
	this.update = function(n, val){

		if(!n || !domElems.hasOwnProperty(n)) return true;

		domElems[n].forEach(function(elem){
			elem.dataset.content = val;
		});

	};
};
