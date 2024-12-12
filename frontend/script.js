document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('.file__input');
    const fileLabel = document.querySelector('.file__label');

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Выберите файл';
        let fileN = fileName[0] + fileName[1] + fileName[2] + fileName[3] + fileName[4] + "...";

        fileLabel.textContent = fileN;
    });
});









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
            <p class="respons__text">${result.message}</p>
            <a class="respons__link link" href="${url}${result.file_url}" download target="_blank">Скачать обработанный файл</a>
        `;
    } catch (error) {
        // Обрабатываем ошибки
        responseDiv.innerText = `Ошибка: ${error.message}`;
    }
});
