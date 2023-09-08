document.addEventListener("DOMContentLoaded", function () {
  function calculateTotalAndDiscount() {
    const hargaPerItem = document.getElementsByClassName("vvv");
    const jumlahPesan = document.getElementsByClassName("aaa");
    const resultJ = document.getElementById("resultJ");
    const resultT = document.getElementById("resultT");
    const resultD = document.getElementById("resultD");
    const uangA = parseFloat(document.getElementById("uangA").value);
    const resultU = document.getElementById("resultU");

    let total = 0;
    for (let i = 0; i < hargaPerItem.length; i++) {
      const harga = parseFloat(hargaPerItem[i].value);
      const jumlah = parseFloat(jumlahPesan[i].value);

      total += isNaN(harga) || isNaN(jumlah) ? 0 : harga * jumlah;
    }

    let discount = 0;
    if (total > 50000) {
      discount = total * 0.05;
    }

    resultJ.textContent = "Rp. " + total.toFixed(2);
    resultD.textContent = "Rp. " + discount.toFixed(2);
    resultT.textContent = "Rp. " + (total - discount).toFixed(2);

    if (!isNaN(uangA)) {
      const uangK = uangA - (total - discount);
      resultU.textContent = "Rp. " + uangK.toFixed(2);
    } else {
      resultU.textContent = "Rp. 0.00";
    }
  }

  function Reset() {
    const jumlahPesan = document.getElementsByClassName("aaa");
    const hargaPerItem = document.getElementsByClassName("vvv");

    for (let i = 0; i < hargaPerItem.length; i++) {
      hargaPerItem[i].value = "";
      jumlahPesan[i].value = "0";
    }

    document.getElementById("uangA").value = "";
    calculateTotalAndDiscount();
  }

  function CetakStruk() {
    const resultJ = document.getElementById("resultJ").textContent;
    const resultD = document.getElementById("resultD").textContent;
    const resultT = document.getElementById("resultT").textContent;
    const resultU = document.getElementById("resultU").textContent;
    const jumlahPesan = document.getElementsByClassName("aaa");
    const hargaPerItem = document.getElementsByClassName("vvv");
    const menuLabels = document.getElementsByClassName("Menu");

    let receiptContent = "Struk Belanja\n";
    receiptContent += "------------------------------\n";
    for (let i = 0; i < hargaPerItem.length; i++) {
      const harga = hargaPerItem[i].value;
      const jumlah = jumlahPesan[i].value;
      const menuName = menuLabels[i].textContent;
      if (menuName && jumlah > 0 && harga) {
        receiptContent += `${i + 1}. ${menuName}: ${harga} x ${jumlah}\n`;
      }
    }
    receiptContent += "------------------------------\n";
    receiptContent += `Total: ${resultJ}\n`;
    receiptContent += `Diskon: ${resultD}\n`;
    receiptContent += `Total Pembayan: ${resultT}\n`;
    receiptContent += `Uang Pembayan: ${uangAField.value}\n`;
    receiptContent += `Uang Kembalian: ${resultU}\n`;
    receiptContent += "------------------------------\n";
    receiptContent += "Terimakasih!\n";

    const receiptWindow = window.open("", "_blank");
    receiptWindow.document.open();
    receiptWindow.document.write("<pre>" + receiptContent + "</pre>");
    receiptWindow.document.close();

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(
      `<html><head><style>body{font-family: Arial, sans-serif;margin: 0;padding: 0;display: flex;align-items: center;justify-content: center;height: 100vh;}</style></head><body><pre>${receiptContent}</pre></body></html>`
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
    input.addEventListener("input", calculateTotalAndDiscount);
  }

  const hargaFields = document.querySelectorAll(".vvv");
  for (const input of hargaFields) {
    input.addEventListener("input", calculateTotalAndDiscount);
  }

  const uangAField = document.getElementById("uangA");
  uangAField.addEventListener("input", calculateTotalAndDiscount);

  calculateTotalAndDiscount();

  const cetakButton = document.getElementById("cetak");
  cetakButton.addEventListener("click", CetakStruk);

  const batalButton = document.querySelector(".Batal");
  batalButton.addEventListener("click", Reset);
});
