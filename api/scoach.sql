-- -------------------------------------------------------------
-- TablePlus 3.1.2(297)
--
-- https://tableplus.com/
--
-- Database: scoach
-- Generation Time: 2020-03-04 09:51:02.4080
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `assignments`;
CREATE TABLE `assignments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` enum('PENDING','CONFIRMED','DECLINED') NOT NULL DEFAULT 'PENDING',
  `date` bigint(20) NOT NULL DEFAULT '1583317164',
  `coachId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e18095e49588c86f93a9b72e006` (`coachId`),
  KEY `FK_6b88573cb9fb1682b81279292ef` (`customerId`),
  CONSTRAINT `FK_6b88573cb9fb1682b81279292ef` FOREIGN KEY (`customerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e18095e49588c86f93a9b72e006` FOREIGN KEY (`coachId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `coach_customers`;
CREATE TABLE `coach_customers` (
  `coach` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  PRIMARY KEY (`coach`,`customer`),
  KEY `IDX_2fbb749c5532c9a72100aa6db3` (`coach`),
  KEY `IDX_97204af2840033d8ea1d8cbd32` (`customer`),
  CONSTRAINT `FK_2fbb749c5532c9a72100aa6db34` FOREIGN KEY (`coach`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_97204af2840033d8ea1d8cbd327` FOREIGN KEY (`customer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `assignmentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bae7c4bb1e430fd6657dbeef775` (`assignmentId`),
  CONSTRAINT `FK_bae7c4bb1e430fd6657dbeef775` FOREIGN KEY (`assignmentId`) REFERENCES `assignments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `reports`;
CREATE TABLE `reports` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `weight` double NOT NULL,
  `comment` text NOT NULL,
  `date` bigint(20) NOT NULL DEFAULT '1583317164',
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bed415cd29716cd707e9cb3c09c` (`userId`),
  CONSTRAINT `FK_bed415cd29716cd707e9cb3c09c` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('CUSTOMER','COACH') NOT NULL DEFAULT 'CUSTOMER',
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

INSERT INTO `assignments` (`id`, `status`, `date`, `coachId`, `customerId`) VALUES
('1', 'CONFIRMED', '1583317164', '2', '1');

INSERT INTO `courses` (`id`, `title`, `content`, `assignmentId`) VALUES
('1', 'Cours n°1', 'Ceci est un cours', '1'),
('2', 'Cours n°2', 'Ceci est un deuxième cours', '1');

INSERT INTO `reports` (`id`, `weight`, `comment`, `date`, `userId`) VALUES
('1', '62', ' ', '1577269461', '1'),
('2', '65', ' ', '1577874280', '1'),
('3', '66', ' ', '1578479087', '1'),
('4', '68', ' ', '1579083897', '1'),
('5', '72', ' ', '1579688703', '1'),
('6', '73', ' ', '1580293513', '1'),
('7', '74', ' ', '1580898319', '1'),
('8', '77', ' ', '1581503125', '1'),
('9', '78', ' ', '1582107932', '1'),
('10', '78', ' ', '1582712744', '1'),
('11', '85', ' ', '1577874280', '2'),
('12', '87', ' ', '1582107932', '2');

INSERT INTO `users` (`id`, `email`, `name`, `password`, `role`, `picture`) VALUES
('1', 'customer@gmail.com', 'Customer', '$2b$10$0HvDXPAY0D3LvzEj7vGAtufk2MXL25BUcQbn0JJv0KM8ZStweec3.', 'CUSTOMER', NULL),
('2', 'coach@gmail.com', 'Coach', '$2b$10$40Sqfmt1Na3b1kZzeYDh8ulYIryq9MYyiF/Y6VDgb4E/Wr3mzLQQy', 'COACH', NULL);




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;