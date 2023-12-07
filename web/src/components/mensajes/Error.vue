<template>
	<div class="overlay">
		<div class="error">
			<div class="encabezado">
				Error
				<button @click="cerrarError">✖</button>
			</div>
			<div class="mensaje">{{ error }}</div>
			
		</div>
	</div>
</template>

<script>
export default {
	props: {
		error: {
			type: String,
			required: true,
		},
	},
	methods: {
		cerrarError() {
			console.log("cerrar error en componente");
			this.$emit("cerrar");
		},
	},
};
</script>

<style scoped src="../../styles/mensajes.css"></style>
<style>
/* .overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5); /* Fondo oscuro semitransparente */
/* 
.error {
	font-weight: bold;
	color: var(--dim-gray);
	display: flex;
	flex-direction: column;
	width: 500px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--white);
	padding: 20px;
	border: 1px solid var(--smoke-white);
	border-radius: 5px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
} */
</style>
