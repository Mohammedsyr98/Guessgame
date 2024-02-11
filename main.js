// Step 1 Search for focus and go to another input field automaticaly
// Step 2 write function when click check the work
// step 3 hint (s)

let words = ["PLAY", "GAME", "FOUR", "FIVE", "BEST", "CUTE", "COOL"];
let test = words[Math.floor(Math.random() * words.length)];
console.log(test);
let inputBoxes = document.querySelectorAll(".input-boxes");

let tryCount = 0;
let score = 0;
let inputvalue = 0;
for (let m = 0; m < 5; m++) {
  for (let n = 1; n < 5; n++) {
    inputBoxes[m].children[n].children[0].addEventListener(
      "input",
      function (e) {
        e.target.value = e.target.value.toUpperCase();
      }
    );
  }
}


for (let i = 1; i < 4; i++) {
  inputBoxes[inputvalue].children[i].children[0].addEventListener(
    "input",
    function (e) {
      if (e.target.value.length == 1) {
        inputBoxes[0].children[i + 1].children[0].focus();
      }
    }
  );
}

let chechBtn = document.querySelector(".check");
chechBtn.addEventListener("click", function () {
  for (let j = 1; j < 5; j++) {
    if (!test.includes(inputBoxes[inputvalue].children[j].children[0].value)) {
      inputBoxes[inputvalue].children[j].children[0].style.backgroundColor =
        "#9fa0a9";
    }
    if (test[j - 1] == inputBoxes[inputvalue].children[j].children[0].value) {
      inputBoxes[inputvalue].children[j].children[0].style.backgroundColor =
        "#f99c1d";

      score++;
    }
    if (
      test[j - 1] != inputBoxes[inputvalue].children[j].children[0].value &&
      test.includes(inputBoxes[inputvalue].children[j].children[0].value)
    ) {
      inputBoxes[inputvalue].children[j].children[0].style.backgroundColor =
        "#07a486";
    }
    if (inputBoxes[inputvalue].children[j].children[0].value == "") {
      inputBoxes[inputvalue].children[j].children[0].style.backgroundColor =
        "#9fa0a9";
    }
  }
  if (tryCount == 4) {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let span = document.createElement("span");
    let btn = document.createElement("button");
    let icon = document.createElement("img");
    icon.setAttribute("src", "img/error.png");
    icon.id = "icon";
    div.id = "btn";
    h1.textContent = "Sorry\nGood Luck Next Time";
    btn.textContent = "X";
    document.querySelectorAll(".check")[0].disabled = true;
    document.querySelectorAll(".hint")[0].disabled = true;
    div.append(h1);
    div.append(span);
    div.append(btn);
    div.append(icon);
    document.querySelector("body").appendChild(div);
    setTimeout(() => {
      div.style.display = "block";
      document.querySelector("body").style.backgroundColor = "#00000080";
    }, "0");

    btn.addEventListener("click", function () {
      div.remove();
    });
  }
  if (score == 4) {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let span = document.createElement("span");
    let btn = document.createElement("button");
    div.id = "btn";
    h1.textContent = "You Did it";
    let icon = document.createElement("img");
    icon.setAttribute("src", "img/right.png");
    icon.id = "icon";
    div.id = "btn";
    document.querySelectorAll(".check")[0].disabled = true;
    document.querySelectorAll(".hint")[0].disabled = true;
    btn.textContent = "X";
    div.append(h1);
    div.append(span);
    div.append(btn);
    div.append(icon);
    document.querySelector("body").appendChild(div);
    setTimeout(() => {
      div.style.display = "block";
      document.querySelector("body").style.backgroundColor = "#00000080";
    }, "0");

    btn.addEventListener("click", function () {
      div.remove();
    });
  }
  if (score < 4 && tryCount != 4) {
    inputvalue += 1;

    for (let j = 1; j < 5; j++) {
      inputBoxes[inputvalue].children[j].children[0].removeAttribute(
        "disabled"
      );
      inputBoxes[inputvalue].children[1].children[0].focus();
    }
    for (let i = 1; i < 4; i++) {
      inputBoxes[inputvalue].children[i].children[0].addEventListener(
        "input",
        function (e) {
          if (e.target.value.length == 1) {
            inputBoxes[inputvalue].children[i + 1].children[0].focus();
          }
        }
      );
    }

    score = 0;
    tryCount++;
    for (let h = 1; h < 5; h++) {
      inputBoxes[inputvalue].children[h].children[0].style.backgroundColor =
        "white";
    }
  }
});

let hintArray = [];
let hintCount = 2;

let hint = document.querySelector(".hint");
hint.addEventListener("click", function () {
  for (let i = 1; i < 10; i++) {
    let randomHint = test[Math.floor(Math.random() * test.length)];
    if (
      inputBoxes[inputvalue].children[test.indexOf(randomHint) + 1].children[0]
        .value == ""
    ) {
      if (!hintArray.includes(randomHint) && hintCount != 0) {
        hintArray.push(randomHint);

        inputBoxes[inputvalue].children[
          test.indexOf(randomHint) + 1
        ].children[0].value = test[test.indexOf(randomHint)];
        hintCount--;
        hint.textContent = `${hintCount} Hint`;
        if (hintCount == 0) {
          hint.style.backgroundColor = "grey";
          hint.style.cursor = "default";
        }
        break;
      }
    }
  }
});

/*

chechBtn.addEventListener("click", function () {
  for (let j = 1; j < 5; j++) {
    if (!test.includes(inputBoxes[0].children[j].children[0].value)) {
      inputBoxes[0].children[j].children[0].style.backgroundColor = "#9fa0a9";
      score--;
    } else {
      for (let k = 1; k < 5; k++) {
        if (test[k - 1] == inputBoxes[0].children[k].children[0].value) {
          inputBoxes[0].children[k].children[0].style.backgroundColor =
            "#f99c1d";

          score += 1;
          console.log(score);
        } else {
          inputBoxes[0].children[k].children[0].style.backgroundColor =
            "#07a486";
        }
      }
      if (score == 16) {
        console.log("All words is true");
        let div = document.createElement("div");
        let h1 = document.createElement("h1");
        let span = document.createElement("span");
        let btn = document.createElement("button");
        div.id = "btn";
        h1.textContent = "You Did it";

        btn.textContent = "X";
        div.append(h1);
        div.append(span);
        div.append(btn);
        document.querySelector("body").appendChild(div);
        setTimeout(() => {
          div.style.display = "block";
          document.querySelector("body").style.backgroundColor = "#00000080";
        }, "0");

        btn.addEventListener("click", function () {
          div.remove();
        });
      }
      //}
    }
  }
});

*/
