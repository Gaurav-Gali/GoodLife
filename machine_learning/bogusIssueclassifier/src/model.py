import torch
import torch.nn as nn
from torchvision.models import mobilenet_v3_small

class CBAM(nn.Module):
    def __init__(self, channel, ratio=8, kernel_size=7):
        super(CBAM, self).__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
        self.shared_mlp = nn.Sequential(
            nn.Flatten(),
            nn.Linear(channel, channel // ratio),
            nn.ReLU(),
            nn.Linear(channel // ratio, channel)
        )
        self.conv2d = nn.Conv2d(2, 1, kernel_size=kernel_size, padding=kernel_size//2, bias=False)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.shared_mlp(self.avg_pool(x))
        max_out = self.shared_mlp(self.max_pool(x))
        ca = self.sigmoid(avg_out + max_out).unsqueeze(2).unsqueeze(3)
        x = x * ca
        avg_pool_spatial = torch.mean(x, dim=1, keepdim=True)
        max_pool_spatial = torch.max(x, dim=1, keepdim=True)[0]
        sa = self.sigmoid(self.conv2d(torch.cat([avg_pool_spatial, max_pool_spatial], dim=1)))
        x = x * sa
        return x

class MobileNetV3CBAM(nn.Module):
    def __init__(self, num_classes=7, freeze_base=True, freeze_until=-20):
        super().__init__()
        base_model = mobilenet_v3_small(pretrained=True)
        self.features = base_model.features
        in_channels = 576
        self.cbam = CBAM(channel=in_channels)
        self.avgpool = nn.AdaptiveAvgPool2d((1,1))
        self.classifier = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(in_channels, 256),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(256, num_classes)
        )
        if freeze_base:
            for layer in list(self.features.children())[:freeze_until]:
                for p in layer.parameters():
                    p.requires_grad = False
    def forward(self, x):
        x = self.features(x)
        x = self.cbam(x)
        x = self.avgpool(x)
        x = torch.flatten(x,1)
        x = self.classifier(x)
        return x
