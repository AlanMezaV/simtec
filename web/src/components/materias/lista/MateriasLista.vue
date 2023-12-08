<template>
	<div class="contenedor-principal">
		<div class="MateriasLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Materias</h2>
				<button @click.prevent="nuevaMateria" class="boton-agregar">
					<img src="../../../../public/images/boton-mas.svg" alt="" />
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
							<span class="centrar">{{ materias.clavemateria }}</span>
							<span>{{ materias.nombre }}</span>
							<span class="centrar">{{ materias.creditos }}</span>
							<span>
								<button @click="mostrarOpciones(materias)" class="boton-acciones">···</button>
								<div v-if="materias.mostrarOpciones" class="menu-desplegable">
									<div>
										<img src="../../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarMateria(materias)">Editar</button>
									</div>
									<div>
										<img src="../../../../public/images/basura.svg" alt="" />
										<button @click="eliminar(materias)">Eliminar</button>
									</div>
								</div>
							</span>
							<div v-if="mostrarConfirma && materias.clavemateria === clavemateriaSeleccionada">
								<ConfirmaEliminar
									:mensaje="'Estas seguro que quieres eliminar la materia: ' + materias.nombre"
									@si="eliminarMateria(clavemateriaSeleccionada)"
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
	</div>
</template>

<script src="./MateriasLista"></script>

<style scoped src="../../../styles/vistas.css"></style>
<style scoped src="../../../styles/vista-materia.css"></style>
