function Utils() {};

Utils.shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

Utils.randomColorWithoutColors = function(colors){
  var list = ["#f47676","#e7d2a8","#00ffff","#d2a8a9","#59d286","#b38519","#75bb95","#e59ca6","#a9496e"]
  var newList = list.filter(function(item){
    return colors.indexOf(item) == -1
  })
  var item = newList[Math.floor(Math.random()*newList.length)];
  return item
}

 module.exports = Utils;
