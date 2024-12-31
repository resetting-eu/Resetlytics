# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /backend

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYCODE 1
ENV PIP_DISABLE_PIP_VERSION_CHECK 1
RUN pip install --upgrade pip

# Copy (to WORKDIR) and install Python dependencies
COPY ./resetlytics/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install Gunicorn if not yet
RUN pip install gunicorn

# Expose the port that gunicorn will use to serve Django
EXPOSE 8000

# Copy local files into the image (only now - check best practices)
COPY . .

# Notice: ensure the backend is run only after mysql connection is available
