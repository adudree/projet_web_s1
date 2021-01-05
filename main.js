var level = 0;
var answerMessage ="Hi! I’m glad you accepted to be my teammate. This is the machine I was talking about. It is written on it “People from the future, I need your help. If you were able to activate this artefact, it means that the technology is sufficient at your time.” ";
var end = 1; //Variable pour changer le message en déconnecté quand tout le jeu a été joué une fois.
var functionTimeout;

var buttonSwitch = true;
const suite = document.querySelector('#suite');
suite.addEventListener('click', displayText);


displayMeteoImages(level, answerMessage );

recupWeather = (body) => {
  if (body.current) {
        var weather=body.current.weather_descriptions[0];
        if ((weather.indexOf("Snow") >= 0) || (weather.indexOf("snow") >= 0)) {
            return "snowy";
        }
        if ((weather.indexOf("Rain") >= 0) || (weather.indexOf("rain") >= 0)) {
            return "rainy";
        }
        if ((weather.indexOf("Thunder") >= 0) || (weather.indexOf("thunder") >= 0)) {
            return "thundery";
        }
        if ((weather >= 0 || weather.indexOf("ice") >= 0) || (weather.indexOf("Sleet") >= 0 || weather.indexOf("sleet") >= 0)) {
            return "sleety";
        }
        if ((weather.indexOf("Fog") >= 0) || (weather.indexOf("fog") >= 0) || (weather.indexOf("Mist") >= 0) || (weather.indexOf("mist") >= 0)) {
            return "foggy";
        }
        if ((weather.indexOf("Sun") >= 0) || (weather.indexOf("sun") >= 0) || (weather.indexOf("Clear") >= 0) || (weather.indexOf("clear") >= 0)) {
            return "sunny";
        }
        if ((weather.indexOf("Cloud") >= 0) || (weather.indexOf("cloud") >= 0) || (weather.indexOf("Overcast") >= 0) || (weather.indexOf("overcast") >= 0)) {
            return "cloudy";
        }
    } 
    else {
        return null;
    }
}

recupTemperature = (body) => {
    if (body.current) {  
        var temperature = body.current.temperature;
    
        if (temperature>30) {
            return "hot";
        }
        else if (temperature >= 18 && body.current.temperature < 30) {
            return "warm";
        }
        else if (temperature >= 0 && body.current.temperature < 18) {
            return "cold";
        }
        else if (temperature < 0){
            return "icy";
        }
    }
    else {
        return null;
    }
}

function displayMeteoTemp(body) {
    var temperature = recupTemperature(body);
    var weather = recupWeather(body); 

    if (weather && temperature) {
        const meteo = document.querySelector('#meteo');
        const thermometre = document.querySelector('#thermometre');
    
        meteo.style.backgroundImage = "url(img/meteo/" + weather + ".png";
        thermometre.style.backgroundImage = "url(img/meteo/" + temperature + ".png)"; // ATTENTION AU FORMAT !!!!!!!!!!    
    }
}

function MeteoValue(level) {
    var meteoValue;
    if (level === 0) {
        meteoValue ="snowy";
    }

    else if (level === 1) {
        meteoValue ="sunny";
    }

    else if (level === 2) {
        meteoValue ="rainy";
    }
    
    else if (level === 3) {
        meteoValue ="stormy";
    }
    
    else if (level === 4) {
        meteoValue = null;
    }

    // VALEURS DE TEST 

    // if (level === 0) {
    //     meteoValue ="sunny";
    // }

    // else if (level === 1) {
    //     meteoValue ="sunny";
    // }

    // else if (level === 2) {
    //     meteoValue ="sunny";
    // }
    
    // else if (level === 3) {
    //     meteoValue ="sunny";
    // }
    
    // else if (level === 4) {
    //     meteoValue = null;
    // }
    
    else {
        console.log("error");
        meteoValue = null;
    }

    console.log("we want : " +meteoValue);
    return meteoValue;
}

function compareCurrentValue(currentTemperature, currentWeather, meteoValue) {
    if (currentTemperature === meteoValue || currentWeather === meteoValue) {
        return 1;
    }
    else {
        console.log("try again");
        return 0;
    }
}

function returnLevel(compareCurrentValue, level) {
    if (compareCurrentValue === 1) {
        level++;
    }
    return level;
}

function returnPhrase(compareCurrentValue, currentWeather) {
    var answerMessage;    
    if (compareCurrentValue === 1) {
        answerMessage = "Well done ! We are now in a " + currentWeather + " area. "; 
    } 
     else {
        answerMessage = "Oh no, it doesn't work because the place you have suggested is " + currentWeather + ". Try again!";
    }

     if (currentWeather === null) {
        answerMessage = "The machine didn't understand where you want to go."; 
    }

    console.log(answerMessage);
    return answerMessage;
}


function displayMeteoImages(level, answerMessage) {

    document.getElementById("myLevel").innerHTML ="Level " + level;

    const globe=document.getElementById("globe");
    const illuRight=document.getElementById("illuR");
    const bg=document.getElementById("content");

    bg.style.backgroundImage = "url(img/background" + level + ".jpg)";
    globe.setAttribute("src","img/Sphere" + level + ".png");
    illuRight.style.backgroundImage = "url(img/illuRight" + level + ".png)";    

    const illuLeft=document.getElementById("illuL");
    if(level<3) {
    illuLeft.style.backgroundImage = "url(img/illuLeft0.png)"; 
    } else {
    illuLeft.style.backgroundImage = "url(img/illuLeft1.png)"; 
    }

    if (answerMessage) {
        affichageParLettre("myText", answerMessage); // s'il y a un message retour, afficher ce message avant la suite.
        suite.style.display="block";
    }

     buttonSwitch = true; //Quand on met en place un nouveau niveau, on veut pouvoir utiliser le bouton switch pour passer le answerMessage vite donc il doit être true.
}


 function displayText() {
        
       
        if (buttonSwitch)  {
            
            clearTimeout(functionTimeout);
            document.getElementById("myText").innerHTML = answerMessage;
            buttonSwitch = false; // Quand on a passé le texte vite, le bouton Switch permet de lire le suivant. Il passe à false pour faire son autre action.

        }

        else {

            suite.style.display="none";
            buttonSwitch = true;

            if (level === 0) {
            affichageParLettre("myText", "“Find me so I can explain everything to you. I am in a place where I can stay a very long time, because all my organs are asleep in an <i>icy cocoon</i>.” Please try and teleport me in a <i>cold </i> place … so we can find the engineer who made this machine.");
            console.log("niveau0");
            }
            else if (level === 1) {
            affichageParLettre("myText", "Wow! This is really a big piece of ice! It looks like there is something in it… <br> Can you teleport me and this thing in a place where it can <i>melt</i>?");
            console.log("niveau1");
            }
    
             else if (level === 2) {
            affichageParLettre("myText", "A man! He must be the scientist who built this machine and wrote the message! The screen of the machine is beeping, and the text changed: “Dr Sky detected. Initialization of the Recovery Process. Please fill the Amniotic <i>Fluid</i> to set up the Waking Device.” I think we need some <i>water</i>.");
            console.log("niveau2");
            }
        
             else if (level === 3) {
            affichageParLettre("myText", "Ok… the… jar on the side of the machine, absorbed the rain, and has grown a lot. Now it is full of water. I put the man inside and the machine seems to be scanning him. Now the text says: “Ready to launch the process. Please provide the maximum <i>electric</i> power you can and press START.”");
            console.log("niveau3");
             }
        
             else if (level === 4) {
                if (end === 1) {
                 affichageParLettre("myText", "Earth person? Dr Sky speaking. Thanks for waking me up. I built this machine when it was impossible to contact you. But the whole system works with the weather connection between your planet and mine, so it wasn’t usable. Now, your “internet” is a good way for us to speak to you. I will continue my researches. I hope to create a bridge between you and us one day. <br> Goodbye.");
                  end++;
                 } else {
                affichageParLettre("myText", "<i>Disconnected.</i>");
                }

                const restart = document.querySelector('#restart');
                restart.classList.toggle('invisible');
                restart.classList.toggle('visible');            
            }
        
             else {
            console.log("error");
             }   

           
        }
       
    }



//connexion API 
async function test() {
    var input = document.getElementById("city").value;
    var query = "&query="+input;

    const response = await fetch('http://api.weatherstack.com/current?access_key=29cb909a1d9542d0b5476937234c2829'+query);
    const body = await response.json();

    try {
        console.log(body);
    }
    catch {
        console.log("error");
    }

    //images à afficher
    var currentTemperature = recupTemperature(body);
    var currentWeather = recupWeather(body);
    displayMeteoTemp(body); // affichage
    console.log("we have : " + currentWeather);
    meteoValue = MeteoValue(level);
    var compare = compareCurrentValue(currentTemperature, currentWeather, meteoValue);
    var newLevel = returnLevel(compare, level);
    answerMessage = returnPhrase(compare, currentWeather);
    level = newLevel;
    displayMeteoImages(level, answerMessage);
    console.log(level);
}


/* ========== AUTRES ========== */

//rechercher la ville 
const btn = document.querySelector('#search');
btn.addEventListener('click', test);

const input = document.querySelector('#city');
city.addEventListener('keydown', (event) => {
    if (event.keyCode == '13') {
        test();
    }
    else {
        console.log ("i don't like your keycode but I hear the event.")
    }
});

// Utilisation du bouton + pour afficher la page d'infos :
function informations() {
    const info = document.querySelector('#infopop');
    info.classList.toggle('invisible');
    info.classList.toggle('visible');
}

const btnInfo = document.querySelector('#plusdInfo');
btnInfo.addEventListener('click', informations);

// Defilement du texte :

function affichageParLettre(id, text) {
    var messageAffiche = "";
    var indexmax = text.length;

    affichageLettreSuivante(0, id, messageAffiche, text, indexmax);
}

function affichageLettreSuivante (index, id, messageAffiche, text, indexmax) {
    var nouvelleLettre = text.charAt(index);
    messageAffiche = messageAffiche + nouvelleLettre;
    document.getElementById(id).innerHTML = messageAffiche;

    if (index<indexmax) 
    {
        functionTimeout = setTimeout(affichageLettreSuivante, 30, index+1, id, messageAffiche, text, indexmax); // 30 est le délai entre les lettres 
    } else {
        buttonSwitch = false; // Si le texte est entièrement affiché, le bouton Switch ne sert qu'à passer au suivant il peut donc être false.
    }
    
}