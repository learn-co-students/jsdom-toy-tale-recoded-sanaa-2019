let addToy = false


document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  //console.log(addBtn)
  const toyForm = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})
fetch("http://localhost:3000/toys")
.then(response => {
    return response.json()
})
.then(json=> {
    console.log(json)
    console.log(json.length)
    console.log(json[0].id)
    let container= document.getElementById('toy-collection')
    for(let i=0; i<json.length; i++){
      //console.log(i)
      //console.log(json[i].image)
      let card= document.createElement('div');
      card.className='card';
      let title= document.createElement('h2');
      title.innerText=json[i].name;
      let image= document.createElement('img');
      image.setAttribute("src", json[i].image)
      image.alt= json[i].name;
      image.className='toy-avatar';
      let likeNum= document.createElement('p');
      let likes= json[i].likes;
      likeNum.innerText=`${likes} Likes`;
      let likeBtn= document.createElement('button');
      likeBtn.innerText='Like <3';
      likeBtn.setAttribute('onClick', 'liky()')
      likeBtn.id=likes;
      likeBtn.value= json[i].id;
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(likeNum);
      card.appendChild(likeBtn);
      container.appendChild(card);
    }


})

function addNewToy(x,y){
  fetch('http://localhost:3000/toys', {
            method: 'POST',
            body: JSON.stringify({
              "name": x,
              "image": y,
              "likes": 0
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {

          let container= document.getElementById('toy-collection')
          let card= document.createElement('div');
          card.className='card';
          let title= document.createElement('h2');
          title.innerText=x;
          let image= document.createElement('img');
          image.setAttribute("src", y)
          image.alt= x;
          image.className='toy-avatar';
          let likeNum= document.createElement('p');
          let likes= 0;
          likeNum.innerText=`${likes} Likes`;
          let likeBtn= document.createElement('button');
          likeBtn.innerText='Like <3';
          likeBtn.setAttribute('onClick', 'liky()')
          likeBtn.id=likes;
          
          

          card.appendChild(title);
          card.appendChild(image);
          card.appendChild(likeNum);
          card.appendChild(likeBtn);
          container.appendChild(card);

        })

}


function addNewToy2(){
  event.preventDefault();
  let toyName= document.getElementById('toy-name').value
  let toyUrl= document.getElementById('toy-url').value
  addNewToy(toyName,toyUrl)
  console.log("hello")
}

function liky(){
  
  console.log(event.target.id)
  console.log(event.target.value)
  let toyId= event.target.value;
  let likeCount= event.target.id;
  let newCount= parseInt(likeCount)+1;
  console.log(newCount)
  fetch(`http://localhost:3000/toys/${toyId}`,{
      method:'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
     ,
    body: JSON.stringify({
      "likes":newCount
    })
  }).then(response=>response.json())
  .then(json=>{ 
    console.log(json)
  })
}

