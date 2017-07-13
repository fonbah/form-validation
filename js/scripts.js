"use strict"


//Проверка балланса
var checkBallance = function(){
	var transport = Transport.instance();

	var params = {method: "POST", action: "check_ballance"};
	var data = new FormData();

	var result = transport(params, data);
	var uName = result.surname + ' ' + result.name + ' ' + result.middlename;

	ReactDom.update('name', uName);
	ReactDom.update('ballance', result.ballance + ' $');
};

