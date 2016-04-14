-- MySQL dump 10.13  Distrib 5.6.28, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bd_sensor
-- ------------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bd_sensor
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bd_sensor` ;

-- -----------------------------------------------------
-- Schema bd_sensor
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_sensor` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `bd_sensor` ;


--
-- Table structure for table `Dato`
--

DROP TABLE IF EXISTS `Dato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Dato` (
  `idDato` int(11) NOT NULL AUTO_INCREMENT,
  `Dato` varchar(45) NOT NULL,
  `insertDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fk_idSensor` int(11) NOT NULL,
  PRIMARY KEY (`idDato`),
  KEY `fk_Dato_Sensor` (`fk_idSensor`),
  CONSTRAINT `fk_Dato_Sensor` FOREIGN KEY (`fk_idSensor`) REFERENCES `Sensor` (`idSensor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Dato`
--

LOCK TABLES `Dato` WRITE;
/*!40000 ALTER TABLE `Dato` DISABLE KEYS */;
INSERT INTO `Dato` VALUES (1,'12','2016-04-09 12:37:41','2016-04-09 12:37:41',1),(2,'34','2016-04-09 12:50:58','2016-04-09 12:50:58',2);
/*!40000 ALTER TABLE `Dato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sensor`
--

DROP TABLE IF EXISTS `Sensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sensor` (
  `idSensor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreSensor` varchar(45) NOT NULL,
  `Referencia` varchar(45) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `insertDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updateDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Maximo` float DEFAULT NULL,
  `Minimo` float DEFAULT NULL,
  `Altura` float DEFAULT NULL,
  `fk_idTipoSensor` int(11) NOT NULL,
  PRIMARY KEY (`idSensor`,`fk_idTipoSensor`),
  KEY `fk_Sensor_TipoSensor1_idx` (`fk_idTipoSensor`),
  CONSTRAINT `fk_Sensor_TipoSensor1` FOREIGN KEY (`fk_idTipoSensor`) REFERENCES `TipoSensor` (`idTipoSensor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sensor`
--

LOCK TABLES `Sensor` WRITE;
/*!40000 ALTER TABLE `Sensor` DISABLE KEYS */;
INSERT INTO `Sensor` VALUES (1,'Sensor de nivel','DDFC','Sensor de nivel por luz','2016-04-09 11:59:57','2016-04-09 11:59:57',300,-20,200,3),(2,'Sensor de humedad','DTH11','Sensor de humedad para arduino','2016-04-09 12:22:36','2016-04-09 12:22:36',70,10,0,2);
/*!40000 ALTER TABLE `Sensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoSensor`
--

DROP TABLE IF EXISTS `TipoSensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TipoSensor` (
  `idTipoSensor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTipoSensor` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoSensor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoSensor`
--

LOCK TABLES `TipoSensor` WRITE;
/*!40000 ALTER TABLE `TipoSensor` DISABLE KEYS */;
INSERT INTO `TipoSensor` VALUES (1,'Humedad'),(2,'Temperatura'),(3,'Nivel');
/*!40000 ALTER TABLE `TipoSensor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-04-13 23:43:07
