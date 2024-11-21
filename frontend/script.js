const form = document.getElementById('upload-form');
const responseDiv = document.querySelector(".respons");

const url = "http://127.0.0.1:8000";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector('#file');
    const level = document.querySelector('#level');

    // Создаем объект FormData
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('level', level.value);

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

        // Читаем JSON-ответ от сервера
        const result = await response.json();
        console.log(result)

        // Отображаем ссылку для скачивания обработанного файла
        responseDiv.innerHTML = `
            <p>${result.message}</p>
            <a href="${url}${result.file_url}" download target="_blank">Скачать обработанный файл</a>
        `;
    } catch (error) {
        // Обрабатываем ошибки
        responseDiv.innerText = `Ошибка: ${error.message}`;
    }
});
