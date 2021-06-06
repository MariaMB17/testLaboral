import { Component, Inject, OnInit , NgZone } from '@angular/core';
// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss']
})
export class MapChartComponent implements OnInit {
  //@ts-ignore
  private map: am4maps.MapChart;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
        // Create map instance
        let map = am4core.create("mapdiv", am4maps.MapChart);
        // Set map definition
        map.geodata = am4geodata_worldLow;
        // Set projection
        //map.projection = new am4maps.projections.Miller();
        map.projection = new am4maps.projections.Mercator();

        // Create map polygon series
        let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        // Configure series 
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.fill = am4core.color("#74B266");

        // Create hover state and set alternative fill color 
        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        // Remove Antarctica
        polygonSeries.exclude = ["AQ"];

        // Add some data 
        polygonSeries.data = [{
          "id": "US",
           "name": "United States",
           "value": '15%',
           "fill": am4core.color("#F05C5C")
          }, {
            "id": "FR",
            "name": "France",
            "value": '10%',
            "fill": am4core.color("#5C5CFF")
          },
          {
            "id": "VE",
            "name": "Venezuela",
            "value": '50%',
            "fill": am4core.color("#401779")
          },
          {
            "id": "CO",
            "name": "Colombia",
            "value": '5%',
            "fill": am4core.color("#1a9b2b")
          },
          {
            "id": "AR",
            "name": "Argentina",
            "value": '5%',
            "fill": am4core.color("#7a0f4a")
          },
          {
            "id": "BR",
            "name": "Brasil",
            "value": '3%',
            "fill": am4core.color("#4207e6")
          },
          {
            "id": "PE",
            "name": "Peru",
            "value": '2%',
            "fill": am4core.color("#4207e6")
          },
          {
            "id": "PY",
            "name": "Paraguay",
            "value": '1%',
            "fill": am4core.color("#ee0a0a")
          },
          {
            "id": "UY",
            "name": "Uruguay",
            "value": '1%',
            "fill": am4core.color("#617a04")
          },
          {
            "id": "GY",
            "name": "Guyana",
            "value": '3%',
            "fill": am4core.color("#572802")
          }
        ];

        // Bind "fill" property to "fill" key in data
        polygonTemplate.propertyFields.fill = "fill";
        map.zoomControl = new am4maps.ZoomControl();
        this.map = map;
    });
  };
      
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
        if (this.map) {
      this.map.dispose();
        }
    });
  };
}