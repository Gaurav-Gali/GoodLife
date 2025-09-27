import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from model import MobileNetV3CBAM
from data_loader import UrbanIssuesDataset
from torch.optim.lr_scheduler import ReduceLROnPlateau
from tqdm import tqdm
import os

# Hyperparameters
EPOCHS = 20
BATCH_SIZE = 16
LEARNING_RATE = 1e-4
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
NUM_CLASSES = 7
PATIENCE = 5  # Early stopping patience

def main():
    # Load datasets and dataloaders
    train_dataset = UrbanIssuesDataset(split="train", augment=True)
    valid_dataset = UrbanIssuesDataset(split="valid", augment=False)
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=4, pin_memory=True)
    valid_loader = DataLoader(valid_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=4, pin_memory=True)

    # Model, optimizer, scheduler
    model = MobileNetV3CBAM(num_classes=NUM_CLASSES)
    model.to(DEVICE)
    optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)
    scheduler = ReduceLROnPlateau(optimizer, 'min', patience=3, factor=0.5)

    # Weighted cross entropy
    class_weights = torch.tensor([1.0, 1.2, 1.5, 1.0, 1.0, 1.0, 1.3]).to(DEVICE)
    criterion = nn.CrossEntropyLoss(weight=class_weights)

    best_val_loss = float('inf')
    epochs_no_improve = 0
    os.makedirs("checkpoints", exist_ok=True)

    for epoch in range(EPOCHS):
        model.train()
        total_loss = 0
        for images, labels in tqdm(train_loader, desc=f"Epoch {epoch+1}"):
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item() * images.size(0)

        avg_train_loss = total_loss / len(train_loader.dataset)

        # Validation
        model.eval()
        val_loss = 0
        correct = 0
        with torch.no_grad():
            for images, labels in valid_loader:
                images, labels = images.to(DEVICE), labels.to(DEVICE)
                outputs = model(images)
                loss = criterion(outputs, labels)
                val_loss += loss.item() * images.size(0)
                preds = torch.argmax(outputs, dim=1)
                correct += torch.sum(preds == labels)

        avg_val_loss = val_loss / len(valid_loader.dataset)
        val_acc = correct.double() / len(valid_loader.dataset)

        print(f"Epoch {epoch+1}: Train Loss={avg_train_loss:.4f}, Val Loss={avg_val_loss:.4f}, Val Acc={val_acc:.4f}")

        scheduler.step(avg_val_loss)

        # Early stopping and save best model
        if avg_val_loss < best_val_loss:
            best_val_loss = avg_val_loss
            epochs_no_improve = 0
            torch.save(model.state_dict(), "checkpoints/best_model.pth")
            print(f"Saved new best model with val loss {best_val_loss:.4f}")
        else:
            epochs_no_improve += 1
            print(f"No improvement for {epochs_no_improve} consecutive epochs")

        if epochs_no_improve >= PATIENCE:
            print(f"Early stopping triggered at epoch {epoch+1}")
            break

    print("Training Complete.")

if __name__ == '__main__':
    main()
