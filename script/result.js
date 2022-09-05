database.ref("Results/cand").on("value", (res) => {
    window.cand = res.val();
    anychart.onDocumentReady(function () {

        // create the data
        var data = {
            header: ["Candidate", "Votes"],
            rows: Object.entries(window.cand)
        };
        window.data = data;
        // create the column chart
        var chart = anychart.column(); 
        chart.data(data);
        var color1 = [255, 0, 0];
        var color2 = [0, 0, 255];
        anychart.color.blend(color1, color2, 0.2);
        // add the data

        // series.fill('#94353C');
        // set the container
        chart.container("container");

        // draw the chart
        chart.draw();

    });
});
database.ref("Results/party").on("value", (res) => {
    window.pty = res.val();
});
