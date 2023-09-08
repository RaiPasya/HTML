document.addEventListener("DOMContentLoaded", function () {
  function hitungTotalDanDiskon() {
    const hargaPerItem = document.getElementsByClassName("vvv");
    const jumlahPesan = document.getElementsByClassName("aaa");
    const resultJumlah = document.getElementById("resultJ");
    const resultTotal = document.getElementById("resultT");
    const resultDiskon = document.getElementById("resultD");
    const uangAwal = parseFloat(document.getElementById("uangAwal").value);
    const resultUangKembalian = document.getElementById("resultU");

    let total = 0;
    for (let i = 0; i < hargaPerItem.length; i++) {
      const harga = parseFloat(hargaPerItem[i].value);
      const jumlah = parseFloat(jumlahPesan[i].value);

      total += isNaN(harga) || isNaN(jumlah) ? 0 : harga * jumlah;
    }

    let diskon = 0;
    if (total > 50000) {
      diskon = total * 0.05;
    }

    resultJumlah.textContent = "Rp. " + total.toFixed(2);
    resultDiskon.textContent = "Rp. " + diskon.toFixed(2);
    resultTotal.textContent = "Rp. " + (total - diskon).toFixed(2);

    if (!isNaN(uangAwal)) {
      const uangKembalian = uangAwal - (total - diskon);
      resultUangKembalian.textContent = "Rp. " + uangKembalian.toFixed(2);
    } else {
      resultUangKembalian.textContent = "Rp. 0.00";
    }
  }

  function resetPesan() {
    const jumlahPesan = document.getElementsByClassName("aaa");
    const hargaPerItem = document.getElementsByClassName("vvv");

    for (let i = 0; i < hargaPerItem.length; i++) {
      hargaPerItem[i].value = "";
      jumlahPesan[i].value = "0";
    }

    document.getElementById("uangAwal").value = "";
    hitungTotalDanDiskon();
  }

  function cetakStruk() {
    const resultJumlah = document.getElementById("resultJ").textContent;
    const resultDiskon = document.getElementById("resultD").textContent;
    const resultTotal = document.getElementById("resultT").textContent;
    const resultUangKembalian = document.getElementById("resultU").textContent;
    const jumlahPesan = document.getElementsByClassName("aaa");
    const hargaPerItem = document.getElementsByClassName("vvv");
    const menuLabels = document.getElementsByClassName("Menu");

    let kontenStruk = "Struk Belanja\n";
    kontenStruk += "------------------------------\n";
    for (let i = 0; i < hargaPerItem.length; i++) {
      const harga = hargaPerItem[i].value;
      const jumlah = jumlahPesan[i].value;
      const namaMenu = menuLabels[i].textContent;
      if (namaMenu && jumlah > 0 && harga) {
        kontenStruk += `${i + 1}. ${namaMenu}: ${harga} x ${jumlah}\n`;
      }
    }
    kontenStruk += "------------------------------\n";
    kontenStruk += `Total: ${resultJumlah}\n`;
    kontenStruk += `Diskon: ${resultDiskon}\n`;
    kontenStruk += `Total Pembayaran: ${resultTotal}\n`;
    kontenStruk += `Uang Pembayaran: ${uangAwalField.value}\n`;
    kontenStruk += `Uang Kembalian: ${resultUangKembalian}\n`;
    kontenStruk += "------------------------------\n";
    kontenStruk += "Terimakasih!\n";

    const jendelaStruk = window.open("", "_blank");
    jendelaStruk.document.open();
    jendelaStruk.document.write("<pre>" + kontenStruk + "</pre>");
    jendelaStruk.document.close();

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(
      `<html><head><style>body{font-family: Arial, sans-serif;margin: 0;padding: 0;display: flex;align-items: center;justify-content: center;height: 100vh;}</style></head><body><pre>${kontenStruk}</pre></body></html>`
    );
    iframeDocument.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      iframe.parentNode.removeChild(iframe);
    }, 1000);
  }

  const jumlahFields = document.querySelectorAll(".aaa");
  for (const input of jumlahFields) {
    input.addEventListener("input", hitungTotalDanDiskon);
  }

  const hargaFields = document.querySelectorAll(".vvv");
  for (const input of hargaFields) {
    input.addEventListener("input", hitungTotalDanDiskon);
  }

  const uangAwalField = document.getElementById("uangAwal");
  uangAwalField.addEventListener("input", hitungTotalDanDiskon);

  hitungTotalDanDiskon();

  const tombolCetak = document.getElementById("cetak");
  tombolCetak.addEventListener("click", cetakStruk);

  const tombolBatal = document.querySelector(".Batal");
  tombolBatal.addEventListener("click", resetPesan);
});
