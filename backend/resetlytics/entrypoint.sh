#!/bin/bash

APP_PORT=${PORT:-8000}

echo "Waiting for MySql..."
sleep 5

echo "Migrating database..."
pwd
python resetlytics/manage.py makemigrations --noinput
python resetlytics/manage.py migrate --noinput
echo "Database migrated"

# echo "Creating superuser..."
# /opt/venv/bin/python manage.py superuser || true
# echo "Superuser created"

echo "Collecting static files..."
python resetlytics/manage.py collectstatic --noinput
echo "Static files collected"


echo "Starting server..."
gunicorn resetlytics/resetlytics.wsgi:application --bind "127.0.0.1:${APP_PORT}" --workers 4
