function addVeg(){
  var vegname = document.getElementById('vege_name').value;
  var weight = document.getElementById('weight').value;
  var price = document.getElementById('price').value;

  var params = "veg_name="+vegname+"&weight="+weight+"&price="+price;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
      document.getElementById('succeed').innerHTML = "<h1>Success</h1>";
    }
  }

  xhttp.open("POST", "/farmers/addVeg", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params)
}
