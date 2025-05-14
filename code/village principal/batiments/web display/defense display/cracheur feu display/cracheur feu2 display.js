import { cracheur_feu2 } from "/coc/code/village principal/batiments/database/data defense/data cracheur feu.js";
import { cracheur_feu2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";
import { calculerPrixRestantcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";
import { calculerTempsRestantcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const cracheur_feu2_box = document.getElementById("cracheur_feu2_box");
const selectcracheur_feu2 = document.getElementById("cracheur_feu2");
const imagecracheur_feu2 = document.getElementById("image-cracheur_feu2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecracheur_feuOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcracheur_feuLevel = parseInt(selectcracheur_feu2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de cracheur_feu disponibles en fonction de l'HDV
    const cracheur_feuLevels = Object.entries(cracheur_feu2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcracheur_feu2.innerHTML = "";
    let selectedLevel = null;

    cracheur_feuLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Cracheur de feu 2 Niveau ${level}`;
        selectcracheur_feu2.appendChild(option);

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
        cracheur_feu2_box.style.display = "none";
        selectcracheur_feu2.style.display = "none";
        imagecracheur_feu2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        cracheur_feu2_box.style.display = "block";
        selectcracheur_feu2.style.display = "block";
        imagecracheur_feu2.style.display = "block";
        infoContainer.style.display = "block";
        selectcracheur_feu2.value = selectedLevel;
        updatecracheur_feu2Info();
    }
}

function updatecracheur_feu2Info() {
    const niveau = `cracheur_feu2_nv_${selectcracheur_feu2.value}`;
    const data = cracheur_feu2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcracheur_feu2(parseInt(selectcracheur_feu2.value, 10),cracheur_feu2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcracheur_feu2(parseInt(selectcracheur_feu2.value, 10), cracheur_feu2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecracheur_feu2.src = data.image;
        imagecracheur_feu2.alt = `cracheur_feu Niveau ${selectcracheur_feu2.value}`;
    }
    document.getElementById("cracheur_feu2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("cracheur_feu2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatecracheur_feuOptions);
selectcracheur_feu2.addEventListener("change", updatecracheur_feu2Info);

updatecracheur_feuOptions();
