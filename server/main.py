from fastapi import FastAPI, File, UploadFile, HTTPException
from starlette.responses import FileResponse
import os

app = FastAPI()

VIDEO_DIRECTORY = "./videos"

@app.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    try:
        filepath = os.path.join(VIDEO_DIRECTORY, file.filename)
        with open(filepath, "wb+") as buffer:
            buffer.write(file.file.read())
        return {"filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {e}")

@app.get("/videos/{filename}")
async def stream_video(filename: str):
    try:
        filepath = os.path.join(VIDEO_DIRECTORY, filename)
        return FileResponse(filepath, media_type="video/mp4", method="GET")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"File not found: {filename}")