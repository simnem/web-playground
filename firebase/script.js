import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = { 
    databaseURL: "https://playground-74bb6-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const ulList = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearInputFieldEl();

    onValue(shoppingListInDB, function(snapshot) { 
        let itemsArray = Object.values(snapshot.val());
        for( let item of itemsArray) { 
            appendItemToShoppingListEl(item);
        }
    })


})
function clearInputFieldEl() { 
    inputFieldEl.value = '';
}
function appendItemToShoppingListEl(li) {
    ulList.innerHTML += `<li>${li}</li>`;

}