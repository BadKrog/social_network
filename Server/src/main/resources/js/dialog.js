function initMenu(){
	const my_page = document.getElementById('my_page');
	my_page.addEventListener('click', ()=>{
		location.href = 'http://localhost/my_page.html?'+getNumUser();
	});

	const list_message = document.getElementById('list_message');
	list_message.addEventListener('click', ()=>{
		location.href = 'http://localhost/list_message.html?'+getNumUser();
	});

	const list_friend = document.getElementById('list_friend');
	list_friend.addEventListener('click', ()=>{
		location.href = 'http://localhost/list_friend.html?'+getNumUser();
	});
}

function getNumUser(){
	var address = window.location.toString();
	var index_q = address.indexOf("?");
	var index_a = address.indexOf("&");
	var num = "";
	if(index_q >= 0 && index_a<0) {
		num = address.substring(index_q+1);
	}
	else{
		num = address.substring(index_q+1, index_a);
	}
	return num;
}

function getDopInfo(){
	var address = window.location.toString();
	var index_a = address.indexOf("&");
	var dop_info = "";
	if(index_a >= 0) {
		dop_info = address.substring(index_a+1);
	}
	
	return dop_info;
}

initMenu();


// ------- Закончилась обработка МЕНЮ ---------------
//---------------------------------------------------------
//--------- Началась обработка списка друзей ------------
function addMessage(id, value_msg){
	const messages = document.getElementById("messages");
	var msg = document.createElement("div");
	if(id==getNumUser()){
		msg.innerHTML = 	"<div class=\"my msg\">"+
							"<div>"+value_msg+"</div><br>"+
						"</div>";
	}
	else{
		msg.innerHTML = 	"<div class=\"friend msg\">"+
							"<div>"+value_msg+"</div><br>"+
						"</div>";
	}
	messages.appendChild(msg);
}


function deleteAllMsg(){
	$("#messages .msg").remove();
}
//--------- Закончилась обработка списка -----------
//--------------------------------------------------
//------------------ Запрос POST -------------------

/* Данная функция создаёт кроссбраузерный объект XMLHTTP */
function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
};

// Отправка запроса Post
function post(name, message) {

	var request = "Ошибка получения!";
    // Создаём объект XMLHTTP
    var xmlhttp = getXmlHttp();

    // Открываем асинхронное соединение
    xmlhttp.open("POST", name, true);

    // Отправляем кодировку
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// Отправляем POST-запрос
	xmlhttp.send(message+"\n");
	
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) { // Ответ пришёл
			if(xmlhttp.status == 200) { // Сервер вернул код 200 (что хорошо)

				request = xmlhttp.responseText;
				if(name=="getListMessage"){
					var list_dialogs = request.split("\n");
					deleteAllMsg();
					for(var i=0; i<list_dialogs[0]; i++){
						addMessage(list_dialogs[i*2+1], list_dialogs[i*2+2]);
						
					}
				}
				console.log("Получили вот это:"+request);			  
			}
		}
	};
}

//------ При запуске окна ---------
console.log("Отправляем запрос");

function getMessages(){
	post("getListMessage", getDopInfo()+"");
}
timer = setInterval("getMessages()",1000);

const but_send = document.getElementById("send");
const input = document.getElementById("input");
but_send.addEventListener('click', ()=>{
	if(input.value != ""){
		post("addMessage", getDopInfo()+"\n"+getNumUser()+"\n"+ input.value);
		addMessage(getNumUser(), input.value);
		input.value = "";
	}
});


