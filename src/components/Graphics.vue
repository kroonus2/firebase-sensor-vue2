<template>
	<LineChartGenerator
		:chart-options="chartOptions"
		:chart-data="chartData"
		:chart-id="chartId"
		:dataset-id-key="datasetIdKey"
		:plugins="plugins"
		:css-classes="cssClasses"
		:styles="styles"
		:width="width"
		:height="height"
	/>
</template>

<script>
import { Line as LineChartGenerator } from 'vue-chartjs/legacy';

import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement);

export default {
	name: 'LineChart',
	components: {
		LineChartGenerator,
	},
	props: {
		labelGraphics: {
			type: String,
			default: undefined,
		},
		chartLabels: {
			type: Array,
			default: () => ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
		},
		chartValues: {
			type: Array,
			default: () => ['22.1', '22.1', '28.1', '22.1', '40.1', '20.1', '18.1'],
		},
		chartId: {
			type: String,
			default: 'line-chart',
		},
		datasetIdKey: {
			type: String,
			default: 'label',
		},
		width: {
			type: Number,
			default: 400,
		},
		height: {
			type: Number,
			default: 400,
		},
		cssClasses: {
			default: '',
			type: String,
		},
		styles: {
			type: Object,
			default: () => {},
		},
		plugins: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			chartData: {
				labels: this.chartLabels,
				datasets: [
					{
						label: this.labelGraphics,
						backgroundColor: '#f87979',
						data: this.chartValues,
					},
				],
			},
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
};
</script>
