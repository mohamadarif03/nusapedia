export interface ProvinceStory {
  title: string;
  synopsis: string;
  characters: string[];
  moralValue: string;
  origin: string;
}

export const provinceStories: Record<string, ProvinceStory> = {
  "DI Yogyakarta": {
    title: "Legenda Roro Jonggrang",
    synopsis: "Kisah cinta bersyarat antara Bandung Bondowoso yang sakti dengan Roro Jonggrang, putri Kerajaan Boko. Untuk menolak lamaran Bandung Bondowoso secara halus, Roro Jonggrang meminta dibangunkan seribu candi dalam waktu satu malam. Dengan bantuan jin, Bandung hampir menyelesaikannya, namun Roro Jonggrang menyiasatinya dengan memukul lesung agar ayam berkokok lebih awal. Mengetahui kecurangan tersebut, Bandung Bondowoso yang murka mengutuk Roro Jonggrang menjadi candi yang keseribu.",
    characters: ["Roro Jonggrang", "Bandung Bondowoso", "Prabu Boko"],
    moralValue: "Kecurangan akan berbuah petaka, dan kemarahan yang tidak terkontrol akan merugikan diri sendiri.",
    origin: "Sleman, DI Yogyakarta"
  },
  "Jawa Barat": {
    title: "Legenda Sangkuriang",
    synopsis: "Kisah tragis tentang seorang pemuda bernama Sangkuriang yang secara tidak sengaja jatuh cinta pada ibu kandungnya sendiri, Dayang Sumbi, yang awet muda. Dayang Sumbi mengenali Sangkuriang dari bekas luka di kepalanya dan mencoba membatalkan pernikahan dengan meminta syarat mustahil: membendung Sungai Citarum dan membuat perahu besar dalam semalam. Sangkuriang gagal memenuhi syarat tersebut karena Dayang Sumbi memicu fajar buatan, membuat Sangkuriang menendang perahu tersebut hingga terbalik menjadi Gunung Tangkuban Parahu.",
    characters: ["Sangkuriang", "Dayang Sumbi", "Tumang"],
    moralValue: "Pentingnya mengendalikan emosi dan bersikap jujur, serta takdir yang tidak bisa dipaksakan.",
    origin: "Bandung, Jawa Barat"
  },
  "Jawa Tengah": {
    title: "Legenda Rawa Pening (Baru Klinting)",
    synopsis: "Kisah tentang seorang anak jelmaan naga bernama Baru Klinting yang dikucilkan dan kelaparan. Ia meminta makanan ke warga desa yang sedang mengadakan pesta pora, namun diusir dengan kejam. Hanya seorang janda tua baik hati bernama Nyi Latung yang memberinya makan. Baru Klinting kemudian menantang warga desa mencabut sebatang lidi yang ia tancapkan di tanah. Tak ada yang mampu mencabutnya kecuali Baru Klinting. Saat dicabut, pancaran air deras keluar dan menenggelamkan desa congkak tersebut menjadi sebuah danau yang kini dikenal sebagai Rawa Pening.",
    characters: ["Baru Klinting", "Nyi Latung", "Warga Desa Pathak"],
    moralValue: "Jangan menilai seseorang dari rupa luar dan selalu hargai sesama tanpa memandang kasta.",
    origin: "Semarang, Jawa Tengah"
  },
  "Papua": {
    title: "Biwar dan Naga Raksasa",
    synopsis: "Legenda kepahlawanan seorang anak bernama Biwar di daerah pesisir Papua. Desanya diteror oleh seekor naga raksasa yang mendiami sungai luas, yang juga telah menewaskan ayah Biwar dan penduduk desa lainnya. Dibesarkan oleh ibunya di hutan, Biwar dilatih menggunakan busur, panah, dan sumpit. Ketika dewasa, ia berlayar menyusuri sungai dan bertarung dengan gagah berani melawan naga tersebut. Biwar berhasil mengalahkan naga raksasa dan membebaskan desanya dari ketakutan.",
    characters: ["Biwar", "Ibu Biwar", "Naga Raksasa"],
    moralValue: "Keberanian membela kebenaran serta bakti seorang anak kepada orang tua dan tanah airnya.",
    origin: "Pesisir Selatan, Papua"
  },
  "Aceh": {
    title: "Legenda Putroe Nhang",
    synopsis: "Kisah kepemimpinan seorang putri panglima perang perempuan asal Samudera Pasai yang legendaris, Putroe Nhang. Ia dikenal tangguh memimpin pasukan maritim menghalau para penjajah. Kecantikan dan kecerdasannya memikat banyak bangsawan, namun kisah cintanya sarat dengan nuansa mistis dan perjuangan pertahanan wilayah tanah Rencong. Makamnya yang megah kini menjadi situs sejarah penting di Aceh Utara.",
    characters: ["Putroe Nhang", "Sultan Pasai", "Laksamana Laut"],
    moralValue: "Ketangguhan kepemimpinan perempuan dalam mempertahankan kedaulatan tanah air.",
    origin: "Aceh Utara, Aceh"
  },
  "Bali": {
    title: "Kisah Jayaprana dan Layonsari",
    synopsis: "Tragedi cinta sejati yang sering disebut sebagai 'Romeo dan Juliet'-nya Bali. Jayaprana adalah seorang abdi setia Raja Kalianget yang menikah dengan gadis cantik jelita bernama Layonsari. Namun, sang Raja sendiri terpikat oleh kecantikan Layonsari dan berencana merebutnya dengan cara mengirim Jayaprana ke perbatasan utara untuk bertempur, lalu membunuhnya secara licik. Mendengar kematian suaminya, Layonsari memilih untuk mengakhiri hidupnya sendiri demi menjaga kesetiaan cintanya.",
    characters: ["Jayaprana", "Layonsari", "Raja Kalianget"],
    moralValue: "Kesetiaan cinta sejati yang suci dan ketamakan penguasa yang akhirnya membawa kehancuran moral.",
    origin: "Buleleng, Bali"
  },
  "Sulawesi Selatan": {
    title: "Sawerigading & Asal Mula Kapal Phinisi",
    synopsis: "Kisah epik dari epos Lontara La Galigo tentang petualangan putra mahkota Kerajaan Luwu bernama Sawerigading. Ia melakukan pelayaran legendaris ke tanah Tiongkok untuk meminang Putri We Tenriabeng. Kapal besar yang digunakannya dibangun dari kayu pohon welengreng yang sakti. Sepulangnya dari perjalanan tersebut, kapalnya diterjang badai dahsyat dan pecah menjadi tiga bagian yang terdampar di Ara, Tanah Lemo, dan Bira. Pecahan inilah yang kemudian dirakit kembali oleh masyarakat setempat menjadi cikal bakal kapal layar legendaris Phinisi.",
    characters: ["Sawerigading", "We Tenriabeng", "Empu Pembuat Kapal"],
    moralValue: "Ketangguhan dalam menghadapi badai kehidupan dan gotong royong merakit kembali harapan.",
    origin: "Bulukumba, Sulawesi Selatan"
  },
  "Sumatera Barat": {
    title: "Legenda Malin Kundang",
    synopsis: "Cerita rakyat terkenal tentang seorang pemuda miskin bernama Malin Kundang yang pergi merantau demi memperbaiki nasib ibunya yang janda tua. Di tanah rantau, Malin sukses dan menjadi saudagar kaya raya beristrikan wanita bangsawan. Ketika kapalnya bersandar kembali di kampung halamannya, ibunya berlari memeluknya. Namun karena malu akan kemiskinan ibunya di hadapan sang istri, Malin menolak mengakui ibunya bahkan menendangnya. Kecewa dan terluka, sang ibu berdoa agar anaknya dihukum, dan seketika badai datang mengubah Malin beserta kapalnya menjadi batu.",
    characters: ["Malin Kundang", "Mande Rubayah (Ibu)", "Istri Malin"],
    moralValue: "Durhaka kepada orang tua adalah dosa besar; kesuksesan materi tidak boleh membutakan kasih sayang keluarga.",
    origin: "Pantai Air Manis, Sumatera Barat"
  },
  "Riau": {
    title: "Legenda Putri Tujuh",
    synopsis: "Asal mula nama kota Dumai yang menceritakan tentang Kerajaan Seri Bunga Tanjung yang dipimpin oleh Ratu Cik Sima. Ia memiliki tujuh putri yang sangat cantik jelita, dengan putri bungsu bernama Mayang Sari sebagai yang tercantik. Kecantikannya memicu perseteruan antar kerajaan tetangga yang berujung pada perang besar. Demi melindungi putri-putrinya, sang Ratu menyembunyikan mereka di dalam gua di tengah hutan. Namun, Ratu tewas dalam perang dan ketujuh putrinya ikut gugur di dalam persembunyian karena kelaparan. Kata 'Dumai' berasal dari ucapan kekaguman atas kecantikan sang putri: 'Duhai mayang'.",
    characters: ["Mayang Sari", "Ratu Cik Sima", "Pangeran Empang Kuala"],
    moralValue: "Kecantikan sejati harus dijaga dengan kebijaksanaan, menghindari perang yang merusak kedamaian.",
    origin: "Dumai, Riau"
  }
};
