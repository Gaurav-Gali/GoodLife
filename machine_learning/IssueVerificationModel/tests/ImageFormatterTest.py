# Path Imports
import sys
import os
import time
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
# Path Imports

from IssueVerificationModel.ImageFormatter import ImageFormatter

user_image_path = "../data/user_images/issue1.png"
drone_image_path = "../data/drone_images/issue1.png"

start = time.time()
formatter_user = ImageFormatter(user_image_path)
formatter_drone = ImageFormatter(drone_image_path)

formatted_user = formatter_user.get_formatted()
formatted_drone = formatter_drone.get_formatted()
end = time.time()


print("Blip Image :\n",formatted_user['blip_image'], "\nClip Tensor :\n", formatted_user['clip_tensor'])
print("\n\nBlip Image :\n",formatted_drone['blip_image'], "\nClip Tensor :\n", formatted_drone['clip_tensor'])
print(f"\nTime taken: {end - start} seconds")