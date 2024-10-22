<script setup>
    import CalendarDayComponent from './CalendarDayComponent.vue';
    import AddTodoInput from './AddTodoInput.vue';  
    import { ref } from "vue";
    import { SaveInLocalStorage } from "../class.js";
    // import { addTodo } from "../class.js";

    let newevent = ref('')
    let dayvar = ref('lundi')
    let load= ref(false)
    // let idoftab = ref(0)
    // let eventOfDay = ref('')
    // let DayTab= ref([])
    let Modif = ref()
    let loadModalModif = ref(false)

   let Day = ref([
    {
        dayname : 'lundi',
        dayevent : []
    },
    {
        dayname : 'Mardi',
        dayevent : []
    },
    {
        dayname : 'Mercredi',
        dayevent : []
    },
    {
        dayname : 'Jeudi',
        dayevent : []
    },
    {
        dayname : 'Vendredi',
        dayevent : []
    },
    {
        dayname : 'Samedi',
        dayevent : []
    },
    {
        dayname : 'Dimanche',
        dayevent : []
    },
   
   ])

    const NewSave = ref(new SaveInLocalStorage())

    if (NewSave.value.GetNewTodo('tab')) {
        Day.value = NewSave.value.GetNewTodo('tab')
    } else {
        Day.value = [
    {
        dayname : 'lundi',
        dayevent : []
    },
    {
        dayname : 'Mardi',
        dayevent : []
    },
    {
        dayname : 'Mercredi',
        dayevent : []
    },
    {
        dayname : 'Jeudi',
        dayevent : []
    },
    {
        dayname : 'Vendredi',
        dayevent : []
    },
    {
        dayname : 'Samedi',
        dayevent : []
    },
    {
        dayname : 'Dimanche',
        dayevent : []
    },
   
   ]
    }

   function addNewEvent() {
    
    Day.value.forEach((item, index)=>{
    console.log(index);
    console.log(item);

    if (item.dayname == dayvar.value) {
        item.dayevent.push(newevent.value)
        console.log(item);
       
    }
   }) 
   
   NewSave.value.AddNewTodo(Day.value)
   }


   console.log(Day.value);
   
  

</script>


<template>

<div class="homeca">


<AddTodoInput :loadModal="loadModalModif" :modifFunction="Modif" @NewEvent="(newE) => {
newevent = newE
}" :AddNewEvent="addNewEvent" :day="dayvar" :load="load"></AddTodoInput>
<CalendarDayComponent :Day="Day" @indexDay="(id)=>{
    dayvar = id
}"
@loadModalModif="(lmm)=>{
    lmm = loadModalModif
}"
:newevent="newevent"
@LoadModif="(lo)=>{load = lo}"
@modifier="(mod)=>{Modif = mod}"
></CalendarDayComponent>

</div>

</template>


<style scoped>



</style>