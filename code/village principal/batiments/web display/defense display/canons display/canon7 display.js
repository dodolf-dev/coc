import { canon7 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon7_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon7.calc.js";
import { calculerPrixRestantcanon7 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon7.calc.js";
import { calculerTempsRestantcanon7 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon7.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const canon7_box = document.getElementById("canon7_box");
const selectCanon7 = document.getElementById("canon7");
const imageCanon7 = document.getElementById("image-canon7");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon7.value) || 0;

    const canonLevels = Object.entries(canon7)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    selectCanon7.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 7 Niveau ${level}`;
        selectCanon7.appendChild(option);

        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    if (canonLevels.length === 0) {
        canon7_box.style.display = "none";
        selectCanon7.style.display = "none";
        imageCanon7.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon7_box.style.display = "block";
        selectCanon7.style.display = "block";
        imageCanon7.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon7.value = selectedLevel;
        updateCanon7Info();
    }
}

function updateCanon7Info() {
    const niveau = `canon7_nv_${selectCanon7.value}`;
    const data = canon7[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon7(parseInt(selectCanon7.value, 10), canon7_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon7(parseInt(selectCanon7.value, 10), canon7_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon7.src = data.image;
        imageCanon7.alt = `Canon Niveau ${selectCanon7.value}`;
    }
    document.getElementById("canon7_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon7_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}

selectHdv.addEventListener("change", updateCanonOptions);
selectCanon7.addEventListener("change", updateCanon7Info);

updateCanonOptions();