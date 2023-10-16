import os
import json
from app.domain.entities.video import Video

class JsonRepository:
    def __init__(self, filename):
        self.filename = filename

    def save(self, data):
        with open(self.filename, "w") as f:
            json.dump(data.to_dict(), f, indent=4)

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