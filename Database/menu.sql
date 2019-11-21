-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2019 at 08:05 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `menu`
--
CREATE DATABASE IF NOT EXISTS `menu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `menu`;

-- --------------------------------------------------------

--
-- Table structure for table `dish_info`
--

DROP TABLE IF EXISTS `dish_info`;
CREATE TABLE `dish_info` (
  `dishID` int(10) NOT NULL,
  `dishName` varchar(50) NOT NULL,
  `ingredients1` varchar(30) DEFAULT NULL,
  `ingredients2` varchar(30) DEFAULT NULL,
  `ingredients3` varchar(30) DEFAULT NULL,
  `popularity` int(10) NOT NULL DEFAULT 0,
  `userID` varchar(64) NOT NULL,
  `imgscr` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dish_info`
--

INSERT INTO `dish_info` (`dishID`, `dishName`, `ingredients1`, `ingredients2`, `ingredients3`, `popularity`, `userID`, `imgscr`) VALUES
(1, 'sandwich', 'bread', 'cheese', 'ham', 0, 'aaa', ''),
(2, 'sushi', 'rice', 'seaweed', 'fish', 0, 'aaa', 'web/sushi.jpg'),
(3, 'spaghetti', 'spaghetti', 'sausage', 'onion', 0, 'aaa', 'web/spaghetti.jpg'),
(4, 'hotdog', 'bread', 'sausage', NULL, 0, 'bbb', ''),
(5, 'scrambled eggs', 'eggs', 'milk', NULL, 0, 'aaa', 'web/Scrambled_eggs.jpg'),
(6, 'chicken rice', 'chicken ', 'rice', '', 0, 'aaa', 'web/chickenrice.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `likes_list`
--

DROP TABLE IF EXISTS `likes_list`;
CREATE TABLE `likes_list` (
  `dishID` int(10) NOT NULL,
  `likes` int(10) NOT NULL DEFAULT 0,
  `userID` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes_list`
--

INSERT INTO `likes_list` (`dishID`, `likes`, `userID`) VALUES
(3, 1, 'aaa'),
(3, 1, 'meow@cat.com'),
(3, 1, 'tom898@gmail.com'),
(4, -1, 'aaa'),
(4, -1, 'meow@cat.com'),
(1, 0, 'test@recipedia.com'),
(2, 0, 'test@recipedia.com'),
(3, 0, 'test@recipedia.com'),
(5, 0, 'test@recipedia.com'),
(6, 0, 'test@recipedia.com');

-- --------------------------------------------------------

--
-- Table structure for table `tag_info`
--

DROP TABLE IF EXISTS `tag_info`;
CREATE TABLE `tag_info` (
  `tagName` varchar(50) NOT NULL,
  `tagType` varchar(50) NOT NULL,
  `subTag` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tag_info`
--

INSERT INTO `tag_info` (`tagName`, `tagType`, `subTag`) VALUES
('bread', 'ingredient', ''),
('cheese', 'ingredient', ''),
('chicken', 'ingredient', 'meat'),
('eggs', 'ingredient', ''),
('fish', 'ingredient', 'meat'),
('ham', 'ingredient', 'meat'),
('milk', 'ingredient', ''),
('onion', 'ingredient', 'vegetables'),
('rice', 'ingredient', ''),
('sausage', 'ingredient', 'meat'),
('seaweed', 'ingredient', ''),
('spaghetti', 'ingredient', '');

-- --------------------------------------------------------

--
-- Table structure for table `tag_join_dish`
--

DROP TABLE IF EXISTS `tag_join_dish`;
CREATE TABLE `tag_join_dish` (
  `tagName` varchar(50) NOT NULL,
  `dishID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tag_join_dish`
--

INSERT INTO `tag_join_dish` (`tagName`, `dishID`) VALUES
('bread', 4),
('bread', 1),
('cheese', 1),
('ham', 1),
('fish', 2),
('seaweed', 2),
('rice', 2),
('onion', 3),
('sausage', 3),
('spaghetti', 3),
('sausage', 4),
('eggs', 5),
('milk', 5),
('chicken', 6),
('rice', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `pic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `password`, `pic`) VALUES
('aaa', '', 'web/cat1.jpg'),
('bbb', '222', ''),
('helloworld@gmail.com', 'helloworld123', ''),
('mary0918@gmail.com', 'cmqgu879', ''),
('meow@cat.com', 'ilovecat146', ''),
('test@recipedia.com', 'test1234', ''),
('tom898@gmail.com', 'seeyou898', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dish_info`
--
ALTER TABLE `dish_info`
  ADD PRIMARY KEY (`dishID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `likes_list`
--
ALTER TABLE `likes_list`
  ADD KEY `userID` (`userID`),
  ADD KEY `dishID` (`dishID`);

--
-- Indexes for table `tag_info`
--
ALTER TABLE `tag_info`
  ADD PRIMARY KEY (`tagName`);

--
-- Indexes for table `tag_join_dish`
--
ALTER TABLE `tag_join_dish`
  ADD KEY `tagName` (`tagName`),
  ADD KEY `dishID` (`dishID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dish_info`
--
ALTER TABLE `dish_info`
  MODIFY `dishID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dish_info`
--
ALTER TABLE `dish_info`
  ADD CONSTRAINT `dish_info_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

--
-- Constraints for table `likes_list`
--
ALTER TABLE `likes_list`
  ADD CONSTRAINT `likes_list_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`),
  ADD CONSTRAINT `likes_list_ibfk_3` FOREIGN KEY (`dishID`) REFERENCES `dish_info` (`dishID`);

--
-- Constraints for table `tag_join_dish`
--
ALTER TABLE `tag_join_dish`
  ADD CONSTRAINT `tag_join_dish_ibfk_2` FOREIGN KEY (`tagName`) REFERENCES `tag_info` (`tagName`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tag_join_dish_ibfk_3` FOREIGN KEY (`dishID`) REFERENCES `dish_info` (`dishID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
