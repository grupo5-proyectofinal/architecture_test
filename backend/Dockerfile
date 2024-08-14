FROM python:3.12-slim

ARG ENVIRONMENT

ENV ENVIRONMENT=$ENVIRONMENT

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
COPY ./service-account.json /app/service-account.json

RUN pip install --upgrade pip && \
    pip3 install -r /app/requirements.txt

COPY . /app/

EXPOSE 8080

CMD ["uvicorn", "poolshop.asgi:application", "--host", "0.0.0.0", "--port", "8080"]


