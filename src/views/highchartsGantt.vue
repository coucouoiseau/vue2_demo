<template>
	<div>
		<div id="highchartsGantt"></div>
	</div>
</template>

<script>
import Highcharts from 'highcharts';
import gantt from 'highcharts/modules/gantt';

export default {
	name: "highchartsGantt",
	data() {
		return {
			Highcharts: Highcharts,
		}
	},
	mounted() {
		gantt(Highcharts)
		this.init()
	},
	methods: {
		init() {
			let today = new Date(),
				day = 1000 * 60 * 60 * 24,
				// Utility functions
				dateFormat = Highcharts.dateFormat,
				defined = Highcharts.defined,
				isObject = Highcharts.isObject,
				reduce = Highcharts.reduce;
			today.setUTCHours(0);
			today.setUTCMinutes(0);
			today.setUTCSeconds(0);
			today.setUTCMilliseconds(0);
			today = today.getTime();
			Highcharts.ganttChart('highchartsGantt', {
				series: [
					{
						name: 'Offices',
						data: [
							{
								name: 'New offices',
								id: 'new_offices',
								owner: 'Peter'
							}, {
								name: 'Prepare office building',
								id: 'prepare_building',
								parent: 'new_offices',
								start: today - (2 * day),
								end: today + (6 * day),
								completed: {
									amount: 0.2
								},
								owner: 'Linda'
							}, {
								name: 'Inspect building',
								id: 'inspect_building',
								dependency: 'prepare_building',
								parent: 'new_offices',
								start: today + 6 * day,
								end: today + 8 * day,
								owner: 'Ivy'
							}, {
								name: 'Passed inspection',
								id: 'passed_inspection',
								dependency: 'inspect_building',
								parent: 'new_offices',
								start: today + 9.5 * day,
								milestone: true,
								owner: 'Peter'
							}, {
								name: 'Relocate',
								id: 'relocate',
								dependency: 'passed_inspection',
								parent: 'new_offices',
								owner: 'Josh'
							}, {
								name: 'Relocate staff',
								id: 'relocate_staff',
								parent: 'relocate',
								start: today + 10 * day,
								end: today + 11 * day,
								owner: 'Mark'
							}, {
								name: 'Relocate test facility',
								dependency: 'relocate_staff',
								parent: 'relocate',
								start: today + 11 * day,
								end: today + 13 * day,
								owner: 'Anne'
							}, {
								name: 'Relocate cantina',
								dependency: 'relocate_staff',
								parent: 'relocate',
								start: today + 11 * day,
								end: today + 122 * day
							}]
					},
				],
				navigator: {
					enabled: true,
					series: {
						type: 'gantt',
						pointPlacement: 0.5,
						pointPadding: 0.25
					},
					yAxis: {
						min: 0,
						max: 3,
						reversed: true,
						categories: []
					}
				},
				tooltip: {
					pointFormatter: function () {
						var point = this,
							format = '%e. %b',
							options = point.options,
							completed = options.completed,
							amount = isObject(completed) ? completed.amount : completed,
							status = ((amount || 0) * 100) + '%',
							lines;
						lines = [{
							value: point.name,
							style: 'font-weight: bold;'
						}, {
							title: 'Start',
							value: dateFormat(format, point.start)
						}, {
							visible: !options.milestone,
							title: 'End',
							value: dateFormat(format, point.end)
						}, {
							title: 'Completed',
							value: status
						}, {
							title: 'Owner',
							value: options.owner || 'unassigned'
						}];
						return reduce(lines, function (str, line) {
							var s = '',
								style = (
									defined(line.style) ? line.style : 'font-size: 0.8em;'
								);
							if (line.visible !== false) {
								s = (
									'<span style="' + style + '">' +
									(defined(line.title) ? line.title + ': ' : '') +
									(defined(line.value) ? line.value : '') +
									'</span><br/>'
								);
							}
							return str + s;
						}, '');
					}
				},
				xAxis: {
					currentDateIndicator: true,
					min: today - 3 * day,
					max: today + 22 * day
				}
			});
		}
	}
}
</script>

<style scoped lang="scss">

</style>
