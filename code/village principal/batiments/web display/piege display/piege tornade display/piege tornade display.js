import { piege_tornade } from "/coc/code/village principal/batiments/database/data piege/data piege tornade.js";
import { piege_tornade_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";
import { calculerPrixRestantpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";
import { calculerTempsRestantpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const piege_tornade_box = document.getElementById("piege_tornade_box");
const selectpiege_tornade = document.getElementById("piege_tornade");
const imagepiege_tornade = document.getElementById("image-piege_tornade");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebombeOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbombeLevel = parseInt(selectpiege_tornade.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bombe disponibles en fonction de l'HDV
    const bombeLevels = Object.entries(piege_tornade)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectpiege_tornade.innerHTML = "";
    let selectedLevel = null;

    bombeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Piège tornade Niveau ${level}`;
        selectpiege_tornade.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbombeLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = bombeLevels.length ? parseInt(bombeLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bombe 1
    if (bombeLevels.length === 0) {
        piege_tornade_box.style.display = "none";
        selectpiege_tornade.style.display = "none";
        imagepiege_tornade.style.display = "none";
        infoContainer.style.display = "none";
        piege_tornade_block.style.display = "none";
    } else {
        piege_tornade_box.style.display = "block";
        selectpiege_tornade.style.display = "block";
        imagepiege_tornade.style.display = "block";
        infoContainer.style.display = "block";
        piege_tornade_block.style.display = "block";
        selectpiege_tornade.value = selectedLevel;
        updatepiege_tornadeInfo();
    }
}

function updatepiege_tornadeInfo() {
    const niveau = `piege_tornade_nv_${selectpiege_tornade.value}`;
    const data = piege_tornade[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantpiege_tornade(parseInt(selectpiege_tornade.value, 10),piege_tornade_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantpiege_tornade(parseInt(selectpiege_tornade.value, 10), piege_tornade_nv_max_hdv(hdvNiveau));

    if (data) {
        imagepiege_tornade.src = data.image;
        imagepiege_tornade.alt = `bombe Niveau ${selectpiege_tornade.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("piege_tornade_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("piege_tornade_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("piege_tornade_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("piege_tornade_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatebombeOptions);
selectpiege_tornade.addEventListener("change", updatepiege_tornadeInfo);

updatebombeOptions();