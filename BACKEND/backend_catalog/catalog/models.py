from django.db import models

class Characters(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    first_appearance = models.CharField(max_length=255, blank=True, null=True)
    home_location = models.CharField(max_length=255, blank=True, null=True)
    main_ability = models.CharField(max_length=255, blank=True, null=True)
    is_playable = models.IntegerField(blank=True, null=True)
    popularity_rating = models.IntegerField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'characters'

class Factions(models.Model):
    id = models.BigAutoField(primary_key=True)
    character = models.ForeignKey(Characters, on_delete=models.CASCADE, db_column='character_id')
    faction_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'factions'

class Species(models.Model):
    id = models.BigAutoField(primary_key=True)
    character = models.ForeignKey(Characters, on_delete=models.CASCADE, db_column='character_id')
    species_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'species'

class Roles(models.Model):
    id = models.BigAutoField(primary_key=True)
    role_name = models.CharField(max_length=255)
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'roles'

class CharactersRoles(models.Model):
    id = models.BigAutoField(primary_key=True)
    character = models.ForeignKey(Characters, models.CASCADE)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'characters_roles'
        unique_together = (('character', 'role'),)

class CharactersAllView(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    main_ability = models.CharField(max_length=255, blank=True, null=True)
    role = models.ForeignKey(Roles, on_delete=models.CASCADE, db_column='role_id')
    description = models.TextField(blank=True, null=True)
    role_name = models.CharField(max_length=255)
    faction_name = models.CharField(max_length=255)
    species_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'characters_all_view'

