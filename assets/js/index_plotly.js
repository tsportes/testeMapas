d3.csv('https://tsportes.github.io/testeMapas/assets/data/metricas_balanco.csv', function(err, rows) {
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    // Carregando o arquivo GeoJSON personalizado
    d3.json('https://tsportes.github.io/testeMapas/assets/maps/LocalidadesSinopse.json', function(geojson) {

        var data = [{
            type: 'choroplethmapbox', // Troque 'choropleth' por 'choroplethmapbox'
            geojson: geojson, // Adicione a propriedade geojson
            locations: unpack(rows, 'No_Localidade_Gis'),
            z: unpack(rows, 'Nr_Volume_Fornecido_1'),
            text: unpack(rows, 'Co_Sk_Sist_Abastecimento_ Gis'),
            zmin: 0,
            zmax: 170000,
            colorscale: [
                [0, 'rgb(242,240,247)'],
                [0.2, 'rgb(218,218,235)'],
                [0.4, 'rgb(188,189,220)'],
                [0.6, 'rgb(158,154,200)'],
                [0.8, 'rgb(117,107,177)'],
                [1, 'rgb(84,39,143)']
            ],
            colorbar: {
                title: 'Valores',
                thickness: 0.6
            },
            marker: {
                line: {
                    color: 'rgb(255,255,255)',
                    width: 5
                }
            }
        }];

        var layout = {
            title: 'Poligonais DF',
            mapbox: { // Use a propriedade mapbox em vez de geo
                style: 'open-street-map', // Ou qualquer outro estilo de mapa que você queira usar
                zoom: 10 // Ajuste isso de acordo com a área do seu mapa
            },
            autosize: true
        };

        Plotly.newPlot("myDiv", data, layout, { showLink: false });
    });
});