# Path Imports
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
# Path Imports

from IssueVerificationModel.BlipCaptionGenerator import BlipCaptionGenerator

before_img = "../data/user_images/garbage.png"
after_img = "../data/drone_images/clean.png"

start = time.time()
generator = BlipCaptionGenerator(before_img, after_img)
captions = generator.generate_captions()
end = time.time()

print(f"\nCaption 1: {captions['caption1']}\nCaption2 : {captions['caption2']}\n")
print(end-start)