function hitung() {
  const BeratBadan = parseFloat(document.getElementById("Berat_badan").value);
  const TinggiBadan =
    parseFloat(document.getElementById("Tinggi_badan").value) / 100;

  if (isNaN(BeratBadan) || isNaN(TinggiBadan)) {
    alert("Salah");
    return;
  }

  const bmi = BeratBadan / (TinggiBadan * TinggiBadan);
  let category;

  if (bmi < 18.5) {
    category = "Kurus";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "normal";
  } else if (bmi >= 25 && bmi < 29.8) {
    category = "gemuk";
  } else {
    category = "obesitas";
  }
 ``
  const resultElement = document.getElementById("result");
  resultElement.textContent = `BMI Anda: ${bmi.toFixed(2)} (${category})`;
}
