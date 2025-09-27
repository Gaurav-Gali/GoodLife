import sys
import os
import time

# Add the parent folder to sys.path to import BlipCaptionGenerator
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from IssueVerificationModel.BlipCaptionGenerator import BlipCaptionGenerator
import ollama

before_img = "../data/user_images/issue1.png"
after_img = "../data/drone_images/clean.png"
user_desc = "presence of potholes on the street causing distruption for people"

def verify_issue_addressed(user_desc, caption_before, caption_after, model='qwen2.5:1.5b'):
    prompt = f"""
You are an expert AI assistant tasked with verifying whether a reported issue has been resolved based on three pieces of information:

1. The user's description of the issue: "{user_desc}"
2. The caption describing the "before" image: "{caption_before}"
3. The caption describing the "after" image: "{caption_after}"

Instructions:
- Your primary goal is to determine if the core issue described by the user has been effectively resolved in the after image compared to the before image.
- Do NOT base your conclusion merely on the presence or absence of entities in the captions.
- Instead, deeply analyze the user issue and reason about the *change* in the problem’s state from before to after.
- Infer if the issue described is absent, reduced, or unchanged, even if the captions mention other unrelated objects or scenes.
- Use contextual understanding and common sense to decide if the resolution was successful.
- Respond ONLY with either:
   1. "Yes" if the core issue is resolved or substantially addressed.
   2. "No" if the issue persists or is insufficiently addressed.
- On the next line, provide a concise explanation (one sentence) for your answer.
- Assume if the after caption highlights a positive change or absence of the issue, it can be considered resolved.

Example:
User issue: Garbage heap near road entrance causing bad smell.
Before caption: Large garbage pile on the street near road entrance.
After caption: Clean street without any visible garbage; a stop sign is present.

Answer:
"""
    response = ollama.chat(
        model=model,
        messages=[{"role": "user", "content": prompt}]
    )
    return response['message']['content'].strip()


def main():
    start = time.time()
    generator = BlipCaptionGenerator(before_img, after_img)
    captions = generator.generate_captions()
    end = time.time()

    print(f"Caption 1 (Before): {captions['caption1']}")
    print(f"Caption 2 (After): {captions['caption2']}")
    print(f"Caption generation time: {end - start:.2f} seconds\n")

    result = verify_issue_addressed(user_desc, captions['caption1'], captions['caption2'])
    print("Issue Addressed Result:", result)

if __name__ == "__main__":
    main()
