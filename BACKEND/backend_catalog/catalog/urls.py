from django.urls import path
from .views import *

urlpatterns = [
    path('test/', simple_test),
    path('test-post/', simple_post_test),

    # Owners
        ## GETs
    path('characters/', return_all_characters),
    path('characters/<int:character_id>/factions/', return_all_factions_by_character),
        ## POSTs
    path('characters/create', create_character),
        ## DELETEs
    # path('characters/delete/<int:character_id>', delete_character)
]

