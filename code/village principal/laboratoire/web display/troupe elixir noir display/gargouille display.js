import { gargouille } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { gargouille_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/gargouille.calc.js";
import { calculerPrixRestantgargouille } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/gargouille.calc.js";
import { calculerTempsRestantgargouille } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/gargouille.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const gargouille_box = document.getElementById("gargouille_box");
const selectgargouille = document.getElementById("gargouille");
const imagegargouille = document.getElementById("image-gargouille");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updategargouilleOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentgargouilleLevel = parseInt(selectgargouille.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de gargouille disponibles en fonction de l'laboratoire
    const gargouilleLevels = Object.entries(gargouille)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectgargouille.innerHTML = "";
    let selectedLevel = null;

    gargouilleLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `gargouille Niveau ${level}`;
        selectgargouille.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentgargouilleLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = gargouilleLevels.length ? parseInt(gargouilleLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le gargouille 1
    if (gargouilleLevels.length === 0) {
        gargouille_box.style.display = "none";
        selectgargouille.style.display = "none";
        imagegargouille.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        gargouille_box.style.display = "block";
        selectgargouille.style.display = "block";
        imagegargouille.style.display = "block";
        infoContainer.style.display = "block";
        selectgargouille.value = selectedLevel;
        updategargouilleInfo();
    }
}

function updategargouilleInfo() {
    const niveau = `gargouille_nv_${selectgargouille.value}`;
    const data = gargouille[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantgargouille(parseInt(selectgargouille.value, 10),gargouille_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantgargouille(parseInt(selectgargouille.value, 10), gargouille_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagegargouille.src = data.image;
        imagegargouille.alt = `gargouille Niveau ${selectgargouille.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("gargouille_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("gargouille_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("gargouille_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("gargouille_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updategargouilleOptions);
selectgargouille.addEventListener("change", updategargouilleInfo);

updategargouilleOptions();