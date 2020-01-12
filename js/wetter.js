/********************************************************
 * Wetter im Json-Format von openweathermap.org abrufen *
 * Version 0.9.2 von Ash-Lambert copyleft 11-01-2020       	*
 ********************************************************/
'use strict';
function wetterJson(){
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=IhreStadt&appid=IhreID",
		
		function(json){
		var timeData = new Date(json.dt * 1000);
		var temp = json.main.temp - 273.15;
		var dscptn = json.weather[0].id;
		var windSpeed = json.wind.speed * 3.6;
		var windDeg = json.wind.deg;
		var sunRise = new Date(json.sys.sunrise * 1000);
		var sunSet = new Date(json.sys.sunset * 1000);
		var hours = timeData.getHours();
		var minutes = timeData.getMinutes();
		var srHours = sunRise.getHours();
		var srMinutes = sunRise.getMinutes();
		var ssHours = sunSet.getHours();
		var ssMinutes = sunSet.getMinutes();
		document.getElementById("wetterIcon").style.display="block";
		
		//führende Null bei Stunden und Minuten < 10 hinzufügen
		hours = ((hours < 10) ? "0" + hours : hours);
		minutes = ((minutes < 10) ? "0" + minutes : minutes);
		srHours = ((srHours < 10) ? "0" + srHours : srHours);
		srMinutes = ((srMinutes < 10) ? "0" + srMinutes : srMinutes);
		ssHours = ((ssHours < 10) ? "0" + ssHours : ssHours);
		ssMinutes = ((ssMinutes < 10) ? "0" + ssMinutes : ssMinutes);
		
		//negative Null bei Temperatur entfernen
		if (temp <= 0.00 && temp >= -0.04) {
			temp = 0.0
		}
		
		//Nachkommastellen auf eine begrenzen
		temp = temp.toFixed(1);
		windSpeed = windSpeed.toFixed(1);
		
		//Überschrift und Erfassungsdatum der Messwerte ausgeben
		document.getElementById("tre").innerHTML = "Wetter für Ihre Stadt" + "<br>" + hours + ":" + minutes + "<br>";
			
		//Temperatur ausgeben
		document.getElementById("temp").innerHTML = "Temperatur: " + temp + "°C";
			
		/*Beschreibung und Icon je nach Kondition ausgeben
		Liste der Konditionen unter: https://openweathermap.org/weather-conditions
		oder ausführlicher unter https://gist.github.com/tbranyen/62d974681dea8ee0caa1 */
			
		if (dscptn == "800" || dscptn == "904" || dscptn == "951") {
			document.getElementById("desc").innerHTML = "Beschreibung: wolkenlos";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn == "801" || dscptn == "802") {
			document.getElementById("desc").innerHTML = "Beschreibung: leicht bewölkt";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn == "803" || dscptn == "804") {
			document.getElementById("desc").innerHTML = "Beschreibung: bewölkt";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "300" && dscptn <= "321") {
			document.getElementById("desc").innerHTML = "Beschreibung: Nieselregen";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn == "500" || dscptn == "501") {
			document.getElementById("desc").innerHTML = "Beschreibung: leichter Regen";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "502" && dscptn <= "504") {
			document.getElementById("desc").innerHTML = "Beschreibung: Starkregen";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn == "511") {
			document.getElementById("desc").innerHTML = "Beschreibung: gefrierender Regen";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "520" && dscptn <= "531") {
			document.getElementById("desc").innerHTML = "Beschreibung: Regen";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "600" && dscptn <= "622") {
			document.getElementById("desc").innerHTML = "Beschreibung: Schneefall";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "200" && dscptn <= "232") {
			document.getElementById("desc").innerHTML = "Beschreibung: Gewitter";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn >= "701" && dscptn <= "761") {
			document.getElementById("desc").innerHTML = "Beschreibung: neblig";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else if (dscptn == "906") {
			document.getElementById("desc").innerHTML = "Beschreibung: Hagel";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}
		else {
			document.getElementById("desc").innerHTML = "Beschreibung: Weltuntergang";
			document.getElementById("wetterIcon").src="Link zu Ihrem Bild";
		}

		//Luftfeuchte ausgeben
		document.getElementById("humi").innerHTML = "Luftfeuchte: " + json.main.humidity + "%";
			
		//Windrichtung je nach Zahl 0-360 ausgeben
		if (windDeg > "337" || windDeg >= "0" && windDeg < "23") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Norden";
		}
		else if (windDeg > "22" && windDeg < "69") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Nordosten";
		}
		else if (windDeg > "68" && windDeg < "115") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Osten";
		}
		else if (windDeg > "114" && windDeg < "161") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Südosten";
		}
		else if (windDeg > "160" && windDeg < "207") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Süden";
		}
		else if (windDeg > "206" && windDeg < "253") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Südwesten";
		}
		else if (windDeg > "252" && windDeg < "299") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Westen";
		}
		else if (windDeg > "298" && windDeg < "338") {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Nordwesten";
		}
		else {
			document.getElementById("wind").innerHTML = "Wind: " + windSpeed + " km/h aus " + "Bielefeld";
		}
			
		//Sonnenauf/untergang ausgeben
		document.getElementById("auf").innerHTML = "Sonnenaufgang: " + srHours + ":" + srMinutes;
		document.getElementById("unter").innerHTML = "Sonnenuntergang: " + ssHours + ":" + ssMinutes;
    });
}