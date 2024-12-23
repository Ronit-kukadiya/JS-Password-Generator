let primary = document.getElementById("primary").value;
let secondary = document.getElementById("secondary").value;
let generate = document.getElementById("generate");
let password = document.getElementById("password");
let copy = document.getElementById("copy");
copy.classList.add("fa", "fa-copy");

generate.addEventListener("click", () => {
  let pasgen = password;
  let primary = document.getElementById("primary").value;
  let secondary = document.getElementById("secondary").value;
  pasgen.value = primary + secondary + 123;
  if (pasgen.value.length < 8) {
    console.log("length req");
    asciiAdd(pasgen.value);
    console.log(pasgen.value.length);
  } else {
    pasgen.value = primary + secondary + 123;
    console.log("length BIG");
    password.innerText = pasgen.value;
  }
});

function asciiAdd(pasgen) {
  // let newascii = pasgen.t;
  console.log("added ascii generated text");
}

copy.addEventListener("click", () => {
  let pasval = password.value;
  if (!pasval.trim()) {
    alert("please first generate a password");
    console.log("not copy");
  } else {
    navigator.clipboard
      .writeText(pasval)
      .then(() => {
        copy.classList.remove("fa", "fa-copy");
        copy.classList.add("fa-solid", "fa-check-double");
        setTimeout(() => {
          copy.classList.remove("fa-solid", "fa-check-double");
          copy.classList.add("fa", "fa-copy");
        }, 1500);
      })
      .catch((err) => {
        console.log("failed to copy");
      });
    console.log("copied");
  }
});
