ALTER TABLE nodes
    ADD CONSTRAINT fk_nodes_whiteboard
        FOREIGN KEY (whiteboard_id)
            REFERENCES whiteboard(id)
            ON DELETE CASCADE;

ALTER TABLE edges
    ADD CONSTRAINT fk_edges_whiteboard
        FOREIGN KEY (whiteboard_id)
            REFERENCES whiteboard(id)
            ON DELETE CASCADE;

ALTER TABLE viewports
    ADD CONSTRAINT fk_viewports_whiteboard
        FOREIGN KEY (whiteboard_id)
            REFERENCES whiteboard(id)
            ON DELETE CASCADE;
