// Globala konstanter och variabler
let data;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    getData();
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------

function name(params) {

}

async function getData() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php") //hämtar data
        data = await response.json();
    } catch (error) {
        console.log(error); //loggar om det blev något fel
    }
    makeTable()
}

async function makeTable() {
    console.log(data);

    for (let index = 0; index < data.length; index++) {
        // skapar tablerows med datan från json filen
        let tableRow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        
        td1.appendChild(document.createTextNode(data[index].code));
        tableRow.appendChild(td1);

        td2.appendChild(document.createTextNode(data[index].coursename));
        tableRow.appendChild(td2);

        td3.appendChild(document.createTextNode(data[index].progression));
        tableRow.appendChild(td3);

        document.getElementById('table_body').appendChild(tableRow);
    }

}