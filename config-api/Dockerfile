FROM python:3.7-alpine

EXPOSE 80

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN apk add --no-cache python3-dev libffi-dev gcc musl-dev make
RUN pip install cryptography
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]