import { camps_militaire3 } from "/coc/code/village principal/batiments/database/data armee/data camps militaire.js";
import { camps_militaire3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/armee calc/camps militaires/camps militaire3.calc.js";
import { calculerPrixRestantcamps_militaire3 } from "/coc/code/village principal/batiments/calculator/armee calc/camps militaires/camps militaire3.calc.js";
import { calculerTempsRestantcamps_militaire3 } from "/coc/code/village principal/batiments/calculator/armee calc/camps militaires/camps militaire3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const camps_militaire3_box = document.getElementById("camps_militaire3_box");
const selectcamps_militaire3 = document.getElementById("camps_militaire3");
const imagecamps_militaire3 = document.getElementById("image-camps_militaire3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecamps_militaireOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentcamps_militaireLevel = parseInt(selectcamps_militaire3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de camps_militaire disponibles en fonction de l'HDV
    const camps_militaireLevels = Object.entries(camps_militaire3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectcamps_militaire3.innerHTML = "";
    let selectedLevel = null;

    camps_militaireLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `camps_militaire 1 Niveau ${level}`;
        selectcamps_militaire3.appendChild(option);

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
        camps_militaire3_box.style.display = "none";
        selectcamps_militaire3.style.display = "none";
        imagecamps_militaire3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        camps_militaire3_box.style.display = "block";
        selectcamps_militaire3.style.display = "block";
        imagecamps_militaire3.style.display = "block";
        infoContainer.style.display = "block";
        selectcamps_militaire3.value = selectedLevel;
        updatecamps_militaire3Info();
    }
}

function updatecamps_militaire3Info() {
    const niveau = `camps_militaire3_nv_${selectcamps_militaire3.value}`;
    const data = camps_militaire3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcamps_militaire3(parseInt(selectcamps_militaire3.value, 10),camps_militaire3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcamps_militaire3(parseInt(selectcamps_militaire3.value, 10), camps_militaire3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagecamps_militaire3.src = data.image;
        imagecamps_militaire3.alt = `camps_militaire Niveau ${selectcamps_militaire3.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("camps_militaire3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("camps_militaire3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("camps_militaire3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("camps_militaire3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectHdv.addEventListener("change", updatecamps_militaireOptions);
selectcamps_militaire3.addEventListener("change", updatecamps_militaire3Info);

updatecamps_militaireOptions();
