<template>
	<div id="app">
		<SensorProject />
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
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
