<template>
	<div class="contenedor-principal">
		<div class="TomaCargaLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Toma de carga</h2>
				<button @click.prevent="nuevaCarga" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Carga
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado-carga">
						<div>Clave grupo</div>
						<div>Materia</div>
						<div>Numero de control</div>
						<div>Alumno</div>
						<div>Horario lunes</div>
						<div>Horario martes</div>
						<div>Horario miércoles</div>
						<div>Horario jueves</div>
						<div>Horario viernes</div>
						<div></div>
					</div>
					<div class="contenedor-datos">
						<div v-for="cargas in lista_cargas" :key="cargas.clavegrupo + cargas.ncontrol" class="datos-carga">
						<span>
							{{ cargas.clavegrupo }}
						</span>
						<span>
							<span>{{ getNombreMateria(cargas.clavemateria) }}</span>
						</span>
						<span>{{ cargas.ncontrol }}</span>
						<span>
							<span>{{ getNombreAlumno(cargas.ncontrol) }}</span>
						</span>
						<span>
							<span>{{ getHorarioAlumno(cargas.clavegrupo, "lunes") }}</span>
						</span>
						<span>
							<span>{{ getHorarioAlumno(cargas.clavegrupo, "martes") }}</span>
						</span>
						<span>
							<span>{{ getHorarioAlumno(cargas.clavegrupo, "miercoles") }}</span>
						</span>
						<span>
							<span>{{ getHorarioAlumno(cargas.clavegrupo, "jueves") }}</span>
						</span>
						<span>
							<span>{{ getHorarioAlumno(cargas.clavegrupo, "viernes") }}</span>
						</span>
						<span>
							<button @click="mostrarOpciones(cargas)" class="boton-acciones">···</button>
							<div v-if="cargas.mostrarOpciones" class="menu-desplegable">
								<div>
									<img src="../../../public/images/lapiz.svg" alt="" />
									<button @click.prevent="editarCarga(cargas)">Editar</button>
								</div>
								<div>
									<img src="../../../public/images/basura.svg" alt="" />
									<button @click="eliminar(cargas)">Eliminar</button>
								</div>
							</div>
						</span>
						<div v-if="mostrarConfirma && cargas.clavegrupo && cargas.ncontrol === cargaSeleccionada">
							<ConfirmaEliminar
								:mensaje="
									'Estas seguro que quieres eliminar la carga con el grupo : ' +
									cargas.clavegrupo +
									' y el alumno: ' +
									cargas.ncontrol
								"
								@si="eliminarCarga(cargas)"
								@cerrar="cerrarConfirma"
							></ConfirmaEliminar>
						</div>
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
import {obtenerDatos, traeDatos, traeDatosGrupos} from "@/utils/peticiones";
import Error from "../mensajes/Error.vue";
import ConfirmaEliminar from "../mensajes/ConfirmaEliminar.vue";

export default {
	name: "TomaCargaLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_cargas: [],
			clavematerias: [],
			clavealumnos: [],
			clavegrupos: [],
			grupoActualizar: [],
			horario: [],
			mostrarError: false,
			mostrarConfirma: false,
			cargaSeleccionada: [],
		};
	},
	async created() {
		this.lista_cargas = await obtenerDatos("cargas");
		console.log("Lista cargas", this.lista_cargas);
		this.clavematerias = await obtenerDatos("materias");
		this.clavealumnos = await obtenerDatos("alumnos");
		this.clavegrupos = await obtenerDatos("grupos");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreAlumno(Ncontrol) {
			const alumno = this.clavealumnos.find((alumno) => alumno.ncontrol === Ncontrol);

			return alumno ? alumno.nombre : "Alumno no encontrado";
		},
		// getHorarioAlumno(clavegrupo) {
		// 	const grupo = this.clavegrupos.find((grupo) => grupo.clavegrupo === clavegrupo);
		// 	return grupo ? grupo.horariolunes : "Horario no encontrado";
		// },
		getHorarioAlumno(clavegrupo, dia) {
			const grupo = this.clavegrupos.find((grupo) => grupo.clavegrupo === clavegrupo);

			if (grupo) {
				switch (dia.toLowerCase()) {
					case "lunes":
						return grupo.horariolunes;
					case "martes":
						return grupo.horariomartes;
					case "miercoles":
						return grupo.horariomiercoles;
					case "jueves":
						return grupo.horariojueves;
					case "viernes":
						return grupo.horarioviernes;
					default:
						return "Día no válido";
				}
			} else {
				return "Horario no encontrado";
			}
		},

		nuevaCarga: function () {
			this.lista_cargas.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-carga", params: {}});
		},
		mostrarOpciones(cargas) {
			this.lista_cargas.forEach((m) => {
				if (m !== cargas) {
					m.mostrarOpciones = false;
				}
			});
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		editarCarga: function (cargas) {
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
			this.$router.push({
				name: "editar-carga",
				params: {clavegrupo: cargas.clavegrupo, ncontrol: cargas.ncontrol, clavemateria: cargas.clavemateria},
			});
		},
		eliminar: async function (cargas) {
			this.cargaSeleccionada = cargas.clavegrupo && cargas.ncontrol;
			this.mostrarConfirma = true;
			cargas.mostrarOpciones = !cargas.mostrarOpciones;
		},
		eliminarCarga: async function (cargas) {
			console.log(cargas);
			const res = await axios
				.delete(URL_DATOS + `/cargas/${cargas.clavegrupo}/${cargas.ncontrol}`)
				.then((response) => {
					// Maneja la respuesta exitosa si es necesario
					console.log("Carga eliminada con éxito", response.data);
				});
			this.grupoActualizar = await traeDatos("grupos", cargas.clavegrupo);
			const response = await axios.put(URL_DATOS + "/grupos/inscritos/" + cargas.clavegrupo, {
				clavegrupo: cargas.clavegrupo,
				inscritos: this.grupoActualizar.inscritos - 1,
			});
			this.lista_cargas = await obtenerDatos("cargas");
			this.mostrarConfirma = false;
		},
		cerrarError() {
			console.log("cerrar error");
			this.mostrarError = false;
		},
		cerrarConfirma() {
			this.mostrarConfirma = false;
		},
	},
};
</script>

<style scoped src="../../styles/vistas.css"></style>
<style scoped src="../../styles/vista-carga.css"></style>
<style>
.menu-desplegable {
	position: absolute;
	background-color: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 5px;

	margin-top: 2px;
}
</style>
