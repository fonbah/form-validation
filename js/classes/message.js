"use strict";

var Message = new function(){

	var container;;

	document.addEventListener('DOMContentLoaded', function(){
		container = document.getElementById('content') || document.body;
	});

	this.show = function(msg){
		var msgElem = row();
		msgElem.dataset.msg = msg;
		container.insertBefore(msgElem, container.firstElementChild);
	};

	var row = function(){
		var elem = document.createElement('div');
		elem.dataset.role = 'alert';

		var close = function(e){
			if(!e.target) return true;
			e.target.parentNode.removeChild(e.target);
		};

		elem.addEventListener('click', close);

		setTimeout(function(){elem.click()}.bind(elem), 10000);

		return elem;
	};
};
