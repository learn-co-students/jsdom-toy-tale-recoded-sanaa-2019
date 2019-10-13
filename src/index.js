const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toysDiv = document.getElementById("toy-collection");
const FromBtn = document.getElementById('submit');


let addToy = false;

// YOUR CODE HERE

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

FromBtn.addEventListener('click',function(e){
  e.preventDefault();
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



// OR HERE!
document.addEventListener("DOMContentLoaded", () => {
  function makeToys(res) {
    for(let i = 0; i < res.length; i++) {
      let card = document.createElement("div");
    card.className = "card";
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    img.className = "toy-avatar";
    let p = document.createElement("p");
    let likeBtn = document.createElement("button");
    likeBtn.className = "like-btn";
    likeBtn.textContent = "Like <3";
    likeBtn.addEventListener('click',function(e){
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
      // console.log(res[i]);
      let toy = res[i];
      h2.innerHTML = toy.name;
      img.src = toy.image;
      p.innerHTML = toy.likes + " Likes";
      card.appendChild(h2);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(likeBtn);
      toysDiv.appendChild(card);
    }
  }

  function fetchToys() {
    const toyUrl = "http://localhost:3000/toys";
    fetch(toyUrl)
      .then(jsonRes => jsonRes.json())
      .then(res => {
        makeToys(res);
      })
      .catch((err)=>console.log(err.message));
  }
  fetchToys();
});