//Watcher.js
//version: 1.0.3
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

        function isDef(w){
            return w !== null && w !== undefined;
        }

        function isObject(w){
            return w !== null && typeof w === 'object';
        }

        var _keys = Object.keys;

        var _isArray = Array.isArray;
        function isArray(w){
            return _isArray(w);
        }

        var _hasOwnProperty = Object.prototype.hasOwnProperty;
        function has(w, prop){
            return _hasOwnProperty.call(w, prop);
        }

        function warn(w){
            console.warn(w);
        }

        function _inject$Init(Watcher){

            var $init = function (){
                Object.defineProperties(
                    this,
                    {
                        _val : {
                            enumerable : false,
                            writable : true,
                            value : {}
                        },
                        _setter : {
                            enumerable : false,
                            writable : true,
                            value : {}
                        },
                        _getter : {
                            enumerable : false,
                            writable : true,
                            value : {}
                        },
                        _settings : {
                            enumerable : true,
                            writable : true,
                            value : this._settings = {
                                _global_setter_isolation : false,
                                _global_getter_isolation : true
                            }
                        }
                    }
                );
                delete this._init;
            }

            Watcher.prototype._init = $init;

        }

        function _inject$Watch(Watcher){

            var $watch = function(prop, val, setter, getter){
                setter = isDef(setter) ? setter : function(){};
                getter = isDef(getter) ? getter : function(){};
                this._val[prop] = val;
                this._setter[prop] = setter.bind(this);
                this._getter[prop] = getter.bind(this);
                Object.defineProperty(
                    this, 
                    prop, 
                    {
                        enumerable : true,
                        configurable : true,
                        set : function(newVal){
                            var oldVal = this._val[prop];
                            this._val[prop] = newVal;
                            if(!this._settings._global_setter_isolation)
                                this._setter[prop](prop, newVal);
                            return oldVal;
                        },
                        get : function(){
                            if(!this._settings._global_getter_isolation)
                                this._getter[prop]();
                            return this._val[prop];
                        }
                    }
                );

                return this;
            }

            var $unwatch = function(prop){
                if(!has(this, prop))
                    warn('Cannot unwatch undefined property.');
                delete this._val[prop];
                delete this._setter[prop];
                delete this._getter[prop];
                delete this[prop];

                return this;
            }

            Watcher.prototype.watch = $watch;
            Watcher.prototype.unwatch = $unwatch;

        }

        var _push = Array.prototype.push,
            _pop = Array.prototype.pop,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            _splice = Array.prototype.splice,
            _sort = Array.prototype.sort,
            _reverse = Array.prototype.reverse;
        
        function push(arr, w){
            return _push.call(arr, w);
        }

        function pop(arr){
            return _pop.call(arr);
        }

        function shift(arr){
            return _shift.call(arr);
        }

        function unshift(arr, w){
            return _unshift.call(arr, w);
        }

        function sort(arr, w){
            return _sort.call(arr, w);
        }

        function reverse(arr){
            return _reverse.call(arr);
        }

        function _inject$Inject(Watcher){

            var $setter = function(prop, setter){
                if(!has(this, prop))
                    warn('Cannot inject to undefined property.');
                this._setter[prop] = setter;

                return this;
            }

            var $getter = function(prop, getter){
                if(!has(this, prop))
                    warn('Cannot inject to undefined property.');
                this._setter[prop] = getter;

                return this;
            }

            Watcher.prototype.setter = $setter;
            Watcher.prototype.getter = $getter;

        }

        function _inject$Inspect(Watcher){

            var $inspect = function(prop){

                if(!has(this, prop))
                    warn('Cannot inspect undefined property.');
                
                var $prop = this[prop];

                if(!isObject($prop))
                    warn('Cannot inspect non-object property.');

                if(!isArray($prop))
                    warn('Cannot inspect non-array property.');

                var _callSetter = function(prop){
                    if(!this._settings._global_setter_isolation)
                    this._setter[prop](prop, this[prop]);
                }.bind(this, prop);

                Object.defineProperties(
                    $prop, 
                    {
                        push : {
                            enumerable : false,
                            writable : true,
                            value : function(w){
                                var $ = push(this, w);
                                _callSetter();
                                return $;
                            }
                        },
                        pop : {
                            enumerable : false,
                            writable : true,
                            value : function(){
                                var $ = pop(this);
                                _callSetter();
                                return $;
                            }
                        },
                        shift : {
                            enumerable : false,
                            writable : true,
                            value : function(){
                                var $ = shift(this);
                                _callSetter();
                                return $;
                            }
                        },
                        unshift : {
                            enumerable : false,
                            writable : true,
                            value : function(w){
                                var $ = unshift(this, w);
                                _callSetter();
                                return $;
                            }            
                        },
                        splice : {
                            enumerable : false,
                            writable : true,
                            value : function(){
                                var args = [];
                                var arg; for(arg of arguments)
                                    args.push(arg);
                                var $ = _splice.apply(this, args);
                                _callSetter();
                                return $;
                            }
                        },
                        sort : {
                            enumerable : false,
                            writable : true,
                            value : function(w){
                                sort(this, w);
                                _callSetter();
                            }
                        },
                        reverse : {
                            enumerable : false,
                            writable : true,
                            value : function(){
                                reverse(this);
                                _callSetter();
                            }
                        }
                    }
                );

                return this;
                
            }

            var $extract = function(prop){

                if(!has(this, prop))
                    warn('Cannot extract undefined property.');
                
                var $prop = this[prop];

                if(!isObject($prop))
                    warn('Cannot extract non-object property.');

                return isArray($prop) ? 
                    (
                        function(){
                            var arr = [];
                            var $sub; for($sub of $prop)
                                arr.push($sub);
                            return arr;
                        }
                    )() : 
                    (
                        function(){
                            var obj = {};
                            var key; for(key of _keys.call($prop))
                                if(has($prop, key))
                                    obj[key] = $prop[key];
                            return obj;
                        }
                    )();

            }

            Watcher.prototype.inspect = $inspect;
            Watcher.prototype.extract = $extract;

        }

        function Watcher(){
            if(
                !(this instanceof Watcher)
            ) warn('The constructor of Watcher must be called with the new keyword.');
            this._init();
        }

        _inject$Init(Watcher);
        _inject$Watch(Watcher);
        _inject$Inject(Watcher);
        _inject$Inspect(Watcher);

        return Watcher;
    }
);


