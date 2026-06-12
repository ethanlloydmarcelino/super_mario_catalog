from django.urls import path
from .views import *

urlpatterns = [
    path('test/', simple_test),
    path('test-post/', simple_post_test),

    # Characters
    path('characters/', return_all_characters),
    path('characters/<int:character_id>/factions/', return_all_factions_by_character),
    path('characters/create', create_character),
    path('characters/delete/<int:character_id>', delete_character),
    path('characters/update/<int:character_id>', update_character),
    path('characters-all-view/', view_all_characters)

    # Factions
    # path('factions/create', create_faction),
    # path('factions/delete/<int:character_id>', delete_faction),
    # path('factions/update/<int:character_id>', update_faction),
]

