CREATE TABLE edges
(
    id            VARCHAR(255) NOT NULL,
    whiteboard_id BIGINT       NOT NULL,
    source        VARCHAR(255),
    source_handle VARCHAR(255),
    target        VARCHAR(255),
    target_handle VARCHAR(255),
    CONSTRAINT pk_edges PRIMARY KEY (id)
);

