let primary = document.getElementById("primary");
let secondary = document.getElementById("secondary");
let difficulty = document.getElementById("Difficulty");
let generate = document.getElementById("generate");
let password = document.getElementById("password");

let copy = document.getElementById("copy");
copy.classList.add("fa", "fa-copy");

//SET-DIFFICULTY
let setDifficulty = difficulty.value;
difficulty.addEventListener("change", () => {
  setDifficulty = difficulty.value;
});

//GENERATE-BUTTON
generate.addEventListener("click", () => {
  if (setDifficulty === "Easy") {
    generateEasy();
  } else if (setDifficulty === "Moderate") {
    generateModerate();
  } else {
    generateHard();
  }
});

//GENERATE-EASY-FUNCTION
function generateEasy() {
  console.log("password EASY");
  let gene_pass = password;
  let first = primary.value;
  let second = secondary.value;

  let asciiValues = Array.from(second, (char) => char.charCodeAt(0));

  let randomizedAscii = asciiValues.map((ascii) => {
    return ascii + Math.floor(Math.random() * 10) - 5;
  });

  let randomizedString = randomizedAscii
    .map((ascii) => String.fromCharCode(ascii))
    .join("");
  gene_pass.value =
    first + randomizedString + Math.floor(Math.random() * 10000);
  if (gene_pass.value.length < 8 || gene_pass.value.length > 30 || gene_pass.value === "") {
    console.log("Invalid password length");
    alert("Unable to generate Password!!");
    password.value = "";
  } else {
    password.innerText = gene_pass.value;
  }
}
//GENERATE-MODERATE-FUNCTION
function generateModerate() {
  console.log("password MODERATE");
  let gene_pass = password;
  let first = primary.value;
  let second = secondary.value;

  let randomizedFirst = Array.from(first);
  for (let i = randomizedFirst.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [randomizedFirst[i], randomizedFirst[j]] = [
      randomizedFirst[j],
      randomizedFirst[i],
    ];
  }

  let asciiValues = Array.from(second, (char) => char.charCodeAt(0));

  let randomizedAsciiValues = [];
  while (asciiValues.length) {
    let randomIndex = Math.floor(Math.random() * asciiValues.length);
    randomizedAsciiValues.push(asciiValues.splice(randomIndex, 1)[0]);
  }

  let randomizedSecond = randomizedAsciiValues
    .map((asciiValue) => String.fromCharCode(asciiValue))
    .join("");

  const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/";
  let randomSpecialChars = "";
  for (let i = 0; i < 5; i++) {
    randomSpecialChars += specialChars.charAt(
      Math.floor(Math.random() * specialChars.length)
    );
  }

  let randomNumbers = Math.floor(Math.random() * 10000);

  gene_pass.value =
    randomizedFirst.join("") +
    randomizedSecond +
    randomSpecialChars +
    randomNumbers;

  if (gene_pass.value.length < 10 || gene_pass.value.length > 30 || gene_pass.value === "") {
    console.log("Invalid password length");
    alert("Unable to generate Password!!");
    password.value = "";
  } else {
    password.innerText = gene_pass.value;
  }
}

//GENERATE-HARD-FUNCTION
function generateHard() {
  console.log("password HARD");
  let gene_pass = password;
  let first = primary.value;
  let second = secondary.value;
  let specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";
  let digits = "0123456789";

  let randomizedFirst = Array.from(first);
  for (let i = randomizedFirst.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [randomizedFirst[i], randomizedFirst[j]] = [
      randomizedFirst[j],
      randomizedFirst[i],
    ];
  }

  let extendedSecond = second + specialChars + digits;
  let asciiValues = Array.from(extendedSecond, (char) => char.charCodeAt(0));

  let passwordLength = Math.floor(Math.random() * (20 - 8 + 1) + 8);
  let randomPassword = "";

  for (let i = 0; i < passwordLength / 2; i++) {
    let randomIndex = Math.floor(Math.random() * randomizedFirst.length);
    randomPassword += randomizedFirst[randomIndex];
  }

  for (let i = 0; i < passwordLength / 2; i++) {
    let randomIndex = Math.floor(Math.random() * extendedSecond.length);
    randomPassword += extendedSecond[randomIndex];
  }

  gene_pass.value = randomPassword + Math.floor(Math.random() * 10000);

  if (gene_pass.value.length < 8 || gene_pass.value.length > 30 || gene_pass.value === "") {
    console.log("Invalid password length");
    alert("Unable to generate Password!!");
    password.value = "";
  } else {
    console.log("Generated hard password: ", gene_pass.value);
    password.innerText = gene_pass.value;
  }
}

//COPY-TO-CLIPBOARD
copy.addEventListener("click", () => {
  let pass_val = password.value;
  if (!pass_val.trim()) {
    alert("please first generate a password");
  } else {
    navigator.clipboard
      .writeText(pass_val)
      .then(() => {
        copy.classList.remove("fa", "fa-copy");
        copy.classList.add("fa-solid", "fa-check-double");
        setTimeout(() => {
          copy.classList.remove("fa-solid", "fa-check-double");
          copy.classList.add("fa", "fa-copy");
        }, 900);
      })
      .catch((err) => {
        alert("Failed to Copy");
      });
  }
});
