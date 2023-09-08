CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`business_category` (
	`id` int auto_increment,
    `name` VARCHAR(64) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`country` (
	`id` int auto_increment,
    `country_image_url` varchar(100),
    `name` VARCHAR(16) UNIQUE NOT NULL,
    `currency_code` varchar(16) NOT NULL,
    `country_code` varchar(16) NOT NULL,
    `currency_rate` DOUBLE NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `bc107-pocket-pay`.`business` (
	`id` BINARY(16),
    `name` VARCHAR(64) NOT NULL,
    `registration_number` VARCHAR(64) NOT NULL,
    `registration_address` VARCHAR(64) NOT NULL,
    `trading_address` VARCHAR(64) NOT NULL,
    `country_id` int  NOT NULL,
    `business_category_id` int NOT NULL,
    `owner_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`country_id`) REFERENCES `country`(`id`),
    FOREIGN KEY (`business_category_id`) REFERENCES `business_category`(`id`),
    FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO country(`country_image_url`, `country_code`, `currency_code`, `name`, `currency_rate`)
VALUES
  ('https://res.cloudinary.com/drbwctym7/image/upload/v1692775290/Austria_mqbkla.svg', '+376', 'EUR', 'Andorra', 90.27),
  ('https://svgshare.com/i/x75.svg', '+44', 'GBP', 'United Kingdom', 105.73),
  ('https://res.cloudinary.com/drbwctym7/image/upload/v1692775290/Andorra_muxwof.svg', '+43', 'EUR', 'Austria', 90.06),
  ('https://res.cloudinary.com/drbwctym7/image/upload/v1692775290/india_ajbyqo.svg', '+91', 'INR', 'India', 1),
  ('https://svgshare.com/i/x66.svg', '+1', 'USD', 'United States', 83);

insert into business_category(`name`) values
("Design, marketing or communication"),
( "Health, sports or personal care"),
("Real estate or construction"),
("Education or learning"),
("Others")
