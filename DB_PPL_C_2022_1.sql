-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 04, 2022 at 03:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppl`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_akun_dosen`
--

CREATE TABLE `tb_akun_dosen` (
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Aktif','NonAktif') COLLATE utf8mb4_unicode_ci NOT NULL,
  `pemilik` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_akun_dosen`
--

INSERT INTO `tb_akun_dosen` (`username`, `password`, `status`, `pemilik`) VALUES
('adhesetya', '$2b$10$SE75h22hBjkhLI5hGqXucO8hH88CX..KYO29jXNYplmbN8RouyiRm', 'Aktif', 'H.7.199112092022041001'),
('adiwibowo', '$2b$10$LtZFSqK/QitxpjpKe7NK3OcSSLNIUYZYNIWVVijY4PGT2dY3GCcaK', 'Aktif', '196511071992031002'),
('anangardiyanto', '$2b$10$nNFtCgEyNwkhstKaY/NsT.XKtB4hb9JAwQkWwR.4N7t6XKaHA2lXS', 'Aktif', '199406050220071040'),
('annisaistiadah', '$2b$10$En5Z8X00GGWzawPZzpG1n.DOqj2rEQmGYBnvHZEioRn1KF28yKIbi', 'Aktif', '198911010214012670'),
('arispuji', '$2b$10$HxddTK186LsvH4GJ3srxSO63YhTY40365ZkCVrld2fFjfmBVnYFAi', 'Aktif', '196511071992031001'),
('arissugiharto', '$2b$10$OBOuvoLot3ZDDXw.ndQYKuKGHThkvPK/t6blb86RvHLbmVt3CaHJq', 'Aktif', '197108111997021004'),
('benynugroho', '$2b$10$xEwnUTh6VelQLSOnFEXhOebnXmPXYc8J9Wi8Uo76YId4QxcRsrwju', 'Aktif', '198611050214011680'),
('betanoranita', '$2b$10$f.xL8EMyjeu6FRO0/HOsu.iZCrPB9/XfGud33/2gJa2Zva8gfEfjC', 'Aktif', '197308291998022001'),
('dinarmutiara', '$2b$10$0vjQ3cCMcbrI9nbvlkfKkOwV9isFiQWiCz09kvBlRenD8Tm83nq9G', 'Aktif', '197601102009122002'),
('edysuharto', '$2b$10$r0wVUVryZ3sQ5.3frPzao.E6QPevZAqNkPbKDf7Pi/XtFXXAV3hNO', 'Aktif', '198009142006041002'),
('fajaragung', '$2b$10$LqZR1IN/P7J1aTg/uB8rVuV3NqcquzC0dZL5mDZDEGgXzj/0tRQe6', 'Aktif', '198404112019031009'),
('guruharyotejo', '$2b$10$gDL7ZlvJoxnTFON.Ma/la.2RHPk3u2rn/aXFKWoLyayVby46Vybqu', 'Aktif', '198012272015041002'),
('helmiearif', '$2b$10$YtHea4gDTdIBptSFCD1DxuOotI5PetoqC/1MmR4vnhgcFnMgkLZLW', 'Aktif', '197805162003121001'),
('indrawaspada', '$2b$10$dCkra.6340qFZ9SPxc.4x.E4St9NUEAXGGzUgW7CYtGLMawwR/LI.', 'Aktif', '197902122008121002'),
('khadijah', '$2b$10$SUBTLX.SLwRE0QpZWXM69O/JEv5mC6WPFEoZMsHmws9AJ8PtX8COq', 'Aktif', '198903032015042002'),
('muhammadmalik', '$2b$10$Kl6eqEpA2Ir4/P/w2yds3OpfoImo6c.UajKzwRfTWEFghe8QQSQza', 'Aktif', '198106202015041002'),
('nurdinbahtiar', '$2b$10$l98O9RHQcfoxiIAALwpBG.QpngX8fxrl3DDZmZBIlNVD8Jr2eWcSC', 'Aktif', '197907202003121002'),
('panjiwisnu', '$2b$10$rsAd/AKvuZXht/jDln.OaeYEDUui/P3Fhdvy39RvmXgLyOxSO0tiO', 'Aktif', '198104212008121002'),
('prajantowahyu', '$2b$10$vNvHHdwGqARtObKKHkUGuOJkLs/fJbhZkVDoBcqhCqSaJxnUsQEta', 'Aktif', '198803222020121010'),
('priyosidik', '$2b$10$mRGvrJYwTxUhqjmMDMHEkOe1S/6LuZXPY4dCmZKr7CVXv/UqP66au', 'Aktif', '197007051997021001'),
('ragilsaputra', '$2b$10$i/B7Ey8usElk4MAEMo5PVelDHXtQgB3c/RCnO3.4VyBOILJ1eWb6q', 'Aktif', '198010212005011003'),
('retnokusumaningrum', '$2b$10$1re5V.RxJjHqAEXXdbi.mOoNvc3cBsw.0XGNpudm9ykKXNDSiWOKq', 'Aktif', '198104202005012001'),
('rismiyati', '$2b$10$0FBkKaGfH/Npp3bHHN2YJ.Z9MJ0ysD3DL.TUqqgAvM6Igk4r2gHsO', 'Aktif', '198511252018032001'),
('s.eko', '$2b$10$tcXmrYkhRMs0WIxzW8kdpuTuiCPaItDyD56VKzGg7h9ejP1FIa./W', 'Aktif', '196511071992031003'),
('sandykurniawan', '$2b$10$FYa.RU8yJZom0iXPJxZVi.ZwWOLHq2RbgG80fZADljFRhBmbnFXTK', 'Aktif', 'H.7.199603032022041001'),
('satriyoadhy', '$2b$10$0KAN9kUdnntXhmZQOQ/Abuj1ALOI9ZTKZgk8oBPV/AhpdKyzMM6yy', 'Aktif', '198302032006041002'),
('sukmawatinur', '$2b$10$lTmfzzKb.oOLEyXoMv6Fze1jykQ9JdtFGdk4eLny7LjOqLFUrheQS', 'Aktif', '197805022005012002'),
('sutikno', '$2b$10$1PqZdvlEz2bi0oxS8siQz.C5ZsDbQtr68FlQi/JSX.EtMoGtGmZfe', 'Aktif', '197905242009121003');

-- --------------------------------------------------------

--
-- Table structure for table `tb_akun_mhs`
--

CREATE TABLE `tb_akun_mhs` (
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Aktif','NonAktif') COLLATE utf8mb4_unicode_ci NOT NULL,
  `pemilik` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_akun_mhs`
--

INSERT INTO `tb_akun_mhs` (`username`, `password`, `status`, `pemilik`) VALUES
('mhs1', 'mhs1', 'Aktif', '24060120130059'),
('mhs2', 'mhs2', 'Aktif', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `tb_dosen`
--

CREATE TABLE `tb_dosen` (
  `nip` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kodeKab` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kodeProv` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noHP` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_dosen`
--

INSERT INTO `tb_dosen` (`nip`, `nama`, `alamat`, `email`, `kodeKab`, `kodeProv`, `noHP`, `foto`) VALUES
('196511071992031001', 'Dr. Aris Puji Widodo, S.Si, M.T.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/rpl/dosen-RPL%E2%80%931.png'),
('196511071992031002', 'Dr. Eng. Adi Wibowo, S.Si., M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/kg/KG-engAdi.png'),
('196511071992031003', 'Drs. Eko Adi Sarwoko, M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/kg/KG-ekoAdi.png'),
('197007051997021001', 'Priyo Sidik Sasongko, S.Si., M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-priyo.png'),
('197108111997021004', 'Dr. Aris Sugiharto, S.Si., M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/kg/KG_arisSugi.png'),
('197308291998022001', 'Beta Noranita, S.Si, M.Kom', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-Beta.png'),
('197601102009122002', 'Dinar Mutiara K N, S.T., M.InfoTech.(Comp)., Ph.D.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-Dinar.png'),
('197805022005012002', 'Sukmawati Nur Endah, S.Si, M.Kom', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-sukma.png'),
('197805162003121001', 'Helmie Arif Wibawa, S.Si, M.Cs', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-helmie.png'),
('197902122008121002', 'Indra Waspada, ST, M.T.I', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-Indra.png'),
('197905242009121003', 'Sutikno, ST, M.Cs', NULL, NULL, NULL, NULL, NULL, NULL),
('197907202003121002', 'Nurdin Bahtiar, S.Si, M.T', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-nurdin.png'),
('198009142006041002', 'Edy Suharto, S.T., M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/rpl/dosen-RPL%E2%80%932.png'),
('198010212005011003', 'Ragil Saputra, S.Si, M.Cs', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-ragil.png'),
('198012272015041002', 'Guruh Aryotejo, S.Kom., M.Sc.', NULL, NULL, NULL, NULL, NULL, 'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=t637M2oAAAAJ&citpid=2'),
('198104202005012001', 'Dr. Retno Kusumaningrum, S.Si, M.Kom', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-retno.png'),
('198104212008121002', 'Panji Wisnu Wirawan, S.T., M.T.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/rpl/dosen-RPL%E2%80%933.png'),
('198106202015041002', 'Muhammad Malik Hakim, S.T., M.T.I.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-Malik.png'),
('198302032006041002', 'Satriyo Adhy, S.Si, M.T', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/sti/STI-satriyo.png'),
('198404112019031009', 'Fajar Agung Nugroho, S.Kom., M.Cs.', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/kg/KG-fajar.png'),
('198511252018032001', 'Rismiyati, B.Eng, M.Cs', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-rismi.png'),
('198611050214011680', 'Beny Nugroho', NULL, NULL, NULL, NULL, NULL, NULL),
('198803222020121010', 'Prajanto Wahyu Adi, M.Kom.', NULL, NULL, NULL, NULL, NULL, 'https://media-exp1.licdn.com/dms/foto/C5603AQEhx-S82FinbQ/profile-displayphoto-shrink_400_400/0/1625813298385?e=1671667200&v=beta&t=o9bMNDHxMAk1r-6UEcXwuz1F7CIPdBPB-UE1E805GuU'),
('198903032015042002', 'Khadijah, S.Kom, M.Cs', NULL, NULL, NULL, NULL, NULL, 'https://hmif-undip.com/ios/assets/homepage/img/dosen/siscer/siscer-khadijah.png'),
('198911010214012670', 'Annisa Istiadah N., A.Md.', NULL, NULL, NULL, NULL, NULL, NULL),
('199406050220071040', 'Anang Ardiyanto', NULL, NULL, NULL, NULL, NULL, NULL),
('H.7.199112092022041001', 'Adhe Setya Pramayoga, S.Kom., M.T.', NULL, NULL, NULL, NULL, NULL, NULL),
('H.7.199603032022041001', 'Sandy Kurniawan, S.Kom., M.Kom.', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_irs`
--

CREATE TABLE `tb_irs` (
  `nim` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Aktif','Cuti') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlahSks` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileIrs` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statusValidasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_irs`
--

INSERT INTO `tb_irs` (`nim`, `semester`, `status`, `jumlahSks`, `fileIrs`, `statusValidasi`) VALUES
('24060120130059', '1', 'Aktif', '18', 'irs1.pdf', 0),
('24060120130059', '2', 'Aktif', '23', 'irs2.pdf', 0),
('24060120130059', '3', 'Cuti', '0', '', 0),
('24060120130059', '4', 'Aktif', '21', 'irs4.pdf', 0),
('24060120130059', '5', 'Aktif', '21', 'irs5.pdf', 0),
('24060120130059', '6', 'Aktif', '21', 'irs6.pdf', 0),
('24060120130059', '7', 'Aktif', '21', 'irs7.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_kabupaten`
--

CREATE TABLE `tb_kabupaten` (
  `kodeKab` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namaKab` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kodeProv` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_kabupaten`
--

INSERT INTO `tb_kabupaten` (`kodeKab`, `namaKab`, `kodeProv`) VALUES
('1101', 'KAB. ACEH SELATAN', '11'),
('1102', 'KAB. ACEH TENGGARA', '11'),
('1103', 'KAB. ACEH TIMUR', '11'),
('1104', 'KAB. ACEH TENGAH', '11'),
('1105', 'KAB. ACEH BARAT', '11'),
('1106', 'KAB. ACEH BESAR', '11'),
('1107', 'KAB. PIDIE', '11'),
('1108', 'KAB. ACEH UTARA', '11'),
('1109', 'KAB. SIMEULUE', '11'),
('1110', 'KAB. ACEH SINGKIL', '11'),
('1111', 'KAB. BIREUEN', '11'),
('1112', 'KAB. ACEH BARAT DAYA', '11'),
('1113', 'KAB. GAYO LUES', '11'),
('1114', 'KAB. ACEH JAYA', '11'),
('1115', 'KAB. NAGAN RAYA', '11'),
('1116', 'KAB. ACEH TAMIANG', '11'),
('1117', 'KAB. BENER MERIAH', '11'),
('1118', 'KAB. PIDIE JAYA', '11'),
('1171', 'KOTA BANDA ACEH', '11'),
('1172', 'KOTA SABANG', '11'),
('1173', 'KOTA LHOKSEUMAWE', '11'),
('1174', 'KOTA LANGSA', '11'),
('1175', 'KOTA SUBULUSSALAM', '11'),
('1201', 'KAB. TAPANULI TENGAH', '12'),
('1202', 'KAB. TAPANULI UTARA', '12'),
('1203', 'KAB. TAPANULI SELATAN', '12'),
('1204', 'KAB. NIAS', '12'),
('1205', 'KAB. LANGKAT', '12'),
('1206', 'KAB. KARO', '12'),
('1207', 'KAB. DELI SERDANG', '12'),
('1208', 'KAB. SIMALUNGUN', '12'),
('1209', 'KAB. ASAHAN', '12'),
('1210', 'KAB. LABUHANBATU', '12'),
('1211', 'KAB. DAIRI', '12'),
('1212', 'KAB. TOBA SAMOSIR', '12'),
('1213', 'KAB. MANDAILING NATAL', '12'),
('1214', 'KAB. NIAS SELATAN', '12'),
('1215', 'KAB. PAKPAK BHARAT', '12'),
('1216', 'KAB. HUMBANG HASUNDUTAN', '12'),
('1217', 'KAB. SAMOSIR', '12'),
('1218', 'KAB. SERDANG BEDAGAI', '12'),
('1219', 'KAB. BATU BARA', '12'),
('1220', 'KAB. PADANG LAWAS UTARA', '12'),
('1221', 'KAB. PADANG LAWAS', '12'),
('1222', 'KAB. LABUHANBATU SELATAN', '12'),
('1223', 'KAB. LABUHANBATU UTARA', '12'),
('1224', 'KAB. NIAS UTARA', '12'),
('1225', 'KAB. NIAS BARAT', '12'),
('1271', 'KOTA MEDAN', '12'),
('1272', 'KOTA PEMATANGSIANTAR', '12'),
('1273', 'KOTA SIBOLGA', '12'),
('1274', 'KOTA TANJUNG BALAI', '12'),
('1275', 'KOTA BINJAI', '12'),
('1276', 'KOTA TEBING TINGGI', '12'),
('1277', 'KOTA PADANG SIDEMPUAN', '12'),
('1278', 'KOTA GUNUNGSITOLI', '12'),
('1301', 'KAB. PESISIR SELATAN', '13'),
('1302', 'KAB. SOLOK', '13'),
('1303', 'KAB. SIJUNJUNG', '13'),
('1304', 'KAB. TANAH DATAR', '13'),
('1305', 'KAB. PADANG PARIAMAN', '13'),
('1306', 'KAB. AGAM', '13'),
('1307', 'KAB. LIMA PULUH KOTA', '13'),
('1308', 'KAB. PASAMAN', '13'),
('1309', 'KAB. KEPULAUAN MENTAWAI', '13'),
('1310', 'KAB. DHARMASRAYA', '13'),
('1311', 'KAB. SOLOK SELATAN', '13'),
('1312', 'KAB. PASAMAN BARAT', '13'),
('1371', 'KOTA PADANG', '13'),
('1372', 'KOTA SOLOK', '13'),
('1373', 'KOTA SAWAHLUNTO', '13'),
('1374', 'KOTA PADANG PANJANG', '13'),
('1375', 'KOTA BUKITTINGGI', '13'),
('1376', 'KOTA PAYAKUMBUH', '13'),
('1377', 'KOTA PARIAMAN', '13'),
('1401', 'KAB. KAMPAR', '14'),
('1402', 'KAB. INDRAGIRI HULU', '14'),
('1403', 'KAB. BENGKALIS', '14'),
('1404', 'KAB. INDRAGIRI HILIR', '14'),
('1405', 'KAB. PELALAWAN', '14'),
('1406', 'KAB. ROKAN HULU', '14'),
('1407', 'KAB. ROKAN HILIR', '14'),
('1408', 'KAB. SIAK', '14'),
('1409', 'KAB. KUANTAN SINGINGI', '14'),
('1410', 'KAB. KEPULAUAN MERANTI', '14'),
('1471', 'KOTA PEKANBARU', '14'),
('1472', 'KOTA DUMAI', '14'),
('1501', 'KAB. KERINCI', '15'),
('1502', 'KAB. MERANGIN', '15'),
('1503', 'KAB. SAROLANGUN', '15'),
('1504', 'KAB. BATANGHARI', '15'),
('1505', 'KAB. MUARO JAMBI', '15'),
('1506', 'KAB. TANJUNG JABUNG BARAT', '15'),
('1507', 'KAB. TANJUNG JABUNG TIMUR', '15'),
('1508', 'KAB. BUNGO', '15'),
('1509', 'KAB. TEBO', '15'),
('1571', 'KOTA JAMBI', '15'),
('1572', 'KOTA SUNGAI PENUH', '15'),
('1601', 'KAB. OGAN KOMERING ULU', '16'),
('1602', 'KAB. OGAN KOMERING ILIR', '16'),
('1603', 'KAB. MUARA ENIM', '16'),
('1604', 'KAB. LAHAT', '16'),
('1605', 'KAB. MUSI RAWAS', '16'),
('1606', 'KAB. MUSI BANYUASIN', '16'),
('1607', 'KAB. BANYUASIN', '16'),
('1608', 'KAB. OGAN KOMERING ULU TIMUR', '16'),
('1609', 'KAB. OGAN KOMERING ULU SELATAN', '16'),
('1610', 'KAB. OGAN ILIR', '16'),
('1611', 'KAB. EMPAT LAWANG', '16'),
('1612', 'KAB. PENUKAL ABAB LEMATANG ILIR', '16'),
('1613', 'KAB. MUSI RAWAS UTARA', '16'),
('1671', 'KOTA PALEMBANG', '16'),
('1672', 'KOTA PAGAR ALAM', '16'),
('1673', 'KOTA LUBUK LINGGAU', '16'),
('1674', 'KOTA PRABUMULIH', '16'),
('1701', 'KAB. BENGKULU SELATAN', '17'),
('1702', 'KAB. REJANG LEBONG', '17'),
('1703', 'KAB. BENGKULU UTARA', '17'),
('1704', 'KAB. KAUR', '17'),
('1705', 'KAB. SELUMA', '17'),
('1706', 'KAB. MUKO MUKO', '17'),
('1707', 'KAB. LEBONG', '17'),
('1708', 'KAB. KEPAHIANG', '17'),
('1709', 'KAB. BENGKULU TENGAH', '17'),
('1771', 'KOTA BENGKULU', '17'),
('1801', 'KAB. LAMPUNG SELATAN', '18'),
('1802', 'KAB. LAMPUNG TENGAH', '18'),
('1803', 'KAB. LAMPUNG UTARA', '18'),
('1804', 'KAB. LAMPUNG BARAT', '18'),
('1805', 'KAB. TULANG BAWANG', '18'),
('1806', 'KAB. TANGGAMUS', '18'),
('1807', 'KAB. LAMPUNG TIMUR', '18'),
('1808', 'KAB. WAY KANAN', '18'),
('1809', 'KAB. PESAWARAN', '18'),
('1810', 'KAB. PRINGSEWU', '18'),
('1811', 'KAB. MESUJI', '18'),
('1812', 'KAB. TULANG BAWANG BARAT', '18'),
('1813', 'KAB. PESISIR BARAT', '18'),
('1871', 'KOTA BANDAR LAMPUNG', '18'),
('1872', 'KOTA METRO', '18'),
('1901', 'KAB. BANGKA', '19'),
('1902', 'KAB. BELITUNG', '19'),
('1903', 'KAB. BANGKA SELATAN', '19'),
('1904', 'KAB. BANGKA TENGAH', '19'),
('1905', 'KAB. BANGKA BARAT', '19'),
('1906', 'KAB. BELITUNG TIMUR', '19'),
('1971', 'KOTA PANGKAL PINANG', '19'),
('2101', 'KAB. BINTAN', '21'),
('2102', 'KAB. KARIMUN', '21'),
('2103', 'KAB. NATUNA', '21'),
('2104', 'KAB. LINGGA', '21'),
('2105', 'KAB. KEPULAUAN ANAMBAS', '21'),
('2171', 'KOTA BATAM', '21'),
('2172', 'KOTA TANJUNG PINANG', '21'),
('3101', 'KAB. ADM. KEP. SERIBU', '31'),
('3171', 'KOTA ADM. JAKARTA PUSAT', '31'),
('3172', 'KOTA ADM. JAKARTA UTARA', '31'),
('3173', 'KOTA ADM. JAKARTA BARAT', '31'),
('3174', 'KOTA ADM. JAKARTA SELATAN', '31'),
('3175', 'KOTA ADM. JAKARTA TIMUR', '31'),
('3201', 'KAB. BOGOR', '32'),
('3202', 'KAB. SUKABUMI', '32'),
('3203', 'KAB. CIANJUR', '32'),
('3204', 'KAB. BANDUNG', '32'),
('3205', 'KAB. GARUT', '32'),
('3206', 'KAB. TASIKMALAYA', '32'),
('3207', 'KAB. CIAMIS', '32'),
('3208', 'KAB. KUNINGAN', '32'),
('3209', 'KAB. CIREBON', '32'),
('3210', 'KAB. MAJALENGKA', '32'),
('3211', 'KAB. SUMEDANG', '32'),
('3212', 'KAB. INDRAMAYU', '32'),
('3213', 'KAB. SUBANG', '32'),
('3214', 'KAB. PURWAKARTA', '32'),
('3215', 'KAB. KARAWANG', '32'),
('3216', 'KAB. BEKASI', '32'),
('3217', 'KAB. BANDUNG BARAT', '32'),
('3218', 'KAB. PANGANDARAN', '32'),
('3271', 'KOTA BOGOR', '32'),
('3272', 'KOTA SUKABUMI', '32'),
('3273', 'KOTA BANDUNG', '32'),
('3274', 'KOTA CIREBON', '32'),
('3275', 'KOTA BEKASI', '32'),
('3276', 'KOTA DEPOK', '32'),
('3277', 'KOTA CIMAHI', '32'),
('3278', 'KOTA TASIKMALAYA', '32'),
('3279', 'KOTA BANJAR', '32'),
('3301', 'KAB. CILACAP', '33'),
('3302', 'KAB. BANYUMAS', '33'),
('3303', 'KAB. PURBALINGGA', '33'),
('3304', 'KAB. BANJARNEGARA', '33'),
('3305', 'KAB. KEBUMEN', '33'),
('3306', 'KAB. PURWOREJO', '33'),
('3307', 'KAB. WONOSOBO', '33'),
('3308', 'KAB. MAGELANG', '33'),
('3309', 'KAB. BOYOLALI', '33'),
('3310', 'KAB. KLATEN', '33'),
('3311', 'KAB. SUKOHARJO', '33'),
('3312', 'KAB. WONOGIRI', '33'),
('3313', 'KAB. KARANGANYAR', '33'),
('3314', 'KAB. SRAGEN', '33'),
('3315', 'KAB. GROBOGAN', '33'),
('3316', 'KAB. BLORA', '33'),
('3317', 'KAB. REMBANG', '33'),
('3318', 'KAB. PATI', '33'),
('3319', 'KAB. KUDUS', '33'),
('3320', 'KAB. JEPARA', '33'),
('3321', 'KAB. DEMAK', '33'),
('3322', 'KAB. SEMARANG', '33'),
('3323', 'KAB. TEMANGGUNG', '33'),
('3324', 'KAB. KENDAL', '33'),
('3325', 'KAB. BATANG', '33'),
('3326', 'KAB. PEKALONGAN', '33'),
('3327', 'KAB. PEMALANG', '33'),
('3328', 'KAB. TEGAL', '33'),
('3329', 'KAB. BREBES', '33'),
('3371', 'KOTA MAGELANG', '33'),
('3372', 'KOTA SURAKARTA', '33'),
('3373', 'KOTA SALATIGA', '33'),
('3374', 'KOTA SEMARANG', '33'),
('3375', 'KOTA PEKALONGAN', '33'),
('3376', 'KOTA TEGAL', '33'),
('3401', 'KAB. KULON PROGO', '34'),
('3402', 'KAB. BANTUL', '34'),
('3403', 'KAB. GUNUNGKIDUL', '34'),
('3404', 'KAB. SLEMAN', '34'),
('3471', 'KOTA YOGYAKARTA', '34'),
('3501', 'KAB. PACITAN', '35'),
('3502', 'KAB. PONOROGO', '35'),
('3503', 'KAB. TRENGGALEK', '35'),
('3504', 'KAB. TULUNGAGUNG', '35'),
('3505', 'KAB. BLITAR', '35'),
('3506', 'KAB. KEDIRI', '35'),
('3507', 'KAB. MALANG', '35'),
('3508', 'KAB. LUMAJANG', '35'),
('3509', 'KAB. JEMBER', '35'),
('3510', 'KAB. BANYUWANGI', '35'),
('3511', 'KAB. BONDOWOSO', '35'),
('3512', 'KAB. SITUBONDO', '35'),
('3513', 'KAB. PROBOLINGGO', '35'),
('3514', 'KAB. PASURUAN', '35'),
('3515', 'KAB. SIDOARJO', '35'),
('3516', 'KAB. MOJOKERTO', '35'),
('3517', 'KAB. JOMBANG', '35'),
('3518', 'KAB. NGANJUK', '35'),
('3519', 'KAB. MADIUN', '35'),
('3520', 'KAB. MAGETAN', '35'),
('3521', 'KAB. NGAWI', '35'),
('3522', 'KAB. BOJONEGORO', '35'),
('3523', 'KAB. TUBAN', '35'),
('3524', 'KAB. LAMONGAN', '35'),
('3525', 'KAB. GRESIK', '35'),
('3526', 'KAB. BANGKALAN', '35'),
('3527', 'KAB. SAMPANG', '35'),
('3528', 'KAB. PAMEKASAN', '35'),
('3529', 'KAB. SUMENEP', '35'),
('3571', 'KOTA KEDIRI', '35'),
('3572', 'KOTA BLITAR', '35'),
('3573', 'KOTA MALANG', '35'),
('3574', 'KOTA PROBOLINGGO', '35'),
('3575', 'KOTA PASURUAN', '35'),
('3576', 'KOTA MOJOKERTO', '35'),
('3577', 'KOTA MADIUN', '35'),
('3578', 'KOTA SURABAYA', '35'),
('3579', 'KOTA BATU', '35'),
('3601', 'KAB. PANDEGLANG', '36'),
('3602', 'KAB. LEBAK', '36'),
('3603', 'KAB. TANGERANG', '36'),
('3604', 'KAB. SERANG', '36'),
('3671', 'KOTA TANGERANG', '36'),
('3672', 'KOTA CILEGON', '36'),
('3673', 'KOTA SERANG', '36'),
('3674', 'KOTA TANGERANG SELATAN', '36'),
('5101', 'KAB. JEMBRANA', '51'),
('5102', 'KAB. TABANAN', '51'),
('5103', 'KAB. BADUNG', '51'),
('5104', 'KAB. GIANYAR', '51'),
('5105', 'KAB. KLUNGKUNG', '51'),
('5106', 'KAB. BANGLI', '51'),
('5107', 'KAB. KARANGASEM', '51'),
('5108', 'KAB. BULELENG', '51'),
('5171', 'KOTA DENPASAR', '51'),
('5201', 'KAB. LOMBOK BARAT', '52'),
('5202', 'KAB. LOMBOK TENGAH', '52'),
('5203', 'KAB. LOMBOK TIMUR', '52'),
('5204', 'KAB. SUMBAWA', '52'),
('5205', 'KAB. DOMPU', '52'),
('5206', 'KAB. BIMA', '52'),
('5207', 'KAB. SUMBAWA BARAT', '52'),
('5208', 'KAB. LOMBOK UTARA', '52'),
('5271', 'KOTA MATARAM', '52'),
('5272', 'KOTA BIMA', '52'),
('5301', 'KAB. KUPANG', '53'),
('5302', 'KAB TIMOR TENGAH SELATAN', '53'),
('5303', 'KAB. TIMOR TENGAH UTARA', '53'),
('5304', 'KAB. BELU', '53'),
('5305', 'KAB. ALOR', '53'),
('5306', 'KAB. FLORES TIMUR', '53'),
('5307', 'KAB. SIKKA', '53'),
('5308', 'KAB. ENDE', '53'),
('5309', 'KAB. NGADA', '53'),
('5310', 'KAB. MANGGARAI', '53'),
('5311', 'KAB. SUMBA TIMUR', '53'),
('5312', 'KAB. SUMBA BARAT', '53'),
('5313', 'KAB. LEMBATA', '53'),
('5314', 'KAB. ROTE NDAO', '53'),
('5315', 'KAB. MANGGARAI BARAT', '53'),
('5316', 'KAB. NAGEKEO', '53'),
('5317', 'KAB. SUMBA TENGAH', '53'),
('5318', 'KAB. SUMBA BARAT DAYA', '53'),
('5319', 'KAB. MANGGARAI TIMUR', '53'),
('5320', 'KAB. SABU RAIJUA', '53'),
('5321', 'KAB. MALAKA', '53'),
('5371', 'KOTA KUPANG', '53'),
('6101', 'KAB. SAMBAS', '61'),
('6102', 'KAB. MEMPAWAH', '61'),
('6103', 'KAB. SANGGAU', '61'),
('6104', 'KAB. KETAPANG', '61'),
('6105', 'KAB. SINTANG', '61'),
('6106', 'KAB. KAPUAS HULU', '61'),
('6107', 'KAB. BENGKAYANG', '61'),
('6108', 'KAB. LANDAK', '61'),
('6109', 'KAB. SEKADAU', '61'),
('6110', 'KAB. MELAWI', '61'),
('6111', 'KAB. KAYONG UTARA', '61'),
('6112', 'KAB. KUBU RAYA', '61'),
('6171', 'KOTA PONTIANAK', '61'),
('6172', 'KOTA SINGKAWANG', '61'),
('6201', 'KAB. KOTAWARINGIN BARAT', '62'),
('6202', 'KAB. KOTAWARINGIN TIMUR', '62'),
('6203', 'KAB. KAPUAS', '62'),
('6204', 'KAB. BARITO SELATAN', '62'),
('6205', 'KAB. BARITO UTARA', '62'),
('6206', 'KAB. KATINGAN', '62'),
('6207', 'KAB. SERUYAN', '62'),
('6208', 'KAB. SUKAMARA', '62'),
('6209', 'KAB. LAMANDAU', '62'),
('6210', 'KAB. GUNUNG MAS', '62'),
('6211', 'KAB. PULANG PISAU', '62'),
('6212', 'KAB. MURUNG RAYA', '62'),
('6213', 'KAB. BARITO TIMUR', '62'),
('6271', 'KOTA PALANGKARAYA', '62'),
('6301', 'KAB. TANAH LAUT', '63'),
('6302', 'KAB. KOTABARU', '63'),
('6303', 'KAB. BANJAR', '63'),
('6304', 'KAB. BARITO KUALA', '63'),
('6305', 'KAB. TAPIN', '63'),
('6306', 'KAB. HULU SUNGAI SELATAN', '63'),
('6307', 'KAB. HULU SUNGAI TENGAH', '63'),
('6308', 'KAB. HULU SUNGAI UTARA', '63'),
('6309', 'KAB. TABALONG', '63'),
('6310', 'KAB. TANAH BUMBU', '63'),
('6311', 'KAB. BALANGAN', '63'),
('6371', 'KOTA BANJARMASIN', '63'),
('6372', 'KOTA BANJARBARU', '63'),
('6401', 'KAB. PASER', '64'),
('6402', 'KAB. KUTAI KARTANEGARA', '64'),
('6403', 'KAB. BERAU', '64'),
('6407', 'KAB. KUTAI BARAT', '64'),
('6408', 'KAB. KUTAI TIMUR', '64'),
('6409', 'KAB. PENAJAM PASER UTARA', '64'),
('6411', 'KAB. MAHAKAM ULU', '64'),
('6471', 'KOTA BALIKPAPAN', '64'),
('6472', 'KOTA SAMARINDA', '64'),
('6474', 'KOTA BONTANG', '64'),
('6501', 'KAB. BULUNGAN', '65'),
('6502', 'KAB. MALINAU', '65'),
('6503', 'KAB. NUNUKAN', '65'),
('6504', 'KAB. TANA TIDUNG', '65'),
('6571', 'KOTA TARAKAN', '65'),
('7101', 'KAB. BOLAANG MONGONDOW', '71'),
('7102', 'KAB. MINAHASA', '71'),
('7103', 'KAB. KEPULAUAN SANGIHE', '71'),
('7104', 'KAB. KEPULAUAN TALAUD', '71'),
('7105', 'KAB. MINAHASA SELATAN', '71'),
('7106', 'KAB. MINAHASA UTARA', '71'),
('7107', 'KAB. MINAHASA TENGGARA', '71'),
('7108', 'KAB. BOLAANG MONGONDOW UTARA', '71'),
('7109', 'KAB. KEP. SIAU TAGULANDANG BIARO', '71'),
('7110', 'KAB. BOLAANG MONGONDOW TIMUR', '71'),
('7111', 'KAB. BOLAANG MONGONDOW SELATAN', '71'),
('7171', 'KOTA MANADO', '71'),
('7172', 'KOTA BITUNG', '71'),
('7173', 'KOTA TOMOHON', '71'),
('7174', 'KOTA KOTAMOBAGU', '71'),
('7201', 'KAB. BANGGAI', '72'),
('7202', 'KAB. POSO', '72'),
('7203', 'KAB. DONGGALA', '72'),
('7204', 'KAB. TOLI TOLI', '72'),
('7205', 'KAB. BUOL', '72'),
('7206', 'KAB. MOROWALI', '72'),
('7207', 'KAB. BANGGAI KEPULAUAN', '72'),
('7208', 'KAB. PARIGI MOUTONG', '72'),
('7209', 'KAB. TOJO UNA UNA', '72'),
('7210', 'KAB. SIGI', '72'),
('7211', 'KAB. BANGGAI LAUT', '72'),
('7212', 'KAB. MOROWALI UTARA', '72'),
('7271', 'KOTA PALU', '72'),
('7301', 'KAB. KEPULAUAN SELAYAR', '73'),
('7302', 'KAB. BULUKUMBA', '73'),
('7303', 'KAB. BANTAENG', '73'),
('7304', 'KAB. JENEPONTO', '73'),
('7305', 'KAB. TAKALAR', '73'),
('7306', 'KAB. GOWA', '73'),
('7307', 'KAB. SINJAI', '73'),
('7308', 'KAB. BONE', '73'),
('7309', 'KAB. MAROS', '73'),
('7310', 'KAB. PANGKAJENE KEPULAUAN', '73'),
('7311', 'KAB. BARRU', '73'),
('7312', 'KAB. SOPPENG', '73'),
('7313', 'KAB. WAJO', '73'),
('7314', 'KAB. SIDENRENG RAPPANG', '73'),
('7315', 'KAB. PINRANG', '73'),
('7316', 'KAB. ENREKANG', '73'),
('7317', 'KAB. LUWU', '73'),
('7318', 'KAB. TANA TORAJA', '73'),
('7322', 'KAB. LUWU UTARA', '73'),
('7324', 'KAB. LUWU TIMUR', '73'),
('7326', 'KAB. TORAJA UTARA', '73'),
('7371', 'KOTA MAKASSAR', '73'),
('7372', 'KOTA PARE PARE', '73'),
('7373', 'KOTA PALOPO', '73'),
('7401', 'KAB. KOLAKA', '74'),
('7402', 'KAB. KONAWE', '74'),
('7403', 'KAB. MUNA', '74'),
('7404', 'KAB. BUTON', '74'),
('7405', 'KAB. KONAWE SELATAN', '74'),
('7406', 'KAB. BOMBANA', '74'),
('7407', 'KAB. WAKATOBI', '74'),
('7408', 'KAB. KOLAKA UTARA', '74'),
('7409', 'KAB. KONAWE UTARA', '74'),
('7410', 'KAB. BUTON UTARA', '74'),
('7411', 'KAB. KOLAKA TIMUR', '74'),
('7412', 'KAB. KONAWE KEPULAUAN', '74'),
('7413', 'KAB. MUNA BARAT', '74'),
('7414', 'KAB. BUTON TENGAH', '74'),
('7415', 'KAB. BUTON SELATAN', '74'),
('7471', 'KOTA KENDARI', '74'),
('7472', 'KOTA BAU BAU', '74'),
('7501', 'KAB. GORONTALO', '75'),
('7502', 'KAB. BOALEMO', '75'),
('7503', 'KAB. BONE BOLANGO', '75'),
('7504', 'KAB. PAHUWATO', '75'),
('7505', 'KAB. GORONTALO UTARA', '75'),
('7571', 'KOTA GORONTALO', '75'),
('7601', 'KAB. PASANGKAYU', '76'),
('7602', 'KAB. MAMUJU', '76'),
('7603', 'KAB. MAMASA', '76'),
('7604', 'KAB. POLEWALI MANDAR', '76'),
('7605', 'KAB. MAJENE', '76'),
('7606', 'KAB. MAMUJU TENGAH', '76'),
('8101', 'KAB. MALUKU TENGAH', '81'),
('8102', 'KAB. MALUKU TENGGARA', '81'),
('8103', 'KAB. KEPULAUAN TANIMBAR', '81'),
('8104', 'KAB. BURU', '81'),
('8105', 'KAB. SERAM BAGIAN TIMUR', '81'),
('8106', 'KAB. SERAM BAGIAN BARAT', '81'),
('8107', 'KAB. KEPULAUAN ARU', '81'),
('8108', 'KAB. MALUKU BARAT DAYA', '81'),
('8109', 'KAB. BURU SELATAN', '81'),
('8171', 'KOTA AMBON', '81'),
('8172', 'KOTA TUAL', '81'),
('8201', 'KAB. HALMAHERA BARAT', '82'),
('8202', 'KAB. HALMAHERA TENGAH', '82'),
('8203', 'KAB. HALMAHERA UTARA', '82'),
('8204', 'KAB. HALMAHERA SELATAN', '82'),
('8205', 'KAB. KEPULAUAN SULA', '82'),
('8206', 'KAB. HALMAHERA TIMUR', '82'),
('8207', 'KAB. PULAU MOROTAI', '82'),
('8208', 'KAB. PULAU TALIABU', '82'),
('8271', 'KOTA TERNATE', '82'),
('8272', 'KOTA TIDORE KEPULAUAN', '82'),
('9101', 'KAB. MERAUKE', '91'),
('9102', 'KAB. JAYAWIJAYA', '91'),
('9103', 'KAB. JAYAPURA', '91'),
('9104', 'KAB. NABIRE', '91'),
('9105', 'KAB. KEPULAUAN YAPEN', '91'),
('9106', 'KAB. BIAK NUMFOR', '91'),
('9107', 'KAB. PUNCAK JAYA', '91'),
('9108', 'KAB. PANIAI', '91'),
('9109', 'KAB. MIMIKA', '91'),
('9110', 'KAB. SARMI', '91'),
('9111', 'KAB. KEEROM', '91'),
('9112', 'KAB PEGUNUNGAN BINTANG', '91'),
('9113', 'KAB. YAHUKIMO', '91'),
('9114', 'KAB. TOLIKARA', '91'),
('9115', 'KAB. WAROPEN', '91'),
('9116', 'KAB. BOVEN DIGOEL', '91'),
('9117', 'KAB. MAPPI', '91'),
('9118', 'KAB. ASMAT', '91'),
('9119', 'KAB. SUPIORI', '91'),
('9120', 'KAB. MAMBERAMO RAYA', '91'),
('9121', 'KAB. MAMBERAMO TENGAH', '91'),
('9122', 'KAB. YALIMO', '91'),
('9123', 'KAB. LANNY JAYA', '91'),
('9124', 'KAB. NDUGA', '91'),
('9125', 'KAB. PUNCAK', '91'),
('9126', 'KAB. DOGIYAI', '91'),
('9127', 'KAB. INTAN JAYA', '91'),
('9128', 'KAB. DEIYAI', '91'),
('9171', 'KOTA JAYAPURA', '91'),
('9201', 'KAB. SORONG', '92'),
('9202', 'KAB. MANOKWARI', '92'),
('9203', 'KAB. FAK FAK', '92'),
('9204', 'KAB. SORONG SELATAN', '92'),
('9205', 'KAB. RAJA AMPAT', '92'),
('9206', 'KAB. TELUK BINTUNI', '92'),
('9207', 'KAB. TELUK WONDAMA', '92'),
('9208', 'KAB. KAIMANA', '92'),
('9209', 'KAB. TAMBRAUW', '92'),
('9210', 'KAB. MAYBRAT', '92'),
('9211', 'KAB. MANOKWARI SELATAN', '92'),
('9212', 'KAB. PEGUNUNGAN ARFAK', '92'),
('9271', 'KOTA SORONG', '92');

-- --------------------------------------------------------

--
-- Table structure for table `tb_khs`
--

CREATE TABLE `tb_khs` (
  `nim` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Aktif','Cuti') COLLATE utf8mb4_unicode_ci NOT NULL,
  `jumlahSksSemester` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ips` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jumlahSksKumulatif` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ipk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileKhs` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statusValidasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_khs`
--

INSERT INTO `tb_khs` (`nim`, `semester`, `status`, `jumlahSksSemester`, `ips`, `jumlahSksKumulatif`, `ipk`, `fileKhs`, `statusValidasi`) VALUES
('24060120130059', '1', 'Aktif', '18', '3.00', '18', '3.00', 'khs1.pdf', 0),
('24060120130059', '2', 'Aktif', '25', '3.00', '43', '3.00', 'khs2.pdf', 0),
('24060120130059', '3', 'Cuti', '0', '0.00', '43', '3.00', '', 0),
('24060120130059', '4', 'Aktif', '21', '3.00', '64', '3.00', 'khs4.pdf', 0),
('24060120130059', '5', 'Aktif', '21', '0.00', '85', '3.00', 'khs5.pdf', 0),
('24060120130059', '6', 'Aktif', '0', '0.00', '106', '3.00', 'khs6.pdf', 0),
('24060120130059', '7', 'Aktif', '0', '0.00', '127', '3.00', 'khs7.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_mhs`
--

CREATE TABLE `tb_mhs` (
  `nim` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statusAktif` enum('Aktif','Cuti','Lulus','Mangkir','DO','UndurDiri','MeninggalDunia') COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kodeKab` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kodeProv` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jalurMasuk` enum('SBMPTN','SNMPTN','Mandiri','Lainnya') COLLATE utf8mb4_unicode_ci NOT NULL,
  `angkatan` int(11) NOT NULL,
  `noHP` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kodeWali` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_mhs`
--

INSERT INTO `tb_mhs` (`nim`, `nama`, `statusAktif`, `alamat`, `email`, `kodeKab`, `kodeProv`, `jalurMasuk`, `angkatan`, `noHP`, `kodeWali`, `foto`) VALUES
('123456', 'Dummy', 'Aktif', NULL, NULL, NULL, NULL, 'SNMPTN', 2018, NULL, '197805162003121001', NULL),
('24060120130059', 'Liem, Roy Marcelino', 'Aktif', NULL, NULL, NULL, NULL, 'SBMPTN', 2019, NULL, '196511071992031001', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_pkl`
--

CREATE TABLE `tb_pkl` (
  `nim` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `filePkl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statusValidasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_pkl`
--

INSERT INTO `tb_pkl` (`nim`, `semester`, `nilai`, `filePkl`, `statusValidasi`) VALUES
('24060120130059', '6', '90', 'pkl.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_provinsi`
--

CREATE TABLE `tb_provinsi` (
  `kodeProv` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `namaProv` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_provinsi`
--

INSERT INTO `tb_provinsi` (`kodeProv`, `namaProv`) VALUES
('11', 'ACEH'),
('12', 'SUMATERA UTARA'),
('13', 'SUMATERA BARAT'),
('14', 'RIAU'),
('15', 'JAMBI'),
('16', 'SUMATERA SELATAN'),
('17', 'BENGKULU'),
('18', 'LAMPUNG'),
('19', 'KEPULAUAN BANGKA BELITUNG'),
('21', 'KEPULAUAN RIAU'),
('31', 'DKI JAKARTA'),
('32', 'JAWA BARAT'),
('33', 'JAWA TENGAH'),
('34', 'DAERAH ISTIMEWA YOGYAKARTA'),
('35', 'JAWA TIMUR'),
('36', 'BANTEN'),
('51', 'BALI'),
('52', 'NUSA TENGGARA BARAT'),
('53', 'NUSA TENGGARA TIMUR'),
('61', 'KALIMANTAN BARAT'),
('62', 'KALIMANTAN TENGAH'),
('63', 'KALIMANTAN SELATAN'),
('64', 'KALIMANTAN TIMUR'),
('65', 'KALIMANTAN UTARA'),
('71', 'SULAWESI UTARA'),
('72', 'SULAWESI TENGAH'),
('73', 'SULAWESI SELATAN'),
('74', 'SULAWESI TENGGARA'),
('75', 'GORONTALO'),
('76', 'SULAWESI BARAT'),
('81', 'MALUKU'),
('82', 'MALUKU UTARA'),
('91', 'PAPUA'),
('92', 'PAPUA BARAT');

-- --------------------------------------------------------

--
-- Table structure for table `tb_role_akun_dosen`
--

CREATE TABLE `tb_role_akun_dosen` (
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('Operator','Departemen','Dosen') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_role_akun_dosen`
--

INSERT INTO `tb_role_akun_dosen` (`username`, `role`) VALUES
('adhesetya', 'Dosen'),
('adiwibowo', 'Departemen'),
('adiwibowo', 'Dosen'),
('anangardiyanto', 'Operator'),
('annisaistiadah', 'Operator'),
('arispuji', 'Departemen'),
('arispuji', 'Dosen'),
('arissugiharto', 'Dosen'),
('benynugroho', 'Operator'),
('betanoranita', 'Dosen'),
('dinarmutiara', 'Dosen'),
('edysuharto', 'Dosen'),
('fajaragung', 'Dosen'),
('guruharyotejo', 'Dosen'),
('helmiearif', 'Dosen'),
('indrawaspada', 'Dosen'),
('khadijah', 'Dosen'),
('muhammadmalik', 'Dosen'),
('nurdinbahtiar', 'Dosen'),
('panjiwisnu', 'Dosen'),
('prajantowahyu', 'Dosen'),
('priyosidik', 'Dosen'),
('ragilsaputra', 'Dosen'),
('retnokusumaningrum', 'Dosen'),
('rismiyati', 'Dosen'),
('s.eko', 'Dosen'),
('sandykurniawan', 'Dosen'),
('satriyoadhy', 'Dosen'),
('sukmawatinur', 'Dosen'),
('sutikno', 'Dosen');

-- --------------------------------------------------------

--
-- Table structure for table `tb_skripsi`
--

CREATE TABLE `tb_skripsi` (
  `nim` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `semester` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nilai` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggalLulusSidang` date NOT NULL,
  `lamaStudi` int(11) NOT NULL,
  `fileSkripsi` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statusValidasi` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_skripsi`
--

INSERT INTO `tb_skripsi` (`nim`, `semester`, `nilai`, `tanggalLulusSidang`, `lamaStudi`, `fileSkripsi`, `statusValidasi`) VALUES
('24060120130059', '7', '', '2022-11-04', 0, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('dbd407fb-f7a6-453f-a651-f8133fe47482', 'c8a1130f7b8d585635591f6eaee0dcd6d6396b5bcedf7582bc82596065c82789', '2022-11-04 02:14:29.843', '20221104021429_init', NULL, NULL, '2022-11-04 02:14:29.176', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_akun_dosen`
--
ALTER TABLE `tb_akun_dosen`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `tb_akun_dosen_username_key` (`username`),
  ADD UNIQUE KEY `tb_akun_dosen_pemilik_key` (`pemilik`);

--
-- Indexes for table `tb_akun_mhs`
--
ALTER TABLE `tb_akun_mhs`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `tb_akun_mhs_username_key` (`username`),
  ADD UNIQUE KEY `tb_akun_mhs_pemilik_key` (`pemilik`);

--
-- Indexes for table `tb_dosen`
--
ALTER TABLE `tb_dosen`
  ADD PRIMARY KEY (`nip`),
  ADD UNIQUE KEY `tb_dosen_nip_key` (`nip`),
  ADD KEY `tb_dosen_kodeKab_fkey` (`kodeKab`),
  ADD KEY `tb_dosen_kodeProv_fkey` (`kodeProv`);

--
-- Indexes for table `tb_irs`
--
ALTER TABLE `tb_irs`
  ADD PRIMARY KEY (`nim`,`semester`);

--
-- Indexes for table `tb_kabupaten`
--
ALTER TABLE `tb_kabupaten`
  ADD PRIMARY KEY (`kodeKab`),
  ADD UNIQUE KEY `tb_kabupaten_kodeKab_key` (`kodeKab`),
  ADD KEY `tb_kabupaten_kodeProv_fkey` (`kodeProv`);

--
-- Indexes for table `tb_khs`
--
ALTER TABLE `tb_khs`
  ADD PRIMARY KEY (`nim`,`semester`);

--
-- Indexes for table `tb_mhs`
--
ALTER TABLE `tb_mhs`
  ADD PRIMARY KEY (`nim`),
  ADD UNIQUE KEY `tb_mhs_nim_key` (`nim`),
  ADD KEY `tb_mhs_kodeKab_fkey` (`kodeKab`),
  ADD KEY `tb_mhs_kodeProv_fkey` (`kodeProv`),
  ADD KEY `tb_mhs_kodeWali_fkey` (`kodeWali`);

--
-- Indexes for table `tb_pkl`
--
ALTER TABLE `tb_pkl`
  ADD PRIMARY KEY (`nim`,`semester`);

--
-- Indexes for table `tb_provinsi`
--
ALTER TABLE `tb_provinsi`
  ADD PRIMARY KEY (`kodeProv`),
  ADD UNIQUE KEY `tb_provinsi_kodeProv_key` (`kodeProv`);

--
-- Indexes for table `tb_role_akun_dosen`
--
ALTER TABLE `tb_role_akun_dosen`
  ADD PRIMARY KEY (`username`,`role`);

--
-- Indexes for table `tb_skripsi`
--
ALTER TABLE `tb_skripsi`
  ADD PRIMARY KEY (`nim`,`semester`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_akun_dosen`
--
ALTER TABLE `tb_akun_dosen`
  ADD CONSTRAINT `tb_akun_dosen_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_dosen` (`nip`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_akun_mhs`
--
ALTER TABLE `tb_akun_mhs`
  ADD CONSTRAINT `tb_akun_mhs_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_mhs` (`nim`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_dosen`
--
ALTER TABLE `tb_dosen`
  ADD CONSTRAINT `tb_dosen_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten` (`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_dosen_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi` (`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tb_irs`
--
ALTER TABLE `tb_irs`
  ADD CONSTRAINT `tb_irs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs` (`nim`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_kabupaten`
--
ALTER TABLE `tb_kabupaten`
  ADD CONSTRAINT `tb_kabupaten_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi` (`kodeProv`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_khs`
--
ALTER TABLE `tb_khs`
  ADD CONSTRAINT `tb_khs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs` (`nim`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_mhs`
--
ALTER TABLE `tb_mhs`
  ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten` (`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_mhs_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi` (`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_mhs_kodeWali_fkey` FOREIGN KEY (`kodeWali`) REFERENCES `tb_dosen` (`nip`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_pkl`
--
ALTER TABLE `tb_pkl`
  ADD CONSTRAINT `tb_pkl_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs` (`nim`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_role_akun_dosen`
--
ALTER TABLE `tb_role_akun_dosen`
  ADD CONSTRAINT `tb_role_akun_dosen_username_fkey` FOREIGN KEY (`username`) REFERENCES `tb_akun_dosen` (`username`) ON UPDATE CASCADE;

--
-- Constraints for table `tb_skripsi`
--
ALTER TABLE `tb_skripsi`
  ADD CONSTRAINT `tb_skripsi_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs` (`nim`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
