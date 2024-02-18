<template>
	<div class="contenedor-principal">
		<div class="AlumnosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Alumnos</h2>
				<button @click.prevent="nuevoAlumno" class="boton-agregar">
					<img src="../../../../public/images/boton-mas.svg" alt="" />
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
							<span>{{ alumnos.ncontrol }}</span>
							<span>{{ alumnos.nombre }}</span>
							<span>{{ alumnos.carrera }}</span>
							<span class="estatus" :class="alumnos.estatus === 'V' ? ' activo' : 'baja'"
								>{{ getEstatus(alumnos.estatus) }}
							</span>
							<span>
								<button @click.prevent="editarAlumno(alumnos)" class="boton">
									<img src="../../../../public/images/lapiz.svg" alt="" />
									Editar
								</button>
								<button @click="eliminar(alumnos)" class="boton">
									<img src="../../../../public/images/basura.svg" alt="" />
									Eliminar
								</button>
							</span>
							<div v-if="mostrarConfirma && alumnos.ncontrol === numeroControlSeleccionado">
								<ConfirmaEliminar
									:mensaje="'Estas seguro que quieres eliminar el alumno: ' + alumnos.nombre"
									@si="eliminarAlumno(numeroControlSeleccionado)"
									@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
									error="No se puede eliminar este maestro ya tiene asignados grupos."
									@cerrar="cerrarError"
								></Error>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script src="./AlumnosLista"></script>

<style global src="../../../styles/variables.css"></style>
<style scoped src="../../../styles/vistas.css"></style>
