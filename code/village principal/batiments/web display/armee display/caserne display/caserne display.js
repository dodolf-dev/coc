import { caserne } from "/coc/code/village principal/batiments/database/data armee/data caserne.js";
import { caserne_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/armee calc/caserne/caserne.calc.js";
import { calculerPrixRestantcaserne } from "/coc/code/village principal/batiments/calculator/armee calc/caserne/caserne.calc.js";
import { calculerTempsRestantcaserne } from "/coc/code/village principal/batiments/calculator/armee calc/caserne/caserne.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const caserne_box = document.getElementById("caserne_box");
const selectcaserne = document.getElementById("caserne");
const imagecaserne = document.getElementById("image-caserne");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecamps_militaireOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcamps_militaireLevel = parseInt(selectcaserne.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de camps_militaire disponibles en fonction de l'HDV
    const camps_militaireLevels = Object.entries(caserne)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcaserne.innerHTML = "";
    let selectedLevel = null;

    camps_militaireLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `camps_militaire 1 Niveau ${level}`;
        selectcaserne.appendChild(option);

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
        caserne_box.style.display = "none";
        selectcaserne.style.display = "none";
        imagecaserne.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        caserne_box.style.display = "block";
        selectcaserne.style.display = "block";
        imagecaserne.style.display = "block";
        infoContainer.style.display = "block";
        selectcaserne.value = selectedLevel;
        updatecaserneInfo();
    }
}

function updatecaserneInfo() {
    const niveau = `caserne_nv_${selectcaserne.value}`;
    const data = caserne[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcaserne(parseInt(selectcaserne.value, 10),caserne_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcaserne(parseInt(selectcaserne.value, 10), caserne_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecaserne.src = data.image;
        imagecaserne.alt = `camps_militaire Niveau ${selectcaserne.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("caserne_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("caserne_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("caserne_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("caserne_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatecamps_militaireOptions);
selectcaserne.addEventListener("change", updatecaserneInfo);

updatecamps_militaireOptions();
