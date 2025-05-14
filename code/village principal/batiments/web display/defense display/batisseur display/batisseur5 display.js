import { batisseur5 } from "/coc/code/village principal/batiments/database/data defense/data batisseur.js";
import { batisseur5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";
import { calculerPrixRestantbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";
import { calculerTempsRestantbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const batisseur5_box = document.getElementById("batisseur5_box");
const selectbatisseur5 = document.getElementById("batisseur5");
const imagebatisseur5 = document.getElementById("image-batisseur5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebatisseurOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbatisseurLevel = parseInt(selectbatisseur5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de batisseur disponibles en fonction de l'HDV
    const batisseurLevels = Object.entries(batisseur5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbatisseur5.innerHTML = "";
    let selectedLevel = null;

    batisseurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `batisseur 2 Niveau ${level}`;
        selectbatisseur5.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentbatisseurLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = batisseurLevels.length ? parseInt(batisseurLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le batisseur 1
    if (batisseurLevels.length === 0) {
        batisseur5_box.style.display = "none";
        selectbatisseur5.style.display = "none";
        imagebatisseur5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        batisseur5_box.style.display = "block";
        selectbatisseur5.style.display = "block";
        imagebatisseur5.style.display = "block";
        infoContainer.style.display = "block";
        selectbatisseur5.value = selectedLevel;
        updatebatisseur5Info();
    }
}

function updatebatisseur5Info() {
    const niveau = `batisseur5_nv_${selectbatisseur5.value}`;
    const data = batisseur5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbatisseur5(parseInt(selectbatisseur5.value, 10),batisseur5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbatisseur5(parseInt(selectbatisseur5.value, 10), batisseur5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebatisseur5.src = data.image;
        imagebatisseur5.alt = `batisseur Niveau ${selectbatisseur5.value}`;
    }
    document.getElementById("batisseur5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("batisseur5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatebatisseurOptions);
selectbatisseur5.addEventListener("change", updatebatisseur5Info);

updatebatisseurOptions();
