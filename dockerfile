FROM node:16-alpine AS builder
COPY ./basic-frontend /frontend
WORKDIR /frontend
RUN npm install
RUN npm run-script prod

FROM node:16-alpine
COPY ./basic-backend /opt/widget-it/backend
COPY --from=builder /frontend/dist/ /opt/widget-it/frontend/dist
WORKDIR /opt/widget-it/backend
RUN npm install 

EXPOSE 3000

CMD [ "npm", "run-script", "start" ]

