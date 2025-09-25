import torch
import torch.nn.functional as F
from transformers import CLIPModel, CLIPProcessor

class ClipVerification:
    def __init__(self, clip_tensor1, clip_tensor2, model_name="openai/clip-vit-base-patch32",device=None):
        self.clip_tensor1 = clip_tensor1
        self.clip_tensor2 = clip_tensor2
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")

        # Load CLIP model and processor
        self.model = CLIPModel.from_pretrained(model_name).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_name)

    def similarity(self):
        with torch.no_grad():
            img1_features = self.model.get_image_features(self.clip_tensor1.to(self.device))
            img2_features = self.model.get_image_features(self.clip_tensor2.to(self.device))

        # Normalize and compute cosine similarity
        img1_features = F.normalize(img1_features, p=2, dim=-1)
        img2_features = F.normalize(img2_features, p=2, dim=-1)
        sim = (img1_features * img2_features).sum().item()
        return sim

    def is_similar(self, threshold=0.85):
        score = self.similarity()
        similarity = {
            "score": score,
            "isSimilar": score >= threshold
        }

        return similarity