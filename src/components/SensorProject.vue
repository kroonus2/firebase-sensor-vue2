<template>
	<b-card-group deck style="margin: 10%">
		<br />
		<b-card title="Última Temperatura" class="shadow-lg" bg-variant="primary" text-variant="white">
			<b-card-text>
				<h4>{{ lastTemperature }} °C</h4>
			</b-card-text>
			<br />
			<b-card-footer footer-bg-variant="primary">
				<b-button variant="warning" @click="showGraphics('temperature')">Mostrar Grafico</b-button>
			</b-card-footer>
		</b-card>

		<br />
		<b-card title="Última Umidade do Solo" class="shadow-lg" bg-variant="primary" text-variant="white">
			<b-card-text>
				<h4>{{ lastSoilMoisture }}%</h4>
			</b-card-text>
			<br />
			<b-card-footer footer-bg-variant="primary">
				<b-button variant="warning" @click="showGraphics('soilMoisture')">Mostrar Grafico</b-button>
			</b-card-footer>
		</b-card>
		<b-modal id="graphics" size="lg" cancelTitle="Sair" okTitle="Baixar Relatorio" @ok="downloadReport()" :title="graphicTitle">
			<graphics :chartValues="soilMoistureValues" :labelGraphics="graphicTitle" v-if="modalType === 'soilMoisture'" />
			<graphics :chartValues="temperatureValues" :labelGraphics="graphicTitle" v-if="modalType === 'temperature'" />
		</b-modal>

		<div>
			<table v-show="false" border="1" ref="exportable_temperature_table">
				<tbody>
					<tr v-for="(item, index) in allTemperature" :key="index">
						<td>
							{{ item.date ? Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(item.date) : 'Data e Hora' }}
						</td>
						<td>
							{{ item.temperature ? item.temperature : ' Temperatura ' }}
						</td>
					</tr>
				</tbody>
			</table>
			<table v-show="false" border="1" ref="exportable_soil_moistures_table">
				<tbody>
					<tr v-for="(item, index) in allSoilMoistures" :key="index">
						<td>
							{{ item.date ? Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'medium' }).format(item.date) : 'Data e Hora' }}
						</td>
						<td>
							{{ item.soilMoisture ? item.soilMoisture : ' Umidade do solo ' }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</b-card-group>
</template>

<script>
import FirebaseServices from '../services/FirebaseServices.js';
import Graphics from './Graphics';
import * as XLSX from 'xlsx';

export default {
	components: {
		Graphics,
	},
	data() {
		return {
			temperatures: [[], [], [], [], [], [], []],
			soilMoistures: [[], [], [], [], [], [], []],
			allSoilMoistures: [{ date: false, soilMoisture: false }],
			allTemperature: [{ date: false, temperature: false }],
			modalType: false,
		};
	},
	computed: {
		lastTemperature() {
			let dateToday = new Date();
			let dayWeek = dateToday.getDay();

			if (this.temperatures[dayWeek].length === 0) {
				return 0;
			}

			return this.temperatures[dayWeek][this.temperatures[dayWeek].length - 1]['temperature'];
		},
		lastSoilMoisture() {
			let dateToday = new Date();
			let dayWeek = dateToday.getDay();

			if (this.soilMoistures[dayWeek].length === 0) {
				return 0;
			}

			return this.soilMoistures[dayWeek][this.soilMoistures[dayWeek].length - 1]['soilMoisture'];
		},
		soilMoistureValues() {
			return this.soilMoistures.map((item) => {
				let lengthDay = item.length;

				if (lengthDay === 0) {
					return 0;
				}

				let totalDay = item.reduce((previousValue, nextValue) => previousValue + parseFloat(nextValue.soilMoisture), 0);
				return (totalDay / lengthDay).toFixed(2);
			});
		},
		temperatureValues() {
			return this.temperatures.map((item) => {
				let lengthDay = item.length;

				if (lengthDay === 0) {
					return 0;
				}

				let totalDay = item.reduce((previousValue, nextValue) => previousValue + parseFloat(nextValue.temperature), 0);
				return (totalDay / lengthDay).toFixed(2);
			});
		},
		graphicTitle() {
			return this.modalType === 'temperature' ? 'Temperatura' : 'Umidade do Solo';
		},
	},
	methods: {
		downloadReport(fn, dl) {
			let referenceType = this.modalType === 'temperature' ? this.$refs.exportable_temperature_table : this.$refs.exportable_soil_moistures_table;
			let workBook = XLSX.utils.table_to_book(referenceType, { sheet: this.graphicTitle });

			return dl ? XLSX.write(workBook, { bookType: 'xlsx', bookSST: true, type: 'base64' }) : XLSX.writeFile(workBook, fn || this.graphicTitle + '.xlsx');
		},
		showGraphics(type) {
			this.modalType = type;
			this.$bvModal.show('graphics');
		},
		getAllDatabases() {
			let todayDate = new Date();
			let timestampSevenDayBefore = todayDate.setDate(todayDate.getDate() - 7) / 1000;

			FirebaseServices.getAllTemperature().on('value', (temperatures) => {
				temperatures.forEach((element) => {
					let timestampAndTemperature = element.val().split(';');
					if (timestampAndTemperature[0] >= timestampSevenDayBefore) {
						let timestampDate = new Date(timestampAndTemperature[0] * 1000);
						let dayWeek = timestampDate.getDay();
						this.temperatures[dayWeek].push({
							date: timestampDate,
							temperature: timestampAndTemperature[1],
						});

						this.allTemperature.push({
							date: timestampDate,
							temperature: timestampAndTemperature[1],
						});
					}
				});
			});

			FirebaseServices.getAllSoilMoisture().on('value', (soilMoistures) => {
				soilMoistures.forEach((element) => {
					let timestampAndSoilMoistures = element.val().split(';');
					if (timestampAndSoilMoistures[0] >= timestampSevenDayBefore) {
						let timestampDate = new Date(timestampAndSoilMoistures[0] * 1000);
						let dayWeek = timestampDate.getDay();
						this.soilMoistures[dayWeek].push({
							date: timestampDate,
							soilMoisture: timestampAndSoilMoistures[1],
						});

						this.allSoilMoistures.push({
							date: timestampDate,
							soilMoisture: timestampAndSoilMoistures[1],
						});
					}
				});
			});
		},
	},

	created() {
		this.getAllDatabases();
	},
};
</script>

<style scoped>
a {
	color: #42b983;
}
</style>
