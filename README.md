# super_mario_catalog
This is Ethan's project

## Super Mario Character Catalog

A full-stack catalog application for exploring and managing characters from the
Super Mario universe. The project connects a React user interface to a Django
backend and a relational MySQL database.

This application was created as a Grade 12 software development project. It
demonstrates practical experience with frontend development, backend endpoints,
database relationships, SQL views, debugging, and full-stack integration.

> **Project status:** Active educational project. Features and documentation
> continue to improve as new concepts are learned.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [Using the Application](#using-the-application)
- [Challenges and Lessons Learned](#challenges-and-lessons-learned)
- [Future Improvements](#future-improvements)
- [SQL Scripts](#sql-scripts)
- [API](#api)

## Project Overview

The Super Mario Character Catalog organizes characters and their associated
roles, factions, and species. Users interact with the React frontend, which
sends HTTP requests to Django. Django processes those requests and reads from or
writes to the MySQL database.

The project goes beyond storing characters in a single table. It uses foreign
keys, cascading relationships, a junction table for character roles, and a SQL
view that combines information from several tables for display.

## Features

- Browse character, role, faction, and species records.
- Add new catalog records through reusable modal forms.
- Update supported catalog information.
- Delete records through Django backend endpoints.
- Model a many-to-many relationship between characters and roles.
- Combine related information using the `characters_all_view` SQL view.
- Navigate between catalog sections with React Router.
- Display structured data using Material UI components.
- Connect the frontend and backend with asynchronous Fetch API requests.

## Technology Stack

### Frontend

- React 19
- JavaScript
- Vite
- React Router
- Material UI and Material UI Data Grid
- Styled Components
- Fetch API

### Backend

- Python
- Django 6
- Django CORS Headers
- MySQL client for Python
- Python Dotenv

### Database and development tools

- MySQL
- SQL tables, foreign keys, cascading deletes, and a join view
- Git and GitHub for version control
- npm for frontend dependency management

## Application Architecture

```text
Browser
   |
   | HTTP requests and JSON responses
   v
React + Vite frontend (localhost:5173)
   |
   | Fetch API
   v
Django backend (localhost:8000)
   |
   | Django models and MySQL driver
   v
MySQL database
```

The frontend is located in `FRONTEND/`. The Django project is located in
`BACKEND/backend_catalog/`, and the catalog application contains the models,
views, and URL routes used by the API.

## Database Design

The database uses the following main tables:

| Table | Purpose |
| --- | --- |
| `characters` | Stores the main information for each character. |
| `roles` | Stores reusable character roles such as Hero or Villain. |
| `characters_roles` | Connects characters and roles through a many-to-many relationship. |
| `factions` | Stores the group or organization associated with a character. |
| `species` | Stores species information associated with a character. |
| `characters_all_view` | Read-only join view that combines related catalog information. |

The `characters_roles` junction table allows one character to have multiple
roles and one role to belong to multiple characters. Foreign keys use database
cascades where appropriate so dependent junction records do not become orphaned.

## Getting Started

### Prerequisites

Install the following software before running the project:

- Python 3
- Node.js and npm
- MySQL Server
- Git

### 1. Clone the repository

```bash
git clone <repository-url>
cd super_mario_catalog
```

Replace `<repository-url>` with the URL of this GitHub repository.

### 2. Create the MySQL database

Create a MySQL database, then run the table and view definitions in the
[SQL Scripts](#sql-scripts) section. The sample inserts can be used to populate
the catalog with demonstration data.

### 3. Configure the backend environment

Create `BACKEND/backend_catalog/.env` and add the local database settings:

```dotenv
DB_NAME=super_mario_catalog
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3306
```

The `.env` file contains private local credentials and should not be committed
to source control.

### 4. Install and start the backend

From the repository root:

```bash
cd BACKEND/backend_catalog
python -m venv .venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install the backend packages and start Django:

```bash
python -m pip install django mysqlclient django-cors-headers python-dotenv
python manage.py check
python manage.py runserver
```

The backend will normally be available at `http://localhost:8000`.

### 5. Install and start the frontend

Open a second terminal from the repository root:

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend will normally be available at `http://localhost:5173`.

## Using the Application

1. Start MySQL and confirm the project database is available.
2. Start the Django backend.
3. Start the Vite frontend in a second terminal.
4. Open `http://localhost:5173` in a browser.
5. Use the navigation bar to explore characters, roles, factions, and species.

## Challenges and Lessons Learned

### Modeling relational data

The project uses a junction table because characters can have more than one
role. Building this relationship provided experience with primary keys, foreign
keys, uniqueness constraints, and cascading deletes.

### Working with a read-only SQL view

One debugging challenge occurred while deleting a role. The Django model
initially represented `characters_all_view.role_id` as a cascading foreign key.
Django therefore attempted to delete related rows from the join view, which
MySQL rejected because the view is not deletable.

The solution was to represent the view's `role_id` as a regular
`BigIntegerField`. The real foreign-key relationship remains on
`CharactersRoles.role`, where cascading behavior belongs. This issue provided a
practical lesson in the difference between database tables, read-only views, and
Django's deletion collector.

### Full-stack communication

Connecting React and Django provided experience with asynchronous requests,
JSON responses, HTTP methods, URL routing, CORS configuration, error handling,
and keeping the user interface synchronized with backend data.

## Future Improvements

- Add automated tests for Django endpoints and React components.
- Add search, filtering, sorting, and pagination.
- Improve validation and user-facing error messages.
- Complete consistent create, update, and delete support for every section.
- Add character images with accessible alternative text.
- Improve responsive behavior for phones and tablets.
- Add authentication and permissions for administrative operations.
- Create pinned dependency files for reproducible backend installation.
- Deploy the frontend, backend, and database for a public demonstration.
- Add an entity-relationship diagram and updated application screenshots.

## Academic Portfolio Context

This repository is intended to show the development process as well as the final
result. Its source code, database design, debugging notes, and commit history
demonstrate continued learning and the ability to connect multiple technologies
in one working application.

Super Mario and related names and characters are trademarks of Nintendo. This
is a non-commercial educational fan project and is not affiliated with or
endorsed by Nintendo.

### SQL Scripts
```sql

CREATE TABLE IF NOT EXISTS characters (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    first_appearance VARCHAR(255),
    home_location VARCHAR(255),
    main_ability VARCHAR(255),
    is_playable BOOLEAN DEFAULT FALSE,
    popularity_rating INT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS factions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    character_id BIGINT NOT NULL,
    faction_name VARCHAR(255) NOT NULL,
    description TEXT,
	FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS species (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    character_id BIGINT NOT NULL,
    species_name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
	FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS characters_roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    character_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    description TEXT,
	FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
	FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
	UNIQUE (character_id, role_id)
);

CREATE VIEW characters_all_view AS
SELECT
	CHA.id,
    CHA.name,
    CHA.main_ability,
    ROLES.role_id,
    ROLES.description,
    R.role_name,
    FAC.faction_name,
    SPE.species_name
FROM 
	characters AS CHA
    INNER JOIN characters_roles AS ROLES
    ON CHA.id = ROLES.character_id
    INNER JOIN roles AS R
    ON R.id = ROLES.role_id
    INNER JOIN factions AS FAC
    ON FAC.character_id = CHA.id
    INNER JOIN species AS SPE
    ON SPE.character_id = CHA.id
```

### Django model for `characters_all_view`

`characters_all_view` is a read-only MySQL join view. Its `role_id` value comes
from `characters_roles.role_id`; it is not a column on the `roles` table.

In Django, map this value as a regular integer field:

```python
class CharactersAllView(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    main_ability = models.CharField(max_length=255, blank=True, null=True)
    role_id = models.BigIntegerField(db_column="role_id")
    description = models.TextField(blank=True, null=True)
    role_name = models.CharField(max_length=255)
    faction_name = models.CharField(max_length=255)
    species_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = "characters_all_view"
```

Do not define this field as a `ForeignKey` with `on_delete=models.CASCADE`.
Doing so makes Django's deletion collector attempt to delete related rows from
the join view when a role is deleted, and MySQL rejects that operation with
error 1395 (`Can not delete from join view`). The real cascading relationship
remains on `CharactersRoles.role`, which maps to the `characters_roles` table.

<img width="1536" height="1024" alt="super_mario_catalog" src="https://github.com/user-attachments/assets/92aac6f3-045a-4523-b16f-9d3e6f77173f" />


## Sample SQL Inserts
```sql
-- Super Mario characters
INSERT INTO characters
(id, name, first_appearance, home_location, main_ability, is_playable, popularity_rating, notes)
VALUES
(1, 'Mario', 'Donkey Kong', 'Mushroom Kingdom', 'Jumping and power-up usage', TRUE, 100, 'Hero of the Mushroom Kingdom and one of the most iconic Nintendo characters.'),
(2, 'Luigi', 'Mario Bros.', 'Mushroom Kingdom', 'High jumping and ghost hunting', TRUE, 96, 'Mario''s younger brother, known for his higher jumps and nervous personality.'),
(3, 'Princess Peach', 'Super Mario Bros.', 'Peach''s Castle', 'Floating jump and royal magic', TRUE, 95, 'Ruler of the Mushroom Kingdom and frequent target of Bowser''s kidnappings.'),
(4, 'Bowser', 'Super Mario Bros.', 'Bowser''s Castle', 'Fire breath and brute strength', TRUE, 94, 'King of the Koopas and Mario''s main rival.'),
(5, 'Toad', 'Super Mario Bros.', 'Mushroom Kingdom', 'Speed and helpful support', TRUE, 88, 'A loyal attendant of Princess Peach and a recurring ally.'),
(6, 'Yoshi', 'Super Mario World', 'Yoshi''s Island', 'Tongue grab and egg throwing', TRUE, 97, 'Friendly dinosaur who helps Mario on many adventures.'),
(7, 'Princess Daisy', 'Super Mario Land', 'Sarasaland', 'Athletic skill and flower power', TRUE, 90, 'Energetic princess of Sarasaland.'),
(8, 'Wario', 'Super Mario Land 2: 6 Golden Coins', 'Diamond City', 'Strength and shoulder charge', TRUE, 89, 'Greedy rival of Mario with great physical power.'),
(9, 'Waluigi', 'Mario Tennis', 'Unknown', 'Trickery and long reach', TRUE, 87, 'Luigi''s lanky rival, often appearing in sports and party games.'),
(10, 'Rosalina', 'Super Mario Galaxy', 'Comet Observatory', 'Cosmic magic', TRUE, 93, 'Guardian of the Lumas and watcher of the cosmos.'),
(11, 'Donkey Kong', 'Donkey Kong', 'Donkey Kong Island', 'Great strength and barrel throwing', TRUE, 92, 'Powerful ape and longtime Nintendo character connected to Mario history.'),
(12, 'Bowser Jr.', 'Super Mario Sunshine', 'Bowser''s Castle', 'Magic paintbrush and machines', TRUE, 86, 'Bowser''s son, often helping with schemes against Mario.');

-- Roles
INSERT INTO roles
(id, role_name, description)
VALUES
(1, 'Hero', 'Main protagonist or heroic playable character.'),
(2, 'Princess', 'Royal character associated with a kingdom.'),
(3, 'Villain', 'Main antagonist or enemy character.'),
(4, 'Sidekick', 'Supporting ally who helps the hero.'),
(5, 'Rival', 'Competitive character who challenges the hero.'),
(6, 'Creature Ally', 'Non-human ally or companion character.'),
(7, 'Cosmic Guardian', 'Character associated with space or cosmic protection.'),
(8, 'Boss Character', 'Major enemy or boss-level character.');

-- Factions
INSERT INTO factions
(character_id, faction_name, description)
VALUES
(1, 'Mushroom Kingdom Heroes', 'Heroes who protect the Mushroom Kingdom from threats.'),
(2, 'Mushroom Kingdom Heroes', 'Heroes who protect the Mushroom Kingdom from threats.'),
(3, 'Mushroom Kingdom Royalty', 'Royal family and leadership of the Mushroom Kingdom.'),
(4, 'Koopa Troop', 'Bowser''s army of Koopas, Goombas, and other minions.'),
(5, 'Mushroom Kingdom Citizens', 'Residents and attendants of the Mushroom Kingdom.'),
(6, 'Yoshi Clan', 'Friendly Yoshis from Yoshi''s Island.'),
(7, 'Sarasaland Royalty', 'Royal leadership of Sarasaland.'),
(8, 'WarioWare Crew', 'Wario''s group associated with Diamond City.'),
(9, 'Wario Allies', 'Characters commonly associated with Wario and rival activities.'),
(10, 'Comet Observatory', 'Rosalina and the Lumas who watch over the cosmos.'),
(11, 'DK Crew', 'Donkey Kong and allies from Donkey Kong Island.'),
(12, 'Koopa Troop', 'Bowser Jr. serves Bowser and the Koopa army.');

-- Species
INSERT INTO species
(character_id, species_name, description)
VALUES
(1, 'Human', 'A human plumber and hero.'),
(2, 'Human', 'A human plumber and Mario''s brother.'),
(3, 'Human', 'Human princess of the Mushroom Kingdom.'),
(4, 'Koopa', 'Large turtle-like king of the Koopas.'),
(5, 'Toad', 'Mushroom-like citizen of the Mushroom Kingdom.'),
(6, 'Yoshi', 'Friendly dinosaur-like species.'),
(7, 'Human', 'Human princess of Sarasaland.'),
(8, 'Human', 'Human rival of Mario.'),
(9, 'Human', 'Human rival of Luigi.'),
(10, 'Human', 'Cosmic guardian with magical abilities.'),
(11, 'Kong', 'Powerful ape from Donkey Kong Island.'),
(12, 'Koopa', 'Young Koopa and son of Bowser.');

-- Character-role relationships.
INSERT INTO characters_roles
(character_id, role_id, description)
VALUES
(1, 1, 'Primary hero of the Super Mario series.'),
(2, 1, 'Heroic brother of Mario and frequent playable character.'),
(2, 4, 'Often supports Mario during adventures.'),
(3, 2, 'Princess of the Mushroom Kingdom.'),
(3, 1, 'Playable heroic character in several Mario games.'),
(4, 3, 'Main villain of the Super Mario series.'),
(4, 8, 'Frequently appears as a final boss.'),
(5, 4, 'Helpful ally and attendant of Princess Peach.'),
(6, 6, 'Creature ally who assists Mario with unique abilities.'),
(6, 1, 'Playable hero in several Mario titles.'),
(7, 2, 'Princess of Sarasaland.'),
(7, 1, 'Playable heroic character in many spin-off games.'),
(8, 5, 'Greedy rival of Mario.'),
(9, 5, 'Rival of Luigi and recurring competitor.'),
(10, 7, 'Guardian of the cosmos and caretaker of the Lumas.'),
(10, 1, 'Playable heroic character in multiple Mario games.'),
(11, 1, 'Heroic Kong character connected to Mario history.'),
(12, 3, 'Recurring villain who helps Bowser.'),
(12, 8, 'Appears as a boss or major enemy in several games.');

```

# API

/catalog/characters-get-all/ - GET all characters

/catalog/characters/<int:character_id>/factions/ - GET the faction for character id

/catalog/characters/<int:character_id>/species/ - GET the species for character id

/catalog/characters/create/ - POST new character

/catalog/characters/delete/<int:character_id>/ - DELETE character

/catalog/characters/update/<int:character_id>/ - PATCH character

/catalog/characters-all-view/ - VIEW character

/catalog/factions/create/ - POST new faction

/catalog/factions/delete/<int:faction_id>/ - DELETE faction

/catalog/factions/update/<int:faction_id>/ - PATCH faction

/catalog/species/create/ - POST new species

/catalog/species/delete/<int:species_id>/ - DELETE species

/catalog/species/update/<int:species_id>/ - PATCH species
