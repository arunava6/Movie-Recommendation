import pickle

from fastapi import FastAPI
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

with open("update_df.pkl", "rb") as f:
    df = pickle.load(f)

with open("original_df.pkl","rb") as f:
    original_df=pickle.load(f)

with open("tfidf_matrix.pkl", "rb") as f:
    matrix = pickle.load(f)

with open("indices.pkl", "rb") as f:
    indices = pickle.load(f)


def recommendation(title: str, n=5):
    title = title.lower().strip()
    matches = df[df['title'].str.lower().str.strip() == title]
    if matches.empty:
        return ["movie not found"]

    idx = matches.index[0]

    sim_score = cosine_similarity(matrix[idx], matrix).flatten()
    movie_idx = sim_score.argsort()[::-1][1:n + 1]

    recommended_ids = df.iloc[movie_idx]['movie_id'].tolist()
    result = original_df[
        original_df['movie_id'].isin(recommended_ids)
    ][['movie_id', 'title', 'poster_path', 'release_date']]

    return result.to_dict(orient="records")

@app.get("/recommend")
def get_recommendation(title: str, n: int = 5):
    results = recommendation(title, n)
    return results

