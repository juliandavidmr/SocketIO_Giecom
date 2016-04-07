-- MySQL Script generated by MySQL Workbench
-- jue 07 abr 2016 17:21:36 COT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`TipoSensor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TipoSensor` ;

CREATE TABLE IF NOT EXISTS `mydb`.`TipoSensor` (
  `idTipoSensor` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `NombreTipoSensor` VARCHAR(45) NOT NULL COMMENT '',
  PRIMARY KEY (`idTipoSensor`)  COMMENT '')
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Sensor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Sensor` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Sensor` (
  `idSensor` INT NOT NULL AUTO_INCREMENT COMMENT '',
  `NombreSensor` VARCHAR(45) NOT NULL COMMENT '',
  `Referencia` VARCHAR(45) NULL COMMENT '',
  `Descripcion` VARCHAR(100) NULL COMMENT '',
  `insertDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `updateDate` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `fk_idTipoSensor` INT NOT NULL COMMENT '',
  `Maximo` FLOAT NULL COMMENT '',
  `Minimo` FLOAT NULL COMMENT '',
  `Altura` FLOAT NULL COMMENT '',
  PRIMARY KEY (`idSensor`, `fk_idTipoSensor`)  COMMENT '',
  INDEX `fk_Sensor_TipoSensor1_idx` (`fk_idTipoSensor` ASC)  COMMENT '',
  CONSTRAINT `fk_Sensor_TipoSensor1`
    FOREIGN KEY (`fk_idTipoSensor`)
    REFERENCES `mydb`.`TipoSensor` (`idTipoSensor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dato`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Dato` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Dato` (
  `Dato` VARCHAR(45) NOT NULL COMMENT '',
  `insertDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `updateDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '',
  `fk_idSensor` INT NOT NULL COMMENT '',
  PRIMARY KEY (`fk_idSensor`)  COMMENT '',
  CONSTRAINT `fk_Dato_Sensor`
    FOREIGN KEY (`fk_idSensor`)
    REFERENCES `mydb`.`Sensor` (`idSensor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
