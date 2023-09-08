CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`user` (
	`id` BINARY(16),
    `email` VARCHAR(64) NOT NULL UNIQUE,
    `password` VARCHAR(64) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `account_type` VARCHAR(64) NOT NULL,
    `address` VARCHAR(64) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;