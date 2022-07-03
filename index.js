


var myVar;

function random(max, min) {
    return time = Math.floor(Math.random() * max - min) + min
}

function myFunction() {
    myVar = setTimeout(showPage, random(3200, 900));
    
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

function Search(){
    text_admin = '<br><br> <h5>Администраторы беседы </h5>'
    error = ''
    var chat_ids = document.getElementById("chat_id").value;
    var user_ids = document.getElementById("user_id").value;
    if (!chat_ids) {
        error = 'Введите chat id'
    }
    if (!user_ids) {
        error = 'Введите user id'
    }
    if (!chat_ids || !user_ids) {
        document.getElementById("return-info").innerHTML = error;
    } else if (chat_ids && user_ids) {

        var url_chat_admin = "https://api.telegram.org/bot5327822802:AAGhdQdWyWlvyho1n0I8vlq3ZIQKHLsxhIs/getChatAdministrators"
        const datass = {chat_id: -chat_ids.replace('-', '')};
        fetch(url_chat_admin, {
            method: 'POST',
            body: JSON.stringify(datass),
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (ress) {
            return ress.json();
        })
        .then(function (admin) {
            x = -1
            for (i in admin.result){
                x += 1
                text_admin += ' Имя: ' + admin.result[x].user.first_name + ' Универсальный идентификатор: ' + admin.result[x].user.id + '<br>'
            }
            
        })

        // -1001751618303
        // 1145122367
        var url_chat = "https://api.telegram.org/bot5327822802:AAGhdQdWyWlvyho1n0I8vlq3ZIQKHLsxhIs/getChat"
        const datas = {chat_id: -chat_ids.replace('-', '')};
        fetch(url_chat, {
            method: 'POST',
            body: JSON.stringify(datas),
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (chat) {

        var url = "https://api.telegram.org/bot5327822802:AAGhdQdWyWlvyho1n0I8vlq3ZIQKHLsxhIs/getChatMember"
        const data = {chat_id: -chat_ids.replace('-', ''), user_id: user_ids};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (re) {
            return re.json();
        })
        .then(function (user) {
            var lastname = user.result.user.lastname
            if (!lastname) {
                var lastname = "Отсутствует"
            }

            if (user.result.status === 'creator' || user.result.status === 'administrator') {
                prefix = 'Кастомный префикс ' + user.result.custom_title
            } else {prefix=''}
            

            if (chat.result.description) {
                description = chat.result.description
            } else if (!chat.result.description) {description = 'Отсутствует'}

            if (chat.result.username) {
                nameuser = chat.result.username
            } else if (!chat.result.username) {nameuser = 'Отсутствует'}

            var username = user.result.user.username
            if (!username) {
                var username = "Отсутствует"
            }

            if (chat.result.invite_link) {
                invite_link = chat.result.invite_link
            } else if (!chat.result.invite_link) {invite_link = 'Отсутствует'}

            if (chat.result.sticker_set_name) {
                sticker_set_name = chat.result.sticker_set_name
            } else if (!chat.result.sticker_set_name) {sticker_set_name = 'Отсутствуют'}
            console.log(chat)


            text_chat_info = '<br><br> <h5>Информация о чате ' + chat.result.title + ' </h5> Название: ' + chat.result.title + '<br>Универсальное имя беседы: '+nameuser+'<br>Тип группы: ' + chat.result.type + '<br>Описание: ' + description + '<br>Cсылка добавление: ' + invite_link + '<br>Название стикеров чата: ' + sticker_set_name + '<br>Изменять профиль чата: ' + String(chat.result.permissions.can_change_info).replace("true", "можно").replace("false", "нельзя") + '<br>Закреплять сообщение: ' + String(chat.result.permissions.can_pin_messages).replace("true", "можно").replace("false", "нельзя") + '<br>Добавлять участников: ' + String(chat.result.permissions.can_invite_users).replace("true", "можно").replace("false", "нельзя") + '<br>Отправлять медиа: ' + String(chat.result.permissions.can_send_media_messages).replace("true", "можно").replace("false", "нельзя")  + '<br>Отправлять сообщение: ' + String(chat.result.permissions.can_send_messages).replace("true", "можно").replace("false", "нельзя")  + '<br>Отправлять опрос: ' + String(chat.result.permissions.can_send_polls).replace("true", "можно").replace("false", "нельзя")  + '<br>Отправлять гиф/стикеры/другое: ' + String(chat.result.permissions.can_send_other_messages).replace("true", "можно").replace("false", "нельзя") 
            text = ' <h5>Информация о участнике ' + user.result.user.first_name + ' </h5> Имя: ' + user.result.user.first_name + '<br>Фамилия: ' + lastname + '<br>Универсальное имя: ' + username + '<br>Язык: ' + user.result.user.language_code + '<br>Статус: ' + user.result.status.replace("kicked", "Заблокирован").replace("leave", "Вышел из чата").replace("creator", "Создатель").replace("administrator", "Администратор").replace("member", "Участник").replace("restricted", "ограниченные возможности") + '<br>' + prefix + ' '
            document.getElementById('return-info').innerHTML = text + text_chat_info + text_admin;
        })
        })

    }
}
