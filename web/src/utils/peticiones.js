import axios from "axios";
import {URL_DATOS} from "./constants";

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

export async function traeDatosGrupos(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/grupos/${entidad}/${primaryKey}`);
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
		console.error(`Error al aliminar ${entidad}`, error);
		throw error;
	}
}
