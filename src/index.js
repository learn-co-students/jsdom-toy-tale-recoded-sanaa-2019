let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  function process (a){
    if(Array.isArray(a)){
      for(let j=0;j<a.length;j++){
        let dv=document.createElement("div");
        dv.innerHTML=" ";
        dv.className="card";
        let header=document.createElement("h2");
        header.innerText=a[j].name;
        dv.appendChild(header);
        let img=document.createElement("img");
        img.setAttribute("src",`${a[j].image}`);
        dv.appendChild(img);
        let p=document.createElement("p");
        p.innerText="Likes: "+a[j].likes;
        dv.appendChild(p);
        let btn=document.createElement("button");
        btn.className="like-btn";
        btn.innerText="Like";
        dv.appendChild(btn);
        btn.addEventListener('click',function(){
          let b;
            b=a[j].likes;
          fetch(`http://localhost:3000/toys/${a[j].id}`,{
          method:"PATCH",
          headers:{
            'Content-type': 'application/json',
            "accept":"application/json"
          },
          body:JSON.stringify({
            "likes":++b
          })
        });
        p.innerText="Likes: "+(b);
        a[j].likes=b;
      })
      toyColl.appendChild(dv);
    }
  }
  else{
    let dv=document.createElement("div");
    dv.innerHTML=" ";
    dv.className="card";
    let header=document.createElement("h2");
    header.innerText=a.name;
    dv.appendChild(header);
    let img=document.createElement("img");
    img.setAttribute("src",`${a.image}`);
    dv.appendChild(img);
    let p=document.createElement("p");
    p.innerText="Likes: "+0;
    dv.appendChild(p);
    let btnn=document.createElement("button");
    btnn.className="like-btn";
    btnn.innerText="Like";
    dv.appendChild(btnn);
    btnn.addEventListener('click',function(){
      let b;
        b=a.likes;
      fetch(`http://localhost:3000/toys/${a.id}`,{
      method:"PATCH",
      headers:{
        'Content-type': 'application/json',
        "accept":"application/json"
      },
      body:JSON.stringify({
        "likes":++b
      })
    });
    p.innerText="Likes: "+(b);
    a.likes=b;
  })
    toyColl.appendChild(dv);
    
  }
  
}

let toyColl= document.getElementById("toy-collection");
let createToy=document.querySelector(`input[name="submit"]`);
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    createToy.addEventListener('click',function(){
      let nm=document.querySelector(`input[name="name"]`);
      let ig=document.querySelector(`input[name="image"]`);
      fetch("http://localhost:3000/toys/",{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "accept":"application/json"
      },
      body:(JSON.stringify({
        name:nm.value,
        image:ig.value,
        likes:0
      }))
    }).then(function(resp){
      return resp.json();
    }).then((json)=>{process(json)});
    
    
    
    
    event.preventDefault();
    
  })
} else {
  toyForm.style.display = 'none'
}
})

fetch("http://localhost:3000/toys/",{
method:"GET"
}).then(res=>res.json()).then((json)=>{process(json)});

});

