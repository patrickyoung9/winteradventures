//CANVAS
function setupCanvas() {
  var canvas = document.getElementById("canvas");
  //determine canvas dimensions
  canvas.height = 60;
  canvas.width = 60;

  if (canvas.getContext) {
    //browser supports canvas
    var layout = canvas.getContext('2d');
    //decide where to start the design
    layout.beginPath();
    layout.moveTo(20, 20);
    layout.lineTo(20, 40);
    layout.lineTo(30, 30);


    layout.moveTo(40, 20);
    layout.lineTo(40, 40);
    layout.lineTo(30, 30);

    layout.moveTo(40, 20);
    layout.lineTo(40, 40);

    layout.moveTo(40, 20);
    layout.lineTo(60, 40);

    layout.moveTo(60, 30);
    layout.lineTo(40, 30);
    //state colour of design
    layout.strokeStyle = "white"
    //line thickness
    layout.lineWidth = 3

    layout.stroke();
  }
}





//CART
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('btn-danger')

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    //when remove button is clicked remove the element from the cart
    button.addEventListener('click', removeCartItem)
  }


  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    //any time the quantity changes run the function
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
}

function removeCartItem(event) {
  var buttonClicked = event.target
  //when button is clicked the parent element of the button is removed meaning the entire row is removed
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}


function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) { //quantity of the product being ordered cant drop below 1 and has to be a number
    input.value = 1 //default value set at 1
  }
  updateCartTotal()
}

function addToCartClicked(event) {
  var button = event.target
  var cardBody = button.parentElement.parentElement //all elements of the cards are stored
  var title = cardBody.getElementsByClassName('card-title')[0].innerText //title of the card is stored individually
  var price = cardBody.getElementsByClassName('card-price')[0].innerText //price of the card is stored individually
  console.log(title, price)
  addItemToCart(title, price) //title and price is displayed in the cart
  updateCartTotal()
}

function addItemToCart(title, price) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row') //elements are returned from the card in a row in the cart
  var cartItems = document.getElementsByClassName('cart-items')[0]

  var cartRowContents = `
  <div class="cart-item cart-column">
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
  <input class="cart-quantity-input" type="number" value="1">
  <button class="btn btn-danger" type="button">REMOVE</button>
</div>` //each card added is displayed in the same row format
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0] //select the first element from the array of items
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart-price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
    var price = parseFloat(priceElement.innerText.replace('£', '')) //change number from a string to a decimal
    var quantity = quantityElement.value
    total = total + (price * quantity) //total price equals price times by the quantity the user wants
    var discount = (price - (price/100 * 10))
    if(quantity >= 4){
      total= (discount* quantity)
      //total=((price - price/10) * quantity)
      alert("Your 10% discount has been applied!")
    }
  }
  document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total

}






// //CONTACT FORM
const nameForm = document.querySelector("#name-form");
const welcome = document.querySelector("#welcome");

const checkUser = () => {
  const userName = localStorage.getItem("user"); //store the users name in local storage
  if (userName) {
    nameForm.style.display = "none"; //if username is stored hide the form
    welcome.style.display = "block"; //display the welcome message 

    const userNameElement = document.querySelector("#username");
    userNameElement.textContent = userName;
  } else {
    nameForm.style.display = "block"; //if username isnt stored keep form
    welcome.style.display = "none"; //dont display welcome message
  }
};

nameForm.addEventListener("submit", (e) => {
  e.preventDefault(); //cancels the default event if its canceleable

  const nameInput = document.querySelector("#firstName");
  localStorage.setItem("user", nameInput.value); //users name is set as user in local storage

  nameInput.value = "";

  checkUser();
});