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
function addFriend(id, nick){
	const my_friends = document.getElementById("friends");
	var friend = document.createElement("div");
	friend.innerHTML = "<div class=\"friend\" id=\""+id+"\">"+
				"<img class=\"image\" src=\"../image/cat.jpg\" id=\"img"+id+"\"></img>"+
				"<div class=\"info_user\">"+
					"<span class=\"nickname\">"+nick+"</span><br>"+
					"<span>Написать сообщение</span>"+
				"</div>"+
			"</div>";
				
	my_friends.appendChild(friend);
}


/*for(var i=0; i<10; i++){
	addFriend(i, "Nickname"+i);
}*/

$("#friends").on('click', '.friend', function () {
	console.log("Нажал на:"+this.id);
	location.href = 'http://localhost/page_friend.html?'+getNumUser()+"&"+this.id;
	//$("#friends #"+this.id).remove();
});

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
				if(name=="allUser"){
					$("#friends .friend").remove();
					var list_user = request.split("\n");
					for(var i=0; i<list_user[0]; i++){
						addFriend(list_user[i*2+1], list_user[i*2+2]);
						const img = document.getElementById("img"+list_user[i*2+1]);
						img.src = "../image/cat.jpg";
					}
				}
				if(name=="myFriend"){
					$("#friends .friend").remove();
					var list_user = request.split("\n");
					for(var i=0; i<list_user[0]; i++){
						addFriend(list_user[i*2+1], list_user[i*2+2]);
						const img = document.getElementById("img"+list_user[i*2+1]);
						img.src = "../image/cat.jpg";
				}
				console.log("Получили вот это:"+request);			  
			}
		}
	};
}
}
//------ При запуске окна ---------
console.log("Отправляем запрос");
post("myFriend", ""+getNumUser());

const but_allUsers = document.getElementById("allUsers");
but_allUsers.addEventListener('click', ()=>{
	post("allUser", "");
});

const but_myFriend = document.getElementById("myFriend");
but_myFriend.addEventListener('click', ()=>{
	post("myFriend", ""+getNumUser());
});
