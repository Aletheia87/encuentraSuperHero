$(document).ready(function () {
    $('form').submit(function (event) {
        event.preventDefault()

        let valueInput = $('#idSuperHero').val();
        let reg = /^([0-9])*$/;

        if (reg.test(valueInput) && valueInput >= 1 && valueInput <= 731) {

            $.ajax({
                type: 'get',
                url: `https://superheroapi.com/api.php/10226507749297023/${valueInput}`,
                dataType: 'json',
                success: function (superHero) {
                    let nombre = superHero.name;
                    let id = superHero.id;
                    let nombreReal = superHero.biography['full-name'];
                    let alterEgos = superHero.biography['alter-egos'];
                    let alias = superHero.biography.aliases;
                    let lugarNacimiento = superHero.biography['place-of-birth'];
                    let primeraAparicion = superHero.biography['first-appearance'];
                    let editor = superHero.biography.publisher;
                    let alineacion = superHero.biography.alignment;

                    let genero = superHero.appearance.gender;
                    let raza = superHero.appearance.race;
                    let estatura = superHero.appearance.height;
                    let peso = superHero.appearance.weight;
                    let colorOjos = superHero.appearance['eye-color'];
                    let colorPelo = superHero.appearance['hair-color'];

                    let ocupacion = superHero.work.occupation;
                    let base = superHero.work.base;

                    let afiliacion = superHero.connections['group-affiliation'];
                    let familiares = superHero.connections.relatives;

                    let imagen = superHero.image.url;

                    $('#respuesta').html(`<h2>SuperHero Encontrado</h2>`);

                    $("#superHeroFoto").html(`
                        <div>
                            <img src="${imagen}"/>
                        </div>
                    `);

                    $("#superHeroTitle").html(`
                        <div>
                            #${id} - ${nombre}
                            <br>
                        </div>
                    `);

                    $("#superHeroInfo").html(`
                        <div>
                            <h5>Biografía</h5>
                            <h6>Nombre Real: ${nombreReal}.</h5>
                            <h6>Alteregos: ${alterEgos}.</h6>
                            <h6>Alias: ${alias}.</h6>
                            <h6>Lugar de Nacimiento: ${lugarNacimiento}.</h6>
                            <h6>Primera Aparición: ${primeraAparicion}.</h6>
                            <h6>Editor: ${editor}.</h6>
                            <h6>Alineación: ${alineacion}.</h6>
                            <br>
                            <h5>Apariencia</h5>
                            <h6>Género: ${genero}.</h6>
                            <h6>Raza: ${raza}.</h6>
                            <h6>Estatura: ${parseInt(estatura[1]) / 100} mts.</h6>
                            <h6>Peso: ${peso[1]}.</h6>
                            <h6>Color de Ojos: ${colorOjos}.</h6>
                            <h6>Color de Pelo: ${colorPelo}.</h6>
                            <br>
                            <h5>Trabajo</h5>
                            <h6>Ocupación: ${ocupacion}.</h6>
                            <h6>Base: ${base}.</h6>
                            <br>
                            <h5>Conexiones</h5>
                            <h6>Afiliación: ${afiliacion}.</h6>
                            <h6>Familiares: ${familiares}.</h6>
                            <br>
                        </div>
                    `);

                    $("#graficoTitle").html(`Estadísticas de Poder para ${nombre}`);

                    // Themes begin
                    am4core.useTheme(am4themes_spiritedaway);
                    am4core.useTheme(am4themes_animated);
                    // Themes end

                    /* Create chart instance */
                    let chart = am4core.create("superHeroStats", am4charts.RadarChart);

                    /* Add data */
                    chart.data = [
                    {
                        "habilidad": "Inteligencia",
                        "valor": `${superHero.powerstats.intelligence}`
                    }, 
                    {
                        "habilidad": "Fuerza",
                        "valor": `${superHero.powerstats.strength}`
                    }, 
                    {
                        "habilidad": "Velocidad",
                        "valor": `${superHero.powerstats.speed}`
                    },
                    {
                        "habilidad": "Resistencia",
                        "valor": `${superHero.powerstats.durability}`
                    },
                    {
                        "habilidad": "Poder",
                        "valor": `${superHero.powerstats.power}`
                    }, 
                    {
                        "habilidad": "Combate",
                        "valor": `${superHero.powerstats.combat}`
                    }
                    ];
                    /* Create axes */
                    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                    categoryAxis.dataFields.category = "habilidad";

                    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                    valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
                    valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

                    /* Create and configure series */
                    var series = chart.series.push(new am4charts.RadarSeries());
                    series.dataFields.valueY = "valor";
                    series.dataFields.categoryX = "habilidad";
                    series.strokeWidth = 3;

                },
            });
            $('form')[0].reset();

        } else {
            alert(`Ingrese un Id válido`);
            $("form")[0].reset();
        };
    });
});