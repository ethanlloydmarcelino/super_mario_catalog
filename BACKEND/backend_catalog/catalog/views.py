from django.http import HttpResponse, JsonResponse
from .models import *
from django.shortcuts import get_object_or_404
import json

def create_faction(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        faction = Factions.objects.create(
            character_id = data.get('character_id'),
            faction_name = data['faction_name'],
            description = data.get('description') # This will return None if the key is not found
        )
        
        return JsonResponse({
            "id": faction.id,
            "character_id": faction.character_id,
            "faction_name": faction.faction_name,
            "description": faction.description
        })
    else:
        return HttpResponse('This is a POST only endpoint!', status=405)

def delete_faction(request, faction_id):
    if request.method == 'DELETE':
        faction = get_object_or_404(Factions, pk=faction_id)

        faction.delete()

        return HttpResponse(f'Faction with id {faction_id} was deleted!', status=200)
    else:
        return HttpResponse('This is a DELETE only endpoint!', status=405)

def update_faction(request, faction_id):
    if request.method == 'PATCH':
        faction = get_object_or_404(Factions, pk=faction_id)
        data = json.loads(request.body)

        if 'character' in data:
            faction.character_id = data['character']
        
        if 'faction_name' in data:
            faction.faction_name = data['faction_name']

        if 'description' in data:
            faction.description = data['description']

        faction.save()

        return JsonResponse({
            "id": faction.id,
            "character": faction.character_id,
            "faction_name": faction.faction_name,
            "description": faction.description
        })
    else:
        return HttpResponse('This is a PATCH only endpoint!', status=405)

def view_all_characters(request):
    characters_all_view = CharactersAllView.objects.all()
    characters_all_view_serialized = []

    for character in characters_all_view:
        characters_all_view_serialized.append(
            {
                "id": character.id,
                "name": character.name,
                "main_ability": character.main_ability,
                "role_id": character.role_id,
                "description": character.description,
                "role_name": character.role_name,
                "faction_name": character.faction_name,
                "species_name": character.species_name
            }
        )

    print(characters_all_view_serialized)

    return JsonResponse(characters_all_view_serialized, safe=False)

def update_character(request, character_id):
    if request.method == 'PATCH':
        character = get_object_or_404(Characters, pk=character_id)
        data = json.loads(request.body)

        if 'name' in data:
            character.name = data['name']
        
        if 'first_appearance' in data:
            character.first_appearance = data['first_appearance']

        if 'home_location' in data:
            character.home_location = data['home_location']

        if 'main_ability' in data:
            character.main_ability = data['main_ability']

        if 'is_playable' in data:
            character.is_playable = data['is_playable']

        if 'popularity_rating' in data:
            character.popularity_rating = data['popularity_rating']

        if 'notes' in data:
            character.notes = data['notes']

        character.save()

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
        return HttpResponse('This is a PATCH only endpoint!', status=405)

def delete_character(request, character_id):
    if request.method == 'DELETE':
        character = get_object_or_404(Characters, pk=character_id)

        character.delete()

        return HttpResponse(f'Character with id {character_id} was deleted!', status=200)
    else:
        return HttpResponse('This is a DELETE only endpoint!', status=405)

def create_character(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        character = Characters.objects.create(
            name = data['name'],
            first_appearance = data.get('first_appearance'),
            home_location = data.get('home_location'),
            main_ability = data.get('main_ability'),
            is_playable = data.get('is_playable'),
            popularity_rating = data.get('popularity_rating'),
            notes = data.get('notes')
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