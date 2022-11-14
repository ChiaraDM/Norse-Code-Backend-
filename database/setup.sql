DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS scene;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS game;

CREATE TABLE game (
    game_id INT GENERATED ALWAYS AS IDENTITY,
    game_type VARCHAR(30) NOT NULL,
    game_topic VARCHAR(30) NOT NULL,
    game_description VARCHAR(500),
    game_level VARCHAR(30) NOT NULL,
    game_subject VARCHAR(30) NOT NULL,
    game_name VARCHAR(30) NOT NULL,
    game_bg_img VARCHAR(30),
    available BOOLEAN NOT NULL,
    PRIMARY KEY (game_id)
);

CREATE TABLE scene (
    scene_id INT GENERATED ALWAYS AS IDENTITY,
    bg_img VARCHAR(200),
    game_id INT NOT NULL,
    PRIMARY KEY (scene_id),
    FOREIGN KEY (game_id) REFERENCES game("game_id")
);

CREATE TABLE item (
    item_id INT GENERATED ALWAYS AS IDENTITY,
    scene_id INT NOT NULL,
    item_name VARCHAR(30),
    item_text_event VARCHAR(300),
    item_required BOOLEAN,
    PRIMARY KEY (item_id),
    FOREIGN KEY (scene_id) REFERENCES scene("scene_id")
);

CREATE TABLE chat (
    chat_id INT GENERATED ALWAYS AS IDENTITY,
    scene_id INT NOT NULL,
    chat_text VARCHAR(300),
    PRIMARY KEY (chat_id),
    FOREIGN KEY (scene_id) REFERENCES scene("scene_id")
);

CREATE TABLE card (
    card_id INT GENERATED ALWAYS AS IDENTITY,
    game_id INT NOT NULL,
    card_order INT NOT NULL,
    card_img_path VARCHAR(200),
    card_date VARCHAR(6),
    card_description VARCHAR(500), 
    PRIMARY KEY (card_id),
    FOREIGN KEY (game_id) REFERENCES game("game_id")
);

INSERT INTO game
    (game_type, game_topic, game_description, game_level, game_subject, game_name, game_bg_img, available)
VALUES
    ('adventure', 'greek', 'adventure game set in the greek time period', 'KS1', 'History', 'Adventure through Greece', 'game background image 1', TRUE),
    ('adventure', 'roman', 'adventure game set in the roman time period', 'KS1', 'History', 'Adventure through Rome', 'game background image 2', FALSE),
    ('timeline', 'roman invasion', 'timeline game for the roman invasion', 'KS1', 'History', 'Time Travelling Tim', 'game background image 3', TRUE),
    ('philosophy example', 'philosophy example', 'super fun philosophy game', 'KS2', 'Philosophy', 'philosophy example', 'game background image 4', FALSE),
    ('geography example', 'geography example', 'super fun geography game', 'KS1', 'Geography', 'geography example', 'game background image 5', FALSE),
    ('art history example', 'art history example', 'super fun art history game', 'KS2', 'Art History', 'art history example', 'game background image 6', FALSE);

INSERT INTO scene
    (bg_img, game_id)
VALUES
    ('greek_bg_url', 1),
    ('greek_bg_url_2', 1),
    ('roman_bg_url', 2);

INSERT INTO item
    (scene_id, item_name, item_text_event, item_required)
VALUES
    (1, 'stick', 'greeks used this item to whack stuff', TRUE),
    (1, 'sword', 'greeks used swords to kill other people', FALSE),
    (2, 'vase', 'greeks used vases to ???', TRUE),
    (3, 'shield', 'romans used shields to block swords and arrows', TRUE);

INSERT INTO chat
    (scene_id, chat_text)
VALUES
    (1, 'go to the market with your stick!'),
    (1, 'go to the temple'),
    (2, 'go to the colosseum'),
    (3, 'go to war');

INSERT INTO card
    (card_order, card_img_path, card_date, card_description, game_id)
VALUES
    (1, '../../../src/assets/timelinePictures/claudius.jpeg', 'AD43', 'Emperor Claudius, invades Britain with an army that includes elephants!', 3),
    (2, '../../../src/assets/timelinePictures/colchester.jpg', 'AD60', 'The Romans try to conquer North Wales. Boudica''s Iceni tribe rebel and burn the towns of Colchester, London and Verulamium to the ground.', 3),
    (3, '../../../src/assets/timelinePictures/wales.jpeg', 'AD73', 'The Romans conquer Wales. They build a network of forts across the country.', 3),
    (4, '../../../src/assets/timelinePictures/agricola.jpeg', 'AD82', 'The Roman general Agricola considers invading Ireland with only 6000 men. It has never been proved that he did invade.', 3),
    (5, '../../../src/assets/timelinePictures/hadrian.jpeg', 'AD122', 'The Emperor Hadrian orders the building of a 74 mile wall to mark the northern limit of his Empire. It runs from Wallsend to Bowness-on-Solway in Cumbria.', 3),
    (6, '../../../src/assets/timelinePictures/scotland.jpeg', 'AD138', 'The Romans tried to invade Scotland again and build a wall of forts named the Antonine Wall. Around AD160 the Romans abandon it and fall back to Hadrian''s Wall.', 3),
    (7, '../../../src/assets/timelinePictures/septimus.jpeg', 'AD208', 'The Emperor Septimius Severus and his sons lead campaigns in Scotland. In AD211 the campaigns are abandoned, along with most Roman forts in Scotland.', 3),
    (8, '../../../src/assets/timelinePictures/constantine.jpeg', 'AD306', 'Constantine ''the Great'' is declared Emperor in York.', 3),
    (9, '../../../src/assets/timelinePictures/ships.jpeg', 'AD410', 'By the early 5th century many Roman troops are sent back to mainland Europe to defend the Empire against Barbarian invasions. Roman rule ends in Britain.', 3);
