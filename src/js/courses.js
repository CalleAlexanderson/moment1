// Globala konstanter och variabler
let data;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    getData();
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------


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

    let main = document.getElementById('course_main');
    let table = document.createElement('table');


    for (let index = 0; index < data.length; index++) {
        console.log(data[index].code);
        console.log(data[index].coursename);
        console.log(data[index].progression);
    }

    main.appendChild(table);
}