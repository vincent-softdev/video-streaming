class Channel:
    def __init__(self, id, name, profileUrl):
        self.id = id
        self.name = name
        self.profileUrl = profileUrl

    def to_dict(self):
        """
        Convert the Video instance to a dictionary.
        """
        return {
            "id": self.id,
            "name": self.name,
            "profileUrl": self.profileUrl,
        }