let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  var toyImg = document.getElementById("timg").value;
  var toyName = document.getElementById("tname").value;


  function submitting(toyName, toyImg) {

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify({
        name: toyName,
        image: toyImg,
        likes: "10"

      })
    })

  }




  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy

    if (addToy) {

      toyForm.style.display = 'block';


    } else {
      toyForm.style.display = 'none'
    }
  })


})





// var createToy = document.querySelector(".submit").addEventListener("click", submitting(toyName, toyImg));










fetch("http://localhost:3000/toys")
  .then(function (resp) {
    return resp.json()
  })
  .then(function (data) {
    let counter = 0;


    let collection = document.querySelector("#toy-collection")
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key];
        let card = document.createElement("div")
        card.className = "card";
        collection.appendChild(card)
        console.log(card);
        let h2 = document.createElement("h2");
        h2.innerHTML = element.name;
        let img = document.createElement("img")
        img.setAttribute("src", element.image);
        img.style.width = "100%"
        let para = document.createElement("p");
        para.innerHTML = counter;
        let button = document.createElement("button");
        button.className = "like-btn";
        button.innerHTML = "Like <3";
        card.appendChild(h2)
        card.appendChild(img)
        card.appendChild(para)

        card.appendChild(button)
        button.onclick = function () {
          para.innerHTML = counter++;


        }



      }
    }
  })