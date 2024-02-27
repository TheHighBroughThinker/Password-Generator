document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.getElementById("copyButton");
          passwordInput = document.getElementById("password"),
          lengthSlider = document.getElementById("lengthSlider"),
          lengthValue = document.getElementById("lengthValue"),
          uppercaseCheckbox = document.getElementById("uppercaseCheckbox"),
          lowercaseCheckbox = document.getElementById("lowercaseCheckbox"),
          numbersCheckbox = document.getElementById("numbersCheckbox"),
          symbolsCheckbox = document.getElementById("symbolsCheckbox"),
          generateButton = document.getElementById("generateButton"),
          upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          lowerCaseChars = "abcdefghijklmnopqrstuvwxyz",
          numberChars = "0123456789",
         symbolChars = "!@#$%^&*()_-+=";

    function generatePassword() {
        let chars = "",
            password = "";

        if (uppercaseCheckbox.checked) chars += upperCaseChars;
        if (lowercaseCheckbox.checked) chars += lowerCaseChars;
        if (numbersCheckbox.checked) chars += numberChars;
        if (symbolsCheckbox.checked) chars += symbolChars;

        for (let i = 0; i < lengthSlider.value; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return password;
    }

    function updatePassword() {
        const password = generatePassword();
        passwordInput.value = password;
    }

    function updateSliderValue() {
        lengthValue.textContent = lengthSlider.value;
    }

    generateButton.addEventListener("click", function () {
        updatePassword();
    });

    copyButton.addEventListener("click", function () {
        passwordInput.select();
        document.execCommand("copy");
    });

    lengthSlider.addEventListener("input", function () {
        updateSliderValue();
    });
});
