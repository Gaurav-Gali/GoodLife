from embedder import Embedder
from matcher import Matcher
import time
class CivicIssueDetector:
    def __init__(self, model_path, embeddings_path, similarity_threshold=0.7):
        self.embedder = Embedder(model_path)
        self.matcher = Matcher(embeddings_path, similarity_threshold)

    def predict(self, img_path):
        embedding = self.embedder.get_embedding(img_path)
        label, conf = self.matcher.match(embedding)
        return label, conf

if __name__ == "__main__":
    start=time.time()
    import sys
    img_path = sys.argv[1]
    detector = CivicIssueDetector('checkpoints/best_model.pth', 'embeddings/embeddings.npy')
    label, confidence = detector.predict(img_path)
    end=time.time()
    print(f"Predicted Label: {label}\nConfidence: {confidence:.4f}")
    print(end-start)
