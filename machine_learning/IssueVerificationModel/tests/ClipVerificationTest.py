# Path Imports
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
# Path Imports

from IssueVerificationModel.ClipVerification import ClipVerification
from IssueVerificationModel.ImageFormatter import ImageFormatter


user_image_path = "../data/user_images/issue1.png"
drone_image_path = "../data/drone_images/issue4.png"

start = time.time()

# Image Formatting
formatted_user = ImageFormatter(user_image_path).get_formatted()["clip_tensor"]
formatted_drone = ImageFormatter(drone_image_path).get_formatted()["clip_tensor"]

# Image Verification
verifier = ClipVerification(formatted_user, formatted_drone).is_similar()

end = time.time()

print("Verification\n",verifier)
print(f"\nVerification time: {end - start}")