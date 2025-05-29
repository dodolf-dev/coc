import { chevaucheur_de_cochon } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { chevaucheur_de_cochon_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chevaucheur_de_cochon.calc.js";
import { calculerPrixRestantchevaucheur_de_cochon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chevaucheur_de_cochon.calc.js";
import { calculerTempsRestantchevaucheur_de_cochon } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/chevaucheur_de_cochon.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const chevaucheur_de_cochon_box = document.getElementById("chevaucheur_de_cochon_box");
const selectchevaucheur_de_cochon = document.getElementById("chevaucheur_de_cochon");
const imagechevaucheur_de_cochon = document.getElementById("image-chevaucheur_de_cochon");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatechevaucheur_de_cochonOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentchevaucheur_de_cochonLevel = parseInt(selectchevaucheur_de_cochon.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de chevaucheur_de_cochon disponibles en fonction de l'laboratoire
    const chevaucheur_de_cochonLevels = Object.entries(chevaucheur_de_cochon)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectchevaucheur_de_cochon.innerHTML = "";
    let selectedLevel = null;

    chevaucheur_de_cochonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `chevaucheur_de_cochon Niveau ${level}`;
        selectchevaucheur_de_cochon.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentchevaucheur_de_cochonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = chevaucheur_de_cochonLevels.length ? parseInt(chevaucheur_de_cochonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le chevaucheur_de_cochon 1
    if (chevaucheur_de_cochonLevels.length === 0) {
        chevaucheur_de_cochon_box.style.display = "none";
        selectchevaucheur_de_cochon.style.display = "none";
        imagechevaucheur_de_cochon.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        chevaucheur_de_cochon_box.style.display = "block";
        selectchevaucheur_de_cochon.style.display = "block";
        imagechevaucheur_de_cochon.style.display = "block";
        infoContainer.style.display = "block";
        selectchevaucheur_de_cochon.value = selectedLevel;
        updatechevaucheur_de_cochonInfo();
    }
}

function updatechevaucheur_de_cochonInfo() {
    const niveau = `chevaucheur_de_cochon_nv_${selectchevaucheur_de_cochon.value}`;
    const data = chevaucheur_de_cochon[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantchevaucheur_de_cochon(parseInt(selectchevaucheur_de_cochon.value, 10),chevaucheur_de_cochon_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantchevaucheur_de_cochon(parseInt(selectchevaucheur_de_cochon.value, 10), chevaucheur_de_cochon_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagechevaucheur_de_cochon.src = data.image;
        imagechevaucheur_de_cochon.alt = `chevaucheur_de_cochon Niveau ${selectchevaucheur_de_cochon.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("chevaucheur_de_cochon_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("chevaucheur_de_cochon_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("chevaucheur_de_cochon_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("chevaucheur_de_cochon_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatechevaucheur_de_cochonOptions);
selectchevaucheur_de_cochon.addEventListener("change", updatechevaucheur_de_cochonInfo);

updatechevaucheur_de_cochonOptions();