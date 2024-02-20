-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2024 at 11:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodetask`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleid` varchar(10) NOT NULL,
  `rolename` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleid`, `rolename`) VALUES
('r1', 'admin'),
('r4', 'clerk'),
('r5', 'hr'),
('r3', 'manager'),
('r2', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `role_assign`
--

CREATE TABLE `role_assign` (
  `userid` varchar(10) DEFAULT NULL,
  `roleid` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_assign`
--

INSERT INTO `role_assign` (`userid`, `roleid`) VALUES
('u1', 'r1'),
('u2', 'r2'),
('u3', 'r3'),
('u4', 'r4'),
('u4', 'r5'),
('u5', 'r4'),
('u5', 'r5'),
('u6', 'r4');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` varchar(10) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `name`, `password`) VALUES
('u1', 'Pratibha sharma', '$2b$10$i4mhrQNip4aCyxA5k1TBO.wR7QkfKOnc6WmxQBVysRt8lzMdRWJfy'),
('u2', 'anjali sharma', '$2b$10$4GdKySetci2WopWtbEqjkunP7AlJZYqAe8cmJdZl3iZZTJoOHDH0.'),
('u3', 'Nidhi Sahu', '$2b$10$27N1IMlgaody4dZq75U6le5v9StUZAqJtz6Ur.iOmvfOmIlnlb0US'),
('u4', 'Deepika sharma', '123'),
('u5', 'anjali', '$2b$10$Zud9TMkqldhLLj2cY7NvIuhFAhu8QG4IqnZEFfLsC6r9kv0daf5he'),
('u6', 'anjali', '$2b$10$7KxBoJnJlO2UljyQd.RZLO79BDdT2Er/CSgNiVp2jeZ.HvV8i7EQS');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleid`),
  ADD UNIQUE KEY `rolename` (`rolename`);

--
-- Indexes for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD KEY `userid` (`userid`),
  ADD KEY `roleid` (`roleid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `role_assign`
--
ALTER TABLE `role_assign`
  ADD CONSTRAINT `role_assign_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`),
  ADD CONSTRAINT `role_assign_ibfk_2` FOREIGN KEY (`roleid`) REFERENCES `roles` (`roleid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
