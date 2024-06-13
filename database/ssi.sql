-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2024 at 06:39 PM
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
-- Database: `ssi`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_mobile` varchar(20) DEFAULT NULL,
  `customer_address` text DEFAULT NULL,
  `invoiced_by` varchar(255) DEFAULT NULL,
  `products` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`products`)),
  `date` varchar(255) DEFAULT NULL,
  `total_amount` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `customer_name`, `customer_mobile`, `customer_address`, `invoiced_by`, `products`, `date`, `total_amount`) VALUES
(1, 'Tamilmani K', '07010416422', 'thiruchy', 'tamilmani', '{\"0\":[\"Tea cups\",3,\"230\"],\"1\":[\"Small tea mug\",2,\"542\"]}', 'June 13, 2024', '1774'),
(9, 'Tamilmani K', '07010416422', 'thiruchy', 'tamilmani', '{\"0\":[\"green porcelain plate\",1,\"200\"],\"1\":[\"Small tea mug\",1,\"542\"],\"2\":[\"Teddy Tinket\",1,\"600\"],\"3\":[\"Teddy Tinket\",1,\"600\"],\"4\":[\"Teddy Tinket\",1,\"600\"],\"5\":[\"Teddy Tinket\",1,\"600\"],\"6\":[\"Teddy Tinket\",1,\"600\"]}', 'June 13, 2024', '3742'),
(10, 'Tamilmani K', '07010416422', 'thiruchy', 'tamilmani', '{\"0\":[\"Small tea mug\",1,\"542\"]}', 'June 13, 2024', '542'),
(11, 'kavin', '9994110360', 'chennai', 'tamilmani', '\"{\\\"0\\\":[\\\"Tea cups\\\",3,\\\"230\\\"],\\\"1\\\":[\\\"Small tea mug\\\",2,\\\"542\\\"]}\"', 'June 13, 2024', '1500'),
(12, 'Tamilmani K', '07010416422', 'thiruchy', 'tamilmani', '{\"0\":[\"green porcelain plate\",1,\"200\"],\"1\":[\"Watter Bottles\",3,\"10\"],\"2\":[\"Bowl\",3,\"170\"]}', 'June 13, 2024', '740'),
(13, 'Tamilmani K', '07010416422', 'thiruchy', 'tamilmani', '{\"0\":[\"green porcelain plate\",1,\"200\"],\"1\":[\"Watter Bottles\",3,\"10\"],\"2\":[\"Bowl\",3,\"170\"]}', 'June 13, 2024', '740'),
(14, 'harris', '99941103060', 'erode', 'tamilmani', '{\"0\":[\"Bowl\",1,\"170\"],\"1\":[\"Bowl\",1,\"170\"],\"2\":[\"green porcelain plate\",1,\"200\"]}', 'June 13, 2024', '540');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `username` varchar(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `stock_location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `username`, `product_name`, `description`, `quantity`, `price`, `stock_location`) VALUES
(3, 'shihaab', 'Teddy', 'brown', '55', '235', 'Storage B'),
(5, 'tamilmani', 'green porcelain plate', '11 inch round plate', '7', '200', 'Storage B'),
(13, 'shihaab', 'Metal Mug', '12 oz mug', '60', '35', 'Main storage'),
(15, 'tamilmani', 'Watter Bottles', 'Arou, 1-5Litres', '47', '10', 'Storage B'),
(16, 'tamilmani', 'Bowl', 'Chinese, greeen yellow', '595', '170', 'Storage A'),
(17, 'tamilmani', 'tea mug', '10 oz, mug', '500', '25', 'Main storage'),
(18, 'tamilmani', 'Blue glass Vase', 'White bird figures', '600', '800', 'Storage A');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `company_name`, `email`, `username`, `password`) VALUES
(7, 'Tamil corporation', 'k.tamilmani2001@gmail.com', 'tamilmani', '$2b$10$Q8jf7YSmVAFUkdLYDUGYauKod/w44/Ojh0xEhpw/MsRN3qGsmS8/u'),
(26, 'zoho corporation', 'rahmanharris21@gmail.com', 'shihaab', '$2b$10$BEAxny4ZTgWTlaqm/6m7zetOMhZ7MsXjAfyLGr8LvKH.k24oV/kja'),
(27, 'LSS', 'harris2001@gmail.com', 'harrish', '$2b$10$/Y.TniACdsMX6e6manIAw.CrNi4lHwQliDiXx4cZwaWrv7pCeujk2'),
(30, 'Saa corporation', 'k.tamilmani1234@gmail.com', 'harrishsm', '$2b$10$9eGcN8e73LScW5hTAgqaD./GE/VkIkVc9VrJ1pe1Mva0XHimZABOe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
