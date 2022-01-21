let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const saveTab = document.getElementById("tab-btn")
const deleteAllBtn = document.getElementById("delete-all-btn")

//taking data from local storage//
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
//rendering a list of collected data//
function render(array) {
    let listItems = ""
    for(let i = 0; i < array.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${array[i].website}'>
                ${array[i].website}
                </a>
                <img id='${array[i].id}' class="delete-btn" src="recycle-bin2.png" alt="">
            </li>
        `
    }
    ulEl.innerHTML = listItems
    getIdOfItem()
}

// input bar //
inputBtn.addEventListener("click", function() {
    myLeads.push({
        id: Date.now(),
        website: inputEl.value
    })
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
//saving current tab//
saveTab.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push({
            id: myLeads.length + 1,
            website: tabs[0].url
        })
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

//deleting a chosen link//
function getIdOfItem() {
    for(let i=0; i < myLeads.length; i++) {
        document.getElementById(myLeads[i].id).addEventListener("click", event => {
            itemDelete(event.target.id)
        })
    }
}
function itemDelete(id) {
    for(let i = 0; i < myLeads.length; i++) {
        if(myLeads[i].id == id) {
            let deleted = myLeads.splice(i, 1)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            break
        }  
    }
    render(myLeads)
}

//deleting all stored info//
deleteAllBtn.addEventListener("click", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
