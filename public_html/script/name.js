var listcheck = 0;

function setSearchbar(){
			if(listcheck < 1)
			{
				console.log("hello");
				console.log(listcheck);
				var elemente = document.createElement("label");
				elemente.setAttribute("for", "searchbar");
				elemente.setAttribute("id", "searchbar");
				document.getElementById('raumbelegung-struktur').appendChild(elemente);
				document.getElementById('searchbar').innerHTML = 'Suche:';
				var element = document.createElement("input");
				element.setAttribute("type", "text");
				element.classList.add("justify-content-center", "search-options", "row");
				element.setAttribute("placeholder", "Raumnummer...");
				document.getElementById('raumbelegung-struktur').appendChild(element);
				listcheck++;
			}
}

function nameValid() {
}

function nameSearch() {
}