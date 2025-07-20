CREATE TABLE nodes
(
    id               VARCHAR(255)     NOT NULL,
    whiteboard_id    BIGINT           NOT NULL,
    type             VARCHAR(255)     NOT NULL,
    position_x       DOUBLE PRECISION NOT NULL,
    position_y       DOUBLE PRECISION NOT NULL,
    label            TEXT,
    width            DOUBLE PRECISION NOT NULL,
    height           DOUBLE PRECISION NOT NULL,
    color            VARCHAR(255),
    border_color     VARCHAR(255),
    border_width     INTEGER,
    border_opacity   DOUBLE PRECISION,
    opacity          DOUBLE PRECISION,
    text_color       VARCHAR(255),
    font_size        INTEGER,
    font_family      VARCHAR(255),
    is_bold          BOOLEAN,
    is_italic        BOOLEAN,
    is_strikethrough BOOLEAN,
    is_underline     BOOLEAN,
    CONSTRAINT pk_nodes PRIMARY KEY (id)
);