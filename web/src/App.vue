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

<style lang="scss">
* {
	box-sizing: border-box;
	padding: 0px;
	margin: 0px;
}
:root {
	--midnight-blue: #28246f;
	--royal-blue: #5459ea;
	--white: #ffffff;
	--white-smoke: #f1f2f4;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	// text-align: center;
	font-size: 16px;
	color: #2c3e50;
	display: flex;
	
}
nav {
	background-color: var(--midnight-blue);
	width: 20%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;

	h1 {
		color: var(--white);
		margin: 50px 0;
	}
	img{
		filter: hue-rotate(120deg); 	
		filter: saturate(0);
		filter: brightness(100);
	}

	a {
		width: 90%;
		height: 50px;
		padding-left: 10px;
		gap: 15px;
		font-weight: bold;
		color: var(--white);
		display: flex;
		align-items: center;
		text-align: start;
		text-decoration: none;

		border-radius: 10px;

		&.router-link-exact-active {
			color: var(--royal-blue);
			background-color: var(--white);
			img{
				filter: none;
			}
		}
	}
}
</style>
