from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Подключаем статический фронтенд
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")


@app.post("/upload/")
async def upload_file(file: UploadFile, level: str = Form(...)):
    # Просто возвращаем данные для теста
    content = await file.read()
    return JSONResponse(content={
        "filename": file.filename,
        "content_type": file.content_type,
        "level": level,
        "file_content": content.decode("utf-8", errors="ignore")[:500]  # Только первые 500 символов
    })
