//Javascript Document//
function start(){
    
    showData();
    var buttonTask = document.getElementById("task");
    
    buttonTask.addEventListener("click", addItem, false);    
    
}

function addItem(){
    
    var positionKeyStorage = localStorage.length;
    var keyWord = document.getElementById("keyWord").value;
    
    if(keyWord != ""){
        if(localStorage.length != 0){
        
            localStorage.setItem(positionKeyStorage, keyWord); 

        }else{
            
            localStorage.setItem(positionKeyStorage, keyWord);
            
        }
        showData();
        document.getElementById("keyWord").value = "";
    }else {
        alert("The fields are empty.");
    }
    
}

function removeItem(delKey){//se recibe el key a borra por parámetros
    
    var valueHere = localStorage.getItem(delKey);
    var howItems = localStorage.length;
    var newItems = [];
    var newKey = 0;
    var cont = 0;
    
    if (confirm("Confirm you wanna delete: '" + valueHere + "' item?")){
        
        for(i = 0; i < howItems; i++){
            for(j = 0; j < howItems; j++){
                newKey = localStorage.key(j);
                if(newKey == i && newKey != delKey){
                    newItems[cont] = localStorage.getItem(newKey);
                    cont++;
                }
            }
        }

        localStorage.clear();//se borra todo lo que hay en 'localStorage'
        howItems = newItems.length;
                
        for(i = 0; i < howItems; i++){
            localStorage.setItem(i, newItems[i]);
        }
        
        showData();        

    }
    
}

function editItem(ediKey){//se recibe el key a editar por parámetros
    
    var valueHere = localStorage.getItem(ediKey);//obtenemos el valor del tasks gracias al 'key' ídice que hemos enviado
    if (confirm("You wanna edit: '" + valueHere + "' item?")){
        
        var newValue = prompt("Edit your task: ", valueHere);
        
        if(newValue != null && newValue != ""){

            localStorage.setItem(ediKey, newValue);
            showData();
            
        }else {
            
            alert("You did not enter a new task, there are no changes to save.");
            
        }
    }
    
}

function removeAll(){
    
    if (confirm("Delete all data?")){
        localStorage.clear();
        showData();
    }
    
}

function showData(){
    
    var zoneData = document.getElementById("zoneData");
    var arrayItem = [] = orderItems();
    
    zoneData.innerHTML = "";
    
    for(i = 0; i < arrayItem.length; i++){
        
        zoneData.innerHTML += ('<div>' + arrayItem[i] + '<div> <button onclick = "removeItem(\'' + i + '\')"> <i class="fas fa-trash-alt"></i> Delete</button> <button onclick = "editItem(\'' + i + '\')"><i class="fas fa-edit"></i> Edit</button> </div></div>');
        
    }
    
    if(localStorage.length != 0){
        zoneData.innerHTML += '<button id ="clearAll" onclick="removeAll()"><i class="fas fa-trash"></i> Clear all</button>';
    }else{
        zoneData.innerHTML = "Waiting read data...";
    }

}

function orderItems(){
    
    var howItems = localStorage.length;
    var newItems = [];
    var newKey = 0;

    for(i = 0; i < howItems; i++){
        for(j = 0; j < howItems; j++){
            newKey = localStorage.key(j);
            if(newKey == i){
                newItems[i] = localStorage.getItem(newKey);
            }
        }
    }
    return newItems;

}

window.addEventListener("load", start, false);