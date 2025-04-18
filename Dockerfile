# Use the official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps


# Copy the rest of the application
COPY . .

# Expose port 80
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
