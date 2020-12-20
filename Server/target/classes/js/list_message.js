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

function addDialog(id, nick){
	const list_dialog = document.getElementById("list_dialog");
	var dialog = document.createElement("div");
	dialog.innerHTML = "<div class=\"element_message\" id=\"" + id + "\">"+
				"<img id=\"img"+id+"\" class=\"image\"></img>"+
				"<div class=\"info_user\">"+
					"<span class=\"nickname\">"+nick+"</span><br>"+
					"<span>Нажмите чтобы увидеть <br>сообщения</span>"+
				"</div>"+
			"</div>";
	
	list_dialog.appendChild(dialog);
}


$("#list_dialog").on('click', '.element_message', function () {
	console.log("Нажал на:"+this.id);
	location.href = 'http://localhost/dialog.html?'+getNumUser()+"&"+this.id;
});





//--------- Закончилась обработка списка -----------
//--------------------------------------------------
//------------------ Запрос POST -------------------

const myMap = new Map();

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
				if(name=="getListDialogs"){
					
					$("#list_dialog .element_message").remove();
					var list_dialogs = request.split("\n");
					for(var i=0; i<list_dialogs[0]; i++){
						addDialog(list_dialogs[i*3+1], list_dialogs[i*3+3]);
						
						const img = document.getElementById("img"+list_dialogs[i*3+1]);
						img.src = "../image/cat.jpg";
					}
				}
				if(name=="receiveDialogById"&&request!="error"){
					location.href = 'http://localhost/dialog.html?'+getNumUser()+"&"+request;
				}
				console.log("Получили вот это:"+request);			  
			}
		}
	};
}



//------ При запуске окна ---------
console.log("Отправляем запрос");
post("getListDialogs", getNumUser()+"");