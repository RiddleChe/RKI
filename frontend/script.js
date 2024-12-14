document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.querySelector('.file__input');
    const fileLabel = document.querySelector('.file__label');
    const responseDiv = document.querySelector(".respons");
    const loader = document.createElement('div'); // Создаем элемент для загрузки
    loader.className = "loader"; // Добавляем CSS-класс
    document.body.appendChild(loader); // Добавляем его в DOM
    loader.style.display = "none"; // Скрываем его по умолчанию

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Выберите файл';

        if (!fileName.endsWith('.docx')) {
            responseDiv.innerText = "Ошибка: допустимы только файлы формата .docx.";
            fileInput.value = ''; // Сбрасываем выбранный файл
            fileLabel.textContent = 'Выберите файл';
            return;
        }

        // Обрезаем название файла для отображения, если оно длинное
        let fileN = fileName.length > 10 ? fileName.slice(0, 5) + "..." : fileName;
        fileLabel.textContent = fileN;
        responseDiv.innerText = ''; // Сбрасываем ошибки
    });
});

const form = document.getElementById('upload-form');
const url = "http://127.0.0.1:8000";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.querySelector('#file');
    const level = document.querySelector('#level');
    const responseDiv = document.querySelector(".respons");
    const loader = document.querySelector('.loader');

    // Проверяем, выбран ли файл
    if (fileInput.files.length === 0) {
        responseDiv.innerText = "Ошибка: Вы не выбрали файл.";
        return;
    }

    // Показываем анимацию загрузки
    loader.style.display = "block";
    responseDiv.innerHTML = ''; // Очищаем предыдущее сообщение

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

        // Отображаем ссылку для скачивания обработанного файла
        responseDiv.innerHTML = `
            <p class="respons__text">${result.message}</p>
            <a class="respons__link link" href="${url}${result.file_url}" download target="_blank">Скачать обработанный файл</a>
        `;
    } catch (error) {
        // Обрабатываем ошибки
        responseDiv.innerText = `Ошибка: ${error.message}`;
    } finally {
        // Скрываем анимацию загрузки
        loader.style.display = "none";
    }
});
