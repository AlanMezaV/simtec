import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Alumnos from "../views/Alumnos.vue";
import Maestros from "../views/Maestros.vue";
import Materias from "../views/Materias.vue";
import Grupos from "../views/Grupos.vue";
import TomaCarga from "../views/TomaCarga.vue";
import FormEditarMateria from "../components/materias/FormEditarMateria.vue";
import FormAggMateria from "../components/materias/FormAggMateria.vue";
import FormAggAlumno from "../components/alumnos/FormAggAlumno.vue";
import FormEditarAlumno from "../components/alumnos/FormEditarAlumno.vue";
import FormAggMaestro from "../components/maestros/FormAggMaestro.vue";
import FormEditarMaestro from "../components/maestros/FormEditarMaestro.vue";
import FormAggGrupo from "../components/grupos/FormAggGrupo.vue";
import FormEditarGrupo from "../components/grupos/FormEditarGrupo.vue";
import FormAggCarga from "../components/cargas/FormAggCarga.vue";
import FormEditarCarga from "../components/cargas/FormEditarCarga.vue";

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
	{
		path: "/maestros/agregar",
		name: "agregar-maestro",
		component: FormAggMaestro,
	},
	{
		path: "/maestros/editar",
		name: "editar-maestro",
		component: FormEditarMaestro,
		props: true,
	},
	{
		path: "/grupos/agregar",
		name: "agregar-grupo",
		component: FormAggGrupo,
	},
	{
		path: "/grupos/editar",
		name: "editar-grupo",
		component: FormEditarGrupo,
		props: true,
	},
	{
		path: "/carga/agregar",
		name: "agregar-carga",
		component: FormAggCarga,
	},
	{
		path: "/carga/editar",
		name: "editar-carga",
		component: FormEditarCarga,
		props: true,
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
