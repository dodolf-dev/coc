import { bombe_aerienne3 } from "/coc/code/village principal/batiments/database/data piege/data bombe aerienne.js";
import { bombe_aerienne3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/bombe aeriennes/bombe aerienne3.calc.js";
import { calculerPrixRestantbombe_aerienne3 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe aeriennes/bombe aerienne3.calc.js";
import { calculerTempsRestantbombe_aerienne3 } from "/coc/code/village principal/batiments/calculator/piege calc/bombe aeriennes/bombe aerienne3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bombe_aerienne3_box = document.getElementById("bombe_aerienne3_box");
const selectbombe_aerienne3 = document.getElementById("bombe_aerienne3");
const imagebombe_aerienne3 = document.getElementById("image-bombe_aerienne3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombe_aerienneOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombe_aerienneLevel = parseInt(selectbombe_aerienne3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe_aerienne disponibles en fonction de l'HDV
    const bombe_aerienneLevels = Object.entries(bombe_aerienne3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbombe_aerienne3.innerHTML = "";
    let selectedLevel = null;

    bombe_aerienneLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bombe_aerienne 1 Niveau ${level}`;
        selectbombe_aerienne3.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbombe_aerienneLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = bombe_aerienneLevels.length ? parseInt(bombe_aerienneLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bombe_aerienne 1
    if (bombe_aerienneLevels.length === 0) {
        bombe_aerienne3_box.style.display = "none";
        selectbombe_aerienne3.style.display = "none";
        imagebombe_aerienne3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bombe_aerienne3_box.style.display = "block";
        selectbombe_aerienne3.style.display = "block";
        imagebombe_aerienne3.style.display = "block";
        infoContainer.style.display = "block";
        selectbombe_aerienne3.value = selectedLevel;
        updatebombe_aerienne3Info();
    }
}

function updatebombe_aerienne3Info() {
    const niveau = `bombe_aerienne3_nv_${selectbombe_aerienne3.value}`;
    const data = bombe_aerienne3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbombe_aerienne3(parseInt(selectbombe_aerienne3.value, 10),bombe_aerienne3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbombe_aerienne3(parseInt(selectbombe_aerienne3.value, 10), bombe_aerienne3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebombe_aerienne3.src = data.image;
        imagebombe_aerienne3.alt = `bombe_aerienne Niveau ${selectbombe_aerienne3.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bombe_aerienne3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bombe_aerienne3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bombe_aerienne3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bombe_aerienne3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombe_aerienneOptions);
selectbombe_aerienne3.addEventListener("change", updatebombe_aerienne3Info);

updatebombe_aerienneOptions();