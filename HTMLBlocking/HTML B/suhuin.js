function convertToFahrenheit() {
  const fahrenheitInput = document.getElementById("fahrenheit");
  const fahrenheit = parseFloat(fahrenheitInput.value);

  if (!isNaN(fahrenheit)) {
    const celsius = ((fahrenheit - 32) * 5) / 9;
    document.getElementById(
      "hasil"
    ).innerHTML = `derajat celcius ${celsius.toFixed(2)}.`;
  }
}
