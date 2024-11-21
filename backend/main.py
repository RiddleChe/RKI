from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import uuid

app = FastAPI()

# Папка для сохранения загруженных и обработанных файлов
UPLOAD_FOLDER = Path("uploads")
PROCESSED_FOLDER = Path("processed")
UPLOAD_FOLDER.mkdir(exist_ok=True)
PROCESSED_FOLDER.mkdir(exist_ok=True)

@app.post("/upload/")
async def upload_and_process_file(file: UploadFile = Form(...), level: str = Form(...)):
    if not file:
        return JSONResponse({"error": "Файл не загружен"}, status_code=400)

    # Генерируем уникальное имя для сохранения файла
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    saved_file_path = UPLOAD_FOLDER / unique_filename

    # Сохраняем загруженный файл
    with saved_file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Фиктивная обработка файла (например, просто копируем его в папку processed)
    processed_file_path = PROCESSED_FOLDER / unique_filename
    shutil.copy(saved_file_path, processed_file_path)

    # Возвращаем путь к обработанному файлу
    return {
        "message": "Файл обработан",
        "file_url": f"/processed/{unique_filename}"
    }

# Подключаем папку processed как статические файлы
app.mount("/processed", StaticFiles(directory="processed"), name="processed")

# Подключаем статический фронтенд
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")
