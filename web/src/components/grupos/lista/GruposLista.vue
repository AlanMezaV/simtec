<template>
	<div class="contenedor-principal">
		<div class="GruposLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Grupos</h2>
				<button @click.prevent="nuevoGrupo" class="boton-agregar">
					<img src="../../../../public/images/boton-mas.svg" alt="" />
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
						<div></div>
					</div>
					<div class="contenedor-datos">
						<div v-for="grupos in lista_grupos" :key="grupos.clavegrupo" class="datos-grupos">
							<span>{{ grupos.clavegrupo }}</span>
							<span>{{ getNombreMateria(grupos.clavemateria) }}</span>
							<span>{{ getNombreMaestro(grupos.clavemaestro) }}</span>
							<span class="centrar">{{ grupos.limitealumnos }}</span>
							<span class="centrar">{{ grupos.inscritos }}</span>
							<span>{{ grupos.horariolunes }}</span>
							<span>{{ grupos.horariomartes }}</span>
							<span>{{ grupos.horariomiercoles }}</span>
							<span>{{ grupos.horariojueves }}</span>
							<span>{{ grupos.horarioviernes }}</span>
							<span>
								<button @click="mostrarOpciones(grupos)" class="boton-acciones">···</button>
								<div v-if="grupos.mostrarOpciones" class="menu-desplegable">
									<button @click.prevent="editarAlumno(alumnos)">
										<img src="../../../../public/images/lapiz.svg" alt="" />
										Editar
									</button>
									<button @click="eliminar(alumnos)" >
										<img src="../../../../public/images/basura.svg" alt="" />
										Eliminar
									</button>
								</div>
							</span>
							<div v-if="mostrarConfirma && grupos.clavegrupo === clavegrupoSeleccionada">
								<ConfirmaEliminar
									:mensaje="'Estas seguro que quieres eliminar el grupo: ' + grupos.clavegrupo"
									@si="eliminarGrupo(clavegrupoSeleccionada)"
									@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
									error="No se puede eliminar este grupo ya tiene asignadas cargas."
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

<script src="./GruposLista"></script>

<style scoped src="../../../styles/vistas.css"></style>
<style scoped src="../../../styles/vista-grupos.css"></style>
