am5.ready(function() {

    // Create root
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
        am5themes_Animated.new(root)
    ]);

    // Create chart
    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoAlbersUsa(),
        layout: root.horizontalLayout
    }));

    // Create polygon series
    var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: localidades_sinopseLow,
        valueField: "value",
        calculateAggregates: true
    }));

    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}: {value}"
    });

    polygonSeries.set("heatRules", [{
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color(0xff621f),
        max: am5.color(0x661f00),
        key: "fill"
    }]);

    polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
        heatLegend.showValue(ev.target.dataItem.get("value"));
    });

    polygonSeries.data.setAll([
        { id: "samambaia", value: 4447100 },
        { id: "planopiloto", value: 47100 },
        { id: "riachofundo", value: 347100 }
    ]);

    var heatLegend = chart.children.push(am5.HeatLegend.new(root, {
        orientation: "vertical",
        startColor: am5.color(0xff621f),
        endColor: am5.color(0x661f00),
        startText: "Lowest",
        endText: "Highest",
        stepCount: 5
    }));

    heatLegend.startLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("startColor")
    });

    heatLegend.endLabel.setAll({
        fontSize: 12,
        fill: heatLegend.get("endColor")
    });

    // change this to template when possible
    polygonSeries.events.on("datavalidated", function() {
        heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
        heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });

}); // end am5.ready()