var EventEmitter = require('events').EventEmitter;

function CompletionEmitter ( opts ) {
  
  this.numSteps = opts && opts.steps || 0 ;
  this.uptickAt = opts && opts.uptickAt || 1 ;
  this.numCompleted = 0 ;
  this.lastLoggedCompletion = 0 ;
  
}

CompletionEmitter.prototype.__proto__ = EventEmitter.prototype;

CompletionEmitter.prototype.setSteps = function(steps){
  
  this.numSteps = steps ;
  
};

CompletionEmitter.prototype.increment = function(){
  
  this.numCompleted += 1 ;
  
  totalCompletion = Math.floor((this.numCompleted / this.numSteps )* 100) ;
  
  totalCompletion -= (totalCompletion%this.uptickAt) ;
  
  if (totalCompletion>this.lastLoggedCompletion && totalCompletion%this.uptickAt===0 ) {
    
    this.lastLoggedCompletion = totalCompletion ;
    
    this.emit('uptick',this.lastLoggedCompletion);
    
  }
  
};


module.exports = CompletionEmitter ;