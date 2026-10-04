# Mini Canva: Frontend

Editor canvas sederhana seperti Canva mini. Pengguna membuat canvas dengan ukuran sendiri (misalnya 1920 × 1080 px), menambahkan elemen teks, gambar, dan button, mengatur propertinya lewat sidebar, lalu mem-publish hasilnya ke backend.

Aplikasi ini adalah **frontend**. Backend (Express + Prisma + PostgreSQL) ada di repo/folder terpisah dan harus berjalan agar fitur buat canvas dan publish berfungsi.

## Fitur

- Buat canvas dengan lebar dan tinggi sendiri (100 sampai 5000 px)
- Tambah elemen **teks**, **gambar**, dan **button** lewat toolbar
- Klik elemen untuk memilihnya, drag untuk memindahkan, tarik handle untuk resize
- Double-click teks atau button untuk mengedit isinya langsung di canvas
- Double-click gambar untuk mengganti file gambar
- Sidebar properti untuk elemen yang dipilih
- Bring to front, Send to back, dan Delete
- Publish: simpan draft ke backend lalu buat versi baru

## Teknologi

- [Next.js](https://nextjs.org/) + TypeScript
- [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS
- [Zustand](https://zustand.docs.pmnd.rs/) untuk state editor (dengan `persist` ke localStorage)
- [react-rnd](https://github.com/bokuweb/react-rnd) untuk drag dan resize
- [Tabler Icons](https://tabler.io/icons)
- pnpm sebagai package manager

## Prasyarat

- Node.js 20 atau lebih baru
- pnpm (`npm i -g pnpm`)
- Backend sudah berjalan (lihat README di folder backend), secara bawaan di `http://localhost:4000`

## Setup

1. Clone repo dan masuk ke folder frontend:

   ```bash
   git clone <url-repo>
   cd frontend
   ```

2. Install dependensi:

   ```bash
   pnpm install
   ```

3. Buat file `.env.local` di root folder frontend:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```

   Ganti nilainya kalau backend berjalan di alamat atau port lain. Setiap kali file ini diubah, **restart** `pnpm dev`, karena variabel `NEXT_PUBLIC_*` hanya dibaca saat server dijalankan.

4. Jalankan mode development:

   ```bash
   pnpm dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000).

## Script

| Perintah     | Fungsi                         |
| ------------ | ------------------------------ |
| `pnpm dev`   | Menjalankan server development |
| `pnpm build` | Build untuk production         |
| `pnpm start` | Menjalankan hasil build        |
| `pnpm lint`  | Menjalankan linter             |

## Cara pakai

1. **Buat canvas**: klik **Create Canvas**, isi lebar dan tinggi (100 sampai 5000 px), lalu klik **Create**. Canvas dibuat di backend dan langsung tampil di editor.
2. **Tambah elemen**: gunakan ikon di toolbar atas.
   - Ikon teks menambah elemen teks.
   - Ikon gambar membuka dialog pilih file, lalu elemen gambar ditambahkan dengan gambar itu.
   - Ikon klik menambah button.
3. **Pilih dan pindahkan**: klik elemen untuk memilihnya (muncul garis biru), lalu drag untuk memindahkannya. Klik area kosong untuk membatalkan pilihan.
4. **Edit isi**:
   - Double-click teks untuk mengubah tulisan. `Esc` atau klik di luar untuk selesai.
   - Double-click button untuk mengubah label. `Enter` atau `Esc` untuk selesai.
   - Double-click gambar untuk mengganti file gambarnya.
5. **Atur properti** lewat sidebar:
   - Teks: warna dan ukuran font
   - Button: warna teks, warna latar, ukuran font, dan Action ID (id aksi yang disimpan ke backend, misalnya `next-page`)
   - Semua elemen: `x`, `y`, `width`, `height`
6. **Urutan tumpukan**: gunakan tombol layer di sidebar untuk _Bring to front_ atau _Send to back_.
7. **Hapus**: tombol tempat sampah di sidebar.
8. **Publish**: klik **Publish**. Draft terbaru disimpan, lalu dibuat versi baru (1, 2, 3, ...). Mengedit draft setelah publish **tidak** mengubah versi yang sudah dipublish sampai kamu publish lagi.

## Aturan yang diterapkan backend

- Satu canvas maksimal **20 elemen**.
- Elemen harus berada **di dalam area canvas** (`x`, `y`, `x + width`, dan `y + height` tidak boleh keluar batas).

Kalau aturan dilanggar, Publish gagal dan pesan error dari backend ditampilkan.

## Catatan penting

- **Penyimpanan lokal**: canvas yang sedang dikerjakan disimpan di localStorage browser (key `editor-storage`) supaya tidak hilang saat halaman di-refresh. Membuat canvas baru menimpa yang lama di sisi frontend (data di backend tetap ada).
- **Gambar** saat ini disimpan sebagai data URL (base64) langsung di elemen, dengan batas **1 MB per gambar**. Penyimpanan file ke storage terpisah belum ada.
- Elemen yang terlalu besar atau berada di luar canvas akan ditolak backend saat Publish.

## Troubleshooting

| Masalah                                              | Penyebab dan solusi                                                                                                                             |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `Failed to fetch` saat Create atau Publish           | Backend belum jalan, atau `NEXT_PUBLIC_API_URL` salah. Cek backend, lalu restart `pnpm dev` setelah mengubah `.env.local`.                      |
| Error CORS di console                                | Origin frontend belum diizinkan backend. Samakan `CORS_ORIGIN` di backend dengan alamat frontend (`http://localhost:3000`).                     |
| Publish ke `/screens/undefined`                      | Data lama di localStorage tidak punya `id`. Hapus key `editor-storage` (DevTools → Application → Local Storage), reload, lalu buat canvas baru. |
| Pesan "keluar dari canvas" atau "Maksimal 20 elemen" | Itu aturan backend. Pindahkan elemen ke dalam canvas atau kurangi jumlah elemen.                                                                |
| Gambar tidak mau dipilih                             | Ukuran file di atas 1 MB, atau format selain PNG, JPEG, WebP, dan GIF.                                                                          |
| Elemen button lama tampil tanpa warna                | Dibuat sebelum field warna ditambahkan. Hapus elemennya dan buat ulang, atau hapus `editor-storage`.                                            |
