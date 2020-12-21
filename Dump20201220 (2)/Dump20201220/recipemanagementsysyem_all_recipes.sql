CREATE DATABASE  IF NOT EXISTS `recipemanagementsysyem` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `recipemanagementsysyem`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: recipemanagementsysyem
-- ------------------------------------------------------
-- Server version	5.7.32-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_recipes`
--

DROP TABLE IF EXISTS `all_recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_recipes` (
  `recipe_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `recipe_title` varchar(30) NOT NULL,
  `recipe_ingredients` text NOT NULL,
  `recipe_description` text NOT NULL,
  `recipe_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `all_recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_recipes`
--

LOCK TABLES `all_recipes` WRITE;
/*!40000 ALTER TABLE `all_recipes` DISABLE KEYS */;
INSERT INTO `all_recipes` VALUES (2,2,'Veg biryani',' Chicken, onions, Salt, chilli powder','The restaurant-style veg biryani uses the vegetables in preparation and all the vegetables can dry when cooking at home. It\'s always suggested to use more vegetables...','Biryani'),(3,2,'Italian Chicken pizza','Bread, cheese, onions, pickels, chicken','Place the crust on a lightly greased 12-in. pizza pan. Spread with pesto; top with the  chicken, tomato, beans and cheeses. Bake at 400° for 10-12 minutes or until cheese is melted.\nFreeze option: Securely wrap and freeze unbaked pizza. To use, unwrap pizza; bake as directed, increasing time as necessary.','pizza'),(4,3,'BBQ Chicken pizza','Bread, cheese, onions, pickels, chicken','Place the crust on a lightly greased 12-in. pizza pan. Spread with pesto; top with the chicken, tomato, beans and cheeses. Bake at 400° for 10-12 minutes or until cheese is melted.\nFreeze option: Securely wrap and freeze unbaked pizza. To use, unwrap pizza; bake as directed, increasing time as necessary.','pizza'),(6,1,'cheese pizza','Bread, cheese, onions, pickels','Place the crust on a lightly greased 12-in. pizza pan. Spread with pesto; top with the chicken, tomato, beans and cheeses. Bake at 400° for 10-12 minutes or until cheese is melted.','pizza'),(7,1,'Lemon juice','Lemon, sugar, water, ice','Squeeze lemon juice into a glass. Both hand held lemon reamer and glass lemon juicer reamer work well. It’s a matter of personal preference. The only difference – glass one catches the seeds. ','drinks'),(8,1,'All mix biryani','mutton,onions, salt, tomatos','Tasty hyderadi mutton biryani','biryani'),(9,1,'All mix biryani','mutton,onions, salt, tomatos','Tasty hyderadi mutton biryani','biryani'),(10,1,'All mix biryani','mutton,onions, salt, tomatos','Tasty hyderadi mutton biryani','biryani');
/*!40000 ALTER TABLE `all_recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-20 19:23:54
