/* =====================================================================
   KOPI BANUA — js/script.js
   Dipanggil SETELAH js/data.js, sehingga variabel produk, formatRupiah,
   hitungSubtotal, cariProduk, ambilPesanan, dan amankanTeks sudah tersedia.
   ===================================================================== */


/* =====================================================================
   1. MERENDER KARTU MENU DARI ARRAY (Pertemuan 10)
   ===================================================================== */
const wadah = document.querySelector(".grid-menu");
const pesanMenuKosong = document.querySelector(".menu-kosong");

function tampilkanProduk(daftar) {
  wadah.innerHTML = ""; // kosongkan dulu agar tidak menumpuk saat filter

  daftar.forEach(function (p) {
    // Produk dari dashboard admin (isian pengguna) bisa berisi karakter HTML,
    // karena itu seluruh teksnya diamankan sebelum masuk innerHTML.
    const nama = amankanTeks(p.nama);
    wadah.innerHTML += `
      <article class="kartu-menu">
        <img src="${amankanTeks(p.gambar)}" alt="${nama}" width="800" height="600" loading="lazy">
        <p class="kategori">${amankanTeks(p.kategori)}</p>
        <h3>${nama}</h3>
        <p>${amankanTeks(p.deskripsi)}</p>
        <p class="harga">${formatRupiah(p.harga)}</p>
        <a class="tombol tombol-utama" href="#pesan" data-id="${p.id}">Pesan menu ini</a>
      </article>`;
  });

  pesanMenuKosong.hidden = daftar.length > 0;
}


/* =====================================================================
   2. FILTER KATEGORI, PENCARIAN, DAN PENGURUTAN (Pertemuan 10 + tugas BT)
   ===================================================================== */
const tombolFilter = document.querySelectorAll(".filter button");
const kotakCari = document.querySelector("#cari-menu");
const pilihUrutan = document.querySelector("#urutkan");

// Keadaan tampilan saat ini disimpan di satu objek
const keadaan = { kategori: "semua", kata: "", urutan: "bawaan" };

function terapkanTampilan() {
  let hasil = produk;

  if (keadaan.kategori !== "semua") {
    hasil = hasil.filter((p) => p.kategori === keadaan.kategori);
  }

  if (keadaan.kata !== "") {
    hasil = hasil.filter((p) => p.nama.toLowerCase().includes(keadaan.kata));
  }

  // slice() membuat salinan, agar array produk asli tidak ikut terurut
  if (keadaan.urutan === "termurah") {
    hasil = hasil.slice().sort((a, b) => a.harga - b.harga);
  } else if (keadaan.urutan === "termahal") {
    hasil = hasil.slice().sort((a, b) => b.harga - a.harga);
  }

  tampilkanProduk(hasil);
}

tombolFilter.forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    keadaan.kategori = tombol.dataset.kategori;

    // tandai tombol yang sedang aktif
    tombolFilter.forEach(function (t) {
      const aktif = t === tombol;
      t.classList.toggle("aktif", aktif);
      t.setAttribute("aria-pressed", aktif);
    });

    terapkanTampilan();
  });
});

kotakCari.addEventListener("input", function () {
  keadaan.kata = kotakCari.value.trim().toLowerCase();
  terapkanTampilan();
});

pilihUrutan.addEventListener("change", function () {
  keadaan.urutan = pilihUrutan.value;
  terapkanTampilan();
});

terapkanTampilan(); // tampilkan semua saat halaman dibuka



/* 3. MENU HAMBURGER */

const tombolMenu = document.querySelector(".tombol-menu");
const daftarNav = document.querySelector("#menu-utama");

function aturMenu(terbuka) {
    daftarNav.classList.toggle("tampil", terbuka);
    tombolMenu.setAttribute("aria-expanded", terbuka);
}

tombolMenu.addEventListener("click", function () {
    aturMenu(!daftarNav.classList.contains("tampil"));
});

// Tutup menu setelah tautan diklik
daftarNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
        aturMenu(false);
    }
});

// Tutup dengan tombol Escape
document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
        aturMenu(false);
    }
});

// Tutup menu ketika layar berubah menjadi tablet/desktop
window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
        aturMenu(false);
    }
});



/* =====================================================================
   4. MODE GELAP + DINGAT DI localStorage (Pertemuan 10 dan 11)
   ===================================================================== */
const tombolTema = document.querySelector(".tombol-tema");
const KUNCI_TEMA = "temaKopiBanua";

function terapkanTema(gelap) {
  document.body.classList.toggle("gelap", gelap);
  tombolTema.setAttribute("aria-pressed", gelap);
  tombolTema.querySelector("[aria-hidden]").innerHTML = gelap ? "&#9728;" : "&#9790;";
}

tombolTema.addEventListener("click", function () {
  const gelap = !document.body.classList.contains("gelap");
  terapkanTema(gelap);
  localStorage.setItem(KUNCI_TEMA, gelap ? "gelap" : "terang");
});

terapkanTema(localStorage.getItem(KUNCI_TEMA) === "gelap");


/* =====================================================================
   5. FORM PEMESANAN: PILIHAN MENU DAN PERKIRAAN TOTAL (Pertemuan 10, 11)
   ===================================================================== */
const form = document.querySelector("#form-pesan");
const pilihMenu = document.querySelector("#pilih-menu");
const kotakGalat = document.querySelector("#pesan-galat");
const kotakSukses = document.querySelector("#pesan-sukses");
const perkiraanTotal = document.querySelector("#perkiraan-total");

// Validasi lapis 2 dari JavaScript: matikan gelembung pesan bawaan
form.noValidate = true;

// Isi pilihan menu otomatis dari array produk
produk.forEach(function (p) {
  const opsi = document.createElement("option");
  opsi.value = p.id;
  opsi.textContent = p.nama + " — " + formatRupiah(p.harga);
  pilihMenu.appendChild(opsi);
});

function hitungPerkiraan() {
  const p = cariProduk(Number(pilihMenu.value));
  const jumlah = Number(form.jumlah.value);
  const total = p && jumlah > 0 ? hitungSubtotal(p.harga, jumlah) : 0;
  perkiraanTotal.textContent = formatRupiah(total);
}

form.addEventListener("input", hitungPerkiraan);

// Tombol "Pesan menu ini" pada kartu langsung memilihkan menunya.
// Satu penangan untuk seluruh kartu (event delegation).
wadah.addEventListener("click", function (e) {
  const tautan = e.target.closest("a[data-id]");
  if (!tautan) return;
  pilihMenu.value = tautan.dataset.id;
  hitungPerkiraan();
});


/* =====================================================================
   6. VALIDASI FORM (Pertemuan 11)
   ===================================================================== */
function tandaiIsian(isian, salah) {
  if (salah) {
    isian.setAttribute("aria-invalid", "true");
  } else {
    isian.removeAttribute("aria-invalid");
  }
}

function tampilkanGalat(galat) {
  kotakGalat.innerHTML =
    "<p><strong>Periksa kembali isian berikut:</strong></p>" +
    "<ul><li>" + galat.join("</li><li>") + "</li></ul>";
  kotakGalat.hidden = false;
  kotakGalat.focus(); // pindahkan fokus agar pembaca layar langsung membacanya
}

form.addEventListener("submit", function (e) {
  e.preventDefault(); // tahan pengiriman, proses sendiri
  const galat = [];
  kotakSukses.hidden = true;

  const nama = form.nama.value.trim();
  const wa = form.wa.value.trim();
  const idMenu = form.menu.value;
  const jumlah = Number(form.jumlah.value);
  const catatan = form.catatan.value.trim();

  const namaSalah = nama.length < 3;
  const waSalah = !/^08[0-9]{8,11}$/.test(wa);
  const menuSalah = idMenu === "";
  const jumlahSalah = !Number.isInteger(jumlah) || jumlah < 1 || jumlah > 20;

  if (namaSalah) galat.push("Nama minimal 3 huruf.");
  if (waSalah) galat.push("Nomor WhatsApp harus diawali 08 dan terdiri atas 10 sampai 13 digit.");
  if (menuSalah) galat.push("Pilih salah satu menu.");
  if (jumlahSalah) galat.push("Jumlah harus bilangan bulat antara 1 sampai 20.");
  if (catatan.length > 200) galat.push("Catatan maksimal 200 karakter.");

  tandaiIsian(form.nama, namaSalah);
  tandaiIsian(form.wa, waSalah);
  tandaiIsian(form.menu, menuSalah);
  tandaiIsian(form.jumlah, jumlahSalah);

  if (galat.length > 0) {
    tampilkanGalat(galat); // ada kesalahan: tampilkan, jangan lanjut
    return;
  }

  kotakGalat.innerHTML = "";
  kotakGalat.hidden = true;
  simpanPesanan(nama, wa, idMenu, jumlah, form.cara.value, catatan);
});


/* =====================================================================
   7. MENYIMPAN PESANAN KE localStorage (Pertemuan 11)
   ===================================================================== */
function simpanPesanan(nama, wa, idMenu, jumlah, cara, catatan) {
  const p = cariProduk(Number(idMenu));

  const baru = {
    id: Date.now(),                      // angka milidetik sebagai id unik
    nama: nama,
    wa: wa,
    menu: p.nama,
    jumlah: jumlah,
    total: hitungSubtotal(p.harga, jumlah),
    waktu: new Date().toISOString(),
    status: "Baru",                      // diubah dari dashboard admin (Pertemuan 14)
    cara: cara,
    catatan: catatan
  };

  const semua = ambilPesanan();
  semua.push(baru);
  simpanSemuaPesanan(semua);

  form.reset();
  hitungPerkiraan();
  kotakSukses.textContent =
    "Terima kasih, " + nama + "! Pesanan " + p.nama +
    " sebanyak " + jumlah + " tersimpan. Total " + formatRupiah(baru.total) + ".";
  kotakSukses.hidden = false;

  tampilkanPesanan();
}


/* =====================================================================
   8. MENAMPILKAN DAN MENGHAPUS PESANAN (Pertemuan 11)
   ===================================================================== */
const tbody = document.querySelector("#tabel-pesanan tbody");
const sel = {
  total: document.querySelector("#total-semua"),
  jumlah: document.querySelector("#jumlah-pesanan"),
  kosong: document.querySelector(".tabel-kosong"),
  tombolKosongkan: document.querySelector("#kosongkan")
};

function formatWaktu(iso) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
  });
}

function tampilkanPesanan() {
  // Terbaru di atas: id berasal dari Date.now(), jadi urut id = urut waktu.
  const semua = ambilPesanan().sort((a, b) => b.id - a.id);
  tbody.innerHTML = "";

  semua.forEach(function (p) {
    const status = p.status || "Baru";
    tbody.innerHTML += `
      <tr>
        <td>${formatWaktu(p.waktu)}</td>
        <td>${amankanTeks(p.nama)}</td>
        <td>${amankanTeks(p.menu)}</td>
        <td class="angka">${p.jumlah}</td>
        <td class="angka">${formatRupiah(p.total)}</td>
        <td><span class="status status-${amankanTeks(status)}">${amankanTeks(status)}</span></td>
        <td><button type="button" class="tombol-hapus" data-id="${p.id}">Hapus</button></td>
      </tr>`;
  });

  // Ringkasan di kaki tabel (tugas BT Pertemuan 11)
  const totalSemua = semua.reduce((jumlah, p) => jumlah + p.total, 0);
  sel.total.textContent = formatRupiah(totalSemua);
  sel.jumlah.textContent = semua.length + " pesanan";

  sel.kosong.hidden = semua.length > 0;
  sel.tombolKosongkan.hidden = semua.length === 0;
}

// Satu penangan untuk seluruh tombol hapus (event delegation)
tbody.addEventListener("click", function (e) {
  if (!e.target.classList.contains("tombol-hapus")) return;
  const id = Number(e.target.dataset.id);
  const sisa = ambilPesanan().filter((p) => p.id !== id);
  simpanSemuaPesanan(sisa);
  tampilkanPesanan();
});

sel.tombolKosongkan.addEventListener("click", function () {
  if (confirm("Hapus seluruh pesanan yang tersimpan di peramban ini?")) {
    localStorage.removeItem(KUNCI_PESANAN);
    tampilkanPesanan();
  }
});

tampilkanPesanan(); // tampilkan saat halaman dibuka


/* =====================================================================
   9. TAHUN HAK CIPTA OTOMATIS
   ===================================================================== */
document.querySelector("#tahun").textContent = new Date().getFullYear();