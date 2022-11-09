DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS scene;
DROP TABLE IF EXISTS game;

CREATE TABLE game (
    game_id INT GENERATED ALWAYS AS IDENTITY,
    game_type VARCHAR(30) NOT NULL,
    game_topic VARCHAR(30) NOT NULL,
    game_description VARCHAR(500),
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
    (game_type, game_topic, game_description)
VALUES
    ('adventure', 'greek', 'adventure game set in the greek time period'),
    ('adventure', 'roman', 'adventure game set in the roman time period'),
    ('timeline', 'roman invasion', 'timeline game for the roman invasion');

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
    (3, 'shield', 'romans used shields to block swords and arrows', TRUE);

INSERT INTO chat
    (scene_id, chat_text)
VALUES
    (1, 'go to the market with your stick!'),
    (1, 'go to the temple'),
    (2, 'go to the colosseum');

INSERT INTO card
    (card_order, card_img_path, card_date, card_description, game_id)
VALUES
    (1, 'path to the img', 'AD43', 'Emperor Claudius, invades Britain with an army that includes elephants!', 3),
    (2, 'path to the img', 'AD60', 'The Romans try to conquer North Wales. They first tried this in AD48. Boudica''s Iceni tribe rebel and burn the towns of Colchester, London and Verulamium (St Albans) to the ground.', 3),
    (3, 'path to the img', 'AD73', 'The Romans conquer Wales. They build a network of forts across the country.', 3),
    (4, 'path to the img', 'AD82', 'The Roman general Agricola considers invading Ireland with only 6000 men. It has never been proved that he did invade.', 3),
    (5, 'path to the img', 'AD122', 'The Emperor Hadrian orders the building of a huge wall to mark the northern limit of his Empire. It runs for 74 miles between Wallsend on the River Tyne and Bowness-on-Solway in Cumbria.', 3),
    (6, 'path to the img', 'AD138', 'The Romans tried to invade Scotland again and build a wall of turf and forts named the Antonine Wall, it is used until around AD160 before the Romans abandon it and fall back to Hadrian''s Wall.', 3),
    (7, 'path to the img', 'AD208', 'The Emperor Septimius Severus and his sons Caracalla and Geta, lead campaigns in Scotland. In AD211 the campaigns are abandoned, along with most Roman forts in Scotland.', 3),
    (8, 'path to the img', 'AD306', 'Constantine ''the Great'' is declared Emperor in York.', 3),
    (9, 'path to the img', 'AD410', 'By the early 5th century many Roman troops are sent back to mainland Europe to defend other areas of the Empire against Barbarian invasions. Roman rule ends in Britain.', 3);