export class SaveInLocalStorage {
    constructor() {
        
    }

    AddNewTodo(tab){
       let NewTab = JSON.stringify(tab)
       localStorage.setItem('tab', NewTab)
    }
    GetNewTodo(tab){
      return JSON.parse(localStorage.getItem(tab))
    }

}