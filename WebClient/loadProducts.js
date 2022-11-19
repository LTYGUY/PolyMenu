const displayproducts = document.getElementById('displayproducts')
const searchBar = document.getElementById('searchBar')
let previousCategory = ''

getProducts('Main')

function getProducts(category) {
  let xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (this.readyState != 4 || this.status != 200) return

    //very good for debugging
    displayproducts.innerHTML = this.responseText

    const parsed = JSON.parse(this.responseText)

    generateTable(parsed)
  }

  if (category != null) previousCategory = category
  else category = previousCategory

  let finalString = category

  if (searchBar.value != null) finalString += ` ${searchBar.value}`

  xhr.open('GET', `Server/loadProducts.php?getproducts=` + finalString)
  xhr.send()
}

function generateTable(productObjects) {
  let combinedString = ''

  for (let i = 0; i < productObjects.length; i++) {
    let product = productObjects[i]

    combinedString += `<div class='item'>
                        <div class='itemImage'>
                            <img src='${product.image}' alt='${product.itemName}'>
                        </div>
                        <div class='itemPrice'>
                            <span>$${product.price}</span>
                        </div>
                        <div class='itemTitle'>
                            <span>${product.itemName}</span>
                        </div>
                        <div class='itemAddButton'>
                            <span><button type='button' onclick='addToCart(${product.productID})'>Add to cart</button></span>
                        </div>
                    </div>`
  }

  displayproducts.innerHTML = combinedString

  afterGeneratingTable()
}

function afterGeneratingTable() {}
