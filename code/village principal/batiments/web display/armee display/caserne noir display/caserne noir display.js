import { caserne_noir } from "/coc/code/village principal/batiments/database/data armee/data caserne noir.js";
import { caserne_noir_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/armee calc/caserne noir/caserne noir.calc.js";
import { calculerPrixRestantcaserne_noir } from "/coc/code/village principal/batiments/calculator/armee calc/caserne noir/caserne noir.calc.js";
import { calculerTempsRestantcaserne_noir } from "/coc/code/village principal/batiments/calculator/armee calc/caserne noir/caserne noir.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const caserne_noir_box = document.getElementById("caserne_noir_box");
const selectcaserne_noir = document.getElementById("caserne_noir");
const imagecaserne_noir = document.getElementById("image-caserne_noir");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecamps_militaireOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcamps_militaireLevel = parseInt(selectcaserne_noir.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de camps_militaire disponibles en fonction de l'HDV
    const camps_militaireLevels = Object.entries(caserne_noir)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcaserne_noir.innerHTML = "";
    let selectedLevel = null;

    camps_militaireLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `camps_militaire 1 Niveau ${level}`;
        selectcaserne_noir.appendChild(option);

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
        caserne_noir_box.style.display = "none";
        selectcaserne_noir.style.display = "none";
        imagecaserne_noir.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        caserne_noir_box.style.display = "block";
        selectcaserne_noir.style.display = "block";
        imagecaserne_noir.style.display = "block";
        infoContainer.style.display = "block";
        selectcaserne_noir.value = selectedLevel;
        updatecaserne_noirInfo();
    }
}

function updatecaserne_noirInfo() {
    const niveau = `caserne_noir_nv_${selectcaserne_noir.value}`;
    const data = caserne_noir[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcaserne_noir(parseInt(selectcaserne_noir.value, 10),caserne_noir_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcaserne_noir(parseInt(selectcaserne_noir.value, 10), caserne_noir_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecaserne_noir.src = data.image;
        imagecaserne_noir.alt = `camps_militaire Niveau ${selectcaserne_noir.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("caserne_noir_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("caserne_noir_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("caserne_noir_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("caserne_noir_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatecamps_militaireOptions);
selectcaserne_noir.addEventListener("change", updatecaserne_noirInfo);

updatecamps_militaireOptions();
