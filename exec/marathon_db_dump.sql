-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: marathon
-- ------------------------------------------------------
-- Server version       8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `seq` bigint NOT NULL,
  PRIMARY KEY (`seq`),
  CONSTRAINT `FKrf8rklbtq8ymctcrct4iojg55` FOREIGN KEY (`seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `link` varchar(255) DEFAULT NULL,
  `seq` bigint NOT NULL,
  PRIMARY KEY (`seq`),
  CONSTRAINT `FK7mwdjsoxywgro1e8t32crbert` FOREIGN KEY (`seq`) REFERENCES `communication` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
INSERT INTO `alarm` VALUES ('1676597904473marathonf9ae87eb-9989-44e9-8a9b-dfd6d15588ee',76),('1676598655586marathon504be2d3-f64d-4c06-8068-c79dec893f0d',81),('1676598833628marathon39bec90f-f21d-4b9a-a55d-f76675ba14fd',83);
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `seq` bigint NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `regist_date` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `view_cnt` int NOT NULL,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (8,'🎉언어재활 학습지 9탄 이벤트 당첨자 발표를 하겠습니다!!🎉\n\n김0호님, 김0훈님\n\n당첨을  축하드립니다!!\n\n\n\n당첨되신 분들께는\n\n만원 상당의 선물을 발송해드립니다. 😄\n\n아쉽게 당첨되진 못했지만\n\n이벤트에 참여해주신 분들께도 소정의 선물을 보내드리겠습니다.\n\n \n\n자택으로 언어재활 학습지를 받아보길 원하신다면\n\n카카오톡 채널 @언어발전소에 메시지 남겨 주세요!','2023-02-17 10:15:50.580938','📣 언어재활 학습지 9탄 이벤트 당첨자 발표',9),(22,'🔹 목적 \n\n- 학령기 아동의 의사소통 문제 해결을 위한 프로그램 개발 \n\n- 언어재활사의 비대면 언어재활 능력 함양 및 사 업화 기회 제공 \n\n- 비대면 그룹 프로그램의 발전 지원 \n\n\n🔹 상금 (총 400만원 상당)\n\n- 대상 (1팀) : 200만원 \n\n- 최우수상 (1팀) : 100만원\n\n- 우수상 (2팀) : 50만원\n\n* 세션비 (강사료)는 별도 지급\n','2023-02-17 10:17:28.440307','✅  그룹 의사소통 프로그램 공모전 안내 👩‍🏫',9),(23,'김0영님, 소0진님\n\n당첨을 축하드립니다!!\n\n\n\n당첨되신 분들께는\n\n만원 상당의 선물을 발송해드립니다. 😄\n\n아쉽게 당첨되진 못했지만\n\n이벤트에 참여해주신 분들께도 소정의 선물을 보내드리겠습니다.\n\n \n\n자택으로 언어재활 학습지를 받아보길 원하신다면\n\n카카오톡채널 @언어발전소에 메시지 남겨 주세요!','2023-02-17 10:18:14.961467','📣 언어재활 학습지 10탄 이벤트 당첨자 발표',19),(26,'온라인 사회성 캠프는\n\n이화여대 언어병리학과 교수로\n\n아동 이중언어 분야 권위자이신 임동선 교수님과\n\n임동선 아이세이 언어연구소 연구원들과 수개월간 준비한 탄탄한 프로그램으로,\n\n\n\n언어발전소의 비대면 수업 노하우를 녹여\n\n화용언어에 어려움을 겪는 초등 저학년, 예비초등 아동 에게\n\n실질적인 도움이 될 수 있도록 구성했습니다.\n\n코로나19 상황에서 초등학교에 입학한\n\n우리아이의 학교생활과 교우 관계가 걱정되는 학부모님,\n\n\n\n모두모두 주목해 주세요!','2023-02-17 10:18:53.219807','👧🏻👦🏻 만 6-8세 자녀를 둔 학부모님께 추천하는 \"온라인 사회성 캠프\" 참여자 모집',12),(32,'🎉 언어발전소의 누적 수업 횟수가 1만 회를 돌파했습니다! 🎉\n\n지난 2년간 한결같은 관심과 열심으로 1만회 수업에 참여해주신 여러분, 감사합니다.\n\n20회 수업권 구매하시고 10만원 상당의 검사를 무료로 받을 수 있는 기회를 놓치지 마세요.\n\n▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️▪️▫️\n\n유효기간 \n* 이벤트 검사권: 지급일로부터 6개월 이내\n* 20회 수업권: 구매일로부터 3개월 이내','2023-02-17 10:19:31.080705','💛 [고마워 1만] 화상 언어재활 수업 1만회 돌파 기념 말-언어 검사 무료 이벤트💙',15);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communication`
--

DROP TABLE IF EXISTS `communication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `communication` (
  `dtype` varchar(31) NOT NULL,
  `seq` bigint NOT NULL,
  `checked` bit(1) DEFAULT NULL,
  `date_time` datetime(6) DEFAULT NULL,
  `receiver_user_seq` bigint DEFAULT NULL,
  `sender_user_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK5lc4d9rikoppmmk8uc1j9pmrg` (`receiver_user_seq`),
  KEY `FKsjqc9wrpj1qfpbb4rtxojlfaq` (`sender_user_seq`),
  CONSTRAINT `FK5lc4d9rikoppmmk8uc1j9pmrg` FOREIGN KEY (`receiver_user_seq`) REFERENCES `user` (`seq`),
  CONSTRAINT `FKsjqc9wrpj1qfpbb4rtxojlfaq` FOREIGN KEY (`sender_user_seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communication`
--

LOCK TABLES `communication` WRITE;
/*!40000 ALTER TABLE `communication` DISABLE KEYS */;
INSERT INTO `communication` VALUES ('Alarm',76,_binary '','2023-02-17 10:38:05.976025',6,3),('Alarm',81,_binary '','2023-02-17 10:51:29.489769',5,2),('Alarm',83,_binary '','2023-02-17 10:54:27.532848',5,2);
/*!40000 ALTER TABLE `communication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consulting`
--

DROP TABLE IF EXISTS `consulting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consulting` (
  `consulting_seq` bigint NOT NULL,
  `birth_date` date DEFAULT NULL,
  `checked` bit(1) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `hope_date` date DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone1` varchar(255) DEFAULT NULL,
  `phone2` varchar(255) DEFAULT NULL,
  `phone2_relationship` varchar(255) DEFAULT NULL,
  `phone3` varchar(255) DEFAULT NULL,
  `phone3_relationship` varchar(255) DEFAULT NULL,
  `sex` bit(1) NOT NULL,
  `sick_date` date DEFAULT NULL,
  PRIMARY KEY (`consulting_seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consulting`
--

LOCK TABLES `consulting` WRITE;
/*!40000 ALTER TABLE `consulting` DISABLE KEYS */;
/*!40000 ALTER TABLE `consulting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `degree` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `seq` bigint NOT NULL,
  PRIMARY KEY (`seq`),
  CONSTRAINT `FKgpq1ueuahpuehvsgxb7ighlxa` FOREIGN KEY (`seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (NULL,'젊고 건강한 분들도 영양제를 매일 챙겨 먹고 운동을 하며 몸을 꾸준히 관리하듯이, 재활  또한 단기간이 아닌 일상 속에서의 꾸준한 관리가 필요하다고 생각합니다.',NULL,2),(NULL,'수업이 화상으로 진행되다 보니 가끔 환자분들의 미세한 표정이나 상태들이 잘 보이지 않아 어려운 점은 있습니다. 하지만 그것보다 훨씬 많은 이점이 있다고 생각합니다.',NULL,3),(NULL,'체력적, 시간상으로 재활을 꾸준히 받기 힘드신 분들도 장소에 구애받지 않고 전자기기만 있으면 손쉽게 반복해서 복습을 할 수 있다는 건 큰 이점 입니다!',NULL,4);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_score`
--

DROP TABLE IF EXISTS `game_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game_score` (
  `seq` bigint NOT NULL,
  `correct` int NOT NULL,
  `date` date DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  `game_type` int NOT NULL,
  `time` time DEFAULT NULL,
  `patient_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKjsm8tofffrhym7mxkfw2iii3j` (`patient_seq`),
  CONSTRAINT `FKjsm8tofffrhym7mxkfw2iii3j` FOREIGN KEY (`patient_seq`) REFERENCES `patient` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_score`
--

LOCK TABLES `game_score` WRITE;
/*!40000 ALTER TABLE `game_score` DISABLE KEYS */;
INSERT INTO `game_score` VALUES (345,3,'2021-01-02','normal',1,'08:13:07',5),(346,10,'2021-01-04','hard',2,'03:36:36',5),(347,2,'2021-01-06','easy',1,'06:27:29',5),(348,1,'2021-01-07','hard',1,'18:40:06',5),(349,5,'2021-01-08','hard',3,'05:58:13',5),(350,2,'2021-01-09','hard',1,'08:19:36',5),(351,0,'2021-01-10','normal',1,'12:04:51',5),(352,0,'2021-01-13','hard',1,'04:17:55',5),(353,8,'2021-01-14','easy',2,'04:14:40',5),(354,7,'2021-01-15','normal',3,'00:00:55',5),(355,6,'2021-01-16','normal',3,'15:37:15',5),(356,4,'2021-01-17','easy',1,'20:49:35',5),(357,5,'2021-01-19','normal',1,'01:46:40',5),(358,1,'2021-01-21','hard',2,'12:05:54',5),(359,3,'2021-01-24','hard',2,'05:58:06',5),(360,7,'2021-01-27','normal',3,'16:55:33',5),(361,10,'2021-01-28','normal',1,'15:55:41',5),(362,7,'2021-01-29','normal',1,'06:15:32',5),(363,10,'2021-01-30','normal',3,'07:05:28',5),(364,1,'2021-01-31','easy',1,'07:24:08',5),(365,5,'2021-02-01','hard',1,'04:21:17',5),(366,4,'2021-02-04','hard',3,'06:33:01',5),(367,4,'2021-02-05','easy',1,'01:45:35',5),(368,7,'2021-02-07','normal',1,'20:06:55',5),(369,3,'2021-02-09','easy',2,'16:52:20',5),(370,0,'2021-02-10','normal',1,'02:16:07',5),(371,8,'2021-02-12','normal',1,'10:07:20',5),(372,3,'2021-02-14','easy',1,'01:45:34',5),(373,6,'2021-02-15','hard',2,'10:34:30',5),(374,9,'2021-02-18','normal',1,'20:16:51',5),(375,5,'2021-02-21','normal',1,'07:59:04',5),(376,4,'2021-02-24','easy',1,'13:07:56',5),(377,4,'2021-02-25','easy',1,'20:42:55',5),(378,5,'2021-02-28','normal',2,'07:17:31',5),(379,8,'2021-03-01','normal',3,'04:06:03',5),(380,10,'2021-03-03','normal',3,'23:17:34',5),(381,10,'2021-03-04','hard',1,'21:48:22',5),(382,5,'2021-03-05','normal',3,'10:18:07',5),(383,8,'2021-03-07','normal',3,'22:49:16',5),(384,10,'2021-03-10','easy',3,'22:53:34',5),(385,2,'2021-03-11','normal',2,'09:38:59',5),(386,0,'2021-03-12','easy',2,'12:01:34',5),(387,8,'2021-03-13','hard',1,'08:20:40',5),(388,4,'2021-03-16','hard',2,'10:42:16',5),(389,2,'2021-03-18','easy',2,'00:53:23',5),(390,3,'2021-03-20','hard',1,'00:52:15',5),(391,7,'2021-03-23','easy',1,'19:10:22',5),(392,3,'2021-03-25','normal',1,'18:54:15',5),(393,6,'2021-03-26','normal',2,'06:49:17',5),(394,10,'2021-03-29','hard',1,'01:12:56',5),(395,0,'2021-03-31','easy',3,'23:38:15',5),(396,4,'2021-04-01','easy',1,'12:35:29',5),(397,7,'2021-04-04','hard',1,'16:35:53',5),(398,7,'2021-04-06','easy',2,'22:45:58',5),(399,6,'2021-04-07','hard',1,'22:03:27',5),(400,1,'2021-04-09','easy',2,'04:42:59',5),(401,8,'2021-04-10','hard',3,'10:16:00',5),(402,2,'2021-04-11','hard',2,'02:31:19',5),(403,0,'2021-04-12','normal',1,'19:22:26',5),(404,0,'2021-04-13','easy',1,'19:37:43',5),(405,8,'2021-04-15','normal',2,'18:57:27',5),(406,5,'2021-04-16','normal',1,'06:22:01',5),(407,10,'2021-04-19','easy',2,'22:12:10',5),(408,2,'2021-04-22','hard',2,'03:39:46',5),(409,10,'2021-04-24','easy',3,'21:27:40',5),(410,10,'2021-04-27','easy',3,'19:48:32',5),(411,3,'2021-04-30','easy',2,'22:08:57',5),(412,4,'2021-05-03','hard',3,'04:01:30',5),(413,5,'2021-05-06','hard',3,'17:43:28',5),(414,2,'2021-05-08','easy',2,'04:14:34',5),(415,1,'2021-05-09','easy',3,'15:17:31',5),(416,8,'2021-05-10','hard',1,'03:30:05',5),(417,10,'2021-05-12','hard',2,'16:25:04',5),(418,1,'2021-05-14','hard',1,'20:56:08',5),(419,9,'2021-05-15','normal',3,'00:36:57',5),(420,0,'2021-05-16','hard',3,'04:57:15',5),(421,4,'2021-05-17','hard',1,'21:47:17',5),(422,0,'2021-05-19','easy',3,'06:46:00',5),(423,8,'2021-05-22','normal',3,'13:35:17',5),(424,7,'2021-05-24','hard',1,'04:35:22',5),(425,0,'2021-05-25','normal',1,'19:13:38',5),(426,6,'2021-05-28','normal',3,'11:21:23',5),(427,9,'2021-05-29','normal',2,'14:27:30',5),(428,1,'2021-05-30','hard',3,'22:20:54',5),(429,5,'2021-06-02','easy',2,'14:08:55',5),(430,2,'2021-06-03','hard',2,'21:39:40',5),(431,4,'2021-06-04','hard',2,'01:21:34',5),(432,8,'2021-06-05','normal',1,'03:13:45',5),(433,0,'2021-06-06','normal',3,'09:05:14',5),(434,10,'2021-06-09','hard',2,'05:04:42',5),(435,3,'2021-06-11','hard',3,'13:00:19',5),(436,6,'2021-06-14','easy',3,'20:41:51',5),(437,2,'2021-06-16','normal',1,'01:23:44',5),(438,5,'2021-06-18','easy',2,'08:18:32',5),(439,8,'2021-06-19','easy',1,'19:43:15',5),(440,1,'2021-06-22','normal',1,'02:07:20',5),(441,4,'2021-06-25','easy',3,'10:25:46',5),(442,6,'2021-06-27','hard',2,'21:03:39',5),(443,1,'2021-06-29','easy',3,'07:07:39',5),(444,10,'2021-07-01','easy',2,'21:46:14',5),(445,9,'2021-07-04','easy',2,'04:23:20',5),(446,5,'2021-07-06','easy',2,'18:09:28',5),(447,9,'2021-07-07','normal',1,'08:17:28',5),(448,5,'2021-07-10','easy',2,'17:00:49',5),(449,0,'2021-07-13','easy',3,'15:09:54',5),(450,0,'2021-07-15','easy',2,'07:44:51',5),(451,0,'2021-07-18','hard',2,'06:46:05',5),(452,1,'2021-07-19','easy',2,'18:03:55',5),(453,5,'2021-07-21','normal',1,'17:14:57',5),(454,0,'2021-07-23','easy',1,'07:23:03',5),(455,1,'2021-07-24','easy',2,'21:44:04',5),(456,1,'2021-07-26','easy',1,'19:17:00',5),(457,1,'2021-07-29','easy',1,'20:55:00',5),(458,3,'2021-07-31','hard',3,'05:41:45',5),(459,7,'2021-08-01','hard',1,'09:08:30',5),(460,1,'2021-08-02','hard',3,'11:19:08',5),(461,7,'2021-08-03','hard',3,'12:01:37',5),(462,0,'2021-08-04','hard',3,'14:24:15',5),(463,0,'2021-08-06','hard',1,'00:58:45',5),(464,9,'2021-08-07','hard',2,'03:33:20',5),(465,0,'2021-08-08','easy',3,'01:35:49',5),(466,3,'2021-08-09','easy',3,'11:14:43',5),(467,9,'2021-08-10','hard',1,'18:03:01',5),(468,10,'2021-08-12','hard',2,'18:36:41',5),(469,6,'2021-08-13','easy',1,'18:50:57',5),(470,2,'2021-08-15','easy',3,'19:14:42',5),(471,9,'2021-08-16','hard',2,'17:03:05',5),(472,3,'2021-08-18','hard',2,'11:52:54',5),(473,10,'2021-08-21','normal',3,'02:23:40',5),(474,2,'2021-08-22','normal',1,'11:51:54',5),(475,10,'2021-08-25','hard',1,'14:35:10',5),(476,1,'2021-08-26','easy',1,'17:14:03',5),(477,5,'2021-08-28','normal',3,'04:16:49',5),(478,3,'2021-08-29','easy',1,'00:41:23',5),(479,9,'2021-08-30','easy',3,'22:49:16',5),(480,9,'2021-09-02','normal',1,'07:52:21',5),(481,1,'2021-09-05','easy',3,'22:51:30',5),(482,10,'2021-09-06','easy',3,'12:39:47',5),(483,10,'2021-09-08','hard',1,'23:55:44',5),(484,9,'2021-09-09','normal',1,'13:35:20',5),(485,10,'2021-09-11','normal',2,'23:22:58',5),(486,8,'2021-09-14','normal',3,'20:58:24',5),(487,1,'2021-09-15','easy',2,'01:26:04',5),(488,0,'2021-09-16','hard',3,'16:13:08',5),(489,0,'2021-09-19','hard',3,'21:46:09',5),(490,5,'2021-09-20','easy',1,'18:52:01',5),(491,5,'2021-09-22','normal',1,'01:16:12',5),(492,2,'2021-09-23','easy',2,'20:03:40',5),(493,2,'2021-09-24','normal',3,'10:43:13',5),(494,0,'2021-09-25','normal',3,'20:35:21',5),(495,0,'2021-09-26','easy',2,'09:14:02',5),(496,5,'2021-09-28','easy',2,'01:10:39',5),(497,8,'2021-10-01','hard',1,'03:08:13',5),(498,8,'2021-10-02','easy',2,'17:20:30',5),(499,6,'2021-10-03','normal',2,'13:00:25',5),(500,0,'2021-10-06','hard',3,'00:32:37',5),(501,5,'2021-10-08','normal',2,'23:33:48',5),(502,4,'2021-10-10','normal',1,'17:22:42',5),(503,4,'2021-10-13','normal',3,'22:52:34',5),(504,3,'2021-10-16','normal',2,'11:37:38',5),(505,3,'2021-10-19','normal',1,'20:27:45',5),(506,4,'2021-10-22','hard',3,'11:59:30',5),(507,6,'2021-10-24','normal',3,'11:09:21',5),(508,3,'2021-10-26','easy',2,'11:49:39',5),(509,8,'2021-10-29','normal',1,'14:28:35',5),(510,5,'2021-11-01','hard',2,'01:47:45',5),(511,4,'2021-11-04','easy',2,'06:26:26',5),(512,9,'2021-11-05','hard',2,'20:25:30',5),(513,2,'2021-11-08','hard',2,'07:19:40',5),(514,4,'2021-11-09','hard',2,'03:38:45',5),(515,9,'2021-11-10','easy',3,'05:29:45',5),(516,3,'2021-11-11','normal',1,'09:37:58',5),(517,0,'2021-11-12','normal',1,'20:05:54',5),(518,3,'2021-11-14','normal',1,'16:48:00',5),(519,7,'2021-11-15','easy',2,'21:40:41',5),(520,4,'2021-11-16','hard',3,'19:46:27',5),(521,10,'2021-11-18','hard',1,'13:32:59',5),(522,3,'2021-11-20','easy',1,'18:42:11',5),(523,9,'2021-11-22','easy',2,'23:19:37',5),(524,2,'2021-11-23','easy',2,'13:31:56',5),(525,1,'2021-11-26','normal',3,'19:01:44',5),(526,6,'2021-11-29','easy',1,'10:44:25',5),(527,9,'2021-11-30','hard',3,'07:38:16',5),(528,4,'2021-12-02','hard',1,'03:58:27',5),(529,4,'2021-12-04','easy',3,'05:44:04',5),(530,1,'2021-12-05','easy',2,'04:57:18',5),(531,7,'2021-12-07','easy',1,'22:10:01',5),(532,6,'2021-12-10','normal',1,'23:33:48',5),(533,4,'2021-12-12','hard',3,'03:22:25',5),(534,10,'2021-12-15','normal',1,'04:39:43',5),(535,7,'2021-12-16','hard',2,'15:08:41',5),(536,0,'2021-12-17','easy',2,'11:51:47',5),(537,4,'2021-12-20','normal',1,'17:57:33',5),(538,9,'2021-12-23','normal',2,'20:27:39',5),(539,10,'2021-12-26','normal',2,'08:09:44',5),(540,2,'2021-12-29','hard',3,'14:12:12',5),(541,4,'2021-12-31','hard',2,'05:57:03',5),(542,4,'2022-01-03','normal',1,'19:40:54',5),(543,5,'2022-01-06','normal',1,'15:14:13',5),(544,4,'2022-01-07','hard',1,'07:46:59',5),(545,6,'2022-01-08','easy',1,'11:41:57',5),(546,8,'2022-01-11','hard',3,'20:37:34',5),(547,10,'2022-01-12','normal',3,'23:33:52',5),(548,8,'2022-01-13','hard',2,'03:54:08',5),(549,0,'2022-01-15','easy',1,'08:54:28',5),(550,6,'2022-01-18','hard',3,'11:06:04',5),(551,0,'2022-01-21','hard',3,'13:48:25',5),(552,7,'2022-01-22','easy',2,'13:06:46',5),(553,6,'2022-01-24','hard',3,'09:33:35',5),(554,2,'2022-01-26','easy',1,'08:07:37',5),(555,8,'2022-01-29','normal',1,'08:37:04',5),(556,6,'2022-01-31','hard',1,'19:37:45',5),(557,9,'2022-02-01','hard',2,'01:56:33',5),(558,10,'2022-02-02','easy',1,'01:55:31',5),(559,8,'2022-02-04','hard',2,'17:49:56',5),(560,2,'2022-02-05','easy',3,'12:30:56',5),(561,1,'2022-02-06','normal',1,'17:16:08',5),(562,10,'2022-02-07','easy',3,'10:30:17',5),(563,10,'2022-02-10','hard',2,'22:59:08',5),(564,8,'2022-02-11','hard',1,'14:41:40',5),(565,3,'2022-02-13','easy',1,'08:03:08',5),(566,6,'2022-02-15','hard',3,'21:40:41',5),(567,4,'2022-02-16','hard',3,'01:55:26',5),(568,4,'2022-02-19','hard',1,'20:35:27',5),(569,5,'2022-02-20','hard',3,'13:53:47',5),(570,3,'2022-02-21','normal',1,'18:51:56',5),(571,1,'2022-02-24','normal',2,'01:27:02',5),(572,9,'2022-02-25','normal',1,'09:47:49',5),(573,8,'2022-02-26','hard',1,'07:31:44',5),(574,1,'2022-02-28','normal',2,'13:54:51',5),(575,5,'2022-03-01','normal',3,'23:02:14',5),(576,1,'2022-03-04','hard',3,'02:19:20',5),(577,7,'2022-03-06','normal',3,'18:15:01',5),(578,4,'2022-03-09','normal',3,'11:49:38',5),(579,8,'2022-03-12','easy',1,'21:32:01',5),(580,5,'2022-03-14','easy',3,'05:21:09',5),(581,7,'2022-03-15','easy',2,'20:57:12',5),(582,1,'2022-03-16','hard',1,'21:27:31',5),(583,3,'2022-03-19','easy',3,'12:57:14',5),(584,3,'2022-03-20','easy',2,'11:18:06',5),(585,7,'2022-03-23','normal',1,'05:36:18',5),(586,8,'2022-03-26','normal',3,'20:25:29',5),(587,2,'2022-03-29','hard',2,'03:17:07',5),(588,7,'2022-03-30','normal',1,'07:08:41',5),(589,0,'2022-03-31','normal',3,'11:38:44',5),(590,8,'2022-04-02','hard',2,'00:33:40',5),(591,7,'2022-04-04','easy',1,'13:29:46',5),(592,4,'2022-04-07','hard',1,'00:01:04',5),(593,3,'2022-04-09','easy',1,'20:46:21',5),(594,4,'2022-04-10','hard',3,'00:44:35',5),(595,8,'2022-04-11','easy',2,'21:08:56',5),(596,3,'2022-04-14','hard',1,'02:03:58',5),(597,7,'2022-04-16','hard',3,'12:48:25',5),(598,8,'2022-04-18','hard',2,'23:04:28',5),(599,1,'2022-04-19','easy',1,'15:58:59',5),(600,0,'2022-04-20','easy',3,'06:35:04',5),(601,6,'2022-04-23','normal',3,'06:29:36',5),(602,5,'2022-04-26','hard',1,'10:57:30',5),(603,6,'2022-04-28','easy',3,'09:01:53',5),(604,4,'2022-04-29','normal',3,'02:01:50',5),(605,0,'2022-05-02','normal',3,'17:47:48',5),(606,6,'2022-05-05','hard',1,'05:19:00',5),(607,0,'2022-05-06','normal',3,'17:29:16',5),(608,9,'2022-05-08','normal',3,'09:17:18',5),(609,6,'2022-05-09','easy',3,'13:00:23',5),(610,10,'2022-05-11','easy',2,'22:32:54',5),(611,10,'2022-05-14','hard',1,'01:19:31',5),(612,6,'2022-05-16','normal',2,'16:50:03',5),(613,8,'2022-05-18','hard',2,'22:11:04',5),(614,9,'2022-05-19','normal',2,'09:13:55',5),(615,10,'2022-05-22','easy',3,'15:30:37',5),(616,7,'2022-05-24','hard',1,'20:18:01',5),(617,2,'2022-05-27','hard',3,'07:09:51',5),(618,9,'2022-05-29','normal',2,'17:41:15',5),(619,2,'2022-05-31','easy',2,'12:45:19',5),(620,3,'2022-06-02','easy',3,'00:23:56',5),(621,5,'2022-06-05','easy',2,'14:50:22',5),(622,3,'2022-06-07','hard',2,'17:22:37',5),(623,0,'2022-06-08','normal',2,'01:51:03',5),(624,7,'2022-06-09','easy',1,'10:34:33',5),(625,0,'2022-06-11','easy',1,'23:14:15',5),(626,6,'2022-06-12','normal',3,'09:32:25',5),(627,5,'2022-06-14','normal',1,'20:03:45',5),(628,7,'2022-06-17','hard',2,'16:08:36',5),(629,6,'2022-06-18','hard',2,'16:18:28',5),(630,4,'2022-06-21','normal',2,'22:02:26',5),(631,0,'2022-06-22','easy',1,'21:51:32',5),(632,1,'2022-06-23','normal',3,'20:44:07',5),(633,4,'2022-06-25','hard',2,'15:52:26',5),(634,6,'2022-06-28','hard',2,'03:22:23',5),(635,9,'2022-06-29','easy',1,'03:45:20',5),(636,5,'2022-06-30','hard',3,'21:38:31',5),(637,7,'2022-07-03','hard',2,'08:23:54',5),(638,4,'2022-07-04','easy',2,'09:26:03',5),(639,10,'2022-07-06','easy',2,'06:55:46',5),(640,1,'2022-07-07','easy',2,'17:50:00',5),(641,5,'2022-07-09','easy',3,'06:47:08',5),(642,3,'2022-07-10','easy',3,'05:36:22',5),(643,0,'2022-07-11','normal',1,'02:14:49',5),(644,4,'2022-07-13','easy',1,'21:24:21',5),(645,6,'2022-07-16','normal',1,'04:23:27',5),(646,0,'2022-07-17','easy',1,'04:45:12',5),(647,8,'2022-07-18','easy',3,'04:07:02',5),(648,9,'2022-07-19','hard',2,'23:38:15',5),(649,3,'2022-07-22','hard',3,'05:22:15',5),(650,1,'2022-07-25','normal',3,'18:52:07',5),(651,10,'2022-07-27','normal',2,'01:15:04',5),(652,6,'2022-07-30','hard',1,'10:46:30',5),(653,2,'2022-08-01','normal',2,'01:43:22',5),(654,7,'2022-08-02','normal',2,'01:49:53',5),(655,0,'2022-08-04','easy',1,'14:24:16',5),(656,1,'2022-08-07','hard',1,'20:47:24',5),(657,7,'2022-08-08','normal',3,'21:55:59',5),(658,2,'2022-08-11','easy',1,'06:54:37',5),(659,4,'2022-08-13','normal',1,'02:32:25',5),(660,5,'2022-08-14','easy',1,'12:04:52',5),(661,1,'2022-08-15','easy',1,'20:12:30',5),(662,10,'2022-08-16','normal',1,'23:00:06',5),(663,5,'2022-08-17','normal',2,'10:37:44',5),(664,9,'2022-08-18','easy',3,'08:15:12',5),(665,2,'2022-08-21','hard',1,'13:54:47',5),(666,2,'2022-08-24','normal',3,'07:22:55',5),(667,5,'2022-08-26','hard',3,'09:47:49',5),(668,8,'2022-08-27','hard',3,'08:06:30',5),(669,2,'2022-08-29','normal',3,'05:47:16',5),(670,0,'2022-08-30','normal',3,'20:10:19',5),(671,1,'2022-09-01','hard',2,'15:51:18',5),(672,0,'2022-09-02','hard',2,'06:38:26',5),(673,3,'2022-09-03','hard',1,'21:51:35',5),(674,4,'2022-09-04','normal',3,'12:18:01',5),(675,1,'2022-09-07','normal',2,'12:14:39',5),(676,5,'2022-09-10','hard',3,'03:58:29',5),(677,6,'2022-09-11','normal',1,'19:48:35',5),(678,5,'2022-09-14','easy',1,'23:14:15',5),(679,5,'2022-09-17','hard',3,'18:59:34',5),(680,10,'2022-09-20','normal',2,'21:33:03',5),(681,6,'2022-09-23','normal',2,'03:28:56',5),(682,3,'2022-09-26','easy',3,'06:56:49',5),(683,3,'2022-09-27','normal',2,'06:14:24',5),(684,3,'2022-09-28','easy',3,'14:59:09',5),(685,9,'2022-10-01','normal',2,'23:08:49',5),(686,7,'2022-10-02','easy',1,'04:18:58',5),(687,10,'2022-10-05','normal',1,'20:50:39',5),(688,7,'2022-10-07','easy',2,'00:49:00',5);
/*!40000 ALTER TABLE `game_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (85);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `seq` bigint NOT NULL,
  `date` date DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  `doctor_seq` bigint DEFAULT NULL,
  `patient_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKpvrp5251n9iacr2al1fsm1xrj` (`doctor_seq`),
  KEY `FKc0nartgowefadbl5rdb2mrtoe` (`patient_seq`),
  CONSTRAINT `FKc0nartgowefadbl5rdb2mrtoe` FOREIGN KEY (`patient_seq`) REFERENCES `patient` (`seq`),
  CONSTRAINT `FKpvrp5251n9iacr2al1fsm1xrj` FOREIGN KEY (`doctor_seq`) REFERENCES `doctor` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (77,'2023-02-17','','13:00:00','https://i8a304.p.ssafy.io/video/1676597904473marathonf9ae87eb-9989-44e9-8a9b-dfd6d15588ee/1676597904473marathonf9ae87eb-9989-44e9-8a9b-dfd6d15588ee.mp4',3,6),(82,'2023-02-17','오 늘은 끝말잇기와 재활보드를 사용하여 더 효율적인 재활 활동을 수행하였습니다. 저번 재활에 비해서 반응하시는 속도나 문장 형성력이 조금씩 개선되는 것이 보여서 노력하시는 부분이 잘 느껴졌습니다.','13:00:00','https://i8a304.p.ssafy.io/video/1676598655586marathon504be2d3-f64d-4c06-8068-c79dec893f0d/1676598655586marathon504be2d3-f64d-4c06-8068-c79dec893f0d.mp4',2,5),(84,'2023-02-17','오늘은 끝말잇기와 재활보드를 사용하여 더 효율적인 재활 활동을 수행하였습니다. 저번 재활에 비해서 반응하시는 속도나 문장 형성력이 조금씩 개선되는 것이 보여서 노력하시는 부분이 잘 느껴졌습니다.','14:00:00','https://i8a304.p.ssafy.io/video/1676598833628marathon39bec90f-f21d-4b9a-a55d-f76675ba14fd/1676598833628marathon39bec90f-f21d-4b9a-a55d-f76675ba14fd.mp4',2,5);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `content` varchar(255) DEFAULT NULL,
  `seq` bigint NOT NULL,
  PRIMARY KEY (`seq`),
  CONSTRAINT `FK2eeo7rnl74mxk58dy3rugax28` FOREIGN KEY (`seq`) REFERENCES `communication` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `main_phone` varchar(255) DEFAULT NULL,
  `main_relationship` varchar(255) DEFAULT NULL,
  `sub_phone` varchar(255) DEFAULT NULL,
  `sub_relationship` varchar(255) DEFAULT NULL,
  `seq` bigint NOT NULL,
  PRIMARY KEY (`seq`),
  CONSTRAINT `FKjglhfj7crl4objyb7r8v2nsbb` FOREIGN KEY (`seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('01023452345','부모',NULL,NULL,5),('01023452345','부모',NULL,NULL,6),('01023452345','부모',NULL,NULL,7);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `seq` bigint NOT NULL,
  `bit_date` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `doctor_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKjlkh1aq9nroavwwbov7nfaelv` (`doctor_seq`),
  CONSTRAINT `FKjlkh1aq9nroavwwbov7nfaelv` FOREIGN KEY (`doctor_seq`) REFERENCES `doctor` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (33,'00000000','2023-02-13',3),(34,'00000000','2023-02-14',3),(35,'00000000','2023-02-15',3),(36,'00000000','2023-02-16',3),(37,'00020000','2023-02-17',3),(38,'00001000','2023-02-18',3),(39,'00000100','2023-02-19',3),(40,'00000000','2023-02-20',3),(41,'00000000','2023-02-21',3),(42,'00000000','2023-02-22',3),(43,'00000000','2023-02-23',3),(44,'00000000','2023-02-24',3),(45,'00000000','2023-02-25',3),(46,'00000000','2023-02-26',3),(47,'00000000','2023-02-27',3),(48,'00000000','2023-02-28',3),(49,'00000000','2023-03-01',3),(50,'00000000','2023-03-02',3),(51,'00000000','2023-03-03',3),(52,'00000000','2023-03-04',3),(53,'00000000','2023-03-05',3),(54,'00000000','2023-02-13',2),(55,'00000000','2023-02-14',2),(56,'00000000','2023-02-15',2),(57,'00000000','2023-02-16',2),(58,'00022000','2023-02-17',2),(59,'00001110','2023-02-18',2),(60,'00001110','2023-02-19',2),(61,'00000000','2023-02-20',2),(62,'00000000','2023-02-21',2),(63,'00000000','2023-02-22',2),(64,'00000000','2023-02-23',2),(65,'00000000','2023-02-24',2),(66,'00000000','2023-02-25',2),(67,'00000000','2023-02-26',2),(68,'00000000','2023-02-27',2),(69,'00000000','2023-02-28',2),(70,'00000000','2023-03-01',2),(71,'00000000','2023-03-02',2),(72,'00000000','2023-03-03',2),(73,'00000000','2023-03-04',2),(74,'00000000','2023-03-05',2);
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treatment`
--

DROP TABLE IF EXISTS `treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treatment` (
  `seq` bigint NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `doctor_seq` bigint DEFAULT NULL,
  `patient_seq` bigint DEFAULT NULL,
  PRIMARY KEY (`seq`),
  KEY `FKr95g42n5r0wew4i3nxfbau5mm` (`doctor_seq`),
  KEY `FKck2jpojymamb9lmkgeevttmfr` (`patient_seq`),
  CONSTRAINT `FKck2jpojymamb9lmkgeevttmfr` FOREIGN KEY (`patient_seq`) REFERENCES `patient` (`seq`),
  CONSTRAINT `FKr95g42n5r0wew4i3nxfbau5mm` FOREIGN KEY (`doctor_seq`) REFERENCES `doctor` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treatment`
--

LOCK TABLES `treatment` WRITE;
/*!40000 ALTER TABLE `treatment` DISABLE KEYS */;
/*!40000 ALTER TABLE `treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `dtype` varchar(31) NOT NULL,
  `seq` bigint NOT NULL,
  `birth_date` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `kakao` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `regist_date` date DEFAULT NULL,
  `sex` bit(1) NOT NULL,
  PRIMARY KEY (`seq`),
  UNIQUE KEY `UK_8qtpnv06elxuryeuv1ac4ximm` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Admin',1,NULL,NULL,'ssafy','https://d1v10kml6l14kq.cloudfront.net/default.jpg',NULL,'관리자','{bcrypt}$2a$10$GppcWNIDycSgG.rxTDtr0.eAQswXPp58goO6kVNPcxhs7r6mxO2fK',NULL,'2023-02-17',_binary '\0'),('Doctor',2,'1996-11-12','dldusgkr788@gmail.com','dusgkr','https://d1v10kml6l14kq.cloudfront.net/dusgkr.png',NULL,'이연학','{bcrypt}$2a$10$SDCK.vvhKQFz9AwPxQrQKeld83qxgq8tT.Eu2wNYF9lIQdCAlZ8Oe','01012341234','2023-02-17',_binary ''),('Doctor',3,'1996-11-12','kjskjs356@gmail.com','wjdtn','https://d1v10kml6l14kq.cloudfront.net/wjdtn.png',NULL,'김정수','{bcrypt}$2a$10$wGZSqbn3eqaD8C9vmttV7OVh/70bIoYloh5QppWU4q/DXdIkdwWKy','01012341234','2023-02-17',_binary ''),('Doctor',4,'1996-11-12','jn307742@gmail.com','wnsdk','https://d1v10kml6l14kq.cloudfront.net/wnsdk.png',NULL,'최준아','{bcrypt}$2a$10$aCrthG0jKcjVU/RVCYqoWOouOYOvHnr2EvqxYFxNZov1gdJEtNa/W','01012341234','2023-02-17',_binary '\0'),('Patient',5,'1996-11-12','paul9512@gmail.com','dndgml','https://d1v10kml6l14kq.cloudfront.net/dndgml.png',NULL,'조웅희','{bcrypt}$2a$10$MT4oeiS8k49Ol8/Cn/CH7u.cQm1RouIfu10PVykUnUsxw7e2umyXi','01012341234','2023-02-17',_binary ''),('Patient',6,'1996-11-12','yoonhosan@naver.com','ghtks','https://d1v10kml6l14kq.cloudfront.net/ghtks.png',NULL,'윤호산','{bcrypt}$2a$10$7eumCweH1Daa.BzADIxqdOIunPuvXOEv0lg5gF.eDryXNEKrWPgrm','01012341234','2023-02-17',_binary ''),('Patient',7,'1996-11-12','eastflow815@gmail.com','ehddus','https://d1v10kml6l14kq.cloudfront.net/ehddus.png',NULL,'김동연','{bcrypt}$2a$10$WsfGxSE8GSR9VVQUvw2pROTyINo9JNtXdsj/N8upW4o8XslCCtFFi','01012341234','2023-02-17',_binary '');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_seq` bigint NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKh3ddphs1acd3qg1mcawkfw0m6` (`user_seq`),
  CONSTRAINT `FKh3ddphs1acd3qg1mcawkfw0m6` FOREIGN KEY (`user_seq`) REFERENCES `user` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_DOCTOR'),(3,'ROLE_DOCTOR'),(4,'ROLE_DOCTOR'),(5,'ROLE_PATIENT'),(6,'ROLE_PATIENT'),(7,'ROLE_PATIENT');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  2:33:36