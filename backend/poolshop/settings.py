from pathlib import Path
import environ
import os
import google.auth

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
    'rest_framework',
    'drf_spectacular',
    'user',
    'pool',
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




if env.bool("USE_GOOGLE_STORAGE"):
    credentials, project_id = google.auth.default()
    GS_CREDENTIALS = credentials
    STORAGES = {
        "default": {"BACKEND": "storages.backends.gcloud.GoogleCloudStorage"},
        "staticfiles": {"BACKEND": "storages.backends.gcloud.GoogleCloudStorage"},
    }
    GS_PROJECT_ID = project_id
    GS_DEFAULT_ACL = "publicRead"
    GS_BUCKET_NAME = env('GS_BUCKET_NAME')
    GS_DEFAULT_ACL = "publicRead"
    GS_CUSTOM_ENDPOINT = f"https://{GS_BUCKET_NAME}.storage.googleapis.com"
    GS_IS_GZIPPED = True


if ENVIRONMENT == 'stg' or ENVIRONMENT == 'prod':
    STATIC_URL = env('STATIC_URL')
    MEDIA_URL = env('MEDIA_URL')
else:
    STATIC_URL = os.path.join(BASE_DIR, "static/")
    MEDIA_URL = os.path.join(BASE_DIR, "media/")

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'user.Usuario'


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'auth.auth.JWTAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

JWT_CONF = {
    'TOKEN_LIFETIME_HOURS': 5  # Duración del token en horas
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'PoolShop API',
    'DESCRIPTION': 'Endpoints de la API',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': True,  # Para incluir o no el esquema en la respuesta
}