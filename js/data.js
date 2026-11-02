/* =====================================================================
   KOPI BANUA — js/data.js
   ---------------------------------------------------------------------
   Pertemuan 9  : data dipisahkan dari tampilan (array berisi object).
   Pertemuan 11 : data dapat dibaca kembali dari localStorage.
   Pertemuan 14 : berkas ini DISALIN apa adanya ke proyek kopi-banua-admin,
                  sehingga etalase dan dashboard memakai sumber data yang sama.

   Menambah menu baru cukup menambahkan satu object pada produkAwal.
   HTML tidak perlu disentuh sama sekali.
   ===================================================================== */

/* Kunci penyimpanan yang disepakati bersama oleh kedua proyek.
   Jangan diubah — dashboard admin membaca kunci yang persis sama. */
const KUNCI_PESANAN = "pesananKopiBanua";
const KUNCI_PRODUK = "produkKopiBanua";

/* Daftar produk bawaan. Dipakai selama admin belum pernah mengubah produk. */
const produkAwal = [
  { id: 1,  nama: "Kopi Susu Gula Aren", harga: 18000, kategori: "Kopi",
    gambar: "img/kopi-susu.jpg",
    deskripsi: "Espresso robusta, susu segar, dan gula aren Kandangan." },

  { id: 2,  nama: "Americano Panas", harga: 15000, kategori: "Kopi",
    gambar: "img/americano.jpg",
    deskripsi: "Espresso ganda dengan air panas. Pahit bersih tanpa gula." },

  { id: 3,  nama: "Kopi Tubruk Banua", harga: 12000, kategori: "Kopi",
    gambar: "img/kopi-tubruk.jpg",
    deskripsi: "Robusta Pengaron diseduh tubruk, disajikan dengan gula terpisah." },

  { id: 4,  nama: "Cappuccino", harga: 20000, kategori: "Kopi",
    gambar: "img/cappuccino.jpg",
    deskripsi: "Espresso dengan busa susu tebal dan taburan bubuk kakao." },

  { id: 5,  nama: "Es Kopi Pandan", harga: 20000, kategori: "Kopi",
    gambar: "img/kopi-pandan.jpg",
    deskripsi: "Kopi susu dingin dengan sirup pandan wangi buatan sendiri." },

  { id: 6,  nama: "Teh Tarik", harga: 14000, kategori: "Non-Kopi",
    gambar: "img/teh-tarik.jpg",
    deskripsi: "Teh susu khas yang ditarik hingga berbusa lembut." },

  { id: 7,  nama: "Cokelat Panas", harga: 17000, kategori: "Non-Kopi",
    gambar: "img/cokelat.jpg",
    deskripsi: "Cokelat pekat dengan susu segar, manis yang pas." },

  { id: 8,  nama: "Es Jeruk Peras", harga: 12000, kategori: "Non-Kopi",
    gambar: "img/es-jeruk.jpg",
    deskripsi: "Jeruk peras segar tanpa pemanis buatan." },

  { id: 9,  nama: "Teh Serai Madu", harga: 15000, kategori: "Non-Kopi",
    gambar: "img/teh-serai.jpg",
    deskripsi: "Teh hangat dengan serai dan madu hutan Kalimantan." },

  { id: 10, nama: "Roti Bakar Srikaya", harga: 16000, kategori: "Camilan",
    gambar: "img/roti-bakar.jpg",
    deskripsi: "Roti bakar isi srikaya buatan sendiri." },

  { id: 11, nama: "Pisang Goreng Keju", harga: 15000, kategori: "Camilan",
    gambar: "img/pisang-goreng.jpg",
    deskripsi: "Pisang kepok goreng renyah dengan parutan keju." },

  { id: 12, nama: "Wadai Bingka Kentang", harga: 10000, kategori: "Camilan",
    gambar: "img/bingka.jpg",
    deskripsi: "Kue tradisional Banjar yang lembut dan harum." }
];

/* Pertemuan 11 — bila admin sudah pernah menambah atau menghapus produk,
   daftar terbaru tersimpan di localStorage. Bila belum, pakai produkAwal.
   Tanda || berarti "atau": getItem mengembalikan null saat kosong. */
const produk = JSON.parse(localStorage.getItem(KUNCI_PRODUK)) || produkAwal;

/* ---------- Fungsi bantu yang dipakai kedua proyek (Pertemuan 9) ---------- */

/* Memformat angka menjadi rupiah: 18000 -> "Rp 18.000" */
function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

/* Menghitung subtotal satu baris pesanan */
function hitungSubtotal(harga, jumlah) {
  return harga * jumlah;
}

/* Mencari satu produk berdasarkan id */
function cariProduk(id) {
  return produk.find((p) => p.id === id);
}

/* Membaca seluruh pesanan, mengembalikan array kosong bila belum ada */
function ambilPesanan() {
  return JSON.parse(localStorage.getItem(KUNCI_PESANAN)) || [];
}

/* Menyimpan seluruh array pesanan kembali ke localStorage */
function simpanSemuaPesanan(daftar) {
  localStorage.setItem(KUNCI_PESANAN, JSON.stringify(daftar));
}

/* Pertemuan 10 — textContent vs innerHTML.
   Setiap teks yang berasal dari ISIAN PENGGUNA wajib diamankan dulu
   sebelum disisipkan lewat innerHTML, agar tag yang diketik pengguna
   tidak ikut dijalankan sebagai HTML. */
function amankanTeks(teks) {
  return String(teks)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}