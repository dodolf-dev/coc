import { laboratoire } from "/coc/code/village principal/batiments/database/data armee/data laboratoire.js";
import { laboratoire_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/armee calc/laboratoire/laboratoire.calc.js";
import { calculerPrixRestantlaboratoire } from "/coc/code/village principal/batiments/calculator/armee calc/laboratoire/laboratoire.calc.js";
import { calculerTempsRestantlaboratoire } from "/coc/code/village principal/batiments/calculator/armee calc/laboratoire/laboratoire.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const laboratoire_box = document.getElementById("laboratoire_box");
const selectlaboratoire = document.getElementById("laboratoire");
const imagelaboratoire = document.getElementById("image-laboratoire");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecamps_militaireOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcamps_militaireLevel = parseInt(selectlaboratoire.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de camps_militaire disponibles en fonction de l'HDV
    const camps_militaireLevels = Object.entries(laboratoire)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectlaboratoire.innerHTML = "";
    let selectedLevel = null;

    camps_militaireLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `camps_militaire 1 Niveau ${level}`;
        selectlaboratoire.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentcamps_militaireLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = camps_militaireLevels.length ? parseInt(camps_militaireLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le camps_militaire 1
    if (camps_militaireLevels.length === 0) {
        laboratoire_box.style.display = "none";
        selectlaboratoire.style.display = "none";
        imagelaboratoire.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        laboratoire_box.style.display = "block";
        selectlaboratoire.style.display = "block";
        imagelaboratoire.style.display = "block";
        infoContainer.style.display = "block";
        selectlaboratoire.value = selectedLevel;
        updatelaboratoireInfo();
    }
}

function updatelaboratoireInfo() {
    const niveau = `laboratoire_nv_${selectlaboratoire.value}`;
    const data = laboratoire[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantlaboratoire(parseInt(selectlaboratoire.value, 10),laboratoire_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantlaboratoire(parseInt(selectlaboratoire.value, 10), laboratoire_nv_max_hdv(hdvNiveau));

    if (data) {
        imagelaboratoire.src = data.image;
        imagelaboratoire.alt = `camps_militaire Niveau ${selectlaboratoire.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("laboratoire_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("laboratoire_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("laboratoire_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("laboratoire_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatecamps_militaireOptions);
selectlaboratoire.addEventListener("change", updatelaboratoireInfo);

updatecamps_militaireOptions();
