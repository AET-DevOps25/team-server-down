ALTER TABLE "user"
    ADD email VARCHAR(255);

ALTER TABLE "user"
    ADD first_name VARCHAR(255);

ALTER TABLE "user"
    ADD last_name VARCHAR(255);

ALTER TABLE "user"
    ADD username VARCHAR(255);

ALTER TABLE "user"
    ALTER COLUMN email SET NOT NULL;

CREATE INDEX idx_user_email ON "user" (email);

ALTER TABLE "user"
    DROP COLUMN name;

CREATE SEQUENCE IF NOT EXISTS user_id_seq;
ALTER TABLE "user"
    ALTER COLUMN id SET NOT NULL;
ALTER TABLE "user"
    ALTER COLUMN id SET DEFAULT nextval('user_id_seq');

ALTER SEQUENCE user_id_seq OWNED BY "user".id;