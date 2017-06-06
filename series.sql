-- MySQL Script generated by MySQL Workbench
-- Sun Jun  4 21:53:08 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema series
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema series
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `series` DEFAULT CHARACTER SET utf8 ;
USE `series` ;

-- -----------------------------------------------------
-- Table `series`.`demografia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`demografia` (
  `iddemografia` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iddemografia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`serie` (
  `idserie` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `nacionalidad` VARCHAR(45) NOT NULL,
  `demografia_iddemografia` INT NULL DEFAULT NULL,
  `foto` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idserie`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC),
  INDEX `fk_serie_demografia1_idx` (`demografia_iddemografia` ASC),
  CONSTRAINT `fk_serie_demografia1`
    FOREIGN KEY (`demografia_iddemografia`)
    REFERENCES `series`.`demografia` (`iddemografia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`creador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`creador` (
  `idcreador` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcreador`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`genero` (
  `idgenero` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idgenero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`emisora`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`emisora` (
  `idemisora` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idemisora`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`mangatvmovie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`mangatvmovie` (
  `idmangatvmovie` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `fechainicio` DATE NOT NULL,
  `fechafin` DATE NULL,
  `idserie` INT NOT NULL,
  `tipo` ENUM('manga', 'tvshow', 'comic', 'movie') NOT NULL,
  PRIMARY KEY (`idmangatvmovie`),
  INDEX `fk_manga_serie1_idx` (`idserie` ASC),
  CONSTRAINT `fk_manga_serie1`
    FOREIGN KEY (`idserie`)
    REFERENCES `series`.`serie` (`idserie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`tomotemporada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`tomotemporada` (
  `idtomotemporada` INT NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `estado` ENUM('cerrado', 'abierto') NOT NULL,
  `capitulos` INT NOT NULL,
  `foto` VARCHAR(100) NULL,
  `fechainicio` DATE NOT NULL,
  `fechafin` DATE NULL,
  `idmangatvmovie` INT NOT NULL,
  PRIMARY KEY (`idtomotemporada`),
  INDEX `fk_tomotemporada_mangatvmovie1_idx` (`idmangatvmovie` ASC),
  CONSTRAINT `fk_tomotemporada_mangatvmovie1`
    FOREIGN KEY (`idmangatvmovie`)
    REFERENCES `series`.`mangatvmovie` (`idmangatvmovie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`capitulo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`capitulo` (
  `idcapitulo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `idtomotemporada` INT NOT NULL,
  PRIMARY KEY (`idcapitulo`, `idtomotemporada`),
  INDEX `fk_capitulo_tomotemporada1_idx` (`idtomotemporada` ASC),
  CONSTRAINT `fk_capitulo_tomotemporada1`
    FOREIGN KEY (`idtomotemporada`)
    REFERENCES `series`.`tomotemporada` (`idtomotemporada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`banda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`banda` (
  `idbanda` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `nacionalidad` VARCHAR(45) NULL,
  PRIMARY KEY (`idbanda`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`opening`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`opening` (
  `idopening` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `idmangatvmovie` INT NOT NULL,
  `banda_idbanda` INT NOT NULL,
  PRIMARY KEY (`idopening`, `idmangatvmovie`, `banda_idbanda`),
  INDEX `fk_opening_mangatvmovie1_idx` (`idmangatvmovie` ASC),
  INDEX `fk_opening_banda1_idx` (`banda_idbanda` ASC),
  CONSTRAINT `fk_opening_mangatvmovie1`
    FOREIGN KEY (`idmangatvmovie`)
    REFERENCES `series`.`mangatvmovie` (`idmangatvmovie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_opening_banda1`
    FOREIGN KEY (`banda_idbanda`)
    REFERENCES `series`.`banda` (`idbanda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`serie_has_creador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`serie_has_creador` (
  `serie_idserie` INT NOT NULL,
  `creador_idcreador` INT NOT NULL,
  PRIMARY KEY (`serie_idserie`, `creador_idcreador`),
  INDEX `fk_serie_has_creador_creador1_idx` (`creador_idcreador` ASC),
  INDEX `fk_serie_has_creador_serie1_idx` (`serie_idserie` ASC),
  CONSTRAINT `fk_serie_has_creador_serie1`
    FOREIGN KEY (`serie_idserie`)
    REFERENCES `series`.`serie` (`idserie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_serie_has_creador_creador1`
    FOREIGN KEY (`creador_idcreador`)
    REFERENCES `series`.`creador` (`idcreador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`genero_has_serie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`genero_has_serie` (
  `genero_idgenero` INT NOT NULL,
  `serie_idserie` INT NOT NULL,
  PRIMARY KEY (`genero_idgenero`, `serie_idserie`),
  INDEX `fk_genero_has_serie_serie1_idx` (`serie_idserie` ASC),
  INDEX `fk_genero_has_serie_genero1_idx` (`genero_idgenero` ASC),
  CONSTRAINT `fk_genero_has_serie_genero1`
    FOREIGN KEY (`genero_idgenero`)
    REFERENCES `series`.`genero` (`idgenero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_genero_has_serie_serie1`
    FOREIGN KEY (`serie_idserie`)
    REFERENCES `series`.`serie` (`idserie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `series`.`emisora_has_mangatvmovie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series`.`emisora_has_mangatvmovie` (
  `emisora_idemisora` INT NOT NULL,
  `mangatvmovie_idmangatvmovie` INT NOT NULL,
  PRIMARY KEY (`emisora_idemisora`, `mangatvmovie_idmangatvmovie`),
  INDEX `fk_emisora_has_mangatvmovie_mangatvmovie1_idx` (`mangatvmovie_idmangatvmovie` ASC),
  INDEX `fk_emisora_has_mangatvmovie_emisora1_idx` (`emisora_idemisora` ASC),
  CONSTRAINT `fk_emisora_has_mangatvmovie_emisora1`
    FOREIGN KEY (`emisora_idemisora`)
    REFERENCES `series`.`emisora` (`idemisora`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_emisora_has_mangatvmovie_mangatvmovie1`
    FOREIGN KEY (`mangatvmovie_idmangatvmovie`)
    REFERENCES `series`.`mangatvmovie` (`idmangatvmovie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;