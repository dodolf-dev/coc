import { molosse_de_lave } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { molosse_de_lave_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/molosse_de_lave.calc.js";
import { calculerPrixRestantmolosse_de_lave } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/molosse_de_lave.calc.js";
import { calculerTempsRestantmolosse_de_lave } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/molosse_de_lave.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const molosse_de_lave_box = document.getElementById("molosse_de_lave_box");
const selectmolosse_de_lave = document.getElementById("molosse_de_lave");
const imagemolosse_de_lave = document.getElementById("image-molosse_de_lave");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemolosse_de_laveOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentmolosse_de_laveLevel = parseInt(selectmolosse_de_lave.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de molosse_de_lave disponibles en fonction de l'laboratoire
    const molosse_de_laveLevels = Object.entries(molosse_de_lave)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectmolosse_de_lave.innerHTML = "";
    let selectedLevel = null;

    molosse_de_laveLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `molosse_de_lave Niveau ${level}`;
        selectmolosse_de_lave.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmolosse_de_laveLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = molosse_de_laveLevels.length ? parseInt(molosse_de_laveLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le molosse_de_lave 1
    if (molosse_de_laveLevels.length === 0) {
        molosse_de_lave_box.style.display = "none";
        selectmolosse_de_lave.style.display = "none";
        imagemolosse_de_lave.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        molosse_de_lave_box.style.display = "block";
        selectmolosse_de_lave.style.display = "block";
        imagemolosse_de_lave.style.display = "block";
        infoContainer.style.display = "block";
        selectmolosse_de_lave.value = selectedLevel;
        updatemolosse_de_laveInfo();
    }
}

function updatemolosse_de_laveInfo() {
    const niveau = `molosse_de_lave_nv_${selectmolosse_de_lave.value}`;
    const data = molosse_de_lave[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantmolosse_de_lave(parseInt(selectmolosse_de_lave.value, 10),molosse_de_lave_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantmolosse_de_lave(parseInt(selectmolosse_de_lave.value, 10), molosse_de_lave_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagemolosse_de_lave.src = data.image;
        imagemolosse_de_lave.alt = `molosse_de_lave Niveau ${selectmolosse_de_lave.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("molosse_de_lave_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("molosse_de_lave_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("molosse_de_lave_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("molosse_de_lave_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatemolosse_de_laveOptions);
selectmolosse_de_lave.addEventListener("change", updatemolosse_de_laveInfo);

updatemolosse_de_laveOptions();