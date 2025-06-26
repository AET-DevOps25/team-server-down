CREATE TABLE "whiteboard" (
                              id BIGSERIAL PRIMARY KEY,
                              title VARCHAR(255),
                              creation_time TIMESTAMP,
                              last_edited_time TIMESTAMP,
                              user_id BIGINT,
                              CONSTRAINT fk_whiteboard_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);
