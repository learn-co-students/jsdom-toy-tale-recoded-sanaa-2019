const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

let addToy = false
 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
   
  fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(data =>{

  for (const element of data){
    for(const key in element){

      if (key=="id"){
        let div=document.getElementById("toy-collection")
        let newDiv=document.createElement("div")
        div.className="card";
        div.appendChild(newDiv);

        let h2= document.createElement("h2")
        h2.textContent=element.name;
        newDiv.appendChild(h2)

        let toyImage=document.createElement("img")
        toyImage.setAttribute("src",element.image)
        toyImage.className= "toy-avatar"
        newDiv.appendChild(toyImage)

        let paragraph=document.createElement("p")
        let plike = `${element["likes"]} likes`;
        paragraph.textContent=plike;
        newDiv.appendChild(paragraph);

        let btn=document.createElement("button")
        btn.className="like-btn"
        btn.innerHTML=" Like ❤ "
        newDiv.appendChild(btn)
        
        btn.addEventListener("click",function(){
          let like = element["likes"]++;
          let newlike = {
            likes : element["likes"]
    
           }
           fetch("http://localhost:3000/toys/1", {
          method: "PATCH",
          headers: {
            "content-Type": "application/json", "Accept":"application/json"
          },
          body: JSON.stringify(newlike)
       })
        })

      }

    }
  }
})

let submit= document.querySelector(".submit")
submit.addEventListener("click",function(e){

  e.preventDefault();

  let name=document.querySelector("input:nth-of-type(1).input-text").value
  let image=document.querySelector("input:nth-of-type(2)").value
  submitData (name,image)
})
    function submitData(name,image){
      let newToy={
        name:name,
        image:image,
        likes:0
      }
      configObj={
        method:"POST",
        headers:{
          "content-Type": "application/json", "Accept":"application/json"
        },
        body:JSON.stringify(newToy)
      }
      fetch("http://localhost:3000/toys/", configObj)
      .then( resp => resp.json())
      .then(data => {console.log(data)})

    } 
