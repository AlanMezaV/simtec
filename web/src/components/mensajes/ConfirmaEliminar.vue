<template>
	<div class="overlay">
		<div class="error">
			<div class="encabezado">
				Confirmar
				<button @click="cerrarConfirma">✖</button>
			</div>
			<div class="mensaje">
				{{ mensaje }}
			</div>
			<div class="contenedor-botones-eliminar">
				<button @click="confirmado" class="boton-si">
					Si
				</button>
				<button @click="cerrarConfirma" class="boton-no">
					No
				</button>
			</div>
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
<style scoped src="../../styles/mensajes.css"></style>
