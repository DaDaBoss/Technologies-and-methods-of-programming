let correct_password = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // password123
let current_password = "";
let pass_val = document.getElementById("pass");


// Проверка введенного пароля
let unlock = async () => {
    current_password = await SHA256(pass_val.value);
    if (correct_password == current_password) alert("Контент разблокирован");
    else alert("Контент не разблокирован");
}

document.onselectstart = () => { return correct_password == current_password }; // Запрет или разрешение выделения текста
document.ondragstart = () => { return correct_password == current_password }; // Запрет или разрешение перемешения выделенного текста или картинок
document.oncontextmenu = () => { return correct_password == current_password }; // Запрет или разрешение контекстного меню
document.oncopy = () => { return correct_password == current_password }; // Запрет или разрешение копирования

// Функция для вычисления хеша SHA-256
async function SHA256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

document.addEventListener('keyup', (e) => { // При нажатии на PrintScreen исчезает содержимое и очищается буфер обмена
    if (e.key === 'PrintScreen') {
        if (correct_password != current_password) {
            document.body.hidden = true;
            navigator.clipboard.writeText('');
        }
    }
});
