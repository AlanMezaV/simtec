<template>
	<div class="contenedor-principal">
		<div class="AlumnosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Alumnos</h2>
				<button @click.prevent="nuevoAlumno" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Alumno
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado">
						<div>Numero de control</div>
						<div>Nombre</div>
						<div>Carrera</div>
						<div>Estatus</div>
						<div></div>
					</div>
					<div class="contenedor-datos">
						
						<div v-for="alumnos in lista_alumnos" :key="alumnos.ncontrol" class="datos">
							<span class="espacio">{{ alumnos.ncontrol }}</span>
							<span class="espacio">{{ alumnos.nombre }}</span>
							<span class="espacio">{{ alumnos.carrera }}</span>
							<span class="espacio estatus">{{ getEstatus(alumnos.estatus) }}</span>
							<span class="espacio">
								<button @click="mostrarOpciones(alumnos)" class="boton-acciones">···</button>
								<div v-if="alumnos.mostrarOpciones" class="menu-desplegable">
									<div>
										<img src="../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarAlumno(alumnos)">Editar</button>
									</div>
									<div>
										<img src="../../../public/images/basura.svg" alt="" />
										<button @click="eliminarAlumno(alumnos)">Eliminar</button>
									</div>
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
import axios from "axios";
import {URL_DATOS} from "@/utils/constants.js";
import {obtenerDatos} from "@/utils/peticiones";

export default {
	name: "AlumnosLista",
	components: {},
	data: function () {
		return {
			lista_alumnos: [],
		};
	},
	async created() {
		this.lista_alumnos = await obtenerDatos("alumnos");
	},
	methods: {
		getEstatus(estatus) {
			if (estatus === "V") {
				estatus = "Vigente";
			} else if (estatus === "B") {
				estatus = "Baja";
			} else {
				estatus = "Desconocido";
			}
			return estatus;
		},
		nuevoAlumno: function () {
			this.lista_alumnos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-alumno", params: {}});
		},
		mostrarOpciones(alumnos) {
			this.lista_alumnos.forEach((m) => {
				if (m !== alumnos) {
					m.mostrarOpciones = false;
				}
			});
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
		},
		editarAlumno: function (alumnos) {
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
			this.$router.push({name: "editar-alumno", params: {ncontrol: alumnos.ncontrol}});
		},
		eliminarAlumno: async function (alumnos) {
			alumnos.mostrarOpciones = !alumnos.mostrarOpciones;
			const res = await axios.delete(URL_DATOS + "/alumnos/" + alumnos.ncontrol);
			console.log(res);
			this.lista_alumnos = await obtenerDatos("alumnos");
		},
	},
};
</script>

<style global src="../../styles/variables.css"></style>
<style scoped src="../../styles/vistas.css"></style>
