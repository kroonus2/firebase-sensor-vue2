<template>
	<div id="app">
		<header class="header">
			<div class="justify-content-center">
				<b class="title-page"> PROJETO "TERRA MOIADA" - 2022/01</b>
			</div>
			<b-button variant="outline-warning" @click="openInstruction">Manual de Instruções</b-button>
		</header>
		<SensorProject class="sensor-project" />
		<footer>
			<p class="text-white">Projeto desenvolvido por: Matheus, Rafael, Thiago</p>
		</footer>
		<b-modal title="Manual de instruções" size="xl" v-model="config.modal" hide-footer>
			<h5><b> Montagem do protótipo: </b></h5>
			<p>
				&nbsp;&nbsp; Nesta etapa será feita a montagem do protótipo do higrômetro juntamente com o modulo ESP-8266, que possui a função de nos conectar ao banco de dados Firebase e armazenar
				os dados obtidos do sensoriamento.
			</p>
			<p>&nbsp;&nbsp; Segue o modelo esquemático da montagem feita.</p>
			<img src="./assets/esquema.png" alt="" class="img-center" />
			<p>
				&nbsp;&nbsp; Onde é necessário ter os seguintes itens para uma sua conclusão: <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - Modulo ESP-8266 <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - Sensor de umidade do solo (Higrômetro) <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - Sensor de Temperatura DHT11 <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - ProtoBoard <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - Jumpers <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - Cabo Micro <br />
				&nbsp;&nbsp; &nbsp;&nbsp; - USB para a alimentação do circuito
			</p>
			<p>
				&nbsp;&nbsp;Após a montagem será necessário a configuração do banco de dados e da IDE Arduino, que também é usada para a programação do ESP-8266. Para isso basta seguir este tutorial
				<a href="https://www.filipeflop.com/blog/esp8266-firebase-localizacao-baseada-em-wifi/">"Configuração do banco de dados com o ESP-8266"</a>
				<br />
				<br />
				&nbsp;&nbsp;Após a configuração da IDE e do Banco de Dados, basta subir este código
				<a href="https://gist.github.com/kroonus2/814d4bae64c3718d075860867981ae69">"Hospedado no Gist do GITHUB"</a>
				ao seu Modulo ESP-8266 que irá começar subir seus dados de sensoriamento a nuvem.
			</p>
		</b-modal>
	</div>
</template>

<script>
import SensorProject from './components/SensorProject.vue';

export default {
	name: 'App',
	data() {
		return {
			config: {
				modal: false,
			},
		};
	},
	components: {
		SensorProject,
	},
	methods: {
		openInstruction() {
			this.config.modal = true;
		},
	},
	created() {
		document.title = 'Projeto "Terra Moiada" ';
	},
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap');
@import './assets/styles/custom.scss';

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;

	background-color: #a7c957;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: hidden;
	z-index: -1;
}

.header {
	background-color: #386641;
	padding: 50px;
}

.title-page {
	color: white;
	font-size: 4rem;
	text-align: left;
	font-family: 'Rajdhani', sans-serif;
}
.img-center {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}
</style>
