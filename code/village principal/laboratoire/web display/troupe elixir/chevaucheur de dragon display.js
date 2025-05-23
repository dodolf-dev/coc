import { chevaucheur_de_dragon } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { chevaucheur_de_dragon_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/chevaucheur_de_dragon.calc.js";
import { calculerPrixRestantchevaucheur_de_dragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/chevaucheur_de_dragon.calc.js";
import { calculerTempsRestantchevaucheur_de_dragon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/chevaucheur_de_dragon.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const chevaucheur_de_dragon_box = document.getElementById("chevaucheur_de_dragon_box");
const selectchevaucheur_de_dragon = document.getElementById("chevaucheur_de_dragon");
const imagechevaucheur_de_dragon = document.getElementById("image-chevaucheur_de_dragon");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatechevaucheur_de_dragonOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentchevaucheur_de_dragonLevel = parseInt(selectchevaucheur_de_dragon.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de chevaucheur_de_dragon disponibles en fonction de l'laboratoire
    const chevaucheur_de_dragonLevels = Object.entries(chevaucheur_de_dragon)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectchevaucheur_de_dragon.innerHTML = "";
    let selectedLevel = null;

    chevaucheur_de_dragonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `chevaucheur_de_dragon 1 Niveau ${level}`;
        selectchevaucheur_de_dragon.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentchevaucheur_de_dragonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = chevaucheur_de_dragonLevels.length ? parseInt(chevaucheur_de_dragonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le chevaucheur_de_dragon 1
    if (chevaucheur_de_dragonLevels.length === 0) {
        chevaucheur_de_dragon_box.style.display = "none";
        selectchevaucheur_de_dragon.style.display = "none";
        imagechevaucheur_de_dragon.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        chevaucheur_de_dragon_box.style.display = "block";
        selectchevaucheur_de_dragon.style.display = "block";
        imagechevaucheur_de_dragon.style.display = "block";
        infoContainer.style.display = "block";
        selectchevaucheur_de_dragon.value = selectedLevel;
        updatechevaucheur_de_dragonInfo();
    }
}

function updatechevaucheur_de_dragonInfo() {
    const niveau = `chevaucheur_de_dragon_nv_${selectchevaucheur_de_dragon.value}`;
    const data = chevaucheur_de_dragon[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantchevaucheur_de_dragon(parseInt(selectchevaucheur_de_dragon.value, 10),chevaucheur_de_dragon_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantchevaucheur_de_dragon(parseInt(selectchevaucheur_de_dragon.value, 10), chevaucheur_de_dragon_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagechevaucheur_de_dragon.src = data.image;
        imagechevaucheur_de_dragon.alt = `chevaucheur_de_dragon Niveau ${selectchevaucheur_de_dragon.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("chevaucheur_de_dragon_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("chevaucheur_de_dragon_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("chevaucheur_de_dragon_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("chevaucheur_de_dragon_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatechevaucheur_de_dragonOptions);
selectchevaucheur_de_dragon.addEventListener("change", updatechevaucheur_de_dragonInfo);

updatechevaucheur_de_dragonOptions();