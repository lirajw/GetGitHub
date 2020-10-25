var searchUser = function(){

    var user = document.querySelector('#inputSearch').value;
    var containerElement = document.querySelector('#repos');
    var pElement = document.createElement('p');   
    var ulElement = document.createElement('ul'); 

    pElement.setAttribute("class", "aguarde");
    pElement.appendChild(document.createTextNode("Loading..."));

    containerElement.innerHTML = '';
    containerElement.appendChild(pElement);

    if(user == ''){
        user = 'vazio';
    }


    axios.get('https://api.github.com/users/'+user+'/repos')
    .then(function(response){

        containerElement.innerHTML = '';                
            
        ulElement.innerHTML = '';

        for(repo of response.data){       

            var liElement = document.createElement('li');
            var aElement = document.createElement('a');

            aElement.appendChild(document.createTextNode(repo.name));
            aElement.setAttribute("href", repo.clone_url);
            aElement.setAttribute("target", "_blank");

            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
        }

        containerElement.appendChild(ulElement);                
    })
    .catch(function(error){        

        console.log(error);

        if(error.response.status === 404){        

            pElement.innerHTML = ''; 
            pElement.removeAttribute("class","notFound");                   
            pElement.appendChild(document.createTextNode("User not found"));
            containerElement.appendChild(pElement);

        } else {

            containerElement.innerHTML = '';
            pElement.innerHTML = '';
            //pElement.removeAttribute("class");
            pElement.removeAttribute("class","erro");
            pElement.appendChild(document.createTextNode("Erro desconhecido! Verifique o log de eventos."));
            containerElement.appendChild(pElement);

            console.log(error);
        }
    })
}
