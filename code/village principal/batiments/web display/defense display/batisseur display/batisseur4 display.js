import { batisseur4 } from "/coc/code/village principal/batiments/database/data defense/data batisseur.js";
import { batisseur4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerPrixRestantbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerTempsRestantbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const batisseur4_box = document.getElementById("batisseur4_box");
const selectbatisseur4 = document.getElementById("batisseur4");
const imagebatisseur4 = document.getElementById("image-batisseur4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebatisseurOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbatisseurLevel = parseInt(selectbatisseur4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de batisseur disponibles en fonction de l'HDV
    const batisseurLevels = Object.entries(batisseur4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbatisseur4.innerHTML = "";
    let selectedLevel = null;

    batisseurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bâtisseur 4 Niveau ${level}`;
        selectbatisseur4.appendChild(option);

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
        batisseur4_box.style.display = "none";
        selectbatisseur4.style.display = "none";
        imagebatisseur4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        batisseur4_box.style.display = "block";
        selectbatisseur4.style.display = "block";
        imagebatisseur4.style.display = "block";
        infoContainer.style.display = "block";
        selectbatisseur4.value = selectedLevel;
        updatebatisseur4Info();
    }
}

function updatebatisseur4Info() {
    const niveau = `batisseur4_nv_${selectbatisseur4.value}`;
    const data = batisseur4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbatisseur4(parseInt(selectbatisseur4.value, 10),batisseur4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbatisseur4(parseInt(selectbatisseur4.value, 10), batisseur4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebatisseur4.src = data.image;
        imagebatisseur4.alt = `batisseur Niveau ${selectbatisseur4.value}`;
    }
    document.getElementById("batisseur4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("batisseur4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatebatisseurOptions);
selectbatisseur4.addEventListener("change", updatebatisseur4Info);

updatebatisseurOptions();
