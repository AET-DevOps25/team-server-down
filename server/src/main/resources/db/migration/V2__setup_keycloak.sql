ALTER TABLE "user" ADD email VARCHAR(255);
ALTER TABLE "user" ADD first_name VARCHAR(255);
ALTER TABLE "user" ADD last_name VARCHAR(255);
ALTER TABLE "user" ADD username VARCHAR(255);

CREATE INDEX idx_user_username ON "user"(username);

ALTER TABLE "user" DROP COLUMN name;