// Sesuaikan import ini dengan lokasi type Question di project-mu (lib/gameEngine.ts atau types/game.ts)
import type { Question } from '../types/game';

// Seluruh soal disusun dari materi PPT Kelompok 9 "Ideologi Lain yang Berkembang di Dunia"
// (Pendidikan Pancasila, Polinema). Tidak ada fakta di luar isi PDF tersebut.
export const QUESTIONS: Question[] = [
  // ==================== PENGERTIAN IDEOLOGI (1-12) ====================
  {
    id: 1,
    q: 'Secara etimologis, kata "ideologi" berasal dari kata Yunani idea dan logos. Apa arti kata idea?',
    opts: ['Ilmu', 'Gagasan', 'Kekuasaan', 'Kebebasan'],
    correct: 1,
    why: 'Menurut materi, idea berarti gagasan, sedangkan logos berarti ilmu atau pengetahuan.',
  },
  {
    id: 2,
    q: 'Dalam asal kata "ideologi", kata Yunani logos berarti?',
    opts: ['Ilmu/pengetahuan', 'Gagasan atau ide', 'Negara/pemerintah', 'Kebebasan/hak'],
    correct: 0,
    why: 'Logos berarti ilmu/pengetahuan; digabung dengan idea (gagasan) menjadi "ilmu tentang gagasan".',
  },
  {
    id: 3,
    q: 'Istilah "ideologi" pertama kali diperkenalkan oleh?',
    opts: ['Karl Marx & Friedrich Engels', 'Adam Smith', 'Antoine Destutt de Tracy', 'Prof. Notonagoro'],
    correct: 2,
    why: 'Istilah ideologi pertama kali diperkenalkan oleh Antoine Destutt de Tracy.',
  },
  {
    id: 4,
    q: 'Istilah "ideologi" pertama kali diperkenalkan pada?',
    opts: ['Abad ke-16', 'Pertengahan abad ke-19', 'Awal abad ke-20', 'Akhir abad ke-18'],
    correct: 3,
    why: 'Antoine Destutt de Tracy memperkenalkan istilah ideologi pada akhir abad ke-18.',
  },
  {
    id: 5,
    q: 'Antoine Destutt de Tracy memakai istilah ideologi untuk menyebut?',
    opts: ['Ilmu tentang pasar', 'Ilmu tentang gagasan', 'Ilmu tentang kekuasaan raja', 'Ilmu tentang kelas sosial'],
    correct: 1,
    why: 'De Tracy memakai istilah ideologi untuk menyebut "ilmu tentang gagasan".',
  },
  {
    id: 6,
    q: 'Secara umum, ideologi dapat dipahami sebagai?',
    opts: [
      'Kumpulan aturan teknis yang hanya berlaku bagi aparat dan pejabat negara',
      'Kumpulan data produksi dan distribusi barang antarnegara',
      'Kumpulan catatan sejarah peperangan antarbangsa di dunia',
      'Kumpulan gagasan, nilai, dan keyakinan mendasar bagi suatu bangsa',
    ],
    correct: 3,
    why: 'Secara umum, ideologi adalah kumpulan gagasan, nilai, dan keyakinan mendasar yang menjadi pedoman suatu kelompok atau bangsa dalam mengatur kehidupan bersama.',
  },
  {
    id: 7,
    q: 'Ideologi menjadi pedoman suatu kelompok atau bangsa dalam mengatur kehidupan bersama, termasuk di bidang?',
    opts: [
      'Pertanian, perikanan, dan pertambangan',
      'Olahraga, hiburan, dan pariwisata',
      'Politik, ekonomi, dan sosial',
      'Transportasi, komunikasi, dan teknologi',
    ],
    correct: 2,
    why: 'Materi menyebut ideologi mengatur kehidupan bersama, termasuk dalam bidang politik, ekonomi, dan sosial.',
  },
  {
    id: 8,
    q: 'Siapakah ahli filsafat Pancasila yang dikutip pada slide Pengertian Ideologi?',
    opts: ['Prof. Notonagoro', 'John Locke', 'David Ricardo', 'Antoine Destutt de Tracy'],
    correct: 0,
    why: 'Prof. Notonagoro adalah ahli filsafat Pancasila yang dikutip pada slide Pengertian Ideologi.',
  },
  {
    id: 9,
    q: 'Menurut Prof. Notonagoro, ideologi adalah keseluruhan pandangan, cita-cita, keyakinan, dan nilai yang bersifat?',
    opts: ['Acak dan spontan', 'Berubah-ubah', 'Rahasia negara', 'Sistematis'],
    correct: 3,
    why: 'Menurut Prof. Notonagoro, ideologi adalah keseluruhan pandangan, cita-cita, keyakinan, dan nilai yang bersifat sistematis dan menyangkut kehidupan bermasyarakat dan bernegara.',
  },
  {
    id: 10,
    q: 'Manakah yang BUKAN fungsi ideologi bagi suatu bangsa menurut materi?',
    opts: [
      'Menyatukan visi dan cita-cita bersama dalam bernegara',
      'Mengarahkan kebijakan politik dan ekonomi suatu negara',
      'Menyeragamkan seluruh bangsa dalam satu identitas dunia',
      'Menjadi pedoman dalam bersikap dan bertindak sehari-hari',
    ],
    correct: 2,
    why: 'Ideologi justru menjadi identitas pembeda antarbangsa, bukan penyeragam seluruh bangsa.',
  },
  {
    id: 11,
    q: 'Salah satu fungsi ideologi bagi suatu bangsa adalah mengarahkan kebijakan negara di bidang?',
    opts: ['Olahraga dan hiburan', 'Politik dan ekonomi', 'Pariwisata dan kuliner', 'Mode dan musik'],
    correct: 1,
    why: 'Salah satu fungsi ideologi adalah mengarahkan kebijakan politik dan ekonomi negara.',
  },
  {
    id: 12,
    q: 'Salah satu fungsi ideologi bagi suatu bangsa adalah menjadi?',
    opts: [
      'Identitas pembeda antarbangsa',
      'Alat untuk menentukan harga barang',
      'Aturan teknis perdagangan antarnegara',
      'Penghapus perbedaan antarbangsa',
    ],
    correct: 0,
    why: 'Salah satu fungsi ideologi bagi suatu bangsa adalah menjadi identitas pembeda antarbangsa.',
  },

  // ==================== PETA IDEOLOGI DUNIA (13-20) ====================
  {
    id: 13,
    q: 'Berapa kelompok ideologi besar selain Pancasila yang dipetakan pada slide "Peta Ideologi Dunia"?',
    opts: ['Empat', 'Tiga', 'Lima', 'Enam'],
    correct: 0,
    why: 'Ada empat kartu: Liberalisme, Sosialisme & Komunisme, Kapitalisme, dan Fasisme.',
  },
  {
    id: 14,
    q: 'Pada slide "Peta Ideologi Dunia", kartu ideologi mana yang bertuliskan "Kebebasan individu sebagai nilai utama"?',
    opts: ['Kapitalisme', 'Fasisme', 'Liberalisme', 'Sosialisme & Komunisme'],
    correct: 2,
    why: 'Kartu Liberalisme bertuliskan kebebasan individu sebagai nilai utama.',
  },
  {
    id: 15,
    q: 'Pada slide "Peta Ideologi Dunia", kartu ideologi mana yang bertuliskan "Kesetaraan & kepemilikan kolektif"?',
    opts: ['Sosialisme & Komunisme', 'Liberalisme & Kapitalisme', 'Kapitalisme', 'Fasisme'],
    correct: 0,
    why: 'Kartu Sosialisme & Komunisme bertuliskan kesetaraan dan kepemilikan kolektif.',
  },
  {
    id: 16,
    q: 'Pada slide "Peta Ideologi Dunia", kartu ideologi mana yang bertuliskan "Pasar bebas & akumulasi modal"?',
    opts: ['Fasisme', 'Sosialisme & Komunisme', 'Liberalisme', 'Kapitalisme'],
    correct: 3,
    why: 'Kartu Kapitalisme bertuliskan pasar bebas dan akumulasi modal.',
  },
  {
    id: 17,
    q: 'Pada slide "Peta Ideologi Dunia", kartu ideologi mana yang bertuliskan "Nasionalisme ekstrem & otoritarianisme"?',
    opts: ['Liberalisme', 'Fasisme', 'Kapitalisme', 'Sosialisme & Komunisme'],
    correct: 1,
    why: 'Kartu Fasisme bertuliskan nasionalisme ekstrem dan otoritarianisme.',
  },
  {
    id: 18,
    q: 'Pada slide Ringkasan, jenis-jenis ideologi yang disebut adalah Liberalisme, Sosialisme/Komunisme, Kapitalisme, dan?',
    opts: ['Pancasila', 'Feodalisme', 'Materialisme', 'Fasisme'],
    correct: 3,
    why: 'Slide Ringkasan menyebut empat jenis ideologi: Liberalisme, Sosialisme/Komunisme, Kapitalisme, dan Fasisme.',
  },
  {
    id: 19,
    q: 'Menurut slide "Peta Ideologi Dunia", ideologi-ideologi besar selain Pancasila turut memengaruhi tatanan apa?',
    opts: ['Olahraga dan seni dunia', 'Politik dan ekonomi dunia', 'Cuaca dan iklim dunia', 'Bahasa dan sastra dunia'],
    correct: 1,
    why: 'Slide tersebut menyebut ideologi-ideologi besar turut memengaruhi tatanan politik dan ekonomi dunia.',
  },
  {
    id: 20,
    q: 'Pasangan ideologi dan ciri ringkasnya yang benar menurut slide "Peta Ideologi Dunia" adalah?',
    opts: [
      'Kapitalisme – nasionalisme ekstrem & otoritarianisme',
      'Fasisme – pasar bebas & akumulasi modal',
      'Liberalisme – kebebasan individu sebagai nilai utama',
      'Sosialisme & Komunisme – kebebasan individu sebagai nilai utama',
    ],
    correct: 2,
    why: 'Liberalisme diringkas sebagai kebebasan individu sebagai nilai utama; pasangan lainnya tertukar.',
  },

  // ==================== LIBERALISME (21-35) ====================
  {
    id: 21,
    q: 'Semboyan (tagline) Liberalisme pada slide materi adalah?',
    opts: [
      'Kepentingan negara di atas segalanya',
      'Kebebasan individu di atas segalanya',
      'Kesetaraan kolektif di atas segalanya',
      'Keuntungan modal di atas segalanya',
    ],
    correct: 1,
    why: 'Tagline Liberalisme pada slide adalah "Kebebasan individu di atas segalanya".',
  },
  {
    id: 22,
    q: 'Liberalisme muncul di Eropa pada abad ke?',
    opts: ['Abad ke-16–18', 'Abad ke-19', 'Abad ke-17–18', 'Abad ke-20'],
    correct: 2,
    why: 'Liberalisme muncul pada abad ke-17–18, sedangkan kapitalisme berkembang pada abad ke-16–18.',
  },
  {
    id: 23,
    q: 'Liberalisme muncul sebagai reaksi terhadap?',
    opts: [
      'Kekuasaan mutlak monarki dan gereja',
      'Revolusi Industri',
      'Runtuhnya feodalisme',
      'Kepemilikan kolektif alat produksi',
    ],
    correct: 0,
    why: 'Liberalisme muncul sebagai reaksi terhadap kekuasaan mutlak monarki dan gereja.',
  },
  {
    id: 24,
    q: 'Manakah yang BUKAN hal yang ditekankan liberalisme pada awal kemunculannya?',
    opts: [
      'Kepemilikan kolektif',
      'Akal budi',
      'Kebebasan berpikir',
      'Hak asasi individu',
    ],
    correct: 0,
    why: 'Liberalisme menekankan akal budi, kebebasan berpikir, dan hak asasi individu; kepemilikan kolektif adalah prinsip Sosialisme & Komunisme.',
  },
  {
    id: 25,
    q: 'Tokoh berikut disebut sebagai pencetus Liberalisme dalam materi, KECUALI?',
    opts: ['John Locke', 'Montesquieu', 'David Ricardo', 'John Stuart Mill'],
    correct: 2,
    why: 'David Ricardo disebut sebagai tokoh pencetus Kapitalisme, bukan Liberalisme.',
  },
  {
    id: 26,
    q: 'Tokoh-tokoh pencetus Liberalisme yang disebut dalam materi adalah?',
    opts: [
      'Karl Marx, Friedrich Engels, Adam Smith, dan Max Weber',
      'David Ricardo, Max Weber, Milton Friedman, dan John Locke',
      'John Locke, David Ricardo, Max Weber, dan Adam Smith',
      'John Locke, Montesquieu, Adam Smith, dan John Stuart Mill',
    ],
    correct: 3,
    why: 'Tokoh pencetus Liberalisme pada materi: John Locke, Montesquieu, Adam Smith, dan John Stuart Mill.',
  },
  {
    id: 27,
    q: 'Para tokoh liberalisme meletakkan dasar pemikiran tentang hak alamiah, pemisahan kekuasaan, dan?',
    opts: ['Ekonomi terencana', 'Penghapusan kelas sosial', 'Ekonomi pasar', 'Kepemilikan kolektif'],
    correct: 2,
    why: 'Dasar pemikiran yang diletakkan para tokoh liberalisme: hak alamiah, pemisahan kekuasaan, dan ekonomi pasar.',
  },
  {
    id: 28,
    q: 'Tokoh yang disebut sebagai pencetus Liberalisme sekaligus pencetus Kapitalisme dalam materi adalah?',
    opts: ['Montesquieu', 'John Stuart Mill', 'Max Weber', 'Adam Smith'],
    correct: 3,
    why: 'Adam Smith (bersama John Locke) disebut pada daftar tokoh pencetus Liberalisme maupun Kapitalisme.',
  },
  {
    id: 29,
    q: 'Tokoh yang disebut sebagai pencetus Liberalisme, tetapi TIDAK disebut sebagai pencetus Kapitalisme, adalah?',
    opts: ['David Ricardo', 'Montesquieu', 'Adam Smith', 'Max Weber'],
    correct: 1,
    why: 'Montesquieu hanya muncul pada tokoh Liberalisme; tokoh Kapitalisme adalah Adam Smith, John Locke, David Ricardo, dan Max Weber.',
  },
  {
    id: 30,
    q: 'Negara yang disebut menerapkan liberalisme dalam materi adalah?',
    opts: ['Kuba, Vietnam, dan Korea Utara', 'Tiongkok dan Korea Utara', 'Amerika Serikat dan Inggris', 'Vietnam, Tiongkok, dan Kuba'],
    correct: 2,
    why: 'Materi menyebut Amerika Serikat dan Inggris, serta sebagian besar negara Eropa Barat, sebagai penganut liberalisme.',
  },
  {
    id: 31,
    q: 'Selain Amerika Serikat dan Inggris, liberalisme juga diterapkan oleh sebagian besar negara di kawasan?',
    opts: ['Eropa Barat', 'Asia Timur', 'Amerika Latin', 'Eropa Timur'],
    correct: 0,
    why: 'Selain Amerika Serikat dan Inggris, sebagian besar negara Eropa Barat juga menerapkan liberalisme.',
  },
  {
    id: 32,
    q: 'Dalam sistem politik, negara penganut liberalisme menerapkan?',
    opts: ['Sistem satu partai', 'Demokrasi Pancasila', 'Demokrasi multipartai', 'Pemerintahan otoriter'],
    correct: 2,
    why: 'Negara penganut liberalisme menerapkan demokrasi multipartai dalam sistem politiknya.',
  },
  {
    id: 33,
    q: 'Dalam bidang ekonomi, negara penganut liberalisme menerapkan?',
    opts: [
      'Pasar bebas dengan regulasi terbatas',
      'Ekonomi terencana secara sentralistik',
      'Ekonomi kerakyatan Pasal 33 UUD 1945',
      'Kepemilikan kolektif seluruh alat produksi',
    ],
    correct: 0,
    why: 'Dalam ekonomi, liberalisme menerapkan pasar bebas dengan regulasi terbatas.',
  },
  {
    id: 34,
    q: 'John Stuart Mill disebut sebagai tokoh pencetus ideologi?',
    opts: ['Sosialisme & Komunisme', 'Fasisme', 'Kapitalisme', 'Liberalisme'],
    correct: 3,
    why: 'John Stuart Mill disebut sebagai salah satu tokoh pencetus Liberalisme.',
  },
  {
    id: 35,
    q: 'Liberalisme menekankan akal budi, kebebasan berpikir, dan hak asasi?',
    opts: ['Negara', 'Partai', 'Individu', 'Kolektif'],
    correct: 2,
    why: 'Liberalisme menekankan akal budi, kebebasan berpikir, dan hak asasi individu.',
  },

  // ==================== SOSIALISME & KOMUNISME (36-50) ====================
  {
    id: 36,
    q: 'Prinsip-prinsip Sosialisme dan Komunisme digagas oleh?',
    opts: [
      'Adam Smith dan David Ricardo',
      'John Locke dan Montesquieu',
      'Max Weber dan Milton Friedman',
      'Karl Marx dan Friedrich Engels',
    ],
    correct: 3,
    why: 'Prinsip Sosialisme & Komunisme digagas oleh Karl Marx dan Friedrich Engels.',
  },
  {
    id: 37,
    q: 'Sosialisme dan Komunisme digagas oleh Karl Marx dan Friedrich Engels pada abad ke?',
    opts: ['Abad ke-19', 'Abad ke-16', 'Abad ke-18', 'Abad ke-17'],
    correct: 0,
    why: 'Sosialisme & Komunisme digagas pada abad ke-19.',
  },
  {
    id: 38,
    q: 'Menurut prinsip Kepemilikan Kolektif, alat produksi meliputi?',
    opts: [
      'Teknologi, inovasi, dan investasi',
      'Pasar, kompetisi, dan profit',
      'Tanah, pabrik, dan modal',
      'Buruh, kelas, dan upah',
    ],
    correct: 2,
    why: 'Alat produksi pada prinsip ini mencakup tanah, pabrik, dan modal.',
  },
  {
    id: 39,
    q: 'Pada prinsip Kepemilikan Kolektif, alat produksi dikuasai?',
    opts: [
      'Bersama atau oleh negara',
      'Oleh individu pemilik modal',
      'Oleh perusahaan asing',
      'Oleh mekanisme pasar bebas',
    ],
    correct: 0,
    why: 'Pada Kepemilikan Kolektif, alat produksi dikuasai bersama atau oleh negara, bukan individu.',
  },
  {
    id: 40,
    q: 'Prinsip Penghapusan Kelas Sosial bertujuan menghapus stratifikasi antara?',
    opts: [
      'Pemerintah pusat dan pemerintah daerah',
      'Negara pengekspor dan negara pengimpor',
      'Kelompok mayoritas dan kelompok minoritas agama',
      'Pemilik modal (borjuis) dan pekerja (proletar)',
    ],
    correct: 3,
    why: 'Penghapusan kelas sosial menghapus stratifikasi antara pemilik modal (borjuis) dan pekerja (proletar).',
  },
  {
    id: 41,
    q: 'Dalam materi Sosialisme dan Komunisme, istilah "borjuis" merujuk pada?',
    opts: ['Pemilik modal', 'Pekerja', 'Petani', 'Pejabat negara'],
    correct: 0,
    why: 'Borjuis adalah pemilik modal.',
  },
  {
    id: 42,
    q: 'Dalam materi Sosialisme dan Komunisme, istilah "proletar" merujuk pada?',
    opts: ['Pemilik modal', 'Investor asing', 'Pekerja', 'Pelaku pasar bebas'],
    correct: 2,
    why: 'Proletar adalah pekerja.',
  },
  {
    id: 43,
    q: 'Dalam prinsip Ekonomi Terencana (planned economy), produksi dan distribusi barang diatur oleh?',
    opts: [
      'Mekanisme pasar bebas',
      'Negara secara terpusat',
      'Kompetisi antarperusahaan',
      'Individu pemilik modal',
    ],
    correct: 1,
    why: 'Dalam ekonomi terencana (planned economy), negara mengatur produksi dan distribusi barang secara terpusat.',
  },
  {
    id: 44,
    q: 'Prinsip Distribusi Berdasar Kebutuhan dirumuskan dalam semboyan?',
    opts: [
      'Dari masing-masing sesuai kemampuan, untuk masing-masing sesuai kebutuhan',
      'Dari masing-masing sesuai modal, untuk masing-masing sesuai laba',
      'Dari masing-masing sesuai kekuasaan, untuk masing-masing sesuai jabatan',
      'Dari masing-masing sesuai kebebasan, untuk masing-masing sesuai persaingan',
    ],
    correct: 0,
    why: 'Semboyan prinsip Distribusi Berdasar Kebutuhan: "Dari masing-masing sesuai kemampuan, untuk masing-masing sesuai kebutuhan."',
  },
  {
    id: 45,
    q: 'Manakah yang BUKAN prinsip Sosialisme dan Komunisme menurut materi?',
    opts: [
      'Kepemilikan kolektif',
      'Kompetisi bebas',
      'Penghapusan kelas sosial',
      'Ekonomi terencana',
    ],
    correct: 1,
    why: 'Kompetisi bebas adalah unsur sistem kapitalisme, bukan prinsip Sosialisme & Komunisme.',
  },
  {
    id: 46,
    q: 'Negara yang disebut sebagai contoh penerapan Sosialisme dan Komunisme dalam materi adalah?',
    opts: [
      'Tiongkok, Kuba, Vietnam, dan Korea Utara',
      'Amerika Serikat, Jepang, Inggris, dan Jerman',
      'Amerika Serikat, Inggris, dan Eropa Barat',
      'Jepang, Jerman, Kuba, dan Inggris',
    ],
    correct: 0,
    why: 'Contoh negara yang disebut: Tiongkok, Kuba, Vietnam, dan Korea Utara.',
  },
  {
    id: 47,
    q: 'Materi menyebut contoh negara Sosialisme dan Komunisme "dengan variasi tingkat penerapan". Artinya?',
    opts: [
      'Semua negara menerapkannya dengan tingkat yang sama persis',
      'Tidak ada negara yang benar-benar menerapkannya',
      'Tingkat penerapannya berbeda-beda di tiap negara',
      'Penerapannya hanya berlaku di satu negara',
    ],
    correct: 2,
    why: 'Materi menyebut negara-negara contoh menerapkannya dengan variasi tingkat penerapan.',
  },
  {
    id: 48,
    q: 'Pasangan prinsip dan penjelasannya yang benar menurut materi Sosialisme dan Komunisme adalah?',
    opts: [
      'Kepemilikan Kolektif – alat produksi dimiliki individu pemilik modal',
      'Penghapusan Kelas Sosial – mempertegas jurang borjuis dan proletar',
      'Distribusi Berdasar Kebutuhan – barang dibagi sesuai besar modal',
      'Ekonomi Terencana – negara mengatur produksi dan distribusi terpusat',
    ],
    correct: 3,
    why: 'Ekonomi Terencana berarti negara mengatur produksi dan distribusi barang secara terpusat.',
  },
  {
    id: 49,
    q: 'Pada prinsip Distribusi Berdasar Kebutuhan, barang dibagikan berdasarkan?',
    opts: ['Besarnya modal', 'Kebutuhan masing-masing', 'Tingginya laba', 'Hasil persaingan pasar'],
    correct: 1,
    why: 'Pada prinsip Distribusi Berdasar Kebutuhan, pembagian barang disesuaikan dengan kebutuhan masing-masing.',
  },
  {
    id: 50,
    q: 'Ideologi yang prinsipnya menyebut alat produksi dikuasai bersama atau oleh negara, bukan individu, adalah?',
    opts: ['Liberalisme & Fasisme', 'Kapitalisme', 'Sosialisme & Komunisme', 'Fasisme'],
    correct: 2,
    why: 'Kepemilikan alat produksi secara bersama atau oleh negara adalah prinsip Sosialisme & Komunisme.',
  },

  // ==================== CIRI-CIRI IDEOLOGI LIBERAL-KAPITALIS (51-58) ====================
  {
    id: 51,
    q: 'Dalam ideologi liberal-kapitalis, kebebasan individu dijunjung tinggi dalam berpikir, berpendapat, dan?',
    opts: [
      'Berusaha',
      'Menyerahkan alat produksi',
      'Mengikuti perencanaan pusat',
      'Bergabung dalam satu partai',
    ],
    correct: 0,
    why: 'Kebebasan individu dijunjung tinggi dalam berpikir, berpendapat, dan berusaha.',
  },
  {
    id: 52,
    q: 'Ekonomi pasar bebas (free market) dalam ideologi liberal-kapitalis berjalan dengan campur tangan negara yang?',
    opts: ['Dominan', 'Minim', 'Mutlak', 'Terpusat'],
    correct: 1,
    why: 'Ekonomi pasar bebas berjalan dengan campur tangan negara yang minim.',
  },
  {
    id: 53,
    q: 'Dalam ideologi liberal-kapitalis, kepemilikan pribadi atas alat produksi?',
    opts: [
      'Dihapuskan',
      'Dikuasai negara',
      'Diakui dan dilindungi penuh',
      'Dibatasi demi fungsi sosial',
    ],
    correct: 2,
    why: 'Kepemilikan pribadi atas alat produksi diakui dan dilindungi penuh.',
  },
  {
    id: 54,
    q: 'Apa yang menjadi penggerak utama kemajuan dalam ideologi liberal-kapitalis?',
    opts: [
      'Perencanaan terpusat oleh negara',
      'Musyawarah mufakat',
      'Penghapusan kelas sosial',
      'Kompetisi antarindividu/perusahaan',
    ],
    correct: 3,
    why: 'Kompetisi antarindividu/perusahaan menjadi penggerak utama kemajuan.',
  },
  {
    id: 55,
    q: 'Konsep limited government dalam ideologi liberal-kapitalis berarti peran pemerintah dibatasi pada?',
    opts: [
      'Seluruh kegiatan ekonomi',
      'Fungsi-fungsi esensial',
      'Penentuan harga semua barang',
      'Pengelolaan seluruh alat produksi',
    ],
    correct: 1,
    why: 'Peran pemerintah dibatasi (limited government) pada fungsi-fungsi esensial.',
  },
  {
    id: 56,
    q: 'Dalam ideologi liberal-kapitalis, HAM dipahami berbasis?',
    opts: [
      'Kepentingan kolektif',
      'Keseimbangan hak dan kewajiban',
      'Kebebasan dan hak-hak individu',
      'Kehendak partai tunggal',
    ],
    correct: 2,
    why: 'HAM dipahami berbasis kebebasan dan hak-hak individu.',
  },
  {
    id: 57,
    q: 'Manakah yang BUKAN ciri ideologi liberal-kapitalis?',
    opts: [
      'Negara mengatur produksi dan distribusi terpusat',
      'Peran pemerintah dibatasi pada fungsi esensial',
      'Kompetisi antarperusahaan sebagai penggerak kemajuan',
      'Kepemilikan pribadi atas alat produksi dilindungi',
    ],
    correct: 0,
    why: 'Pengaturan produksi dan distribusi secara terpusat oleh negara adalah ciri ekonomi terencana, bukan liberal-kapitalis.',
  },
  {
    id: 58,
    q: 'Istilah "free market" pada ciri-ciri ideologi liberal-kapitalis merujuk pada?',
    opts: ['Ekonomi terencana', 'Ekonomi pasar bebas', 'Ekonomi kerakyatan', 'Ekonomi kolektif'],
    correct: 1,
    why: 'Free market berarti ekonomi pasar bebas dengan campur tangan negara yang minim.',
  },

  // ==================== KAPITALISME (59-70) ====================
  {
    id: 59,
    q: 'Kapitalisme berkembang di Eropa Barat pada abad ke?',
    opts: ['Abad ke-17–18', 'Abad ke-19', 'Abad ke-20', 'Abad ke-16–18'],
    correct: 3,
    why: 'Kapitalisme berkembang di Eropa Barat pada abad ke-16–18, sedangkan liberalisme muncul pada abad ke-17–18.',
  },
  {
    id: 60,
    q: 'Kapitalisme berkembang pasca-runtuhnya?',
    opts: ['Feodalisme', 'Liberalisme', 'Sosialisme', 'Fasisme'],
    correct: 0,
    why: 'Kapitalisme berkembang pasca-runtuhnya feodalisme.',
  },
  {
    id: 61,
    q: 'Perkembangan kapitalisme terdorong oleh peristiwa?',
    opts: [
      'Penghapusan kelas sosial',
      'Perencanaan ekonomi terpusat',
      'Revolusi Industri',
      'Dominasi kekuasaan monarki dan gereja',
    ],
    correct: 2,
    why: 'Perkembangan kapitalisme terdorong oleh Revolusi Industri.',
  },
  {
    id: 62,
    q: 'Kapitalisme menekankan akumulasi modal, kepemilikan swasta, dan?',
    opts: [
      'Distribusi berdasar kebutuhan',
      'Reinvestasi profit',
      'Penghapusan kelas',
      'Pembatasan HAM',
    ],
    correct: 1,
    why: 'Kapitalisme menekankan akumulasi modal, kepemilikan swasta, dan reinvestasi profit.',
  },
  {
    id: 63,
    q: "Ungkapan 'There's no such thing as a free lunch' pada slide Kapitalisme dikutip dari?",
    opts: ['Adam Smith', 'Karl Marx', 'Prof. Notonagoro', 'Milton Friedman'],
    correct: 3,
    why: 'Kutipan pada slide Kapitalisme dinisbahkan kepada Milton Friedman.',
  },
  {
    id: 64,
    q: 'Tokoh pencetus Kapitalisme dalam materi mencakup Adam Smith, John Locke, David Ricardo, dan?',
    opts: ['Karl Marx', 'Max Weber', 'Montesquieu', 'Friedrich Engels'],
    correct: 1,
    why: 'Tokoh pencetus Kapitalisme: Adam Smith, John Locke, David Ricardo, dan Max Weber.',
  },
  {
    id: 65,
    q: 'Para tokoh pencetus kapitalisme meletakkan dasar pemikiran tentang mekanisme pasar bebas, jaminan hak milik pribadi, dan?',
    opts: ['Ekonomi terencana', 'Penghapusan kelas sosial', 'Kepemilikan kolektif', 'Etika modal'],
    correct: 3,
    why: 'Dasar pemikiran kapitalisme mencakup mekanisme pasar bebas (invisible hand), jaminan hak milik pribadi, dan etika modal.',
  },
  {
    id: 66,
    q: 'Konsep "invisible hand" pada materi Kapitalisme berkaitan dengan?',
    opts: [
      'Mekanisme pasar bebas',
      'Perencanaan ekonomi terpusat',
      'Kepemilikan kolektif alat produksi',
      'Pembatasan peran individu',
    ],
    correct: 0,
    why: 'Invisible hand berkaitan dengan mekanisme pasar bebas.',
  },
  {
    id: 67,
    q: 'Negara yang disebut menerapkan kapitalisme dalam materi adalah?',
    opts: [
      'Tiongkok, Kuba, Vietnam, dan Korea Utara',
      'Tiongkok, Jepang, Inggris, dan Jerman',
      'Amerika Serikat, Jepang, Inggris, dan Jerman',
      'Amerika Serikat, Kuba, Vietnam, dan Korea Utara',
    ],
    correct: 2,
    why: 'Materi menyebut Amerika Serikat, Jepang, Inggris, Jerman, dan sebagian besar negara industri Barat sebagai penganut kapitalisme.',
  },
  {
    id: 68,
    q: 'Negara industri Barat menerapkan kapitalisme berbasis pasar bebas dengan tingkat regulasi negara dan kebijakan kesejahteraan yang?',
    opts: ['Sama persis', 'Berbeda-beda', 'Tidak ada sama sekali', 'Ditentukan satu partai'],
    correct: 1,
    why: 'Tingkat regulasi negara dan kebijakan kesejahteraan pada negara kapitalis berbeda-beda.',
  },
  {
    id: 69,
    q: 'Tokoh yang disebut sebagai pencetus Kapitalisme, tetapi TIDAK disebut sebagai pencetus Liberalisme, adalah?',
    opts: ['John Locke', 'Adam Smith', 'John Stuart Mill', 'Max Weber'],
    correct: 3,
    why: 'Max Weber hanya disebut pada tokoh pencetus Kapitalisme.',
  },
  {
    id: 70,
    q: 'Tokoh berikut disebut sebagai pencetus Kapitalisme dalam materi, KECUALI?',
    opts: ['Karl Marx', 'Adam Smith', 'John Locke', 'David Ricardo'],
    correct: 0,
    why: 'Karl Marx disebut sebagai penggagas Sosialisme & Komunisme (bersama Engels), bukan tokoh pencetus Kapitalisme.',
  },

  // ==================== UNSUR-UNSUR SISTEM KAPITALISME (71-78) ====================
  {
    id: 71,
    q: 'Berapa jumlah unsur dalam sistem kapitalisme menurut materi?',
    opts: ['Tiga', 'Empat', 'Lima', 'Enam'],
    correct: 2,
    why: 'Unsur sistem kapitalisme berjumlah lima, dari kepemilikan pribadi hingga profit sebagai tujuan utama.',
  },
  {
    id: 72,
    q: 'Unsur pertama dalam alur sistem kapitalisme adalah?',
    opts: ['Kepemilikan pribadi', 'Mekanisme pasar', 'Akumulasi modal', 'Kompetisi bebas'],
    correct: 0,
    why: 'Urutan unsur: Kepemilikan Pribadi, Mekanisme Pasar, Akumulasi Modal, Kompetisi Bebas, Profit sebagai Tujuan Utama.',
  },
  {
    id: 73,
    q: 'Menurut alur unsur kapitalisme, kepemilikan pribadi memungkinkan individu untuk?',
    opts: [
      'Menghapus kelas sosial',
      'Masuk ke pasar',
      'Menyerahkan modal kepada negara',
      'Menghindari kompetisi',
    ],
    correct: 1,
    why: 'Kepemilikan pribadi memungkinkan individu masuk ke pasar.',
  },
  {
    id: 74,
    q: 'Menurut alur unsur kapitalisme, pasar mendorong terjadinya?',
    opts: ['Profit', 'Kepemilikan kolektif', 'Perencanaan terpusat', 'Akumulasi modal'],
    correct: 3,
    why: 'Pasar mendorong akumulasi modal.',
  },
  {
    id: 75,
    q: 'Menurut alur unsur kapitalisme, modal yang terkumpul memicu?',
    opts: [
      'Kompetisi bebas',
      'Penghapusan pasar',
      'Distribusi berdasar kebutuhan',
      'Pembatasan hak individu',
    ],
    correct: 0,
    why: 'Modal memicu kompetisi bebas.',
  },
  {
    id: 76,
    q: 'Tujuan akhir yang menjadi unsur kelima dalam sistem kapitalisme adalah?',
    opts: ['Kesetaraan kelas', 'Pemerataan kepemilikan', 'Profit', 'Musyawarah mufakat'],
    correct: 2,
    why: 'Kompetisi diarahkan pada satu tujuan akhir, yaitu profit.',
  },
  {
    id: 77,
    q: 'Manakah yang termasuk dampak positif sistem kapitalisme bagi masyarakat dan negara menurut materi?',
    opts: [
      'Menghapus kesenjangan sosial antarkelompok',
      'Mendorong inovasi dan pertumbuhan ekonomi',
      'Menguatkan budaya lokal masyarakat',
      'Menghilangkan ketergantungan pada asing',
    ],
    correct: 1,
    why: 'Kapitalisme mendorong inovasi, efisiensi produksi, dan pertumbuhan ekonomi.',
  },
  {
    id: 78,
    q: 'Manakah yang termasuk risiko sistem kapitalisme bagi masyarakat dan negara menurut materi?',
    opts: [
      'Menghambat inovasi, efisiensi produksi, dan pertumbuhan ekonomi',
      'Menghilangkan kepemilikan pribadi dan persaingan usaha pasar',
      'Memperlebar kesenjangan sosial dan mengikis budaya lokal',
      'Membatasi hak individu secara mutlak dalam berusaha',
    ],
    correct: 2,
    why: 'Kapitalisme berisiko memperlebar kesenjangan sosial, menciptakan ketergantungan ekonomi, dan mengikis budaya lokal.',
  },

  // ==================== DAMPAK IDEOLOGI ASING BAGI NEGARA BERKEMBANG (79-86) ====================
  {
    id: 79,
    q: 'Manakah yang termasuk dampak POSITIF ideologi asing bagi negara berkembang?',
    opts: [
      'Kesenjangan sosial melebar',
      'Transfer teknologi dan inovasi',
      'Erosi nilai budaya lokal',
      'Ketergantungan ekonomi',
    ],
    correct: 1,
    why: 'Transfer teknologi dan inovasi adalah dampak positif; tiga pilihan lainnya adalah dampak negatif.',
  },
  {
    id: 80,
    q: 'Apa makna dampak positif "Transfer Teknologi & Inovasi" bagi negara berkembang?',
    opts: [
      'Mendorong masuknya modal asing dan lapangan kerja',
      'Membuka akses ke ilmu pengetahuan dan teknologi baru',
      'Memperbesar jurang antara kaya dan miskin',
      'Menggeser nilai gotong royong oleh konsumerisme',
    ],
    correct: 1,
    why: 'Transfer Teknologi & Inovasi membuka akses ke ilmu pengetahuan dan teknologi baru.',
  },
  {
    id: 81,
    q: 'Dampak positif "Investasi & Pertumbuhan Ekonomi" ditandai dengan?',
    opts: [
      'Masuknya modal asing dan lapangan kerja',
      'Berkurangnya ketergantungan pada pasar asing',
      'Menguatnya nilai gotong royong',
      'Berkurangnya jurang antara kaya dan miskin',
    ],
    correct: 0,
    why: 'Investasi & Pertumbuhan Ekonomi mendorong masuknya modal asing dan lapangan kerja.',
  },
  {
    id: 82,
    q: 'Manakah yang termasuk dampak NEGATIF ideologi asing bagi negara berkembang?',
    opts: [
      'Transfer teknologi dan inovasi',
      'Investasi dan pertumbuhan ekonomi',
      'Masuknya modal asing dan lapangan kerja',
      'Kesenjangan sosial melebar',
    ],
    correct: 3,
    why: 'Kesenjangan sosial melebar adalah dampak negatif; tiga pilihan lainnya adalah dampak positif.',
  },
  {
    id: 83,
    q: 'Dampak negatif "Kesenjangan Sosial Melebar" berarti?',
    opts: [
      'Nilai gotong royong semakin kuat',
      'Modal asing berhenti masuk ke negara',
      'Jurang kaya dan miskin semakin besar',
      'Lapangan kerja bertambah pesat',
    ],
    correct: 2,
    why: 'Kesenjangan Sosial Melebar berarti jurang antara kelompok kaya dan miskin semakin besar.',
  },
  {
    id: 84,
    q: 'Pada dampak negatif "Erosi Nilai Budaya Lokal", apa yang menggeser nilai gotong royong?',
    opts: ['Musyawarah dan mufakat bersama', 'Kepemilikan kolektif atas aset', 'Ekonomi kerakyatan Pasal 33', 'Individualisme & konsumerisme'],
    correct: 3,
    why: 'Individualisme dan konsumerisme menggeser nilai gotong royong.',
  },
  {
    id: 85,
    q: 'Dampak negatif "Ketergantungan Ekonomi" berarti negara berkembang?',
    opts: [
      'Mandiri penuh dalam hal permodalan dan pasar',
      'Terlalu bergantung pada modal dan pasar asing',
      'Menolak seluruh modal dan pasar dari luar negeri',
      'Menguasai pasar dan modal di seluruh dunia',
    ],
    correct: 1,
    why: 'Ketergantungan Ekonomi berarti ketergantungan berlebih pada modal dan pasar asing.',
  },
  {
    id: 86,
    q: 'Slide "Dampak Ideologi Asing bagi Negara Berkembang" memuat berapa dampak positif dan berapa dampak negatif?',
    opts: [
      '3 positif dan 2 negatif',
      '2 positif dan 2 negatif',
      '2 positif dan 3 negatif',
      '3 positif dan 3 negatif',
    ],
    correct: 2,
    why: 'Slide memuat 2 dampak positif (transfer teknologi, investasi) dan 3 dampak negatif (kesenjangan, erosi budaya, ketergantungan).',
  },

  // ==================== PERBANDINGAN IDEOLOGI DUNIA DENGAN PANCASILA (87-96) ====================
  {
    id: 87,
    q: 'Menurut tabel perbandingan, sumber nilai Pancasila adalah?',
    opts: [
      'Rasio & hak individu',
      'Materialisme & kelas sosial',
      'Nasionalisme ekstrem & otoritarianisme',
      'Ketuhanan, kemanusiaan & musyawarah',
    ],
    correct: 3,
    why: 'Sumber nilai Pancasila pada tabel perbandingan adalah Ketuhanan, kemanusiaan & musyawarah.',
  },
  {
    id: 88,
    q: 'Menurut tabel perbandingan, sumber nilai Komunisme adalah?',
    opts: [
      'Materialisme & kelas sosial',
      'Rasio & hak individu',
      'Ketuhanan, kemanusiaan & musyawarah',
      'Nasionalisme ekstrem & otoritarianisme',
    ],
    correct: 0,
    why: 'Sumber nilai Komunisme pada tabel perbandingan adalah materialisme & kelas sosial.',
  },
  {
    id: 89,
    q: 'Menurut tabel perbandingan, sistem ekonomi Pancasila adalah?',
    opts: [
      'Ekonomi pasar bebas tanpa campur tangan negara',
      'Ekonomi terencana secara sentralistik',
      'Ekonomi kerakyatan (Pasal 33 UUD 1945)',
      'Ekonomi kolektif yang dikuasai satu partai',
    ],
    correct: 2,
    why: 'Sistem ekonomi Pancasila adalah ekonomi kerakyatan (Pasal 33 UUD 1945).',
  },
  {
    id: 90,
    q: 'Menurut tabel perbandingan, sistem politik Pancasila adalah?',
    opts: [
      'Demokrasi liberal multipartai',
      'Demokrasi Pancasila (musyawarah mufakat)',
      'Sistem satu partai yang otoriter',
      'Pemerintahan terbatas (limited government)',
    ],
    correct: 1,
    why: 'Sistem politik Pancasila adalah Demokrasi Pancasila (musyawarah mufakat).',
  },
  {
    id: 91,
    q: 'Menurut tabel perbandingan, sistem politik Komunisme adalah?',
    opts: ['Demokrasi liberal', 'Demokrasi Pancasila', 'Satu partai / otoriter', 'Demokrasi multipartai'],
    correct: 2,
    why: 'Sistem politik Komunisme pada tabel adalah satu partai / otoriter.',
  },
  {
    id: 92,
    q: 'Menurut tabel perbandingan, HAM dalam Pancasila dipahami?',
    opts: [
      'Kebebasan individu mutlak',
      'Dibatasi kepentingan kolektif',
      'Berbasis kehendak partai tunggal',
      'Seimbang antara hak & kewajiban',
    ],
    correct: 3,
    why: 'HAM dalam Pancasila seimbang antara hak dan kewajiban.',
  },
  {
    id: 93,
    q: 'Menurut tabel perbandingan, HAM dalam Liberalisme dipahami?',
    opts: [
      'Kebebasan individu mutlak',
      'Dibatasi kepentingan kolektif',
      'Seimbang antara hak & kewajiban',
      'Ditentukan negara secara terpusat',
    ],
    correct: 0,
    why: 'Liberalisme memandang HAM sebagai kebebasan individu mutlak.',
  },
  {
    id: 94,
    q: 'Menurut tabel perbandingan, HAM dalam Komunisme dipahami?',
    opts: [
      'Kebebasan individu mutlak',
      'Seimbang antara hak & kewajiban',
      'Dibatasi kepentingan kolektif',
      'Diserahkan sepenuhnya pada pasar',
    ],
    correct: 2,
    why: 'Komunisme membatasi HAM demi kepentingan kolektif.',
  },
  {
    id: 95,
    q: 'Menurut tabel perbandingan, kepemilikan dalam Pancasila dipahami?',
    opts: [
      'Pribadi sepenuhnya, tanpa batasan sosial',
      'Kolektif, dikuasai penuh oleh negara',
      'Pribadi diakui, fungsi sosial diutamakan',
      'Dikuasai sepenuhnya oleh pemilik modal asing',
    ],
    correct: 2,
    why: 'Pancasila mengakui kepemilikan pribadi dengan mengutamakan fungsi sosial.',
  },
  {
    id: 96,
    q: 'Menurut tabel perbandingan, kepemilikan dalam Liberalisme dipahami?',
    opts: [
      'Kolektif / dikuasai negara',
      'Pribadi sepenuhnya',
      'Pribadi diakui, fungsi sosial diutamakan',
      'Dikuasai bersama oleh para buruh',
    ],
    correct: 1,
    why: 'Liberalisme memandang kepemilikan sebagai milik pribadi sepenuhnya.',
  },

  // ==================== PANCASILA: IDEOLOGI TERBUKA (97-100) ====================
  {
    id: 97,
    q: 'Menurut slide penutup, Pancasila mampu menyerap nilai-nilai baik tanpa kehilangan?',
    opts: ['Kebebasan pasar', 'Modal asing', 'Kelas sosial', 'Jati diri'],
    correct: 3,
    why: 'Pancasila mampu menyerap nilai-nilai baik tanpa kehilangan jati diri.',
  },
  {
    id: 98,
    q: 'Sebagai ideologi terbuka, apa yang dilakukan Pancasila terhadap ideologi dunia?',
    opts: [
      'Mengadopsi seluruh ideologi dunia tanpa seleksi',
      'Menyaring sisi positifnya dan menghindari sisi ekstremnya',
      'Menolak semua ideologi dunia tanpa mempelajarinya sama sekali',
      'Menyerahkan nilai-nilainya kepada ideologi dunia',
    ],
    correct: 1,
    why: 'Sebagai ideologi terbuka, Pancasila menyaring sisi positif ideologi dunia dan menghindari sisi ekstremnya.',
  },
  {
    id: 99,
    q: 'Menurut slide "Pancasila: Ideologi Terbuka di Tengah Dunia", tujuan memahami ideologi dunia adalah?',
    opts: [
      'Memperkuat keyakinan bahwa Pancasila tetap paling relevan',
      'Menggantikan Pancasila dengan salah satu ideologi dunia',
      'Menyatukan seluruh ideologi dunia menjadi satu sistem',
      'Menghapus peran Pancasila dalam kehidupan berbangsa dan bernegara',
    ],
    correct: 0,
    why: 'Memahami ideologi dunia bukan untuk menggantikan Pancasila, melainkan memperkuat keyakinan bahwa Pancasila tetap paling relevan bagi bangsa Indonesia.',
  },
  {
    id: 100,
    q: 'Tiga langkah pada slide "Pancasila: Ideologi Terbuka di Tengah Dunia" secara berurutan adalah?',
    opts: [
      'Bandingkan, Kenali, Perkuat',
      'Kenali, Perkuat, Bandingkan',
      'Perkuat, Bandingkan, Kenali',
      'Kenali, Bandingkan, Perkuat',
    ],
    correct: 3,
    why: 'Urutan tiga langkah pada slide: 1 Kenali, 2 Bandingkan, 3 Perkuat.',
  },
];

/**
 * Mengacak urutan opsi jawaban sebuah soal dan menyesuaikan index jawaban
 * benarnya. WAJIB dipanggil setiap kali soal ditampilkan ke pemain — ini
 * mencegah pemain menghafal/menebak pola posisi jawaban (mis. "jawaban
 * benar selalu di opsi A/B") alih-alih benar-benar tahu materinya.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const indices = question.opts.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return {
    ...question,
    opts: indices.map((i) => question.opts[i]) as [string, string, string, string],
    correct: indices.indexOf(question.correct),
  };
}

export function getRandomQuestion(usedIds: number[] = []): Question {
  const available = QUESTIONS.filter((q) => !usedIds.includes(q.id));
  const pool = available.length === 0 ? QUESTIONS : available;
  const randomIndex = Math.floor(Math.random() * pool.length);
  // Selalu kembalikan versi ter-shuffle agar posisi jawaban benar tidak bisa ditebak dari pola.
  return shuffleQuestionOptions(pool[randomIndex]);
}