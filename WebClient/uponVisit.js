let xhr = new XMLHttpRequest()
xhr.onreadystatechange = () => {
  if (this.readyState != 4 || this.status != 200) return
}

xhr.open('GET', `Server/uponVisit.php`)
xhr.send()

const searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', (event) => {
  event.preventDefault()
  getProducts()
})

const submitLoginBtn = document.getElementById('submitLogin')
submitLoginBtn.addEventListener('click', (event) => {
  event.preventDefault()
})
