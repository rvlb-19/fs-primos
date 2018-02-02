from .base import *

'''
Check if DATABASE_URL exists in the environment so we 
can use dj_database_url to set the DB automatically. If 
not, we use our environment.py files to configure 
manually a psql database.
'''
if 'DATABASE_URL' in os.environ:
    default_db = dj_database_url.config(conn_max_age=500)
else:
    db_url = 'postgres://{}:{}@{}:{}/{}'.format(
        config('POSTGRES_DB_USER'), # USER
        config('POSTGRES_DB_PASSWORD'), #PASSWORD
        config('POSTGRES_DB_HOST', default='localhost'), #HOST
        config('POSTGRES_DB_PORT', default=''), #PORT
        config('POSTGRES_DB_NAME') #NAME
    )
    default_db = dj_database_url.config(default=db_url, conn_max_age=500)

DATABASES['default'].update(default_db)