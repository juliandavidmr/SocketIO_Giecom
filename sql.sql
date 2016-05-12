-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.12-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para bd_sensor
CREATE DATABASE IF NOT EXISTS `bd_sensor` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bd_sensor`;


-- Volcando estructura para tabla bd_sensor.dato
CREATE TABLE IF NOT EXISTS `dato` (
  `idDato` int(11) NOT NULL AUTO_INCREMENT,
  `Dato` varchar(45) NOT NULL,
  `insertDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL,
  `fk_idSensor` int(11) NOT NULL,
  PRIMARY KEY (`idDato`),
  KEY `fk_Dato_Sensor` (`fk_idSensor`),
  CONSTRAINT `fk_Dato_Sensor` FOREIGN KEY (`fk_idSensor`) REFERENCES `sensor` (`idSensor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_sensor.dato: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `dato` DISABLE KEYS */;
INSERT INTO `dato` (`idDato`, `Dato`, `insertDate`, `updateDate`, `fk_idSensor`) VALUES
	(1, '12', '2016-04-09 12:37:41', '2016-04-09 12:37:41', 1),
	(2, '34', '2016-04-09 12:50:58', '2016-04-09 12:50:58', 2),
	(3, '23', '2016-04-14 13:23:39', '2016-04-14 13:23:40', 3),
	(4, '75', '2016-04-14 13:37:08', '2016-04-14 13:37:09', 1),
	(5, '50', '2016-04-14 13:38:59', '2016-04-14 13:38:59', 2),
	(6, '70', '2016-04-14 14:13:57', '2016-04-14 14:13:58', 3),
	(7, '40', '2016-04-14 14:14:37', '2016-04-14 14:14:37', 1),
	(8, '23', '2016-04-14 15:17:27', '2016-04-14 15:17:28', 2),
	(9, '27', '2016-04-14 16:03:24', '2016-04-14 16:03:24', 3),
	(10, '34', '2016-04-14 16:23:43', '2016-04-14 16:23:43', 1),
	(11, '53', '2016-04-14 16:23:57', '2016-04-14 16:23:58', 2),
	(12, '34', '2016-04-14 16:24:04', '2016-05-05 16:24:05', 3);
/*!40000 ALTER TABLE `dato` ENABLE KEYS */;


-- Volcando estructura para tabla bd_sensor.sensor
CREATE TABLE IF NOT EXISTS `sensor` (
  `idSensor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreSensor` varchar(45) NOT NULL,
  `Referencia` varchar(45) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `insertDate` datetime DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `Maximo` float DEFAULT NULL,
  `Minimo` float DEFAULT NULL,
  `Altura` float DEFAULT NULL,
  `fk_idTipoSensor` int(11) NOT NULL,
  `Latitud` varchar(50) NOT NULL,
  `Longitud` varchar(50) NOT NULL,
  PRIMARY KEY (`idSensor`,`fk_idTipoSensor`),
  KEY `fk_Sensor_TipoSensor1_idx` (`fk_idTipoSensor`),
  CONSTRAINT `fk_Sensor_TipoSensor1` FOREIGN KEY (`fk_idTipoSensor`) REFERENCES `tiposensor` (`idTipoSensor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_sensor.sensor: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `sensor` DISABLE KEYS */;
INSERT INTO `sensor` (`idSensor`, `NombreSensor`, `Referencia`, `Descripcion`, `insertDate`, `updateDate`, `Maximo`, `Minimo`, `Altura`, `fk_idTipoSensor`, `Latitud`, `Longitud`) VALUES
	(1, 'Sensor de nivel', 'DDFC', 'Sensor de nivel por luz', '2016-04-09 11:59:57', '2016-04-09 11:59:57', 300, -20, 200, 3, '1.616861', '-75.610944'),
	(2, 'Sensor de humedad', 'DTH11', 'Sensor de humedad para arduino', '2016-04-09 12:22:36', '2016-04-09 12:22:36', 70, 10, 0, 2, '1.620111', '-75.609972'),
	(3, 'S', 'D', 'D', '2016-04-14 16:03:02', '2016-04-14 16:03:03', 3, 3, 3, 0, '1.624028', '-75.602333');
/*!40000 ALTER TABLE `sensor` ENABLE KEYS */;


-- Volcando estructura para tabla bd_sensor.tiposensor
CREATE TABLE IF NOT EXISTS `tiposensor` (
  `idTipoSensor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreTipoSensor` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoSensor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla bd_sensor.tiposensor: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tiposensor` DISABLE KEYS */;
INSERT INTO `tiposensor` (`idTipoSensor`, `NombreTipoSensor`) VALUES
	(1, 'Humedad'),
	(2, 'Temperatura'),
	(3, 'Nivel');
/*!40000 ALTER TABLE `tiposensor` ENABLE KEYS */;


-- Volcando estructura para tabla bd_sensor.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `admin` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla bd_sensor.user: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO bd_sensor.User (name,password,admin,id,username,apellido) VALUES 
('jose','$2a$10$Pdd3kd95IPZ/Y/S8HjeSGODbB4jy1I6mrQppGhfrXLWUk/mx2.Ghq',0,2,'pepe','rivera')
,('jose ','$2a$10$NUGk6fB3JQkOQy0Eq.bhiuYnsrkDyzMwk.XBnAwpB635b5MvGKJNe',0,4,'sebas','alberto')
,('rafel','$2a$10$skf21MfXTIe4S4ZIIZLDme/12HYausMl1veJTOatbLqpZS.XdWAfi',0,5,'rafa','soria')
;;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
