import { canon3 } from "/coc/code/village principal/batiments/database/data defense/data canon.js";
import { canon3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon3.calc.js";
import { calculerPrixRestantcanon3 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon3.calc.js";
import { calculerTempsRestantcanon3 } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

const canon3_box = document.getElementById("canon3_box");
const selectCanon3 = document.getElementById("canon3");
const imageCanon3 = document.getElementById("image-canon3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selectCanon3.value) || 0;

    const canonLevels = Object.entries(canon3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    selectCanon3.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Canon 3 Niveau ${level}`;
        selectCanon3.appendChild(option);

        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    if (canonLevels.length === 0) {
        canon3_box.style.display = "none";
        selectCanon3.style.display = "none";
        imageCanon3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        canon3_box.style.display = "block";
        selectCanon3.style.display = "block";
        imageCanon3.style.display = "block";
        infoContainer.style.display = "block";
        selectCanon3.value = selectedLevel;
        updateCanon3Info();
    }
}

function updateCanon3Info() {
    const niveau = `canon3_nv_${selectCanon3.value}`;
    const data = canon3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantcanon3(parseInt(selectCanon3.value, 10), canon3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantcanon3(parseInt(selectCanon3.value, 10), canon3_nv_max_hdv(hdvNiveau));

    if (data) {
        imageCanon3.src = data.image;
        imageCanon3.alt = `Canon Niveau ${selectCanon3.value}`;
    }
    document.getElementById("canon3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("canon3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}

selectHdv.addEventListener("change", updateCanonOptions);
selectCanon3.addEventListener("change", updateCanon3Info);

updateCanonOptions();