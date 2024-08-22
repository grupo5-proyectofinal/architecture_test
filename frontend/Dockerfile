FROM node:16 as build

WORKDIR /app

COPY frontend/package*.json ./frontend/

RUN cd frontend && npm install

COPY frontend/ ./frontend/

RUN cd frontend && npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=build /app/frontend/build ./build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]

