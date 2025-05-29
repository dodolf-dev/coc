import { valkyrie } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { valkyrie_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/valkyrie.calc.js";
import { calculerPrixRestantvalkyrie } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/valkyrie.calc.js";
import { calculerTempsRestantvalkyrie } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/valkyrie.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const valkyrie_box = document.getElementById("valkyrie_box");
const selectvalkyrie = document.getElementById("valkyrie");
const imagevalkyrie = document.getElementById("image-valkyrie");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatevalkyrieOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentvalkyrieLevel = parseInt(selectvalkyrie.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de valkyrie disponibles en fonction de l'laboratoire
    const valkyrieLevels = Object.entries(valkyrie)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectvalkyrie.innerHTML = "";
    let selectedLevel = null;

    valkyrieLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `valkyrie Niveau ${level}`;
        selectvalkyrie.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentvalkyrieLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = valkyrieLevels.length ? parseInt(valkyrieLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le valkyrie 1
    if (valkyrieLevels.length === 0) {
        valkyrie_box.style.display = "none";
        selectvalkyrie.style.display = "none";
        imagevalkyrie.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        valkyrie_box.style.display = "block";
        selectvalkyrie.style.display = "block";
        imagevalkyrie.style.display = "block";
        infoContainer.style.display = "block";
        selectvalkyrie.value = selectedLevel;
        updatevalkyrieInfo();
    }
}

function updatevalkyrieInfo() {
    const niveau = `valkyrie_nv_${selectvalkyrie.value}`;
    const data = valkyrie[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantvalkyrie(parseInt(selectvalkyrie.value, 10),valkyrie_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantvalkyrie(parseInt(selectvalkyrie.value, 10), valkyrie_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagevalkyrie.src = data.image;
        imagevalkyrie.alt = `valkyrie Niveau ${selectvalkyrie.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("valkyrie_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("valkyrie_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("valkyrie_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("valkyrie_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatevalkyrieOptions);
selectvalkyrie.addEventListener("change", updatevalkyrieInfo);

updatevalkyrieOptions();