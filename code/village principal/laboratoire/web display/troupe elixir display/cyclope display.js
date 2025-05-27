import { cyclope } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { cyclope_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cyclope.calc.js";
import { calculerPrixRestantcyclope } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cyclope.calc.js";
import { calculerTempsRestantcyclope } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cyclope.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const cyclope_box = document.getElementById("cyclope_box");
const selectcyclope = document.getElementById("cyclope");
const imagecyclope = document.getElementById("image-cyclope");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecyclopeOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentcyclopeLevel = parseInt(selectcyclope.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de cyclope disponibles en fonction de l'laboratoire
    const cyclopeLevels = Object.entries(cyclope)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectcyclope.innerHTML = "";
    let selectedLevel = null;

    cyclopeLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `cyclope 1 Niveau ${level}`;
        selectcyclope.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentcyclopeLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = cyclopeLevels.length ? parseInt(cyclopeLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le cyclope 1
    if (cyclopeLevels.length === 0) {
        cyclope_box.style.display = "none";
        selectcyclope.style.display = "none";
        imagecyclope.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        cyclope_box.style.display = "block";
        selectcyclope.style.display = "block";
        imagecyclope.style.display = "block";
        infoContainer.style.display = "block";
        selectcyclope.value = selectedLevel;
        updatecyclopeInfo();
    }
}

function updatecyclopeInfo() {
    const niveau = `cyclope_nv_${selectcyclope.value}`;
    const data = cyclope[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantcyclope(parseInt(selectcyclope.value, 10),cyclope_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantcyclope(parseInt(selectcyclope.value, 10), cyclope_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagecyclope.src = data.image;
        imagecyclope.alt = `cyclope Niveau ${selectcyclope.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("cyclope_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("cyclope_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("cyclope_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("cyclope_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatecyclopeOptions);
selectcyclope.addEventListener("change", updatecyclopeInfo);

updatecyclopeOptions();