from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
import os
from app.application.video_service import VideoService
from pydantic import BaseModel, Json

class VideoCreate(BaseModel):
    title: str
    channel_id: str
    channel_name: str
    channel_profileUrl: str
    views: int
    postedAt: str
    duration: int
    thumbnailUrl: str
    videoUrl: str


app = FastAPI()

VIDEO_DIRECTORY = "./videos"

@app.post("/upload/")
async def upload_video(
    video_data: Annotated[Json[VideoCreate], Form()],
    file: UploadFile = File(...)
):
    print(video_data)
    try:
        filepath = os.path.join(VIDEO_DIRECTORY, file.filename)
        with open(filepath, "wb+") as buffer:
            buffer.write(file.file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {e}")

    try:
        service = VideoService()
        video = service.create_and_save_video(video_data.dict())
        return video.__dict__
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video data: {e}")



@app.get("/videos/")
async def get_all_videos():
    try:
        service = VideoService()
        videos = service.get_all_videos()
        return [video.__dict__ for video in videos]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving videos: {e}")