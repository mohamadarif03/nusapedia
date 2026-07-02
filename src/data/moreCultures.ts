import { Culture } from "./cultures";

export const moreCultures: Culture[] = [
  // ============ ACEH ============
  {
    id: "ex_ace1", slug: "kopi-gayo", name: "Kopi Gayo", category: "Kuliner", province: "Aceh",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop", thumbnails: [],
    description: "Kopi arabika dari dataran tinggi Gayo, Aceh Tengah.",
    history: "Kopi Gayo telah ditanam di dataran tinggi Gayo sejak masa kolonial Belanda dan menjadi salah satu kopi terbaik dunia.",
    philosophy: "Mencerminkan keuletan dan ketekunan masyarakat Gayo yang hidup di dataran tinggi, mengolah alam menjadi hasil bumi bernilai tinggi."
  },
  {
    id: "ex_ace2", slug: "rencong", name: "Rencong", category: "Kerajinan", province: "Aceh",
    image: "/culture/rencongaceh.jpeg", thumbnails: [],
    description: "Senjata tradisional Aceh berbentuk huruf L, simbol keberanian rakyat Aceh.",
    history: "Rencong telah digunakan sejak zaman Kesultanan Aceh Darussalam sebagai senjata perang dan simbol kehormatan.",
    philosophy: "Bentuknya yang menyerupai huruf Bismillah dalam aksara Arab melambangkan semangat jihad dan keberanian rakyat Aceh."
  },

  // ============ SUMATERA UTARA ============
  {
    id: "su1", slug: "kain-ulos", name: "Kain Ulos", category: "Kerajinan", province: "Sumatera Utara",
    image: "/culture/Batak_Ulos_fabric_displayed_studio_202607021643.jpeg", thumbnails: [],
    description: "Kain tenun khas suku Batak yang memiliki peran penting dalam berbagai upacara adat.",
    history: "Secara harfiah Ulos berarti selimut yang menghangatkan badan.",
    philosophy: "Melambangkan ikatan kasih sayang, restu, dan perlindungan dari marabahaya."
  },
  {
    id: "su2", slug: "tari-tor-tor", name: "Tari Tor-Tor", category: "Seni Pertunjukan", province: "Sumatera Utara",
    image: "/culture/Tor_Tor_dancers_performing_Batak…_202607021644.jpeg", thumbnails: [],
    description: "Tarian purba suku Batak Toba yang diiringi oleh alat musik gondang.",
    history: "Digunakan sejak ratusan tahun lalu dalam ritual penyembuhan, panen, hingga kematian.",
    philosophy: "Bukan sekadar tarian, Tor-tor adalah medium komunikasi dengan roh leluhur dan Tuhan (Mula Jadi Na Bolon)."
  },
  {
    id: "ex_su3", slug: "bika-ambon", name: "Bika Ambon", category: "Kuliner", province: "Sumatera Utara",
    image: "/culture/Bika_Ambon_cake_on_plate_202607021646.jpeg", thumbnails: [],
    description: "Kue khas Medan bertekstur berpori dengan aroma daun pandan dan santan.",
    history: "Meski namanya mengandung 'Ambon', kue ini justru berasal dari Medan dan merupakan warisan kuliner peranakan.",
    philosophy: "Tekstur berporinya yang unik mencerminkan kreativitas dan keberagaman budaya Kota Medan."
  },

  // ============ SUMATERA BARAT ============
  {
    id: "ex_smb1", slug: "tari-piring", name: "Tari Piring", category: "Seni Pertunjukan", province: "Sumatera Barat",
    image: "/culture/Dancer_performing_Tari_Piring_co…_202607021648.jpeg", thumbnails: [],
    description: "Tarian dengan piring di telapak tangan yang digerakkan cepat tanpa jatuh.",
    history: "Berasal dari tradisi persembahan kepada dewa-dewa sebagai rasa syukur atas panen yang melimpah di Minangkabau.",
    philosophy: "Gerakan cepat tanpa menjatuhkan piring melambangkan ketangkasan, keseimbangan, dan ketelitian masyarakat Minang."
  },
  {
    id: "ex_smb2", slug: "rumah-gadang", name: "Rumah Gadang", category: "Lainnya", province: "Sumatera Barat",
    image: "/culture/Minangkabau_house_model_displayed_202607021648.jpeg", thumbnails: [],
    description: "Rumah adat Minangkabau beratap gonjong yang menjulang tajam.",
    history: "Rumah Gadang telah menjadi pusat kehidupan masyarakat Minangkabau selama ratusan tahun, dihuni berdasarkan garis keturunan ibu (matrilineal).",
    philosophy: "Atap gonjong yang runcing melambangkan tanduk kerbau, mengenang kemenangan kerbau Minangkabau dalam legenda."
  },

  // ============ RIAU ============
  {
    id: "ex_ri1", slug: "tari-zapin-melayu", name: "Tari Zapin Melayu", category: "Seni Pertunjukan", province: "Riau",
    image: "/culture/Dancers_performing_Tari_Zapin_Me…_202607021648.jpeg", thumbnails: [],
    description: "Tarian rumpun Melayu yang dipengaruhi budaya Arab.",
    history: "Tari Zapin dibawa oleh pedagang Arab dari Hadramaut ke pesisir Riau dan berkembang menjadi tarian khas Melayu.",
    philosophy: "Gerakan yang sopan dan teratur mencerminkan ajaran Islam tentang adab dan ketertiban dalam kehidupan bermasyarakat."
  },
  {
    id: "ex_ri2", slug: "tenun-siak", name: "Tenun Siak", category: "Kerajinan", province: "Riau",
    image: "/culture/Tenun_Siak_fabric_displayed_eleg…_202607021648.jpeg", thumbnails: [],
    description: "Kain tenun songket khas Melayu Siak dengan benang emas.",
    history: "Tenun Siak berkembang pesat pada masa kejayaan Kerajaan Siak Sri Indrapura sebagai kain kebesaran kerajaan.",
    philosophy: "Benang emas yang berkilau melambangkan kemakmuran dan keagungan peradaban Melayu Riau."
  },

  // ============ KEPULAUAN RIAU ============
  {
    id: "kr1", slug: "tari-zapin", name: "Tari Zapin", category: "Seni Pertunjukan", province: "Kepulauan Riau",
    image: "/culture/Dancer_performing_Tari_Zapin_Melayu_202607021658.jpeg", thumbnails: [],
    description: "Tarian rumpun Melayu yang banyak dipengaruhi oleh budaya Arab dan Islam.",
    history: "Kata Zapin berasal dari bahasa Arab 'Zafn' yang berarti pergerakan kaki cepat. Dibawa oleh pedagang Arab dari Yaman.",
    philosophy: "Media dakwah Islam yang mengajarkan adab, kesopanan, dan harmoni komunal."
  },
  {
    id: "ex_kr2", slug: "gonggong", name: "Gonggong", category: "Kuliner", province: "Kepulauan Riau",
    image: "/culture/Gonggong_sea_snails_on_plate_202607021659.jpeg", thumbnails: [],
    description: "Seafood siput laut khas Tanjung Pinang yang direbus dan disajikan dengan sambal.",
    history: "Gonggong telah menjadi kuliner identitas masyarakat pesisir Kepulauan Riau sejak nenek moyang tinggal di pulau-pulau kecil.",
    philosophy: "Mencerminkan ketergantungan dan rasa syukur masyarakat kepulauan terhadap kekayaan laut sebagai sumber kehidupan."
  },
  {
    id: "ex_kr3", slug: "pantun-melayu-kepri", name: "Pantun Melayu Kepri", category: "Seni Pertunjukan", province: "Kepulauan Riau",
    image: "/culture/Hand-written_Pantun_Melayu_scroll_202607021658.jpeg", thumbnails: [],
    description: "Tradisi berpantun yang menjadi identitas budaya Melayu kepulauan.",
    history: "Pantun telah menjadi tradisi lisan masyarakat Melayu Kepulauan Riau dalam setiap acara adat, peminangan, dan pergaulan.",
    philosophy: "Pantun mengajarkan bahwa setiap ucapan harus disampaikan dengan sopan, penuh kiasan, dan makna mendalam."
  },

  // ============ JAMBI ============
  {
    id: "ja1", slug: "candi-muaro-jambi", name: "Kompleks Muaro Jambi", category: "Lainnya", province: "Jambi",
    image: "/culture/Temple_complex_model_on_stand_202607021658.jpeg", thumbnails: [],
    description: "Situs purbakala kompleks candi Hindu-Buddha terluas di Asia Tenggara.",
    history: "Pusat pendidikan agama Buddha di masa Kerajaan Sriwijaya dan Melayu dari abad ke-7 hingga 13.",
    philosophy: "Bukti sejarah kejayaan intelektual dan harmoni agama di masa lampau Nusantara."
  },
  {
    id: "ex_ja2", slug: "batik-jambi", name: "Batik Jambi", category: "Batik", province: "Jambi",
    image: "/culture/Batik_Jambi_fabric_on_stand_202607021701.jpeg", thumbnails: [],
    description: "Batik khas Jambi dengan motif-motif flora dan fauna lokal seperti durian pecah.",
    history: "Batik Jambi telah ada sejak zaman Kerajaan Melayu Jambi dan dipengaruhi oleh kebudayaan Sriwijaya.",
    philosophy: "Motif durian pecah melambangkan keterbukaan dan kerendahan hati masyarakat Jambi."
  },
  {
    id: "ex_ja3", slug: "tempoyak", name: "Tempoyak", category: "Kuliner", province: "Jambi",
    image: "/culture/Tempoyak_in_ceramic_bowl_202607021701.jpeg", thumbnails: [],
    description: "Fermentasi daging durian yang digunakan sebagai bumbu masakan khas Jambi.",
    history: "Tempoyak merupakan kearifan lokal masyarakat Jambi dalam mengawetkan durian yang melimpah saat musim panen.",
    philosophy: "Mencerminkan kreativitas dan kesederhanaan masyarakat dalam memanfaatkan hasil alam secara bijaksana."
  },

  // ============ SUMATERA SELATAN ============
  {
    id: "ss1", slug: "pempek", name: "Pempek", category: "Kuliner", province: "Sumatera Selatan",
    image: "/culture/Pempek_Palembang_on_white_plate_202607021701.jpeg", thumbnails: [],
    description: "Makanan berbahan dasar daging ikan dan sagu yang disajikan dengan kuah cuko yang khas.",
    history: "Sudah ada sejak abad ke-16 saat perantau Tionghoa menetap di Palembang dan mengolah hasil tangkapan ikan yang melimpah.",
    philosophy: "Mencerminkan akulturasi budaya lokal Palembang dengan budaya Tionghoa."
  },
  {
    id: "ss2", slug: "songket-palembang", name: "Songket Palembang", category: "Kerajinan", province: "Sumatera Selatan",
    image: "/culture/Songket_fabric_on_hanger_202607021701.jpeg", thumbnails: [],
    description: "Kain tenun mewah berbenang emas atau perak peninggalan kejayaan Sriwijaya.",
    history: "Dulunya hanya dipakai oleh keluarga kerajaan Sriwijaya dan Kesultanan Palembang Darussalam.",
    philosophy: "Kejayaan, kemakmuran, dan keagungan si pemakai."
  },
  {
    id: "ex_ss3", slug: "tari-tanggai", name: "Tari Tanggai", category: "Seni Pertunjukan", province: "Sumatera Selatan",
    image: "/culture/Dancer_performing_Tari_Tanggai_c…_202607021706.jpeg", thumbnails: [],
    description: "Tarian penyambutan tamu terhormat khas Palembang.",
    history: "Tari Tanggai telah menjadi tradisi penyambutan di Kesultanan Palembang Darussalam sejak berabad-abad lalu.",
    philosophy: "Gerakan tangan yang anggun dengan hiasan kuku panjang melambangkan penghormatan dan keramahan masyarakat Palembang."
  },

  // ============ KEPULAUAN BANGKA BELITUNG ============
  {
    id: "bb1", slug: "mie-belitung", name: "Mie Belitung", category: "Kuliner", province: "Kepulauan Bangka Belitung",
    image: "/culture/Mie_Belitung_noodle_dish_202607021706.jpeg", thumbnails: [],
    description: "Mie kuning dengan siraman kuah kaldu udang yang kental dan manis gurih.",
    history: "Pengaruh kuat dari imigran Tionghoa berpadu dengan kekayaan hasil laut (udang) Melayu Belitung.",
    philosophy: "Simbol kebersamaan (mie yang panjang melambangkan umur/hubungan yang tak terputus) antar-etnis."
  },
  {
    id: "ex_bb2", slug: "lempah-kuning", name: "Lempah Kuning", category: "Kuliner", province: "Kepulauan Bangka Belitung",
    image: "/culture/Lempah_Kuning_fish_soup_202607021706.jpeg", thumbnails: [],
    description: "Sup ikan dengan kunyit khas Bangka yang segar dan gurih.",
    history: "Lempah Kuning merupakan masakan sehari-hari masyarakat Bangka yang memanfaatkan ikan segar hasil tangkapan nelayan.",
    philosophy: "Warna kuning melambangkan kemakmuran dan kesejahteraan masyarakat pesisir Bangka."
  },
  {
    id: "ex_bb3", slug: "campak", name: "Campak", category: "Seni Pertunjukan", province: "Kepulauan Bangka Belitung",
    image: "/culture/Dancers_performing_Tari_Campak_202607021706.jpeg", thumbnails: [
      "/culture/Dancers_performing_Tari_Campak_202607021709.jpeg"
    ],
    description: "Tarian tradisional Melayu Belitung untuk perayaan panen dan perkawinan.",
    history: "Campak telah ditarikan oleh masyarakat Belitung sejak ratusan tahun lalu sebagai ungkapan kegembiraan komunal.",
    philosophy: "Gerakan berpasangan mencerminkan keharmonisan dan kebersamaan dalam adat Melayu Belitung."
  },

  // ============ BENGKULU ============
  {
    id: "be1", slug: "tabot", name: "Upacara Tabot", category: "Seni Pertunjukan", province: "Bengkulu",
    image: "/culture/Tabot_structure_model_display_202607021709.jpeg", thumbnails: [],
    description: "Upacara tradisional merayakan peringatan gugurnya Husein bin Ali (Cucu Nabi Muhammad).",
    history: "Dibawa oleh para pekerja Islam Syiah dari Madras, India yang membangun Benteng Marlborough pada 1714.",
    philosophy: "Simbol kepahlawanan, keberanian melawan kezaliman, dan penghormatan kepada leluhur."
  },
  {
    id: "ex_be2", slug: "kain-besurek", name: "Kain Besurek", category: "Kerajinan", province: "Bengkulu",
    image: "/culture/Kain_Besurek_fabric_on_stand_202607021709.jpeg", thumbnails: [],
    description: "Kain batik khas Bengkulu bermotif kaligrafi Arab.",
    history: "Kain Besurek diperkirakan berasal dari abad ke-17 saat pengaruh Islam masuk ke Bengkulu melalui perdagangan.",
    philosophy: "Motif kaligrafi Arab pada kain melambangkan ketaatan kepada ajaran Islam dan keindahan seni tulis Arab."
  },
  {
    id: "ex_be3", slug: "pendap", name: "Pendap", category: "Kuliner", province: "Bengkulu",
    image: "/culture/Pendap_fish_dish_taro_leaves_202607021709.jpeg", thumbnails: [],
    description: "Masakan khas Bengkulu dari ikan atau daging yang dibungkus daun talas lalu dikukus.",
    history: "Pendap merupakan hidangan tradisional yang telah diwariskan secara turun-temurun oleh masyarakat Bengkulu.",
    philosophy: "Cara memasak dengan membungkus daun mencerminkan kearifan lokal dalam menjaga cita rasa alami bahan makanan."
  },

  // ============ LAMPUNG ============
  {
    id: "la1", slug: "kain-tapis", name: "Kain Tapis", category: "Kerajinan", province: "Lampung",
    image: "/culture/Kain_Tapis_on_wooden_stand_202607021727.jpeg", thumbnails: [],
    description: "Kain tenun tradisional masyarakat Lampung bersulam benang emas yang disulam dengan teknik cucuk.",
    history: "Pembuatan tapis ditujukan untuk menyelaraskan kehidupan dengan Sang Pencipta semesta.",
    philosophy: "Kesucian, kemewahan, dan lambang keagungan status sosial dalam adat Pepadun maupun Saibatin."
  },
  {
    id: "ex_la2", slug: "seruit", name: "Seruit", category: "Kuliner", province: "Lampung",
    image: "/culture/Seruit_fish_dish_presentation_202607021727.jpeg", thumbnails: [],
    description: "Ikan bakar dengan sambal terasi dan tempoyak khas Lampung.",
    history: "Seruit merupakan hidangan khas yang selalu hadir dalam acara adat dan perayaan masyarakat Lampung.",
    philosophy: "Perpaduan ikan bakar dan tempoyak mencerminkan harmoni antara hasil laut dan hasil bumi masyarakat Lampung."
  },
  {
    id: "ex_la3", slug: "tari-sembah", name: "Tari Sembah", category: "Seni Pertunjukan", province: "Lampung",
    image: "/culture/Dancer_performing_Tari_Sembah_202607021736.jpeg", thumbnails: [],
    description: "Tarian penyambutan tamu agung dalam adat Lampung Pepadun.",
    history: "Tari Sembah telah menjadi tradisi resmi penyambutan tamu kehormatan dalam setiap upacara adat Lampung.",
    philosophy: "Gerakan sembah melambangkan penghormatan, keramahan, dan martabat tuan rumah dalam budaya Lampung."
  },

  // ============ BANTEN ============
  {
    id: "bt1", slug: "debus", name: "Kesenian Debus", category: "Seni Pertunjukan", province: "Banten",
    image: "/culture/Performer_in_martial_arts_pose_202607021736.jpeg", thumbnails: [],
    description: "Kesenian bela diri yang mempertontonkan kemampuan manusia kebal terhadap senjata tajam.",
    history: "Tercipta pada masa pemerintahan Sultan Maulana Hasanuddin (abad 16) sebagai sarana penyebaran Islam.",
    philosophy: "Mengajarkan kepasrahan total kepada Tuhan, bahwa tidak ada kekuatan lain selain atas izin-Nya."
  },
  {
    id: "ex_bt2", slug: "sate-bandeng", name: "Sate Bandeng", category: "Kuliner", province: "Banten",
    image: "/culture/Sate_Bandeng_on_ceramic_plate_202607021736.jpeg", thumbnails: [],
    description: "Ikan bandeng yang dibumbui, dicabut tulangnya, lalu dibakar dalam kulit ikan aslinya.",
    history: "Sate Bandeng telah menjadi oleh-oleh khas Banten sejak zaman Kesultanan Banten dan menjadi hidangan istana.",
    philosophy: "Proses yang rumit mencerminkan ketelitian dan dedikasi masyarakat Banten dalam mengolah hasil alam."
  },
  {
    id: "ex_bt3", slug: "baduy-weaving", name: "Baduy Weaving", category: "Kerajinan", province: "Banten",
    image: "/culture/Tenun_Baduy_fabric_on_stand_202607021736.jpeg", thumbnails: [],
    description: "Tenun tradisional suku Baduy dengan pewarna alami tanpa bahan kimia.",
    history: "Suku Baduy Dalam telah menenun kain secara tradisional selama berabad-abad tanpa pengaruh teknologi modern.",
    philosophy: "Penggunaan pewarna alami mencerminkan prinsip hidup suku Baduy yang selaras dengan alam dan menolak modernisasi berlebihan."
  },

  // ============ DKI JAKARTA ============
  {
    id: "jk1", slug: "ondel-ondel", name: "Ondel-Ondel", category: "Seni Pertunjukan", province: "DKI Jakarta",
    image: "/culture/Miniature_Ondel-ondel_puppets_di…_202607021738.jpeg", thumbnails: [],
    description: "Boneka raksasa khas Betawi yang biasanya tampil berpasangan dalam iringan musik gambang kromong.",
    history: "Pada awalnya berfungsi sebagai penolak bala atau gangguan roh halus yang gentayangan.",
    philosophy: "Sebagai simbol perlindungan bagi masyarakat dari malapetaka."
  },
  {
    id: "jk2", slug: "kerak-telor", name: "Kerak Telor", category: "Kuliner", province: "DKI Jakarta",
    image: "/culture/Kerak_Telor_traditional_Betawi_o…_202607021738.jpeg", thumbnails: [],
    description: "Makanan asli Betawi dari beras ketan, telur, ebi sangrai, dan kelapa sangrai.",
    history: "Tercipta tanpa sengaja oleh masyarakat Betawi tempo dulu dari sisa-sisa hasil bumi yang berlimpah.",
    philosophy: "Kesederhanaan dan kreativitas masyarakat lokal dalam mengolah bahan seadanya menjadi hidangan lezat."
  },
  {
    id: "ex_jk3", slug: "tari-topeng-betawi", name: "Tari Topeng Betawi", category: "Seni Pertunjukan", province: "DKI Jakarta",
    image: "/culture/Dancer_performing_Tari_Topeng_Be…_202607021738.jpeg", thumbnails: [],
    description: "Tarian khas Betawi menggunakan topeng warna-warni.",
    history: "Tari Topeng Betawi berkembang sejak abad ke-16 di wilayah pinggiran Batavia sebagai hiburan rakyat.",
    philosophy: "Setiap warna topeng melambangkan karakter berbeda, mengajarkan bahwa manusia memiliki banyak sisi kepribadian."
  },

  // ============ JAWA BARAT ============
  {
    id: "ex_jb1", slug: "kecapi-suling", name: "Kecapi Suling", category: "Alat Musik", province: "Jawa Barat",
    image: "/culture/Kecapi_and_Suling_arrangement_202607021738.jpeg", thumbnails: [],
    description: "Perpaduan kecapi dan suling yang menjadi ciri khas musik Sunda.",
    history: "Kecapi suling telah dimainkan sejak zaman Kerajaan Sunda sebagai pengiring tembang dan upacara kerajaan.",
    philosophy: "Suara kecapi yang lembut dan suling yang mengalir melambangkan kehalusan budi dan kedamaian jiwa masyarakat Sunda."
  },
  {
    id: "ex_jb2", slug: "nasi-timbel", name: "Nasi Timbel", category: "Kuliner", province: "Jawa Barat",
    image: "/culture/Nasi_Timbel_with_side_dishes_202607021739.jpeg", thumbnails: [],
    description: "Nasi putih dibungkus daun pisang dengan lauk khas Sunda.",
    history: "Nasi Timbel merupakan cara tradisional masyarakat Sunda menyajikan nasi agar tetap hangat dan beraroma daun pisang.",
    philosophy: "Kesederhanaan penyajian dengan daun pisang mencerminkan filosofi Sunda yang dekat dengan alam."
  },

  // ============ JAWA TENGAH ============
  {
    id: "ex_jtg1", slug: "gamelan-jawa", name: "Gamelan Jawa", category: "Alat Musik", province: "Jawa Tengah",
    image: "/culture/Gamelan_Jawa_instruments_displayed_202607021739.jpeg", thumbnails: [],
    description: "Ansambel musik tradisional Jawa yang terdiri dari gong, kenong, saron, dan bonang.",
    history: "Gamelan Jawa telah ada sejak zaman Kerajaan Mataram Kuno dan menjadi bagian tak terpisahkan dari kebudayaan keraton.",
    philosophy: "Setiap instrumen memiliki peran yang setara, melambangkan harmoni dan keselarasan dalam kehidupan bermasyarakat Jawa."
  },

  // ============ DI YOGYAKARTA ============
  {
    id: "ex_diy2", slug: "tari-bedhaya-ketawang", name: "Tari Bedhaya Ketawang", category: "Seni Pertunjukan", province: "DI Yogyakarta",
    image: "/culture/Dancer_performing_Tari_Bedhaya_K…_202607021739.jpeg", thumbnails: [],
    description: "Tarian sakral keraton Yogyakarta yang hanya ditarikan oleh 9 penari putri.",
    history: "Konon tarian ini diciptakan oleh Kanjeng Ratu Kidul untuk Sultan Agung sebagai tanda cinta abadi.",
    philosophy: "Sembilan penari melambangkan sembilan lubang dalam tubuh manusia, mengajarkan pengendalian diri dan kesakralan jiwa."
  },

  // ============ JAWA TIMUR ============
  {
    id: "jt1", slug: "reog-ponorogo", name: "Reog Ponorogo", category: "Seni Pertunjukan", province: "Jawa Timur",
    image: "/culture/Reog_Ponorogo_mask_on_stand_202607021739.jpeg", thumbnails: [],
    description: "Seni pertunjukan topeng raksasa Singo Barong yang dihiasi bulu merak.",
    history: "Berasal dari kisah Ki Ageng Kutu yang menyindir raja Majapahit, atau versi lain tentang pelamaran Dewi Songgolangit.",
    philosophy: "Kritik sosial, keberanian, dan kejantanan."
  },
  {
    id: "jt2", slug: "rujak-cingur", name: "Rujak Cingur", category: "Kuliner", province: "Jawa Timur",
    image: "/culture/Rujak_Cingur_food_photograph_202607021743.jpeg", thumbnails: [],
    description: "Makanan tradisional Surabaya yang menggunakan bahan utama cingur (mulut) sapi.",
    history: "Sudah dikenal luas oleh masyarakat Surabaya dan pesisir Timur Jawa sejak zaman dulu.",
    philosophy: "Keragaman bahan (sayur, buah, daging) yang menyatu sempurna melambangkan masyarakat Surabaya yang heterogen."
  },
  {
    id: "ex_jt3", slug: "batik-madura", name: "Batik Madura", category: "Batik", province: "Jawa Timur",
    image: "/culture/Batik_fabric_on_wooden_stand_202607021743.jpeg", thumbnails: [],
    description: "Batik dengan warna cerah dan motif berani khas pulau Madura.",
    history: "Batik Madura berkembang di pesisir Madura sejak abad ke-18 dengan pengaruh dari batik pesisir Jawa.",
    philosophy: "Warna merah, kuning, dan hijau yang mencolok mencerminkan karakter masyarakat Madura yang tegas, berani, dan ekspresif."
  },

  // ============ BALI ============
  {
    id: "bl2", slug: "subak", name: "Sistem Subak", category: "Lainnya", province: "Bali",
    image: "/culture/Balinese_Subak_irrigation_system…_202607021743.jpeg", thumbnails: [],
    description: "Sistem irigasi tradisional untuk sawah di Bali yang dikelola secara komunal dan demokratis.",
    history: "Telah ada sejak abad ke-9 dan dicatat dalam prasasti Raja Purana.",
    philosophy: "Perwujudan Tri Hita Karana di ranah pertanian (Tuhan, manusia, alam)."
  },
  {
    id: "ex_bl3", slug: "gamelan-bali", name: "Gamelan Bali", category: "Alat Musik", province: "Bali",
    image: "/culture/Gamelan_Bali_instruments_displayed_202607021743.jpeg", thumbnails: [],
    description: "Ansambel gamelan khas Bali yang lebih dinamis dan cepat dibanding gamelan Jawa.",
    history: "Gamelan Bali telah ada sejak masa Hindu-Buddha dan berkembang dalam konteks upacara keagamaan di pura-pura.",
    philosophy: "Tempo yang cepat dan dinamis mencerminkan semangat spiritual masyarakat Bali yang penuh gairah dalam beribadah."
  },

  // ============ NUSA TENGGARA BARAT ============
  {
    id: "ntb1", slug: "ayam-taliwang", name: "Ayam Taliwang", category: "Kuliner", province: "Nusa Tenggara Barat",
    image: "/culture/Ayam_Taliwang_on_plate_202607021745.jpeg", thumbnails: [],
    description: "Olahan ayam bakar dengan bumbu super pedas khas Sumbawa/Lombok.",
    history: "Dibawa oleh prajurit Kerajaan Taliwang (Sumbawa) saat dikirim ke Lombok untuk misi perdamaian.",
    philosophy: "Keberanian dan ketegasan, tercermin dari rasanya yang sangat kuat dan pedas."
  },
  {
    id: "ex_ntb2", slug: "kain-tenun-sasak", name: "Kain Tenun Sasak", category: "Kerajinan", province: "Nusa Tenggara Barat",
    image: "/culture/Kain_Tenun_Sasak_fabric_displayed_202607021745.jpeg", thumbnails: [],
    description: "Kain tenun tradisional suku Sasak Lombok dengan pewarna alami.",
    history: "Tenun Sasak telah diwariskan oleh perempuan suku Sasak secara turun-temurun sebagai keterampilan wajib sebelum menikah.",
    philosophy: "Setiap motif tenun menceritakan kisah kehidupan dan kepercayaan suku Sasak terhadap alam dan leluhur."
  },
  {
    id: "ex_ntb3", slug: "gendang-beleq", name: "Gendang Beleq", category: "Alat Musik", province: "Nusa Tenggara Barat",
    image: "/culture/Gendang_Beleq_drums_on_stand_202607021745.jpeg", thumbnails: [],
    description: "Alat musik gendang raksasa khas Lombok yang dimainkan sambil menari.",
    history: "Gendang Beleq awalnya digunakan untuk mengiringi prajurit Sasak yang berangkat ke medan perang.",
    philosophy: "Ukuran gendang yang besar melambangkan keberanian dan semangat juang masyarakat Sasak."
  },

  // ============ NUSA TENGGARA TIMUR ============
  {
    id: "ntt1", slug: "sasando", name: "Sasando", category: "Alat Musik", province: "Nusa Tenggara Timur",
    image: "/culture/Sasando_musical_instrument_displ…_202607021745.jpeg", thumbnails: [],
    description: "Alat musik petik berdawai dari Pulau Rote, terbuat dari daun lontar.",
    history: "Berasal dari abad ke-7, diciptakan oleh seorang pemuda Rote bernama Sangguana yang terinspirasi dari mimpinya.",
    philosophy: "Resonator dari daun lontar melambangkan keharmonisan dengan alam sekitar."
  },
  {
    id: "ex_ntt2", slug: "kain-tenun-ikat", name: "Kain Tenun Ikat", category: "Kerajinan", province: "Nusa Tenggara Timur",
    image: "/culture/Kain_Tenun_Ikat_fabric_displayed_202607021747.jpeg", thumbnails: [],
    description: "Kain tenun dengan teknik ikat khas NTT, tiap daerah memiliki motif berbeda.",
    history: "Teknik ikat telah dipraktikkan oleh masyarakat NTT selama ratusan tahun dan menjadi identitas tiap suku di kepulauan ini.",
    philosophy: "Keragaman motif antar daerah mencerminkan kebhinekaan budaya di Nusa Tenggara Timur."
  },
  {
    id: "ex_ntt3", slug: "sei-daging-asap", name: "Sei (Daging Asap)", category: "Kuliner", province: "Nusa Tenggara Timur",
    image: "/culture/Se'i_with_sambal_lu'at_202607021747.jpeg", thumbnails: [],
    description: "Daging babi atau sapi yang diasapi dengan kayu kusambi khas NTT.",
    history: "Sei merupakan teknik pengawetan daging tradisional masyarakat NTT yang telah ada sejak zaman leluhur.",
    philosophy: "Proses pengasapan yang lambat dan sabar mencerminkan kesabaran masyarakat NTT dalam menjalani kehidupan."
  },

  // ============ KALIMANTAN BARAT ============
  {
    id: "kb1", slug: "tari-monong", name: "Tari Monong", category: "Seni Pertunjukan", province: "Kalimantan Barat",
    image: "/culture/Dancer_performing_Tari_Monong_ri…_202607021747.jpeg", thumbnails: [],
    description: "Tari penyembuhan (balian) suku Dayak yang berfungsi mengusir penyakit.",
    history: "Ritual kuno untuk meminta kesembuhan kepada Tuhan (Jubata) saat ada warga yang sakit keras.",
    philosophy: "Penghormatan terhadap keseimbangan gaib antara roh manusia dan alam."
  },
  {
    id: "ex_kb2", slug: "bubur-pedas-sambas", name: "Bubur Pedas Sambas", category: "Kuliner", province: "Kalimantan Barat",
    image: "/culture/Bubur_Pedas_Sambas_in_bowl_202607021747.jpeg", thumbnails: [],
    description: "Bubur sayuran campur rempah khas Melayu Sambas.",
    history: "Bubur Pedas Sambas merupakan hidangan wajib saat bulan Ramadan dan telah menjadi tradisi kuliner Melayu Sambas selama ratusan tahun.",
    philosophy: "Campuran beragam sayuran dan rempah melambangkan keharmonisan berbagai suku di Kalimantan Barat."
  },
  {
    id: "ex_kb3", slug: "tarian-mandau", name: "Tarian Mandau", category: "Seni Pertunjukan", province: "Kalimantan Barat",
    image: "/culture/Dancer_performing_Tari_Mandau_sword_202607021805.jpeg", thumbnails: [],
    description: "Tarian perang suku Dayak menggunakan senjata mandau dan perisai.",
    history: "Tarian Mandau awalnya ditampilkan sebelum dan sesudah perang sebagai ritual keberanian suku Dayak.",
    philosophy: "Gerakan lincah dan tegas mencerminkan semangat juang dan keberanian prajurit Dayak."
  },

  // ============ KALIMANTAN TENGAH ============
  {
    id: "ktg1", slug: "tiwah", name: "Upacara Tiwah", category: "Seni Pertunjukan", province: "Kalimantan Tengah",
    image: "/culture/Wooden_model_Sandung_displayed_202607021805.jpeg", thumbnails: [],
    description: "Ritual kematian tingkat akhir penganut Kaharingan suku Dayak untuk mengantar roh ke Lewu Tatau (surga).",
    history: "Sudah dilaksanakan turun-temurun sejak zaman prasejarah masyarakat Dayak Ngaju.",
    philosophy: "Penghormatan terakhir kepada keluarga yang telah meninggal, membersihkan desa dari kesialan (sial babeho)."
  },
  {
    id: "ex_ktg2", slug: "mandau-kalimantan-tengah", name: "Mandau Kalimantan Tengah", category: "Kerajinan", province: "Kalimantan Tengah",
    image: "/culture/Mandau_sword_on_stand_202607021807.jpeg", thumbnails: [],
    description: "Senjata sakral suku Dayak Ngaju dengan ukiran dan bulu burung enggang.",
    history: "Mandau telah menjadi pusaka turun-temurun suku Dayak Ngaju yang dikeramatkan dan digunakan dalam upacara adat.",
    philosophy: "Bulu burung enggang pada gagang melambangkan kemuliaan dan hubungan spiritual manusia dengan alam atas."
  },
  {
    id: "ex_ktg3", slug: "juhu-singkah", name: "Juhu Singkah", category: "Kuliner", province: "Kalimantan Tengah",
    image: "/culture/Juhu_Singkah_soup_in_bowl_202607021806.jpeg", thumbnails: [],
    description: "Sayur rotan muda khas Dayak yang dimasak dengan santan dan ikan.",
    history: "Juhu Singkah merupakan masakan sehari-hari masyarakat Dayak yang memanfaatkan rotan muda dari hutan Kalimantan.",
    philosophy: "Penggunaan rotan muda mencerminkan keselarasan masyarakat Dayak dengan hutan sebagai sumber kehidupan."
  },

  // ============ KALIMANTAN SELATAN ============
  {
    id: "ks1", slug: "soto-banjar", name: "Soto Banjar", category: "Kuliner", province: "Kalimantan Selatan",
    image: "/culture/Soto_Banjar_soup_presented_elega…_202607021807.jpeg", thumbnails: [],
    description: "Soto khas suku Banjar dengan kuah bening berbumbu kapulaga, kayu manis, dan cengkeh.",
    history: "Merupakan bentuk adaptasi dari hidangan pedagang Arab, India, dan Tiongkok yang singgah di Banjarmasin.",
    philosophy: "Keterbukaan masyarakat pesisir terhadap kebudayaan asing yang dipadukan menjadi kearifan lokal."
  },
  {
    id: "ks2", slug: "kain-sasirangan", name: "Kain Sasirangan", category: "Kerajinan", province: "Kalimantan Selatan",
    image: "/culture/Fabric_on_wooden_stand_202607021807.jpeg", thumbnails: [],
    description: "Kain tradisional Banjar yang dibuat dengan teknik rintang warna (jumputan/ikat).",
    history: "Menurut hikayat, kain ini pertama kali dibuat oleh Patih Lambung Mangkurat untuk Putri Junjung Buih.",
    philosophy: "Awalnya berfungsi sebagai kain pengobatan (pamali) untuk mengusir roh jahat."
  },
  {
    id: "ex_ks3", slug: "wadai", name: "Wadai", category: "Kuliner", province: "Kalimantan Selatan",
    image: "/culture/Wadai_Banjar_cakes_on_plate_202607021807.jpeg", thumbnails: [],
    description: "Kue-kue tradisional Banjar yang disajikan saat perayaan Maulid Nabi.",
    history: "Wadai telah menjadi bagian tak terpisahkan dari perayaan Maulid Nabi dan acara keagamaan masyarakat Banjar.",
    philosophy: "Beragam jenis wadai yang disajikan bersama melambangkan kebersamaan dan kemurahan hati masyarakat Banjar."
  },

  // ============ KALIMANTAN TIMUR ============
  {
    id: "kt1", slug: "mandau", name: "Senjata Mandau", category: "Kerajinan", province: "Kalimantan Timur",
    image: "/culture/Mandau_sword_on_stand_202607021806.jpeg", thumbnails: [],
    description: "Pedang tradisional suku Dayak yang sering dihiasi ukiran rumit.",
    history: "Merupakan pusaka turun-temurun yang sangat sakral, dulunya terkait erat dengan tradisi mengayau (penggal kepala).",
    philosophy: "Simbol persaudaraan, pelindung, dan tanggung jawab seorang kesatria Dayak."
  },
  {
    id: "ex_kt2", slug: "tari-hudoq", name: "Tari Hudoq", category: "Seni Pertunjukan", province: "Kalimantan Timur",
    image: "/culture/Dancer_performing_Tari_Hudoq_cos…_202607021809.jpeg", thumbnails: [],
    description: "Tarian suku Dayak Bahau/Modang menggunakan topeng kayu untuk ritual panen.",
    history: "Tari Hudoq dilaksanakan setelah musim tanam padi sebagai permohonan perlindungan dari hama dan doa panen berlimpah.",
    philosophy: "Topeng kayu yang menyeramkan melambangkan roh pelindung yang mengusir makhluk perusak tanaman."
  },
  {
    id: "ex_kt3", slug: "amplang", name: "Amplang", category: "Kuliner", province: "Kalimantan Timur",
    image: "/culture/Authentic_Amplang_on_plate_202607021809.jpeg", thumbnails: [],
    description: "Kerupuk ikan tenggiri khas Samarinda yang renyah.",
    history: "Amplang merupakan oleh-oleh khas Samarinda yang telah dibuat secara turun-temurun oleh masyarakat pesisir Kalimantan Timur.",
    philosophy: "Pemanfaatan ikan tenggiri menjadi kerupuk mencerminkan kreativitas masyarakat pesisir dalam mengolah hasil laut."
  },

  // ============ KALIMANTAN UTARA ============
  {
    id: "ex_ku2", slug: "sape", name: "Sape", category: "Alat Musik", province: "Kalimantan Utara",
    image: "/culture/Sape_musical_instrument_displayed_202607021809.jpeg", thumbnails: [],
    description: "Alat musik petik khas Dayak Kenyah, bentuknya menyerupai perahu.",
    history: "Sape telah dimainkan oleh suku Dayak Kenyah selama berabad-abad dalam upacara adat dan hiburan di rumah panjang.",
    philosophy: "Bentuk menyerupai perahu melambangkan perjalanan hidup manusia yang harus menavigasi arus kehidupan dengan bijaksana."
  },
  {
    id: "ex_ku3", slug: "tidung-weaving", name: "Tidung Weaving", category: "Kerajinan", province: "Kalimantan Utara",
    image: "/culture/Tenun_Tidung_fabric_on_stand_202607021809.jpeg", thumbnails: [],
    description: "Anyaman topi dan tikar khas suku Tidung dari daun nipah.",
    history: "Suku Tidung telah menganyam daun nipah selama ratusan tahun sebagai kerajinan sehari-hari dan sumber ekonomi.",
    philosophy: "Ketelatenan menganyam daun nipah melambangkan kesabaran dan keterampilan hidup masyarakat pesisir Kalimantan Utara."
  },

  // ============ SULAWESI UTARA ============
  {
    id: "su1_sulut", slug: "kolintang", name: "Kolintang", category: "Alat Musik", province: "Sulawesi Utara",
    image: "/culture/Kolintang_musical_instrument_dis…_202607021812.jpeg", thumbnails: [],
    description: "Alat musik perkusi bernada dari kayu khas Minahasa.",
    history: "Nama Kolintang berasal dari bunyi tong (rendah), ting (tinggi), dan tang (biasa) -> 'Maketong tiga tang'.",
    philosophy: "Alat pemersatu masyarakat Minahasa untuk merayakan syukur panen kepada Opo Empung (Tuhan)."
  },
  {
    id: "ex_sulut2", slug: "tinutuan-bubur-manado", name: "Tinutuan (Bubur Manado)", category: "Kuliner", province: "Sulawesi Utara",
    image: "/culture/Tinutuan_porridge_with_garnishes_202607021812.jpeg", thumbnails: [],
    description: "Bubur sayuran khas Manado dengan beragam sayur dan labu.",
    history: "Tinutuan telah menjadi sarapan khas masyarakat Manado sejak zaman nenek moyang sebagai cara memanfaatkan semua sayuran yang tersedia.",
    philosophy: "Beragam sayuran yang bercampur menjadi satu melambangkan keberagaman suku dan budaya di Sulawesi Utara."
  },
  {
    id: "ex_sulut3", slug: "kabasaran", name: "Kabasaran", category: "Seni Pertunjukan", province: "Sulawesi Utara",
    image: "/culture/Dancer_performing_Kabasaran_war_…_202607021812.jpeg", thumbnails: [],
    description: "Tarian perang suku Minahasa yang sangat energik dan sakral.",
    history: "Kabasaran awalnya ditarikan oleh para prajurit Minahasa sebelum berperang untuk membangkitkan keberanian.",
    philosophy: "Gerakan yang energik dan teriakan lantang melambangkan semangat pantang menyerah suku Minahasa."
  },

  // ============ GORONTALO ============
  {
    id: "go1", slug: "binthe-biluhuta", name: "Binthe Biluhuta", category: "Kuliner", province: "Gorontalo",
    image: "/culture/Binthe_Biluhuta_soup_presented_e…_202607021812.jpeg", thumbnails: [],
    description: "Sup jagung dengan campuran ikan cakalang, udang, parutan kelapa, dan belimbing wuluh.",
    history: "Menu wajib masyarakat Gorontalo sejak dulu karena wilayahnya merupakan penghasil jagung terbesar di Sulawesi.",
    philosophy: "Keseimbangan rasa (manis jagung, asin laut, asam belimbing) melambangkan kebersamaan masyarakat Gorontalo (Hulondalo)."
  },
  {
    id: "ex_go2", slug: "tidi", name: "Tidi", category: "Seni Pertunjukan", province: "Gorontalo",
    image: "https://images.unsplash.com/photo-1544413155-27a1cbb0dc30?q=80&w=800&auto=format&fit=crop", thumbnails: [],
    description: "Tarian tradisional Gorontalo yang menggambarkan keanggunan wanita Gorontalo.",
    history: "Tidi telah ditarikan oleh perempuan Gorontalo dalam upacara adat dan pesta rakyat sejak zaman kerajaan.",
    philosophy: "Gerakan yang lemah gemulai mencerminkan kehalusan budi dan keanggunan perempuan Gorontalo."
  },
  {
    id: "ex_go3", slug: "karawo", name: "Karawo", category: "Kerajinan", province: "Gorontalo",
    image: "/culture/Kain_Karawo_embroidery_on_stand_202607021813.jpeg", thumbnails: [],
    description: "Sulaman tembus khas Gorontalo yang dibuat dengan teknik mencabut benang kain.",
    history: "Karawo telah dikembangkan oleh masyarakat Gorontalo selama berabad-abad dan menjadi ikon kerajinan daerah.",
    philosophy: "Proses mencabut benang satu per satu melambangkan ketelatenan, kesabaran, dan keindahan hasil kerja keras."
  },

  // ============ SULAWESI TENGAH ============
  {
    id: "st1", slug: "kain-tenun-donggala", name: "Tenun Donggala", category: "Kerajinan", province: "Sulawesi Tengah",
    image: "/culture/Tenun_Donggala_fabric_on_stand_202607021813.jpeg", thumbnails: [],
    description: "Kain tenun sutra dari Donggala dengan corak yang elegan seperti bunga dan hewan laut.",
    history: "Puncak kejayaannya pada abad ke-18 dan ke-19, menjadi primadona perdagangan di Selat Makassar.",
    philosophy: "Kelembutan, martabat, dan keanggunan perempuan Kaili."
  },
  {
    id: "ex_st2", slug: "tari-dero", name: "Tari Dero", category: "Seni Pertunjukan", province: "Sulawesi Tengah",
    image: "https://images.unsplash.com/photo-1544413155-27a1cbb0dc30?q=80&w=800&auto=format&fit=crop", thumbnails: [],
    description: "Tarian pergaulan suku Pamona dari Poso yang ditarikan berkeliling.",
    history: "Tari Dero telah menjadi tarian pergaulan muda-mudi suku Pamona di sekitar Danau Poso sejak zaman leluhur.",
    philosophy: "Gerakan melingkar bersama melambangkan persatuan dan kebersamaan tanpa memandang status sosial."
  },
  {
    id: "ex_st3", slug: "kaledo", name: "Kaledo", category: "Kuliner", province: "Sulawesi Tengah",
    image: "/culture/Kaledo_soup_in_ceramic_bowl_202607021814.jpeg", thumbnails: [],
    description: "Sup tulang kerbau/sapi khas Sulawesi Tengah dengan kuah kuning yang gurih.",
    history: "Kaledo merupakan hidangan khas Donggala yang telah dikenal sejak lama dan menjadi ikon kuliner Sulawesi Tengah.",
    philosophy: "Kuah kuning yang kaya rempah mencerminkan kekayaan rempah-rempah yang menjadi kebanggaan Sulawesi Tengah."
  },

  // ============ SULAWESI BARAT ============
  {
    id: "ex_sub2", slug: "tari-pattudu", name: "Tari Pattudu", category: "Seni Pertunjukan", province: "Sulawesi Barat",
    image: "/culture/Dancer_performing_traditional_Ta…_202607021813.jpeg", thumbnails: [],
    description: "Tarian penyambutan tamu khas Mandar yang lemah gemulai.",
    history: "Tari Pattudu telah menjadi tarian penyambutan resmi masyarakat Mandar dalam setiap acara adat dan penerimaan tamu kehormatan.",
    philosophy: "Gerakan yang lemah gemulai mencerminkan keramahan dan keanggunan budaya Mandar."
  },
  {
    id: "ex_sub3", slug: "jepa", name: "Jepa", category: "Kuliner", province: "Sulawesi Barat",
    image: "/culture/Jepa_bread_on_wooden_platter_202607021814.jpeg", thumbnails: [],
    description: "Makanan pokok Mandar dari sagu yang dicetak tipis dan dipanggang.",
    history: "Jepa telah menjadi makanan pokok masyarakat pesisir Mandar selama ratusan tahun sebagai pengganti nasi.",
    philosophy: "Kesederhanaan bentuk dan bahan mencerminkan filosofi hidup masyarakat Mandar yang bersahaja namun tangguh."
  },

  // ============ SULAWESI SELATAN ============
  {
    id: "ex_sulsel1", slug: "coto-makassar", name: "Coto Makassar", category: "Kuliner", province: "Sulawesi Selatan",
    image: "/culture/Beef_soup_in_clay_bowl_202607021814.jpeg", thumbnails: [],
    description: "Sup jeroan dan daging sapi khas Makassar dengan bumbu rempah kacang.",
    history: "Coto Makassar telah menjadi hidangan khas rakyat Makassar sejak zaman Kerajaan Gowa-Tallo.",
    philosophy: "Bumbu kacang yang kaya rempah mencerminkan posisi Makassar sebagai pusat perdagangan rempah di Nusantara."
  },
  {
    id: "ex_sulsel2", slug: "tari-pakarena", name: "Tari Pakarena", category: "Seni Pertunjukan", province: "Sulawesi Selatan",
    image: "/culture/Dancers_performing_traditional_d…_202607021813.jpeg", thumbnails: [
      "/culture/Dancer_performing_Tari_Kipas_Pak…_202607021819.jpeg"
    ],
    description: "Tarian khas Gowa dengan gerakan lembut dan penuh makna.",
    history: "Tari Pakarena konon diajarkan oleh bidadari dari kayangan kepada masyarakat Gowa sebelum pergi ke langit.",
    philosophy: "Gerakan yang lembut dan tidak pernah membuka mata lebar-lebar melambangkan kesopanan dan kehalusan budi perempuan Makassar."
  },

  // ============ SULAWESI TENGGARA ============
  {
    id: "ex_sutra2", slug: "kasuami", name: "Kasuami", category: "Kuliner", province: "Sulawesi Tenggara",
    image: "/culture/Steamed_cassava_cake_on_platter_202607021819.jpeg", thumbnails: [],
    description: "Makanan pokok dari singkong yang diparut dan dicetak kerucut.",
    history: "Kasuami merupakan makanan pokok masyarakat Buton dan Muna yang telah dikonsumsi sejak ratusan tahun lalu.",
    philosophy: "Bentuk kerucut melambangkan gunung yang dihormati sebagai sumber kehidupan masyarakat Sulawesi Tenggara."
  },
  {
    id: "ex_sutra3", slug: "tenun-tolaki", name: "Tenun Tolaki", category: "Kerajinan", province: "Sulawesi Tenggara",
    image: "/culture/Tenun_Tolaki_fabric_on_stand_202607021819.jpeg", thumbnails: [],
    description: "Kain tenun tradisional suku Tolaki dengan motif geometris.",
    history: "Tenun Tolaki telah diwariskan secara turun-temurun oleh perempuan suku Tolaki sebagai keterampilan adat.",
    philosophy: "Motif geometris yang teratur melambangkan keteraturan dan keseimbangan dalam kehidupan masyarakat Tolaki."
  },

  // ============ MALUKU ============
  {
    id: "ma1", slug: "tari-cakalele", name: "Tari Cakalele", category: "Seni Pertunjukan", province: "Maluku",
    image: "/culture/Dancer_performing_Tari_Cakalele_…_202607021819.jpeg", thumbnails: [],
    description: "Tarian perang tradisional Maluku yang menggunakan parang dan salawaku (perisai).",
    history: "Digunakan oleh leluhur sebelum dan sesudah berperang, atau saat menyambut pahlawan yang pulang.",
    philosophy: "Keberanian, patriotisme, dan perlindungan tanah air dari penjajah."
  },
  {
    id: "ma2", slug: "papeda-maluku", name: "Papeda", category: "Kuliner", province: "Maluku",
    image: "/culture/Papeda_in_wooden_bowl_202607021821.jpeg", thumbnails: [],
    description: "Makanan berupa bubur sagu khas Maluku (dan Papua) yang teksturnya lengket.",
    history: "Sagu telah menjadi makanan pokok masyarakat Indonesia bagian timur selama ribuan tahun.",
    philosophy: "Makan papeda bersama-sama (papeda kumpul) mengajarkan ikatan persaudaraan dan rasa syukur atas alam yang memberi sumber kehidupan tanpa merusak."
  },
  {
    id: "ex_ma3", slug: "tifa-maluku", name: "Tifa", category: "Alat Musik", province: "Maluku",
    image: "/culture/Tifa_musical_instrument_displayed_202607021821.jpeg", thumbnails: [],
    description: "Alat musik pukul dari kayu dan kulit rusa khas Maluku dan Papua.",
    history: "Tifa telah digunakan oleh masyarakat Maluku dan Papua sejak zaman prasejarah dalam berbagai upacara adat.",
    philosophy: "Suara tifa yang menggema melambangkan panggilan persatuan dan semangat kebersamaan masyarakat timur Indonesia."
  },

  // ============ MALUKU UTARA ============
  {
    id: "ex_mu2", slug: "gohu-ikan", name: "Gohu Ikan", category: "Kuliner", province: "Maluku Utara",
    image: "/culture/Gohu_Ikan_dish_presentation_202607021821.jpeg", thumbnails: [],
    description: "Sashimi ala Ternate dari ikan mentah segar dengan bumbu kenari, jeruk, dan cabai.",
    history: "Gohu Ikan merupakan hidangan tradisional Ternate yang memanfaatkan ikan segar dari perairan Maluku Utara.",
    philosophy: "Penyajian ikan mentah mencerminkan hubungan erat masyarakat Ternate dengan laut sebagai sumber kehidupan utama."
  },
  {
    id: "ex_mu3", slug: "legu-salai", name: "Legu Salai", category: "Seni Pertunjukan", province: "Maluku Utara",
    image: "https://images.unsplash.com/photo-1583091942171-897b7b13735a?q=80&w=800&auto=format&fit=crop", thumbnails: [],
    description: "Festival budaya terbesar Ternate untuk memperingati pengangkatan Sultan.",
    history: "Legu Salai telah diselenggarakan sejak masa Kesultanan Ternate sebagai perayaan pengangkatan Sultan baru.",
    philosophy: "Pesta rakyat yang menggabungkan semua lapisan masyarakat melambangkan kesetaraan dan persatuan di bawah kepemimpinan Sultan."
  },

  // ============ PAPUA ============
  {
    id: "ex_pap1", slug: "tifa-papua", name: "Tifa Papua", category: "Alat Musik", province: "Papua",
    image: "/culture/Tifa_Papua_musical_instrument_di…_202607021823.jpeg", thumbnails: [],
    description: "Gendang kayu khas Papua yang dihiasi ukiran dan kulit biawak.",
    history: "Tifa Papua telah menjadi instrumen utama dalam setiap upacara adat dan perayaan suku-suku di tanah Papua.",
    philosophy: "Ukiran pada badan tifa menceritakan kisah leluhur dan identitas suku, menjadikannya bukan sekadar alat musik tetapi juga simbol jati diri."
  },
  {
    id: "ex_pap2", slug: "papeda-papua", name: "Papeda", category: "Kuliner", province: "Papua",
    image: "/culture/Papeda_with_fish_soup_202607021823.jpeg", thumbnails: [],
    description: "Bubur sagu khas Papua yang lengket, disantap dengan kuah ikan kuning.",
    history: "Papeda telah menjadi makanan pokok masyarakat Papua sejak ribuan tahun yang lalu, dibuat dari pati pohon sagu.",
    philosophy: "Tekstur lengket papeda yang sulit diputus melambangkan ikatan persaudaraan yang kuat antar masyarakat Papua."
  },

  // ============ PAPUA BARAT ============
  {
    id: "ex_pb2", slug: "kain-timor-papua", name: "Kain Timor Papua", category: "Kerajinan", province: "Papua Barat",
    image: "/culture/Kain_Timur_fabric_on_stand_202607021823.jpeg", thumbnails: [],
    description: "Kain kulit kayu tradisional suku Moi di Papua Barat.",
    history: "Kain kulit kayu telah dibuat oleh suku Moi selama berabad-abad menggunakan teknik pemukulan kulit kayu hingga tipis dan lentur.",
    philosophy: "Penggunaan bahan alam tanpa pengolahan kimia mencerminkan kedekatan suku Moi dengan alam dan kearifan lokal."
  },
  {
    id: "ex_pb3", slug: "ikan-bakar-manokwari", name: "Ikan Bakar Manokwari", category: "Kuliner", province: "Papua Barat",
    image: "/culture/Grilled_fish_with_chili_paste_202607021824.jpeg", thumbnails: [],
    description: "Ikan laut segar bakar bumbu rempah khas pesisir Manokwari.",
    history: "Ikan Bakar Manokwari telah menjadi kuliner andalan masyarakat pesisir Papua Barat yang kaya akan hasil laut.",
    philosophy: "Kesegaran bahan dan kesederhanaan cara memasak mencerminkan filosofi hidup masyarakat pesisir yang bersyukur atas karunia laut."
  }
];
