

//Javascript basics
//ejercicio 1

console.log("Starting javascript...");

var myName = "Lighuen Geronimo Tula";
console.log(myName);

//ejercicio 2

var myAge = 25;
console.log(myAge);

//ejercicio 3
var ignasiAge = 32;
var ageDiff = myAge - ignasiAge;
console.log(ageDiff);


//condicionales
//ejercicio 4

if (myAge>21){
  console.log("You are older than 21")
}
else {
    console.log("You are not older than 21")

}

//ejercicio 5

if (myAge>ignasiAge){
  console.log("Ignasi is yonuger than you")

}
else if (myAge<ignasiAge){
  console.log("Ignasi is older than you")

}
else{
  console.log("You have the same age as Ignasi")
}

//Javascript array functions
// ejercicio 1: sorting an array 

var names = ['Silvana Darlik', 'Matías Guerrero', 'Hernán', 'Miriam', 'Agustina Oficialdegui',
 'Alejandro Belo', 'Alejandro Raffo', 'Amad Saed', 'Cristian Cahe', 'Regina Molares', 'Nahuel Correa',
 'Elizabeth Sainz', 'Federico Viola', 'Tomás Shiao', 'Genaro Di Martino', 'Iara Baya', 'Inés Ehulech',
 'José Luis González', 'Joseph Flores', 'Leonardo López', 'Lighuen Gerónimo', 'Luz Marina Pereira',
 'Marco A. López', 'Mateo Barreiros'];

names.sort();

//primer y ultimo nombre
console.log("First name: " + names[0]);
console.log("Last name: " +names[23])

//todos
for (var i=0; i<names.length;i++){
  console.log(names[i]);
}

// ejercicio 2: looping over an array
//todos
var edades= [17,18,25,21,54,32];
var cont=0;

while(cont<edades.length){
  console.log(edades[cont]);
  cont++;
}

//solo pares
cont=0;
while(cont<edades.length){

  if(edades[cont]%2==0){
  console.log(edades[cont]);
  }
  cont++;
}

//con for

//todos

for(var i=0;i<edades.length;i++){
  console.log(edades[i]);
}
//solo pares

for(var i=0;i<edades.length;i++){
  if(edades[i]%2==0){
    console.log(edades[i]);
    }
}

//funciones
// ejercicio 3: funcion para sacar el numero mas chico del array
function lowestNumber(array){

  var lowestNumber=99999999999;
  for(var i=0;i<edades.length;i++){
    if(array[i]<lowestNumber){
      lowestNumber=array[i];
    }
  }
  console.log("El numero mas bajo del array es "+lowestNumber);
}

lowestNumber(edades);

var prueba=[2,534,33,0,1,64];
lowestNumber(prueba);

//ejercicio 4: funcion para sacar el numero mas grande del array

function biggestNumber(array){

  var biggestNumber=-99999999999;
  for(var i=0;i<edades.length;i++){
    if(array[i]>biggestNumber){
      biggestNumber=array[i];
    }
  }
  console.log("El numero mas alto del array es "+biggestNumber);
}

biggestNumber(edades);

var prueba=[2,534,33,0,1,64];
biggestNumber(prueba);

//ejercicio 5

function index(array,num){
  if(num<array.length){
    console.log(array[num]);
  }
  else{
    console.log("Index no valido")
  }
}

index(edades,5);
index(edades,40);
index(prueba,2);
index(prueba,6);

//ejercicio 6


function findRepeated(array){
  var arr=[]; //array nuevo para meter los numeros repetidos

  for (var i=0;i<array.length;i++){
    
    var isRepeated=false;//boolean que avisa si esta repetido
    var n=i+1;
    
    if (arr.includes(array[i])){
      continue;
    }
    else{
      
      while((!isRepeated) && (n<array.length)) { //mientras no se encuentre repetido el numero y n sea menor que el total del array
        isRepeated=(array[i]==array[n]);   
        n++;
      }

      if (isRepeated) {  //chequea que este repetido dentro del array argumento y NO este dentro de arr
        arr.push(array[i]);
      }
    }
  }
  //muestra los numeros repetidos
  console.log(arr.toString());
}


var repeatedNumbers = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100,33,33,44,44,44]; 
findRepeated(repeatedNumbers);


//ejercicio 7
var myColor = ["Red", "Green", "White", "Black"];


function myColorString(){
  var colorString ="";

  for (var i=0;i<myColor.length;){

    colorString+= "\"" + myColor[i] +"\"";
    i++;

    if (i<myColor.length){
      colorString+=", "
    }
  }
  console.log(colorString);
}

myColorString();


//JS String Functions
//ejercicio 1

var numero = 12345;

function revertirNumero(strNumber){
  var numeroRevertido="";
  if (typeof(strNumber)=="number"){
    strNumber = strNumber.toString();
  }
  for(var i= strNumber.length-1; i>-1 ;i--){
    numeroRevertido =numeroRevertido+ strNumber[i];
  }
  console.log(numeroRevertido);
}

revertirNumero(numero);
revertirNumero("0001");
revertirNumero(0001);

//ejercicio 2
var x = "webmaster";
var z="developers";

function sortStringAlphabetically(s){
  var newArray = s.split([,]);
  newArray.sort();
  s = newArray.join([,]);
  console.log(s);
}

sortStringAlphabetically(x);
sortStringAlphabetically(z);

//ejercicio 3
var stringPop = "prince of persia";
console.log(stringPop.length);

function firstLetterUpperCase(str){
  str=str.split(" "); // convierte la cadena en un array, donde cada palabra es un item
  
  for (var i = 0; i <str.length; i++) {
  /* por cada iteracion, la primer posicion de cada item (la primer letra) se vuelve
  mayuscula, y se le agrega el resto de la palabra. Ej: prince = P+rince */
    str[i]= str[i][0].toUpperCase() + str[i].slice(1); 
  }
  str= str.join(" "); //se revierte el array en una cadena, cada item separado por espacios

  console.log(str);
}

firstLetterUpperCase(stringPop);

//ejercicio 4
var x = "Web Development Tutorial"
var otroStringDePrueba= "string frases seis letras prueba"
function findLongestWord(str){
  var longestWord; //variable que guarda la palabra mas larga, o los multiples candidatos en caso de haber varias del mismo tamaño
  var longestWordSize=0; //variable que guarda el tamaño de la palabra mas larga

  str =str.split(" ");

  for  (var i = 0; i <str.length; i++){
    if (str[i].length> longestWordSize){ //si la palabra de la iteracion es mas larga que la almacenada hasta entonces...
      longestWord=str[i];        //...reemplaza a la actual.
      longestWordSize= str[i].length;
    }
    else if (str[i].length == longestWordSize){  //si las palabras mas largas de la frase tienen la misma cantidad de caracteres...
      longestWord +=", it could also be: " +str[i];  //...se genera una frase indicando las posiblidades
    }
  }
  console.log(longestWord);
}

  
findLongestWord(x);
findLongestWord(stringPop);
findLongestWord(otroStringDePrueba);

