"use strict"

/*
* Обработчик форм
* 
*/

var Form = function(){

	var form = this;
	var inps = form.getElementsByTagName('input');

	var errors = [];

	//Валидация формы
	[].forEach.call(inps, function(elem){

		var val = elem.value.trim();
		
		if(!val.match(new RegExp(elem.dataset.rule, 'i'))){
			errors.push(elem);
		}else if((elem.dataset.min && elem.dataset.min > val) || (elem.dataset.max && elem.dataset.max < val)){
			errors.push(elem);
		}else{
			elem.nextElementSibling.innerHTML = '';
		}
	});

	
	//Обработка ошибок
	if(errors.length){
		errors.forEach(function(elem){
			elem.nextElementSibling.innerHTML = elem.dataset.msg;
		});
	}else{

		//Отправка данных текущим транспортом, если ошибок нет
		var transport = Transport.instance();

		var params = {method: form.method, action: form.action};
		var data = new FormData(form);

		var result = transport(params, data);
		var uName = result.surname + ' ' + result.name + ' ' + result.middlename;

		ReactDom.update('name', uName);
		ReactDom.update('ballance', result.ballance + ' $');

		return false;
	}

	return false;
};
