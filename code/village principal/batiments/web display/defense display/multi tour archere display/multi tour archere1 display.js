import { multi_tour_archere1 } from "/coc/code/village principal/batiments/database/data defense/data multi tour archere.js";
import { multi_tour_archere1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere1.calc.js";
import { calculerPrixRestantmulti_tour_archere1 } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere1.calc.js";
import { calculerTempsRestantmulti_tour_archere1 } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const multi_tour_archere1_box = document.getElementById("multi_tour_archere1_box");
const selectmulti_tour_archere1 = document.getElementById("multi_tour_archere1");
const imagemulti_tour_archere1 = document.getElementById("image-multi_tour_archere1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemulti_tour_archereOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmulti_tour_archereLevel = parseInt(selectmulti_tour_archere1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de multi_tour_archere disponibles en fonction de l'HDV
    const multi_tour_archereLevels = Object.entries(multi_tour_archere1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmulti_tour_archere1.innerHTML = "";
    let selectedLevel = null;

    multi_tour_archereLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Multi tour d'archère 1 Niveau ${level}`;
        selectmulti_tour_archere1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmulti_tour_archereLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = multi_tour_archereLevels.length ? parseInt(multi_tour_archereLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le multi_tour_archere 1
    if (multi_tour_archereLevels.length === 0) {
        multi_tour_archere1_box.style.display = "none";
        selectmulti_tour_archere1.style.display = "none";
        imagemulti_tour_archere1.style.display = "none";
        infoContainer.style.display = "none";
        multi_tour_archere_block.style.display = "none";
    } else {
        multi_tour_archere1_box.style.display = "block";
        selectmulti_tour_archere1.style.display = "block";
        imagemulti_tour_archere1.style.display = "block";
        infoContainer.style.display = "block";
        multi_tour_archere_block.style.display = "block";
        selectmulti_tour_archere1.value = selectedLevel;
        updatemulti_tour_archere1Info();
    }
}

function updatemulti_tour_archere1Info() {
    // Si multi_tour_archere1 >= 1, forcer tour_archere8 et tour_archere9 à 21 et masquer leurs blocs
    if (parseInt(selectmulti_tour_archere1.value) >= 1) {
        // Tour_archere 8
        const selectTour_archere8 = document.getElementById("tour_archere8");
        const tour_archere8_box = document.getElementById("tour_archere8_box");
        if (selectTour_archere8) {
            selectTour_archere8.value = 21;
            selectTour_archere8.dispatchEvent(new Event('change'));
            if (tour_archere8_box) tour_archere8_box.style.display = "none";
        }
        // Tour_archere 9
        const selectTour_archere9 = document.getElementById("tour_archere9");
        const tour_archere9_box = document.getElementById("tour_archere9_box");
        if (selectTour_archere9) {
            selectTour_archere9.value = 21;
            selectTour_archere9.dispatchEvent(new Event('change'));
            if (tour_archere9_box) tour_archere9_box.style.display = "none";
        }
    } else {
        // Afficher tour_archere8 et tour_archere9 si besoin
        const tour_archere8_box = document.getElementById("tour_archere8_box");
        const tour_archere9_box = document.getElementById("tour_archere9_box");
        if (tour_archere8_box) tour_archere8_box.style.display = "block";
        if (tour_archere9_box) tour_archere9_box.style.display = "block";
    }

    const niveau = `multi_tour_archere1_nv_${selectmulti_tour_archere1.value}`;
    const data = multi_tour_archere1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmulti_tour_archere1(parseInt(selectmulti_tour_archere1.value, 10),multi_tour_archere1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmulti_tour_archere1(parseInt(selectmulti_tour_archere1.value, 10), multi_tour_archere1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemulti_tour_archere1.src = data.image;
        imagemulti_tour_archere1.alt = `multi_tour_archere Niveau ${selectmulti_tour_archere1.value}`;
    }if (prixrestant === 0) {
        document.getElementById("multi_tour_archere1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("multi_tour_archere1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("multi_tour_archere1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("multi_tour_archere1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}

selectHdv.addEventListener("change", updatemulti_tour_archereOptions);
selectmulti_tour_archere1.addEventListener("change", updatemulti_tour_archere1Info);

updatemulti_tour_archereOptions();