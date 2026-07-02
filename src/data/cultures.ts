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
    history: "Motif Batik Parang diciptakan oleh pendiri Keraton Mataram. Motif ini melambangkan kekuasaan, kewibawaan, kebesaran, dan gerak cepat, sehingga pada masa lalu hanya boleh dipakai oleh raja dan kesatria Keraton.",
    philosophy: "Susunan motif S jalin-menjalin tidak terputus melambangkan kesinambungan. Bentuk dasar huruf S diambil dari ombak samudra yang menggambarkan semangat yang tidak pernah padam.",
    makingProcess: "Pembuatan Batik Parang klasik menggunakan canting dan malam (lilin) yang dipanaskan. Pola digambar pada kain mori, ditutup malam untuk mempertahankan warna asli kain, dicelup ke pewarna, kemudian malam dilorot dengan air mendidih."
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
    history: "Telah dimainkan sejak masa Kerajaan Sunda (abad ke-12) sebagai alat musik pemujaan terhadap Dewi Sri (Dewi Padi) agar diberkahi kesuburan tanah.",
    philosophy: "Bunyi angklung yang harmonis hanya tercipta jika dimainkan secara bersama-sama, mengajarkan gotong-royong, toleransi, dan keselarasan sosial.",
    makingProcess: "Dibuat dari bambu khusus (bambu hitam atau wulung). Bambu dipotong, dikeringkan, kemudian diraut bagian tabungnya dengan sangat teliti untuk menyesuaikan frekuensi nadanya."
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
    history: "Telah ada sejak sebelum abad ke-10, awalnya berfungsi sebagai ritual pemujaan arwah leluhur (Hyang). Kemudian berkembang menjadi media dakwah Islam oleh Wali Songo.",
    philosophy: "Karakter wayang (kanan baik, kiri buruk) melambangkan pergolakan batin manusia antara nafsu baik dan buruk. Layar (kelir) melambangkan alam semesta, dan lampu (blencong) melambangkan cahaya kehidupan.",
    makingProcess: "Dibuat dari kulit kerbau yang dikeringkan dan dikerok. Pola digambar, ditatah (dilubangi kecil-kecil) dengan pahat khusus, kemudian diwarnai dengan pigmen alami dan diberi tangkai penyangga dari tanduk kerbau."
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
    history: "Diwariskan secara turun-temurun lintas generasi di kalangan suku pegunungan Papua. Noken diakui UNESCO sebagai warisan budaya takbenda pada 2012.",
    philosophy: "Noken melambangkan kehidupan, kemandirian, kedamaian, dan kesuburan bagi masyarakat Papua. Membawa noken di kepala menyimbolkan bahwa perempuan memikul beban kehidupan keluarga.",
    makingProcess: "Dibuat dari serat kulit kayu pohon Manduam, pohon Nawa, atau Anggrek hutan. Serat kayu dipisahkan, dijemur, kemudian dipintal menjadi benang kuat sebelum dirajut secara manual menjadi tas."
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
    history: "Telah digunakan sejak abad ke-9 dan menyebar luas ke seluruh Nusantara. Keris bukan sekadar senjata, namun juga benda pusaka kebesaran turun-temurun.",
    philosophy: "Bentuk keris (luk) yang meliuk-liuk menggambarkan ular atau naga kosmik. Penyatuan bilah keris (lingga) dan wrangka atau sarungnya (yoni) melambangkan harmoni mikrokosmos dan makrokosmos.",
    makingProcess: "Dibuat oleh seorang Empu dengan cara menempa campuran berbagai jenis besi, baja, dan bahan pamor (seperti nikel atau batu meteorit) berlapis-lapis melalui pemanasan dan pelipatan berkali-kali."
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
    history: "Dikembangkan pada abad ke-14 oleh seorang ulama bernama Syekh Saman. Awalnya merupakan permainan rakyat bernama Pok Ane.",
    philosophy: "Mencerminkan keagamaan, sopan santun, pendidikan, kekompakan, kepahlawanan, dan kebersamaan.",
    makingProcess: "Ditampilkan tanpa iringan alat musik, melainkan menggunakan suara penari dan tepukan tangan/dada mereka sendiri."
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
    history: "Tari Bali sangat erat kaitannya dengan upacara keagamaan Hindu Bali sejak berabad-pedoman lalu.",
    philosophy: "Mencerminkan filosofi Tri Hita Karana, yaitu keharmonisan antara manusia dengan Tuhan, manusia dengan alam, dan manusia dengan sesama.",
    makingProcess: "Gerakan dipelajari sejak dini dengan fokus pada agem, tandang, dan tangkep (ekspresi wajah dan mata/nyeledet)."
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
    history: "Catatan tentang Phinisi sudah ada sejak naskah Lontarak I Babad La Lagaligo (abad ke-14).",
    philosophy: "Mencerminkan nilai ketangguhan, gotong royong, keindahan, dan penghargaan terhadap alam (laut).",
    makingProcess: "Dibuat tanpa cetak biru tertulis (blueprint). Semua perhitungan dan teknik merakit lambung serta tiang diwariskan secara lisan."
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
    history: "Telah dikenal sejak zaman kuno di peradaban Melayu sebagai alat komunikasi sosial.",
    philosophy: "Memiliki struktur sampiran (pembuka) dan isi (pesan utama), mengajarkan sopan santun dan nasihat moral secara tidak langsung.",
    makingProcess: "Diciptakan secara spontan maupun tertulis, menggunakan pola rima a-b-a-b dengan permainan kiasan kata."
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
