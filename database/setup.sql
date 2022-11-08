DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS chat;
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

INSERT INTO game
    (game_type, game_topic, game_description)
VALUES
    ('adventure', 'greek', 'adventure game set in the greek time period');

INSERT INTO scene
    (bg_img, game_id)
VALUES
    ('some_url', 1);

INSERT INTO item
    (scene_id, item_name, item_text_event, item_required)
VALUES
    (1, 'stick', 'greeks used this item to whack stuff', TRUE);

INSERT INTO chat
    (scene_id, chat_text)
VALUES
    (1, 'go to the market with your stick!');