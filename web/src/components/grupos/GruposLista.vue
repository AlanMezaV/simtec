<template>
	<div class="contenedor-principal">
		<div class="GruposLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Grupos</h2>
				<button @click.prevent="nuevoGrupo" class="boton-agregar">
					<img src="../../../public/images/boton-mas.svg" alt="" />
					Agregar Grupo
				</button>
			</div>
			<div class="contenedor-tabla">
				<div class="tabla">
					<div class="tabla-encabezado-grupos">
						<div>Clave del grupo</div>
						<div>Materia</div>
						<div>Maestro</div>
						<div>Limite de alumnos</div>
						<div>Alumnos inscritos</div>
						<div>Horario lunes</div>
						<div>Horario martes</div>
						<div>Horario miercoles</div>
						<div>Horario jueves</div>
						<div>Horario viernes</div>
						<div>  </div>
					</div>
					<div v-for="grupos in lista_grupos" :key="grupos.clavegrupo" class="datos-grupos">
						<span class="espacio">{{ grupos.clavegrupo }}</span>
						<span class="espacio">{{ getNombreMateria(grupos.clavemateria) }}</span>
						<span class="espacio">{{ getNombreMaestro(grupos.clavemaestro) }}</span>
						<span class="espacio">{{ grupos.limitealumnos }}</span>
						<span class="espacio">{{ grupos.inscritos }}</span>
						<span class="espacio">{{ grupos.horariolunes }}</span>
						<span class="espacio">{{ grupos.horariomartes }}</span>
						<span class="espacio">{{ grupos.horariomiercoles }}</span>
						<span class="espacio">{{ grupos.horariojueves }}</span>
						<span class="espacio">{{ grupos.horarioviernes }}</span>
						<span class="espacio">
							<button @click="mostrarOpciones(grupos)" class="boton-acciones">···</button>
							<div v-if="grupos.mostrarOpciones" class="menu-desplegable">
								<div>
									<img src="../../../public/images/lapiz.svg" alt="" />
									<button @click.prevent="editarGrupo(grupos)">Editar</button>
								</div>
								<div>
									<img src="../../../public/images/basura.svg" alt="" />
									<button @click="eliminar(grupos)">Eliminar</button>
								</div>
							</div>
						</span>
						<div v-if="mostrarConfirma && grupos.clavegrupo === clavegrupoSeleccionada">
							<ConfirmaEliminar
								:mensaje="'Estas seguro que quieres eliminar la materia: ' + grupos.clavegrupo"
								@si="eliminarGrupo(clavegrupoSeleccionada)"
								@cerrar="cerrarConfirma"
							></ConfirmaEliminar>
						</div>
						<div v-if="mostrarError">
							<Error
								error="No se puede eliminar esta materia ya tiene asignada grupos."
								@cerrar="cerrarError"
							></Error>
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
import Error from "../mensajes/Error.vue";
import ConfirmaEliminar from "../mensajes/ConfirmaEliminar.vue";

export default {
	name: "GruposLista",
	components: {
		Error,
		ConfirmaEliminar,
	},
	data: function () {
		return {
			lista_grupos: [],
			clavematerias: [],
			clavemaestros: [],
			mostrarError: false,
			mostrarConfirma: false,
			clavegrupoSeleccionada: null,
		};
	},
	async created() {
		this.lista_grupos = await obtenerDatos("grupos");
		this.clavematerias = await obtenerDatos("materias");
		this.clavemaestros = await obtenerDatos("maestros");
	},
	methods: {
		getNombreMateria(claveMateria) {
			const materia = this.clavematerias.find((materia) => materia.clavemateria === claveMateria);
			return materia ? materia.nombre : "Materia no encontrada";
		},
		getNombreMaestro(claveMaestro) {
			const maestro = this.clavemaestros.find((maestro) => maestro.clavemaestro === claveMaestro);
			return maestro ? maestro.nombre : "Maestro no encontrado";
		},
		nuevoGrupo: function () {
			this.lista_grupos.forEach((m) => {
				m.mostrarOpciones = false;
			});
			this.$router.push({name: "agregar-grupo", params: {}});
		},
		mostrarOpciones(grupos) {
			this.lista_grupos.forEach((m) => {
				if (m !== grupos) {
					m.mostrarOpciones = false;
				}
			});
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
		},
		editarGrupo: function (grupos) {
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
			this.$router.push({name: "editar-grupo", params: {clavegrupo: grupos.clavegrupo}});
		},
		eliminar: async function (grupos) {
			this.clavegrupoSeleccionada = grupos.clavegrupo;
			this.mostrarConfirma = true;
			grupos.mostrarOpciones = !grupos.mostrarOpciones;
		},
		eliminarGrupo: async function (clavegrupo) {
			const response = await axios.get(`${URL_DATOS}/cargaGrupo/${clavegrupo}`);
			if (response.data.length > 0) {
				this.mostrarError = true;
				this.mostrarConfirma = false;
			} else {
				const res = await axios.delete(URL_DATOS + "/grupos/" + clavegrupo);
				this.lista_grupos = await obtenerDatos("grupos");
				this.mostrarConfirma = false;
			}
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
<style scoped src="../../styles/vista-grupos.css"></style>
