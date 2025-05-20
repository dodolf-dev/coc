import { cracheur_feu1 } from "/coc/code/village principal/batiments/database/data defense/data cracheur feu.js";
import { cracheur_feu1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerPrixRestantcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerTempsRestantcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const cracheur_feu1_box = document.getElementById("cracheur_feu1_box");
const selectcracheur_feu1 = document.getElementById("cracheur_feu1");
const imagecracheur_feu1 = document.getElementById("image-cracheur_feu1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecracheur_feuOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcracheur_feuLevel = parseInt(selectcracheur_feu1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de cracheur_feu disponibles en fonction de l'HDV
    const cracheur_feuLevels = Object.entries(cracheur_feu1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcracheur_feu1.innerHTML = "";
    let selectedLevel = null;

    cracheur_feuLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Cracheur de feu 1 Niveau ${level}`;
        selectcracheur_feu1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentcracheur_feuLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = cracheur_feuLevels.length ? parseInt(cracheur_feuLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le cracheur_feu 1
    if (cracheur_feuLevels.length === 0) {
        cracheur_feu1_box.style.display = "none";
        selectcracheur_feu1.style.display = "none";
        imagecracheur_feu1.style.display = "none";
        infoContainer.style.display = "none";
        cracheur_feu_block.style.display = "none";
    } else {
        cracheur_feu1_box.style.display = "block";
        selectcracheur_feu1.style.display = "block";
        imagecracheur_feu1.style.display = "block";
        infoContainer.style.display = "block";
        cracheur_feu_block.style.display = "block";
        selectcracheur_feu1.value = selectedLevel;
        updatecracheur_feu1Info();
    }
}

function updatecracheur_feu1Info() {
    const niveau = `cracheur_feu1_nv_${selectcracheur_feu1.value}`;
    const data = cracheur_feu1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcracheur_feu1(parseInt(selectcracheur_feu1.value, 10),cracheur_feu1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcracheur_feu1(parseInt(selectcracheur_feu1.value, 10), cracheur_feu1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecracheur_feu1.src = data.image;
        imagecracheur_feu1.alt = `cracheur_feu Niveau ${selectcracheur_feu1.value}`;
    }
    if (prixrestant === 0) {
        document.getElementById("cracheur_feu1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("cracheur_feu1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("cracheur_feu1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("cracheur_feu1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatecracheur_feuOptions);
selectcracheur_feu1.addEventListener("change", updatecracheur_feu1Info);

updatecracheur_feuOptions();