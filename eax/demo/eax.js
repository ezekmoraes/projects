/**
 * 
 * EAX - Easy AjaX
 * Essa API foi desenvolvida com o objetivo de facilitar
 * o uso de Ajax em suas aplicações Web. Com isso sua
 * produtividade durante um projeto aumenta e você
 * não precisa se preocupar em criar todo aquele JavaScript.
 * Com EAX você não precisa mais reinventar a roda, apenas
 * use e começe a produzir.
 * 
 * Criad por
 * Ezequiel M. Mello
 * 
 * Primeira versão. Ainda há muito o que adicionar aqui
 * 
 */
 

var EAX = EAX || (function(w) {
    
    var EAX = EAX || function() {};
    
    
    /**
     * param @q seletor css
     * retorna um elemento
     */
     
    EAX.prototype.element = function(q) {
        return w.document.querySelector(q);
    };
    
    
    /**
     * param @q seletor css
     * retorna vários elementos
     */
     
    EAX.prototype.elements = function(q) {
        return w.document.querySelectorAll(q);
    };
    
    
    /**
     * Pega objeto de requisições Ajax privadamente
     */
     
    var xmlhttp = function() {
            
            
        /**
         * se estiver rodando em algum servidor, ou protocolo
         * diferente de file:
         */
        
        if (window.location.protocol !== "file:") {
            
            // testa se existe o objeto XHR
            if (XMLHttpRequest) {
                return new XMLHttpRequest();
                
            // testa se existe o objeto ActiveXObject
            } else if (ActiveXObject) {
                
                // tentativas de ActiveXObject
                try {
                    return new ActiveXObject("MSXML.XMLHTTP");
                } catch(err) {
                    try {
                        return new window.ActiveXObject("Microsoft.XMLHTTP");
                    } catch(err) {
                        try {
                            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
                        } catch(err) {
                            console.log("Seu browser não suporta Ajax!");
                        }
                        
                    }
                }
            } // fim do teste de objetos de requisição
            
        } // fim do teste de protocolo
        
        
    }; // fim do método que pega o objeto de requisições
        
    
    // REQUEST
    EAX.prototype.http = function(request, url, params, async) {
        
        var async = async || true;
        
        // inicializa alguns espaços
        responseText = "";
        fxSuccess = function() {};
        fxError = function() {};
        fxProgress = function() {};
        fxFinish = function() {};
        dataPost = [];
        
        
        /**
         * cada função precisa retornar o objeto principal
         * para que seja possivel varias chamadas de um método em outro
         * ex.: sucess().error();
         */
         
        
        // metodo executado quando há sucesso
        function callback(data) {
            responseText = data;
            fxSuccess(responseText);
        }
        
        // sucesso
        this.success = function(fx) {
            fxSuccess = fx;
            return this;
        };
        
        // error
        this.error = function(fx) {
            if (typeof(fx) == "undefined")
                return false;
            fxError = fx;
            return this;
        };
         
        this.progress = function(fx) {
            fxProgress = fx;
            return this;
        }
        
        this.complete = function(fx) {
            fxFinish = fx;
            return this;
        }
         
        /**
         * @param xhr objeto XMLHttpRquest
         */ 
         
        // inicializa
        var __init = function(xhr) {
            
            //se o tipo dos dados for string, entende-se uma url
            if (typeof(url) == "string") {
                xhr.open(request, url, async);
                xhr.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        callback(this.responseText);
                    }
                    if (this.status == 404) {
                        fxError(404);
                    }
                };
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded"); 
                xhr.onprogress = function(){
                    fxProgress();
                };
                xhr.onloadend = function(){
                    fxFinish();
                };

                if (params != "undefined" && params != null && params != "" && params != false) {
                    for (var key in params) {
                        var value = params[key];
                        dataPost += "&" + key + "=" + encodeURIComponent(value);
                    }
                    
                    dataPost = dataPost.substring(1, dataPost.length);
                    xhr.send(dataPost);
                }
                else xhr.send(null);
                
            // senao, se for um objeto
            } else if (typeof(url) == "object") {
                callback(url);
            }
            
        }(xmlhttp()); 
        
        return this;
    } // END REQUEST
    
    var eax = new EAX();
    return eax;

});

// obj EAX
var eax = function() {
     return EAX.call(this, window);
}();

/**
 * request, url, params, async
 * params (String) request, [(Object) data | (String) url], (Object) data, (Boolean) asynchronous
 * 
 * 
 * eax.http('GET', 'dados.json').success(function() {} ).error( function() {} );
 */




