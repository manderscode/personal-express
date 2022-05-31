var heart = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash-o");
var sadCry = document.getElementsByClassName("fa-face-sad-cry");
console.log(heart);
Array.from(heart).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const heart = parseFloat(
      this.parentNode.parentNode.childNodes[7].innerText
    );
    console.log(heart);
    fetch("parentLoveMessages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        heart: heart,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});
//Sad Cry//
Array.from(sadCry).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText;
    const msg = this.parentNode.parentNode.childNodes[3].innerText;
    const sadCry = parseFloat(
      this.parentNode.parentNode.childNodes[11].innerText
    );
    console.log(name, msg, sadCry);

    fetch("parentLoveMessagesDown", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        msg: msg,
        sadCry: sadCry,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText; // grabbing the values and applying the method of delete
    const msg = this.parentNode.parentNode.childNodes[3].innerText;



    console.log(name, msg);

    // body > ul > li:nth-child(4) > span:nth-child(7) > i// "this" = whatever your event listener is targetting - this = whatever was clicked
    fetch("parentLoveDelete", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        msg: msg,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});
