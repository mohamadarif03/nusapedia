export interface Culture {
  id: string;
  slug: string;
  name: string;
  category: string;
  province: string;
  image: string;
  thumbnails: string[];
  description: string;
  history: string;
  philosophy: string;
  makingProcess?: string;
}

import { moreCultures } from "./moreCultures";
import { moreCultures2 } from "./moreCultures2";

const rawCultures: Culture[] = [
  {
    id: "1",
    slug: "batik-parang",
    name: "Batik Parang",
    category: "Batik",
    province: "DI Yogyakarta",
    image: "/culture/batikparang.jpeg",
    thumbnails: [
      "/culture/batikparang.jpeg",
      "https://images.unsplash.com/photo-1605333642358-0ce95efed1fb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544413155-27a1cbb0dc30?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Batik Parang adalah salah satu motif batik tertua di Indonesia. Kata Parang berasal dari Pereng atau lereng.",
    history: "Batik Parang merupakan salah satu motif batik tertua di Nusantara yang diciptakan sejak masa kejayaan Kerajaan Mataram Islam pada abad ke-16 oleh Panembahan Senopati. Kisah legendaris menyebutkan bahwa Panembahan Senopati terinspirasi saat melakukan meditasi di sepanjang Pantai Selatan Jawa (Parangtritis), mengamati deburan ombak laut selatan yang menerpa tebing karang secara konsisten dan tak kenal lelah. Keindahan visual gerakan ombak yang dinamis namun kokoh tersebut kemudian diabadikan dalam bentuk pola pilin diagonal menyerupai huruf 'S' yang jalin-menjalin. Pola ini melambangkan kesinambungan kekuasaan, kebesaran raja, kewibawaan, serta gerak cepat yang tangkas. Di masa lampau, motif Parang masuk dalam kategori 'Batik Larangan' (Larangan Dalem), yang berarti hukumnya sangat ketat dan hanya boleh dipakai oleh raja, permaisuri, para bangsawan, serta prajurit Keraton karena membawa energi kepemimpinan dan kewibawaan spiritual yang sakral.",
    philosophy: "Filosofi utama dari Batik Parang terletak pada bentuk dasar huruf 'S' yang saling bertautan erat tanpa putus. Susunan diagonal ini melambangkan jalinan kesinambungan kehidupan manusia yang dinamis dan pantang menyerah. Bentuk ombak samudra yang terus menerus menghantam karang menyimbolkan bahwa seorang pemimpin dan manusia pada umumnya harus memiliki keteguhan hati, konsistensi, serta semangat juang yang tidak pernah padam dalam menghadapi badai kehidupan. Garis miring diagonal dari atas ke bawah melambangkan penghormatan terhadap garis keturunan, nilai-nilai luhur kebenaran, serta pengabdian yang tulus. Hubungan jalin-menjalin antarmotif melambangkan ikatan kekeluargaan yang kokoh serta gotong royong yang harmonis antara pemimpin dan rakyatnya.",
    makingProcess: `Proses pembuatan Batik Parang tulis klasik membutuhkan ketelitian tingkat tinggi dan waktu pengerjaan manual selama berbulan-bulan melalui tahapan berikut:

1. Nyorek (Menggambar Pola)
Menggambar pola garis miring/lereng dasar secara simetris di atas kain mori halus menggunakan pensil.

2. Nglowongi (Membatik Pola Utama)
Menyusuri garis pensil dengan menorehkan lilin malam cair panas menggunakan canting tulis khusus agar pola terkunci.

3. Nembok (Menutup Kain)
Menutup bagian-bagian kain yang ingin tetap dipertahankan warna dasarnya (putih/terang) dengan malam tebal agar tidak kemasukan zat warna saat pencelupan.

4. Medel (Pencelupan Warna)
Mencelupkan kain ke dalam bak pewarna (tradisionalnya soga alam atau nila indigo) secara berulang hingga kepekatan warna meresap merata.

5. Mlorot (Melarutkan Lilin)
Merebus kain di dalam air mendidih dicampur abu soda (soda ash) agar seluruh lilin malam larut bersih, menampakkan gradasi warna cokelat-putih motif Parang.`
  },
  {
    id: "2",
    slug: "angklung",
    name: "Angklung Sunda",
    category: "Alat Musik",
    province: "Jawa Barat",
    image: "/culture/angklung.jpeg",
    thumbnails: [
      "/culture/angklung.jpeg",
      "https://images.unsplash.com/photo-1516280440502-861d856d33a4?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Angklung adalah alat musik multitonal (bernada ganda) yang secara tradisional berkembang dalam masyarakat Sunda.",
    history: "Angklung adalah alat musik multitonal tradisional Sunda yang sejarahnya dapat ditelusuri kembali sejak zaman kuno Kerajaan Sunda pada abad ke-12. Pada mulanya, pertunjukan angklung bukan sekadar hiburan rakyat biasa, melainkan sebuah ritual sakral pertanian yang erat kaitannya dengan penghormatan terhadap Nyai Sri Pohaci (Dewi Padi). Masyarakat Sunda kuno memainkan angklung dengan iringan tarian upacara agar Dewi Padi tergerak hatinya untuk memberkahi tanah pertanian mereka dengan kesuburan dan panen raya yang melimpah. Di masa perang, seperti saat menghadapi ekspansi kerajaan lain atau penjajahan kolonial, angklung bumbung berukuran besar kerap dimainkan untuk membakar semangat para prajurit Sunda di medan laga karena bunyinya yang bergemuruh keras. Setelah berabad-abad dilestarikan secara turun-temurun, angklung mengalami revolusi modern berkat Daeng Soetigna pada tahun 1938 yang menciptakan angklung bernada diatonis sehingga bisa memainkan lagu-lagu internasional, dan pada tahun 2010 angklung resmi diakui UNESCO sebagai Warisan Budaya Takbenda Dunia.",
    philosophy: "Filosofi utama dari angklung terletak pada struktur instrumen dan metode memainkannya yang mengajarkan nilai-nilai kehidupan yang sangat mendalam. Angklung tidak dapat menghasilkan melodi yang indah jika hanya dimainkan oleh satu orang dengan satu nada tunggal. Bunyi angklung yang harmonis dan megah hanya dapat tercipta ketika dimainkan secara bersama-sama dalam sebuah kelompok, di mana masing-masing orang memegang nada yang berbeda namun saling melengkapi dalam harmoni yang presisi. Hal ini melambangkan filosofi gotong-royong, toleransi, kedisiplinan kolektif, dan keselarasan sosial di dalam masyarakat. Setiap individu memiliki peranan penting dan harus saling menghargai agar dinamika kehidupan dapat berjalan dengan indah, selaras, dan damai.",
    makingProcess: `Proses pembuatan satu set angklung kualitas tinggi membutuhkan keahlian khusus dan ketelitian suara (tuning) melalui tahapan berikut:

1. Pemilihan & Pemotongan Bambu
Memotong bambu hitam (wulung) atau bambu temen pilihan yang ditebang tepat pada musim kemarau agar awet dan terhindar dari jamur atau hama kumbang kayu.

2. Pengeringan Alami (Aging)
Mengeringkan potongan bambu secara vertikal dengan diangin-anginkan selama minimal 6 bulan hingga 1 tahun untuk memastikan kadar airnya benar-benar habis.

3. Pemotongan Tabung Suara
Memotong bambu kering menjadi tabung suara (resonator) dengan ukuran dasar tinggi nada yang telah direncanakan.

4. Perautan & Penyeteman Nada (Tuning)
Meraut bagian tabung resonansi bambu secara tipis selangkah demi selangkah menggunakan pisau raut khusus, sambil terus memukul tabung dan menyamakan nadanya dengan alat penala nada secara presisi.

5. Perakitan Angklung
Merangkai tabung resonator suara ke dalam tiang-tiang bambu penyangga dasar, serta mengikatnya dengan tali rotan agar dapat bergetar bebas saat digoyang.`
  },
  {
    id: "3",
    slug: "wayang-kulit",
    name: "Wayang Kulit",
    category: "Seni Pertunjukan",
    province: "Jawa Tengah",
    image: "/culture/wayangkulit.jpeg",
    thumbnails: [
      "/culture/wayangkulit.jpeg",
      "https://images.unsplash.com/photo-1583091942171-897b7b13735a?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Wayang Kulit adalah seni pertunjukan tradisional Indonesia yang berkembang terutama di Jawa dan Bali.",
    history: "Wayang Kulit adalah seni pertunjukan tradisional Indonesia yang telah mengakar kuat di pulau Jawa selama lebih dari seribu tahun, dengan catatan prasasti tertua yang menyebut keberadaannya berasal dari abad ke-10 Masehi di masa Kerajaan Medang. Seni pertunjukan bayang-bayang ini awalnya berfungsi sebagai bagian dari ritual keagamaan animisme untuk menghormati arwah para leluhur (Hyang). Seiring berjalannya waktu dan masuknya pengaruh Hindu-Buddha, cerita wayang diadaptasi dari epos besar seperti Ramayana dan Mahabharata dengan sentuhan lokal Jawa. Pada masa penyebaran Islam di Nusantara, para Wali Songo—khususnya Sunan Kalijaga—memodifikasi bentuk wayang menjadi lebih pipih, dekoratif, dan simbolis guna mematuhi ajaran seni rupa Islam, sekaligus memanfaatkannya sebagai media dakwah yang sangat efektif dan digemari masyarakat luas. Wayang Kulit dinobatkan oleh UNESCO sebagai Karya Agung Warisan Lisan dan Nonbendawi Kemanusiaan pada tahun 2003.",
    philosophy: "Wayang Kulit sarat akan perlambangan teologis dan filsafat kehidupan manusia. Pertunjukan wayang merupakan miniatur kehidupan semesta (Jagad Cilik dan Jagad Gede). Layar putih (kelir) melambangkan dunia fisik tempat manusia hidup, lampu minyak (blencong) melambangkan matahari sebagai sumber cahaya kehidupan dari Tuhan Yang Maha Esa, sedangkan bayangan hitam yang menari-nari menggambarkan perjalanan nasib dan pergulatan batin manusia di dunia. Kotak wayang melambangkan awal dan akhir kehidupan (sangkan paraning dumadi), sementara gunungan mewakili kosmos dan siklus kehidupan alam semesta. Karakter wayang yang ditempatkan di sisi kanan dalang melambangkan kebajikan dan kebijaksanaan, sedangkan sisi kiri melambangkan angkara murka dan hawa nafsu. Pertarungan kedua kubu ini mengajarkan bahwa harmoni kehidupan hanya tercapai ketika manusia mampu mengendalikan hawa nafsunya.",
    makingProcess: `Proses pembuatan tokoh wayang kulit klasik (tatah sungging) sangat rumit dan membutuhkan ketekunan seni tingkat tinggi melalui tahapan berikut:

1. Pengolahan Kulit Bahan Baku
Merendam kulit kerbau atau sapi jantan di air bersih, membentangkannya pada bingkai kayu, mengerok bulunya dengan pisau tumpul, dan menjemurnya hingga menjadi lembaran perkamen kering yang tipis merata.

2. Nyorek (Menggambar Karakter)
Menjiplak atau menggambar sketsa karakter tokoh wayang (seperti Werkudara, Arjuna, dll) di atas kulit perkamen menggunakan kuas tinta tipis.

3. Menatah (Memahat Pola)
Memahat lubang-lubang kecil berkerawang (ornamen) pakaian dan rambut tokoh secara detail menggunakan puluhan ukuran tatah besi khusus dan palu pemukul kayu di atas talenan.

4. Menyungging (Melukis & Mewarnai)
Mewarnai seluruh permukaan wayang dengan teknik gradasi (sunggingan) warna cat akrilik atau pigmen tradisional, dilapisi perekat khusus agar warnanya cerah dan tidak pudar.

5. Memasang Gapit (Tangkai Penyangga)
Memasang tiang penyangga utama (cempurit) serta gapit tangan yang terbuat dari tanduk kerbau jantan yang telah dipanaskan dan diraut halus.`
  },
  {
    id: "4",
    slug: "noken-papua",
    name: "Noken Papua",
    category: "Kerajinan",
    province: "Papua",
    image: "/culture/noken.jpeg",
    thumbnails: [
      "/culture/noken.jpeg",
      "https://images.unsplash.com/photo-1605333642358-0ce95efed1fb?q=80&w=800&auto=format&fit=crop",
    ],
    description: "Noken adalah tas tradisional masyarakat Papua yang dibawa dengan menggunakan kepala.",
    history: "Noken merupakan tas tradisional khas masyarakat Papua yang telah ada sejak ribuan tahun lalu dan diwariskan secara turun-temurun dari generasi ke generasi, terutama di kalangan suku-suku pegunungan seperti suku Dani, Asmat, dan Biak. Asal-usulnya berkaitan erat dengan kehidupan agraris masyarakat Papua yang membutuhkan wadah untuk membawa hasil kebun, kayu bakar, hingga menggendong bayi. Setiap suku di Papua memiliki teknik pembuatan dan motif noken yang berbeda-beda, mencerminkan kekayaan keragaman budaya di Tanah Papua. Pada masa lalu, noken juga digunakan sebagai alat tukar dalam sistem barter antarsuku dan menjadi bagian tak terpisahkan dari upacara adat seperti pernikahan dan penyambutan tamu kehormatan. Pada tanggal 4 Desember 2012, UNESCO secara resmi mengakui noken sebagai Warisan Budaya Takbenda Kemanusiaan yang Memerlukan Perlindungan Mendesak (Intangible Cultural Heritage in Need of Urgent Safeguarding). Pengakuan ini menegaskan pentingnya pelestarian noken di tengah ancaman modernisasi dan semakin berkurangnya jumlah perajin noken di Papua. Saat ini, berbagai upaya dilakukan oleh pemerintah dan komunitas lokal untuk melestarikan tradisi pembuatan noken melalui pelatihan dan festival budaya.",
    philosophy: "Noken melambangkan kehidupan, kemandirian, kedamaian, kesuburan, dan kasih sayang bagi seluruh masyarakat Papua. Cara membawa noken di kepala oleh kaum perempuan menyimbolkan bahwa perempuan Papua adalah pilar utama yang memikul beban kehidupan keluarga dengan penuh ketabahan dan ketulusan. Motif dan warna pada noken juga memiliki makna mendalam; motif tertentu menunjukkan status sosial, identitas suku, serta harapan dan doa bagi si pemakai. Dalam konteks yang lebih luas, noken menjadi simbol persatuan dan identitas budaya Papua yang melampaui batas-batas suku, menjadi kebanggaan bersama seluruh masyarakat di Tanah Papua. Pemberian noken sebagai hadiah juga melambangkan penghormatan tertinggi dan ikatan persaudaraan yang erat.",
    makingProcess: `Proses pembuatan noken merupakan keahlian tradisional yang memerlukan kesabaran dan ketelitian tinggi:\n\n1. Pengambilan Serat Alam\nSerat diambil dari kulit kayu pohon Manduam, pohon Nawa, atau Anggrek hutan. Kulit kayu dikupas dengan hati-hati kemudian direndam dalam air selama beberapa hari untuk memisahkan serat dari kulit.\n\n2. Pengeringan dan Pengolahan Serat\nSerat yang telah dipisahkan dijemur di bawah sinar matahari hingga kering sempurna. Setelah kering, serat dipipihkan dan dibersihkan dari kotoran serta sisa kulit yang masih menempel.\n\n3. Pemintalan Benang\nSerat kering dipintal secara manual dengan cara digulungkan di paha menggunakan telapak tangan. Proses ini menghasilkan benang-benang kuat yang siap untuk dirajut menjadi noken.\n\n4. Pewarnaan Alami\nBenang diwarnai menggunakan pewarna alami dari tumbuhan seperti akar kunyit, daun pandan, atau tanah merah. Setiap warna memiliki makna simbolis tersendiri sesuai tradisi masing-masing suku.\n\n5. Perajutan dan Penyelesaian\nBenang dirajut secara manual menggunakan teknik simpul khas Papua tanpa alat bantu mesin. Proses merajut satu noken bisa memakan waktu berminggu-minggu hingga berbulan-bulan tergantung ukuran dan kerumitan motifnya.`
  },
  {
    id: "6",
    slug: "keris",
    name: "Keris Nusantara",
    category: "Kerajinan",
    province: "Jawa Tengah",
    image: "/culture/kerisnusantara.jpeg",
    thumbnails: [
      "/culture/kerisnusantara.jpeg",
    ],
    description: "Keris adalah senjata tikam golongan belati (berujung runcing dan tajam pada kedua sisinya) yang asalnya dari Jawa.",
    history: "Keris merupakan senjata tikam tradisional Nusantara yang memiliki sejarah panjang dan kaya, dengan bukti keberadaannya telah ditemukan pada relief Candi Borobudur dan Candi Prambanan yang dibangun sekitar abad ke-9 Masehi. Asal-usul keris diyakini berasal dari Pulau Jawa, kemudian menyebar luas ke seluruh Nusantara hingga ke Semenanjung Melayu, Filipina Selatan, dan Thailand Selatan seiring dengan ekspansi kerajaan-kerajaan Jawa seperti Majapahit. Pada masa kejayaan kerajaan-kerajaan Hindu-Buddha dan Islam di Nusantara, keris menjadi simbol kebesaran dan kekuasaan seorang raja, bangsawan, dan prajurit. Seorang Empu, yaitu pandai besi pembuat keris, memiliki kedudukan terhormat dalam struktur sosial kerajaan karena dianggap memiliki kemampuan spiritual selain keahlian metalurgi. Setiap keris dianggap memiliki tuah atau kekuatan gaib yang berkaitan dengan proses pembuatannya yang penuh ritual. Pada tanggal 25 November 2005, UNESCO mengakui keris Indonesia sebagai Karya Agung Warisan Budaya Lisan dan Takbenda Kemanusiaan. Pengakuan ini semakin memperkuat posisi keris sebagai ikon budaya Nusantara yang diakui dunia. Hingga kini, tradisi pembuatan keris masih lestari di beberapa sentra seperti Surakarta, Yogyakarta, Madura, dan Bali.",
    philosophy: "Bentuk bilah keris yang berkelok-kelok (luk) menggambarkan seekor ular naga kosmik yang melambangkan kekuatan alam semesta dan aliran energi kehidupan. Penyatuan antara bilah keris (lingga) dengan wrangka atau sarungnya (yoni) merupakan simbol keharmonisan antara unsur maskulin dan feminin, serta keselarasan antara mikrokosmos (jagad cilik/manusia) dan makrokosmos (jagad gedhe/alam semesta). Jumlah lekukan pada bilah keris selalu ganjil dan memiliki makna filosofis tersendiri; misalnya luk tiga melambangkan api, angin, dan air, sedangkan luk tujuh melambangkan tujuh lapisan langit. Pamor atau corak logam pada bilah keris juga sarat makna, seperti pamor Beras Wutah yang melambangkan rezeki berlimpah, atau pamor Udan Mas yang bermakna hujan emas atau kemakmuran. Keris mengajarkan bahwa kekuatan sejati bukan terletak pada ketajaman senjata, melainkan pada kebijaksanaan dan keluhuran budi pekerti pemiliknya.",
    makingProcess: `Pembuatan keris merupakan seni metalurgi sakral yang dilakukan oleh seorang Empu melalui ritual dan tahapan yang ketat:\n\n1. Persiapan Bahan dan Ritual\nEmpu memilih bahan baku berupa besi, baja, dan bahan pamor seperti nikel meteorit (besi langit). Sebelum memulai penempaan, Empu melakukan meditasi dan ritual spiritual untuk memohon petunjuk serta memasukkan tuah ke dalam keris yang akan dibuat.\n\n2. Penempaan dan Pelipatan (Pijar)\nBahan-bahan logam dipanaskan dalam tungku arang hingga membara, kemudian ditempa dan dilipat berkali-kali (bisa hingga ratusan lapisan). Proses pelipatan inilah yang menghasilkan corak pamor yang khas dan unik pada setiap bilah keris.\n\n3. Pembentukan Bilah dan Luk\nBilah keris dibentuk sesuai dhapur (bentuk) yang diinginkan, baik lurus (leres) maupun berkelok (luk). Setiap lekukan dan detail bilah dikerjakan dengan presisi tinggi menggunakan palu dan landasan tempa tradisional.\n\n4. Penyepuhan dan Pencelupan Warangan\nBilah keris yang telah selesai ditempa dicelupkan ke dalam larutan warangan (arsenik dan jeruk nipis) untuk memunculkan corak pamor. Proses ini juga berfungsi sebagai pelindung bilah dari karat dan memberikan keindahan visual yang memukau.\n\n5. Pembuatan Hulu dan Wrangka\nHulu (gagang) keris diukir dari kayu pilihan atau gading dengan bentuk yang beragam seperti bentuk wayang. Wrangka (sarung) keris dibuat dari kayu berkualitas tinggi seperti kayu Cendana atau Trembalo, kemudian dihiasi dengan logam mulia dan permata sesuai status pemiliknya.`
  },
  {
    id: "7",
    slug: "tari-saman",
    name: "Tari Saman",
    category: "Seni Pertunjukan",
    province: "Aceh",
    image: "/culture/saman.jpeg",
    thumbnails: ["/culture/saman.jpeg"],
    description: "Tarian dari suku Gayo, Aceh, dengan gerakan tangan ritmis, harmonis dan sangat cepat.",
    history: "Tari Saman merupakan tarian tradisional yang berasal dari suku Gayo di dataran tinggi Gayo, Provinsi Aceh, dan telah ada sejak abad ke-14 Masehi. Tarian ini dikembangkan oleh seorang ulama besar bernama Syekh Saman dari pesantren di Aceh Tenggara, yang mengadaptasi permainan rakyat bernama Pok Ane menjadi media dakwah Islam yang menarik dan dinamis. Awalnya, Tari Saman hanya ditampilkan pada perayaan Maulid Nabi Muhammad SAW, namun seiring waktu berkembang menjadi pertunjukan dalam berbagai acara adat dan festival budaya. Tarian ini melibatkan jumlah penari ganjil, biasanya antara 15 hingga 21 orang, yang duduk berbaris dan bergerak secara serentak dengan kecepatan tinggi. Keunikan Tari Saman terletak pada ketiadaan iringan alat musik; seluruh irama dihasilkan dari tepukan tangan, dada, paha, serta lantunan syair-syair berbahasa Gayo dan Arab. Pada tanggal 24 November 2011, UNESCO secara resmi menetapkan Tari Saman sebagai Warisan Budaya Takbenda yang Memerlukan Perlindungan Mendesak. Pengakuan internasional ini menjadikan Tari Saman sebagai kebanggaan masyarakat Aceh dan Indonesia di mata dunia. Kini, Tari Saman secara rutin ditampilkan dalam berbagai acara kenegaraan dan festival internasional sebagai duta budaya Indonesia.",
    philosophy: "Tari Saman mencerminkan nilai-nilai keagamaan (Islam), sopan santun, pendidikan, kekompakan, kepahlawanan, dan kebersamaan yang menjadi fondasi kehidupan masyarakat Gayo. Gerakan yang serempak dan harmonis dari seluruh penari melambangkan persatuan, kesetaraan, dan semangat gotong royong di mana setiap individu harus menyatu dengan kelompok demi mencapai keindahan bersama. Syair-syair yang dilantunkan mengandung nasihat-nasihat moral, ajaran agama, serta pesan-pesan tentang hubungan manusia dengan Tuhan dan sesama. Kostum penari yang didominasi warna hitam, merah, hijau, dan putih masing-masing melambangkan kepemimpinan, keberanian, kesuburan alam, dan kesucian hati. Tari Saman mengajarkan bahwa keindahan dan kekuatan sejati lahir dari kebersamaan dan keselarasan, bukan dari kehebatan individu semata."
  },
  {
    id: "8",
    slug: "tari-bali",
    name: "Tiga Genre Tari Bali",
    category: "Seni Pertunjukan",
    province: "Bali",
    image: "/culture/taribali.jpeg",
    thumbnails: ["/culture/taribali.jpeg"],
    description: "Tari Wali (sakral), Tari Bebali (semi-sakral), dan Tari Bebalih-balihan (hiburan).",
    history: "Tiga Genre Tari Bali merupakan sistem klasifikasi seni tari Bali yang telah berkembang selama berabad-abad dan tidak dapat dipisahkan dari kehidupan spiritual masyarakat Hindu Bali. Klasifikasi ini membagi tari Bali ke dalam tiga kategori utama: Tari Wali (tari sakral yang dipentaskan di jeroan pura sebagai bagian upacara keagamaan), Tari Bebali (tari semi-sakral yang dipentaskan di jaba tengah pura sebagai pengiring upacara), dan Tari Balih-balihan (tari hiburan yang dipentaskan di jaba sisi luar pura atau tempat umum). Akar sejarah tari Bali dapat ditelusuri hingga masa kerajaan-kerajaan kuno Bali seperti Kerajaan Gelgel dan Klungkung pada abad ke-15 hingga ke-19, di mana seni tari menjadi bagian integral dari kehidupan istana dan ritual keagamaan. Pengaruh budaya Jawa, khususnya dari era Majapahit, turut memperkaya perbendaharaan gerak dan cerita dalam tari Bali, terutama yang bersumber dari epik Ramayana dan Mahabharata. Beberapa tari Wali yang terkenal antara lain Tari Rejang, Tari Baris Gede, dan Tari Sanghyang, sementara contoh Tari Bebali meliputi Tari Gambuh dan Tari Topeng Pajegan. Pada tanggal 2 Desember 2015, UNESCO menetapkan Tiga Genre Tari Tradisional Bali sebagai Warisan Budaya Takbenda Kemanusiaan. Pengakuan ini menegaskan keunikan tari Bali sebagai ekspresi seni yang hidup dan terus berkembang dalam konteks spiritual dan sosial masyarakat Bali.",
    philosophy: "Tiga Genre Tari Bali secara mendalam mencerminkan filosofi Tri Hita Karana, yaitu tiga penyebab kebahagiaan yang meliputi keharmonisan hubungan antara manusia dengan Tuhan (Parahyangan), manusia dengan alam (Palemahan), dan manusia dengan sesama manusia (Pawongan). Tari Wali yang sakral merepresentasikan hubungan vertikal manusia dengan Sang Pencipta, di mana setiap gerakan merupakan bentuk persembahan dan komunikasi spiritual. Tari Bebali menjembatani dimensi sakral dan profan, mengajarkan bahwa kehidupan manusia senantiasa berada di antara dunia spiritual dan material. Tari Balih-balihan mewakili dimensi kemanusiaan dan sosial, mempererat hubungan antarwarga melalui keindahan seni dan hiburan. Ekspresi wajah penari (tangkep), khususnya gerakan mata yang disebut nyeledet, melambangkan kewaspadaan batin dan kemampuan membedakan antara dharma (kebenaran) dan adharma (kebatilan). Secara keseluruhan, tari Bali mengajarkan bahwa seni bukan sekadar hiburan, melainkan jalan spiritual menuju keseimbangan dan keharmonisan kosmis."
  },
  {
    id: "9",
    slug: "phinisi",
    name: "Seni Pembuatan Phinisi",
    category: "Kerajinan",
    province: "Sulawesi Selatan",
    image: "/culture/Phinisi.jpeg",
    thumbnails: ["/culture/Phinisi.jpeg"],
    description: "Tradisi pembuatan kapal layar khas suku Bugis dan Makassar dari Sulawesi Selatan.",
    history: "Phinisi adalah perahu layar tradisional dua tiang yang merupakan mahakarya bahari suku Bugis dan Makassar dari Sulawesi Selatan, dengan sejarah yang membentang hingga berabad-abad silam. Catatan paling awal tentang kapal jenis ini ditemukan dalam naskah kuno Lontarak I Babad La Lagaligo yang berasal dari sekitar abad ke-14, di mana disebutkan bahwa nenek moyang suku Bugis telah mengarungi lautan luas dengan perahu-perahu besar. Pusat pembuatan Phinisi yang paling terkenal terletak di Kecamatan Bontobahari, Kabupaten Bulukumba, khususnya di desa Tanah Beru, Bira, dan Ara yang telah menjadi sentra pembuatan kapal selama ratusan tahun. Phinisi Bugis pernah berlayar hingga ke Madagaskar di pantai timur Afrika, Kepulauan Pasifik, dan bahkan Australia Utara, membuktikan kehebatan teknologi maritim Nusantara. Pada masa kolonial Belanda, Phinisi menjadi tulang punggung perdagangan antarpulau di Nusantara dan memainkan peran penting dalam menghubungkan berbagai pelabuhan di Asia Tenggara. Keunikan Phinisi terletak pada teknik pembuatannya yang tidak menggunakan cetak biru tertulis, melainkan mengandalkan pengetahuan yang diwariskan secara lisan dari generasi ke generasi. Pada tahun 2017, UNESCO secara resmi mengakui Seni Pembuatan Kapal Phinisi sebagai Warisan Budaya Takbenda Kemanusiaan. Pengakuan ini menjadi kebanggaan masyarakat Bugis-Makassar dan mendorong upaya pelestarian tradisi pembuatan Phinisi yang semakin terancam oleh modernisasi industri perkapalan.",
    philosophy: "Phinisi mencerminkan filosofi hidup masyarakat Bugis-Makassar yang dikenal dengan semangat sompe' (merantau) dan pantang mundur dalam menghadapi tantangan kehidupan. Tujuh helai layar Phinisi melambangkan tujuh ayat pertama Surah Al-Fatihah, sementara dua tiang layarnya mewakili dua kalimat syahadat, menunjukkan perpaduan harmonis antara tradisi bahari dan nilai-nilai keislaman. Proses pembuatannya yang bersifat gotong royong (massola-sola) mencerminkan nilai siri' na pacce, yaitu harga diri dan rasa solidaritas yang menjadi inti budaya Bugis-Makassar. Keindahan bentuk Phinisi yang aerodinamis dan proporsional menggambarkan penghargaan masyarakat Bugis terhadap keselarasan dengan alam dan laut sebagai sumber kehidupan. Phinisi mengajarkan bahwa manusia harus berani mengarungi tantangan kehidupan dengan bekal ilmu, keberanian, dan kepercayaan kepada Tuhan Yang Maha Esa.",
    makingProcess: `Pembuatan Phinisi merupakan proses yang kompleks dan sarat ritual, dilakukan tanpa cetak biru tertulis berdasarkan pengetahuan turun-temurun:\n\n1. Pemilihan Kayu dan Ritual Awal\nKayu pilihan seperti kayu Ulin, Jati, atau Bitti ditebang pada waktu yang telah ditentukan berdasarkan perhitungan kalender Bugis. Sebelum penebangan, panrita lopi (ahli pembuat kapal) memimpin ritual adat berupa doa dan sesaji untuk memohon keselamatan dan keberkahan dalam proses pembuatan.\n\n2. Pembuatan Lunas (Kalabiseang)\nLunas kapal atau kalabiseang dibuat dan diletakkan sebagai fondasi utama kapal dalam upacara khusus bernama annattara. Lunas harus dibuat dari sebatang kayu utuh tanpa sambungan untuk menjamin kekuatan dan keseimbangan kapal di laut.\n\n3. Pemasangan Papan Lambung (Annattara)\nPapan-papan lambung kapal dipasang satu per satu dari bawah ke atas menggunakan teknik pasak kayu tanpa paku besi. Setiap papan disesuaikan (fitting) secara presisi menggunakan pengalaman dan insting panrita lopi yang terlatih selama puluhan tahun.\n\n4. Pemasangan Rangka dan Dek\nSetelah lambung terbentuk, rangka (gading-gading) dipasang dari dalam untuk memperkuat struktur kapal. Dek kapal, ruang kargo, dan kabin kemudian dibangun dengan memperhatikan keseimbangan dan fungsi kapal sebagai sarana pelayaran jarak jauh.\n\n5. Peluncuran (Ammossi)\nKapal yang telah selesai diluncurkan ke laut dalam upacara besar bernama ammossi yang dihadiri seluruh warga kampung. Ritual peluncuran mencakup doa keselamatan, pemotongan hewan kurban, dan perayaan bersama sebagai wujud rasa syukur atas selesainya pembuatan kapal.`
  },
  {
    id: "10",
    slug: "pantun",
    name: "Pantun",
    category: "Seni Pertunjukan",
    province: "Riau",
    image: "/culture/Hand-written_Pantun_Melayu_scroll_202607021658.jpeg",
    thumbnails: ["/culture/Hand-written_Pantun_Melayu_scroll_202607021658.jpeg"],
    description: "Tradisi lisan bersajak untuk upacara adat, pernikahan, dan sosial sebagai ekspresi budaya Melayu.",
    history: "Pantun merupakan salah satu bentuk sastra lisan tertua di Nusantara yang berakar kuat dalam peradaban Melayu dan telah dikenal sejak zaman kerajaan-kerajaan Melayu kuno seperti Sriwijaya dan Kesultanan Malaka. Kata 'pantun' berasal dari bahasa Minangkabau 'patuntun' yang berarti penuntun atau pembimbing, mencerminkan fungsi awalnya sebagai media penyampaian nasihat dan ajaran moral. Dalam tradisi Melayu, pantun digunakan dalam berbagai konteks kehidupan mulai dari upacara adat, pernikahan, penyambutan tamu, musyawarah, hingga percakapan sehari-hari sebagai ungkapan perasaan dan pikiran secara halus dan santun. Pantun tersebar luas ke berbagai wilayah Nusantara dan diadaptasi oleh berbagai suku bangsa sehingga lahir variasi lokal seperti pantun Minang, pantun Jawa (parikan), pantun Sunda (sisindiran), dan pantun Banjar. Para pelaut dan pedagang Melayu turut menyebarkan tradisi pantun ke seluruh Asia Tenggara hingga dikenal pula dalam tradisi sastra Malaysia, Singapura, Brunei, Thailand Selatan, dan Filipina Selatan. Pada abad ke-19, para peneliti Barat seperti R.J. Wilkinson dan R.O. Winstedt mulai mendokumentasikan dan mengkaji pantun Melayu secara ilmiah, membuka jalan bagi pengakuan internasional. Pada tanggal 17 Desember 2020, UNESCO secara resmi mengakui Pantun sebagai Warisan Budaya Takbenda Kemanusiaan melalui nominasi bersama Indonesia dan Malaysia. Pengakuan ini menegaskan bahwa pantun bukan sekadar bentuk sastra, melainkan merupakan ekspresi identitas budaya Melayu yang hidup dan terus berkembang hingga era modern.",
    philosophy: "Struktur pantun yang terdiri dari sampiran (dua baris pertama) dan isi (dua baris terakhir) melambangkan cara berpikir masyarakat Melayu yang tidak langsung, halus, dan penuh kiasan dalam menyampaikan pesan. Sampiran berfungsi sebagai jembatan pikiran yang menuntun pendengar melalui hubungan bunyi dan makna sebelum sampai pada pesan utama, mengajarkan bahwa komunikasi yang baik memerlukan pendahuluan dan kesantunan. Pola rima a-b-a-b dalam pantun mencerminkan keseimbangan dan harmoni yang menjadi nilai fundamental dalam kehidupan masyarakat Melayu. Pantun mengajarkan bahwa kebijaksanaan dan nasihat lebih efektif disampaikan secara tidak langsung melalui perumpamaan dan kiasan alam, sehingga tidak menyinggung perasaan pendengar. Melalui pantun, masyarakat Melayu mewariskan nilai-nilai luhur seperti budi bahasa, hormat kepada orang tua, cinta tanah air, dan kerukunan hidup bermasyarakat dari generasi ke generasi.",
    makingProcess: `Penciptaan dan pementasan pantun merupakan seni berbahasa yang memadukan kreativitas sastra dengan kearifan budaya Melayu:\n\n1. Penentuan Tema dan Pesan\nPencipta pantun terlebih dahulu menentukan tema dan pesan utama yang ingin disampaikan, seperti nasihat, percintaan, jenaka, atau petuah adat. Pesan ini akan menjadi isi pantun (dua baris terakhir) yang merupakan inti dari seluruh bait.\n\n2. Penyusunan Isi (Baris Ketiga dan Keempat)\nBaris isi disusun terlebih dahulu dengan memperhatikan jumlah suku kata (biasanya 8-12 suku kata per baris) dan bunyi akhir yang akan menentukan rima. Pesan disampaikan secara padat namun bermakna dengan menggunakan diksi yang tepat dan indah.\n\n3. Penciptaan Sampiran (Baris Pertama dan Kedua)\nSampiran diciptakan dengan mencari kata-kata yang memiliki rima akhir sesuai pola a-b-a-b dengan baris isi. Sampiran biasanya mengambil gambaran dari alam, tumbuhan, hewan, atau aktivitas sehari-hari yang memiliki hubungan makna (konotatif) dengan isi pantun.\n\n4. Penyempurnaan Irama dan Rima\nSeluruh bait pantun disempurnakan dengan memastikan keselarasan irama, jumlah suku kata yang seimbang, dan rima a-b-a-b yang tepat. Pantun yang baik harus enak didengar saat dilisankan dan memiliki aliran bunyi yang melodis.\n\n5. Penyampaian dan Pementasan\nPantun disampaikan secara lisan dalam berbagai konteks seperti berbalas pantun di acara pernikahan, musyawarah adat, atau pertunjukan seni. Pembawa pantun harus memiliki kemampuan improvisasi dan kecepatan berpikir, terutama dalam tradisi berbalas pantun di mana respons harus diberikan secara spontan.`
  },
  ...moreCultures,
  ...moreCultures2
];

// Only export cultures that have local photos (path starts with "/culture/")
export const cultures: Culture[] = rawCultures.filter((c) =>
  c.image.startsWith("/culture/")
);

export interface UnescoItem {
  id: string;
  year: number;
  name: string;
  image: string;
  description: string;
}

export const unescoTimeline: UnescoItem[] = [
  {
    id: "u1",
    year: 2008,
    name: "Wayang & Keris",
    image: "/culture/wayangkulit.jpeg",
    description: "Wayang: Seni pertunjukan bayangan sarat filosofi dari Jawa dan Bali. Keris: Senjata asimetris dari Jawa dengan nilai spiritual tinggi, tiap bilahnya dipercaya memiliki karakter tersendiri."
  },
  {
    id: "u2",
    year: 2009,
    name: "Batik",
    image: "/culture/batikparang.jpeg",
    description: "Kain bercorak buatan tangan dengan malam panas dan canting. Tiap motifnya menyimpan makna filosofis mendalam tentang kehidupan dan alam semesta."
  },
  {
    id: "u3",
    year: 2010,
    name: "Angklung",
    image: "/culture/angklung.jpeg",
    description: "Alat musik bambu dari tanah Sunda, Jawa Barat, yang dimainkan secara ansambel dan mengajarkan nilai kebersamaan dan harmoni."
  },
  {
    id: "u4",
    year: 2011,
    name: "Tari Saman",
    image: "/culture/saman.jpeg",
    description: "Tarian dari suku Gayo, Aceh, dengan gerakan tangan ritmis, harmonis dan sangat cepat. Biasa ditampilkan dalam perayaan penting."
  },
  {
    id: "u5",
    year: 2012,
    name: "Noken",
    image: "/culture/noken.jpeg",
    description: "Tas rajut multifungsi masyarakat Papua dari serat kulit kayu, melambangkan kehidupan baik, kedamaian, dan kesuburan."
  },
  {
    id: "u6",
    year: 2015,
    name: "Tiga Genre Tari Bali",
    image: "/culture/taribali.jpeg",
    description: "Tari Wali (sakral), Tari Bebali (semi-sakral), dan Tari Bebalih-balihan (hiburan) yang mencerminkan harmoni spiritual masyarakat Bali."
  },
  {
    id: "u7",
    year: 2017,
    name: "Seni Phinisi",
    image: "/culture/Phinisi.jpeg",
    description: "Tradisi pembuatan kapal layar khas suku Bugis dan Makassar dari Sulawesi Selatan, diwariskan turun-temurun tanpa blueprint tertulis."
  },
  {
    id: "u8",
    year: 2023,
    name: "Pantun",
    image: "/culture/Hand-written_Pantun_Melayu_scroll_202607021658.jpeg",
    description: "Tradisi lisan bersajak (diakui bersama Malaysia) untuk upacara adat, pernikahan, dan sosial sebagai ekspresi budaya Melayu."
  }
];
