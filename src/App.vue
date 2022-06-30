<template>
	<div id="app">
		<header class="header">
			<b class="title-page"> PROJETO "TERRA MOIADA" - 2022/01</b>
		</header>
		<SensorProject class="sensor-project" />
		<footer>
			<p class="text-white">Projeto desenvolvido por: Matheus, Rafael, Thiago</p>
		</footer>
	</div>
</template>

<script>
import SensorProject from './components/SensorProject.vue';

export default {
	name: 'App',
	components: {
		SensorProject,
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&display=swap');

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
	padding: 60px;
	margin-bottom: 60px;
}

.title-page {
	color: white;
	font-size: 3.5rem;
	text-align: left;
	font-family: 'Rajdhani', sans-serif;
}
</style>
