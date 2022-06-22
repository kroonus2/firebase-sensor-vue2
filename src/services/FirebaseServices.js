import firebase from '../firebase';

const databaseTemperature = firebase.ref('/_DHT11/Temperatura');
const databaseSoilMoisture = firebase.ref('/_SoilMoisture/Umidade Solo Porcentagem');

export default {
	getAllTemperature() {
		return databaseTemperature;
	},
	getAllSoilMoisture() {
		return databaseSoilMoisture;
	},
};
