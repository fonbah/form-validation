"use strict"

/*
* Обработчик отправки данных
* 
*/

var Transport = new function(){

	var ballance = 10;

	var socOpen = false;

	var socket = new WebSocket("wss://myserver.ru/ws");

	socket.onopen = function() {
		socOpen = true;
	};

	socket.onclose = function(e) {
		if (e.wasClean) {
		  //'Соединение закрыто чисто'
		} else {
			//Сообщение об ошибке пользователю
			Message.show('Обрыв соединения');
		}
		socOpen = false;
		//console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};

	socket.onerror = function(error) {
		//Сообщение об ошибке пользователю
		Message.show("Ошибка " + error.message);
	};

	socket.onmessage = function(e) {

	  	//Обработка сообщения сервера
		eventHandlers(JSON.parse(e.data));
	};


	//Получить текущий транспорт
	this.instance = function(type){

		if(type || !socOpen){
			return httpreq;
		}

		return sockTrans;
	};

	//Siocket transport
	var sockTrans = function(params, data){

		//Возвращаем заглушку
		return serv(data);

		var sendData = {};

		if(typeof data == 'FormData'){
			sendData = data.entries();
			
		}else{
			sendData = data;
		}

		sendData.action = params.action;

		socket.send(JSON.stringify(sendData));
	};

	//Ajax transport
	var httpreq = function(params, data){

		//Возвращаем заглушку
		return serv(data);

		var req = new XMLHttpRequest();
  		req.open(params.method, params.action, true);

  		req.onreadystatechange = function(){
  			if (req.readyState == 4){

  				if(req.status != 200){
					return false;
				}

				//Возвращаем полученные с сервера данные
				return JSON.parse(req.responceText);
  			}
  		};

	  	req.send(data);
	};

	//Заглушка для сервера
	var serv = function(fields){

		ballance += 10;

		return {
			id: 1,
			name: fields.get('username') || "Василий",
			surname: fields.get('surname') || 'Васильев',
			middlename: fields.get('middlename') || 'Иванович',
			ballance: fields.get('userage') || ballance
		}
	};

};



/*
* Обработчик сообщений сервера
* 
*/
var eventHandlers = function(msg){

	switch(msg.type) {
    case "check_ballance":
		ReactDom.update('ballance', msg.ballance + ' $');
      break;
    case "username":
    	var uName = msg.surname + ' ' + msg.name + ' ' + msg.middlename;
		ReactDom.update('name', uName);
      break;
  }

};
