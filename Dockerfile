FROM node:16-alpine AS build

# Set the working directory
WORKDIR /app

RUN npm install next react react-dom

# Copy the package.json file and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the Next.js project
RUN npm run build

FROM nginx:1.19.2-alpine

# Copy the built files from the build stage
COPY --from=build /app/.next /usr/share/nginx/html/.next
COPY --from=build /app/public /usr/share/nginx/html/public

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
