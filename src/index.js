// YOUR CODE HERE


const toys = document.querySelector('#toy-collection')

const addform = document.querySelector('.add-toy-form')

let addToy = false

const btn = document.querySelector('#new-toy-btn')

const form = document.querySelector('.container')



window.addEventListener('load', e => {
  fetch('../db.json').then(response => response.json()).then(data => {
    console.log(data)
    data.toys.forEach(toy => {
      let html = `
      <div class="card" >
        <h1>${toy.name}</h1>
        <img src="${toy.image}" class="toy-avatar" />
        <p><span>${toy.likes}</span> Likes </p>
        <button data-id="${toy.id}" data-likes="${toy.likes}" class="like-btn">Like <3</button>
      </dic>`
      toys.innerHTML += html
    });
  }).catch(err => console.log(err))
})

toys.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const dataId = e.target.getAttribute('data-id')
    let likes = parseInt(e.target.getAttribute('data-likes')) + 1
    console.log(likes)

    fetch(`http://localhost:3000/toys/${dataId}`, {
      method: 'PATCH',
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        likes: likes
      })
    }).then(resp => console.log(resp)).then(data => console.log(data)).catch(err => console.log(err))


  }

})

btn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  console.log(btn)
  if (addToy) {
    form.style.display = 'block'
  } else {
    form.style.display = 'none'
  }
})


addform.addEventListener('submit', e => {
  e.preventDefault()
  fetch('http://localhost:3000/toys',
    {
      method: 'POST'
      , headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ "name": addform.name.value, "image": addform.image.value, "likes": 0 })
    }).then()
})
// OR HERE!