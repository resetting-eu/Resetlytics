# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /usr/src/resetlytics

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYCODE 1
#ENV PIP_DISABLE_PIP_VERSION_CHECK 1
RUN pip install --upgrade pip

# Copy (to WORKDIR) and install Python dependencies
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' entrypoint.sh && chmod +x entrypoint.sh

# Copy local files into the image (only now - check best practices)
COPY . .

# Notice: ensure the backend is run only after mysql connection is available

# ENTRYPOINT [ "/usr/src/resetlytics_backend/entrypoint.sh" ]

