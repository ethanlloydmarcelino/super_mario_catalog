from django.http import HttpResponse, JsonResponse
from .models import *
from django.shortcuts import get_object_or_404
import json



def create_character(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        character = Characters.objects.create(
            name = data['name'],
            first_appearance = data['first_appearance']
        )
        
        return JsonResponse({
            "id": character.id,
            "name": character.name,
            "first_appearance": character.first_appearance,
            "home_location": character.home_location,
            "main_ability": character.main_ability,
            "is_playable": character.is_playable,
            "popularity_rating": character.popularity_rating,
            "notes": character.notes
        })
    else:
        return HttpResponse('This is a POST only endpoint!', status=405)

def return_all_factions_by_character(request, character_id):
    character = get_object_or_404(Characters, pk=character_id)

    factions = Factions.objects.filter(character_id=character_id)    

    factions_serialized = []

    for faction in factions:
        factions_serialized.append(
            {
                "id": faction.id,
                "character_id": faction.character_id,
                "faction_name": faction.faction_name,
                "description": faction.description
            }
        )

    return JsonResponse({
        "character_id": character.id,
        "character_name": character.name,
        "character_first_appearance": character.first_appearance,
        "character_home_location": character.home_location,
        "character_main_ability": character.main_ability,
        "character_is_playable": character.is_playable,
        "character_popularity_rating": character.popularity_rating,
        "character_notes": character.notes,
        "factions": factions_serialized
    })

def return_all_characters(request):
    characters = Characters.objects.all()
    characters_serialized = []

    for character in characters:
        characters_serialized.append(
            {
                "id": character.id,
                "name": character.name,
                "first_appearance": character.first_appearance,
                "home_location": character.home_location,
                "main_ability": character.main_ability,
                "is_playable": character.is_playable,
                "popularity_rating": character.popularity_rating,
                "notes": character.notes
            }
        )

    print(characters_serialized)

    return JsonResponse(characters_serialized, safe=False)

def simple_test(request):
    return HttpResponse('Error 404 page not found :(')

def simple_post_test(request):
    if request.method == 'POST':
        decoded_data = request.body.decode('utf-8')
        print(decoded_data)
        return HttpResponse('Data was received!')
    else:
        return HttpResponse('This is a POST only endpoint!', status=405)