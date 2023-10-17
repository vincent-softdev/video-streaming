import os
import json
from app.domain.entities.video import Video

class JsonRepository:
    def __init__(self, filename):
        self.filename = filename

    def save(self, data):
        current_data = self.load()  # Load existing data
        current_data.append(data.to_dict())  # Append the new video

        with open(self.filename, "w") as f:
            json.dump(current_data, f, indent=4)

    def load(self):
        if not os.path.exists(self.filename):
            return []
        with open(self.filename, "r") as f:
            return json.load(f)
        
    def get_all(self):
        if not os.path.exists(self.filename):
            return []
        with open(self.filename, "r") as f:
            data = json.load(f)
        return [Video(**video_data) for video_data in data]
    
    def get_by_id(self, video_id: str):
        videos = self.load()
        for video_data in videos:
            if video_data["id"] == video_id:
                return Video(**video_data)
        return None
