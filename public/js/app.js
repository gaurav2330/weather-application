const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const place = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = search.value
  place.textContent = ''
  message.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather?address=${address}}`).then(response => {
  response.json().then(data => {
    if(data.error){
      return message.textContent = 'Unable to find location. Please try another search.'
    }
    message.textContent = data.forecast;
    place.textContent = data.location;
  })
})
})