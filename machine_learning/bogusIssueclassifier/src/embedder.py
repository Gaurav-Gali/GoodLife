import torch
from model import MobileNetV3CBAM
from torchvision import transforms
from PIL import Image
import os
import numpy as np

IMG_SIZE = 224
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


class Embedder:
    def __init__(self, model_path):
        self.model = MobileNetV3CBAM(num_classes=7, freeze_base=True)
        self.model.load_state_dict(torch.load(model_path))
        self.model.eval()
        self.model.to(DEVICE)
        self.preprocess = transforms.Compose([
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor()
        ])

    def get_embedding(self, img_path):
        img = Image.open(img_path).convert("RGB")
        img = self.preprocess(img).unsqueeze(0).to(DEVICE)
        with torch.no_grad():
            feat = self.model.features(img)
            feat = self.model.cbam(feat)
            feat = self.model.avgpool(feat)
            embedding = torch.flatten(feat, 1).cpu().numpy()
        return embedding[0]


def build_embeddings(dataset_path, save_path):
    classes = os.listdir(dataset_path)
    embedder = Embedder(model_path='checkpoints/best_model.pth')
    embeddings = {}
    for cls in classes:
        print(f"Processing class: {cls}")
        embeddings[cls] = []
        class_path = os.path.join(dataset_path, cls, cls, "train", "images")
        if not os.path.exists(class_path):
            print(f"Skipping, path not found: {class_path}")
            continue
        for img in os.listdir(class_path):
            img_path = os.path.join(class_path, img)
            emb = embedder.get_embedding(img_path)
            embeddings[cls].append(emb)
    # Save embeddings as numpy file
    np.save(save_path, embeddings)
    print(f"Embeddings successfully saved to {save_path}")


if __name__ == "__main__":
    dataset_path = "data/urban-issues-dataset"
    save_path = "embeddings/embeddings.npy"
    build_embeddings(dataset_path, save_path)
