FROM node:14.17.4 AS build-step
ENV NODE_ENV production

RUN mkdir -p /app
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json /app
RUN npm install
# Copy app files
COPY . /app

# Start the app
RUN npm run build

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx/
EXPOSE 7200
CMD ["nginx", "-g", "daemon off;"]