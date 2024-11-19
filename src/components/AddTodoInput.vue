<script setup>
import { ref } from 'vue';

let props = defineProps({
    AddNewEvent : Function,
    day : String,
    load: Boolean,
    modifFunction : Function,
    loadModal : Boolean
})

let Noload = ref(false)
let loadModalModif = ref(false)
  
    

let NewEventDay = ref('')

let emit = defineEmits(['NewEvent'])

function MySubmitFunc() {
    emit('NewEvent', NewEventDay.value)
    props.AddNewEvent()
    NewEventDay.value = ''
}

function MyModifFunction() {
    emit('NewEvent', NewEventDay.value)
    loadModalModif.value = true
 
}

function noModif() {
    Noload.value = true
}

</script>


<template>

<div>

<form id="form" action="" @submit.prevent="MySubmitFunc">
    <input type="text" name="addTOdo" id="InputAddTodo" :placeholder="`${load? `Modifier l'evenement du ${day}` : `Entrez le nouvel évenement pour le ${day}`}`" v-model="NewEventDay">
    <button id="btnAdd" :class="`${load?'btn':''}`">Ajouter</button>
</form>
<button id="btnModif" :class="`${load?'':'btn'}`" @click="()=>{MyModifFunction()}">modifier</button>
<p></p>
<div v-if="loadModalModif" :class="`${Noload?'btn':'modalModif'}`">
            <div class="Divdelete">
                <p>voulez vous vraiment Modifier cet évènement ?</p>
                <button class="yes" @click="()=>{modifFunction(), loadModalModif = false}">Oui</button>
                <button class="no"  @click="noModif()">Non</button>
            </div>
        </div>
</div>

</template>


<style scoped>


</style>