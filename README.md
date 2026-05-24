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
