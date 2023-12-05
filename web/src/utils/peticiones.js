import axios from "axios";
import {URL_DATOS} from "./constants";

async function obtenerDatos(entidad) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}`);
		return response.data.map((dato) => ({...dato, mostrarOpciones: false}));
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

async function traeDatos(entidad, primaryKey) {
	try {
		const response = await axios.get(URL_DATOS + `/${entidad}/${primaryKey}`);
		return response.data[0];
	} catch (error) {
		console.error(`Error al obtener ${entidad}:`, error);
		throw error;
	}
}

export {obtenerDatos};
export {traeDatos};
