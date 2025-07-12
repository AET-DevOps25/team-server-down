ALTER TABLE user_whiteboard_access
    DROP CONSTRAINT fk_user_whiteboard_access_on_whiteboard;

ALTER TABLE user_whiteboard_access
    ADD CONSTRAINT fk_user_whiteboard_access_on_whiteboard
        FOREIGN KEY (whiteboard_id)
            REFERENCES whiteboard(id)
            ON DELETE CASCADE;