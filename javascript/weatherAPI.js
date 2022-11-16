//OPENWEATHER
//declare variables and assign page objects and input from form
let input = document.querySelector('.input_text');
let main = document.querySelector('#name');
let temp = document.querySelector('.temp');
let desc = document.querySelector('.desc');
let button = document.querySelector('.submit');

//click event on button
button.addEventListener('click', function(){
  //API call
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=9db198befa885fb9939dc438eb5fbd29')
  .then(response => response.json())//return the json feed containing the data
  .then(data => {
    let tempValue = data['main']['temp'];
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];

    main.innerHTML = nameValue;
    desc.innerHTML = "Description - " + descValue;
    temp.innerHTML = "Temperature - " + tempValue;
  })
  //if error occurs return error
  .catch(err => alert("Please enter a valid city or resort"));
})