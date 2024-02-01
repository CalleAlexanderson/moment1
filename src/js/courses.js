// Globala konstanter och variabler
let data;

//används för att kolla vilken typ av sortering som görs på tabellen
let aToZ1 = true;
let aToZ2 = true;
let aToZ3 = true;
// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init() {
    getData();
    document.getElementById('course_code').addEventListener('click', () => {
        sortTable("code");
    });

    document.getElementById('course_name').addEventListener('click', () => {
        sortTable("name");
    });

    document.getElementById('course_prog').addEventListener('click', () => {
        sortTable("prog");
    });

    document.getElementById('search').addEventListener('keyup', search)
} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------


function search() {

    let trs = document.getElementsByTagName('tr');
    let input = document.getElementById('search').value.toLowerCase();
    let searched = []
    let tempDataSearch = data.slice();
    let searchedTable = [];

    for (let index = 0; index < trs.length; index++) {
        if (index != 0) {
            let h = trs[index].innerText.replaceAll('\t', ' ');
            h = h.toLowerCase();
            // console.log(h);
            let q = h.search(input);

            if (q != -1) {
                let g = trs[index].innerText.replaceAll('\t', ' ')
                searched.push(g);
            }
        }
    }

    for (let index = 0; index < tempDataSearch.length; index++) {

        for (let i = 0; i < searched.length; i++) {
            if (searched[i].substring(0, 6) == tempDataSearch[index].code) {
                searchedTable.push(tempDataSearch[index]);
            }
        }
    }
    console.log(searchedTable);
    makeTable(searchedTable);
}

function sortTable(action) {
    let tempData = data.slice();

    // sorterar datan i alafabetisk ordning beroende på vart man trycker
    switch (action) {
        case "code":
            if (aToZ1 == false) {
                tempData = tempData.sort((a, b) => (a.code > b.code) ? -1 : 1)
                aToZ1 = true;
            } else {
                tempData = tempData.sort((a, b) => (a.code > b.code) ? 1 : -1)
                aToZ1 = false;
            }
            break;

        case "name":
            if (aToZ2 == false) {
                tempData = tempData.sort((a, b) => (a.coursename > b.coursename) ? -1 : 1)
                aToZ2 = true;
            } else {
                tempData = tempData.sort((a, b) => (a.coursename > b.coursename) ? 1 : -1)
                aToZ2 = false;
            }
            break;

        case "prog":
            if (aToZ3 == false) {
                tempData = tempData.sort((a, b) => (a.progression > b.progression) ? -1 : 1)
                aToZ3 = true;
            } else {
                tempData = tempData.sort((a, b) => (a.progression > b.progression) ? 1 : -1)
                aToZ3 = false;
            }
            break;

        default:
            break;
    }
    console.log(tempData);
    makeTable(tempData);
}

async function getData() {
    try {
        const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php") //hämtar data
        data = await response.json();
    } catch (error) {
        console.log(error); //loggar om det blev något fel
    }

    if (data != null) {
        makeTable(data)
    } else {
        document.getElementById('course_main').innerHTML = "<p> Fel uppstod vid inladdning av tabell </p>";
    }
}

async function makeTable(tableData) {
    document.getElementById('table_body').innerHTML = "";


    for (let index = 0; index < tableData.length; index++) {
        // skapar tablerows med datan från json filen
        let tableRow = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        td1.appendChild(document.createTextNode(tableData[index].code));
        tableRow.appendChild(td1);

        td2.appendChild(document.createTextNode(tableData[index].coursename));
        tableRow.appendChild(td2);

        td3.appendChild(document.createTextNode(tableData[index].progression));
        tableRow.appendChild(td3);

        document.getElementById('table_body').appendChild(tableRow);
    }

}