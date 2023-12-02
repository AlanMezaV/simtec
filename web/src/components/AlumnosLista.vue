<template>
    <div class="AlumnosLista">
        <table>
            <thead>
                <tr>
                    <th>Numero de control</th>
                    <th>Nombre</th>
                    <th>Carrera</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="alumno in alumnos" :key="alumno.ncontrol">
                    <td class="espacio">{{ alumno.ncontrol }}</td>
                    <td class="espacio">{{ alumno.nombre }}</td>
                    <td class="espacio">{{ alumno.carrera }}</td>
                    <td class="espacio">{{ alumno.estatus }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {URL_DATOS} from '../utils/constants.js';
import axios from 'axios';

export default {
  name: 'AlumnosLista',
  components: {},
  data: function() {
    return {
        alumnos: []
    };
  },
  created() {
    this.traeAlumnos();
  },
  methods: {
    traeAlumnos: async function() {
        let a = [];
        await axios.get(URL_DATOS + "/alumnos")
        .then(function (response) {
            console.log(response);
            a = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.alumnos = a;
    }
  },
};
</script>

<style>
.espacio {
    padding-right: 25px;
    padding-left: 20px;
}
</style>