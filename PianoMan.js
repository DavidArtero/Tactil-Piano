"use strict";

// Quan acaba la transició, elimina la classe 'activa'
//	per tornar la tecla al color normal
function removeTransition(e) {
	this.classList.remove('activa');
}

// Fa sonar la nota corresponent al codi de la tecla del teclat
function play(k) {
	// Busca el so corresponent al codi
	var audio = document.getElementById("a" + k);
	if (!audio) return;
	// Toca el so
	audio.currentTime = 0;
	audio.play();

	// Afegeix la classe 'activa' a la tecla (pinta la tecla)
	document.getElementById("k" + k).classList.add('activa');
}







// Afegir controladors d'esdeveniments (teclat i ratolí)
// i qualsevol altre cosa que calgui inicialitzar
function init() {
	var teclaPremuda;
	
	//Detectar quina lletre han presionat
	window.onkeydown = function(e){
		teclaPremuda = e.key;	

		//Evitar caràcters especials com shift etc (la 1ª lletra pot coincidir amb una vocal)
		if(e.key.length>1){
			teclaPremuda="";
		}	
		//(e.keyCode||e.which); <- Altre possible sol·lució
		facilitarPiano(teclaPremuda.toUpperCase());

		//Convertim a UpperCase i agafem el primer caràcter
		teclaPremuda = teclaPremuda.toUpperCase().charCodeAt(0);
		
		//Evitar que si mantenen apretat es repetixi el so
		if(e.repeat){
			teclaPremuda = "";
		}
		
		//Emetre el so
		play(teclaPremuda);
   }

   //Funció per comprobar si és una de les lletres que ha de sonar com si fossin un altre (facilitar tocar el piano)
   function facilitarPiano(a){

	   if(a == "K")	teclaPremuda= "R"
	   else if (a == "L") a = teclaPremuda= "T"
	   else if (a=="Ñ") teclaPremuda= "Y"
	   else if (a=="Q") teclaPremuda= "G"
	   else if (a=="W") teclaPremuda= "H"
	   else if (a=="E") teclaPremuda= "J"
	   }
	   

	  /* Funció per al ratolí (sense touchStart)
	   window.addEventListener("click", function(event) {
		   teclaPremuda= event.toElement.id;
		   teclaPremuda = teclaPremuda.substring(1);
		   play(teclaPremuda)
	});*/


	//Funció per a TouchStart
	window.addEventListener('touchstart', function(e){
		//Recorrem les tecles premudes i emetem el so
		for (var i = 0; i < e.changedTouches.length; i++) {
						
			//Treiem el primer caràcter
			teclaPremuda = e.changedTouches[i].target.id.replace('k','');
			//Emetre el so
			play(teclaPremuda);
		  }
    }, false)}



function _init() {
	TouchEmulator();

	(function() {
		var i, p;

		const bkx = [31, 76, 166, 211, 256, 346, 391, 481, 526, 571];
		const bk = "1234567890";
		const wk = "ASDFGHJRTYUIOP";
		const s = "cdefgabcdefgab";
		const ss = "cdfgacdfga";

		// Dibuixar tecles
		p = document.getElementById("piano");
		for(i = 0; i < wk.length; ++i) {	// Tecles blanques i lletres
			p.innerHTML += "<rect x='" + (i * 45 + 1) + "' y='1' width='45' height='218' class='white' id='k" + wk.charCodeAt(i) + "'/>";
			p.innerHTML += "<text x='" + (i * 45 + 24) + "' y='205' class='white' id='c" + wk.charCodeAt(i) + "'>" + wk.charAt(i) + "</text>";
		}
		for(i = 0; i < bkx.length; ++i) {	// Tecles negres i números (sustinguts)
			p.innerHTML += "<rect x='" + bkx[i] + "' y='1' width='30' height='98' class='black' id='k" + bk.charCodeAt(i) + "'/>";
			p.innerHTML += "<text x='" + (bkx[i] + 15) + "' y='90' id='c" + bk.charCodeAt(i) + "'>" + bk.charAt(i) + "</text>";
		}

		// Afegir sons
		p = document.body;
		// Tecles blanques
		for(i = 0; i < s.length; ++i) p.innerHTML += "<audio id='a" + wk.charCodeAt(i) + "' src='" + s.charAt(i) + (Math.floor(i/7) + 1) + ".mp3'/>";
		// Tecles negres (sustinguts)
		for(i = 0; i < ss.length; ++i) p.innerHTML += "<audio id='a" + bk.charCodeAt(i) + "' src='" + ss.charAt(i) + (Math.floor(i/5) + 1) + "s.mp3'/>";

		document.querySelectorAll('rect').forEach(key => key.addEventListener('transitionend', removeTransition));
	})();

	init();
}

