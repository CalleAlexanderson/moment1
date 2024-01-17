// Globala konstanter och variabler

// --------------------------------------------------
// Initiera globala variabler och händelsehanterare
function init(){
    let menuBtn = document.getElementById('menu_btn')
    let menuDiv = document.getElementById('menu')
    menuDiv.style.visibility = "hidden"

    menuBtn.addEventListener('click', ()=>{
        if (menuBtn.innerHTML == "Öppna meny") {
            menuBtn.innerHTML = "Stäng meny"
            menuDiv.style.visibility = "visible"
        } else{
            menuBtn.innerHTML = "Öppna meny"
            menuDiv.style.visibility = "hidden"
        }
    });

    window.addEventListener('resize', ()=>{
        if (window.screen.width >= 1024) {
            menuDiv.style.visibility = "hidden"
            menuBtn.innerHTML = "Öppna meny"
        }
    })

} // Slut init
window.addEventListener('load', init);
// --------------------------------------------------