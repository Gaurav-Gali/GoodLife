import logging
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch

logging.basicConfig(level=logging.INFO)

class BlipCaptionGenerator:
    def __init__(self, image1_path, image2_path):
        self.image1_path = image1_path
        self.image2_path = image2_path

        logging.info("Loading BLIP processor...")
        self.processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        logging.info("Processor loaded.")

        logging.info("Loading BLIP model...")
        self.model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        logging.info("Model loaded.")

    def generate_captions(self):
        logging.info("Opening first image...")
        img1 = Image.open(self.image1_path).convert("RGB")
        logging.info("Opening second image...")
        img2 = Image.open(self.image2_path).convert("RGB")

        logging.info("Processing first image...")
        inputs1 = self.processor(img1, return_tensors="pt")
        logging.info("Processing second image...")
        inputs2 = self.processor(img2, return_tensors="pt")

        logging.info("Generating caption for first image...")
        out1 = self.model.generate(**inputs1, max_new_tokens=60)
        logging.info("Generating caption for second image...")
        out2 = self.model.generate(**inputs2, max_new_tokens=60)

        logging.info("Decoding captions...")
        cap1 = self.processor.decode(out1[0], skip_special_tokens=True)
        cap2 = self.processor.decode(out2[0], skip_special_tokens=True)

        logging.info("Captions generated.")
        return {
            "caption1": cap1,
            "caption2": cap2,
        }
