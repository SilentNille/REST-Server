# README: Starting the REST-Server Project

This guide explains how to run the REST-Server project both directly and using Docker.

## Running with npm

### Prerequisites
1. Ensure that Node.js and npm are installed on your system.
2. Make sure MongoDB is running locally or accessible at the configured URL.

### Steps to Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server in production mode:
   ```bash
   npm start
   ```

3. Start the server in development mode with automatic restart on file changes:
   ```bash
   npm run dev
   ```

4. Once running, you can access the REST-Server at http://localhost:80

## Running with Docker

### Prerequisites

1. Ensure that Docker is installed and running on your system.
2. Navigate to the project directory where the `docker-commands.sh` file is located.

### Steps to Start the Docker Container

1. Open a terminal and navigate to the project directory:
   ```bash
   cd /Users/pni/Uni/WE2/REST-Server
   ```

2. Run the `docker-commands.sh` script to build and start the Docker container:
   ```bash
   ./db/docker-commands.sh
   ```

3. The script will handle building the Docker image and starting the container. Ensure that the script has executable permissions. If not, you can grant permissions using:
   ```bash
   chmod +x docker-commands.sh
   ```

4. Once the container is running, you can access the REST-Server via the specified port (check the script or Dockerfile for the port configuration).

## Troubleshooting

- If you encounter any issues, ensure that Docker is properly installed and running.
- Check the logs of the container for errors using:
  ```bash
  docker logs <container_id>
  ```
- If the container fails to start, try rebuilding the image:
  ```bash
  docker-compose build
  ```
- For npm issues, try deleting the node_modules folder and running npm install again.

For further assistance, refer to the Docker documentation or contact the project maintainer.