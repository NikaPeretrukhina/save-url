import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js"
import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js"


const firebaseConfig = {
    databaseURL: "https://lead-tracker-app-c60dd-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")



const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

const themeToggle = document.getElementById("theme-toggle")
const htmlElement = document.documentElement



themeToggle.addEventListener("click", function () {
    let currentTheme = htmlElement.getAttribute('data-theme')
    let newTheme = (currentTheme === 'dark') ? 'light' : 'dark'

    htmlElement.setAttribute('data-theme', newTheme)
    themeToggle.innerHTML = (newTheme === 'dark') ? "☀️" : "🌙"

    localStorage.setItem('theme', newTheme)
})





function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist){
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)
    }
})

deleteBtn.addEventListener("dblclick", function () {
    remove(referenceInDB)
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function () {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""

})