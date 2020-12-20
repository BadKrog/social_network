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
				if(name=="getUserById"){
					var user = request.split("\n");
					const name = document.getElementById("nickname");
					name.innerHTML = user[1];
				}
				if(name=="receiveDialog"&&request!="error"){
					location.href = 'http://localhost/dialog.html?'+getNumUser()+"&"+request;
				}
				if(name=="addFriend"){
					if(request=="error"){
						alert("Это пользователь уже был добавлен к вам в друзья");
						but_addFriend.style.display = 'none';
					}
					else{
						alert("Добавление прошло успешно");
						but_addFriend.style.display = 'none';
					}
				}
				console.log("Получили вот это:"+request);			  
			}
		}
	};
}

//------ При запуске окна ---------
console.log("Отправляем запрос");
post("getUserById", ""+getDopInfo());

const but_write = document.getElementById("but_write");
but_write.addEventListener('click', ()=>{
	post("receiveDialog", getNumUser()+"\n"+getDopInfo());
});

const but_addFriend = document.getElementById("add_friend");
but_addFriend.addEventListener("click", ()=>{
	post("addFriend", getNumUser()+"\n"+getDopInfo());
});

const img = document.getElementById("img");
img.src = "../image/cat.jpg";