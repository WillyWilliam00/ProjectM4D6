let DropChoise 
const row = document.querySelector("tbody")
let result = []

async function getusers() { //funzione asicrona per recuperare la tabella 
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    return data
    
}

function DisplayUsers(data) {//funzione  per mostrare la tabella 
    result = data

    row.innerHTML =  result.map(user => 
        
        `<tr>
                <th scope="user">${user["id"]}</th>
                <td>${user["email"]}</td>
                <td>${user["username"]}</td>
                <td>${user["name"]}</td>
         </tr>` 
    ).join("")
}



window.onload = async function () {
    
    const usersdata = await getusers()
    DisplayUsers(usersdata)
    

}

document.querySelectorAll('li').forEach( function(li) { //inserisco event listener per modificare il titolo del drop e prendere la viaribile da filtrare
            
    li.addEventListener('click', function() {
        document.querySelector('.dropdown-toggle').innerText = li.innerText;
        DropChoise = `${li.innerText.toLowerCase()}`
        text() //richiamo la funzione text per modificare la tabella nel caso si volesse cambiare il filtro e l'input search fosse già pieno
        
    });
});



function text() { //funzione che aggiorna il dom in base all'input value search
    
    const value = document.querySelector("input").value

    if(DropChoise === undefined){
        alert("Inserisci un filtro!")
        
    } else {
        
        let ArrayUsersByDrop = result.filter(user => 
            user[DropChoise].toLowerCase().includes(value.toLowerCase())
        )
        
        row.innerHTML =  ArrayUsersByDrop.map(user => 
            
            `<tr>
                    <th scope="user">${user["id"]}</th>
                    <td>${user["email"]}</td>
                    <td>${user["username"]}</td>
                    <td>${user["name"]}</td>
             </tr>` 
        ).join("")
        if(ArrayUsersByDrop.length === 0){
            row.innerHTML = "INSERISCI UN PARAMETRO VALIDO"
        }
    }
}




