const n = 15;
const C = [];

for (let i = 1; i <= n; i++) {
    const response = await fetch(`gbms_rom/C${i}.txt`);
    const text = await response.text();

    const Z = text.trim().split("\n").map(line =>
        line.trim().split(",").map(Number)
    );

    C.push(Z);
}

const responseT = await fetch("gbms_rom/T.txt");
const textT = await responseT.text();
const valuesT = textT.trim().split(/\s+/);

const T = valuesT.map(value =>
    Number(value) / 24 / 60 / 60
);

const x = Array.from({length: 245}, (_, i) => i + 1);
const y = Array.from({length: 326}, (_, i) => i + 1);

const yourData = [
    [1, 2, 3],
    [2, 3, 4],
    [3, 4, 5]
];

document.getElementById("loading").style.display = "none";

function drawPlot() {

    const d0 = new Date("2006-01-01T00:00:00");

    const timeString =
        document.getElementById("centerTime").value;

    const d = new Date(timeString);

    const t =
        (d.getTime()-d0.getTime())
        /1000/24/60/60;

    let B = C[0].map(row =>
        row.map(() => 0)
    );


    // C1*sin(...) + C2*sin(...) + ...
    const nn=(n-1)/2;
    for (let i = 0; i < nn; i++) {

        const factor1 =
            Math.sin(2 * Math.PI * t / T[i]);
	const factor2 =
	    Math.cos(2 * Math.PI * t / T[i]);

        B = B.map((row, j) =>
            row.map((value, k) =>
                value + C[i][j][k] * factor1
		      + C[i+1+nn][j][k] * factor2
            )
        );
    }

    // Plot
    const plotData = [{
        x: x,
        y: y,
        z: B,
        type: "heatmap",
        zmin: -1,
        zmax: 1,
	colorbar: {
		orientation: "h",
		x: 0.5,
		xanchor: "center",
		y: -0.15,
		yanchor: "top",
		thickness: 15,
		title: {
                   text: "Sea Surface elevation (m)",
		   side: "top"
                   }
           	}
       }];

const layout = {
    autosize: true,

    margin: {
        l: 60,
        r: 70,
        t: 30,
        b: 50
    },

    xaxis: {
        autorange: true,
        zeroline: false
    },

    yaxis: {
        autorange: true,
        scaleanchor: "x",
        scaleratio: 1,
        zeroline: false
    }}

//    const layout = {
//	autosize: true,
//       xaxis: {
//	    scaleanchor: "y",
//            scaleratio: 1,
//	    constrain: "domain",
//	    range: [x[0], x[x.length - 1]]
//	    },
//	yaxis: {
//	    range: [y[0], y[y.length - 1]],
//	    constrain: "domain"
//	    }
//    };

    Plotly.newPlot("plot", plotData, layout, {responsive: true});
}

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
}

document.getElementById("centerTime")
    .addEventListener("input", drawPlot);

document.getElementById("up")
    .addEventListener("click", () => changeTime(1));

document.getElementById("down")
    .addEventListener("click", () => changeTime(-1));

//document.getElementById("up").onclick = () => changeTime(1);
//document.getElementById("down").onclick = () => changeTime(-1);
drawPlot();
