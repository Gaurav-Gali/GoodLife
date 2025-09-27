import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class Matcher:
    def __init__(self, embeddings_path, similarity_threshold=0.7):
        self.embeddings = np.load(embeddings_path, allow_pickle=True).item()
        self.threshold = similarity_threshold

    def match(self, query_embedding):
        best_class, best_score = None, 0
        for cls, emb_list in self.embeddings.items():
            for emb in emb_list:
                score = cosine_similarity([query_embedding], [emb])[0][0]
                if score > best_score:
                    best_score = score
                    best_class = cls
        if best_score >= self.threshold:
            return best_class, best_score
        else:
            return "Rejected (Bogus)", best_score
