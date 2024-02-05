# Use Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["yarn", "run", "start:prod"]