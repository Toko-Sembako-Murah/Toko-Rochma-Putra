let keranjang = [];
let total = 0;

function tampilkan(bagian) {
  document.getElementById('beranda').style.display = 'none';
  document.getElementById('produk').style.display = 'none';
  document.getElementById('keranjang').style.display = 'none';
  document.getElementById(bagian).style.display = 'block';
}

function tambahKeKeranjang(nama, harga) {
  const existingIndex = keranjang.findIndex(item => item.nama === nama);
  if (existingIndex !== -1) {
    keranjang[existingIndex].jumlah += 1;
  } else {
    keranjang.push({ nama, harga, jumlah: 1 });
  }
  updateKeranjang();
  tampilkan('keranjang');
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  updateKeranjang();
}

function ubahJumlahKeranjang(index, delta) {
  keranjang[index].jumlah += delta;
  if (keranjang[index].jumlah < 1) keranjang[index].jumlah = 1;
  updateKeranjang();
}

function updateKeranjang() {
  const daftar = document.getElementById('daftarKeranjang');
  daftar.innerHTML = '';
  total = 0;
  let pesan = 'Halo saya ingin memesan produk:%0A';

  keranjang.forEach((item, index) => {
    const subtotal = item.harga * item.jumlah;
    total += subtotal;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.nama}</td>
      <td>Rp${item.harga}</td>
      <td>
        <div class="qty-container">
          <button class="qty-btn btn-sm" onclick="ubahJumlahKeranjang(${index}, -1)">-</button>
          <span>${item.jumlah}</span>
          <button class="qty-btn btn-sm" onclick="ubahJumlahKeranjang(${index}, 1)">+</button>
        </div>
      </td>
      <td>Rp${subtotal}</td>
      <td><span class="hapus-btn" onclick="hapusItem(${index})">🗑️</span></td>
    `;
    daftar.appendChild(row);
    pesan += `- ${item.nama} x ${item.jumlah} = Rp${subtotal}%0A`;
  });

  document.getElementById('totalHarga').textContent = total;
  pesan += `Total: Rp${total}`;
  document.getElementById('link-wa').href = "https://wa.me/6281330753605?text=" + pesan;
}

function filterProduk() {
  const input = document.getElementById('pencarianProduk');
  const filter = input.value.toLowerCase();
  const produkList = document.getElementById('daftarProdukList');
  const produkItems = produkList.getElementsByClassName('produk-item');

  for (let i = 0; i < produkItems.length; i++) {
    const namaProduk = produkItems[i].querySelector('h4').textContent;
    if (namaProduk.toLowerCase().indexOf(filter) > -1) {
      produkItems[i].style.display = "";
    } else {
      produkItems[i].style.display = "none";
    }
  }
}

tampilkan('beranda');
