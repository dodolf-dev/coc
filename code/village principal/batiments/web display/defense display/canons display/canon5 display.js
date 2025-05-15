import { canon5 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon5.calc.js";
import { calculerPrixRestantcanon5 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon5.calc.js";
import { calculerTempsRestantcanon5 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const canon5_box = document.getElementById("canon5_box");
const selectCanon5 = document.getElementById("canon5");
const imageCanon5 = document.getElementById("image-canon5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon5.value) || 0;

    const canonLevels = Object.entries(canon5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    selectCanon5.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 5 Niveau ${level}`;
        selectCanon5.appendChild(option);

        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    if (canonLevels.length === 0) {
        canon5_box.style.display = "none";
        selectCanon5.style.display = "none";
        imageCanon5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon5_box.style.display = "block";
        selectCanon5.style.display = "block";
        imageCanon5.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon5.value = selectedLevel;
        updateCanon5Info();
    }
}

function updateCanon5Info() {
    const niveau = `canon5_nv_${selectCanon5.value}`;
    const data = canon5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon5(parseInt(selectCanon5.value, 10), canon5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon5(parseInt(selectCanon5.value, 10), canon5_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon5.src = data.image;
        imageCanon5.alt = `Canon Niveau ${selectCanon5.value}`;
    }
    if (prixrestant === 0) {
        canon5_prix_niveau.style.display = "none";
    }
    else {
        canon5_prix_niveau.style.display = "";
        document.getElementById("canon5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        canon5_temps_niveau.style.display = "none";
    }
    else{
        canon5_temps_niveau.style.display = "";
        document.getElementById("canon5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}

selectHdv.addEventListener("change", updateCanonOptions);
selectCanon5.addEventListener("change", updateCanon5Info);

updateCanonOptions();