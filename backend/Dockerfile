# Use an official Python runtime as a parent image
FROM python:3.11

# Set the working directory in the container
WORKDIR /backend

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYCODE 1

RUN pip install --upgrade pip

# Install Gunicorn
RUN pip install gunicorn

# Copy (to WORKDIR) and install Python dependencies
COPY ./resetlytics/requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt

# Copy all local files into the image
COPY . ./backend/

# Expose the port that guincorn will use
EXPOSE 8000

# Ensure the backend is run only after mysql connection is available
# RUN chmod a+x wait-for-it.sh

COPY ./resetlytics/entrypoint.sh /backend/
COPY ./database/initdb.sh /backend/

RUN sed -i 's/\r$//g' entrypoint.sh
RUN chmod +x entrypoint.sh

RUN sed -i 's/\r$//g' initdb.sh
RUN chmod +x initdb.sh

# Command to start the gunicorn server
# CMD ["./wait-for-it.sh", "mariadb:3306", "--", "uwsgi", "-w", "backend:app", "-s", ":5000"]

CMD [ "entrypoint.sh", "initdb.sh" ]