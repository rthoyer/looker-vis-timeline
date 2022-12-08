"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        element.style.fontFamily = `"Open Sans", "Helvetica", sans-serif`;
        var css = element.innerHTML = `
      <style>
      </style>
    `;
        // Create a container element to let us center the text.
        var time_axis = element.appendChild(document.createElement("div"));
        time_axis.className = "time-axis";
        // Create an element to contain the text.
        this._time_axis = time_axis;
    },
    updateAsync: function (data, element, config, queryResponse, details, done) {
        this.clearErrors();
        // Throw some errors and exit if the shape of the data isn't what this chart needs.
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({ title: "No Dimensions", message: "This chart requires dimensions." });
            return;
        }
        // Grab the first cell of the data.
        //var firstRow = data[0];
        //var firstCell = firstRow[queryResponse.fields.dimensions[0].name];
        this._time_axis.innerHTML = `
      <span class="month" *ngFor="let month of monthAxis" [style.width]="month.monthDurationPercentage + '%'"> {{month.monthName}}</span>

    `;
        // create the header
        this._header.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);
        if (config.font_size == "small") {
            this._textElement.className = "hello-world-text-small";
        }
        else {
            this._textElement.className = "hello-world-text-large";
        }
        // Always call done to indicate a visualization has finished rendering.
        done();
    }
}, 
/** Given a start and end limits and unit will return full units between period along with units diplay names and
 */
getTimeline;
(past_limit, future_limit, unit) => {
    const now = moment().startOf(unit);
    let timeline = new Array();
    for (var i = 0; i <= endMonth - startMonth; i++) {
        const adjustedStartDate = DateHelperService.addMonths(startDate, i);
        const monthName = DateHelperService.getMonthName(adjustedStartDate);
        const daysInMonth = DateHelperService.daysInMonth(adjustedStartDate);
        const monthDurationPercentage = daysInMonth / totalDurationDays * 100;
        months.push({ monthName: monthName, monthDurationPercentage: monthDurationPercentage });
    }
    return months;
};
looker.plugins.visualizations.add(vis);
