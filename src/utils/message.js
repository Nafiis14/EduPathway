// Merakit teks template lalu mengarahkan pengguna ke aplikasi WhatsApp/Email
// bawaan perangkat. Tidak ada data yang dikirim ke server mana pun — link
// wa.me dan mailto: dibuka langsung dari browser pengguna.

export function buildMessageText({ name, major, country, agent }) {
  const namePart = name?.trim() || '[Nama Anda]'
  const majorPart = major?.trim() || '[Jurusan Anda]'

  return [
    `Selamat siang,`,
    ``,
    `Perkenalkan, saya ${namePart}, mahasiswa jurusan ${majorPart}.`,
    `Saya sedang mempersiapkan rencana studi ke ${country} dan ingin `
      + `berkonsultasi lebih lanjut mengenai jalur pendaftaran serta `
      + `dokumen yang perlu saya siapkan melalui ${agent}.`,
    ``,
    `Mohon informasi mengenai jadwal konsultasi yang tersedia. `
      + `Terima kasih atas waktu dan bantuannya.`,
    ``,
    `Hormat saya,`,
    namePart,
  ].join('\n')
}

export function buildWhatsAppLink(text, phoneNumber) {
  const encoded = encodeURIComponent(text)
  // Kalau ada nomor tujuan, langsung buka chat ke nomor itu. Kalau tidak
  // ada (fallback), WhatsApp akan minta pengguna pilih kontak sendiri.
  if (phoneNumber) {
    return `https://wa.me/${phoneNumber}?text=${encoded}`
  }
  return `https://wa.me/?text=${encoded}`
}

export function buildEmailLink({ subject, body }) {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}