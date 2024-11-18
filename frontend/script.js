const form = document.getElementById('upload-form');
const responseDiv = document.querySelector(".respons");

const url = "http://127.0.0.1:8000";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector('#file'); // Получаем input с файлом
    const level = document.querySelector('#level');

    // Создаем объект FormData
    const formData = new FormData(); // Исправлено: formDate -> formData
    formData.append('file', fileInput.files[0]); // Добавляем файл
    formData.append('level', level.value); // Уровень адаптации

    try {
        // Отправляем запрос на сервер
        const response = await fetch(url + "/upload/", {
            method: 'POST',
            body: formData
        });

        // Проверяем статус ответа
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Читаем ответ сервера
        const result = await response.json();
        responseDiv.innerText = `Ответ сервера: ${JSON.stringify(result)}`;
    } catch (error) {
        // Обрабатываем ошибки
        responseDiv.innerText = `Ошибка: ${error.message}`;
    }
});
