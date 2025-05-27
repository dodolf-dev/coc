import { dragon } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { dragon_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/dragon.calc.js";
import { calculerPrixRestantdragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/dragon.calc.js";
import { calculerTempsRestantdragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/dragon.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const dragon_box = document.getElementById("dragon_box");
const selectdragon = document.getElementById("dragon");
const imagedragon = document.getElementById("image-dragon");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatedragonOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentdragonLevel = parseInt(selectdragon.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de dragon disponibles en fonction de l'laboratoire
    const dragonLevels = Object.entries(dragon)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectdragon.innerHTML = "";
    let selectedLevel = null;

    dragonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `dragon 1 Niveau ${level}`;
        selectdragon.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentdragonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = dragonLevels.length ? parseInt(dragonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le dragon 1
    if (dragonLevels.length === 0) {
        dragon_box.style.display = "none";
        selectdragon.style.display = "none";
        imagedragon.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        dragon_box.style.display = "block";
        selectdragon.style.display = "block";
        imagedragon.style.display = "block";
        infoContainer.style.display = "block";
        selectdragon.value = selectedLevel;
        updatedragonInfo();
    }
}

function updatedragonInfo() {
    const niveau = `dragon_nv_${selectdragon.value}`;
    const data = dragon[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantdragon(parseInt(selectdragon.value, 10),dragon_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantdragon(parseInt(selectdragon.value, 10), dragon_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagedragon.src = data.image;
        imagedragon.alt = `dragon Niveau ${selectdragon.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("dragon_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("dragon_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("dragon_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("dragon_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatedragonOptions);
selectdragon.addEventListener("change", updatedragonInfo);

updatedragonOptions();