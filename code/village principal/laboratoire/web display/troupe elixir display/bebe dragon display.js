import { bebe_dragon } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { bebe_dragon_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/bebe_dragon.calc.js";
import { calculerPrixRestantbebe_dragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/bebe_dragon.calc.js";
import { calculerTempsRestantbebe_dragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/bebe_dragon.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const bebe_dragon_box = document.getElementById("bebe_dragon_box");
const selectbebe_dragon = document.getElementById("bebe_dragon");
const imagebebe_dragon = document.getElementById("image-bebe_dragon");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebebe_dragonOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentbebe_dragonLevel = parseInt(selectbebe_dragon.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de bebe_dragon disponibles en fonction de l'laboratoire
    const bebe_dragonLevels = Object.entries(bebe_dragon)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectbebe_dragon.innerHTML = "";
    let selectedLevel = null;

    bebe_dragonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `bebe_dragon 1 Niveau ${level}`;
        selectbebe_dragon.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbebe_dragonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = bebe_dragonLevels.length ? parseInt(bebe_dragonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le bebe_dragon 1
    if (bebe_dragonLevels.length === 0) {
        bebe_dragon_box.style.display = "none";
        selectbebe_dragon.style.display = "none";
        imagebebe_dragon.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        bebe_dragon_box.style.display = "block";
        selectbebe_dragon.style.display = "block";
        imagebebe_dragon.style.display = "block";
        infoContainer.style.display = "block";
        selectbebe_dragon.value = selectedLevel;
        updatebebe_dragonInfo();
    }
}

function updatebebe_dragonInfo() {
    const niveau = `bebe_dragon_nv_${selectbebe_dragon.value}`;
    const data = bebe_dragon[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantbebe_dragon(parseInt(selectbebe_dragon.value, 10),bebe_dragon_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantbebe_dragon(parseInt(selectbebe_dragon.value, 10), bebe_dragon_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagebebe_dragon.src = data.image;
        imagebebe_dragon.alt = `bebe_dragon Niveau ${selectbebe_dragon.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("bebe_dragon_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("bebe_dragon_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("bebe_dragon_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("bebe_dragon_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatebebe_dragonOptions);
selectbebe_dragon.addEventListener("change", updatebebe_dragonInfo);

updatebebe_dragonOptions();