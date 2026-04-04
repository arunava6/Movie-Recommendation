import pickle

from fastapi import FastAPI
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

with open("update_df.pkl", "rb") as f:
    df = pickle.load(f)

with open("tfidf_matrix.pkl", "rb") as f:
    matrix = pickle.load(f)

with open("indices.pkl", "rb") as f:
    indices = pickle.load(f)


def recommendation(title: str, n=10):
    title = title.lower().strip()
    matches=df[df['title'].str.lower().str.strip()==title]
    if matches.empty:
        return ["movie not found"]

    idx = matches.index[0]

    sim_score = cosine_similarity(matrix[idx], matrix).flatten()
    movie_idx = sim_score.argsort()[::-1][1:n + 1]

    return df['title'].iloc[movie_idx].tolist()


@app.get("/recommend")
def get_recommendation(title: str, n: int = 10):
    results = recommendation(title, n)
    return {
        "input movie": title,
        "recommendation": results
    }
