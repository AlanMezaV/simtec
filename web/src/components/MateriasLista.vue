<template>
    <div class="MateriasLista">
        <table>
            <thead>
                <tr>
                    <th>Clave materia</th>
                    <th>Nombre</th>
                    <th>Creditos</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="materia in materias" :key="materia.clavemateria">
                    <td class="espacio">{{ materia.clavemateria }}</td>
                    <td class="espacio">{{ materia.nombre }}</td>
                    <td class="espacio">{{ materia.creditos }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {URL_DATOS} from '../utils/constants.js';
import axios from 'axios';

export default {
  name: 'MateriasLista',
  components: {},
  data: function() {
    return {
        materias: []
    };
  },
  created() {
    this.traeMaterias();
  },
  methods: {
    traeMaterias: async function() {
        let a = [];
        await axios.get(URL_DATOS + "/materias")
        .then(function (response) {
            a = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
        this.materias = a;
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