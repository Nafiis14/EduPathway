// Data roadmap di-hardcode langsung di dalam aplikasi (sesuai konsep "Offline
// Roadmap & Checklist") sehingga tidak butuh koneksi internet untuk berjalan.
// Setiap task punya kategori supaya checklist di Dashboard bisa dikelompokkan.

export const COUNTRIES = [
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    tagline: 'Favorit untuk jurusan teknik, bisnis, dan IT',
    agent: 'IDP Indonesia',
    tasks: [
      { id: 'ielts', category: 'Bahasa', label: 'Tes IELTS / PTE Academic' },
      { id: 'ijazah', category: 'Dokumen', label: 'Terjemahan & legalisasi ijazah' },
      { id: 'transkrip', category: 'Dokumen', label: 'Terjemahan transkrip nilai' },
      { id: 'sop', category: 'Akademik', label: 'Menyusun Statement of Purpose (SOP)' },
      { id: 'rekomendasi', category: 'Akademik', label: 'Surat rekomendasi dosen' },
      { id: 'loa', category: 'Dokumen', label: 'Letter of Offer (LoA) dari kampus' },
      { id: 'finansial', category: 'Finansial', label: 'Bukti keuangan (financial statement)' },
      { id: 'oshc', category: 'Finansial', label: 'Asuransi kesehatan OSHC' },
      { id: 'visa', category: 'Visa', label: 'Pengajuan visa pelajar (Subclass 500)' },
    ],
  },
  {
    id: 'inggris',
    name: 'Inggris',
    flag: '🇬🇧',
    tagline: 'Program S2 satu tahun, kampus tua & bersejarah',
    agent: 'IDP Indonesia',
    tasks: [
      { id: 'ielts', category: 'Bahasa', label: 'Tes IELTS UKVI' },
      { id: 'ijazah', category: 'Dokumen', label: 'Terjemahan & legalisasi ijazah' },
      { id: 'transkrip', category: 'Dokumen', label: 'Terjemahan transkrip nilai' },
      { id: 'personal-statement', category: 'Akademik', label: 'Menyusun personal statement' },
      { id: 'rekomendasi', category: 'Akademik', label: 'Surat rekomendasi akademik' },
      { id: 'cas', category: 'Dokumen', label: 'Confirmation of Acceptance (CAS)' },
      { id: 'finansial', category: 'Finansial', label: 'Bukti keuangan sesuai syarat UKVI' },
      { id: 'tb-test', category: 'Kesehatan', label: 'Tes TB (tuberkulosis) di klinik resmi' },
      { id: 'visa', category: 'Visa', label: 'Pengajuan Student Visa (Tier 4)' },
    ],
  },
  {
    id: 'jerman',
    name: 'Jerman',
    flag: '🇩🇪',
    tagline: 'Kuliah nyaris bebas biaya di universitas negeri',
    agent: 'DAAD Information Point',
    tasks: [
      { id: 'testdaf', category: 'Bahasa', label: 'Sertifikat bahasa (TestDaF / Goethe)' },
      { id: 'aps', category: 'Dokumen', label: 'Sertifikat APS (Akademische Prüfstelle)' },
      { id: 'ijazah', category: 'Dokumen', label: 'Terjemahan & legalisasi ijazah' },
      { id: 'motivasi', category: 'Akademik', label: 'Menyusun surat motivasi' },
      { id: 'uni-assist', category: 'Akademik', label: 'Pendaftaran lewat uni-assist' },
      { id: 'blocked-account', category: 'Finansial', label: 'Membuka blocked account' },
      { id: 'asuransi', category: 'Finansial', label: 'Asuransi kesehatan mahasiswa' },
      { id: 'visa', category: 'Visa', label: 'Pengajuan visa nasional (D-Visa)' },
    ],
  },
  {
    id: 'jepang',
    name: 'Jepang',
    flag: '🇯🇵',
    tagline: 'Beasiswa MEXT dan riset teknologi terapan',
    agent: 'Konsuler Pendidikan Jepang',
    tasks: [
      { id: 'jlpt', category: 'Bahasa', label: 'Sertifikat JLPT (opsional, tergantung jurusan)' },
      { id: 'eju', category: 'Akademik', label: 'Tes EJU untuk jenjang S1' },
      { id: 'ijazah', category: 'Dokumen', label: 'Terjemahan & legalisasi ijazah' },
      { id: 'motivasi', category: 'Akademik', label: 'Menyusun surat motivasi & rencana studi' },
      { id: 'coe', category: 'Dokumen', label: 'Certificate of Eligibility (CoE)' },
      { id: 'finansial', category: 'Finansial', label: 'Bukti keuangan / sponsor beasiswa' },
      { id: 'visa', category: 'Visa', label: 'Pengajuan visa pelajar ke kedutaan' },
    ],
  },
  {
    id: 'amerika',
    name: 'Amerika Serikat',
    flag: '🇺🇸',
    tagline: 'Ribuan pilihan kampus dan peluang beasiswa riset',
    agent: 'EducationUSA',
    tasks: [
      { id: 'toefl', category: 'Bahasa', label: 'Tes TOEFL iBT / Duolingo English Test' },
      { id: 'sat-gre', category: 'Akademik', label: 'Tes SAT (S1) atau GRE/GMAT (S2)' },
      { id: 'ijazah', category: 'Dokumen', label: 'Terjemahan & legalisasi ijazah' },
      { id: 'essay', category: 'Akademik', label: 'Menyusun essay & personal statement' },
      { id: 'rekomendasi', category: 'Akademik', label: 'Surat rekomendasi dosen/guru' },
      { id: 'i20', category: 'Dokumen', label: 'Menerima Form I-20 dari kampus' },
      { id: 'finansial', category: 'Finansial', label: 'Bukti keuangan (affidavit of support)' },
      { id: 'sevis', category: 'Visa', label: 'Bayar SEVIS fee' },
      { id: 'visa', category: 'Visa', label: 'Wawancara visa F-1 di kedutaan' },
    ],
  },
]

export function getCountryById(id) {
  return COUNTRIES.find((c) => c.id === id) || null
}
