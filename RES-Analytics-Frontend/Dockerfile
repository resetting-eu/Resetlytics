# Use an official Node runtime as a parent image
FROM node:18.17.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first, then run npm install
COPY package*.json ./
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Next.js app
RUN npm run build

# Define the environment variable
ENV NODE_ENV production

# Specify the port
EXPOSE 3000

# Run next.js app
CMD ["npm", "start"]
