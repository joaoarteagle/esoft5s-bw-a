let listaSalva = localStorage.getItem("@listagem_task");
let tarefas = listaSalva!==null && JSON.parse(listaSalva) || []; 
const main = document.querySelector("#main");

function saveTask(e){
    e.preventDefault();


    const form = e.target;

    const formData = new FormData(form);


    alert("chamou")
  
    if(formData.get('task') === " " || formData.get('description') === " "){
     alert("Valores vazios");
      return false;
    }else{
  
        const task ={
            name: formData.get('task'),
            description: formData.get('description')
        }
   
      tarefas.push(task);
  
      // list();
     saveData();
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
  
      field.appendChild(h2);
      field.appendChild(p);


      main.appendChild(field)
    })
  }

  list()