// Read data

const response1 = await fetch("gbms_rom/cfs.txt");
const text1 = await response1.text();

const values1 = text1.trim().split(/\s+/);

        const A1 = Number(values1[0]);
        const A2 = Number(values1[1]);
        const A3 = Number(values1[2]);
        const A4 = Number(values1[3]);
        const A5 = Number(values1[4]);
	const A6 = Number(values1[5]);
	const A7 = Number(values1[6]);
	const B0 = Number(values1[7]);
	const B1 = Number(values1[8]);
	const B2 = Number(values1[9]);
	const B3 = Number(values1[10]);
	const B4 = Number(values1[11]);
	const B5 = Number(values1[12]);
	const B6 = Number(values1[13]);
	const B7 = Number(values1[14]);


const response2 = await fetch("gbms_rom/T.txt");
const text2 = await response2.text();
const values2 = text2.trim().split(/\s+/);

        const T1 = Number(values2[0])/24/60/60;
        const T2 = Number(values2[1])/24/60/60;
        const T3 = Number(values2[2])/24/60/60;
        const T4 = Number(values2[3])/24/60/60;
        const T5 = Number(values2[4])/24/60/60;
        const T6 = Number(values2[5])/24/60/60;
        const T7 = Number(values2[6])/24/60/60;

function drawPlot2() {
        // Create x
        //const d  = new Date("2021-11-20T00:00:00");
        const d0 = new Date("2006-01-01T00:00:00");
        const timeString = document.getElementById("centerTime").value;
        const d = new Date(timeString);
        const tc = (d.getTime()-d0.getTime())/1000/24/60/60;
        const dT = 7;
	const x = [];
        for (let i = tc-dT; i <= tc+dT; i = i + 0.025) {
            x.push(i);
        }
        
        // Calculate y
        const y = x.map(value =>
            A1 * Math.sin(2*Math.PI*value/T1) + B1 * Math.cos(2*Math.PI*value/T1) +
	    A2 * Math.sin(2*Math.PI*value/T2) + B2 * Math.cos(2*Math.PI*value/T2) +
       	    A3 * Math.sin(2*Math.PI*value/T3) + B3 * Math.cos(2*Math.PI*value/T3) +
	    A4 * Math.sin(2*Math.PI*value/T4) + B4 * Math.cos(2*Math.PI*value/T4) +
	    A5 * Math.sin(2*Math.PI*value/T5) + B5 * Math.cos(2*Math.PI*value/T5) +
	    A6 * Math.sin(2*Math.PI*value/T6) + B6 * Math.cos(2*Math.PI*value/T6) +
	    A7 * Math.sin(2*Math.PI*value/T7) + B7 * Math.cos(2*Math.PI*value/T7)
        );

	const dates = x.map(value =>
            new Date(d0.getTime() + value * 24 * 60 * 60 * 1000)
        );


        // Plot
        const plotData = [{
            x: dates,
            y: y,
            type: "scatter",
            mode: "lines"
        }];

	const layout = {
	         autosize: true,
                 margin: {
                    l: 60,
                    r: 70,
                    t: 30,
                    b: 50
                    },
                xaxis: {type: "date"},
		shapes: [{
                    type: "line",
                    x0: d,
                    x1: d,
                    y0: 0,
                    y1: 1,
                    yref: "paper",
                    line: {
                    width: 2,
                    dash: "dash"
                    }
                    }],
                annotations: [{
                    x: d,
                    y: 1,
                    xref: "x",
                    yref: "paper",
                    text: timeString.replace("T", " "),
                    showarrow: false,
                    yshift: 10
                    }]
        };

        Plotly.newPlot("plot2", plotData, layout, {responsive: true});
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

    drawPlot2();
}

document.getElementById("centerTime")
    .addEventListener("input", drawPlot2);

document.getElementById("up")
    .addEventListener("click", () => changeTime(1));

document.getElementById("down")
    .addEventListener("click", () => changeTime(-1));

drawPlot2();
