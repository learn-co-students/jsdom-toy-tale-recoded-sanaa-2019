let addToy = false;

btn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});
const btn = document.querySelector("#new-toy-btn");
const form = document.querySelector(".container");
const div = document.getElementById("toy-collection");
const FBtn = document.getElementById('submit');


FBtn.addEventListener('click',function(e){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': "application/json"
    },
    body: JSON.stringify({
      name: "Jessie",
      image:
        "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      likes: 0
    })
  });

});

document.addEventListener("DOMContentLoaded", () => {
  function makeT(data) {
    for(let i = 0; i < data.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    img.className = "toy-avatar";
    let p = document.createElement("p");
    let likeB = document.createElement("button");
    likeB.className = "like-btn";
    likeB.textContent = "Like <3";
    likeB.addEventListener('click',function(e){
      let likedOne = toy.id;
      let like = toy.likes;
      fetch('http://localhost:3000/toys/'+likedOne,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify({
          name: toy.name,
          image: toy.image,
          likes: like + 1
        })
      });
    });
      
      let toy = data[i];
      h2.innerHTML = toy.name;
      img.src = toy.image;
      p.innerHTML = toy.likes + " Likes";
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(likeB);
      div.appendChild(card);
    }
  }

  function fetch() {
    const Url = "http://localhost:3000/toys";
    fetch(Url)
      .then(data => data.json())
      .then(response => {
        makeT(response);
      })
      .catch((err)=>console.log(err.message));
  }
  fetch();
});