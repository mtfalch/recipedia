//Watcher.js
//version: 1.0.1
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

        function splice(arr, a, b, c, d){
            return _splice.call(arr, a, b, c, d);
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
            }

            var $getter = function(prop, getter){
                if(!has(this, prop))
                    warn('Cannot inject to undefined property.');
                this._setter[prop] = getter;
            }

            Watcher.prototype.setter = $setter;
            Watcher.prototype.getter = $getter;

            $setter = null;
            $getter = null;

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

                var _watcher = this;
                var proto = $prop.__proto__;

                proto.push = function(w){
                    var $ = push(this, w);
                    _callSetter();
                    return $;
                }

                proto.pop = function(){
                    var $ = pop(this);
                    _callSetter();
                    return $;
                }

                proto.shift = function(){
                    var $ = shift(this);
                    _callSetter();
                    return $;
                }

                proto.unshift = function(w){
                    var $ = unshift(this, w);
                    _callSetter();
                    return $;
                }

                proto.splice = function(a, b, c, d){
                    var $ = splice(this, a, b, c, d);
                    _callSetter();
                    return $;
                }

                proto.sort = function(w){
                    sort(this, w);
                    _callSetter();
                }

                proto.reverse = function(){
                    reverse(this);
                    _callSetter();
                }
                
            }

            Watcher.prototype.inspect = $inspect;

            $inspect = null;

        }

        function Watcher(){
            if(
                !(this instanceof Watcher)
            ) warn('The constructor of Watcher must be called with the new keyword.');
            this._settings = {
                _global_setter_isolation : false,
                _global_getter_isolation : true
            }
        }

        _inject$Properties(Watcher);
        _inject$Watch(Watcher);
        _inject$Inject(Watcher);
        _inject$Inspect(Watcher);

        return Watcher;
    }
);


