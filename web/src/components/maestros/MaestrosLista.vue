<template>
	<div class="contenedor-principal">
		<div class="MaestrosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Maestros</h2>
				<button @click.prevent="nuevoMaestro" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="">
					Agregar Maestro
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado">
						<div>Clave maestro</div>
						<div>Nombre</div>
						<div>Departamento</div>
						<div>Estatus</div>
						<div></div>
					</div>
					<div v-for="maestros in lista_maestros" :key="maestros.clavemaestro" class="datos">
						<span class="espacio">{{ maestros.clavemaestro }}</span>
						<span class="espacio">{{ maestros.nombre }}</span>
						<span class="espacio">{{ maestros.departamento }}</span>
						<span class="espacio estatus">{{ maestros.estatus }}</span>
						<span class="espacio">
							<button @click="mostrarOpciones(maestros)" class="boton-acciones">···</button>
							<div v-if="maestros.mostrarOpciones" class="menu-desplegable">
								<div>
									<button @click.prevent="editarMaestro(maestros)">Editar</button>
								</div>
								<div>
									<button @click="eliminarMaestro(maestros)">Eliminar</button>
								</div>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {URL_DATOS} from "@/utils/constants.js";
import axios from "axios";
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "MaestrosLista",
	components: {},
	data: function () {
		return {
			lista_maestros: [],
		};
	},
	async created() {
		this.lista_maestros = await obtenerDatos("maestros");
	},
	methods: {
		nuevoMaestro: function () {
			this.lista_maestros.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-maestro", params: {}});
		},
		mostrarOpciones(maestros) {
			this.lista_maestros.forEach((m) => {
				if (m !== maestros) {
					m.mostrarOpciones = false;
				}
			});
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
		},
		editarMaestro: function (maestros) {
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
			this.$router.push({name: "editar-maestro", params: {clavemaestro: maestros.clavemaestro}});
		},
		eliminarMaestro: async function (maestros) {
			maestros.mostrarOpciones = !maestros.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/maestros/" + maestros.clavemaestro);
			console.log(res);
			this.lista_maestros = await obtenerDatos("maestros");
		},
	},
};
</script>

<style scoped src="../../styles/vistas.css"></style>
