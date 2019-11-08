//Watcher.js
//version: 1.0
//Author: Alphaharrius (Harry)
//Description:  
//  A utility for creating an object with 
//  getters and setters for variables
(
    function(global, factory){
        global.Watcher = factory();
    }
)(
    this,
    function(){

        function isFunction(w){
            return w !== null && typeof w === 'function';
        }

        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        function has(w, prop){
            return _hasOwnProperty.call(w, prop);
        }

        function warn(w){
            console.warn(w);
        }

        function _inject$Properties(Watcher){
            Watcher.prototype._val = {};
            Watcher.prototype._setter = {};
            Watcher.prototype._getter = {};
        }

        function _inject$Watch(Watcher){

            var $watch = function(prop, val, setter, getter){
                if(
                    !isFunction(setter) ||
                    !isFunction(getter)
                ) warn('Getters and Setters must be type of function.');
                this._val[prop] = val;
                this._setter[prop] = setter;
                this._getter[prop] = getter;
                Object.defineProperty(
                    this, 
                    prop, 
                    {
                        enumerable : true,
                        configurable : true,
                        set : function(newVal){
                            var oldVal = this._val[prop];
                            this._val[prop] = newVal;
                            this._setter[prop]();
                            return oldVal;
                        },
                        get : function(){
                            this._getter[prop]();
                            return this._val[prop];
                        }
                    }
                );
            }

            var $unwatch = function(prop){
                if(!has(this, prop))
                    warn('Cannot unwatch undefined property.');
                delete this._val[prop];
                delete this._setter[prop];
                delete this._getter[prop];
                delete this[prop];
            }

            Watcher.prototype.watch = $watch;
            Watcher.prototype.unwatch = $unwatch;

            $watch = null;
            $unwatch = null;

        }

        function _inject$Inject(Watcher){

            var $setter = function(prop, setter){
                if(!has(this, prop))
                    warn('Cannot inject to undefined property.');
                this._setter[prop] = setter;
            }

            var $getter = function(prop, getter){
                if(!has(this, prop))
                    warn('Cannot inject to undefined property.');
                this._setter[prop] = getter;
            }

            Watcher.prototype.injectSetter = $setter;
            Watcher.prototype.injectGetter = $getter;

            $setter = null;
            $getter = null;

        }

        function Watcher(){
            if(
                !(this instanceof Watcher)
            ) warn('The constructor of Watcher must be called with the new keyword.');
        }

        _inject$Properties(Watcher);
        _inject$Watch(Watcher);
        _inject$Inject(Watcher);

        return Watcher;
    }
);