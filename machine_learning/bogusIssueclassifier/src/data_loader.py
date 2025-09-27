import os
import glob
import random
from torch.utils.data import Dataset
from torchvision import transforms
from PIL import Image
import json

DATASET_DIR = "data/urban-issues-dataset"
IMG_SIZE = 224
BATCH_SIZE = 16

KEEP_CLASSES = [
    "Damaged concrete structures",
    "DamagedElectricalPoles",
    "DamagedRoadSigns",
    "FallenTrees",
    "Garbage",
    "Graffitti",
    "Potholes and RoadCracks"
]

class_names = sorted(KEEP_CLASSES)
class_to_idx = {name: idx for idx, name in enumerate(class_names)}

class UrbanIssuesDataset(Dataset):
    def __init__(self, split="train", augment=False):
        self.paths, self.labels = self._get_paths_labels(split)
        self.augment = augment

        self.base_transform = transforms.Compose([
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor()
        ])

        if self.augment:
            self.data_augmentation = transforms.Compose([
                transforms.RandomHorizontalFlip(),
                transforms.RandomRotation(10),
                transforms.ColorJitter(contrast=0.1),
            ])

    def _get_paths_labels(self, split):
        paths, labels = [], []
        for class_name in class_names:
            img_dir = os.path.join(DATASET_DIR, class_name, class_name, split, "images")
            files = glob.glob(os.path.join(img_dir, "*.jpg")) + \
                    glob.glob(os.path.join(img_dir, "*.jpeg")) + \
                    glob.glob(os.path.join(img_dir, "*.png"))
            paths.extend(files)
            labels.extend([class_to_idx[class_name]] * len(files))
        combined = list(zip(paths, labels))
        random.shuffle(combined)
        paths, labels = zip(*combined)
        return list(paths), list(labels)

    def __len__(self): return len(self.paths)

    def __getitem__(self, idx):
        img_path = self.paths[idx]
        label = self.labels[idx]
        image = Image.open(img_path).convert("RGB")
        if self.augment:
            image = self.data_augmentation(image)
        image = self.base_transform(image)
        return image, label
