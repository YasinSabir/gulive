-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: localhost    Database: eumkpfwdzw
-- ------------------------------------------------------
-- Server version	5.7.29-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `billing_plans`
--

DROP TABLE IF EXISTS `billing_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `billing_plans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(13,2) DEFAULT NULL,
  `currency` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_symbol` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '$',
  `interval` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'month',
  `interval_count` int(11) NOT NULL DEFAULT '1',
  `parent_id` int(11) DEFAULT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `paypal_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `recommended` tinyint(1) NOT NULL DEFAULT '0',
  `free` tinyint(1) NOT NULL DEFAULT '0',
  `show_permissions` tinyint(1) NOT NULL DEFAULT '0',
  `features` text COLLATE utf8mb4_unicode_ci,
  `position` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `available_space` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing_plans`
--

LOCK TABLES `billing_plans` WRITE;
/*!40000 ALTER TABLE `billing_plans` DISABLE KEYS */;
/*!40000 ALTER TABLE `billing_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `commentable_id` int(10) unsigned NOT NULL,
  `commentable_type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_parent_id_index` (`parent_id`),
  KEY `comments_path_index` (`path`),
  KEY `comments_user_id_index` (`user_id`),
  KEY `comments_commentable_id_index` (`commentable_id`),
  KEY `comments_commentable_type_index` (`commentable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `css_themes`
--

DROP TABLE IF EXISTS `css_themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `css_themes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_dark` tinyint(1) NOT NULL DEFAULT '0',
  `default_light` tinyint(1) NOT NULL DEFAULT '0',
  `default_dark` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(11) NOT NULL,
  `colors` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `css_themes_name_unique` (`name`),
  KEY `css_themes_default_light_index` (`default_light`),
  KEY `css_themes_default_dark_index` (`default_dark`),
  KEY `css_themes_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `css_themes`
--

LOCK TABLES `css_themes` WRITE;
/*!40000 ALTER TABLE `css_themes` DISABLE KEYS */;
INSERT INTO `css_themes` VALUES (1,'Dark',1,0,1,1,'{\"--be-primary-lighter\":\"#3e4a66\",\"--be-primary-default\":\"#2B3346\",\"--be-primary-darker\":\"#181c26\",\"--be-accent-default\":\"#a3b1fd\",\"--be-accent-lighter\":\"#e9ecfe\",\"--be-accent-contrast\":\"rgba(255, 255, 255, 1)\",\"--be-accent-emphasis\":\"rgba(233,236,254,0.1)\",\"--be-foreground-base\":\"#fff\",\"--be-text\":\"#fff\",\"--be-hint-text\":\"rgba(255, 255, 255, 0.5)\",\"--be-secondary-text\":\"rgba(255, 255, 255, 0.7)\",\"--be-label\":\"rgba(255, 255, 255, 0.7)\",\"--be-background\":\"#1D1D1D\",\"--be-background-alternative\":\"#121212\",\"--be-divider-lighter\":\"rgba(255, 255, 255, 0.06)\",\"--be-divider-default\":\"rgba(255, 255, 255, 0.12)\",\"--be-disabled-button-text\":\"rgba(255, 255, 255, 0.3)\",\"--be-disabled-toggle\":\"#000\",\"--be-chip\":\"#616161\",\"--be-hover\":\"rgba(255, 255, 255, 0.04)\",\"--be-selected-button\":\"#212121\",\"--be-disabled-button\":\"rgba(255, 255, 255, 0.12)\",\"--be-raised-button\":\"#424242\",\"--be-backdrop\":\"#BDBDBD\",\"--be-link\":\"#c5cae9\"}','2020-03-19 23:08:21','2020-03-19 23:08:21'),(2,'Light',0,1,0,1,'{\"--be-primary-lighter\":\"#3e4a66\",\"--be-primary-default\":\"#2B3346\",\"--be-primary-darker\":\"#181c26\",\"--be-accent-default\":\"#4662FA\",\"--be-accent-lighter\":\"#c8d0fe\",\"--be-accent-contrast\":\"rgba(255, 255, 255, 1)\",\"--be-accent-emphasis\":\"rgba(200,208,254,0.1)\",\"--be-background\":\"rgb(255, 255, 255)\",\"--be-background-alternative\":\"rgb(250, 250, 250)\",\"--be-foreground-base\":\"black\",\"--be-text\":\"rgba(0, 0, 0, 0.87)\",\"--be-hint-text\":\"rgba(0, 0, 0, 0.38)\",\"--be-secondary-text\":\"rgba(0, 0, 0, 0.54)\",\"--be-label\":\"rgba(0, 0, 0, 0.87)\",\"--be-disabled-button-text\":\"rgba(0, 0, 0, 0.26)\",\"--be-divider-lighter\":\"rgba(0, 0, 0, 0.06)\",\"--be-divider-default\":\"rgba(0, 0, 0, 0.12)\",\"--be-hover\":\"rgba(0,0,0,0.04)\",\"--be-selected-button\":\"rgb(224, 224, 224)\",\"--be-chip\":\"#e0e0e0\",\"--be-link\":\"#3f51b5\",\"--be-backdrop\":\"black\",\"--be-raised-button\":\"#fff\",\"--be-disabled-toggle\":\"rgb(238, 238, 238)\",\"--be-disabled-button\":\"rgba(0, 0, 0, 0.12)\"}','2020-03-19 23:08:21','2020-03-19 23:08:21');
/*!40000 ALTER TABLE `css_themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_domains`
--

DROP TABLE IF EXISTS `custom_domains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_domains` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `host` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `global` tinyint(1) NOT NULL DEFAULT '0',
  `resource_id` int(10) unsigned DEFAULT NULL,
  `resource_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `custom_domains_host_unique` (`host`),
  KEY `custom_domains_user_id_index` (`user_id`),
  KEY `custom_domains_global_index` (`global`),
  KEY `custom_domains_resource_id_index` (`resource_id`),
  KEY `custom_domains_resource_type_index` (`resource_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_domains`
--

LOCK TABLES `custom_domains` WRITE;
/*!40000 ALTER TABLE `custom_domains` DISABLE KEYS */;
/*!40000 ALTER TABLE `custom_domains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custom_pages`
--

DROP TABLE IF EXISTS `custom_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `custom_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`),
  KEY `pages_type_index` (`type`),
  KEY `pages_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custom_pages`
--

LOCK TABLES `custom_pages` WRITE;
/*!40000 ALTER TABLE `custom_pages` DISABLE KEYS */;
INSERT INTO `custom_pages` VALUES (1,'Privacy Policy','<h1>Example Privacy Policy</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>','privacy-policy',NULL,'default','2020-03-19 23:08:21','2020-03-19 23:08:21',NULL),(2,'Terms of Service','<h1>Example Terms of Service</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>','terms-of-service',NULL,'default','2020-03-19 23:08:21','2020-03-19 23:08:21',NULL),(3,'About Us','<h1>Example About Us</h1><p>The standard Lorem Ipsum passage, used since the 1500s\n    \"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\n\n<p>Section 1.10.32 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\n\n<p>1914 translation by H. Rackham\n    \"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\n\n<p>Section 1.10.33 of \"de Finibus Bonorum et Malorum\", written by Cicero in 45 BC\n    \"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\n\n<p>1914 translation by H. Rackham\n    \"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>','about-us',NULL,'default','2020-03-19 23:08:21','2020-03-19 23:08:21',NULL);
/*!40000 ALTER TABLE `custom_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_entries`
--

DROP TABLE IF EXISTS `file_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_entries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_size` bigint(20) unsigned NOT NULL DEFAULT '0',
  `mime` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extension` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `disk_prefix` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `path` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preview_token` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `thumbnail` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uploads_file_name_unique` (`file_name`),
  KEY `uploads_name_index` (`name`),
  KEY `uploads_user_id_index` (`user_id`),
  KEY `uploads_public_index` (`public`),
  KEY `file_entries_updated_at_index` (`updated_at`),
  KEY `file_entries_parent_id_index` (`parent_id`),
  KEY `file_entries_type_index` (`type`),
  KEY `file_entries_deleted_at_index` (`deleted_at`),
  KEY `file_entries_user_id_index` (`user_id`),
  KEY `file_entries_path_index` (`path`),
  KEY `file_entries_description_index` (`description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_entries`
--

LOCK TABLES `file_entries` WRITE;
/*!40000 ALTER TABLE `file_entries` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_entry_models`
--

DROP TABLE IF EXISTS `file_entry_models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `file_entry_models` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `file_entry_id` int(10) unsigned NOT NULL,
  `model_id` int(10) unsigned NOT NULL,
  `model_type` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `owner` tinyint(1) NOT NULL DEFAULT '0',
  `permissions` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uploadables_upload_id_uploadable_id_uploadable_type_unique` (`file_entry_id`,`model_id`,`model_type`),
  KEY `file_entry_models_owner_index` (`owner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_entry_models`
--

LOCK TABLES `file_entry_models` WRITE;
/*!40000 ALTER TABLE `file_entry_models` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_entry_models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `subscription_id` int(11) NOT NULL,
  `paid` tinyint(1) NOT NULL,
  `uuid` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invoices_subscription_id_index` (`subscription_id`),
  KEY `invoices_uuid_index` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_reserved_at_index` (`queue`,`reserved_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_clicks`
--

DROP TABLE IF EXISTS `link_clicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_clicks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `link_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `platform` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `device` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `browser` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `crawler` tinyint(1) NOT NULL DEFAULT '0',
  `referrer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `link_clicks_link_id_index` (`link_id`),
  KEY `link_clicks_link_type_index` (`link_type`),
  KEY `link_clicks_platform_index` (`platform`),
  KEY `link_clicks_device_index` (`device`),
  KEY `link_clicks_browser_index` (`browser`),
  KEY `link_clicks_location_index` (`location`),
  KEY `link_clicks_crawler_index` (`crawler`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_clicks`
--

LOCK TABLES `link_clicks` WRITE;
/*!40000 ALTER TABLE `link_clicks` DISABLE KEYS */;
INSERT INTO `link_clicks` VALUES (1,1,'direct','os x','desktop','chrome','us',0,NULL,'108.31.65.206','2020-03-19 23:13:31'),(2,2,'direct','os x','desktop','safari','us',0,NULL,'66.44.99.199','2020-03-25 19:14:28');
/*!40000 ALTER TABLE `link_clicks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_group_link`
--

DROP TABLE IF EXISTS `link_group_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_group_link` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `link_group_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link_group_link_link_id_link_group_id_unique` (`link_id`,`link_group_id`),
  KEY `link_group_link_link_id_index` (`link_id`),
  KEY `link_group_link_link_group_id_index` (`link_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_group_link`
--

LOCK TABLES `link_group_link` WRITE;
/*!40000 ALTER TABLE `link_group_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_group_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_groups`
--

DROP TABLE IF EXISTS `link_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `public` tinyint(1) NOT NULL DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `link_groups_user_id_index` (`user_id`),
  KEY `link_groups_public_index` (`public`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_groups`
--

LOCK TABLES `link_groups` WRITE;
/*!40000 ALTER TABLE `link_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_images`
--

DROP TABLE IF EXISTS `link_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_images`
--

LOCK TABLES `link_images` WRITE;
/*!40000 ALTER TABLE `link_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_overlays`
--

DROP TABLE IF EXISTS `link_overlays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_overlays` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `btn_link` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `btn_text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `colors` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `link_overlays_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_overlays`
--

LOCK TABLES `link_overlays` WRITE;
/*!40000 ALTER TABLE `link_overlays` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_overlays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_rules`
--

DROP TABLE IF EXISTS `link_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_rules` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_id` int(11) NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `link_rules_type_index` (`type`),
  KEY `link_rules_link_id_index` (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_rules`
--

LOCK TABLES `link_rules` WRITE;
/*!40000 ALTER TABLE `link_rules` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_rules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `link_tracking_pixel`
--

DROP TABLE IF EXISTS `link_tracking_pixel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `link_tracking_pixel` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `tracking_pixel_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `link_pixel_unique` (`link_id`,`tracking_pixel_id`),
  KEY `link_tracking_pixel_link_id_index` (`link_id`),
  KEY `link_tracking_pixel_tracking_pixel_id_index` (`tracking_pixel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `link_tracking_pixel`
--

LOCK TABLES `link_tracking_pixel` WRITE;
/*!40000 ALTER TABLE `link_tracking_pixel` DISABLE KEYS */;
/*!40000 ALTER TABLE `link_tracking_pixel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hash` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_url` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `expires_at` timestamp NULL DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `links_hash_unique` (`hash`),
  UNIQUE KEY `links_alias_unique` (`alias`),
  KEY `links_user_id_index` (`user_id`),
  KEY `links_domain_id_index` (`domain_id`),
  KEY `links_type_index` (`type`),
  KEY `links_type_id_index` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (1,'Robinson Coke Collections – vintage Coca-Cola collectibles for your happiness','89MMr',NULL,'https://www.robinsoncokecollections.com',1,NULL,NULL,0,NULL,'','direct',NULL,'2020-03-19 23:13:15','2020-03-19 23:13:15',NULL),(2,'Home – Gallaudet University','XdDD2',NULL,'http://gallaudet.edu',1,NULL,NULL,0,NULL,'Gallaudet University - There is no other place like this in the world!','direct',NULL,'2020-03-25 19:14:19','2020-03-25 19:14:19',NULL),(3,'Gallaudet University – Connect. Discover. Influence.','e9Lri',NULL,'http://asdasd.com',NULL,NULL,NULL,0,NULL,'','direct',NULL,'2020-03-26 00:10:32','2020-03-26 00:10:32',NULL),(4,'','AiszL',NULL,'http://ssssssssss.com/dasfsdfasdf',NULL,NULL,NULL,0,NULL,'','direct',NULL,'2020-03-26 00:10:43','2020-03-26 00:10:43',NULL);
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localizations`
--

DROP TABLE IF EXISTS `localizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `localizations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `language` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `localizations_name_index` (`name`),
  KEY `localizations_language_index` (`language`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localizations`
--

LOCK TABLES `localizations` WRITE;
/*!40000 ALTER TABLE `localizations` DISABLE KEYS */;
INSERT INTO `localizations` VALUES (1,'english','2020-03-19 23:08:21','2020-03-25 23:42:10','en');
/*!40000 ALTER TABLE `localizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_templates`
--

DROP TABLE IF EXISTS `mail_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `markdown` tinyint(1) NOT NULL DEFAULT '0',
  `action` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail_templates_file_name_unique` (`file_name`),
  UNIQUE KEY `mail_templates_action_unique` (`action`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_templates`
--

LOCK TABLES `mail_templates` WRITE;
/*!40000 ALTER TABLE `mail_templates` DISABLE KEYS */;
INSERT INTO `mail_templates` VALUES (1,'Share','share.blade.php','{{DISPLAY_NAME}} shared \'{{ITEM_NAME}}\' with you',0,'share','2020-03-19 23:08:21','2020-03-19 23:08:21'),(2,'Generic','generic.blade.php','{{EMAIL_SUBJECT}}',0,'generic','2020-03-19 23:08:21','2020-03-19 23:08:21'),(3,'Email Confirmation','email-confirmation.blade.php','Confirm your {{SITE_NAME}} account',0,'email_confirmation','2020-03-19 23:08:21','2020-03-19 23:08:21');
/*!40000 ALTER TABLE `mail_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2015_04_127_156842_create_social_profiles_table',1),(4,'2015_04_127_156842_create_users_oauth_table',1),(5,'2015_05_29_131549_create_settings_table',1),(6,'2016_03_18_142141_add_email_confirmation_to_users_table',1),(7,'2016_05_12_190852_create_tags_table',1),(8,'2016_05_12_190958_create_taggables_table',1),(9,'2016_05_26_170044_create_uploads_table',1),(10,'2016_05_27_143158_create_uploadables_table',1),(11,'2016_07_14_153703_create_groups_table',1),(12,'2016_07_14_153921_create_user_group_table',1),(13,'2017_07_02_120142_create_pages_table',1),(14,'2017_07_11_122825_create_localizations_table',1),(15,'2017_07_17_135837_create_mail_templates_table',1),(16,'2017_08_26_131330_add_private_field_to_settings_table',1),(17,'2017_09_17_144728_add_columns_to_users_table',1),(18,'2017_09_17_152854_make_password_column_nullable',1),(19,'2017_09_30_152855_make_settings_value_column_nullable',1),(20,'2017_10_01_152897_add_public_column_to_uploads_table',1),(21,'2017_12_04_132911_add_avatar_column_to_users_table',1),(22,'2018_01_10_140732_create_subscriptions_table',1),(23,'2018_01_10_140746_add_billing_to_users_table',1),(24,'2018_01_10_161706_create_billing_plans_table',1),(25,'2018_06_02_143319_create_user_file_entry_table',1),(26,'2018_07_24_113757_add_available_space_to_billing_plans_table',1),(27,'2018_07_24_124254_add_available_space_to_users_table',1),(28,'2018_07_26_142339_rename_groups_to_roles',1),(29,'2018_07_26_142842_rename_user_role_table_columns_to_roles',1),(30,'2018_08_07_124200_rename_uploads_to_file_entries',1),(31,'2018_08_07_124327_refactor_file_entries_columns',1),(32,'2018_08_07_130653_add_folder_path_column_to_file_entries_table',1),(33,'2018_08_07_140440_migrate_file_entry_users_to_many_to_many',1),(34,'2018_08_15_132225_move_uploads_into_subfolders',1),(35,'2018_08_31_104145_rename_uploadables_table',1),(36,'2018_08_31_104325_rename_file_entry_models_table_columns',1),(37,'2018_11_26_171703_add_type_and_title_columns_to_pages_table',1),(38,'2018_12_01_144233_change_unique_index_on_tags_table',1),(39,'2019_02_16_150049_delete_old_seo_settings',1),(40,'2019_02_24_141457_create_jobs_table',1),(41,'2019_03_11_162627_add_preview_token_to_file_entries_table',1),(42,'2019_03_12_160803_add_thumbnail_column_to_file_entries_table',1),(43,'2019_03_16_161836_add_paypal_id_column_to_billing_plans_table',1),(44,'2019_05_14_120930_index_description_column_in_file_entries_table',1),(45,'2019_05_21_135544_create_links_table',1),(46,'2019_05_22_130538_create_link_rules_table',1),(47,'2019_05_25_163134_create_link_clicks_table',1),(48,'2019_05_30_153248_create_link_images_table',1),(49,'2019_06_01_141515_create_link_groups_table',1),(50,'2019_06_01_141648_create_link_group_link_table',1),(51,'2019_06_08_120504_create_custom_domains_table',1),(52,'2019_06_10_143040_create_link_overlay_table',1),(53,'2019_06_13_140318_add_user_id_column_to_pages_table',1),(54,'2019_06_15_114320_rename_pages_table_to_custom_pages',1),(55,'2019_06_18_133933_create_permissions_table',1),(56,'2019_06_18_134203_create_permissionables_table',1),(57,'2019_06_18_135822_rename_permissions_columns',1),(58,'2019_06_25_133852_move_inline_permissions_to_separate_table',1),(59,'2019_06_26_121900_create_tracking_pixels_table',1),(60,'2019_06_26_135814_create_link_tracking_pixel_table',1),(61,'2019_07_08_122001_create_css_themes_table',1),(62,'2019_07_20_141752_create_invoices_table',1),(63,'2019_08_19_121112_add_global_column_to_custom_domains_table',1),(64,'2019_08_20_161927_add_api_token_to_users_table',1),(65,'2019_08_20_162247_add_api_tokens_to_existing_users',1),(66,'2019_09_13_141123_change_plan_amount_to_float',1),(67,'2019_10_14_171943_add_index_to_username_column',1),(68,'2019_10_20_143522_create_comments_table',1),(69,'2019_10_23_134520_create_notifications_table',1),(70,'2019_11_21_144956_add_resource_id_and_type_to_custom_domains_table',1),(71,'2019_12_14_194512_rename_public_path_column_to_disk_prefix',2),(72,'2019_12_24_165237_change_file_size_column_default_value_to_0',2),(73,'2019_12_28_190836_update_file_entry_models_table_to_v2',2),(74,'2019_12_28_191105_move_user_file_entry_table_records_to_file_entry_models',2),(75,'2020_01_26_143733_create_notification_subscriptions_table',2),(76,'2020_03_03_140720_add_language_col_to_localizations_table',2),(77,'2020_03_03_143142_add_lang_code_to_existing_localizations',2),(78,'2020_03_15_140407_add_status_and_desc_to_link_groups_table',2),(79,'2020_03_18_155747_add_soft_deletes_column_to_links_table',2),(80,'2020_03_21_142245_add_header_image_to_existing_appearance_settings',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_subscriptions`
--

DROP TABLE IF EXISTS `notification_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification_subscriptions` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notif_id` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `channels` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notification_subscriptions_notif_id_index` (`notif_id`),
  KEY `notification_subscriptions_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_subscriptions`
--

LOCK TABLES `notification_subscriptions` WRITE;
/*!40000 ALTER TABLE `notification_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` int(10) unsigned NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_id_notifiable_type_index` (`notifiable_id`,`notifiable_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissionables`
--

DROP TABLE IF EXISTS `permissionables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissionables` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `permissionable_id` int(11) NOT NULL,
  `permissionable_type` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restrictions` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissionable_unique` (`permission_id`,`permissionable_id`,`permissionable_type`),
  KEY `permissionables_permission_id_index` (`permission_id`),
  KEY `permissionables_permissionable_id_index` (`permissionable_id`),
  KEY `permissionables_permissionable_type_index` (`permissionable_type`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissionables`
--

LOCK TABLES `permissionables` WRITE;
/*!40000 ALTER TABLE `permissionables` DISABLE KEYS */;
INSERT INTO `permissionables` VALUES (1,1,1,'App\\User',NULL),(2,9,1,'Common\\Auth\\Roles\\Role','[]'),(3,36,1,'Common\\Auth\\Roles\\Role','[]'),(4,32,1,'Common\\Auth\\Roles\\Role','[]'),(5,20,1,'Common\\Auth\\Roles\\Role','[]'),(6,10,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":5}]'),(7,14,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":5}]'),(8,18,2,'Common\\Auth\\Roles\\Role','[]'),(9,20,2,'Common\\Auth\\Roles\\Role','[]'),(10,24,2,'Common\\Auth\\Roles\\Role','[]'),(11,32,2,'Common\\Auth\\Roles\\Role','[]'),(12,35,2,'Common\\Auth\\Roles\\Role','[]'),(13,36,2,'Common\\Auth\\Roles\\Role','[]'),(14,37,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":20},{\"name\":\"click_count\",\"value\":500}]'),(15,41,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":5}]'),(16,45,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":5}]'),(17,49,2,'Common\\Auth\\Roles\\Role','[{\"name\":\"count\",\"value\":5}]'),(18,9,2,'Common\\Auth\\Roles\\Role','[]'),(19,37,1,'Common\\Auth\\Roles\\Role','[]');
/*!40000 ALTER TABLE `permissionables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `group` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restrictions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'admin','Super Admin','Give all permissions to user.','admin',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(2,'admin.access','Access Admin','Required in order to access any admin area page.','admin',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(3,'appearance.update','Update Appearance','Allows access to appearance editor.','admin',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(4,'roles.view','View Roles','Allow viewing ALL roles.','roles',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(5,'roles.create','Create Roles','Allow creating new roles.','roles',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(6,'roles.update','Update Roles','Allow updating ALL roles.','roles',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(7,'roles.delete','Delete Roles','Allow deleting ALL roles.','roles',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(8,'reports.view','View Reports','Allows access to analytics page.','analytics',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(9,'custom_pages.view','View Custom Pages','Allow viewing ALL custom pages.','custom_pages',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(10,'custom_pages.create','Create Custom Pages','Allow creating new custom pages.','custom_pages','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of pages user will be able to create. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(11,'custom_pages.update','Update Custom Pages','Allow updating ALL custom pages.','custom_pages',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(12,'custom_pages.delete','Delete Custom Pages','Allow deleting ALL custom pages.','custom_pages',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(13,'custom_domains.view','View Custom Domains','Allow viewing ALL custom domains.','custom_domains',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(14,'custom_domains.create','Create Custom Domains','Allow creating new custom domains.','custom_domains','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of domains user will be able to create. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(15,'custom_domains.update','Update Custom Domains','Allow updating ALL custom domains.','custom_domains',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(16,'custom_domains.delete','Delete Custom Domains','Allow deleting ALL custom domains.','custom_domains',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(17,'files.view','View Files','Allow viewing ALL files.','files',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(18,'files.create','Create Files','Allow creating new files.','files',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(19,'files.delete','Delete Files','Allow deleting ALL files.','files',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(20,'users.view','View Users','Allow viewing ALL users.','users',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(21,'users.create','Create Users','Allow creating new users.','users',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(22,'users.update','Update Users','Allow updating ALL users.','users',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(23,'users.delete','Delete Users','Allow deleting ALL users.','users',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(24,'localizations.view','View Localizations','Allow viewing ALL localizations.','localizations',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(25,'localizations.create','Create Localizations','Allow creating new localizations.','localizations',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(26,'localizations.update','Update Localizations','Allow updating ALL localizations.','localizations',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(27,'localizations.delete','Delete Localizations','Allow deleting ALL localizations.','localizations',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(28,'mail_templates.view','View Mail Templates','Allow viewing ALL mail templates.','mail_templates',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(29,'mail_templates.update','Update Mail Templates','Allow updating ALL mail templates.','mail_templates',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(30,'settings.view','View Settings','Allow viewing ALL settings.','settings',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(31,'settings.update','Update Settings','Allow updating ALL settings.','settings',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(32,'plans.view','View Plans','Allow viewing ALL plans.','plans',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(33,'plans.create','Create Plans','Allow creating new plans.','plans',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(34,'plans.delete','Delete Plans','Allow deleting ALL plans.','plans',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(35,'api.access','Access Api','Required in order for users to be able to use the API.','api',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(36,'links.view','View Links','Allow viewing ALL links.','links',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(37,'links.create','Create Links','Allow creating new links.','links','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of urls user will be able to create. Leave empty for unlimited.\"},{\"name\":\"click_count\",\"type\":\"number\",\"description\":\"Maximum number of clicks\\/visits allowed per month for all user urls. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(38,'links.update','Update Links','Allow updating ALL links.','links',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(39,'links.delete','Delete Links','Allow deleting ALL links.','links',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(40,'link_overlays.view','View Link Overlays','Allow viewing ALL link overlays.','link_overlays',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(41,'link_overlays.create','Create Link Overlays','Allow creating new link overlays.','link_overlays','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of overlays user will be able to create. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(42,'link_overlays.update','Update Link Overlays','Allow updating ALL link overlays.','link_overlays',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(43,'link_overlays.delete','Delete Link Overlays','Allow deleting ALL link overlays.','link_overlays',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(44,'link_groups.view','View Link Groups','Allow viewing ALL link groups.','link_groups',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(45,'link_groups.create','Create Link Groups','Allow creating new link groups.','link_groups','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of groups user will be able to create. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(46,'link_groups.update','Update Link Groups','Allow updating ALL link groups.','link_groups',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(47,'link_groups.delete','Delete Link Groups','Allow deleting ALL link groups.','link_groups',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(48,'tracking_pixels.view','View Tracking Pixels','Allow viewing ALL tracking pixels.','tracking_pixels',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(49,'tracking_pixels.create','Create Tracking Pixels','Allow creating new tracking pixels.','tracking_pixels','[{\"name\":\"count\",\"type\":\"number\",\"description\":\"Maximum number of pixels user will be able to create. Leave empty for unlimited.\"}]','2020-03-19 23:08:21','2020-03-19 23:08:21'),(50,'tracking_pixels.update','Update Tracking Pixels','Allow updating ALL tracking pixels.','tracking_pixels',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(51,'tracking_pixels.delete','Delete Tracking Pixels','Allow deleting ALL tracking pixels.','tracking_pixels',NULL,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(52,'invoices.view','View Invoices','Allow viewing ALL invoices.','invoices',NULL,'2020-03-25 23:42:10','2020-03-25 23:42:10');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci,
  `default` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `guests` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_name_unique` (`name`),
  KEY `groups_default_index` (`default`),
  KEY `groups_guests_index` (`guests`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'guests',NULL,0,1,'2020-03-19 23:08:21','2020-03-19 23:08:21'),(2,'users',NULL,1,0,'2020-03-19 23:08:21','2020-03-19 23:08:21');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_name_unique` (`name`),
  KEY `settings_private_index` (`private`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'dates.format','yyyy-MM-dd','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(2,'dates.locale','en_US','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(3,'social.google.enable','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(4,'social.twitter.enable','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(5,'social.facebook.enable','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(6,'realtime.enable','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(7,'registration.disable','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(8,'cache.report_minutes','60','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(9,'branding.favicon','favicon.ico','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(10,'branding.logo_dark','','2020-03-19 23:08:21','2020-03-19 23:12:16',0),(11,'branding.logo_light','','2020-03-19 23:08:21','2020-03-19 23:12:16',0),(12,'i18n.default_localization','english','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(13,'i18n.enable','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(14,'logging.sentry_public','','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(15,'realtime.pusher_key','','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(16,'homepage.type','default','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(17,'themes.default_mode','light','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(18,'themes.user_change','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(19,'billing.enable','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(20,'billing.force_subscription','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(21,'billing.paypal_test_mode','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(22,'billing.stripe_test_mode','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(23,'billing.stripe.enable','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(24,'billing.paypal.enable','false','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(25,'billing.accepted_cards','[\"visa\",\"mastercard\",\"american-express\",\"discover\"]','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(26,'custom_domains.default_host','','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(27,'links.default_type','direct','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(28,'links.enable_type','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(29,'links.redirect_time','10','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(30,'links.geo_targeting','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(31,'links.device_targeting','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(32,'links.pixels','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(33,'links.homepage_creation','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(34,'links.homepage_stats','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(35,'homepage.appearance','{\"headerTitle\":\"Create Click-Worthy Links\",\"headerSubtitle\":\"BeLink helps you maximize the impact of every digital initiative with industry-leading features and tools.\",\"footerTitle\":\"The easiest way to get more clicks with custom links.\",\"footerSubtitle\":\"Attract More Clicks Now\",\"actions\":{\"inputText\":\"Paste a long url\",\"inputButton\":\"Shorten\",\"cta1\":\"Get Started\",\"cta2\":\"Learn More\"},\"primaryFeatures\":[{\"title\":\"Password Protect\",\"subtitle\":\"Set a password to protect your links from unauthorized access.\",\"image\":\"client\\/assets\\/images\\/landing\\/lock.svg\"},{\"title\":\"Retargeting\",\"subtitle\":\"Add retargeting pixels to your links and turn every URL into perfectly targeted ads.\",\"image\":\"client\\/assets\\/images\\/landing\\/globe.svg\"},{\"title\":\"Groups\",\"subtitle\":\"Group links together for easier management and analytics for a group as well as individual links.\",\"image\":\"client\\/assets\\/images\\/landing\\/campaign.svg\"}],\"secondaryFeatures\":[{\"title\":\"Monitor your link performance.\",\"subtitle\":\"ADVANCED ANALYTICS\",\"description\":\"Full analytics for individual links and link groups, including geo and device information, referrers, browser, ip and more.\",\"image\":\"client\\/assets\\/images\\/landing\\/stats.png\"},{\"title\":\"Manage your links.\",\"subtitle\":\"FULLY-FEATURED DASHBOARD\",\"description\":\"Control everything from the dashboard. Manage your URLs, groups, custom pages, pixels, custom domains and more.\",\"image\":\"client\\/assets\\/images\\/landing\\/dashboard.png\"}],\"headerImage\":\"client\\/assets\\/images\\/landing\\/landing-bg.svg\",\"headerImageOpacity\":1,\"headerOverlayColor1\":null,\"headerOverlayColor2\":null,\"footerImage\":\"client\\/assets\\/images\\/landing\\/landing-bg.svg\"}','2020-03-19 23:08:21','2020-03-25 23:42:10',0),(36,'menus','[{\"name\":\"User Dashboard\",\"position\":\"dashboard-sidebar\",\"items\":[{\"type\":\"route\",\"order\":1,\"position\":0,\"activeExact\":true,\"label\":\"Dashboard\",\"action\":\"dashboard\",\"icon\":\"home\"},{\"type\":\"route\",\"order\":1,\"position\":1,\"label\":\"Links\",\"action\":\"dashboard\\/links\",\"icon\":\"link\"},{\"type\":\"route\",\"order\":1,\"position\":2,\"label\":\"Link Groups\",\"action\":\"dashboard\\/link-groups\",\"icon\":\"dashboard\"},{\"type\":\"route\",\"order\":1,\"position\":3,\"label\":\"Custom Domains\",\"action\":\"dashboard\\/custom-domains\",\"icon\":\"www\"},{\"type\":\"route\",\"order\":1,\"position\":4,\"label\":\"Link Overlays\",\"action\":\"dashboard\\/link-overlays\",\"icon\":\"tooltip\"},{\"type\":\"route\",\"order\":1,\"position\":5,\"label\":\"Link Pages\",\"action\":\"dashboard\\/custom-pages\",\"icon\":\"page\"},{\"type\":\"route\",\"order\":1,\"position\":6,\"label\":\"Tracking Pixels\",\"action\":\"dashboard\\/pixels\",\"icon\":\"tracking\"}]},{\"name\":\"footer\",\"position\":\"footer\",\"items\":[{\"type\":\"link\",\"order\":1,\"position\":1,\"label\":\"Privacy Policy\",\"action\":\"\\/pages\\/1\\/privacy-policy\"},{\"type\":\"link\",\"order\":1,\"position\":2,\"label\":\"Terms of Service\",\"action\":\"\\/pages\\/2\\/terms-of-service\"},{\"type\":\"link\",\"order\":1,\"position\":3,\"label\":\"Contact Us\",\"action\":\"\\/contact\"}]}]','2020-03-19 23:08:21','2020-03-25 23:42:10',0),(37,'custom_domains.allow_select','true','2020-03-19 23:08:21','2020-03-19 23:08:21',0),(38,'branding.site_description','','2020-03-19 23:10:57','2020-03-19 23:12:16',0),(39,'uploads.chunk','true','2020-03-25 23:42:10','2020-03-25 23:42:10',0),(40,'uploads.chunk_size','5242880','2020-03-25 23:42:10','2020-03-25 23:42:10',0),(41,'cookie_notice.enable','true','2020-03-25 23:42:10','2020-03-25 23:42:10',0),(42,'cookie_notice.position','bottom','2020-03-25 23:42:10','2020-03-25 23:42:10',0),(43,'links.alias_min','5','2020-03-25 23:42:10','2020-03-25 23:42:10',0),(44,'links.alias_max','10','2020-03-25 23:42:10','2020-03-25 23:42:10',0);
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_profiles`
--

DROP TABLE IF EXISTS `social_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social_profiles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_service_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `social_profiles_user_id_service_name_unique` (`user_id`,`service_name`),
  UNIQUE KEY `social_profiles_service_name_user_service_id_unique` (`service_name`,`user_service_id`),
  KEY `social_profiles_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_profiles`
--

LOCK TABLES `social_profiles` WRITE;
/*!40000 ALTER TABLE `social_profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscriptions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `plan_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gateway` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'none',
  `gateway_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'none',
  `quantity` int(11) NOT NULL DEFAULT '1',
  `description` text COLLATE utf8mb4_unicode_ci,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `ends_at` timestamp NULL DEFAULT NULL,
  `renews_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_gateway_index` (`gateway`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taggables`
--

DROP TABLE IF EXISTS `taggables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taggables` (
  `tag_id` int(10) unsigned NOT NULL,
  `taggable_id` int(10) unsigned NOT NULL,
  `taggable_type` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  UNIQUE KEY `taggables_tag_id_taggable_id_user_id_taggable_type_unique` (`tag_id`,`taggable_id`,`user_id`,`taggable_type`),
  KEY `taggables_tag_id_index` (`tag_id`),
  KEY `taggables_taggable_id_index` (`taggable_id`),
  KEY `taggables_taggable_type_index` (`taggable_type`),
  KEY `taggables_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taggables`
--

LOCK TABLES `taggables` WRITE;
/*!40000 ALTER TABLE `taggables` DISABLE KEYS */;
/*!40000 ALTER TABLE `taggables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'custom',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_type_unique` (`name`,`type`),
  KEY `tags_type_index` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracking_pixels`
--

DROP TABLE IF EXISTS `tracking_pixels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tracking_pixels` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pixel_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `head_code` text COLLATE utf8mb4_unicode_ci,
  `body_code` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tracking_pixels_name_user_id_unique` (`name`,`user_id`),
  KEY `tracking_pixels_type_index` (`type`),
  KEY `tracking_pixels_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracking_pixels`
--

LOCK TABLES `tracking_pixels` WRITE;
/*!40000 ALTER TABLE `tracking_pixels` DISABLE KEYS */;
/*!40000 ALTER TABLE `tracking_pixels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_file_entry`
--

DROP TABLE IF EXISTS `user_file_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_file_entry` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `file_entry_id` int(10) unsigned NOT NULL,
  `owner` tinyint(1) NOT NULL DEFAULT '0',
  `permissions` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_file_entry_file_entry_id_user_id_unique` (`file_entry_id`,`user_id`),
  KEY `user_file_entry_user_id_index` (`user_id`),
  KEY `user_file_entry_file_entry_id_index` (`file_entry_id`),
  KEY `user_file_entry_owner_index` (`owner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_file_entry`
--

LOCK TABLES `user_file_entry` WRITE;
/*!40000 ALTER TABLE `user_file_entry` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_file_entry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_group_user_id_group_id_unique` (`user_id`,`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,2,'2020-03-19 23:08:21');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `legacy_permissions` text COLLATE utf8mb4_unicode_ci,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `api_token` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_brand` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `card_last_four` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '1',
  `confirmation_code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `stripe_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available_space` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_api_token_unique` (`api_token`),
  KEY `users_username_index` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'drobinson@eyethstudios.com',NULL,NULL,NULL,NULL,NULL,'drobinson@eyethstudios.com','$2y$10$89GR3ZzIAjyMoOsYDTLqLuDuMbeglsmFNjYq6XTpI/I5owyAD8EL6','h6XjnKsLBZ3LFGpX62ATLWM5CoMhJXk0Pmd6Ofca',NULL,NULL,'8FSwSq4z15Am4XNmTeGd5HStHinG6Fc0NzLzur874nBkahQgdzWXjLHqQnRg','2020-03-19 23:08:21','2020-03-19 23:08:21',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_oauth`
--

DROP TABLE IF EXISTS `users_oauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_oauth` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `service` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_oauth_user_id_service_unique` (`user_id`,`service`),
  UNIQUE KEY `users_oauth_token_unique` (`token`),
  KEY `users_oauth_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_oauth`
--

LOCK TABLES `users_oauth` WRITE;
/*!40000 ALTER TABLE `users_oauth` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_oauth` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-30 17:34:02
