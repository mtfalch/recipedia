-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2019 at 09:14 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

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

-- --------------------------------------------------------

--
-- Table structure for table `dish_info`
--

CREATE TABLE `dish_info` (
  `dishID` int(10) NOT NULL,
  `dishName` varchar(50) NOT NULL,
  `ingredients1` varchar(30) DEFAULT NULL,
  `ingredients2` varchar(30) DEFAULT NULL,
  `ingredients3` varchar(30) DEFAULT NULL,
  `popularity` int(10) NOT NULL DEFAULT 0,
  `userID` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `dish_info`
--

INSERT INTO `dish_info` (`dishID`, `dishName`, `ingredients1`, `ingredients2`, `ingredients3`, `popularity`, `userID`) VALUES
(1, 'sandwich', 'bread', 'cheese', 'ham', 0, 'aaa'),
(2, 'saushi', 'rice', 'seaweed', 'fish', 0, 'aaa'),
(3, 'spaghetti', 'spaghetti', 'sausage', 'onion', 0, 'aaa'),
(4, 'hotdog', 'bread', 'sausage', NULL, 0, 'bbb');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dish_info`
--
ALTER TABLE `dish_info`
  MODIFY `dishID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dish_info`
--
ALTER TABLE `dish_info`
  ADD CONSTRAINT `dish_info_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
