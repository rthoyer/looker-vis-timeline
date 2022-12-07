import { Looker, VisualizationDefinition, LookerChartUtils, Cell } from './types'

declare var looker: Looker
declare var LookerCharts: LookerChartUtils

interface TimelineVisualization extends VisualizationDefinition {
  _timeline?: any
}

const vis: TimelineVisualization = { 
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
    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          /* Vertical centering */
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-text-large {
          font-size: 72px;
        }
        .hello-world-text-small {
          font-size: 18px;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"))

    // Create an element to contain the text.
    this._timeline = container.appendChild(document.createElement("div"));

  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    if (this.addError && this.clearErrors) {
      if (data.length === 0) {
        this.addError({ title: 'No Results' })
        return
      }
      else if (queryResponse.fields.dimensions.length == 0) {
        this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
        return
      }
      else if (queryResponse.fields.pivots.length !== 0){
        this.addError({ title: "Remove Pivot", message: "This chart is incompatible with pivots" });
        return
      }
      else {
        this.clearErrors()
      }
    }

    // Grab the first cell of the data
    var firstRow = data[0]
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name] as Cell

    // Insert the data into the page
    this._timeline.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);


    // We are done rendering! Let Looker know.
    done()
  }
}

looker.plugins.visualizations.add(vis)
