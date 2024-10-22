<script setup>
import { ref } from 'vue'
import { SaveInLocalStorage } from "../class.js";

let index = ref(0)
let idtab = ref(0)
let DayEvent = ref('')
let props = defineProps({
  Day: Array,
  newevent: String,
})
const NewSave = ref(new SaveInLocalStorage())

let table =ref(props.Day)
let load = ref(false)
let indexEvent = ref(0)

if (NewSave.value.GetNewTodo('tab')) {
        table.value = NewSave.value.GetNewTodo('tab')
    } else {
        table.value = [
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

let emit = defineEmits(['indexDay', 'LoadModif', 'modifier', 'loadModalModif'])

function SendIndex() {
  emit('indexDay', index.value)
  console.log(index.value)
}
function deleteEvent() {
    props.Day = NewSave.value.GetNewTodo('tab')
  props.Day[idtab.value].dayevent = props.Day[idtab.value].dayevent.filter(
    del => del != DayEvent.value,
  )
  NewSave.value.AddNewTodo(props.Day)
  loadModalDelete.value = false;
  console.log(DayEvent.value)
  console.log(props.Day[idtab.value].dayevent)
}

function ModifEvent() {
    props.Day = NewSave.value.GetNewTodo('tab')
    props.Day[idtab.value].dayevent[indexEvent.value] = props.newevent
    NewSave.value.AddNewTodo(props.Day)
    console.log(props.newevent)
}

let loadModalModif = ref(false)
function ModifLoad() {
  load.value = !load.value
  emit('LoadModif', load.value)
  emit('modifier', ModifEvent)
  loadModalModif.value = true
  emit('loadModalModif', loadModalModif.value)

}

let Noload = ref(false)
let loadModalDelete = ref(false)

function nodelete(){
    Noload.value = true
}


function deleteMod() {
    loadModalDelete.value = true
    Noload.value = false
}
</script>

<template>
  <h1>Jour de la Semaine</h1>
  <div class="DayList">
    <div>
      <div v-for="(day, id) in Day" :key="day">
        <ul>
          <li
            @click="
              () => {
                index = day.dayname
                SendIndex()
              }
            "
          >
            <span>{{ day.dayname }}</span>
          </li>
          <div v v-for="(event, idEvent) in day.dayevent" :key="event">
            <p>
              {{ event }}
              <button
                @click="
                  () => {
                    idtab = id
                    DayEvent = event
                    deleteMod()
                  }
                "
                id="btnDelete"
              >
                delete
              </button>
              <button
                @click="
                  () => {
                    index = day.dayname
                    SendIndex()
                    idtab = id
                    indexEvent = idEvent
                    ModifLoad()
                  }
                "
                id="btnDelete"
              >
                modifier
              </button>
            </p>
          </div>
        </ul>
      </div>
     
    </div>
  </div>
  <div v-if="loadModalDelete" class="" :class="`${Noload?'btn':'modaldelete'}`">
            <div class="Divdelete">
                <p>voulez vous vraiment suprimer cet évènement ?</p>
                <button class="yes" @click="deleteEvent()">Oui</button>
                <button class="no"  @click="nodelete()">Non</button>
            </div>
        </div>
  
</template>

<style scoped></style>
