from PIL import Image
import torchvision.transforms as transforms
import torch

class ImageFormatter:
    def __init__(self, image_path, target_size=(224, 224)):
        self.image_path = image_path
        self.target_size = target_size
        self.image = None

    def load_image(self):
        self.image = Image.open(self.image_path).convert("RGB")
        return self.image

    def resize_image(self):
        if self.image is None:
            self.load_image()

        self.image = self.image.resize(self.target_size)
        return self.image

    def get_clip_tensor(self):
        if self.image is None:
            self.load_image()
            self.resize_image()

        transform_pipeline = transforms.Compose([
            transforms.Resize(self.target_size),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.48145466, 0.4578275, 0.40821073],
                                 std=[0.26862954, 0.26130258, 0.27577711])
        ])
        return transform_pipeline(self.image).unsqueeze(0)

    def get_blip_image(self):
        if self.image is None:
            self.load_image()
            self.resize_image()
        return self.image

    def get_formatted(self):
        formatted = {
            "blip_image": self.get_blip_image(),
            "clip_tensor": self.get_clip_tensor()
        }
        return formatted