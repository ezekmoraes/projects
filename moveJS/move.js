/**
 * API moveJS
 * Versão: 1.0.0.0
 * Autor: EzekKkiel
 * Facebook: fb/ezequiel.moraesmello
 * Skype: ezekkkiel-
 * Inbox: ezek8080@gmail.com
 * Outlook: ezekkkiel@outlook.com
 * LinkedIn: https://www.linkedin.com/pub/ezequiel-moraes-mello/aa/298/164
 * Data: 12/04/2015
 */

var d = document;
var Draggable = { 
	drag: true
};
/**
 * Closure de propriedades padrão
 *
 */
var Prop = function() {	
	var Default = {
		// Escolha se ao arrastar um item, ele vai ficar sobreposto (true),
		// ou em sua posição de camada original (false)
		selectedLayerTop: Draggable.drag,
		// Limita camadas com um número máximo da camanda da frente de todas as outras.
		levelMaxLayers: 9999999999,
		typeOfSize: "px"
	}; 		
	return function Properties() {
		return Default;
	}
}	
var Move = function(currentObject) {
	// modo restrito
	"use strict"; 
	
	// construtor de propriedades padrao
	var DefaultProperties = new Prop();
	// objeto do closure de propriedades
	var Properties = DefaultProperties();
	// propriedade de ordem da camada do objeto atual
	var currentLayer = Properties.selectedLayerTop;	
	// verifica se está habilitada camada principal ser a atual seleciona
	var LAYER_TOP_CURRENT_OBJ = currentLayer === true;
	// configura sistema de camadas
	// quando um objeto estiver ativo, este ficar na frente enquanto
	// ativo, caso for solto, volta para camada original	
	var maxZIndex = Properties.levelMaxLayers, 
	// armazena numero da camada original do obj
	_zIndex;
	// retorna objeto que foi setado pelo seletor css
	var obj = function(selector) {
		return d.querySelector(selector);
	};
	// adiciona evento a objetos
	var even = function(elem, fx, evt) {
		return (elem.addEventListener)? 
			elem.addEventListener(evt, fx, true): 
			elem.attachEvent("on" + evt, fx);
	};	
	// pega atributos do HTML
	var attr = function(obj, val) {
		return obj.getAttribute(val);
	}
	// objeto que está em uso
	var currObj = obj(currentObject); 
	// variavels para armazenar posicao do mouse em X e Y
	var posPrevX, posPrevY;
	var size = function(obj, opt) {
		if (opt == "w") return obj.offsetWidth;
		return obj.offsetHeight;
	};	
	// pega a metade do tamanho do objeto
	var wCurrObj = parseInt(size(currObj, "w")) / 2,
		hCurrObj = parseInt(size(currObj, "h")) / 2,
	// armazena o estado do objto que está sendo movido
	eventMove = false; 
	// seta cursor
	var cursor = function(obj, state) {
		obj.style.cursor = state;
	}
	/**
	 * movendo objetos 
	 * @param Object 
	 * @param Event
	 * move o objeto para a posicao do mouse
	 * com o mouse sempre no meio do objeto,
	 * por isso da posicao do objeto ser a diferença 
	 * da posicao do mouse pela metade do objeto em uso.
	 */
	var moving = function(s, e) {
		var e = e || window.event; 
		var t = Properties.typeOfSize;
		s.style.left = (e.clientX - wCurrObj) + t;
		s.style.top = (e.clientY - hCurrObj) + t;
	};
	// move se estive com se este obj for "arrastável"
	var move = function(s, e) {		
		// este evento acontece quando o mouse está se movimentando
		even(s, function(e) {
			if (eventMove ==  true) moving(s, e);
		}, "mousemove");		
	};
	var dragging = function(s, e) {
		// torna este obj arrastável
		eventMove = true;		
		// guarda posicao de camada atual do obj
		if (LAYER_TOP_CURRENT_OBJ) {
			_zIndex = attr(s, "layer");
			// Debug da posicao
			// console.log(_zIndex);

			// seta a camada deste obj como a max permitida
			s.style.zIndex = maxZIndex;	
		}
		// adiciona cursos personalizado
		cursor(s, "move");
		// evento de movimento segundo o mouse durante o segurar do clique disparado
		move(s, e);
	};
	// deixa um objeto "arrastável" quando o evento de segurar o mouse é disparado
	even(currObj, function(e) {
		dragging(this, e);
	}, "mousedown");
	/**
	 * continuar o evento quando o mouse estiver fora do obj
	 * se o evento ainda estiver ativo
	 * isso é necessário para quando o objeto for arrastado
	 * para determinada região, e o mouse sair fora do objeto, ou seja,
	 * o mouse é mais rapido que o objeto para sair do lugar,
	 * ai o mouse sai de cima do objeto e o evento é cancelado.
	 * @param Object
	 * @param Event
	 */
	var safeDrag = function(s, e) {
		// testa se o obj é arrastável, se sim, move-o
		if (window.eventMode == true) move(this, e); 
	}
	// quando o mouse sair de cima do obj
	even(currObj, function(e) { 
		safeDrag(this, e);
	}, "leave");
	even(currObj, function(e) { 
		safeDrag(this, e);
	}, "mouseout");
	// quando mouse fica em cima do obj
	even(currObj, function(e) { 
		safeDrag(this, e);
	}, "enter");
	even(currObj, function(e) { 
		safeDrag(this, e);
	}, "mouseover");
	// quando o click do mouse é solto, para a acao de mover
	even(window, function(e) { 
		// obj arrastável desabiitado
		eventMove = false; 
		// cursor do mouse volta ao padrão
		cursor(currObj, "default");
		// devolve posicao da camada original do obj
		if (LAYER_TOP_CURRENT_OBJ) currObj.style.zIndex = _zIndex;
		// Debug da posicao
		// console.log(currObj.style.zIndex);
	}, "mouseup");
}