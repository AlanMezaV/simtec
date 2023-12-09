import axios from "axios";
const URL_DATOS = "http://localhost:3000/api";

export async function obtenerDatos(entidad) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}`);
		return response.data.map((dato) => ({...dato, mostrarOpciones: false}));
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function traeDatos(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/${primaryKey}`);
		return response.data[0];
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

//obtener datos para editar
export async function obtenDatosEditar(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/${primaryKey}`);
		return response.data[0];
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function obtenClave(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/${primaryKey}`);
		return response.data.ultima_clave;
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function obtenConClave(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/${primaryKey}`);
		return response;
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

//Agregar datos
export async function agrega(entidad, datos) {
	try {
		const res = await axios.post(`${URL_DATOS}/${entidad}`, datos);
		return res;
	} catch (error) {
		console.error(`Error al agregar ${entidad}`, error);
		throw error;
	}
}

export async function traeDatosGrupos(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/grupos/${entidad}/${primaryKey}`);
		return response.data;
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function traeCreditos(primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/materias/creditos/${primaryKey}`);
		return response.data;
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function traeEstatus(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/estatus/${primaryKey}`);
		return response.data;
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export async function traeCargaAlumnos(primaryKey) {
	try {
		const response = await axios.get(`${URL_DATOS}/cargaAlumno/${primaryKey}`);
		return response;
	} catch (error) {
		console.error(`Error al obtener alumnos`, error);
		throw error;
	}
}

export async function elimina(entidad, clave) {
	try {
		const res = await axios.delete(`${URL_DATOS}/${entidad}/${clave}`);
		return res;
	} catch (error) {
		console.error(`Error al eliminar ${entidad}`, error);
		throw error;
	}
}

//Actualizar datos
export async function actualiza(entidad, clave, datos) {
	try {
		const res = await axios.put(`${URL_DATOS}/${entidad}/${clave}`, datos);
		return res;
	} catch (error) {
		console.error(`Error al actualizar ${entidad}`, error);
		throw error;
	}
}
