import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyDdGK1NrAm1Fng3nU6pRMa_47xRxHM6f6I',
	authDomain: 'soil-moisture-monitoring-7e2bb.firebaseapp.com',
	databaseURL: 'https://soil-moisture-monitoring-7e2bb-default-rtdb.firebaseio.com',
	projectId: 'soil-moisture-monitoring-7e2bb',
	storageBucket: 'soil-moisture-monitoring-7e2bb.appspot.com',
	messagingSenderId: '652449505450',
	appId: '1:652449505450:web:85001e5091d018dc5b70d3',
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();
