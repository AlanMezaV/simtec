<template>
	<div class="contenedor-principal">
		<div class="MaestrosLista contenedor-lista">
			<div class="contenedor-encabezado">
				<h2>Maestros</h2>
				<button @click.prevent="nuevoMaestro" class="boton-agregar">
					<img src="../../../../public/images/boton-mas.svg" alt="" />
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
					<div class="contenedor-datos">
						<div v-for="maestros in lista_maestros" :key="maestros.clavemaestro" class="datos">
							<span class="centrar">{{ maestros.clavemaestro }}</span>
							<span>{{ maestros.nombre }}</span>
							<span class="centrar">{{ maestros.departamento }}</span>
							<span class="estatus" :class="maestros.estatus === 'V' ? ' activo' : 'baja'">{{
								getEstatus(maestros.estatus)
							}}</span>
							<span>
								<button @click="mostrarOpciones(maestros)" class="boton-acciones">···</button>
								<div v-if="maestros.mostrarOpciones" class="menu-desplegable">
									<div>
										<img src="../../../../public/images/lapiz.svg" alt="" />
										<button @click.prevent="editarMaestro(maestros)">Editar</button>
									</div>
									<div>
										<img src="../../../../public/images/basura.svg" alt="" />
										<button @click="eliminar(maestros)">Eliminar</button>
									</div>
								</div>
							</span>
							<div v-if="mostrarConfirma && maestros.clavemaestro === clavemaestroSeleccionado">
								<ConfirmaEliminar
									:clave="clavemaestroSeleccionado"
									:mensaje="'Estas seguro que quieres eliminar el maestro: ' + maestros.nombre"
									@si="eliminarMaestro(clavemaestroSeleccionado)"
									@cerrar="cerrarConfirma"
								></ConfirmaEliminar>
							</div>
							<div v-if="mostrarError">
								<Error
									error="No se puede eliminar este maestro ya que tiene grupos asignados."
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

<script src="./MaestrosLista"></script>

<style scoped src="../../../styles/vistas.css"></style>
