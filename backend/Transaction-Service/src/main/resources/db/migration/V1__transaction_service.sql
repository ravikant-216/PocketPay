CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`beneficiary` (
	`id` BINARY(16),
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `account_number` VARCHAR(64) NOT NULL,
    `IFSC` VARCHAR(64) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`transaction` (
	`id` BINARY(16),
    `reference_number` VARCHAR(16) UNIQUE NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED') NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `sending_amount` DOUBLE NOT NULL,
    `recieving_amount` DOUBLE NOT NULL,
    `sending_currency_code` VARCHAR(8) NOT NULL,
    `recieving_currency_code` VARCHAR(8) NOT NULL,
    `user_id` BINARY(16) NOT NULL,
    `beneficiary_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
    FOREIGN KEY (`beneficiary_id`) REFERENCES `beneficiary`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;