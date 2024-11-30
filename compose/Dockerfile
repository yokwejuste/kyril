# Base Python Image
FROM python:3.10 as python-base

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Base Node Image
FROM node:16 as node-base

# Set a working directory
WORKDIR /app

# Stage 1: Server Build
FROM python-base as server-build

# Set work directory
WORKDIR /app

# Install dependencies
COPY ./server/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY ./server /app/

# Expose the port the server runs on
EXPOSE 8000

# Stage 2: Client Build
FROM node-base as client-build

# Install app dependencies
COPY ./client/package.json ./client/package-lock.json /app/
RUN npm install

# Copy app source
COPY ./client /app/

# Expose the port the client runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
