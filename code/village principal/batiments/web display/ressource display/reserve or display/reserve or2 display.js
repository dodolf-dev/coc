import { reserve_or2 } from "/coc/code/village principal/batiments/database/data ressource/data reserve or.js";
import { reserve_or2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/reserve ors/reserve or2.calc.js";
import { calculerPrixRestantreserve_or2 } from "/coc/code/village principal/batiments/calculator/ressource calc/reserve ors/reserve or2.calc.js";
import { calculerTempsRestantreserve_or2 } from "/coc/code/village principal/batiments/calculator/ressource calc/reserve ors/reserve or2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const reserve_or2_box = document.getElementById("reserve_or2_box");
const selectreserve_or2 = document.getElementById("reserve_or2");
const imagereserve_or2 = document.getElementById("image-reserve_or2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatereserve_orOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentreserve_orLevel = parseInt(selectreserve_or2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de reserve_or disponibles en fonction de l'HDV
    const reserve_orLevels = Object.entries(reserve_or2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectreserve_or2.innerHTML = "";
    let selectedLevel = null;

    reserve_orLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Reserve d'or 2 Niveau ${level}`;
        selectreserve_or2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentreserve_orLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = reserve_orLevels.length ? parseInt(reserve_orLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le reserve_or 1
    if (reserve_orLevels.length === 0) {
        reserve_or2_box.style.display = "none";
        selectreserve_or2.style.display = "none";
        imagereserve_or2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        reserve_or2_box.style.display = "block";
        selectreserve_or2.style.display = "block";
        imagereserve_or2.style.display = "block";
        infoContainer.style.display = "block";
        selectreserve_or2.value = selectedLevel;
        updatereserve_or2Info();
    }
}

function updatereserve_or2Info() {
    const niveau = `reserve_or2_nv_${selectreserve_or2.value}`;
    const data = reserve_or2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantreserve_or2(parseInt(selectreserve_or2.value, 10),reserve_or2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantreserve_or2(parseInt(selectreserve_or2.value, 10), reserve_or2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagereserve_or2.src = data.image;
        imagereserve_or2.alt = `reserve_or Niveau ${selectreserve_or2.value}`;
    }
    document.getElementById("reserve_or2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/elixir village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("reserve_or2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatereserve_orOptions);
selectreserve_or2.addEventListener("change", updatereserve_or2Info);

updatereserve_orOptions();