import { fournaise } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { fournaise_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/fournaise.calc.js";
import { calculerPrixRestantfournaise } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/fournaise.calc.js";
import { calculerTempsRestantfournaise } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/fournaise.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const fournaise_box = document.getElementById("fournaise_box");
const selectfournaise = document.getElementById("fournaise");
const imagefournaise = document.getElementById("image-fournaise");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatefournaiseOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentfournaiseLevel = parseInt(selectfournaise.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de fournaise disponibles en fonction de l'laboratoire
    const fournaiseLevels = Object.entries(fournaise)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectfournaise.innerHTML = "";
    let selectedLevel = null;

    fournaiseLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `fournaise Niveau ${level}`;
        selectfournaise.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentfournaiseLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = fournaiseLevels.length ? parseInt(fournaiseLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le fournaise 1
    if (fournaiseLevels.length === 0) {
        fournaise_box.style.display = "none";
        selectfournaise.style.display = "none";
        imagefournaise.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        fournaise_box.style.display = "block";
        selectfournaise.style.display = "block";
        imagefournaise.style.display = "block";
        infoContainer.style.display = "block";
        selectfournaise.value = selectedLevel;
        updatefournaiseInfo();
    }
}

function updatefournaiseInfo() {
    const niveau = `fournaise_nv_${selectfournaise.value}`;
    const data = fournaise[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantfournaise(parseInt(selectfournaise.value, 10),fournaise_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantfournaise(parseInt(selectfournaise.value, 10), fournaise_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagefournaise.src = data.image;
        imagefournaise.alt = `fournaise Niveau ${selectfournaise.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("fournaise_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("fournaise_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("fournaise_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("fournaise_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatefournaiseOptions);
selectfournaise.addEventListener("change", updatefournaiseInfo);

updatefournaiseOptions();