# FROM python:3.9.4-alpine
# WORKDIR /code
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0
# RUN apk add --no-cache python3-dev libffi-dev gcc musl-dev make
# COPY requirements.txt requirements.txt
# RUN  apk update \
#    && apk add --no-cache build-base && pip install -r requirements.txt && pip install Cython
# EXPOSE ${LOGS_SERVICE_PORT}
# COPY . .
# CMD ["flask", "run"]
FROM python:3.5-slim
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN pip install Cython
RUN pip install --upgrade pip
RUN pip install --upgrade gevent
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE ${LOGS_SERVICE_PORT}
COPY . .
CMD ["flask", "run"]