import { batisseur3 } from "/coc/code/village principal/batiments/database/data defense/data batisseur.js";
import { batisseur3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerPrixRestantbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerTempsRestantbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const batisseur3_box = document.getElementById("batisseur3_box");
const selectbatisseur3 = document.getElementById("batisseur3");
const imagebatisseur3 = document.getElementById("image-batisseur3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebatisseurOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbatisseurLevel = parseInt(selectbatisseur3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de batisseur disponibles en fonction de l'HDV
    const batisseurLevels = Object.entries(batisseur3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbatisseur3.innerHTML = "";
    let selectedLevel = null;

    batisseurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `batisseur 2 Niveau ${level}`;
        selectbatisseur3.appendChild(option);

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
        batisseur3_box.style.display = "none";
        selectbatisseur3.style.display = "none";
        imagebatisseur3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        batisseur3_box.style.display = "block";
        selectbatisseur3.style.display = "block";
        imagebatisseur3.style.display = "block";
        infoContainer.style.display = "block";
        selectbatisseur3.value = selectedLevel;
        updatebatisseur3Info();
    }
}

function updatebatisseur3Info() {
    const niveau = `batisseur3_nv_${selectbatisseur3.value}`;
    const data = batisseur3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbatisseur3(parseInt(selectbatisseur3.value, 10),batisseur3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbatisseur3(parseInt(selectbatisseur3.value, 10), batisseur3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebatisseur3.src = data.image;
        imagebatisseur3.alt = `batisseur Niveau ${selectbatisseur3.value}`;
    }
    document.getElementById("batisseur3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("batisseur3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatebatisseurOptions);
selectbatisseur3.addEventListener("change", updatebatisseur3Info);

updatebatisseurOptions();
