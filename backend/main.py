from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()



@app.post("/upload/")
async def upload_file(file: UploadFile = Form(...), level: str = Form(...)):
    # Проверяем, что файл получен
    if not file:
        return JSONResponse({"error": "Файл не загружен"}, status_code=400)

    # Пример обработки файла (ничего не делаем с ним пока)
    return JSONResponse({"message": f"Файл '{file.filename}' загружен с уровнем {level}"})
# Подключаем статический фронтенд
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")