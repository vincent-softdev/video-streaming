from typing import Annotated
from fastapi import FastAPI, File, Form, UploadFile, HTTPException
import os
from app.application.video_service import VideoService
from pydantic import BaseModel, Json
from starlette.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

class ChannelModel(BaseModel):
    id: str
    name: str
    profileUrl: str

class VideoCreate(BaseModel):
    title: str
    channel: ChannelModel
    views: int
    postedAt: str
    duration: int
    thumbnailUrl: str
    videoUrl: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins. Adjust this in a real-world scenario!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

VIDEO_DIRECTORY = "./videos_storage"

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
    
@app.get("/videos/watch/{filename}")
async def stream_video(filename: str):
    try:
        filepath = os.path.join(VIDEO_DIRECTORY, filename)
        return FileResponse(filepath, media_type="video/mp4", method="GET")
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"File not found: {filename}")
    
@app.get("/videos/{video_id}")
async def get_video_by_id(video_id: str):
    try:
        service = VideoService()
        video = service.get_video_by_id(video_id)
        if video:
            return video.__dict__
        else:
            raise HTTPException(status_code=404, detail="Video not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving video: {e}")