#!/bin/sh

echo "Check if database is running..."

python manage.py makemigrations
python manage.py migrate


exec "$@"