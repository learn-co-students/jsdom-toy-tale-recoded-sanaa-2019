const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!


/////////// Fetch GET collect all the missing toys from url

fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(getObject =>{
  // console.log(getObject)

  //what do I want to do
  for(const element of getObject){
    //// ( getObject is an array of objects ),, thus I want all elements inside the array
    /////in thsi case the element is the Objects
     
    //console.log(element)//display all the object inside the array

    //// now i want to enter inside each object // in this case each element
    for (const key in element){
      //console.log(key)//display the key of the object
      //console.log(element[key])//display the value of the key
      // console.log()
          
     
      if(key == "id"){
      //get the div with id "toy-collection"
      let Div = document.getElementById("toy-collection");
      // create a new div inside the Div ...the new div will have a class of "card"
      let newDiv = document.createElement("div")
      newDiv.className = "card";
      Div.appendChild(newDiv)
    
      // create H2 , Image, Paragragh, Button and append them to newDiv 
      let H2 = document.createElement("h1")

     
      let toyName = element["name"]; //want only name 
      H2.textContent = toyName;
      newDiv.appendChild(H2)
      //  console.log(toyName)
     

      let toyImage = document.createElement("img")
      toyImage.setAttribute("src", element["image"]);
      toyImage.className = "toy-avatar"
      newDiv.appendChild(toyImage)
     

      let Paragragh = document.createElement("p")
      let plike = `${element["likes"]} likes`; // enter number of likes here 
      Paragragh.textContent = plike;
      newDiv.appendChild(Paragragh)

      
      let btn = document.createElement("button")
      btn.classNmae = "like-btn";
      btn.innerHTML = " Like ❤ "
      newDiv.appendChild(btn)
      btn.addEventListener("click", function(){console.log("I'm working")
        //event listener function here
       let like = element["likes"]++;
       console.log(element["likes"]) 

       let newlike = {
        likes : element["likes"]

       }
       //request to sever to update using fetch PATCH

       fetch("http://localhost:3000/toys/1", {
          method: "PATCH",
          headers: {"content-Type": "application/json", "Accept":"application/json"},
          body: JSON.stringify(newlike)
       })
    
      })
    }
  
  }
    
  }


})

//click on (Create new Toy) button and post the new toy 
let tag = document.querySelector(".submit")
tag.addEventListener("click", function(e){console.log("okay")
 e.preventDefault();
 let name = document.querySelector("input:nth-of-type(1).input-text").value
console.log(name)
let image = document.querySelector("input:nth-of-type(2).input-text").value
console.log(image)
 submitData( name, image) })

/////////// Add new toy here .. use fetch POST ////////////////

function submitData( name, image ){
let newToy = {

  name: name,
  image: image,
  likes: 0
  // name: "Jessie",
  // image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  // likes: 0
}

configObj ={
  method: "POST",
  headers: {"content-Type": "application/json", "Accept":"application/json"},
  body: JSON.stringify(newToy)
}

fetch("http://localhost:3000/toys/", configObj)
.then( resp => resp.json())
.then(data => {console.log(data)})

}

