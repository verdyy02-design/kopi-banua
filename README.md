# Kopi Banua

Website kedai kopi **Kopi Banua**, kopi robusta asli Banjarmasin yang disangrai setiap pagi. Projek ini dibuat untuk memenuhi tugas mata kuliah **WEB1**.

## Fitur

- Halaman utama dengan navigasi ke setiap bagian
- Tentang Kami, Menu Favorit, Menu Lainnya, dan Snack lengkap dengan harga
- Pencarian menu berdasarkan kata kunci (`cari_menu.php`)
- Form pemesanan menu (`proses_pesan.php`):
  - validasi data di sisi server
  - perhitungan subtotal dan total bayar
  - diskon promo 10% untuk kopi susu dan roti bakar
  - pesanan tersimpan otomatis ke `pesanan.csv`
- Jam operasional
- Galeri foto, video proses sangrai, dan peta lokasi (Google Maps)
- Kontak: email, WhatsApp, dan alamat

## Teknologi

- HTML5
- CSS
- JavaScript
- PHP

## Struktur Folder

```
kopi-banua/
├── css/
│   └── style.css
├── img/                 # logo, foto menu, foto galeri, video
├── js/
│   └── script.js
├── index.html           # halaman utama
└── README.md
```
## Struktur Berkas

index.html, css/style.css, js/script.js, img/, dokumentasi/

## Cara Menjalankan

File PHP tidak bisa dijalankan dengan cara klik dua kali atau Live Server, jadi harus lewat server PHP.

**Opsi 1: XAMPP / Laragon**

1. Pindahkan folder `kopi-banua` ke `htdocs` (XAMPP) atau `www` (Laragon).
2. Jalankan Apache.
3. Buka `http://localhost/kopi-banua/` di browser.

**Opsi 2: Server bawaan PHP**

1. Buka terminal di folder `kopi-banua`.
2. Jalankan:
   ```
   php -S localhost:8000
   ```
3. Buka `http://localhost:8000` di browser.

## Catatan

- Daftar menu dan harga di `proses_pesan.php` dan `cari_menu.php` ditulis manual dalam array. Jika menu di `index.html` diubah, kedua file PHP ini juga perlu diperbarui.
- Data pesanan di `pesanan.csv` bisa dibuka dengan Excel atau Google Sheets.

## Pembuat

- **Nama:** Muhammad Vierdian Aguina
- **NIM:**\\ 2510020107
- **Program Studi:** Sistem Informasi
- **Kampus:** Universitas Islam Kalimantan Muhammad Arsyad Al-Banjari (UNISKA MAB)
- **Mata Kuliah:** WEB1