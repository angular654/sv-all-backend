from typing import Optional

from fastapi import FastAPI
import uvicorn
from Controller import Controller
from Controller import RequestData
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
ctrl = Controller()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return ctrl.service_info()


@app.post("/upload-script")
def upload(data: RequestData):
    return ctrl.upload_info(data)
