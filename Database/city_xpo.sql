-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 09:58 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `city_xpo`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `Booking_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Facility_ID` int(11) DEFAULT NULL,
  `Customer_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Customer_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Points` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_feedback`
--

CREATE TABLE `customer_feedback` (
  `Customer_ID` int(11) NOT NULL,
  `Facility_ID` int(11) NOT NULL,
  `Feedback` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_hunt`
--

CREATE TABLE `customer_hunt` (
  `Customer_ID` int(11) NOT NULL,
  `Hunt_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `Facility_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `Contact` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hunt`
--

CREATE TABLE `hunt` (
  `Hunt_ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `StartLocation` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `Location_ID` int(11) NOT NULL,
  `ClueDescription` text DEFAULT NULL,
  `ARContent` text DEFAULT NULL,
  `Hunt_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `Payment_ID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `PayMethod` varchar(50) DEFAULT NULL,
  `PayDate` date NOT NULL,
  `Customer_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reward`
--

CREATE TABLE `reward` (
  `Reward_ID` int(11) NOT NULL,
  `Description` text DEFAULT NULL,
  `PointsEarned` int(11) NOT NULL,
  `Customer_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`Booking_ID`),
  ADD KEY `Facility_ID` (`Facility_ID`),
  ADD KEY `Customer_ID` (`Customer_ID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Customer_ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  ADD PRIMARY KEY (`Customer_ID`,`Facility_ID`),
  ADD KEY `Facility_ID` (`Facility_ID`);

--
-- Indexes for table `customer_hunt`
--
ALTER TABLE `customer_hunt`
  ADD PRIMARY KEY (`Customer_ID`,`Hunt_ID`),
  ADD KEY `Hunt_ID` (`Hunt_ID`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`Facility_ID`);

--
-- Indexes for table `hunt`
--
ALTER TABLE `hunt`
  ADD PRIMARY KEY (`Hunt_ID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`Location_ID`),
  ADD KEY `Hunt_ID` (`Hunt_ID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`Payment_ID`),
  ADD KEY `Customer_ID` (`Customer_ID`);

--
-- Indexes for table `reward`
--
ALTER TABLE `reward`
  ADD PRIMARY KEY (`Reward_ID`),
  ADD KEY `Customer_ID` (`Customer_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `Booking_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `Facility_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hunt`
--
ALTER TABLE `hunt`
  MODIFY `Hunt_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `Location_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `Payment_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reward`
--
ALTER TABLE `reward`
  MODIFY `Reward_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`Facility_ID`) REFERENCES `facility` (`Facility_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL;

--
-- Constraints for table `customer_feedback`
--
ALTER TABLE `customer_feedback`
  ADD CONSTRAINT `customer_feedback_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `customer_feedback_ibfk_2` FOREIGN KEY (`Facility_ID`) REFERENCES `facility` (`Facility_ID`) ON DELETE CASCADE;

--
-- Constraints for table `customer_hunt`
--
ALTER TABLE `customer_hunt`
  ADD CONSTRAINT `customer_hunt_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `customer_hunt_ibfk_2` FOREIGN KEY (`Hunt_ID`) REFERENCES `hunt` (`Hunt_ID`) ON DELETE CASCADE;

--
-- Constraints for table `location`
--
ALTER TABLE `location`
  ADD CONSTRAINT `location_ibfk_1` FOREIGN KEY (`Hunt_ID`) REFERENCES `hunt` (`Hunt_ID`) ON DELETE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL;

--
-- Constraints for table `reward`
--
ALTER TABLE `reward`
  ADD CONSTRAINT `reward_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
