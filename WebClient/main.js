let page = ['#page1', '#page2', '#page3', '#login', '#cart']
// each value is used as a hash for an address
// and it is doubled up as the id for a view
let curPage = page[0]

$(() => {
  // if the hash is one of page2 to page3,
  // render the page
  let newPage = getPage(window.location.hash)
  render(newPage)

  // click event handler:
  // 1) prevent loading of the new url
  // 2) may trigger hashchange event
  $('nav a').click((e) => {
    e.preventDefault()
    let newPage = $(this).attr('href')
    window.location.hash = newPage
  })

  // hashchange event handler:
  // convert the hash to one of the three
  // page names and render the page
  $(window).on('hashchange', () => {
    let newPage = getPage(window.location.hash)
    render(newPage)
  })
})

// if the newPage is different from curPage
// hide the curPage and show the newPage
// update the curPage to the newPage
function render(newPage) {
  if (newPage == curPage) return
  $(curPage).hide()
  $(newPage).show()
  curPage = newPage
}

// convert the hash to one of the three page names
// other hash values are converted to page[0] (ie, page1)
function getPage(hash) {
  let i = page.indexOf(hash)
  if (i < 0 && hash != '') window.location.hash = page[0]
  return i < 1 ? page[0] : page[i]
}
