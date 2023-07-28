from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


origins = [
    "*",
]

app: FastAPI = FastAPI(
    title='botamochi remote controll server',
    description='botamochi remote controll server',
    version='0.0.1'
)

# CORS 対応
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
