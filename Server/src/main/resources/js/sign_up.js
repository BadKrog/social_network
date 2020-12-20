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
				console.log("Получили вот это:"+request);
				if(request=="error") 
					console.log("при создании произошла ошибка");
				else {
					console.log("Создание прошло успешно");
					location.href = 'http://localhost/list_message.html?'+request;
				}
			  
			}
		}
	};
}

const but_signUp = document.getElementById('sign_up');
const input_login = document.getElementById('login');
const input_nick = document.getElementById('nick');
const input_pass = document.getElementById('password');
but_signUp.addEventListener('click', ()=>{
	var answer = 	input_login.value +"\n"
				+input_pass.value +"\n"
				+input_nick.value;
	console.log("Отправили: "+ answer);
	post("register", answer);
});