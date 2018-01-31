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

  formBeersList();

}

document.addEventListener('DOMContentLoaded', app);
