var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){

  if (this.status !== 200) {return;}
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);

  var jsonStringBeers = JSON.stringify(beers);
  localStorage.setItem('Beers array', jsonStringBeers);
}

var getBeers = function(){
  var jsonString = localStorage.getItem('Beers array');
  var beers = JSON.parse(jsonString);
  return beers;

}

var createTopOption = function(){
  var optionAtTop = document.createElement('option');
  optionAtTop.innerText  = "Select a beer"
  optionAtTop.disabled = true;
  optionAtTop.selected = true;
  return optionAtTop;
}

var formBeerDropDown = function(){
  var beers = getBeers();
  var select = document.querySelector('#select-beers');
  select.appendChild(createTopOption());
  beers.forEach(function(beer, index){
    var option = document.createElement('option');
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  })
}

var formatBeerText = function(beer){
  let name = `Name: ${beer.name} \n\n`;
  let description = `Description: ${beer.description}\n\n`;
  let abv = `ABV: ${beer.abv}%\n\n`;
  let foodPairing = `Food pairing: ${beer.food_pairing}`
  return name + description + abv + foodPairing;
}

var handleOptionSelected = function(country){
  var pBeerInfo = document.querySelector('#beer-info');
  var pBeerPic = document.querySelector('#beer-pic');
  var pBeerIngredientsTitle = document.querySelector('#ingredients-title')
  var jsonString = localStorage.getItem('Beers array');
  var beers = JSON.parse(jsonString);
  var beer = beers[this.value];

  pBeerIngredientsTitle.innerText = "Ingredients"
  pBeerInfo.innerText = formatBeerText(beer);
  pBeerPic.appendChild(createBeerImageFromURL(beer));
  createBeerIngredientsList(beer);
}

var createBeerIngredientsArray = function(beer){
  var ingredientsArray = [];
  beer.ingredients.malt.forEach(function(item){
    ingredientsArray.push(`Malt: ${item.name}`);
  })
  beer.ingredients.hops.forEach(function(item){
    ingredientsArray.push(`Hops: ${item.name}`);
  })
  ingredientsArray.push(`Yeast: ${beer.ingredients.yeast}`);
  return ingredientsArray.filter(function(item, index){
  return ingredientsArray.indexOf(item)== index; 
});
}

var createBeerIngredientsList = function(beer){
  var ul = document.querySelector('#ingredients-list');
  let ingredients = createBeerIngredientsArray(beer);
  ingredients.forEach(function(ingredient){
    var li = document.createElement('li');
    li.innerText = ingredient;
    ul.appendChild(li);
  })
}

var createBeerListItems = function(beerArray){
  var ul = document.querySelector('#list-beers');
  beerArray.forEach(function(beer){
    ul.appendChild(createBeerNameItem(beer));
    ul.appendChild(createBeerPicItem(beer));
  })
}
var createBeerNameItem = function(beer){
  let beerNameItem = document.createElement('li');
  beerNameItem.innerText = beer.name;
  return beerNameItem;
}

var createBeerPicItem = function(beer){
  let beerPic = createBeerImageFromURL(beer)
  let beerPicItem = document.createElement("li").appendChild(beerPic);
  return beerPicItem;
}

var createBeerImageFromURL = function(beer){
  var pic = document.createElement("img");
  pic.height = "100";
  pic.src = beer.image_url;
  return pic
}

var formBeersList = function(){
  var beers = getBeers()
  console.log(beers);
  createBeerListItems(beers);
}


var app = function(){
  console.log('sup!')

  var url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

  var select = document.querySelector('#select-beers');
  select.addEventListener('change', handleOptionSelected);

  // formBeersList();
  formBeerDropDown();

}

document.addEventListener('DOMContentLoaded', app);
