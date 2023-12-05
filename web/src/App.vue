<template>
	<div id="app">
		<nav>
			<h1>Simtec</h1>

			<router-link to="/"> <img src="images/dashboard.svg" alt="" />Home</router-link> 
			<router-link to="/alumnos"><img src="images/alumnos.svg" alt="" />Alumnos</router-link> 
			<router-link to="/maestros"><img src="images/maestros.svg" alt="" />Maestros</router-link> 
			<router-link to="/materias"><img src="images/materias.svg" alt="" />Materias</router-link> 
			<router-link to="/grupos"><img src="images/alumnos.svg" alt="" />Grupos</router-link> 
			<router-link to="/carga"><img src="images/toma de carga.svg" alt="img" />Toma de carga</router-link> 
		</nav>
		<router-view />
	</div>
</template>

<style global src="./styles/variables.css"></style>
<style scoped src="./styles/app.css"></style>
