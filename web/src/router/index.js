import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Alumnos from "../views/Alumnos.vue";
import Maestros from "../views/Maestros.vue";
import Materias from "../views/Materias.vue";
import Grupos from "../views/Grupos.vue";
import TomaCarga from "../views/TomaCarga.vue";
import FormEditarMateria from "../components/FormEditarMateria.vue";
import FormAggMateria from "../components/FormAggMateria.vue";
import FormAggAlumno from "../components/FormAggAlumno.vue";
import FormEditarAlumno from "../components/FormEditarAlumno.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/alumnos",
		name: "alumnos",
		component: Alumnos,
	},
	{
		path: "/maestros",
		name: "maestros",
		component: Maestros,
	},
	{
		path: "/materias",
		name: "materias",
		component: Materias,
	},
	{
		path: "/grupos",
		name: "grupos",
		component: Grupos,
	},
	{
		path: "/carga",
		name: "carga",
		component: TomaCarga,
	},
	{
		path: "/materias/editar",
		name: "editar-materia",
		component: FormEditarMateria,
		props: true,
	},
	{
		path: "/materias/agregar",
		name: "agregar-materia",
		component: FormAggMateria,
	},
	{
		path: "/alumnos/agregar",
		name: "agregar-alumno",
		component: FormAggAlumno,
	},
	{
		path: "/alumnos/editar",
		name: "editar-alumno",
		component: FormEditarAlumno,
		props: true,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
