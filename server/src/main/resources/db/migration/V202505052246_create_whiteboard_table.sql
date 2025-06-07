CREATE TABLE whiteboard_node
(
    id          VARCHAR(255) NOT NULL,
    user_id     BIGINT NOT NULL,
    type        VARCHAR(50),
    position_x  FLOAT,
    position_y  FLOAT,
    label       TEXT,
    is_bold     BOOLEAN DEFAULT FALSE,
    is_italic   BOOLEAN DEFAULT FALSE,
    is_underline BOOLEAN DEFAULT FALSE,
    text_color  VARCHAR(7) DEFAULT '#000000',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_whiteboard_node PRIMARY KEY (id),
    CONSTRAINT fk_node_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE whiteboard_edge
(
    id          VARCHAR(255) NOT NULL,
    user_id     BIGINT NOT NULL,
    source      VARCHAR(255) NOT NULL,
    target      VARCHAR(255) NOT NULL,
    type        VARCHAR(50),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_whiteboard_edge PRIMARY KEY (id),
    CONSTRAINT fk_edge_user FOREIGN KEY (user_id) REFERENCES "user"(id),
    CONSTRAINT fk_edge_source FOREIGN KEY (source) REFERENCES whiteboard_node(id),
    CONSTRAINT fk_edge_target FOREIGN KEY (target) REFERENCES whiteboard_node(id)
);

-- Insert test user
INSERT INTO "user" (id, name) 
VALUES (1, 'Test User');

-- Insert test nodes
INSERT INTO whiteboard_node 
(id, user_id, type, position_x, position_y, label, is_bold, is_italic, is_underline, text_color)
VALUES 
    ('node-1', 1, 'text', 100.0, 100.0, 'Hello World', true, false, false, '#000000'),
    ('node-2', 1, 'text', 300.0, 200.0, 'Second Node', false, true, false, '#0000FF'),
    ('node-3', 1, 'text', 500.0, 300.0, 'Third Node', false, false, true, '#FF0000');

-- Insert test edges
INSERT INTO whiteboard_edge 
(id, user_id, source, target, type)
VALUES 
    ('edge-1', 1, 'node-1', 'node-2', 'default'),
    ('edge-2', 1, 'node-2', 'node-3', 'default');