from .base import *

db_url = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'db.sqlite3'))
default_db = dj_database_url.config(default=db_url, conn_max_age=500)
DATABASES['default'].update(default_db)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}