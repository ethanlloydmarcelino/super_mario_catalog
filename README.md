# super_mario_catalog
This is Ethan's udemy project

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


```

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

-- Character-role relationships
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