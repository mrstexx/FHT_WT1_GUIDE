var jsonList;
var inhalt1 = [];
var inhalt2 = [];

$(function (){
console.log( "ready!" );
$.ajax({ 
  type : 'GET',
  dataType: 'json',
  url : '../../rooms.json', 
  success : (result) => {
            $.each(data, (objkey, objval) => {
                inhalt1.push({ key: objkey, value: objval })
            });
            $.each(inhalt[0].value, (objval, objkey) => {
                inhalt2.push({ key: objkey, value: objval })
            })
 },
});
})

function setListe(){
		var elementlist = document.createElement("ul");
		elementlist.setAttribute("id", "setlistjson");
		
		//eine eigene var für jedes li
		for(var y = 0; y < inhalt2.length ; y++)
		{
			var elementlisteliy = document.createElement("li");
		}
		
		//damit jedes li eine unique id hat
		for(var x = 0; x < inhalt2.length ; x++)
		{
			elementlisteli[x].setAttribute("id", "elementlisteli"[x]);
		}
		
		for(var z = 0; z < inhalt2.length ; z++)
		{
			document.getElementById('elementlisteli'[z]).appendChild(elementlisteli[z]);
		}
		
}