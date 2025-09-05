@echo off
echo Setting up Django E-commerce Backend...

REM Create virtual environment
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Run migrations
python manage.py makemigrations
python manage.py migrate

REM Populate database with sample data
python manage.py populate_db

echo Backend setup complete!
echo To start the server, run: python manage.py runserver
