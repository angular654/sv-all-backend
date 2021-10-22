FROM python:3.5-slim
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN pip install Cython
RUN pip install --upgrade pip
RUN pip install --upgrade gevent
RUN apt update && apt install -y gcc g++ libffi-dev file
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]