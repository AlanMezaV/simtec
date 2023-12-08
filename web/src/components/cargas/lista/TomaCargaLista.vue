<template>
	<div class="contenedor-principal">
		<div class="TomaCargaLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Toma de carga</h2>
				<button @click.prevent="nuevaCarga" class="boton-agregar">
					<img src="../../../../public/images/boton-mas.svg" alt="" />
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
						<div
							v-for="cargas in lista_cargas"
							:key="cargas.clavegrupo + cargas.ncontrol"
							class="datos-carga"
						>
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
										<img src="../../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarCarga(cargas)">Editar</button>
									</div>
									<div>
										<img src="../../../../public/images/basura.svg" alt="" />
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

<script src="./CargaLista"></script>

<style scoped src="../../../styles/vistas.css"></style>
<style scoped src="../../../styles/vista-carga.css"></style>
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
