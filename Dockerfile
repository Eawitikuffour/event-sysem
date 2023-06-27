#stage 1 - compile angular app
FROM node:16-alpine as builder

# ARG API_BASE_HOST
# ARG API_BASE_PORT

WORKDIR /var/src

COPY package.json .

RUN npm install --silent

COPY . .

# RUN .change_api.sh
# && \
RUN npm run build

# CMD ./change_api.sh && cat ./src/environments/environment.prod.ts
# CMD cat ./src/environments/environment.prod.ts

FROM nginx:alpine
# COPY --from=builder /var/src/src /user/share/nginx/html

COPY --from=builder /var/src/dist/event-system /user/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 2021


# COPY ./default.conf.template /etc/nginx/conf.d/default.conf.template
# CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
# ENV API_BASE_HOST="http://localhost"
# ENV API_BASE_PORT=3000

# RUN cat ./src/environments/environment.prod.ts
# RUN echo $API_BASE_HOST && echo $API_BASE_PORT

# For angular app - in your package.json add: "build:prod":"ng build --prod"

# stage 2 copy dist to small nginx server
