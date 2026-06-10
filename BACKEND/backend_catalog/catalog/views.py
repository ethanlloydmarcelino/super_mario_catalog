from django.http import HttpResponse, JsonResponse
from .models import *

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