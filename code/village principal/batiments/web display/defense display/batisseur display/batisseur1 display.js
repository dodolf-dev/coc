import { batisseur1 } from "/coc/code/village principal/batiments/database/data defense/data batisseur.js";
import { batisseur1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerPrixRestantbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerTempsRestantbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const batisseur1_box = document.getElementById("batisseur1_box");
const selectbatisseur1 = document.getElementById("batisseur1");
const imagebatisseur1 = document.getElementById("image-batisseur1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatebatisseurOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentbatisseurLevel = parseInt(selectbatisseur1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de batisseur disponibles en fonction de l'HDV
    const batisseurLevels = Object.entries(batisseur1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectbatisseur1.innerHTML = "";
    let selectedLevel = null;

    batisseurLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Bâtisseur 1 Niveau ${level}`;
        selectbatisseur1.appendChild(option);

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
        batisseur1_box.style.display = "none";
        selectbatisseur1.style.display = "none";
        imagebatisseur1.style.display = "none";
        infoContainer.style.display = "none";
        batisseur_block.style.display = "none";
    } else {
        batisseur1_box.style.display = "block";
        selectbatisseur1.style.display = "block";
        imagebatisseur1.style.display = "block";
        infoContainer.style.display = "block";
        batisseur_block.style.display = "block";
        selectbatisseur1.value = selectedLevel;
        updatebatisseur1Info();
    }
}

function updatebatisseur1Info() {
    const niveau = `batisseur1_nv_${selectbatisseur1.value}`;
    const data = batisseur1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantbatisseur1(parseInt(selectbatisseur1.value, 10),batisseur1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantbatisseur1(parseInt(selectbatisseur1.value, 10), batisseur1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagebatisseur1.src = data.image;
        imagebatisseur1.alt = `batisseur Niveau ${selectbatisseur1.value}`;
    }
    document.getElementById("batisseur1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("batisseur1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatebatisseurOptions);
selectbatisseur1.addEventListener("change", updatebatisseur1Info);

updatebatisseurOptions();