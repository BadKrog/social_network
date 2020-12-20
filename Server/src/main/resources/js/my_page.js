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
	var index = address.indexOf("?");
	var num = "";
	if(index >= 0) {
		num = address.substring(index+1);
	}
	return num;
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
				console.log("Получили вот это:"+request);			  
			}
		}
	};
}

//------ При запуске окна ---------
console.log("Отправляем запрос");
post("getUserById", ""+getNumUser());


//=========== ЭЭЭЭЭЭЭЭЭЭЭЭЭЭкспиременты ==============
const img = document.getElementById("img");
img.src = "../image/cat.jpg";
	
//----------------------------------------------------------------------
//---------------------- Всплывающее окно ------------------------------
document.getElementById("add").addEventListener('click', ()=>{
	const nameIn = document.getElementById("nameIn");
	if(nameIn.value!=""){
		post("updateUser", getNumUser()+"\n"+nameIn.value);
		document.getElementById("nickname").innerHTML = nameIn.value;
		nameIn.value = "";
		PopUpHide();
	}
});
document.getElementById("exit").addEventListener("click", ()=>{PopUpHide()});

    //Функция отображения PopUp
    function PopUpShow(){
        $("#popup1").show();
    }
    //Функция скрытия PopUp
    function PopUpHide(){
        $("#popup1").hide();
    }
PopUpHide();

const editing = document.getElementById("editing");
editing.addEventListener('click', ()=>{
	PopUpShow();
});