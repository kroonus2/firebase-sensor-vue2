import firebase from '../firebase';

const databaseTemperature = firebase.ref('/_DHT11/Temperatura');
const databaseSoilMoisture = firebase.ref('/_SoilMoisture/Umidade Solo Porcentagem');
const databaseSlideControl = firebase.ref('/SlideControl');
const databaseBombControl = firebase.ref('/BombControl');

export default {
	getAllTemperature() {
		return databaseTemperature;
	},
	getAllSoilMoisture() {
		return databaseSoilMoisture;
	},
	getValueSlideControl() {
		return databaseSlideControl;
	},
	getStateBombControl() {
		return databaseBombControl;
	},
};
