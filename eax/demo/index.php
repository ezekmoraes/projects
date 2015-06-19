<!DOCTYPE html>
<html>
    <head>
        
    </head>
    <body>
        <h2>EAX - Easy AjaX</h2>
        
        <button id="send">Envia POST</button>
        
        <br>
        
        <textarea id="area">Pega dados usando GET</textarea>
        
        
        <script type="text/javascript" src="eax.js"></script>
        <script type="text/javascript">
        
            
            // POST
            function sucesso_post(data) {
                console.log(data);
            }
            
            function error_post(status) {
                console.log("erro:" + status);
            }
            
            function progresso_post() {
                console.log("Carregando...");
            }
            
            
            // GET
            function sucesso_get(data) {
                document.getElementById('area').innerHTML = data;
            }
            
            function error_get(status) {
                console.log("erro:" + status);
            }
            
            function progresso_get() {
                console.log("Carregando...");
            }
            
            //var button = document.querySelector('.send-data');
            // =
            var button = document.getElementById('send');
            
            button.onclick = function() {                

                // ENVIA
                eax.http('POST', 'post.php', {nome: "Ezeko", idade: 17, pais: "BR"}).success(sucesso_post).error(error_post).progress(progresso_post);
                
                // RETORNA
                eax.http('GET', 'data.json').success(sucesso_get).error(error_get).progress(progresso_get);
                
            };
            
                
        </script>
    </body>
    
</html>