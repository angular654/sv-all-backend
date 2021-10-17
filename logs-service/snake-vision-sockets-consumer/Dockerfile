FROM python:3.9-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers build-base
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE ${LOGS_SERVICE_PORT}
COPY . .
CMD ["flask", "run"]