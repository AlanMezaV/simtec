<template>
	<div class="overlay">
		<div class="error">
			<div>
				Confirmar
				<button @click="cerrarConfirma">✖</button>
			</div>
			<div>{{ mensaje }}</div>
			<button @click="confirmado">Si</button>
			<button @click="cerrarConfirma">No</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		mensaje: {
			type: String,
			required: true,
		},
	},
	methods: {
		confirmado() {
			this.$emit("si");
		},
		cerrarConfirma() {
			this.$emit("cerrar");
		},
	},
};
</script>

<style>
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.15); /* Fondo oscuro semitransparente */
}

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
}
</style>
