const v = 'v'; //case vide
const r = 'r'; //case rouge
const b = 'b'; //case jaune

let joueur = 2 ;

let hauteur = 0;
let largeur = 0;

let score = [0,0] ;
let scoreRetenu = [];

let plateau = [];

let idInterval = 0;

//repart de 0 à 0
function nouvellePartie(){
    clearInterval(idInterval);
    chrono();
    scoreRetenu.push(score);
    console.log(scoreRetenu);
    console.log(typeof scoreRetenu);
    localStorage.setItem("score",JSON.stringify(scoreRetenu));
    joueur = 2;
    score = [0,0];
    start();
}

//cree la taille de liste qu on veut
function creation_liste(){
    plateau = [];
    hauteur = document.getElementById("hauteur").value ;
    largeur = document.getElementById("largeur").value ;
    for(i=0;i<hauteur;i++){
        plateau.push([]);
        for(j=0;j<largeur;j++){
            plateau[i].push(v);
        };
    };
    return plateau;
}


//fonction de démarrage
function start(){
    if (joueur == 1){
        joueur = 2;
    }
    else if (joueur == 2){
        joueur = 1;
    };
    plateau = creation_liste();
    displayPlateau();
    affiche_score();
};

//FONCTION D'AFFICHAGE
function displayPlateau(){
    let lePlateau=document.getElementById("jeu");
    insertion="<table border=1 cellspacing=0 cellpadding=0>";

    for(i=0;i<hauteur;i++){
    insertion+="<tr>";
        for(j=0;j<largeur;j++){
            if (plateau[i][j]==v){
            insertion+="<td>";
            insertion+="<img class='hide' id="+j+" width='75'height='75' src='image/vide.png'>";
            insertion+="</td>";
            }
            if (plateau[i][j]==b){
            insertion+="<td>";
            insertion+="<img id="+j+" class='pions_violet' width='75' height='75' src='image/pion_violet.png'>";
            insertion+="</td>";
            }
            if (plateau[i][j]==r){
            insertion+="<td>";
            insertion+="<img id="+j+" class='pions_bleu' width='75' height='75' src='image/pion_bleu.png'>";
            insertion+="</td>";
            }             
        }
        insertion+="</tr>";
    }
    if(joueur == 1){
        document.getElementById("player").innerHTML = "<img class='pions_violet2' width='20'height='20' src='image/pion_violet.png'>";
}
    else{
        document.getElementById("player").innerHTML = "<img class='pions_bleu2' width='20'height='20' src='image/pion_bleu.png'>";
    }
    if (joueur == 1){
        joueur = 2;
    }
    else if (joueur == 2){
        joueur = 1;
    }

    insertion+="</table>";
    lePlateau.innerHTML=insertion;
}

//place les points
function placePiont(y){
    let x_fin = 0;
    let boucle = 0;
    while(boucle == 0){
        if (plateau[0][y] == v){
            let x = 0 ;
            while (plateau[x][y] == v || x != hauteur-1){
                if(x == hauteur-1 || plateau[x+1][y] != v){
                    if(joueur == 1){
                        plateau[x][y] = r;
                        x_fin = x;
                        boucle = 1;
                        break ;
                    }
                    else{
                        plateau[x][y] = b;
                        x_fin = x;
                        boucle = 1;
                        break ;
                    }
                }
                x=x+1;
            }
        }
        else{
            boucle = 2;
        }
    }
    if(boucle == 2){
        return ;
    }
    displayPlateau();
    setTimeout(() => test_colonne(x_fin,y), 50);
    setTimeout(() => test_ligne(x_fin,y), 50);
    setTimeout(() => test_diago(x_fin,y), 50);
    let test = setTimeout(() => plein(), 50);
    if( test == true){
        alert("Il y a pas de gagnant !");
        start();
    };
};

function affiche_score(){
    document.getElementById("score").innerHTML = "Le score est de : "+score[0]+" pour le joueur   <img class='pions_violet2' width='20'height='20' src='image/pion_violet.png'> <br>  et "+score[1]+" pour le joueur   <img class='pions_bleu2' width='20'height='20' src='image/pion_bleu.png'>";
}

//compte les points

//colone
function test_colonne(x,y){
    let point_x = x;
    let point_y = y;
    let cherche = 0;
    if(joueur == 1){
        cherche = b}
    else{
        cherche = r}
    let pion = 1;
    point_x = point_x + 1;
    while (point_x <= hauteur-1){
        if(plateau[point_x][point_y] == cherche){
            pion += 1;
            point_x += 1;
        }
        else{
            point_x += 1;
            break ;
        };
    };
    if(pion >= 4){
        score[joueur-1] = score[joueur-1] + 1;
        alert("Joueur "+joueur+" à gagné !");
        start();
    }
}

//ligne
function test_ligne(x,y){
    let point_x = x;
    let point_y = y;
    let cherche = 0;
    if(joueur == 1){
        cherche = b}
    else{
        cherche = r};
    let pion = 0;
    point_y = largeur-1
    while (point_y>=0){
        if(pion>=4){
            break;
        }
        if(plateau[point_x][point_y] == cherche){
            pion += 1;
            point_y -= 1;
        }
        else{
            pion = 0;
            point_y -= 1;
        }
    };
    if(pion >= 4){
        score[joueur-1] = score[joueur-1] + 1;
        alert("Joueur "+joueur+" à gagné !");
        start();
    };
};

// diagonal
function test_diago(x,y){
    let point_x = x;
    let point_y = y;
    let cherche = 0;
    if(joueur == 1){
        cherche = b}
    else{
        cherche = r}
    let pion = 0;
    while(point_x>0 && point_y>0){
        point_x -= 1;
        point_y -= 1;
    };
    while(point_x <= hauteur-1 && point_y <= largeur-1){
        if(pion>=4){
            break;
        };
        if(plateau[point_x][point_y] == cherche){
            pion += 1;
            point_x += 1;
            point_y += 1;
        }
        else{
            pion = 0;
            point_x += 1;
            point_y += 1;
        }
    }
    if(pion >= 4){
        score[joueur-1] = score[joueur-1] + 1;
        alert("Joueur "+joueur+" à gagné !");
        start();
    }
    point_x = x;
    point_y = y;
    pion = 0;
    while(point_x>0 && point_y < largeur-1){
        point_x -= 1;
        point_y += 1;
    };
    while(point_x <= hauteur-1 && point_y > -1){
        if(pion>=4){
            break;
        };
        if(plateau[point_x][point_y] == cherche){
            pion += 1;
            point_x += 1;
            point_y -= 1;
        }
        else{
            pion = 0;
            point_x += 1;
            point_y -= 1;
        };
    };
    if(pion >= 4){
        score[joueur-1] = score[joueur-1] + 1
        alert("Joueur "+joueur+" à gagné !");
        start();
    };
};

//test si plein

function plein(){
    for(i=0;i<hauteur-1;i++){
        for(j=0;j<largeur-1;j++){
            if(plateau[i][j] == v){
                return false;
            };
        };
    };
    return true;
};

let seconde = 0;
let minute = 0;

//chrono
function chrono(){
    idInterval++
    seconde = 0;
    minute = 0;
    const t = setInterval(() => {
        seconde++
        if(seconde == 60){
            minute++
            seconde = 0
        };
        if(seconde < 10){
            document.getElementById("time").innerHTML = minute+" : 0"+seconde
        }
        else{
            document.getElementById("time").innerHTML = minute+" : "+seconde
        };
    },1000);
};

//Partie pour lancer le programme au clic
addEventListener("click", ev => {
    const ID = ev.target.id;

    let y = parseInt(ID);

    placePiont(y);
});


//le démarrage au lancement de la page 
start();
chrono();



