<template>
	<div class="contenedor-principal">

		<div class="MateriasLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Materias</h2>
				<button @click.prevent="nuevaMateria" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="">
					Agregar Materia
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado-materias">
						<div>Clave materia</div>
						<div>Nombre</div>
						<div>Creditos</div>
						<div></div>
					</div>
					<div class="contenedor-datos">

						<div v-for="materias in lista_materias" :key="materias.clavemateria" class="datos-materias">
							<span class="espacio">{{ materias.clavemateria }}</span>
							<span class="espacio">{{ materias.nombre }}</span>
							<span class="espacio">{{ materias.creditos }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(materias)" class="boton-acciones">···</button>
								<div v-if="materias.mostrarOpciones" class="menu-desplegable">
									<button @click.prevent="editarMateria(materias)">Editar</button>
									<br />
									<button @click="eliminarMateria(materias)">Eliminar</button>
								</div>
							</span>
						</div>
						
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
	name: "MateriasLista",
	components: {},
	data: function () {
		return {
			lista_materias: [],
		};
	},
	async created() {
		this.lista_materias = await obtenerDatos("materias");
	},
	methods: {
		nuevaMateria: function () {
			this.lista_materias.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-materia", params: {}});
		},
		mostrarOpciones(materias) {
			this.lista_materias.forEach((m) => {
				if (m !== materias) {
					m.mostrarOpciones = false;
				}
			});
			materias.mostrarOpciones = !materias.mostrarOpciones;
		},
		editarMateria: function (materias) {
			materias.mostrarOpciones = !materias.mostrarOpciones;
			this.$router.push({name: "editar-materia", params: {clavemateria: materias.clavemateria}});
		},
		eliminarMateria: async function (materias) {
			materias.mostrarOpciones = !materias.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/materias/" + materias.clavemateria);
			console.log(res);
			this.lista_materias = await obtenerDatos("materias");
		},
	},
};
</script>

<style scoped src="../../styles/vistas.css"></style>
<style scoped src="../../styles/vista-materia.css"></style>
