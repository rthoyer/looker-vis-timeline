"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auto_1 = __importDefault(require("chart.js/auto"));
const lineChartType = "bar";
const indexAxis = 'y';
const x_scale_position = 'top';
const vis = {
    id: 'rthoyer-dev-vis-timeline',
    label: 'DEV ONLY - Timeline',
    options: {
        unit: {
            type: "string",
            label: "Unit",
            values: [
                { "Months": "month" },
                { "Weeks": "week" },
                { "Days": "day" },
                { "Hours": "hour" },
                { "Minutes": "minute" },
                { "Seconds": "second" }
            ],
            display: "select",
            default: "day",
            order: 1
        },
        past_limit: {
            type: "number",
            label: "Amount of units to display in the past",
            display: "number",
            default: 1,
            order: 2,
            display_size: "half"
        },
        future_limit: {
            type: "number",
            label: "Amount of units to display in the future",
            display: "number",
            default: 5,
            order: 3,
            display_size: "half"
        }
    },
    create: function (element, config) {
        // Create a container element to let us center the text.
        const container = element.appendChild(document.createElement("div"));
        const vizCanvas = document.createElement('canvas');
        vizCanvas.setAttribute('id', 'chartjsChart');
        container.appendChild(vizCanvas);
    },
    updateAsync: function (data, element, config, queryResponse, details, done) {
        if (this.addError && this.clearErrors) {
            if (data.length === 0) {
                this.addError({ title: 'No Results' });
                return;
            }
            else if (queryResponse.fields.dimensions.length == 0) {
                this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
                return;
            }
            else if (queryResponse.fields.pivots.length !== 0) {
                this.addError({ title: "Remove Pivot", message: "This chart is incompatible with pivots" });
                return;
            }
            else {
                this.clearErrors();
            }
        }
        // Grab the first cell of the data
        // var firstRow = data[0]
        // var firstCell = firstRow[queryResponse.fields.dimensions[0].name] as Cell
        // // Insert the data into the page
        // this._timeline.innerHTML = LookerCharts.Utils.htmlForCell(firstCell)
        //const processed_data: ChartData = {
        const labels = data.map((result) => result[queryResponse.fields.dimensions[0]]).filter((v, i, a) => a.indexOf(v) === i);
        const actual_data = data.map((result) => ({ y: result[0], dates: [new Date(result[queryResponse.fields.dimensions[1]].value), new Date(result[queryResponse.fields.dimensions[2]].value)] }));
        const datasets = actual_data.map((item) => ({ data: [item], parsing: { xAxisKey: 'dates' } }));
        const cfg = {
            type: lineChartType,
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                grouped: false,
                offset: true,
                indexAxis: indexAxis,
                responsive: true,
                scales: {
                    x: {
                        position: x_scale_position,
                    }
                }
            }
        };
        const ctx = document.getElementById("chartjsChart");
        const myChart = new auto_1.default(ctx, cfg);
        done();
        // const chart_config = {
        //   type: lineChartType,
        //   data: {
        //     labels: ['Label 1', 'Label 2', 'Label 3'],
        //     datasets: [{
        //       label: "Dataset 1",
        //       data: [1, 2, 3],
        //     }]
        //   },
        //   indexAxis: 'y',
        //   responsive: true,
        //   plugins: [{
        //     legend: {
        //       position: 'top',
        //     },
        //     title: {
        //       display: true,
        //       text: 'Chart.js Floating Bar Chart'
        //     },
        //     id: ''
        //   }]
        // }
        // new Chart(
        //   this._timeline,
        //   chart_config,
        // ),
        done();
    }
};
looker.plugins.visualizations.add(vis);
