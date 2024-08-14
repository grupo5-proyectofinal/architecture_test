from pathlib import Path
import environ
import os
from google.oauth2 import service_account

env = environ.Env()


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENVIRONMENT = env('ENV', default='')

env_path = os.path.join(BASE_DIR, 'env')

if ENVIRONMENT == 'prod':
    environ.Env.read_env(os.path.join(env_path, 'prod.env'))
elif ENVIRONMENT == 'stg':
    environ.Env.read_env(os.path.join(env_path, 'stg.env'))
else:
    environ.Env.read_env(os.path.join(env_path, '.env'))

DEBUG = env('DEBUG')
SECRET_KEY = env('SECRET_KEY')


ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=["*"])


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'poolshop.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'poolshop.wsgi.application'


DATABASES = {
    'default': env.db(),
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = env('STATIC_URL')
MEDIA_URL = env('MEDIA_URL')

if ENVIRONMENT == '':
    STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")
else:
    STATICFILES_DIRS = []
    MEDIA_ROOT = ''

if env.bool("USE_GOOGLE_STORAGE"):
    GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
        os.path.join(BASE_DIR, 'service-account.json') 
    )
    STORAGES = {
        "default": {"BACKEND": "storages.backends.gcloud.GoogleCloudStorage"},
        "staticfiles": {"BACKEND": "storages.backends.gcloud.GoogleCloudStorage"},
    }
    GS_PROJECT_ID = env('GS_PROJECT_ID')
    GS_BUCKET_NAME = env('GS_BUCKET_NAME')
    GS_DEFAULT_ACL = "publicRead"
    GS_CUSTOM_ENDPOINT = f"https://{GS_BUCKET_NAME}.storage.googleapis.com"
    GS_IS_GZIPPED = True


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
