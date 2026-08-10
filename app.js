import { drawPlot } from "./app_heatmap.js";
import { drawPlot2 } from "./app_ts.js";

function changeTime(hours) {
    const input = document.getElementById("centerTime");
    const d = new Date(input.value);

    d.setHours(d.getHours() + hours);

    input.value =
        d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0") + "T" +
        String(d.getHours()).padStart(2, "0") + ":" +
        String(d.getMinutes()).padStart(2, "0");

    drawPlot();
    drawPlot2();
}

document.getElementById("centerTime")
    .addEventListener("input", () => {
        drawPlot();
        drawPlot2();
    });

document.getElementById("up")
    .addEventListener("click", () => changeTime(1));

document.getElementById("down")
    .addEventListener("click", () => changeTime(-1));
