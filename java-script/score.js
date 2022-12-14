async function test(){
    let numero_partie = 0
    let tableau_score = JSON.parse(localStorage.getItem("score"));
    insertion = "<div class='score'>"
    for(x=0;x < tableau_score.length;x++){
        insertion += "<p>Lors de la partie "+(numero_partie+1)+" le joueur <img class='pions_violet2' width='20'height='20' src='image/pion_violet.png'> avait "+tableau_score[numero_partie][0]+" et le joueur <img class='pions_bleu2' width='20'height='20' src='image/pion_bleu.png'> avait "+tableau_score[numero_partie][1]+" ! </p><br>"
        numero_partie += 1;
    }
    insertion += "</div>"
    document.getElementById("score").innerHTML += insertion;
}



test()