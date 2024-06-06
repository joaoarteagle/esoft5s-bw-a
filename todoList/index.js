let listaSalva = localStorage.getItem("@listagem_task");
let tarefas = listaSalva!==null && JSON.parse(listaSalva) || []; 
const main = document.querySelector("#main");
let editId = null;

list();

function saveTask(e){
    e.preventDefault();


    const form = e.target;

    const formData = new FormData(form);
  
    if(formData.get('task') === " " || formData.get('description') === " "){
     alert("Valores vazios");
      return false;
    }else{
  
        const task ={
            name: formData.get('task'),
            description: formData.get('description')
        }
   
      tarefas.push(task);
  
     saveData();
     location.reload();
    }
  
  }


  function updateVisitData() {
    let visitData = JSON.parse(localStorage.getItem('visitData')) || { count: 0, lastVisit: null };
    visitData.count++;
    visitData.lastVisit = new Date();

    localStorage.setItem('visitData', JSON.stringify(visitData));
    return visitData;
  }

  // Função para formatar a data
  function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Função para exibir os dados de visita no footer
  function displayVisitData() {
    let visitData = updateVisitData();
    let formattedDate = formatDate(new Date(visitData.lastVisit));
    let visitsText = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${formattedDate}.`;

    document.querySelector('#visits').textContent = visitsText;
  }

  // Chamando a função para exibir os dados ao carregar a página
  displayVisitData();

  function saveData(){
    localStorage.setItem("@listagem_task", JSON.stringify(tarefas));
  }
  
  function list(){
   //main.innerHTML = "";
  
    tarefas.forEach(item=>{
       
    const field = document.createElement("fieldset");

      const h2 = document.createElement("h2");//cria um h2 no hmtl
      h2.innerText = item.name;

      const p = document.createElement("p");
      p.innerText = item.description;
      p.setAttribute("style", "margin-top:20px;")
  
      const edit = document.createElement("button");
      edit.append("✏️");
      edit.setAttribute("class", "edit_button");
      edit.setAttribute("title", "Editar Tarefa");
      edit.setAttribute("onclick", `openEditDialog(${tarefas.indexOf(item)})`);


      const delet = document.createElement("button");
      delet.append("❌");
      delet.setAttribute("title", "Deletar Tarefa");
      delet.setAttribute("class", "delete_button");
      delet.setAttribute("onclick",`deletarTarefa(${tarefas.indexOf(item)})` );

      field.appendChild(delet)
      field.appendChild(edit)
      field.appendChild(h2);
      field.appendChild(p);


      main.appendChild(field)
    })
  }



  function openEditDialog(taskId) {
    console.log(taskId)
    editId = taskId;
  
   // const selectedTaskId = tarefas.findIndex((task) => task.id === taskId)
    const task = tarefas[taskId]
  
    const dialog = document.querySelector('dialog')
  
    const editTitle = document.querySelector('#editTaskForm #title')
    const editDescription = document.querySelector('#editTaskForm #description')
  console.log(task)
    editTitle.value = task.name
    editDescription.value = task.description
  
    dialog.showModal()

  }
  
  function closeDialog() {
    const dialog = document.querySelector('dialog')
    dialog.close()
  }


 function deletarTarefa(pos){

  tarefas.splice(pos, 1);
  saveData();  
  location.reload();
 }

 function editTask(event){
  event.preventDefault();

  const editTitle = document.querySelector('#editTaskForm #title')
  const editDescription = document.querySelector('#editTaskForm #description')


 const taskEdit ={
  name : editTitle.value,
  description : editDescription.value
 } 


 
 tarefas[editId] = taskEdit;

 saveData();
 closeDialog();
 }