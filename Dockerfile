
# Step 1: Build the Angular application
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the Angular source code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Serve the Angular application
FROM nginx:alpine AS runtime

# Copy the built Angular files to Nginx's web root
COPY --from=build /app/dist/music-manager /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# Uncomment if you have a custom configuration
#COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
