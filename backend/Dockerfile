FROM python:3.12-slim

ARG ENVIRONMENT

ENV ENVIRONMENT=$ENVIRONMENT

WORKDIR /app

# Instala las dependencias del sistema necesarias para compilar psycopg2
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    gcc \
    python3-dev

COPY ./requirements.txt /app/requirements.txt

RUN pip install --upgrade pip && \
    pip3 install -r /app/requirements.txt

COPY . /app/
 
EXPOSE 8080

CMD ["uvicorn", "poolshop.asgi:application", "--host", "0.0.0.0", "--port", "8080"]


