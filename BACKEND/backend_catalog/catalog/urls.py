from django.urls import path
from .views import *

urlpatterns = [
    path('test/', simple_test),
    path('test-post/', simple_post_test),

    # Owners
    path('characters-get-all/', return_all_characters),
]

