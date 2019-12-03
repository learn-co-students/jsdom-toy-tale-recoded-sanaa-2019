let addToy = false
const toys = document.querySelector('#toy-collection')
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const namee=document.querySelector('.input-text').value;
const imagee=document.getElementById("image-text").value;
const submitt=document.getElementById("submit")


  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })



  fetch(" http://localhost:3000/toys")
.then(response=>response.json())
.then(json=>{
 // console.log(json);
  for(const data of json){
    let dv=`
    <div class="card">
    <h2>${data.name}</h2>
    <img src=${data.image} class="toy-avatar" />
    <p id="nice">${data.likes} likes </p>
    <button class="like-btn" id="${data.likes}">Like <3</button>
  </div>`;
  toys.innerHTML +=dv;



  
  }
})


//2

submitt.addEventListener('click',event=>{
  event.preventDefault();
  fetch("http://localhost:3000/toys",
{
method:"POST",
headers: 
{
"Content-Type": "application/json",
"Accept": "application/json"
},
body: JSON.stringify({
  "name": namee,
  "image": imagee,
  "likes": 0
})
}
).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
}

)


 toys.addEventListener("click",(event)=>{
   event.preventDefault();
    const toyid=event.target.id
    const like=parseInt(event.target.getAttribute("id"))+1
    fetch(`http://localhost:3000/toys/${toyid}`,{
      method:'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
     ,
    body: JSON.stringify({
      "likes":like
    })
  }).then(response=>response.json())
  .then((data) =>  console.log(data))
  .catch((err)=>console.log(err))
   
})

