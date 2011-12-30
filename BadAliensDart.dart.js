//  ********** Library dart:core **************
//  ********** Natives dart:core **************
Object.prototype.$typeNameOf = function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') str = 'DOMWindow';
  return str;
}
/**
 * Generates a dynamic call stub for a function.
 * Our goal is to create a stub method like this on-the-fly:
 *   function($0, $1, capture) { return this($0, $1, true, capture); }
 *
 * This stub then replaces the dynamic one on Function, with one that is
 * specialized for that particular function, taking into account its default
 * arguments.
 */
Function.prototype.$genStub = function(argsLength, names) {
  // Fast path: if no named arguments and arg count matches
  if (this.length == argsLength && !names) {
    return this;
  }

  function $throwArgMismatch() {
    // TODO(jmesserly): better error message
    $throw(new ClosureArgumentMismatchException());
  }

  var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
  var paramsBare = this.length - paramsNamed;
  var argsNamed = names ? names.length : 0;
  var argsBare = argsLength - argsNamed;

  // Check we got the right number of arguments
  if (argsBare < paramsBare || argsLength > this.length ||
      argsNamed > paramsNamed) {
    return $throwArgMismatch;
  }

  // First, fill in all of the default values
  var p = new Array(paramsBare);
  if (paramsNamed) {
    p = p.concat(this.$optional.slice(paramsNamed));
  }
  // Fill in positional args
  var a = new Array(argsLength);
  for (var i = 0; i < argsBare; i++) {
    p[i] = a[i] = '$' + i;
  }
  // Then overwrite with supplied values for optional args
  var lastParameterIndex;
  var namesInOrder = true;
  for (var i = 0; i < argsNamed; i++) {
    var name = names[i];
    a[i + argsBare] = name;
    var j = this.$optional.indexOf(name);
    if (j < 0 || j >= paramsNamed) {
      return $throwArgMismatch;
    } else if (lastParameterIndex && lastParameterIndex > j) {
      namesInOrder = false;
    }
    p[j + paramsBare] = name;
    lastParameterIndex = j;
  }

  if (this.length == argsLength && namesInOrder) {
    // Fast path #2: named arguments, but they're in order.
    return this;
  }

  // Note: using Function instead of 'eval' to get a clean scope.
  // TODO(jmesserly): evaluate the performance of these stubs.
  var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
  return new Function('$f', 'return ' + f + '').call(null, this);
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
Object.prototype.$index = function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
}
Array.prototype.$index = function(i) { return this[i]; }
String.prototype.$index = function(i) { return this[i]; }
Object.prototype.$setindex = function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
}
Array.prototype.$setindex = function(i, value) { return this[i] = value; }
function $wrap_call$1(fn) { return fn; }
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
Object.prototype.$eq = function(other) { return this === other; }
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
// ********** Code for Object **************
Object.prototype.get$dynamic = function() {
  return this;
}
Object.prototype.noSuchMethod = function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
}
Object.prototype.add$1 = function($0) {
  return this.noSuchMethod("add", [$0]);
};
Object.prototype.addEventListener$3 = function($0, $1, $2) {
  return this.noSuchMethod("addEventListener", [$0, $1, $2]);
};
Object.prototype.arc$6 = function($0, $1, $2, $3, $4, $5) {
  return this.noSuchMethod("arc", [$0, $1, $2, $3, $4, $5]);
};
Object.prototype.beginPath$0 = function() {
  return this.noSuchMethod("beginPath", []);
};
Object.prototype.clearRect$4 = function($0, $1, $2, $3) {
  return this.noSuchMethod("clearRect", [$0, $1, $2, $3]);
};
Object.prototype.closePath$0 = function() {
  return this.noSuchMethod("closePath", []);
};
Object.prototype.drawImage$3 = function($0, $1, $2) {
  return this.noSuchMethod("drawImage", [$0, $1, $2]);
};
Object.prototype.drawImage$5 = function($0, $1, $2, $3, $4) {
  return this.noSuchMethod("drawImage", [$0, $1, $2, $3, $4]);
};
Object.prototype.drawImage$9 = function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
  return this.noSuchMethod("drawImage", [$0, $1, $2, $3, $4, $5, $6, $7, $8]);
};
Object.prototype.explode$0 = function() {
  return this.noSuchMethod("explode", []);
};
Object.prototype.fillText$3 = function($0, $1, $2) {
  return this.noSuchMethod("fillText", [$0, $1, $2]);
};
Object.prototype.fillText$4 = function($0, $1, $2, $3) {
  return this.noSuchMethod("fillText", [$0, $1, $2, $3]);
};
Object.prototype.getContext$0 = function() {
  return this.noSuchMethod("getContext", []);
};
Object.prototype.getContext$1 = function($0) {
  return this.noSuchMethod("getContext", [$0]);
};
Object.prototype.hashCode$0 = function() {
  return this.noSuchMethod("hashCode", []);
};
Object.prototype.init$1 = function($0) {
  return this.noSuchMethod("init", [$0]);
};
Object.prototype.is$CanvasElement = function() {
  return false;
};
Object.prototype.is$ImageElement = function() {
  return false;
};
Object.prototype.postMessage$1 = function($0) {
  return this.noSuchMethod("postMessage", [$0]);
};
Object.prototype.postMessage$2 = function($0, $1) {
  return this.noSuchMethod("postMessage", [$0, $1]);
};
Object.prototype.postMessage$3 = function($0, $1, $2) {
  return this.noSuchMethod("postMessage", [$0, $1, $2]);
};
Object.prototype.querySelector$1 = function($0) {
  return this.noSuchMethod("querySelector", [$0]);
};
Object.prototype.restore$0 = function() {
  return this.noSuchMethod("restore", []);
};
Object.prototype.rotate$1 = function($0) {
  return this.noSuchMethod("rotate", [$0]);
};
Object.prototype.save$0 = function() {
  return this.noSuchMethod("save", []);
};
Object.prototype.start$0 = function() {
  return this.noSuchMethod("start", []);
};
Object.prototype.stroke$0 = function() {
  return this.noSuchMethod("stroke", []);
};
Object.prototype.toString$0 = function() {
  return this.toString();
};
Object.prototype.translate$2 = function($0, $1) {
  return this.noSuchMethod("translate", [$0, $1]);
};
Object.prototype.update$0 = function() {
  return this.noSuchMethod("update", []);
};
Object.prototype.webkitRequestAnimationFrame$2 = function($0, $1) {
  return this.noSuchMethod("webkitRequestAnimationFrame", [$0, $1]);
};
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  // Initializers done
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = 0;
   i < this._arguments.get$length(); i++) {
    if (i > 0) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  sb.add("]");
  return ("NoSuchMethodException - receiver: '" + this._receiver + "' ") + ("function name: '" + this._functionName + "' arguments: [" + sb + "]");
}
NoSuchMethodException.prototype.toString$0 = NoSuchMethodException.prototype.toString;
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {
  // Initializers done
}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
ObjectNotClosureException.prototype.toString$0 = ObjectNotClosureException.prototype.toString;
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(args) {
  this._args = args;
  // Initializers done
}
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._args);
}
IllegalArgumentException.prototype.toString$0 = IllegalArgumentException.prototype.toString;
// ********** Code for StackOverflowException **************
function StackOverflowException() {
  // Initializers done
}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
StackOverflowException.prototype.toString$0 = StackOverflowException.prototype.toString;
// ********** Code for BadNumberFormatException **************
function BadNumberFormatException() {}
BadNumberFormatException.prototype.toString = function() {
  return ("BadNumberFormatException: '" + this._s + "'");
}
BadNumberFormatException.prototype.toString$0 = BadNumberFormatException.prototype.toString;
// ********** Code for NullPointerException **************
function NullPointerException() {
  // Initializers done
}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
NullPointerException.prototype.toString$0 = NullPointerException.prototype.toString;
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
  // Initializers done
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
UnsupportedOperationException.prototype.toString$0 = UnsupportedOperationException.prototype.toString;
// ********** Code for Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this.$genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this.$genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
// ********** Code for Math **************
Math.min = function(a, b) {
  if (a == b) return a;
    if (a < b) {
      if (isNaN(b)) return b;
      else return a;
    }
    if (isNaN(a)) return a;
    else return b;
}
Math.max = function(a, b) {
  return (a >= b) ? a : b;
}
// ********** Code for top level **************
function dart_core_print(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else {
    write(obj);
    write('\n');
  }
}
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
ListFactory.prototype.get$length = function() { return this.length; };
ListFactory.prototype.set$length = function(value) { return this.length = value; };
ListFactory.prototype.add = function(value) {
  this.push(value);
}
ListFactory.prototype.clear = function() {
  this.set$length(0);
}
ListFactory.prototype.removeRange = function(start, length) {
  this.splice(start, length);
}
ListFactory.prototype.add$1 = ListFactory.prototype.add;
ListFactory_E = ListFactory;
ListFactory_String = ListFactory;
ListFactory_V = ListFactory;
ListFactory__EventListenerWrapper = ListFactory;
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.abs = function() {
  return Math.abs(this);
}
NumImplementation.prototype.floor = function() {
  return Math.floor(this);
}
NumImplementation.prototype.hashCode = function() {
  return this & 0xFFFFFFF;
}
NumImplementation.prototype.hashCode$0 = NumImplementation.prototype.hashCode;
// ********** Code for FutureNotCompleteException **************
function FutureNotCompleteException() {
  // Initializers done
}
// ********** Code for FutureAlreadyCompleteException **************
function FutureAlreadyCompleteException() {
  // Initializers done
}
// ********** Code for FutureImpl **************
function FutureImpl() {
  this._listeners = new Array();
  this._exceptionHandlers = new Array();
  // Initializers done
  this._isComplete = false;
  this._exceptionHandled = false;
}
FutureImpl.prototype.get$value = function() {
  if (!this.get$isComplete()) {
    $throw(new FutureNotCompleteException());
  }
  if (this._exception != null) {
    $throw(this._exception);
  }
  return this._value;
}
FutureImpl.prototype.get$isComplete = function() {
  return this._isComplete;
}
FutureImpl.prototype.get$hasValue = function() {
  return this.get$isComplete() && this._exception == null;
}
FutureImpl.prototype.then = function(onComplete) {
  if (this.get$hasValue()) {
    onComplete(this.get$value());
  }
  else {
    this._listeners.add(onComplete);
  }
}
FutureImpl.prototype._complete = function() {
  this._isComplete = true;
  if (this._exception != null) {
    var $$list = this._exceptionHandlers;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var handler = $$list.$index($$i);
      if (handler.call$1(this._exception)) {
        this._exceptionHandled = true;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var listener = $$list.$index($$i);
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > 0) {
      $throw(this._exception);
    }
  }
}
FutureImpl.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl.prototype._setException = function(exception) {
  if (exception == null) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
// ********** Code for FutureImpl_T **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(FutureImpl_T, FutureImpl);
function FutureImpl_T() {}
FutureImpl_T.prototype._complete = function() {
  this._isComplete = true;
  if (this._exception != null) {
    var $$list = this._exceptionHandlers;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var handler = $$list.$index($$i);
      if (handler.call$1(this._exception)) {
        this._exceptionHandled = true;
      }
    }
  }
  if (this.get$hasValue()) {
    var $$list = this._listeners;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var listener = $$list.$index($$i);
      listener.call$1(this.get$value());
    }
  }
  else {
    if (!this._exceptionHandled && this._listeners.get$length() > 0) {
      $throw(this._exception);
    }
  }
}
FutureImpl_T.prototype._setValue = function(value) {
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._value = value;
  this._complete();
}
FutureImpl_T.prototype._setException = function(exception) {
  if (exception == null) {
    $throw(new IllegalArgumentException(null));
  }
  if (this._isComplete) {
    $throw(new FutureAlreadyCompleteException());
  }
  this._exception = exception;
  this._complete();
}
// ********** Code for CompleterImpl **************
function CompleterImpl() {
  this._futureImpl = new FutureImpl();
  // Initializers done
}
CompleterImpl.prototype.get$future = function() {
  return this._futureImpl;
}
CompleterImpl.prototype.complete = function(value) {
  this._futureImpl._setValue(value);
}
CompleterImpl.prototype.completeException = function(exception) {
  this._futureImpl._setException(exception);
}
// ********** Code for CompleterImpl_ElementRect **************
$inherits(CompleterImpl_ElementRect, CompleterImpl);
function CompleterImpl_ElementRect() {}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  // Initializers done
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = HashMapImplementation._computeLoadLimit(8/*HashMapImplementation._INITIAL_CAPACITY*/);
  this._keys = new Array(8/*HashMapImplementation._INITIAL_CAPACITY*/);
  this._values = new Array(8/*HashMapImplementation._INITIAL_CAPACITY*/);
}
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * 3), 4);
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - 1);
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - 1);
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode$0(), this._keys.get$length());
  var numberOfProbes = 1;
  var initialHash = hash;
  var insertionIndex = -1;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (existingKey == null) {
      if (insertionIndex < 0) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < 0) && (const$3/*HashMapImplementation._DELETED_KEY*/ === existingKey)) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode$0(), this._keys.get$length());
  var numberOfProbes = 1;
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (existingKey == null) return -1;
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + 1;
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * 2);
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - 1)) == 0);
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = 0;
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (key == null || key === const$3/*HashMapImplementation._DELETED_KEY*/) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = 0;
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((this._keys.$index(index) == null) || (this._keys.$index(index) === const$3/*HashMapImplementation._DELETED_KEY*/)) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < 0) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.putIfAbsent = function(key, ifAbsent) {
  var index = this._probeForLookup(key);
  if (index >= 0) return this._values.$index(index);
  var value = ifAbsent();
  this.$setindex(key, value);
  return value;
}
// ********** Code for HashMapImplementation_E$E **************
$inherits(HashMapImplementation_E$E, HashMapImplementation);
function HashMapImplementation_E$E() {}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {
  // Initializers done
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  // Initializers done
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (str == null || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length += str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = 0;
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == 0) return "";
  if (this._buffer.get$length() == 1) return this._buffer.$index(0);
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.toString$0 = StringBufferImpl.prototype.toString;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == 0) return '';
  var s = strings.$index(0);
  for (var i = 1;
   i < strings.get$length(); i++) {
    s = s + separator + strings.$index(i);
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == 0;
}
StringImplementation.prototype.contains = function(pattern, startIndex) {
  return this.indexOf(pattern, startIndex) >= 0;
}
StringImplementation.prototype.hashCode = function() {
  if (this.hash_ === undefined) {
      for (var i = 0; i < this.length; i++) {
        var ch = this.charCodeAt(i);
        this.hash_ += ch;
        this.hash_ += this.hash_ << 10;
        this.hash_ ^= this.hash_ >> 6;
      }

      this.hash_ += this.hash_ << 3;
      this.hash_ ^= this.hash_ >> 11;
      this.hash_ += this.hash_ << 15;
      this.hash_ = this.hash_ & ((1 << 29) - 1);
    }
    return this.hash_;
}
StringImplementation.prototype.hashCode$0 = StringImplementation.prototype.hashCode;
// ********** Code for DateImplementation **************
function DateImplementation() {}
DateImplementation.now$ctor = function() {
  this.timeZone = new TimeZoneImplementation.local$ctor();
  this.value = DateImplementation._now();
  // Initializers done
  this._asJs();
}
DateImplementation.now$ctor.prototype = DateImplementation.prototype;
DateImplementation.fromEpoch$ctor = function(value, timeZone) {
  this.value = value;
  this.timeZone = timeZone;
  // Initializers done
}
DateImplementation.fromEpoch$ctor.prototype = DateImplementation.prototype;
DateImplementation.prototype.get$value = function() { return this.value; };
DateImplementation.prototype.get$timeZone = function() { return this.timeZone; };
DateImplementation.prototype.$eq = function(other) {
  if (!((other instanceof DateImplementation))) return false;
  return (this.value == other.get$value()) && ($eq(this.timeZone, other.get$timeZone()));
}
DateImplementation.prototype.get$year = function() {
  return this.isUtc ? this._asJs().getUTCFullYear() :
      this._asJs().getFullYear();
}
DateImplementation.prototype.get$month = function() {
  return this.isUtc ? this._asJs().getMonth() + 1 :
        this._asJs().getMonth() + 1;
}
DateImplementation.prototype.get$day = function() {
  return this.isUtc ? this._asJs().getUTCDate() : this._asJs().getDate()
}
DateImplementation.prototype.get$hours = function() {
  return this.isUtc ? this._asJs().getUTCHours() : this._asJs().getHours()
}
DateImplementation.prototype.get$minutes = function() {
  return this.isUtc ? this._asJs().getUTCMinutes() : this._asJs().getMinutes()
}
DateImplementation.prototype.get$seconds = function() {
  return this.isUtc ? this._asJs().getUTCSeconds() : this._asJs().getSeconds()
}
DateImplementation.prototype.get$milliseconds = function() {
  return this.isUtc ? this._asJs().getUTCMilliseconds() :
      this._asJs().getMilliseconds();
}
DateImplementation.prototype.isUtc = function() {
  return this.timeZone.isUtc;
}
DateImplementation.prototype.get$isUtc = function() {
  return this.isUtc.bind(this);
}
DateImplementation.prototype.toString = function() {
  function threeDigits(n) {
    if (n >= 100) return ("" + n);
    if (n > 10) return ("0" + n);
    return ("00" + n);
  }
  function twoDigits(n) {
    if (n >= 10) return ("" + n);
    return ("0" + n);
  }
  var m = twoDigits(this.get$month());
  var d = twoDigits(this.get$day());
  var h = twoDigits(this.get$hours());
  var min = twoDigits(this.get$minutes());
  var sec = twoDigits(this.get$seconds());
  var ms = threeDigits(this.get$milliseconds());
  if (this.timeZone.isUtc) {
    return ("" + this.get$year() + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms + "Z");
  }
  else {
    return ("" + this.get$year() + "-" + m + "-" + d + " " + h + ":" + min + ":" + sec + "." + ms);
  }
}
DateImplementation.prototype.add = function(duration) {
  return new DateImplementation.fromEpoch$ctor(this.value + duration.inMilliseconds, this.timeZone);
}
DateImplementation._now = function() {
  return new Date().valueOf();
}
DateImplementation.prototype._asJs = function() {
    if (!this.date) {
      this.date = new Date(this.value);
    }
    return this.date;
}
DateImplementation.prototype.add$1 = DateImplementation.prototype.add;
DateImplementation.prototype.toString$0 = DateImplementation.prototype.toString;
// ********** Code for TimeZoneImplementation **************
function TimeZoneImplementation() {}
TimeZoneImplementation.local$ctor = function() {
  this.isUtc = false;
  // Initializers done
}
TimeZoneImplementation.local$ctor.prototype = TimeZoneImplementation.prototype;
TimeZoneImplementation.prototype.$eq = function(other) {
  if (!((other instanceof TimeZoneImplementation))) return false;
  return $eq(this.isUtc, other.get$isUtc());
}
TimeZoneImplementation.prototype.toString = function() {
  if (this.isUtc) return "TimeZone (UTC)";
  return "TimeZone (Local)";
}
TimeZoneImplementation.prototype.get$isUtc = function() { return this.isUtc; };
TimeZoneImplementation.prototype.toString$0 = TimeZoneImplementation.prototype.toString;
// ********** Code for top level **************
//  ********** Library dom **************
//  ********** Natives dom_frog.js **************
// Copyright (c) 2011, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

// TODO(jmesserly): we need to find a way to avoid conflicts with other
// generated "typeName" fields. Ideally we wouldn't be patching 'Object' here.
Object.prototype.get$typeName = Object.prototype.$typeNameOf;
// ********** Code for dom_Window **************
var dom_Window = {};
// ********** Code for dom_AbstractWorker **************
var dom_AbstractWorker = {};
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var method;
    var proto = Object.getPrototypeOf(this);
    var obj = this;
    do {
      method = methods[obj.$typeNameOf()];
      if (method) break;
      obj = Object.getPrototypeOf(obj);
    } while (obj);

    // Patch the prototype, but don't overwrite an existing stub, like
    // the one on Object.prototype.
    if (!proto.hasOwnProperty(name)) proto[name] = method || methods.Object;

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  Object.prototype[name] = $dynamicBind;
  return methods;
}
$dynamic("get$dartObjectLocalStorage").AbstractWorker = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AbstractWorker = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").AbstractWorker = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_ArrayBuffer **************
var dom_ArrayBuffer = {};
$dynamic("get$dartObjectLocalStorage").ArrayBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ArrayBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ArrayBufferView **************
var dom_ArrayBufferView = {};
$dynamic("get$dartObjectLocalStorage").ArrayBufferView = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ArrayBufferView = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Attr **************
var dom_Attr = {};
$dynamic("get$value").Attr = function() { return this.value; };
$dynamic("set$value").Attr = function(value) { return this.value = value; };
// ********** Code for dom_AudioBuffer **************
var dom_AudioBuffer = {};
$dynamic("get$dartObjectLocalStorage").AudioBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_AudioBufferSourceNode **************
var dom_AudioBufferSourceNode = {};
// ********** Code for dom_AudioChannelMerger **************
var dom_AudioChannelMerger = {};
// ********** Code for dom_AudioChannelSplitter **************
var dom_AudioChannelSplitter = {};
// ********** Code for dom_AudioContext **************
var dom_AudioContext = {};
$dynamic("get$dartObjectLocalStorage").AudioContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_AudioDestinationNode **************
var dom_AudioDestinationNode = {};
// ********** Code for dom_AudioGain **************
var dom_AudioGain = {};
// ********** Code for dom_AudioGainNode **************
var dom_AudioGainNode = {};
// ********** Code for dom_AudioListener **************
var dom_AudioListener = {};
$dynamic("get$dartObjectLocalStorage").AudioListener = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioListener = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_AudioNode **************
var dom_AudioNode = {};
$dynamic("get$dartObjectLocalStorage").AudioNode = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioNode = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_AudioPannerNode **************
var dom_AudioPannerNode = {};
// ********** Code for dom_AudioParam **************
var dom_AudioParam = {};
$dynamic("get$value").AudioParam = function() { return this.value; };
$dynamic("set$value").AudioParam = function(value) { return this.value = value; };
$dynamic("get$dartObjectLocalStorage").AudioParam = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").AudioParam = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_AudioProcessingEvent **************
var dom_AudioProcessingEvent = {};
// ********** Code for dom_AudioSourceNode **************
var dom_AudioSourceNode = {};
// ********** Code for dom_BarInfo **************
var dom_BarInfo = {};
$dynamic("get$dartObjectLocalStorage").BarInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").BarInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_BeforeLoadEvent **************
var dom_BeforeLoadEvent = {};
// ********** Code for dom_BiquadFilterNode **************
var dom_BiquadFilterNode = {};
// ********** Code for dom_Blob **************
var dom_Blob = {};
$dynamic("get$dartObjectLocalStorage").Blob = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Blob = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CDATASection **************
var dom_CDATASection = {};
// ********** Code for dom_CSSCharsetRule **************
var dom_CSSCharsetRule = {};
// ********** Code for dom_CSSFontFaceRule **************
var dom_CSSFontFaceRule = {};
// ********** Code for dom_CSSImportRule **************
var dom_CSSImportRule = {};
// ********** Code for dom_CSSMediaRule **************
var dom_CSSMediaRule = {};
// ********** Code for dom_CSSPageRule **************
var dom_CSSPageRule = {};
// ********** Code for dom_CSSPrimitiveValue **************
var dom_CSSPrimitiveValue = {};
// ********** Code for CSSRule **************
CSSRule.prototype.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
CSSRule.prototype.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CSSRuleList **************
var dom_CSSRuleList = {};
$dynamic("get$dartObjectLocalStorage").CSSRuleList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSRuleList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CSSStyleDeclaration **************
var dom_CSSStyleDeclaration = {};
$dynamic("get$dartObjectLocalStorage").CSSStyleDeclaration = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSStyleDeclaration = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CSSStyleRule **************
var dom_CSSStyleRule = {};
// ********** Code for dom_CSSStyleSheet **************
var dom_CSSStyleSheet = {};
// ********** Code for dom_CSSUnknownRule **************
var dom_CSSUnknownRule = {};
// ********** Code for dom_CSSValue **************
var dom_CSSValue = {};
$dynamic("get$dartObjectLocalStorage").CSSValue = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CSSValue = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CSSValueList **************
var dom_CSSValueList = {};
// ********** Code for dom_CanvasGradient **************
var dom_CanvasGradient = {};
$dynamic("get$dartObjectLocalStorage").CanvasGradient = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasGradient = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CanvasPattern **************
var dom_CanvasPattern = {};
$dynamic("get$dartObjectLocalStorage").CanvasPattern = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasPattern = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CanvasPixelArray **************
var dom_CanvasPixelArray = {};
$dynamic("get$dartObjectLocalStorage").CanvasPixelArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasPixelArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CanvasRenderingContext **************
var dom_CanvasRenderingContext = {};
$dynamic("get$canvas").CanvasRenderingContext = function() { return this.canvas; };
$dynamic("set$canvas").CanvasRenderingContext = function(value) { return this.canvas = value; };
$dynamic("get$dartObjectLocalStorage").CanvasRenderingContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").CanvasRenderingContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CanvasRenderingContext2D **************
var dom_CanvasRenderingContext2D = {};
$dynamic("get$fillStyle").CanvasRenderingContext2D = function() { return this.fillStyle; };
$dynamic("set$fillStyle").CanvasRenderingContext2D = function(value) { return this.fillStyle = value; };
$dynamic("get$font").CanvasRenderingContext2D = function() { return this.font; };
$dynamic("set$font").CanvasRenderingContext2D = function(value) { return this.font = value; };
$dynamic("get$strokeStyle").CanvasRenderingContext2D = function() { return this.strokeStyle; };
$dynamic("set$strokeStyle").CanvasRenderingContext2D = function(value) { return this.strokeStyle = value; };
$dynamic("get$rotate").CanvasRenderingContext2D = function() {
  return this.rotate.bind(this);
}
$dynamic("arc$6").CanvasRenderingContext2D = function($0, $1, $2, $3, $4, $5) {
  return this.arc($0, $1, $2, $3, $4, $5);
};
$dynamic("beginPath$0").CanvasRenderingContext2D = function() {
  return this.beginPath();
};
$dynamic("clearRect$4").CanvasRenderingContext2D = function($0, $1, $2, $3) {
  return this.clearRect($0, $1, $2, $3);
};
$dynamic("closePath$0").CanvasRenderingContext2D = function() {
  return this.closePath();
};
$dynamic("drawImage$3").CanvasRenderingContext2D = function($0, $1, $2) {
  return this.drawImage($0, $1, $2);
};
$dynamic("drawImage$5").CanvasRenderingContext2D = function($0, $1, $2, $3, $4) {
  return this.drawImage($0, $1, $2, $3, $4);
};
$dynamic("drawImage$9").CanvasRenderingContext2D = function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
  return this.drawImage($0, $1, $2, $3, $4, $5, $6, $7, $8);
};
$dynamic("fillText$3").CanvasRenderingContext2D = function($0, $1, $2) {
  return this.fillText($0, $1, $2);
};
$dynamic("fillText$4").CanvasRenderingContext2D = function($0, $1, $2, $3) {
  return this.fillText($0, $1, $2, $3);
};
$dynamic("restore$0").CanvasRenderingContext2D = function() {
  return this.restore();
};
$dynamic("rotate$1").CanvasRenderingContext2D = function($0) {
  return this.rotate($0);
};
$dynamic("save$0").CanvasRenderingContext2D = function() {
  return this.save();
};
$dynamic("stroke$0").CanvasRenderingContext2D = function() {
  return this.stroke();
};
$dynamic("translate$2").CanvasRenderingContext2D = function($0, $1) {
  return this.translate($0, $1);
};
// ********** Code for CharacterData **************
// ********** Code for dom_ClientRect **************
var dom_ClientRect = {};
$dynamic("get$height").ClientRect = function() { return this.height; };
$dynamic("set$height").ClientRect = function(value) { return this.height = value; };
$dynamic("get$left").ClientRect = function() { return this.left; };
$dynamic("set$left").ClientRect = function(value) { return this.left = value; };
$dynamic("get$top").ClientRect = function() { return this.top; };
$dynamic("set$top").ClientRect = function(value) { return this.top = value; };
$dynamic("get$width").ClientRect = function() { return this.width; };
$dynamic("set$width").ClientRect = function(value) { return this.width = value; };
$dynamic("get$dartObjectLocalStorage").ClientRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ClientRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ClientRectList **************
var dom_ClientRectList = {};
$dynamic("get$dartObjectLocalStorage").ClientRectList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ClientRectList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Clipboard **************
var dom_Clipboard = {};
$dynamic("get$dartObjectLocalStorage").Clipboard = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Clipboard = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CloseEvent **************
var dom_CloseEvent = {};
// ********** Code for dom_Comment **************
var dom_Comment = {};
// ********** Code for dom_CompositionEvent **************
var dom_CompositionEvent = {};
// ********** Code for Console **************
Console = (typeof console == 'undefined' ? {} : console);
Console.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
Console.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ConvolverNode **************
var dom_ConvolverNode = {};
// ********** Code for dom_Coordinates **************
var dom_Coordinates = {};
$dynamic("get$dartObjectLocalStorage").Coordinates = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Coordinates = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Counter **************
var dom_Counter = {};
$dynamic("get$dartObjectLocalStorage").Counter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Counter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Crypto **************
var dom_Crypto = {};
$dynamic("get$dartObjectLocalStorage").Crypto = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Crypto = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_CustomEvent **************
var dom_CustomEvent = {};
// ********** Code for dom_DOMApplicationCache **************
var dom_DOMApplicationCache = {};
$dynamic("get$dartObjectLocalStorage").DOMApplicationCache = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMApplicationCache = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").DOMApplicationCache = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("update$0").DOMApplicationCache = function() {
  return this.update();
};
// ********** Code for dom_DOMException **************
var dom_DOMException = {};
$dynamic("get$dartObjectLocalStorage").DOMException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").DOMException = function() {
  return this.toString();
};
// ********** Code for dom_DOMFileSystem **************
var dom_DOMFileSystem = {};
$dynamic("get$dartObjectLocalStorage").DOMFileSystem = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFileSystem = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMFileSystemSync **************
var dom_DOMFileSystemSync = {};
$dynamic("get$dartObjectLocalStorage").DOMFileSystemSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFileSystemSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMFormData **************
var dom_DOMFormData = {};
$dynamic("get$dartObjectLocalStorage").DOMFormData = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMFormData = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMImplementation **************
var dom_DOMImplementation = {};
$dynamic("get$dartObjectLocalStorage").DOMImplementation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMImplementation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMMimeType **************
var dom_DOMMimeType = {};
$dynamic("get$dartObjectLocalStorage").DOMMimeType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMMimeType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMMimeTypeArray **************
var dom_DOMMimeTypeArray = {};
$dynamic("get$dartObjectLocalStorage").DOMMimeTypeArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMMimeTypeArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMParser **************
var dom_DOMParser = {};
$dynamic("get$dartObjectLocalStorage").DOMParser = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMParser = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMPlugin **************
var dom_DOMPlugin = {};
$dynamic("get$dartObjectLocalStorage").DOMPlugin = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMPlugin = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMPluginArray **************
var dom_DOMPluginArray = {};
$dynamic("get$dartObjectLocalStorage").DOMPluginArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMPluginArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMSelection **************
var dom_DOMSelection = {};
$dynamic("get$dartObjectLocalStorage").DOMSelection = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMSelection = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").DOMSelection = function() {
  return this.toString();
};
// ********** Code for dom_DOMSettableTokenList **************
var dom_DOMSettableTokenList = {};
$dynamic("get$value").DOMSettableTokenList = function() { return this.value; };
$dynamic("set$value").DOMSettableTokenList = function(value) { return this.value = value; };
// ********** Code for dom_DOMTokenList **************
var dom_DOMTokenList = {};
$dynamic("get$dartObjectLocalStorage").DOMTokenList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMTokenList = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
$dynamic("toString$0").DOMTokenList = function() {
  return this.toString();
};
// ********** Code for dom_DOMURL **************
var dom_DOMURL = {};
$dynamic("get$dartObjectLocalStorage").DOMURL = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMURL = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DOMWindow **************
var dom_DOMWindow = {};
$dynamic("get$top").DOMWindow = function() { return this.top; };
$dynamic("set$top").DOMWindow = function(value) { return this.top = value; };
$dynamic("get$dartObjectLocalStorage").DOMWindow = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMWindow = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").DOMWindow = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("postMessage$2").DOMWindow = function($0, $1) {
  return this.postMessage($0, $1);
};
$dynamic("postMessage$3").DOMWindow = function($0, $1, $2) {
  return this.postMessage($0, $1, $2);
};
$dynamic("webkitRequestAnimationFrame$2").DOMWindow = function($0, $1) {
  return this.webkitRequestAnimationFrame($wrap_call$1(to$call$1($0)), $1);
};
// ********** Code for dom_DataTransferItem **************
var dom_DataTransferItem = {};
$dynamic("get$dartObjectLocalStorage").DataTransferItem = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DataTransferItem = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DataTransferItemList **************
var dom_DataTransferItemList = {};
$dynamic("get$dartObjectLocalStorage").DataTransferItemList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DataTransferItemList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DataView **************
var dom_DataView = {};
// ********** Code for dom_Database **************
var dom_Database = {};
$dynamic("get$dartObjectLocalStorage").Database = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Database = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DatabaseSync **************
var dom_DatabaseSync = {};
$dynamic("get$dartObjectLocalStorage").DatabaseSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DatabaseSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DedicatedWorkerContext **************
var dom_DedicatedWorkerContext = {};
$dynamic("postMessage$1").DedicatedWorkerContext = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").DedicatedWorkerContext = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for dom_DelayNode **************
var dom_DelayNode = {};
// ********** Code for dom_DeviceMotionEvent **************
var dom_DeviceMotionEvent = {};
// ********** Code for dom_DeviceOrientationEvent **************
var dom_DeviceOrientationEvent = {};
// ********** Code for dom_DirectoryEntry **************
var dom_DirectoryEntry = {};
// ********** Code for dom_DirectoryEntrySync **************
var dom_DirectoryEntrySync = {};
// ********** Code for dom_DirectoryReader **************
var dom_DirectoryReader = {};
$dynamic("get$dartObjectLocalStorage").DirectoryReader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DirectoryReader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_DirectoryReaderSync **************
var dom_DirectoryReaderSync = {};
$dynamic("get$dartObjectLocalStorage").DirectoryReaderSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DirectoryReaderSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Document **************
Document.prototype.get$documentElement = function() { return this.documentElement; };
Document.prototype.set$documentElement = function(value) { return this.documentElement = value; };
Document.prototype.querySelector$1 = function($0) {
  return this.querySelector($0);
};
// ********** Code for dom_DocumentFragment **************
var dom_DocumentFragment = {};
$dynamic("querySelector$1").DocumentFragment = function($0) {
  return this.querySelector($0);
};
// ********** Code for dom_DocumentType **************
var dom_DocumentType = {};
// ********** Code for dom_DynamicsCompressorNode **************
var dom_DynamicsCompressorNode = {};
// ********** Code for Element **************
Element.prototype.querySelector$1 = function($0) {
  return this.querySelector($0);
};
// ********** Code for dom_ElementTimeControl **************
var dom_ElementTimeControl = {};
$dynamic("get$dartObjectLocalStorage").ElementTimeControl = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ElementTimeControl = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ElementTraversal **************
var dom_ElementTraversal = {};
$dynamic("get$dartObjectLocalStorage").ElementTraversal = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ElementTraversal = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Entity **************
var dom_Entity = {};
// ********** Code for dom_EntityReference **************
var dom_EntityReference = {};
// ********** Code for dom_Entry **************
var dom_Entry = {};
$dynamic("get$dartObjectLocalStorage").Entry = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Entry = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_EntryArray **************
var dom_EntryArray = {};
$dynamic("get$dartObjectLocalStorage").EntryArray = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntryArray = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_EntryArraySync **************
var dom_EntryArraySync = {};
$dynamic("get$dartObjectLocalStorage").EntryArraySync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntryArraySync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_EntrySync **************
var dom_EntrySync = {};
$dynamic("get$dartObjectLocalStorage").EntrySync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EntrySync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ErrorEvent **************
var dom_ErrorEvent = {};
// ********** Code for Event **************
Event.prototype.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
Event.prototype.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_EventException **************
var dom_EventException = {};
$dynamic("get$dartObjectLocalStorage").EventException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").EventException = function() {
  return this.toString();
};
// ********** Code for dom_EventSource **************
var dom_EventSource = {};
$dynamic("get$dartObjectLocalStorage").EventSource = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventSource = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").EventSource = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_EventTarget **************
var dom_EventTarget = {};
$dynamic("get$dartObjectLocalStorage").EventTarget = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").EventTarget = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").EventTarget = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_File **************
var dom_File = {};
// ********** Code for dom_FileEntry **************
var dom_FileEntry = {};
// ********** Code for dom_FileEntrySync **************
var dom_FileEntrySync = {};
// ********** Code for dom_FileError **************
var dom_FileError = {};
$dynamic("get$dartObjectLocalStorage").FileError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_FileException **************
var dom_FileException = {};
$dynamic("get$dartObjectLocalStorage").FileException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").FileException = function() {
  return this.toString();
};
// ********** Code for dom_FileList **************
var dom_FileList = {};
$dynamic("get$dartObjectLocalStorage").FileList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_FileReader **************
var dom_FileReader = {};
$dynamic("get$dartObjectLocalStorage").FileReader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileReader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_FileReaderSync **************
var dom_FileReaderSync = {};
$dynamic("get$dartObjectLocalStorage").FileReaderSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileReaderSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_FileWriter **************
var dom_FileWriter = {};
$dynamic("get$dartObjectLocalStorage").FileWriter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileWriter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_FileWriterSync **************
var dom_FileWriterSync = {};
$dynamic("get$dartObjectLocalStorage").FileWriterSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").FileWriterSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Float32Array **************
var dom_Float32Array = {};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("set$length").Float32Array = function(value) { return this.length = value; };
// ********** Code for dom_Float64Array **************
var dom_Float64Array = {};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("set$length").Float64Array = function(value) { return this.length = value; };
// ********** Code for dom_Geolocation **************
var dom_Geolocation = {};
$dynamic("get$dartObjectLocalStorage").Geolocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Geolocation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Geoposition **************
var dom_Geoposition = {};
$dynamic("get$dartObjectLocalStorage").Geoposition = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Geoposition = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_HTMLAllCollection **************
var dom_HTMLAllCollection = {};
$dynamic("get$dartObjectLocalStorage").HTMLAllCollection = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").HTMLAllCollection = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_HTMLAnchorElement **************
var dom_HTMLAnchorElement = {};
$dynamic("toString$0").HTMLAnchorElement = function() {
  return this.toString();
};
// ********** Code for dom_HTMLAppletElement **************
var dom_HTMLAppletElement = {};
$dynamic("get$height").HTMLAppletElement = function() { return this.height; };
$dynamic("set$height").HTMLAppletElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLAppletElement = function() { return this.width; };
$dynamic("set$width").HTMLAppletElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLAreaElement **************
var dom_HTMLAreaElement = {};
// ********** Code for dom_HTMLAudioElement **************
var dom_HTMLAudioElement = {};
// ********** Code for dom_HTMLBRElement **************
var dom_HTMLBRElement = {};
// ********** Code for dom_HTMLBaseElement **************
var dom_HTMLBaseElement = {};
// ********** Code for dom_HTMLBaseFontElement **************
var dom_HTMLBaseFontElement = {};
// ********** Code for dom_HTMLBodyElement **************
var dom_HTMLBodyElement = {};
// ********** Code for dom_HTMLButtonElement **************
var dom_HTMLButtonElement = {};
$dynamic("get$value").HTMLButtonElement = function() { return this.value; };
$dynamic("set$value").HTMLButtonElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLCanvasElement **************
var dom_HTMLCanvasElement = {};
$dynamic("get$height").HTMLCanvasElement = function() { return this.height; };
$dynamic("set$height").HTMLCanvasElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLCanvasElement = function() { return this.width; };
$dynamic("set$width").HTMLCanvasElement = function(value) { return this.width = value; };
$dynamic("getContext$1").HTMLCanvasElement = function($0) {
  return this.getContext($0);
};
// ********** Code for HTMLCollection **************
HTMLCollection.prototype.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
HTMLCollection.prototype.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_HTMLDListElement **************
var dom_HTMLDListElement = {};
// ********** Code for dom_HTMLDataListElement **************
var dom_HTMLDataListElement = {};
// ********** Code for dom_HTMLDetailsElement **************
var dom_HTMLDetailsElement = {};
// ********** Code for dom_HTMLDirectoryElement **************
var dom_HTMLDirectoryElement = {};
// ********** Code for dom_HTMLDivElement **************
var dom_HTMLDivElement = {};
// ********** Code for dom_HTMLDocument **************
var dom_HTMLDocument = {};
$dynamic("get$height").HTMLDocument = function() { return this.height; };
$dynamic("set$height").HTMLDocument = function(value) { return this.height = value; };
$dynamic("get$width").HTMLDocument = function() { return this.width; };
$dynamic("set$width").HTMLDocument = function(value) { return this.width = value; };
// ********** Code for HTMLElement **************
// ********** Code for dom_HTMLEmbedElement **************
var dom_HTMLEmbedElement = {};
$dynamic("get$height").HTMLEmbedElement = function() { return this.height; };
$dynamic("set$height").HTMLEmbedElement = function(value) { return this.height = value; };
$dynamic("get$src").HTMLEmbedElement = function() { return this.src; };
$dynamic("set$src").HTMLEmbedElement = function(value) { return this.src = value; };
$dynamic("get$width").HTMLEmbedElement = function() { return this.width; };
$dynamic("set$width").HTMLEmbedElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLFieldSetElement **************
var dom_HTMLFieldSetElement = {};
// ********** Code for dom_HTMLFontElement **************
var dom_HTMLFontElement = {};
// ********** Code for dom_HTMLFormElement **************
var dom_HTMLFormElement = {};
// ********** Code for dom_HTMLFrameElement **************
var dom_HTMLFrameElement = {};
$dynamic("get$height").HTMLFrameElement = function() { return this.height; };
$dynamic("set$height").HTMLFrameElement = function(value) { return this.height = value; };
$dynamic("get$src").HTMLFrameElement = function() { return this.src; };
$dynamic("set$src").HTMLFrameElement = function(value) { return this.src = value; };
$dynamic("get$width").HTMLFrameElement = function() { return this.width; };
$dynamic("set$width").HTMLFrameElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLFrameSetElement **************
var dom_HTMLFrameSetElement = {};
// ********** Code for dom_HTMLHRElement **************
var dom_HTMLHRElement = {};
$dynamic("get$width").HTMLHRElement = function() { return this.width; };
$dynamic("set$width").HTMLHRElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLHeadElement **************
var dom_HTMLHeadElement = {};
// ********** Code for dom_HTMLHeadingElement **************
var dom_HTMLHeadingElement = {};
// ********** Code for dom_HTMLHtmlElement **************
var dom_HTMLHtmlElement = {};
// ********** Code for dom_HTMLIFrameElement **************
var dom_HTMLIFrameElement = {};
$dynamic("get$height").HTMLIFrameElement = function() { return this.height; };
$dynamic("set$height").HTMLIFrameElement = function(value) { return this.height = value; };
$dynamic("get$src").HTMLIFrameElement = function() { return this.src; };
$dynamic("set$src").HTMLIFrameElement = function(value) { return this.src = value; };
$dynamic("get$width").HTMLIFrameElement = function() { return this.width; };
$dynamic("set$width").HTMLIFrameElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLImageElement **************
var dom_HTMLImageElement = {};
$dynamic("get$height").HTMLImageElement = function() { return this.height; };
$dynamic("set$height").HTMLImageElement = function(value) { return this.height = value; };
$dynamic("get$src").HTMLImageElement = function() { return this.src; };
$dynamic("set$src").HTMLImageElement = function(value) { return this.src = value; };
$dynamic("get$width").HTMLImageElement = function() { return this.width; };
$dynamic("set$width").HTMLImageElement = function(value) { return this.width = value; };
// ********** Code for HTMLInputElement **************
HTMLInputElement.prototype.get$src = function() { return this.src; };
HTMLInputElement.prototype.set$src = function(value) { return this.src = value; };
HTMLInputElement.prototype.get$value = function() { return this.value; };
HTMLInputElement.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for dom_HTMLIsIndexElement **************
var dom_HTMLIsIndexElement = {};
// ********** Code for dom_HTMLKeygenElement **************
var dom_HTMLKeygenElement = {};
// ********** Code for dom_HTMLLIElement **************
var dom_HTMLLIElement = {};
$dynamic("get$value").HTMLLIElement = function() { return this.value; };
$dynamic("set$value").HTMLLIElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLLabelElement **************
var dom_HTMLLabelElement = {};
// ********** Code for dom_HTMLLegendElement **************
var dom_HTMLLegendElement = {};
// ********** Code for dom_HTMLLinkElement **************
var dom_HTMLLinkElement = {};
// ********** Code for dom_HTMLMapElement **************
var dom_HTMLMapElement = {};
// ********** Code for dom_HTMLMarqueeElement **************
var dom_HTMLMarqueeElement = {};
$dynamic("get$height").HTMLMarqueeElement = function() { return this.height; };
$dynamic("set$height").HTMLMarqueeElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLMarqueeElement = function() { return this.width; };
$dynamic("set$width").HTMLMarqueeElement = function(value) { return this.width = value; };
$dynamic("get$start").HTMLMarqueeElement = function() {
  return this.start.bind(this);
}
$dynamic("start$0").HTMLMarqueeElement = function() {
  return this.start();
};
// ********** Code for HTMLMediaElement **************
HTMLMediaElement.prototype.get$src = function() { return this.src; };
HTMLMediaElement.prototype.set$src = function(value) { return this.src = value; };
// ********** Code for dom_HTMLMenuElement **************
var dom_HTMLMenuElement = {};
// ********** Code for dom_HTMLMetaElement **************
var dom_HTMLMetaElement = {};
// ********** Code for dom_HTMLMeterElement **************
var dom_HTMLMeterElement = {};
$dynamic("get$value").HTMLMeterElement = function() { return this.value; };
$dynamic("set$value").HTMLMeterElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLModElement **************
var dom_HTMLModElement = {};
// ********** Code for dom_HTMLOListElement **************
var dom_HTMLOListElement = {};
$dynamic("get$start").HTMLOListElement = function() { return this.start; };
$dynamic("set$start").HTMLOListElement = function(value) { return this.start = value; };
$dynamic("start$0").HTMLOListElement = function() {
  return this.start();
};
// ********** Code for dom_HTMLObjectElement **************
var dom_HTMLObjectElement = {};
$dynamic("get$height").HTMLObjectElement = function() { return this.height; };
$dynamic("set$height").HTMLObjectElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLObjectElement = function() { return this.width; };
$dynamic("set$width").HTMLObjectElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLOptGroupElement **************
var dom_HTMLOptGroupElement = {};
// ********** Code for dom_HTMLOptionElement **************
var dom_HTMLOptionElement = {};
$dynamic("get$value").HTMLOptionElement = function() { return this.value; };
$dynamic("set$value").HTMLOptionElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLOptionsCollection **************
var dom_HTMLOptionsCollection = {};
// ********** Code for dom_HTMLOutputElement **************
var dom_HTMLOutputElement = {};
$dynamic("get$value").HTMLOutputElement = function() { return this.value; };
$dynamic("set$value").HTMLOutputElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLParagraphElement **************
var dom_HTMLParagraphElement = {};
// ********** Code for dom_HTMLParamElement **************
var dom_HTMLParamElement = {};
$dynamic("get$value").HTMLParamElement = function() { return this.value; };
$dynamic("set$value").HTMLParamElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLPreElement **************
var dom_HTMLPreElement = {};
$dynamic("get$width").HTMLPreElement = function() { return this.width; };
$dynamic("set$width").HTMLPreElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLProgressElement **************
var dom_HTMLProgressElement = {};
$dynamic("get$value").HTMLProgressElement = function() { return this.value; };
$dynamic("set$value").HTMLProgressElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLQuoteElement **************
var dom_HTMLQuoteElement = {};
// ********** Code for dom_HTMLScriptElement **************
var dom_HTMLScriptElement = {};
$dynamic("get$src").HTMLScriptElement = function() { return this.src; };
$dynamic("set$src").HTMLScriptElement = function(value) { return this.src = value; };
// ********** Code for dom_HTMLSelectElement **************
var dom_HTMLSelectElement = {};
$dynamic("get$value").HTMLSelectElement = function() { return this.value; };
$dynamic("set$value").HTMLSelectElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLSourceElement **************
var dom_HTMLSourceElement = {};
$dynamic("get$src").HTMLSourceElement = function() { return this.src; };
$dynamic("set$src").HTMLSourceElement = function(value) { return this.src = value; };
// ********** Code for dom_HTMLSpanElement **************
var dom_HTMLSpanElement = {};
// ********** Code for dom_HTMLStyleElement **************
var dom_HTMLStyleElement = {};
// ********** Code for dom_HTMLTableCaptionElement **************
var dom_HTMLTableCaptionElement = {};
// ********** Code for dom_HTMLTableCellElement **************
var dom_HTMLTableCellElement = {};
$dynamic("get$height").HTMLTableCellElement = function() { return this.height; };
$dynamic("set$height").HTMLTableCellElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLTableCellElement = function() { return this.width; };
$dynamic("set$width").HTMLTableCellElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLTableColElement **************
var dom_HTMLTableColElement = {};
$dynamic("get$width").HTMLTableColElement = function() { return this.width; };
$dynamic("set$width").HTMLTableColElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLTableElement **************
var dom_HTMLTableElement = {};
$dynamic("get$width").HTMLTableElement = function() { return this.width; };
$dynamic("set$width").HTMLTableElement = function(value) { return this.width = value; };
// ********** Code for dom_HTMLTableRowElement **************
var dom_HTMLTableRowElement = {};
// ********** Code for dom_HTMLTableSectionElement **************
var dom_HTMLTableSectionElement = {};
// ********** Code for dom_HTMLTextAreaElement **************
var dom_HTMLTextAreaElement = {};
$dynamic("get$value").HTMLTextAreaElement = function() { return this.value; };
$dynamic("set$value").HTMLTextAreaElement = function(value) { return this.value = value; };
// ********** Code for dom_HTMLTitleElement **************
var dom_HTMLTitleElement = {};
// ********** Code for dom_HTMLTrackElement **************
var dom_HTMLTrackElement = {};
$dynamic("get$src").HTMLTrackElement = function() { return this.src; };
$dynamic("set$src").HTMLTrackElement = function(value) { return this.src = value; };
// ********** Code for dom_HTMLUListElement **************
var dom_HTMLUListElement = {};
// ********** Code for dom_HTMLUnknownElement **************
var dom_HTMLUnknownElement = {};
// ********** Code for dom_HTMLVideoElement **************
var dom_HTMLVideoElement = {};
$dynamic("get$height").HTMLVideoElement = function() { return this.height; };
$dynamic("set$height").HTMLVideoElement = function(value) { return this.height = value; };
$dynamic("get$width").HTMLVideoElement = function() { return this.width; };
$dynamic("set$width").HTMLVideoElement = function(value) { return this.width = value; };
// ********** Code for dom_HashChangeEvent **************
var dom_HashChangeEvent = {};
// ********** Code for dom_HighPass2FilterNode **************
var dom_HighPass2FilterNode = {};
// ********** Code for dom_History **************
var dom_History = {};
$dynamic("get$dartObjectLocalStorage").History = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").History = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBAny **************
var dom_IDBAny = {};
$dynamic("get$dartObjectLocalStorage").IDBAny = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBAny = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBCursor **************
var dom_IDBCursor = {};
$dynamic("get$dartObjectLocalStorage").IDBCursor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBCursor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBCursorWithValue **************
var dom_IDBCursorWithValue = {};
$dynamic("get$value").IDBCursorWithValue = function() { return this.value; };
$dynamic("set$value").IDBCursorWithValue = function(value) { return this.value = value; };
// ********** Code for dom_IDBDatabase **************
var dom_IDBDatabase = {};
$dynamic("get$dartObjectLocalStorage").IDBDatabase = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabase = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").IDBDatabase = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_IDBDatabaseError **************
var dom_IDBDatabaseError = {};
$dynamic("get$dartObjectLocalStorage").IDBDatabaseError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabaseError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBDatabaseException **************
var dom_IDBDatabaseException = {};
$dynamic("get$dartObjectLocalStorage").IDBDatabaseException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBDatabaseException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").IDBDatabaseException = function() {
  return this.toString();
};
// ********** Code for dom_IDBFactory **************
var dom_IDBFactory = {};
$dynamic("get$dartObjectLocalStorage").IDBFactory = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBFactory = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBIndex **************
var dom_IDBIndex = {};
$dynamic("get$dartObjectLocalStorage").IDBIndex = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBIndex = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBKey **************
var dom_IDBKey = {};
$dynamic("get$dartObjectLocalStorage").IDBKey = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBKey = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBKeyRange **************
var dom_IDBKeyRange = {};
$dynamic("get$dartObjectLocalStorage").IDBKeyRange = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBKeyRange = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_IDBObjectStore **************
var dom_IDBObjectStore = {};
$dynamic("get$dartObjectLocalStorage").IDBObjectStore = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBObjectStore = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
// ********** Code for dom_IDBRequest **************
var dom_IDBRequest = {};
$dynamic("get$dartObjectLocalStorage").IDBRequest = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBRequest = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").IDBRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_IDBTransaction **************
var dom_IDBTransaction = {};
$dynamic("get$dartObjectLocalStorage").IDBTransaction = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").IDBTransaction = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").IDBTransaction = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_IDBVersionChangeEvent **************
var dom_IDBVersionChangeEvent = {};
// ********** Code for dom_IDBVersionChangeRequest **************
var dom_IDBVersionChangeRequest = {};
// ********** Code for dom_ImageData **************
var dom_ImageData = {};
$dynamic("get$height").ImageData = function() { return this.height; };
$dynamic("set$height").ImageData = function(value) { return this.height = value; };
$dynamic("get$width").ImageData = function() { return this.width; };
$dynamic("set$width").ImageData = function(value) { return this.width = value; };
$dynamic("get$dartObjectLocalStorage").ImageData = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ImageData = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_InjectedScriptHost **************
var dom_InjectedScriptHost = {};
$dynamic("get$dartObjectLocalStorage").InjectedScriptHost = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").InjectedScriptHost = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_InspectorFrontendHost **************
var dom_InspectorFrontendHost = {};
$dynamic("get$dartObjectLocalStorage").InspectorFrontendHost = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").InspectorFrontendHost = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Int16Array **************
var dom_Int16Array = {};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("set$length").Int16Array = function(value) { return this.length = value; };
// ********** Code for dom_Int32Array **************
var dom_Int32Array = {};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("set$length").Int32Array = function(value) { return this.length = value; };
// ********** Code for dom_Int8Array **************
var dom_Int8Array = {};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("set$length").Int8Array = function(value) { return this.length = value; };
// ********** Code for dom_JavaScriptAudioNode **************
var dom_JavaScriptAudioNode = {};
// ********** Code for dom_JavaScriptCallFrame **************
var dom_JavaScriptCallFrame = {};
$dynamic("get$dartObjectLocalStorage").JavaScriptCallFrame = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").JavaScriptCallFrame = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_KeyboardEvent **************
var dom_KeyboardEvent = {};
// ********** Code for dom_Location **************
var dom_Location = {};
$dynamic("get$dartObjectLocalStorage").Location = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Location = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").Location = function() {
  return this.toString();
};
// ********** Code for dom_LowPass2FilterNode **************
var dom_LowPass2FilterNode = {};
// ********** Code for dom_MediaElementAudioSourceNode **************
var dom_MediaElementAudioSourceNode = {};
// ********** Code for dom_MediaError **************
var dom_MediaError = {};
$dynamic("get$dartObjectLocalStorage").MediaError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MediaList **************
var dom_MediaList = {};
$dynamic("get$dartObjectLocalStorage").MediaList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MediaQueryList **************
var dom_MediaQueryList = {};
$dynamic("get$dartObjectLocalStorage").MediaQueryList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaQueryList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MediaQueryListListener **************
var dom_MediaQueryListListener = {};
$dynamic("get$dartObjectLocalStorage").MediaQueryListListener = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MediaQueryListListener = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MemoryInfo **************
var dom_MemoryInfo = {};
$dynamic("get$dartObjectLocalStorage").MemoryInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MemoryInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MessageChannel **************
var dom_MessageChannel = {};
$dynamic("get$dartObjectLocalStorage").MessageChannel = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MessageChannel = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MessageEvent **************
var dom_MessageEvent = {};
// ********** Code for dom_MessagePort **************
var dom_MessagePort = {};
$dynamic("get$start").MessagePort = function() {
  return this.start.bind(this);
}
$dynamic("get$dartObjectLocalStorage").MessagePort = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MessagePort = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").MessagePort = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
$dynamic("postMessage$1").MessagePort = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").MessagePort = function($0, $1) {
  return this.postMessage($0, $1);
};
$dynamic("start$0").MessagePort = function() {
  return this.start();
};
// ********** Code for dom_Metadata **************
var dom_Metadata = {};
$dynamic("get$dartObjectLocalStorage").Metadata = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Metadata = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MouseEvent **************
var dom_MouseEvent = {};
$dynamic("get$clientX").MouseEvent = function() { return this.clientX; };
$dynamic("set$clientX").MouseEvent = function(value) { return this.clientX = value; };
$dynamic("get$clientY").MouseEvent = function() { return this.clientY; };
$dynamic("set$clientY").MouseEvent = function(value) { return this.clientY = value; };
// ********** Code for dom_MutationCallback **************
var dom_MutationCallback = {};
$dynamic("get$dartObjectLocalStorage").MutationCallback = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MutationCallback = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_MutationEvent **************
var dom_MutationEvent = {};
// ********** Code for dom_MutationRecord **************
var dom_MutationRecord = {};
$dynamic("get$dartObjectLocalStorage").MutationRecord = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").MutationRecord = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NamedNodeMap **************
var dom_NamedNodeMap = {};
$dynamic("get$dartObjectLocalStorage").NamedNodeMap = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NamedNodeMap = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Navigator **************
var dom_Navigator = {};
$dynamic("get$dartObjectLocalStorage").Navigator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Navigator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NavigatorUserMediaError **************
var dom_NavigatorUserMediaError = {};
$dynamic("get$dartObjectLocalStorage").NavigatorUserMediaError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NavigatorUserMediaError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NavigatorUserMediaSuccessCallback **************
var dom_NavigatorUserMediaSuccessCallback = {};
$dynamic("get$dartObjectLocalStorage").NavigatorUserMediaSuccessCallback = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NavigatorUserMediaSuccessCallback = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Node **************
Node.prototype.get$parentNode = function() { return this.parentNode; };
Node.prototype.set$parentNode = function(value) { return this.parentNode = value; };
Node.prototype.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
Node.prototype.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
Node.prototype.addEventListener$3 = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_NodeFilter **************
var dom_NodeFilter = {};
$dynamic("get$dartObjectLocalStorage").NodeFilter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeFilter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeIterator **************
var dom_NodeIterator = {};
$dynamic("get$dartObjectLocalStorage").NodeIterator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeIterator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeList **************
var dom_NodeList = {};
$dynamic("get$dartObjectLocalStorage").NodeList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_NodeSelector **************
var dom_NodeSelector = {};
$dynamic("get$dartObjectLocalStorage").NodeSelector = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NodeSelector = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("querySelector$1").NodeSelector = function($0) {
  return this.querySelector($0);
};
// ********** Code for dom_Notation **************
var dom_Notation = {};
// ********** Code for dom_Notification **************
var dom_Notification = {};
$dynamic("get$dartObjectLocalStorage").Notification = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Notification = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").Notification = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_NotificationCenter **************
var dom_NotificationCenter = {};
$dynamic("get$dartObjectLocalStorage").NotificationCenter = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").NotificationCenter = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_OESStandardDerivatives **************
var dom_OESStandardDerivatives = {};
$dynamic("get$dartObjectLocalStorage").OESStandardDerivatives = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESStandardDerivatives = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_OESTextureFloat **************
var dom_OESTextureFloat = {};
$dynamic("get$dartObjectLocalStorage").OESTextureFloat = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESTextureFloat = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_OESVertexArrayObject **************
var dom_OESVertexArrayObject = {};
$dynamic("get$dartObjectLocalStorage").OESVertexArrayObject = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OESVertexArrayObject = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_OfflineAudioCompletionEvent **************
var dom_OfflineAudioCompletionEvent = {};
// ********** Code for dom_OperationNotAllowedException **************
var dom_OperationNotAllowedException = {};
$dynamic("get$dartObjectLocalStorage").OperationNotAllowedException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").OperationNotAllowedException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").OperationNotAllowedException = function() {
  return this.toString();
};
// ********** Code for dom_OverflowEvent **************
var dom_OverflowEvent = {};
// ********** Code for dom_PageTransitionEvent **************
var dom_PageTransitionEvent = {};
// ********** Code for dom_Performance **************
var dom_Performance = {};
$dynamic("get$dartObjectLocalStorage").Performance = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Performance = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PerformanceNavigation **************
var dom_PerformanceNavigation = {};
$dynamic("get$dartObjectLocalStorage").PerformanceNavigation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PerformanceNavigation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PerformanceTiming **************
var dom_PerformanceTiming = {};
$dynamic("get$dartObjectLocalStorage").PerformanceTiming = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PerformanceTiming = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_PopStateEvent **************
var dom_PopStateEvent = {};
// ********** Code for dom_PositionError **************
var dom_PositionError = {};
$dynamic("get$dartObjectLocalStorage").PositionError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").PositionError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ProcessingInstruction **************
var dom_ProcessingInstruction = {};
// ********** Code for dom_ProgressEvent **************
var dom_ProgressEvent = {};
// ********** Code for dom_RGBColor **************
var dom_RGBColor = {};
$dynamic("get$dartObjectLocalStorage").RGBColor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").RGBColor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Range **************
var dom_Range = {};
$dynamic("get$dartObjectLocalStorage").Range = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Range = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").Range = function() {
  return this.toString();
};
// ********** Code for dom_RangeException **************
var dom_RangeException = {};
$dynamic("get$dartObjectLocalStorage").RangeException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").RangeException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").RangeException = function() {
  return this.toString();
};
// ********** Code for dom_RealtimeAnalyserNode **************
var dom_RealtimeAnalyserNode = {};
// ********** Code for dom_Rect **************
var dom_Rect = {};
$dynamic("get$left").Rect = function() { return this.left; };
$dynamic("set$left").Rect = function(value) { return this.left = value; };
$dynamic("get$top").Rect = function() { return this.top; };
$dynamic("set$top").Rect = function(value) { return this.top = value; };
$dynamic("get$dartObjectLocalStorage").Rect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Rect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLError **************
var dom_SQLError = {};
$dynamic("get$dartObjectLocalStorage").SQLError = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLError = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLException **************
var dom_SQLException = {};
$dynamic("get$dartObjectLocalStorage").SQLException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLException = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLResultSet **************
var dom_SQLResultSet = {};
$dynamic("get$dartObjectLocalStorage").SQLResultSet = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLResultSet = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLResultSetRowList **************
var dom_SQLResultSetRowList = {};
$dynamic("get$dartObjectLocalStorage").SQLResultSetRowList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLResultSetRowList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLTransaction **************
var dom_SQLTransaction = {};
$dynamic("get$dartObjectLocalStorage").SQLTransaction = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLTransaction = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SQLTransactionSync **************
var dom_SQLTransactionSync = {};
$dynamic("get$dartObjectLocalStorage").SQLTransactionSync = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SQLTransactionSync = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAElement **************
var dom_SVGAElement = {};
// ********** Code for dom_SVGAltGlyphDefElement **************
var dom_SVGAltGlyphDefElement = {};
// ********** Code for dom_SVGAltGlyphElement **************
var dom_SVGAltGlyphElement = {};
// ********** Code for dom_SVGAltGlyphItemElement **************
var dom_SVGAltGlyphItemElement = {};
// ********** Code for dom_SVGAngle **************
var dom_SVGAngle = {};
$dynamic("get$value").SVGAngle = function() { return this.value; };
$dynamic("set$value").SVGAngle = function(value) { return this.value = value; };
$dynamic("get$dartObjectLocalStorage").SVGAngle = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAngle = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimateColorElement **************
var dom_SVGAnimateColorElement = {};
// ********** Code for dom_SVGAnimateElement **************
var dom_SVGAnimateElement = {};
// ********** Code for dom_SVGAnimateMotionElement **************
var dom_SVGAnimateMotionElement = {};
// ********** Code for dom_SVGAnimateTransformElement **************
var dom_SVGAnimateTransformElement = {};
// ********** Code for dom_SVGAnimatedAngle **************
var dom_SVGAnimatedAngle = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedAngle = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedAngle = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedBoolean **************
var dom_SVGAnimatedBoolean = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedBoolean = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedBoolean = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedEnumeration **************
var dom_SVGAnimatedEnumeration = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedEnumeration = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedEnumeration = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedInteger **************
var dom_SVGAnimatedInteger = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedInteger = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedInteger = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedLength **************
var dom_SVGAnimatedLength = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedLength = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedLength = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedLengthList **************
var dom_SVGAnimatedLengthList = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedLengthList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedLengthList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedNumber **************
var dom_SVGAnimatedNumber = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedNumber = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedNumber = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedNumberList **************
var dom_SVGAnimatedNumberList = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedNumberList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedNumberList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedPreserveAspectRatio **************
var dom_SVGAnimatedPreserveAspectRatio = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedPreserveAspectRatio = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedPreserveAspectRatio = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedRect **************
var dom_SVGAnimatedRect = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedString **************
var dom_SVGAnimatedString = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedString = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedString = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimatedTransformList **************
var dom_SVGAnimatedTransformList = {};
$dynamic("get$dartObjectLocalStorage").SVGAnimatedTransformList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGAnimatedTransformList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGAnimationElement **************
var dom_SVGAnimationElement = {};
// ********** Code for dom_SVGCircleElement **************
var dom_SVGCircleElement = {};
// ********** Code for dom_SVGClipPathElement **************
var dom_SVGClipPathElement = {};
// ********** Code for dom_SVGColor **************
var dom_SVGColor = {};
// ********** Code for dom_SVGComponentTransferFunctionElement **************
var dom_SVGComponentTransferFunctionElement = {};
// ********** Code for dom_SVGCursorElement **************
var dom_SVGCursorElement = {};
// ********** Code for dom_SVGDefsElement **************
var dom_SVGDefsElement = {};
// ********** Code for dom_SVGDescElement **************
var dom_SVGDescElement = {};
// ********** Code for dom_SVGDocument **************
var dom_SVGDocument = {};
// ********** Code for SVGElement **************
// ********** Code for dom_SVGElementInstance **************
var dom_SVGElementInstance = {};
$dynamic("get$parentNode").SVGElementInstance = function() { return this.parentNode; };
$dynamic("set$parentNode").SVGElementInstance = function(value) { return this.parentNode = value; };
$dynamic("get$dartObjectLocalStorage").SVGElementInstance = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGElementInstance = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").SVGElementInstance = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_SVGElementInstanceList **************
var dom_SVGElementInstanceList = {};
$dynamic("get$dartObjectLocalStorage").SVGElementInstanceList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGElementInstanceList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGEllipseElement **************
var dom_SVGEllipseElement = {};
// ********** Code for dom_SVGException **************
var dom_SVGException = {};
$dynamic("get$dartObjectLocalStorage").SVGException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").SVGException = function() {
  return this.toString();
};
// ********** Code for dom_SVGExternalResourcesRequired **************
var dom_SVGExternalResourcesRequired = {};
$dynamic("get$dartObjectLocalStorage").SVGExternalResourcesRequired = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGExternalResourcesRequired = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGFEBlendElement **************
var dom_SVGFEBlendElement = {};
$dynamic("get$height").SVGFEBlendElement = function() { return this.height; };
$dynamic("set$height").SVGFEBlendElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEBlendElement = function() { return this.width; };
$dynamic("set$width").SVGFEBlendElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEColorMatrixElement **************
var dom_SVGFEColorMatrixElement = {};
$dynamic("get$height").SVGFEColorMatrixElement = function() { return this.height; };
$dynamic("set$height").SVGFEColorMatrixElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEColorMatrixElement = function() { return this.width; };
$dynamic("set$width").SVGFEColorMatrixElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEComponentTransferElement **************
var dom_SVGFEComponentTransferElement = {};
$dynamic("get$height").SVGFEComponentTransferElement = function() { return this.height; };
$dynamic("set$height").SVGFEComponentTransferElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEComponentTransferElement = function() { return this.width; };
$dynamic("set$width").SVGFEComponentTransferElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFECompositeElement **************
var dom_SVGFECompositeElement = {};
$dynamic("get$height").SVGFECompositeElement = function() { return this.height; };
$dynamic("set$height").SVGFECompositeElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFECompositeElement = function() { return this.width; };
$dynamic("set$width").SVGFECompositeElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEConvolveMatrixElement **************
var dom_SVGFEConvolveMatrixElement = {};
$dynamic("get$height").SVGFEConvolveMatrixElement = function() { return this.height; };
$dynamic("set$height").SVGFEConvolveMatrixElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEConvolveMatrixElement = function() { return this.width; };
$dynamic("set$width").SVGFEConvolveMatrixElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEDiffuseLightingElement **************
var dom_SVGFEDiffuseLightingElement = {};
$dynamic("get$height").SVGFEDiffuseLightingElement = function() { return this.height; };
$dynamic("set$height").SVGFEDiffuseLightingElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEDiffuseLightingElement = function() { return this.width; };
$dynamic("set$width").SVGFEDiffuseLightingElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEDisplacementMapElement **************
var dom_SVGFEDisplacementMapElement = {};
$dynamic("get$height").SVGFEDisplacementMapElement = function() { return this.height; };
$dynamic("set$height").SVGFEDisplacementMapElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEDisplacementMapElement = function() { return this.width; };
$dynamic("set$width").SVGFEDisplacementMapElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEDistantLightElement **************
var dom_SVGFEDistantLightElement = {};
// ********** Code for dom_SVGFEDropShadowElement **************
var dom_SVGFEDropShadowElement = {};
$dynamic("get$height").SVGFEDropShadowElement = function() { return this.height; };
$dynamic("set$height").SVGFEDropShadowElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEDropShadowElement = function() { return this.width; };
$dynamic("set$width").SVGFEDropShadowElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEFloodElement **************
var dom_SVGFEFloodElement = {};
$dynamic("get$height").SVGFEFloodElement = function() { return this.height; };
$dynamic("set$height").SVGFEFloodElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEFloodElement = function() { return this.width; };
$dynamic("set$width").SVGFEFloodElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEFuncAElement **************
var dom_SVGFEFuncAElement = {};
// ********** Code for dom_SVGFEFuncBElement **************
var dom_SVGFEFuncBElement = {};
// ********** Code for dom_SVGFEFuncGElement **************
var dom_SVGFEFuncGElement = {};
// ********** Code for dom_SVGFEFuncRElement **************
var dom_SVGFEFuncRElement = {};
// ********** Code for dom_SVGFEGaussianBlurElement **************
var dom_SVGFEGaussianBlurElement = {};
$dynamic("get$height").SVGFEGaussianBlurElement = function() { return this.height; };
$dynamic("set$height").SVGFEGaussianBlurElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEGaussianBlurElement = function() { return this.width; };
$dynamic("set$width").SVGFEGaussianBlurElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEImageElement **************
var dom_SVGFEImageElement = {};
$dynamic("get$height").SVGFEImageElement = function() { return this.height; };
$dynamic("set$height").SVGFEImageElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEImageElement = function() { return this.width; };
$dynamic("set$width").SVGFEImageElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEMergeElement **************
var dom_SVGFEMergeElement = {};
$dynamic("get$height").SVGFEMergeElement = function() { return this.height; };
$dynamic("set$height").SVGFEMergeElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEMergeElement = function() { return this.width; };
$dynamic("set$width").SVGFEMergeElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEMergeNodeElement **************
var dom_SVGFEMergeNodeElement = {};
// ********** Code for dom_SVGFEMorphologyElement **************
var dom_SVGFEMorphologyElement = {};
$dynamic("get$height").SVGFEMorphologyElement = function() { return this.height; };
$dynamic("set$height").SVGFEMorphologyElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEMorphologyElement = function() { return this.width; };
$dynamic("set$width").SVGFEMorphologyElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEOffsetElement **************
var dom_SVGFEOffsetElement = {};
$dynamic("get$height").SVGFEOffsetElement = function() { return this.height; };
$dynamic("set$height").SVGFEOffsetElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFEOffsetElement = function() { return this.width; };
$dynamic("set$width").SVGFEOffsetElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFEPointLightElement **************
var dom_SVGFEPointLightElement = {};
// ********** Code for dom_SVGFESpecularLightingElement **************
var dom_SVGFESpecularLightingElement = {};
$dynamic("get$height").SVGFESpecularLightingElement = function() { return this.height; };
$dynamic("set$height").SVGFESpecularLightingElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFESpecularLightingElement = function() { return this.width; };
$dynamic("set$width").SVGFESpecularLightingElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFESpotLightElement **************
var dom_SVGFESpotLightElement = {};
// ********** Code for dom_SVGFETileElement **************
var dom_SVGFETileElement = {};
$dynamic("get$height").SVGFETileElement = function() { return this.height; };
$dynamic("set$height").SVGFETileElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFETileElement = function() { return this.width; };
$dynamic("set$width").SVGFETileElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFETurbulenceElement **************
var dom_SVGFETurbulenceElement = {};
$dynamic("get$height").SVGFETurbulenceElement = function() { return this.height; };
$dynamic("set$height").SVGFETurbulenceElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFETurbulenceElement = function() { return this.width; };
$dynamic("set$width").SVGFETurbulenceElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFilterElement **************
var dom_SVGFilterElement = {};
$dynamic("get$height").SVGFilterElement = function() { return this.height; };
$dynamic("set$height").SVGFilterElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGFilterElement = function() { return this.width; };
$dynamic("set$width").SVGFilterElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGFilterPrimitiveStandardAttributes **************
var dom_SVGFilterPrimitiveStandardAttributes = {};
$dynamic("get$height").SVGFilterPrimitiveStandardAttributes = function() { return this.height; };
$dynamic("set$height").SVGFilterPrimitiveStandardAttributes = function(value) { return this.height = value; };
$dynamic("get$width").SVGFilterPrimitiveStandardAttributes = function() { return this.width; };
$dynamic("set$width").SVGFilterPrimitiveStandardAttributes = function(value) { return this.width = value; };
// ********** Code for dom_SVGFitToViewBox **************
var dom_SVGFitToViewBox = {};
$dynamic("get$dartObjectLocalStorage").SVGFitToViewBox = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGFitToViewBox = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGFontElement **************
var dom_SVGFontElement = {};
// ********** Code for dom_SVGFontFaceElement **************
var dom_SVGFontFaceElement = {};
// ********** Code for dom_SVGFontFaceFormatElement **************
var dom_SVGFontFaceFormatElement = {};
// ********** Code for dom_SVGFontFaceNameElement **************
var dom_SVGFontFaceNameElement = {};
// ********** Code for dom_SVGFontFaceSrcElement **************
var dom_SVGFontFaceSrcElement = {};
// ********** Code for dom_SVGFontFaceUriElement **************
var dom_SVGFontFaceUriElement = {};
// ********** Code for dom_SVGForeignObjectElement **************
var dom_SVGForeignObjectElement = {};
$dynamic("get$height").SVGForeignObjectElement = function() { return this.height; };
$dynamic("set$height").SVGForeignObjectElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGForeignObjectElement = function() { return this.width; };
$dynamic("set$width").SVGForeignObjectElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGGElement **************
var dom_SVGGElement = {};
// ********** Code for dom_SVGGlyphElement **************
var dom_SVGGlyphElement = {};
// ********** Code for dom_SVGGlyphRefElement **************
var dom_SVGGlyphRefElement = {};
// ********** Code for SVGGradientElement **************
// ********** Code for dom_SVGHKernElement **************
var dom_SVGHKernElement = {};
// ********** Code for dom_SVGImageElement **************
var dom_SVGImageElement = {};
$dynamic("get$height").SVGImageElement = function() { return this.height; };
$dynamic("set$height").SVGImageElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGImageElement = function() { return this.width; };
$dynamic("set$width").SVGImageElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGLangSpace **************
var dom_SVGLangSpace = {};
$dynamic("get$dartObjectLocalStorage").SVGLangSpace = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLangSpace = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGLength **************
var dom_SVGLength = {};
$dynamic("get$value").SVGLength = function() { return this.value; };
$dynamic("set$value").SVGLength = function(value) { return this.value = value; };
$dynamic("get$dartObjectLocalStorage").SVGLength = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLength = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGLengthList **************
var dom_SVGLengthList = {};
$dynamic("get$dartObjectLocalStorage").SVGLengthList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLengthList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGLineElement **************
var dom_SVGLineElement = {};
// ********** Code for dom_SVGLinearGradientElement **************
var dom_SVGLinearGradientElement = {};
// ********** Code for dom_SVGLocatable **************
var dom_SVGLocatable = {};
$dynamic("get$dartObjectLocalStorage").SVGLocatable = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGLocatable = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGMPathElement **************
var dom_SVGMPathElement = {};
// ********** Code for dom_SVGMarkerElement **************
var dom_SVGMarkerElement = {};
// ********** Code for dom_SVGMaskElement **************
var dom_SVGMaskElement = {};
$dynamic("get$height").SVGMaskElement = function() { return this.height; };
$dynamic("set$height").SVGMaskElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGMaskElement = function() { return this.width; };
$dynamic("set$width").SVGMaskElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGMatrix **************
var dom_SVGMatrix = {};
$dynamic("get$rotate").SVGMatrix = function() {
  return this.rotate.bind(this);
}
$dynamic("get$dartObjectLocalStorage").SVGMatrix = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGMatrix = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("rotate$1").SVGMatrix = function($0) {
  return this.rotate($0);
};
$dynamic("translate$2").SVGMatrix = function($0, $1) {
  return this.translate($0, $1);
};
// ********** Code for dom_SVGMetadataElement **************
var dom_SVGMetadataElement = {};
// ********** Code for dom_SVGMissingGlyphElement **************
var dom_SVGMissingGlyphElement = {};
// ********** Code for dom_SVGNumber **************
var dom_SVGNumber = {};
$dynamic("get$value").SVGNumber = function() { return this.value; };
$dynamic("set$value").SVGNumber = function(value) { return this.value = value; };
$dynamic("get$dartObjectLocalStorage").SVGNumber = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGNumber = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGNumberList **************
var dom_SVGNumberList = {};
$dynamic("get$dartObjectLocalStorage").SVGNumberList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGNumberList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGPaint **************
var dom_SVGPaint = {};
// ********** Code for dom_SVGPathElement **************
var dom_SVGPathElement = {};
// ********** Code for dom_SVGPathSeg **************
var dom_SVGPathSeg = {};
$dynamic("get$dartObjectLocalStorage").SVGPathSeg = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPathSeg = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGPathSegArcAbs **************
var dom_SVGPathSegArcAbs = {};
// ********** Code for dom_SVGPathSegArcRel **************
var dom_SVGPathSegArcRel = {};
// ********** Code for dom_SVGPathSegClosePath **************
var dom_SVGPathSegClosePath = {};
// ********** Code for dom_SVGPathSegCurvetoCubicAbs **************
var dom_SVGPathSegCurvetoCubicAbs = {};
// ********** Code for dom_SVGPathSegCurvetoCubicRel **************
var dom_SVGPathSegCurvetoCubicRel = {};
// ********** Code for dom_SVGPathSegCurvetoCubicSmoothAbs **************
var dom_SVGPathSegCurvetoCubicSmoothAbs = {};
// ********** Code for dom_SVGPathSegCurvetoCubicSmoothRel **************
var dom_SVGPathSegCurvetoCubicSmoothRel = {};
// ********** Code for dom_SVGPathSegCurvetoQuadraticAbs **************
var dom_SVGPathSegCurvetoQuadraticAbs = {};
// ********** Code for dom_SVGPathSegCurvetoQuadraticRel **************
var dom_SVGPathSegCurvetoQuadraticRel = {};
// ********** Code for dom_SVGPathSegCurvetoQuadraticSmoothAbs **************
var dom_SVGPathSegCurvetoQuadraticSmoothAbs = {};
// ********** Code for dom_SVGPathSegCurvetoQuadraticSmoothRel **************
var dom_SVGPathSegCurvetoQuadraticSmoothRel = {};
// ********** Code for dom_SVGPathSegLinetoAbs **************
var dom_SVGPathSegLinetoAbs = {};
// ********** Code for dom_SVGPathSegLinetoHorizontalAbs **************
var dom_SVGPathSegLinetoHorizontalAbs = {};
// ********** Code for dom_SVGPathSegLinetoHorizontalRel **************
var dom_SVGPathSegLinetoHorizontalRel = {};
// ********** Code for dom_SVGPathSegLinetoRel **************
var dom_SVGPathSegLinetoRel = {};
// ********** Code for dom_SVGPathSegLinetoVerticalAbs **************
var dom_SVGPathSegLinetoVerticalAbs = {};
// ********** Code for dom_SVGPathSegLinetoVerticalRel **************
var dom_SVGPathSegLinetoVerticalRel = {};
// ********** Code for dom_SVGPathSegList **************
var dom_SVGPathSegList = {};
$dynamic("get$dartObjectLocalStorage").SVGPathSegList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPathSegList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGPathSegMovetoAbs **************
var dom_SVGPathSegMovetoAbs = {};
// ********** Code for dom_SVGPathSegMovetoRel **************
var dom_SVGPathSegMovetoRel = {};
// ********** Code for dom_SVGPatternElement **************
var dom_SVGPatternElement = {};
$dynamic("get$height").SVGPatternElement = function() { return this.height; };
$dynamic("set$height").SVGPatternElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGPatternElement = function() { return this.width; };
$dynamic("set$width").SVGPatternElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGPoint **************
var dom_SVGPoint = {};
$dynamic("get$dartObjectLocalStorage").SVGPoint = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPoint = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGPointList **************
var dom_SVGPointList = {};
$dynamic("get$dartObjectLocalStorage").SVGPointList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPointList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGPolygonElement **************
var dom_SVGPolygonElement = {};
// ********** Code for dom_SVGPolylineElement **************
var dom_SVGPolylineElement = {};
// ********** Code for dom_SVGPreserveAspectRatio **************
var dom_SVGPreserveAspectRatio = {};
$dynamic("get$dartObjectLocalStorage").SVGPreserveAspectRatio = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGPreserveAspectRatio = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGRadialGradientElement **************
var dom_SVGRadialGradientElement = {};
// ********** Code for dom_SVGRect **************
var dom_SVGRect = {};
$dynamic("get$height").SVGRect = function() { return this.height; };
$dynamic("set$height").SVGRect = function(value) { return this.height = value; };
$dynamic("get$width").SVGRect = function() { return this.width; };
$dynamic("set$width").SVGRect = function(value) { return this.width = value; };
$dynamic("get$dartObjectLocalStorage").SVGRect = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGRect = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGRectElement **************
var dom_SVGRectElement = {};
$dynamic("get$height").SVGRectElement = function() { return this.height; };
$dynamic("set$height").SVGRectElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGRectElement = function() { return this.width; };
$dynamic("set$width").SVGRectElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGRenderingIntent **************
var dom_SVGRenderingIntent = {};
$dynamic("get$dartObjectLocalStorage").SVGRenderingIntent = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGRenderingIntent = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGSVGElement **************
var dom_SVGSVGElement = {};
$dynamic("get$height").SVGSVGElement = function() { return this.height; };
$dynamic("set$height").SVGSVGElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGSVGElement = function() { return this.width; };
$dynamic("set$width").SVGSVGElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGScriptElement **************
var dom_SVGScriptElement = {};
// ********** Code for dom_SVGSetElement **************
var dom_SVGSetElement = {};
// ********** Code for dom_SVGStopElement **************
var dom_SVGStopElement = {};
// ********** Code for dom_SVGStringList **************
var dom_SVGStringList = {};
$dynamic("get$dartObjectLocalStorage").SVGStringList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGStringList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGStylable **************
var dom_SVGStylable = {};
$dynamic("get$dartObjectLocalStorage").SVGStylable = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGStylable = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGStyleElement **************
var dom_SVGStyleElement = {};
// ********** Code for dom_SVGSwitchElement **************
var dom_SVGSwitchElement = {};
// ********** Code for dom_SVGSymbolElement **************
var dom_SVGSymbolElement = {};
// ********** Code for dom_SVGTRefElement **************
var dom_SVGTRefElement = {};
// ********** Code for dom_SVGTSpanElement **************
var dom_SVGTSpanElement = {};
// ********** Code for dom_SVGTests **************
var dom_SVGTests = {};
$dynamic("get$dartObjectLocalStorage").SVGTests = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTests = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for SVGTextContentElement **************
// ********** Code for dom_SVGTextElement **************
var dom_SVGTextElement = {};
// ********** Code for dom_SVGTextPathElement **************
var dom_SVGTextPathElement = {};
// ********** Code for SVGTextPositioningElement **************
SVGTextPositioningElement.prototype.get$rotate = function() { return this.rotate; };
SVGTextPositioningElement.prototype.set$rotate = function(value) { return this.rotate = value; };
SVGTextPositioningElement.prototype.rotate$1 = function($0) {
  return this.rotate($0);
};
// ********** Code for dom_SVGTitleElement **************
var dom_SVGTitleElement = {};
// ********** Code for dom_SVGTransform **************
var dom_SVGTransform = {};
$dynamic("get$dartObjectLocalStorage").SVGTransform = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTransform = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGTransformList **************
var dom_SVGTransformList = {};
$dynamic("get$dartObjectLocalStorage").SVGTransformList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGTransformList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGTransformable **************
var dom_SVGTransformable = {};
// ********** Code for dom_SVGURIReference **************
var dom_SVGURIReference = {};
$dynamic("get$dartObjectLocalStorage").SVGURIReference = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGURIReference = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGUnitTypes **************
var dom_SVGUnitTypes = {};
$dynamic("get$dartObjectLocalStorage").SVGUnitTypes = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGUnitTypes = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGUseElement **************
var dom_SVGUseElement = {};
$dynamic("get$height").SVGUseElement = function() { return this.height; };
$dynamic("set$height").SVGUseElement = function(value) { return this.height = value; };
$dynamic("get$width").SVGUseElement = function() { return this.width; };
$dynamic("set$width").SVGUseElement = function(value) { return this.width = value; };
// ********** Code for dom_SVGVKernElement **************
var dom_SVGVKernElement = {};
// ********** Code for dom_SVGViewElement **************
var dom_SVGViewElement = {};
// ********** Code for dom_SVGViewSpec **************
var dom_SVGViewSpec = {};
// ********** Code for dom_SVGZoomAndPan **************
var dom_SVGZoomAndPan = {};
$dynamic("get$dartObjectLocalStorage").SVGZoomAndPan = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SVGZoomAndPan = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SVGZoomEvent **************
var dom_SVGZoomEvent = {};
// ********** Code for dom_Screen **************
var dom_Screen = {};
$dynamic("get$height").Screen = function() { return this.height; };
$dynamic("set$height").Screen = function(value) { return this.height = value; };
$dynamic("get$width").Screen = function() { return this.width; };
$dynamic("set$width").Screen = function(value) { return this.width = value; };
$dynamic("get$dartObjectLocalStorage").Screen = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Screen = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ScriptProfile **************
var dom_ScriptProfile = {};
$dynamic("get$dartObjectLocalStorage").ScriptProfile = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ScriptProfile = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_ScriptProfileNode **************
var dom_ScriptProfileNode = {};
$dynamic("get$dartObjectLocalStorage").ScriptProfileNode = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ScriptProfileNode = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SharedWorker **************
var dom_SharedWorker = {};
// ********** Code for dom_SharedWorkercontext **************
var dom_SharedWorkercontext = {};
// ********** Code for dom_SpeechInputEvent **************
var dom_SpeechInputEvent = {};
// ********** Code for dom_SpeechInputResult **************
var dom_SpeechInputResult = {};
$dynamic("get$dartObjectLocalStorage").SpeechInputResult = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SpeechInputResult = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_SpeechInputResultList **************
var dom_SpeechInputResultList = {};
$dynamic("get$dartObjectLocalStorage").SpeechInputResultList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").SpeechInputResultList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Storage **************
var dom_Storage = {};
$dynamic("get$dartObjectLocalStorage").Storage = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Storage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_StorageEvent **************
var dom_StorageEvent = {};
// ********** Code for dom_StorageInfo **************
var dom_StorageInfo = {};
$dynamic("get$dartObjectLocalStorage").StorageInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StorageInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_StyleMedia **************
var dom_StyleMedia = {};
$dynamic("get$dartObjectLocalStorage").StyleMedia = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StyleMedia = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for StyleSheet **************
StyleSheet.prototype.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
StyleSheet.prototype.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_StyleSheetList **************
var dom_StyleSheetList = {};
$dynamic("get$dartObjectLocalStorage").StyleSheetList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").StyleSheetList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for Text **************
// ********** Code for dom_TextEvent **************
var dom_TextEvent = {};
// ********** Code for dom_TextMetrics **************
var dom_TextMetrics = {};
$dynamic("get$width").TextMetrics = function() { return this.width; };
$dynamic("set$width").TextMetrics = function(value) { return this.width = value; };
$dynamic("get$dartObjectLocalStorage").TextMetrics = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextMetrics = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TextTrack **************
var dom_TextTrack = {};
$dynamic("get$dartObjectLocalStorage").TextTrack = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrack = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TextTrackCue **************
var dom_TextTrackCue = {};
$dynamic("get$dartObjectLocalStorage").TextTrackCue = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrackCue = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TextTrackCueList **************
var dom_TextTrackCueList = {};
$dynamic("get$dartObjectLocalStorage").TextTrackCueList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TextTrackCueList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TimeRanges **************
var dom_TimeRanges = {};
$dynamic("get$start").TimeRanges = function() {
  return this.start.bind(this);
}
$dynamic("get$dartObjectLocalStorage").TimeRanges = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TimeRanges = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_Touch **************
var dom_Touch = {};
$dynamic("get$clientX").Touch = function() { return this.clientX; };
$dynamic("set$clientX").Touch = function(value) { return this.clientX = value; };
$dynamic("get$clientY").Touch = function() { return this.clientY; };
$dynamic("set$clientY").Touch = function(value) { return this.clientY = value; };
$dynamic("get$dartObjectLocalStorage").Touch = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").Touch = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TouchEvent **************
var dom_TouchEvent = {};
// ********** Code for dom_TouchList **************
var dom_TouchList = {};
$dynamic("get$dartObjectLocalStorage").TouchList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TouchList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_TreeWalker **************
var dom_TreeWalker = {};
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
$dynamic("get$dartObjectLocalStorage").TreeWalker = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").TreeWalker = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for UIEvent **************
// ********** Code for dom_Uint16Array **************
var dom_Uint16Array = {};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("set$length").Uint16Array = function(value) { return this.length = value; };
// ********** Code for dom_Uint32Array **************
var dom_Uint32Array = {};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("set$length").Uint32Array = function(value) { return this.length = value; };
// ********** Code for dom_Uint8Array **************
var dom_Uint8Array = {};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("set$length").Uint8Array = function(value) { return this.length = value; };
// ********** Code for dom_ValidityState **************
var dom_ValidityState = {};
$dynamic("get$dartObjectLocalStorage").ValidityState = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").ValidityState = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WaveShaperNode **************
var dom_WaveShaperNode = {};
// ********** Code for dom_WebGLActiveInfo **************
var dom_WebGLActiveInfo = {};
$dynamic("get$dartObjectLocalStorage").WebGLActiveInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLActiveInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLBuffer **************
var dom_WebGLBuffer = {};
$dynamic("get$dartObjectLocalStorage").WebGLBuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLBuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLContextAttributes **************
var dom_WebGLContextAttributes = {};
$dynamic("get$dartObjectLocalStorage").WebGLContextAttributes = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLContextAttributes = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLContextEvent **************
var dom_WebGLContextEvent = {};
// ********** Code for dom_WebGLDebugRendererInfo **************
var dom_WebGLDebugRendererInfo = {};
$dynamic("get$dartObjectLocalStorage").WebGLDebugRendererInfo = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLDebugRendererInfo = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLDebugShaders **************
var dom_WebGLDebugShaders = {};
$dynamic("get$dartObjectLocalStorage").WebGLDebugShaders = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLDebugShaders = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLFramebuffer **************
var dom_WebGLFramebuffer = {};
$dynamic("get$dartObjectLocalStorage").WebGLFramebuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLFramebuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLProgram **************
var dom_WebGLProgram = {};
$dynamic("get$dartObjectLocalStorage").WebGLProgram = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLProgram = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLRenderbuffer **************
var dom_WebGLRenderbuffer = {};
$dynamic("get$dartObjectLocalStorage").WebGLRenderbuffer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLRenderbuffer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLRenderingContext **************
var dom_WebGLRenderingContext = {};
// ********** Code for dom_WebGLShader **************
var dom_WebGLShader = {};
$dynamic("get$dartObjectLocalStorage").WebGLShader = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLShader = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLTexture **************
var dom_WebGLTexture = {};
$dynamic("get$dartObjectLocalStorage").WebGLTexture = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLTexture = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLUniformLocation **************
var dom_WebGLUniformLocation = {};
$dynamic("get$dartObjectLocalStorage").WebGLUniformLocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLUniformLocation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebGLVertexArrayObjectOES **************
var dom_WebGLVertexArrayObjectOES = {};
$dynamic("get$dartObjectLocalStorage").WebGLVertexArrayObjectOES = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebGLVertexArrayObjectOES = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitAnimation **************
var dom_WebKitAnimation = {};
$dynamic("get$dartObjectLocalStorage").WebKitAnimation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitAnimation = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitAnimationEvent **************
var dom_WebKitAnimationEvent = {};
// ********** Code for dom_WebKitAnimationList **************
var dom_WebKitAnimationList = {};
$dynamic("get$dartObjectLocalStorage").WebKitAnimationList = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitAnimationList = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitBlobBuilder **************
var dom_WebKitBlobBuilder = {};
$dynamic("get$dartObjectLocalStorage").WebKitBlobBuilder = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitBlobBuilder = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitCSSFilterValue **************
var dom_WebKitCSSFilterValue = {};
// ********** Code for dom_WebKitCSSKeyframeRule **************
var dom_WebKitCSSKeyframeRule = {};
// ********** Code for dom_WebKitCSSKeyframesRule **************
var dom_WebKitCSSKeyframesRule = {};
// ********** Code for dom_WebKitCSSMatrix **************
var dom_WebKitCSSMatrix = {};
$dynamic("get$rotate").WebKitCSSMatrix = function() {
  return this.rotate.bind(this);
}
$dynamic("get$dartObjectLocalStorage").WebKitCSSMatrix = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitCSSMatrix = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").WebKitCSSMatrix = function() {
  return this.toString();
};
// ********** Code for dom_WebKitCSSTransformValue **************
var dom_WebKitCSSTransformValue = {};
// ********** Code for dom_WebKitFlags **************
var dom_WebKitFlags = {};
$dynamic("get$dartObjectLocalStorage").WebKitFlags = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitFlags = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitLoseContext **************
var dom_WebKitLoseContext = {};
$dynamic("get$dartObjectLocalStorage").WebKitLoseContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitLoseContext = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitMutationObserver **************
var dom_WebKitMutationObserver = {};
$dynamic("get$dartObjectLocalStorage").WebKitMutationObserver = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitMutationObserver = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitPoint **************
var dom_WebKitPoint = {};
$dynamic("get$dartObjectLocalStorage").WebKitPoint = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebKitPoint = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_WebKitTransitionEvent **************
var dom_WebKitTransitionEvent = {};
// ********** Code for dom_WebSocket **************
var dom_WebSocket = {};
$dynamic("get$dartObjectLocalStorage").WebSocket = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WebSocket = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").WebSocket = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_WheelEvent **************
var dom_WheelEvent = {};
$dynamic("get$clientX").WheelEvent = function() { return this.clientX; };
$dynamic("set$clientX").WheelEvent = function(value) { return this.clientX = value; };
$dynamic("get$clientY").WheelEvent = function() { return this.clientY; };
$dynamic("set$clientY").WheelEvent = function(value) { return this.clientY = value; };
// ********** Code for dom_Worker **************
var dom_Worker = {};
$dynamic("postMessage$1").Worker = function($0) {
  return this.postMessage($0);
};
$dynamic("postMessage$2").Worker = function($0, $1) {
  return this.postMessage($0, $1);
};
// ********** Code for dom_WorkerContext **************
var dom_WorkerContext = {};
$dynamic("get$dartObjectLocalStorage").WorkerContext = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerContext = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").WorkerContext = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_WorkerLocation **************
var dom_WorkerLocation = {};
$dynamic("get$dartObjectLocalStorage").WorkerLocation = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerLocation = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").WorkerLocation = function() {
  return this.toString();
};
// ********** Code for dom_WorkerNavigator **************
var dom_WorkerNavigator = {};
$dynamic("get$dartObjectLocalStorage").WorkerNavigator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").WorkerNavigator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XMLHttpRequest **************
var dom_XMLHttpRequest = {};
$dynamic("get$dartObjectLocalStorage").XMLHttpRequest = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequest = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").XMLHttpRequest = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_XMLHttpRequestException **************
var dom_XMLHttpRequestException = {};
$dynamic("get$dartObjectLocalStorage").XMLHttpRequestException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequestException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").XMLHttpRequestException = function() {
  return this.toString();
};
// ********** Code for dom_XMLHttpRequestProgressEvent **************
var dom_XMLHttpRequestProgressEvent = {};
// ********** Code for dom_XMLHttpRequestUpload **************
var dom_XMLHttpRequestUpload = {};
$dynamic("get$dartObjectLocalStorage").XMLHttpRequestUpload = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLHttpRequestUpload = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("addEventListener$3").XMLHttpRequestUpload = function($0, $1, $2) {
  return this.addEventListener($0, $wrap_call$1(to$call$1($1)), $2);
};
// ********** Code for dom_XMLSerializer **************
var dom_XMLSerializer = {};
$dynamic("get$dartObjectLocalStorage").XMLSerializer = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XMLSerializer = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathEvaluator **************
var dom_XPathEvaluator = {};
$dynamic("get$dartObjectLocalStorage").XPathEvaluator = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathEvaluator = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathException **************
var dom_XPathException = {};
$dynamic("get$dartObjectLocalStorage").XPathException = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathException = function(value) { return this.dartObjectLocalStorage = value; };
$dynamic("toString$0").XPathException = function() {
  return this.toString();
};
// ********** Code for dom_XPathExpression **************
var dom_XPathExpression = {};
$dynamic("get$dartObjectLocalStorage").XPathExpression = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathExpression = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathNSResolver **************
var dom_XPathNSResolver = {};
$dynamic("get$dartObjectLocalStorage").XPathNSResolver = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathNSResolver = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XPathResult **************
var dom_XPathResult = {};
$dynamic("get$dartObjectLocalStorage").XPathResult = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XPathResult = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for dom_XSLTProcessor **************
var dom_XSLTProcessor = {};
$dynamic("get$dartObjectLocalStorage").XSLTProcessor = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").XSLTProcessor = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for _Collections **************
function _Collections() {}
// ********** Code for _VariableSizeListIterator_T **************
$inherits(_VariableSizeListIterator_T, _VariableSizeListIterator);
function _VariableSizeListIterator_T() {}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator_T);
function _FixedSizeListIterator() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for DOMWrapperBase **************
function DOMWrapperBase() {}
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  // Initializers done
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
DOMWrapperBase.prototype.get$_ptr = function() { return this._ptr; };
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
function EventTargetWrappingImplementation() {}
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
function NodeWrappingImplementation() {}
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
function ElementWrappingImplementation() {}
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
ElementWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector$1(selectors));
}
ElementWrappingImplementation.prototype.get$rect = function() {
  var $this = this; // closure support
  return _createMeasurementFuture((function () {
    return new ElementRectWrappingImplementation($this._ptr);
  })
  , new CompleterImpl());
}
ElementWrappingImplementation.prototype.get$on = function() {
  if (this._on == null) {
    this._on = new ElementEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
AnchorElementWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString$0();
}
AnchorElementWrappingImplementation.prototype.toString$0 = AnchorElementWrappingImplementation.prototype.toString;
// ********** Code for AreaElementWrappingImplementation **************
$inherits(AreaElementWrappingImplementation, ElementWrappingImplementation);
function AreaElementWrappingImplementation() {}
AreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AreaElementWrappingImplementation._wrap$ctor.prototype = AreaElementWrappingImplementation.prototype;
// ********** Code for MediaElementWrappingImplementation **************
$inherits(MediaElementWrappingImplementation, ElementWrappingImplementation);
function MediaElementWrappingImplementation() {}
MediaElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementWrappingImplementation._wrap$ctor.prototype = MediaElementWrappingImplementation.prototype;
MediaElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
MediaElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
// ********** Code for AudioElementWrappingImplementation **************
$inherits(AudioElementWrappingImplementation, MediaElementWrappingImplementation);
function AudioElementWrappingImplementation() {}
AudioElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioElementWrappingImplementation._wrap$ctor.prototype = AudioElementWrappingImplementation.prototype;
// ********** Code for EventWrappingImplementation **************
$inherits(EventWrappingImplementation, DOMWrapperBase);
function EventWrappingImplementation() {}
EventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventWrappingImplementation._wrap$ctor.prototype = EventWrappingImplementation.prototype;
// ********** Code for AudioProcessingEventWrappingImplementation **************
$inherits(AudioProcessingEventWrappingImplementation, EventWrappingImplementation);
function AudioProcessingEventWrappingImplementation() {}
AudioProcessingEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioProcessingEventWrappingImplementation._wrap$ctor.prototype = AudioProcessingEventWrappingImplementation.prototype;
// ********** Code for BRElementWrappingImplementation **************
$inherits(BRElementWrappingImplementation, ElementWrappingImplementation);
function BRElementWrappingImplementation() {}
BRElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BRElementWrappingImplementation._wrap$ctor.prototype = BRElementWrappingImplementation.prototype;
// ********** Code for BaseElementWrappingImplementation **************
$inherits(BaseElementWrappingImplementation, ElementWrappingImplementation);
function BaseElementWrappingImplementation() {}
BaseElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BaseElementWrappingImplementation._wrap$ctor.prototype = BaseElementWrappingImplementation.prototype;
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
ButtonElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for CanvasElementWrappingImplementation **************
$inherits(CanvasElementWrappingImplementation, ElementWrappingImplementation);
function CanvasElementWrappingImplementation() {}
CanvasElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasElementWrappingImplementation._wrap$ctor.prototype = CanvasElementWrappingImplementation.prototype;
CanvasElementWrappingImplementation.prototype.is$CanvasElement = function(){return true};
CanvasElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
CanvasElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
CanvasElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
CanvasElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
CanvasElementWrappingImplementation.prototype.getContext = function(contextId) {
  if (contextId == null) {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext$0());
  }
  else {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext$1(contextId));
  }
}
CanvasElementWrappingImplementation.prototype.getContext$0 = CanvasElementWrappingImplementation.prototype.getContext;
CanvasElementWrappingImplementation.prototype.getContext$1 = CanvasElementWrappingImplementation.prototype.getContext;
// ********** Code for CanvasRenderingContextWrappingImplementation **************
$inherits(CanvasRenderingContextWrappingImplementation, DOMWrapperBase);
function CanvasRenderingContextWrappingImplementation() {}
CanvasRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasRenderingContextWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContextWrappingImplementation.prototype;
CanvasRenderingContextWrappingImplementation.prototype.get$canvas = function() {
  return LevelDom.wrapCanvasElement(this._ptr.get$canvas());
}
// ********** Code for CanvasRenderingContext2DWrappingImplementation **************
$inherits(CanvasRenderingContext2DWrappingImplementation, CanvasRenderingContextWrappingImplementation);
function CanvasRenderingContext2DWrappingImplementation() {}
CanvasRenderingContext2DWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasRenderingContext2DWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContext2DWrappingImplementation.prototype;
CanvasRenderingContext2DWrappingImplementation.prototype.set$fillStyle = function(value) {
  this._ptr.set$fillStyle(LevelDom.unwrapMaybePrimitive(value));
}
CanvasRenderingContext2DWrappingImplementation.prototype.set$font = function(value) {
  this._ptr.set$font(value);
}
CanvasRenderingContext2DWrappingImplementation.prototype.set$strokeStyle = function(value) {
  this._ptr.set$strokeStyle(LevelDom.unwrapMaybePrimitive(value));
}
CanvasRenderingContext2DWrappingImplementation.prototype.arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
  this._ptr.arc$6(x, y, radius, startAngle, endAngle, anticlockwise);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.beginPath = function() {
  this._ptr.beginPath$0();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.clearRect = function(x, y, width, height) {
  this._ptr.clearRect$4(x, y, width, height);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.closePath = function() {
  this._ptr.closePath$0();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.drawImage = function(canvas_OR_image, sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh) {
  if (!!(canvas_OR_image && canvas_OR_image.is$ImageElement())) {
    if (sw_OR_width == null) {
      if (height_OR_sh == null) {
        if (dx == null) {
          if (dy == null) {
            if (dw == null) {
              if (dh == null) {
                this._ptr.drawImage$3(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y);
                return;
              }
            }
          }
        }
      }
    }
    else {
      if (dx == null) {
        if (dy == null) {
          if (dw == null) {
            if (dh == null) {
              this._ptr.drawImage$5(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh);
              return;
            }
          }
        }
      }
      else {
        this._ptr.drawImage$9(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh);
        return;
      }
    }
  }
  else {
    if (!!(canvas_OR_image && canvas_OR_image.is$CanvasElement())) {
      if (sw_OR_width == null) {
        if (height_OR_sh == null) {
          if (dx == null) {
            if (dy == null) {
              if (dw == null) {
                if (dh == null) {
                  this._ptr.drawImage$3(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y);
                  return;
                }
              }
            }
          }
        }
      }
      else {
        if (dx == null) {
          if (dy == null) {
            if (dw == null) {
              if (dh == null) {
                this._ptr.drawImage$5(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh);
                return;
              }
            }
          }
        }
        else {
          this._ptr.drawImage$9(LevelDom.unwrapMaybePrimitive(canvas_OR_image), sx_OR_x, sy_OR_y, sw_OR_width, height_OR_sh, dx, dy, dw, dh);
          return;
        }
      }
    }
  }
  $throw("Incorrect number or type of arguments");
}
CanvasRenderingContext2DWrappingImplementation.prototype.fillText = function(text, x, y, maxWidth) {
  if (maxWidth == null) {
    this._ptr.fillText$3(text, x, y);
    return;
  }
  else {
    this._ptr.fillText$4(text, x, y, maxWidth);
    return;
  }
}
CanvasRenderingContext2DWrappingImplementation.prototype.restore = function() {
  this._ptr.restore$0();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.rotate = function(angle) {
  this._ptr.rotate$1(angle);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.get$rotate = function() {
  return this.rotate.bind(this);
}
CanvasRenderingContext2DWrappingImplementation.prototype.save = function() {
  this._ptr.save$0();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.stroke = function() {
  this._ptr.stroke$0();
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.translate = function(tx, ty) {
  this._ptr.translate$2(tx, ty);
  return;
}
CanvasRenderingContext2DWrappingImplementation.prototype.arc$6 = CanvasRenderingContext2DWrappingImplementation.prototype.arc;
CanvasRenderingContext2DWrappingImplementation.prototype.beginPath$0 = CanvasRenderingContext2DWrappingImplementation.prototype.beginPath;
CanvasRenderingContext2DWrappingImplementation.prototype.clearRect$4 = CanvasRenderingContext2DWrappingImplementation.prototype.clearRect;
CanvasRenderingContext2DWrappingImplementation.prototype.closePath$0 = CanvasRenderingContext2DWrappingImplementation.prototype.closePath;
CanvasRenderingContext2DWrappingImplementation.prototype.drawImage$3 = CanvasRenderingContext2DWrappingImplementation.prototype.drawImage;
CanvasRenderingContext2DWrappingImplementation.prototype.drawImage$5 = CanvasRenderingContext2DWrappingImplementation.prototype.drawImage;
CanvasRenderingContext2DWrappingImplementation.prototype.drawImage$9 = CanvasRenderingContext2DWrappingImplementation.prototype.drawImage;
CanvasRenderingContext2DWrappingImplementation.prototype.fillText$3 = CanvasRenderingContext2DWrappingImplementation.prototype.fillText;
CanvasRenderingContext2DWrappingImplementation.prototype.fillText$4 = CanvasRenderingContext2DWrappingImplementation.prototype.fillText;
CanvasRenderingContext2DWrappingImplementation.prototype.restore$0 = CanvasRenderingContext2DWrappingImplementation.prototype.restore;
CanvasRenderingContext2DWrappingImplementation.prototype.rotate$1 = CanvasRenderingContext2DWrappingImplementation.prototype.rotate;
CanvasRenderingContext2DWrappingImplementation.prototype.save$0 = CanvasRenderingContext2DWrappingImplementation.prototype.save;
CanvasRenderingContext2DWrappingImplementation.prototype.stroke$0 = CanvasRenderingContext2DWrappingImplementation.prototype.stroke;
CanvasRenderingContext2DWrappingImplementation.prototype.translate$2 = CanvasRenderingContext2DWrappingImplementation.prototype.translate;
// ********** Code for ClientRectWrappingImplementation **************
$inherits(ClientRectWrappingImplementation, DOMWrapperBase);
function ClientRectWrappingImplementation() {}
ClientRectWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ClientRectWrappingImplementation._wrap$ctor.prototype = ClientRectWrappingImplementation.prototype;
ClientRectWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ClientRectWrappingImplementation.prototype.get$left = function() {
  return this._ptr.get$left();
}
ClientRectWrappingImplementation.prototype.get$top = function() {
  return this._ptr.get$top();
}
ClientRectWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
// ********** Code for DListElementWrappingImplementation **************
$inherits(DListElementWrappingImplementation, ElementWrappingImplementation);
function DListElementWrappingImplementation() {}
DListElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DListElementWrappingImplementation._wrap$ctor.prototype = DListElementWrappingImplementation.prototype;
// ********** Code for DataListElementWrappingImplementation **************
$inherits(DataListElementWrappingImplementation, ElementWrappingImplementation);
function DataListElementWrappingImplementation() {}
DataListElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataListElementWrappingImplementation._wrap$ctor.prototype = DataListElementWrappingImplementation.prototype;
// ********** Code for DetailsElementWrappingImplementation **************
$inherits(DetailsElementWrappingImplementation, ElementWrappingImplementation);
function DetailsElementWrappingImplementation() {}
DetailsElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DetailsElementWrappingImplementation._wrap$ctor.prototype = DetailsElementWrappingImplementation.prototype;
// ********** Code for DivElementWrappingImplementation **************
$inherits(DivElementWrappingImplementation, ElementWrappingImplementation);
function DivElementWrappingImplementation() {}
DivElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DivElementWrappingImplementation._wrap$ctor.prototype = DivElementWrappingImplementation.prototype;
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
EmbedElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
EmbedElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
EmbedElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
EmbedElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
EmbedElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
EmbedElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for FieldSetElementWrappingImplementation **************
$inherits(FieldSetElementWrappingImplementation, ElementWrappingImplementation);
function FieldSetElementWrappingImplementation() {}
FieldSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FieldSetElementWrappingImplementation._wrap$ctor.prototype = FieldSetElementWrappingImplementation.prototype;
// ********** Code for FontElementWrappingImplementation **************
$inherits(FontElementWrappingImplementation, ElementWrappingImplementation);
function FontElementWrappingImplementation() {}
FontElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FontElementWrappingImplementation._wrap$ctor.prototype = FontElementWrappingImplementation.prototype;
// ********** Code for FormElementWrappingImplementation **************
$inherits(FormElementWrappingImplementation, ElementWrappingImplementation);
function FormElementWrappingImplementation() {}
FormElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FormElementWrappingImplementation._wrap$ctor.prototype = FormElementWrappingImplementation.prototype;
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
HRElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
HRElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for HeadElementWrappingImplementation **************
$inherits(HeadElementWrappingImplementation, ElementWrappingImplementation);
function HeadElementWrappingImplementation() {}
HeadElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadElementWrappingImplementation._wrap$ctor.prototype = HeadElementWrappingImplementation.prototype;
// ********** Code for HeadingElementWrappingImplementation **************
$inherits(HeadingElementWrappingImplementation, ElementWrappingImplementation);
function HeadingElementWrappingImplementation() {}
HeadingElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadingElementWrappingImplementation._wrap$ctor.prototype = HeadingElementWrappingImplementation.prototype;
// ********** Code for IDBVersionChangeEventWrappingImplementation **************
$inherits(IDBVersionChangeEventWrappingImplementation, EventWrappingImplementation);
function IDBVersionChangeEventWrappingImplementation() {}
IDBVersionChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBVersionChangeEventWrappingImplementation._wrap$ctor.prototype = IDBVersionChangeEventWrappingImplementation.prototype;
// ********** Code for IFrameElementWrappingImplementation **************
$inherits(IFrameElementWrappingImplementation, ElementWrappingImplementation);
function IFrameElementWrappingImplementation() {}
IFrameElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
IFrameElementWrappingImplementation._wrap$ctor.prototype = IFrameElementWrappingImplementation.prototype;
IFrameElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
IFrameElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
IFrameElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
IFrameElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
IFrameElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
IFrameElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
ImageElementWrappingImplementation.prototype.is$ImageElement = function(){return true};
ImageElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ImageElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ImageElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
ImageElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
ImageElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
ImageElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
InputElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
InputElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
InputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for KeygenElementWrappingImplementation **************
$inherits(KeygenElementWrappingImplementation, ElementWrappingImplementation);
function KeygenElementWrappingImplementation() {}
KeygenElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeygenElementWrappingImplementation._wrap$ctor.prototype = KeygenElementWrappingImplementation.prototype;
// ********** Code for LIElementWrappingImplementation **************
$inherits(LIElementWrappingImplementation, ElementWrappingImplementation);
function LIElementWrappingImplementation() {}
LIElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LIElementWrappingImplementation._wrap$ctor.prototype = LIElementWrappingImplementation.prototype;
LIElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for LabelElementWrappingImplementation **************
$inherits(LabelElementWrappingImplementation, ElementWrappingImplementation);
function LabelElementWrappingImplementation() {}
LabelElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LabelElementWrappingImplementation._wrap$ctor.prototype = LabelElementWrappingImplementation.prototype;
// ********** Code for LegendElementWrappingImplementation **************
$inherits(LegendElementWrappingImplementation, ElementWrappingImplementation);
function LegendElementWrappingImplementation() {}
LegendElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LegendElementWrappingImplementation._wrap$ctor.prototype = LegendElementWrappingImplementation.prototype;
// ********** Code for LinkElementWrappingImplementation **************
$inherits(LinkElementWrappingImplementation, ElementWrappingImplementation);
function LinkElementWrappingImplementation() {}
LinkElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LinkElementWrappingImplementation._wrap$ctor.prototype = LinkElementWrappingImplementation.prototype;
// ********** Code for MapElementWrappingImplementation **************
$inherits(MapElementWrappingImplementation, ElementWrappingImplementation);
function MapElementWrappingImplementation() {}
MapElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MapElementWrappingImplementation._wrap$ctor.prototype = MapElementWrappingImplementation.prototype;
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
MarqueeElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
MarqueeElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
MarqueeElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
MarqueeElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
MarqueeElementWrappingImplementation.prototype.start = function() {
  this._ptr.start$0();
  return;
}
MarqueeElementWrappingImplementation.prototype.get$start = function() {
  return this.start.bind(this);
}
MarqueeElementWrappingImplementation.prototype.start$0 = MarqueeElementWrappingImplementation.prototype.start;
// ********** Code for MenuElementWrappingImplementation **************
$inherits(MenuElementWrappingImplementation, ElementWrappingImplementation);
function MenuElementWrappingImplementation() {}
MenuElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MenuElementWrappingImplementation._wrap$ctor.prototype = MenuElementWrappingImplementation.prototype;
// ********** Code for MetaElementWrappingImplementation **************
$inherits(MetaElementWrappingImplementation, ElementWrappingImplementation);
function MetaElementWrappingImplementation() {}
MetaElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MetaElementWrappingImplementation._wrap$ctor.prototype = MetaElementWrappingImplementation.prototype;
// ********** Code for MeterElementWrappingImplementation **************
$inherits(MeterElementWrappingImplementation, ElementWrappingImplementation);
function MeterElementWrappingImplementation() {}
MeterElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MeterElementWrappingImplementation._wrap$ctor.prototype = MeterElementWrappingImplementation.prototype;
MeterElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for ModElementWrappingImplementation **************
$inherits(ModElementWrappingImplementation, ElementWrappingImplementation);
function ModElementWrappingImplementation() {}
ModElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ModElementWrappingImplementation._wrap$ctor.prototype = ModElementWrappingImplementation.prototype;
// ********** Code for OListElementWrappingImplementation **************
$inherits(OListElementWrappingImplementation, ElementWrappingImplementation);
function OListElementWrappingImplementation() {}
OListElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OListElementWrappingImplementation._wrap$ctor.prototype = OListElementWrappingImplementation.prototype;
OListElementWrappingImplementation.prototype.get$start = function() {
  return this._ptr.get$start();
}
OListElementWrappingImplementation.prototype.start$0 = function() {
  return this.get$start()();
};
// ********** Code for OfflineAudioCompletionEventWrappingImplementation **************
$inherits(OfflineAudioCompletionEventWrappingImplementation, EventWrappingImplementation);
function OfflineAudioCompletionEventWrappingImplementation() {}
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor.prototype = OfflineAudioCompletionEventWrappingImplementation.prototype;
// ********** Code for OptGroupElementWrappingImplementation **************
$inherits(OptGroupElementWrappingImplementation, ElementWrappingImplementation);
function OptGroupElementWrappingImplementation() {}
OptGroupElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptGroupElementWrappingImplementation._wrap$ctor.prototype = OptGroupElementWrappingImplementation.prototype;
// ********** Code for OptionElementWrappingImplementation **************
$inherits(OptionElementWrappingImplementation, ElementWrappingImplementation);
function OptionElementWrappingImplementation() {}
OptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptionElementWrappingImplementation._wrap$ctor.prototype = OptionElementWrappingImplementation.prototype;
OptionElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for OutputElementWrappingImplementation **************
$inherits(OutputElementWrappingImplementation, ElementWrappingImplementation);
function OutputElementWrappingImplementation() {}
OutputElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OutputElementWrappingImplementation._wrap$ctor.prototype = OutputElementWrappingImplementation.prototype;
OutputElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for ParagraphElementWrappingImplementation **************
$inherits(ParagraphElementWrappingImplementation, ElementWrappingImplementation);
function ParagraphElementWrappingImplementation() {}
ParagraphElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParagraphElementWrappingImplementation._wrap$ctor.prototype = ParagraphElementWrappingImplementation.prototype;
// ********** Code for ParamElementWrappingImplementation **************
$inherits(ParamElementWrappingImplementation, ElementWrappingImplementation);
function ParamElementWrappingImplementation() {}
ParamElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParamElementWrappingImplementation._wrap$ctor.prototype = ParamElementWrappingImplementation.prototype;
ParamElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
PreElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
PreElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for ProgressElementWrappingImplementation **************
$inherits(ProgressElementWrappingImplementation, ElementWrappingImplementation);
function ProgressElementWrappingImplementation() {}
ProgressElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressElementWrappingImplementation._wrap$ctor.prototype = ProgressElementWrappingImplementation.prototype;
ProgressElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for QuoteElementWrappingImplementation **************
$inherits(QuoteElementWrappingImplementation, ElementWrappingImplementation);
function QuoteElementWrappingImplementation() {}
QuoteElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
QuoteElementWrappingImplementation._wrap$ctor.prototype = QuoteElementWrappingImplementation.prototype;
// ********** Code for SVGElementWrappingImplementation **************
$inherits(SVGElementWrappingImplementation, ElementWrappingImplementation);
function SVGElementWrappingImplementation() {}
SVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementWrappingImplementation._wrap$ctor.prototype = SVGElementWrappingImplementation.prototype;
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGAElementWrappingImplementation() {}
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
// ********** Code for SVGAltGlyphDefElementWrappingImplementation **************
$inherits(SVGAltGlyphDefElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGAltGlyphDefElementWrappingImplementation() {}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphDefElementWrappingImplementation.prototype;
// ********** Code for SVGTextContentElementWrappingImplementation **************
$inherits(SVGTextContentElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGTextContentElementWrappingImplementation() {}
SVGTextContentElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextContentElementWrappingImplementation._wrap$ctor.prototype = SVGTextContentElementWrappingImplementation.prototype;
// ********** Code for SVGTextPositioningElementWrappingImplementation **************
$inherits(SVGTextPositioningElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
function SVGTextPositioningElementWrappingImplementation() {}
SVGTextPositioningElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPositioningElementWrappingImplementation._wrap$ctor.prototype = SVGTextPositioningElementWrappingImplementation.prototype;
SVGTextPositioningElementWrappingImplementation.prototype.get$rotate = function() {
  return LevelDom.wrapSVGAnimatedNumberList(this._ptr.get$rotate());
}
SVGTextPositioningElementWrappingImplementation.prototype.rotate$1 = function($0) {
  return this.get$rotate()($0);
};
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
function SVGAltGlyphElementWrappingImplementation() {}
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
// ********** Code for SVGAltGlyphItemElementWrappingImplementation **************
$inherits(SVGAltGlyphItemElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGAltGlyphItemElementWrappingImplementation() {}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphItemElementWrappingImplementation.prototype;
// ********** Code for SVGAnimationElementWrappingImplementation **************
$inherits(SVGAnimationElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGAnimationElementWrappingImplementation() {}
SVGAnimationElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimationElementWrappingImplementation._wrap$ctor.prototype = SVGAnimationElementWrappingImplementation.prototype;
// ********** Code for SVGAnimateColorElementWrappingImplementation **************
$inherits(SVGAnimateColorElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
function SVGAnimateColorElementWrappingImplementation() {}
SVGAnimateColorElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateColorElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateColorElementWrappingImplementation.prototype;
// ********** Code for SVGAnimateElementWrappingImplementation **************
$inherits(SVGAnimateElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
function SVGAnimateElementWrappingImplementation() {}
SVGAnimateElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateElementWrappingImplementation.prototype;
// ********** Code for SVGAnimateMotionElementWrappingImplementation **************
$inherits(SVGAnimateMotionElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
function SVGAnimateMotionElementWrappingImplementation() {}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateMotionElementWrappingImplementation.prototype;
// ********** Code for SVGAnimateTransformElementWrappingImplementation **************
$inherits(SVGAnimateTransformElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
function SVGAnimateTransformElementWrappingImplementation() {}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateTransformElementWrappingImplementation.prototype;
// ********** Code for SVGAnimatedLengthWrappingImplementation **************
$inherits(SVGAnimatedLengthWrappingImplementation, DOMWrapperBase);
function SVGAnimatedLengthWrappingImplementation() {}
SVGAnimatedLengthWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthWrappingImplementation.prototype;
// ********** Code for SVGAnimatedNumberListWrappingImplementation **************
$inherits(SVGAnimatedNumberListWrappingImplementation, DOMWrapperBase);
function SVGAnimatedNumberListWrappingImplementation() {}
SVGAnimatedNumberListWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedNumberListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedNumberListWrappingImplementation.prototype;
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGCircleElementWrappingImplementation() {}
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
// ********** Code for SVGClipPathElementWrappingImplementation **************
$inherits(SVGClipPathElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGClipPathElementWrappingImplementation() {}
SVGClipPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGClipPathElementWrappingImplementation._wrap$ctor.prototype = SVGClipPathElementWrappingImplementation.prototype;
// ********** Code for SVGComponentTransferFunctionElementWrappingImplementation **************
$inherits(SVGComponentTransferFunctionElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGComponentTransferFunctionElementWrappingImplementation() {}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.prototype = SVGComponentTransferFunctionElementWrappingImplementation.prototype;
// ********** Code for SVGCursorElementWrappingImplementation **************
$inherits(SVGCursorElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGCursorElementWrappingImplementation() {}
SVGCursorElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCursorElementWrappingImplementation._wrap$ctor.prototype = SVGCursorElementWrappingImplementation.prototype;
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGDefsElementWrappingImplementation() {}
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
// ********** Code for SVGDescElementWrappingImplementation **************
$inherits(SVGDescElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGDescElementWrappingImplementation() {}
SVGDescElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDescElementWrappingImplementation._wrap$ctor.prototype = SVGDescElementWrappingImplementation.prototype;
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGEllipseElementWrappingImplementation() {}
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
// ********** Code for SVGFEBlendElementWrappingImplementation **************
$inherits(SVGFEBlendElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEBlendElementWrappingImplementation() {}
SVGFEBlendElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEBlendElementWrappingImplementation._wrap$ctor.prototype = SVGFEBlendElementWrappingImplementation.prototype;
SVGFEBlendElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEBlendElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEColorMatrixElementWrappingImplementation **************
$inherits(SVGFEColorMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEColorMatrixElementWrappingImplementation() {}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEColorMatrixElementWrappingImplementation.prototype;
SVGFEColorMatrixElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEColorMatrixElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEComponentTransferElementWrappingImplementation **************
$inherits(SVGFEComponentTransferElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEComponentTransferElementWrappingImplementation() {}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor.prototype = SVGFEComponentTransferElementWrappingImplementation.prototype;
SVGFEComponentTransferElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEComponentTransferElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEConvolveMatrixElementWrappingImplementation **************
$inherits(SVGFEConvolveMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEConvolveMatrixElementWrappingImplementation() {}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEConvolveMatrixElementWrappingImplementation.prototype;
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEDiffuseLightingElementWrappingImplementation **************
$inherits(SVGFEDiffuseLightingElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEDiffuseLightingElementWrappingImplementation() {}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFEDiffuseLightingElementWrappingImplementation.prototype;
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEDisplacementMapElementWrappingImplementation **************
$inherits(SVGFEDisplacementMapElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEDisplacementMapElementWrappingImplementation() {}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor.prototype = SVGFEDisplacementMapElementWrappingImplementation.prototype;
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDisplacementMapElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEDistantLightElementWrappingImplementation **************
$inherits(SVGFEDistantLightElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEDistantLightElementWrappingImplementation() {}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEDistantLightElementWrappingImplementation.prototype;
// ********** Code for SVGFEDropShadowElementWrappingImplementation **************
$inherits(SVGFEDropShadowElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEDropShadowElementWrappingImplementation() {}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor.prototype = SVGFEDropShadowElementWrappingImplementation.prototype;
SVGFEDropShadowElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEDropShadowElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEFloodElementWrappingImplementation **************
$inherits(SVGFEFloodElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEFloodElementWrappingImplementation() {}
SVGFEFloodElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFloodElementWrappingImplementation._wrap$ctor.prototype = SVGFEFloodElementWrappingImplementation.prototype;
SVGFEFloodElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEFloodElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEFuncAElementWrappingImplementation **************
$inherits(SVGFEFuncAElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
function SVGFEFuncAElementWrappingImplementation() {}
SVGFEFuncAElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncAElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncAElementWrappingImplementation.prototype;
// ********** Code for SVGFEFuncBElementWrappingImplementation **************
$inherits(SVGFEFuncBElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
function SVGFEFuncBElementWrappingImplementation() {}
SVGFEFuncBElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncBElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncBElementWrappingImplementation.prototype;
// ********** Code for SVGFEFuncGElementWrappingImplementation **************
$inherits(SVGFEFuncGElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
function SVGFEFuncGElementWrappingImplementation() {}
SVGFEFuncGElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncGElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncGElementWrappingImplementation.prototype;
// ********** Code for SVGFEFuncRElementWrappingImplementation **************
$inherits(SVGFEFuncRElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
function SVGFEFuncRElementWrappingImplementation() {}
SVGFEFuncRElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncRElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncRElementWrappingImplementation.prototype;
// ********** Code for SVGFEGaussianBlurElementWrappingImplementation **************
$inherits(SVGFEGaussianBlurElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEGaussianBlurElementWrappingImplementation() {}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor.prototype = SVGFEGaussianBlurElementWrappingImplementation.prototype;
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEGaussianBlurElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEImageElementWrappingImplementation **************
$inherits(SVGFEImageElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEImageElementWrappingImplementation() {}
SVGFEImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEImageElementWrappingImplementation._wrap$ctor.prototype = SVGFEImageElementWrappingImplementation.prototype;
SVGFEImageElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEImageElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEMergeElementWrappingImplementation **************
$inherits(SVGFEMergeElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEMergeElementWrappingImplementation() {}
SVGFEMergeElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeElementWrappingImplementation.prototype;
SVGFEMergeElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEMergeElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEMergeNodeElementWrappingImplementation **************
$inherits(SVGFEMergeNodeElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEMergeNodeElementWrappingImplementation() {}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeNodeElementWrappingImplementation.prototype;
// ********** Code for SVGFEOffsetElementWrappingImplementation **************
$inherits(SVGFEOffsetElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEOffsetElementWrappingImplementation() {}
SVGFEOffsetElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEOffsetElementWrappingImplementation._wrap$ctor.prototype = SVGFEOffsetElementWrappingImplementation.prototype;
SVGFEOffsetElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFEOffsetElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFEPointLightElementWrappingImplementation **************
$inherits(SVGFEPointLightElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFEPointLightElementWrappingImplementation() {}
SVGFEPointLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEPointLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEPointLightElementWrappingImplementation.prototype;
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
SVGFESpecularLightingElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFESpecularLightingElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFESpotLightElementWrappingImplementation **************
$inherits(SVGFESpotLightElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFESpotLightElementWrappingImplementation() {}
SVGFESpotLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpotLightElementWrappingImplementation._wrap$ctor.prototype = SVGFESpotLightElementWrappingImplementation.prototype;
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
SVGFETileElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFETileElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFETurbulenceElementWrappingImplementation **************
$inherits(SVGFETurbulenceElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFETurbulenceElementWrappingImplementation() {}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor.prototype = SVGFETurbulenceElementWrappingImplementation.prototype;
SVGFETurbulenceElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFETurbulenceElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFilterElementWrappingImplementation **************
$inherits(SVGFilterElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFilterElementWrappingImplementation() {}
SVGFilterElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterElementWrappingImplementation._wrap$ctor.prototype = SVGFilterElementWrappingImplementation.prototype;
SVGFilterElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGFilterElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGFontElementWrappingImplementation **************
$inherits(SVGFontElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontElementWrappingImplementation() {}
SVGFontElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontElementWrappingImplementation._wrap$ctor.prototype = SVGFontElementWrappingImplementation.prototype;
// ********** Code for SVGFontFaceElementWrappingImplementation **************
$inherits(SVGFontFaceElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontFaceElementWrappingImplementation() {}
SVGFontFaceElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceElementWrappingImplementation.prototype;
// ********** Code for SVGFontFaceFormatElementWrappingImplementation **************
$inherits(SVGFontFaceFormatElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontFaceFormatElementWrappingImplementation() {}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceFormatElementWrappingImplementation.prototype;
// ********** Code for SVGFontFaceNameElementWrappingImplementation **************
$inherits(SVGFontFaceNameElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontFaceNameElementWrappingImplementation() {}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceNameElementWrappingImplementation.prototype;
// ********** Code for SVGFontFaceSrcElementWrappingImplementation **************
$inherits(SVGFontFaceSrcElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontFaceSrcElementWrappingImplementation() {}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceSrcElementWrappingImplementation.prototype;
// ********** Code for SVGFontFaceUriElementWrappingImplementation **************
$inherits(SVGFontFaceUriElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGFontFaceUriElementWrappingImplementation() {}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceUriElementWrappingImplementation.prototype;
// ********** Code for SVGForeignObjectElementWrappingImplementation **************
$inherits(SVGForeignObjectElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGForeignObjectElementWrappingImplementation() {}
SVGForeignObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGForeignObjectElementWrappingImplementation._wrap$ctor.prototype = SVGForeignObjectElementWrappingImplementation.prototype;
SVGForeignObjectElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGForeignObjectElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGGElementWrappingImplementation **************
$inherits(SVGGElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGGElementWrappingImplementation() {}
SVGGElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGElementWrappingImplementation._wrap$ctor.prototype = SVGGElementWrappingImplementation.prototype;
// ********** Code for SVGGlyphElementWrappingImplementation **************
$inherits(SVGGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGGlyphElementWrappingImplementation() {}
SVGGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphElementWrappingImplementation.prototype;
// ********** Code for SVGGlyphRefElementWrappingImplementation **************
$inherits(SVGGlyphRefElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGGlyphRefElementWrappingImplementation() {}
SVGGlyphRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphRefElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphRefElementWrappingImplementation.prototype;
// ********** Code for SVGGradientElementWrappingImplementation **************
$inherits(SVGGradientElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGGradientElementWrappingImplementation() {}
SVGGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGradientElementWrappingImplementation._wrap$ctor.prototype = SVGGradientElementWrappingImplementation.prototype;
// ********** Code for SVGHKernElementWrappingImplementation **************
$inherits(SVGHKernElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGHKernElementWrappingImplementation() {}
SVGHKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGHKernElementWrappingImplementation._wrap$ctor.prototype = SVGHKernElementWrappingImplementation.prototype;
// ********** Code for SVGImageElementWrappingImplementation **************
$inherits(SVGImageElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGImageElementWrappingImplementation() {}
SVGImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGImageElementWrappingImplementation._wrap$ctor.prototype = SVGImageElementWrappingImplementation.prototype;
SVGImageElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGImageElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGLineElementWrappingImplementation() {}
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
// ********** Code for SVGLinearGradientElementWrappingImplementation **************
$inherits(SVGLinearGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
function SVGLinearGradientElementWrappingImplementation() {}
SVGLinearGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLinearGradientElementWrappingImplementation._wrap$ctor.prototype = SVGLinearGradientElementWrappingImplementation.prototype;
// ********** Code for SVGMPathElementWrappingImplementation **************
$inherits(SVGMPathElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGMPathElementWrappingImplementation() {}
SVGMPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMPathElementWrappingImplementation._wrap$ctor.prototype = SVGMPathElementWrappingImplementation.prototype;
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGMarkerElementWrappingImplementation() {}
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
// ********** Code for SVGMaskElementWrappingImplementation **************
$inherits(SVGMaskElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGMaskElementWrappingImplementation() {}
SVGMaskElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMaskElementWrappingImplementation._wrap$ctor.prototype = SVGMaskElementWrappingImplementation.prototype;
SVGMaskElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGMaskElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGMetadataElementWrappingImplementation **************
$inherits(SVGMetadataElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGMetadataElementWrappingImplementation() {}
SVGMetadataElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMetadataElementWrappingImplementation._wrap$ctor.prototype = SVGMetadataElementWrappingImplementation.prototype;
// ********** Code for SVGMissingGlyphElementWrappingImplementation **************
$inherits(SVGMissingGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGMissingGlyphElementWrappingImplementation() {}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGMissingGlyphElementWrappingImplementation.prototype;
// ********** Code for SVGPathElementWrappingImplementation **************
$inherits(SVGPathElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGPathElementWrappingImplementation() {}
SVGPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathElementWrappingImplementation._wrap$ctor.prototype = SVGPathElementWrappingImplementation.prototype;
// ********** Code for SVGPatternElementWrappingImplementation **************
$inherits(SVGPatternElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGPatternElementWrappingImplementation() {}
SVGPatternElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPatternElementWrappingImplementation._wrap$ctor.prototype = SVGPatternElementWrappingImplementation.prototype;
SVGPatternElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGPatternElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGPolygonElementWrappingImplementation **************
$inherits(SVGPolygonElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGPolygonElementWrappingImplementation() {}
SVGPolygonElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolygonElementWrappingImplementation._wrap$ctor.prototype = SVGPolygonElementWrappingImplementation.prototype;
// ********** Code for SVGPolylineElementWrappingImplementation **************
$inherits(SVGPolylineElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGPolylineElementWrappingImplementation() {}
SVGPolylineElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolylineElementWrappingImplementation._wrap$ctor.prototype = SVGPolylineElementWrappingImplementation.prototype;
// ********** Code for SVGRadialGradientElementWrappingImplementation **************
$inherits(SVGRadialGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
function SVGRadialGradientElementWrappingImplementation() {}
SVGRadialGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRadialGradientElementWrappingImplementation._wrap$ctor.prototype = SVGRadialGradientElementWrappingImplementation.prototype;
// ********** Code for SVGRectElementWrappingImplementation **************
$inherits(SVGRectElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGRectElementWrappingImplementation() {}
SVGRectElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRectElementWrappingImplementation._wrap$ctor.prototype = SVGRectElementWrappingImplementation.prototype;
SVGRectElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGRectElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGScriptElementWrappingImplementation **************
$inherits(SVGScriptElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGScriptElementWrappingImplementation() {}
SVGScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGScriptElementWrappingImplementation._wrap$ctor.prototype = SVGScriptElementWrappingImplementation.prototype;
// ********** Code for SVGSetElementWrappingImplementation **************
$inherits(SVGSetElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
function SVGSetElementWrappingImplementation() {}
SVGSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSetElementWrappingImplementation._wrap$ctor.prototype = SVGSetElementWrappingImplementation.prototype;
// ********** Code for SVGStopElementWrappingImplementation **************
$inherits(SVGStopElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGStopElementWrappingImplementation() {}
SVGStopElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStopElementWrappingImplementation._wrap$ctor.prototype = SVGStopElementWrappingImplementation.prototype;
// ********** Code for SVGStyleElementWrappingImplementation **************
$inherits(SVGStyleElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGStyleElementWrappingImplementation() {}
SVGStyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStyleElementWrappingImplementation._wrap$ctor.prototype = SVGStyleElementWrappingImplementation.prototype;
// ********** Code for SVGSwitchElementWrappingImplementation **************
$inherits(SVGSwitchElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGSwitchElementWrappingImplementation() {}
SVGSwitchElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSwitchElementWrappingImplementation._wrap$ctor.prototype = SVGSwitchElementWrappingImplementation.prototype;
// ********** Code for SVGSymbolElementWrappingImplementation **************
$inherits(SVGSymbolElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGSymbolElementWrappingImplementation() {}
SVGSymbolElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSymbolElementWrappingImplementation._wrap$ctor.prototype = SVGSymbolElementWrappingImplementation.prototype;
// ********** Code for SVGTRefElementWrappingImplementation **************
$inherits(SVGTRefElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
function SVGTRefElementWrappingImplementation() {}
SVGTRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTRefElementWrappingImplementation._wrap$ctor.prototype = SVGTRefElementWrappingImplementation.prototype;
// ********** Code for SVGTSpanElementWrappingImplementation **************
$inherits(SVGTSpanElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
function SVGTSpanElementWrappingImplementation() {}
SVGTSpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTSpanElementWrappingImplementation._wrap$ctor.prototype = SVGTSpanElementWrappingImplementation.prototype;
// ********** Code for SVGTextElementWrappingImplementation **************
$inherits(SVGTextElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
function SVGTextElementWrappingImplementation() {}
SVGTextElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextElementWrappingImplementation._wrap$ctor.prototype = SVGTextElementWrappingImplementation.prototype;
// ********** Code for SVGTextPathElementWrappingImplementation **************
$inherits(SVGTextPathElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
function SVGTextPathElementWrappingImplementation() {}
SVGTextPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPathElementWrappingImplementation._wrap$ctor.prototype = SVGTextPathElementWrappingImplementation.prototype;
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGTitleElementWrappingImplementation() {}
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
// ********** Code for SVGUseElementWrappingImplementation **************
$inherits(SVGUseElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGUseElementWrappingImplementation() {}
SVGUseElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGUseElementWrappingImplementation._wrap$ctor.prototype = SVGUseElementWrappingImplementation.prototype;
SVGUseElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGUseElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for SVGVKernElementWrappingImplementation **************
$inherits(SVGVKernElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGVKernElementWrappingImplementation() {}
SVGVKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGVKernElementWrappingImplementation._wrap$ctor.prototype = SVGVKernElementWrappingImplementation.prototype;
// ********** Code for SVGViewElementWrappingImplementation **************
$inherits(SVGViewElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGViewElementWrappingImplementation() {}
SVGViewElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewElementWrappingImplementation._wrap$ctor.prototype = SVGViewElementWrappingImplementation.prototype;
// ********** Code for UIEventWrappingImplementation **************
$inherits(UIEventWrappingImplementation, EventWrappingImplementation);
function UIEventWrappingImplementation() {}
UIEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
UIEventWrappingImplementation._wrap$ctor.prototype = UIEventWrappingImplementation.prototype;
// ********** Code for SVGZoomEventWrappingImplementation **************
$inherits(SVGZoomEventWrappingImplementation, UIEventWrappingImplementation);
function SVGZoomEventWrappingImplementation() {}
SVGZoomEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGZoomEventWrappingImplementation._wrap$ctor.prototype = SVGZoomEventWrappingImplementation.prototype;
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
ScriptElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
ScriptElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
// ********** Code for SelectElementWrappingImplementation **************
$inherits(SelectElementWrappingImplementation, ElementWrappingImplementation);
function SelectElementWrappingImplementation() {}
SelectElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SelectElementWrappingImplementation._wrap$ctor.prototype = SelectElementWrappingImplementation.prototype;
SelectElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for SourceElementWrappingImplementation **************
$inherits(SourceElementWrappingImplementation, ElementWrappingImplementation);
function SourceElementWrappingImplementation() {}
SourceElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SourceElementWrappingImplementation._wrap$ctor.prototype = SourceElementWrappingImplementation.prototype;
SourceElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
SourceElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
// ********** Code for SpanElementWrappingImplementation **************
$inherits(SpanElementWrappingImplementation, ElementWrappingImplementation);
function SpanElementWrappingImplementation() {}
SpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpanElementWrappingImplementation._wrap$ctor.prototype = SpanElementWrappingImplementation.prototype;
// ********** Code for SpeechInputEventWrappingImplementation **************
$inherits(SpeechInputEventWrappingImplementation, EventWrappingImplementation);
function SpeechInputEventWrappingImplementation() {}
SpeechInputEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpeechInputEventWrappingImplementation._wrap$ctor.prototype = SpeechInputEventWrappingImplementation.prototype;
// ********** Code for StyleElementWrappingImplementation **************
$inherits(StyleElementWrappingImplementation, ElementWrappingImplementation);
function StyleElementWrappingImplementation() {}
StyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
StyleElementWrappingImplementation._wrap$ctor.prototype = StyleElementWrappingImplementation.prototype;
// ********** Code for TableCaptionElementWrappingImplementation **************
$inherits(TableCaptionElementWrappingImplementation, ElementWrappingImplementation);
function TableCaptionElementWrappingImplementation() {}
TableCaptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCaptionElementWrappingImplementation._wrap$ctor.prototype = TableCaptionElementWrappingImplementation.prototype;
// ********** Code for TableCellElementWrappingImplementation **************
$inherits(TableCellElementWrappingImplementation, ElementWrappingImplementation);
function TableCellElementWrappingImplementation() {}
TableCellElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCellElementWrappingImplementation._wrap$ctor.prototype = TableCellElementWrappingImplementation.prototype;
TableCellElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
TableCellElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
TableCellElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableCellElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
TableColElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableColElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
TableElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
TableElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for TableRowElementWrappingImplementation **************
$inherits(TableRowElementWrappingImplementation, ElementWrappingImplementation);
function TableRowElementWrappingImplementation() {}
TableRowElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableRowElementWrappingImplementation._wrap$ctor.prototype = TableRowElementWrappingImplementation.prototype;
// ********** Code for TableSectionElementWrappingImplementation **************
$inherits(TableSectionElementWrappingImplementation, ElementWrappingImplementation);
function TableSectionElementWrappingImplementation() {}
TableSectionElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableSectionElementWrappingImplementation._wrap$ctor.prototype = TableSectionElementWrappingImplementation.prototype;
// ********** Code for TextAreaElementWrappingImplementation **************
$inherits(TextAreaElementWrappingImplementation, ElementWrappingImplementation);
function TextAreaElementWrappingImplementation() {}
TextAreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextAreaElementWrappingImplementation._wrap$ctor.prototype = TextAreaElementWrappingImplementation.prototype;
TextAreaElementWrappingImplementation.prototype.get$value = function() {
  return this._ptr.get$value();
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
function TitleElementWrappingImplementation() {}
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
// ********** Code for TrackElementWrappingImplementation **************
$inherits(TrackElementWrappingImplementation, ElementWrappingImplementation);
function TrackElementWrappingImplementation() {}
TrackElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TrackElementWrappingImplementation._wrap$ctor.prototype = TrackElementWrappingImplementation.prototype;
TrackElementWrappingImplementation.prototype.get$src = function() {
  return this._ptr.get$src();
}
TrackElementWrappingImplementation.prototype.set$src = function(value) {
  this._ptr.set$src(value);
}
// ********** Code for UListElementWrappingImplementation **************
$inherits(UListElementWrappingImplementation, ElementWrappingImplementation);
function UListElementWrappingImplementation() {}
UListElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UListElementWrappingImplementation._wrap$ctor.prototype = UListElementWrappingImplementation.prototype;
// ********** Code for UnknownElementWrappingImplementation **************
$inherits(UnknownElementWrappingImplementation, ElementWrappingImplementation);
function UnknownElementWrappingImplementation() {}
UnknownElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UnknownElementWrappingImplementation._wrap$ctor.prototype = UnknownElementWrappingImplementation.prototype;
// ********** Code for VideoElementWrappingImplementation **************
$inherits(VideoElementWrappingImplementation, MediaElementWrappingImplementation);
function VideoElementWrappingImplementation() {}
VideoElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
VideoElementWrappingImplementation._wrap$ctor.prototype = VideoElementWrappingImplementation.prototype;
VideoElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
VideoElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
VideoElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
VideoElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for WebGLContextEventWrappingImplementation **************
$inherits(WebGLContextEventWrappingImplementation, EventWrappingImplementation);
function WebGLContextEventWrappingImplementation() {}
WebGLContextEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLContextEventWrappingImplementation._wrap$ctor.prototype = WebGLContextEventWrappingImplementation.prototype;
// ********** Code for WebGLRenderingContextWrappingImplementation **************
$inherits(WebGLRenderingContextWrappingImplementation, CanvasRenderingContextWrappingImplementation);
function WebGLRenderingContextWrappingImplementation() {}
WebGLRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLRenderingContextWrappingImplementation._wrap$ctor.prototype = WebGLRenderingContextWrappingImplementation.prototype;
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapCanvasElement = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new CanvasElementWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapCanvasRenderingContext = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CanvasRenderingContext":

      return new CanvasRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext2D":

      return new CanvasRenderingContext2DWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderingContext":

      return new WebGLRenderingContextWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException("Unknown type:" + raw.toString$0()));

  }
}
LevelDom.wrapClientRect = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new ClientRectWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDocument = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException("Unknown type:" + raw.toString$0()));

  }
}
LevelDom.wrapElement = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException("Unknown type:" + raw.toString$0()));

  }
}
LevelDom.wrapEvent = function(raw) {
  if (raw == null) {
    return null;
  }
  if (raw.get$dartObjectLocalStorage() != null) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "WebKitAnimationEvent":

      return new AnimationEventWrappingImplementation._wrap$ctor(raw);

    case "AudioProcessingEvent":

      return new AudioProcessingEventWrappingImplementation._wrap$ctor(raw);

    case "BeforeLoadEvent":

      return new BeforeLoadEventWrappingImplementation._wrap$ctor(raw);

    case "CloseEvent":

      return new CloseEventWrappingImplementation._wrap$ctor(raw);

    case "CompositionEvent":

      return new CompositionEventWrappingImplementation._wrap$ctor(raw);

    case "CustomEvent":

      return new CustomEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceMotionEvent":

      return new DeviceMotionEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceOrientationEvent":

      return new DeviceOrientationEventWrappingImplementation._wrap$ctor(raw);

    case "ErrorEvent":

      return new ErrorEventWrappingImplementation._wrap$ctor(raw);

    case "Event":

      return new EventWrappingImplementation._wrap$ctor(raw);

    case "HashChangeEvent":

      return new HashChangeEventWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeEvent":

      return new IDBVersionChangeEventWrappingImplementation._wrap$ctor(raw);

    case "KeyboardEvent":

      return new KeyboardEventWrappingImplementation._wrap$ctor(raw);

    case "MessageEvent":

      return new MessageEventWrappingImplementation._wrap$ctor(raw);

    case "MouseEvent":

      return new MouseEventWrappingImplementation._wrap$ctor(raw);

    case "MutationEvent":

      return new MutationEventWrappingImplementation._wrap$ctor(raw);

    case "OfflineAudioCompletionEvent":

      return new OfflineAudioCompletionEventWrappingImplementation._wrap$ctor(raw);

    case "OverflowEvent":

      return new OverflowEventWrappingImplementation._wrap$ctor(raw);

    case "PageTransitionEvent":

      return new PageTransitionEventWrappingImplementation._wrap$ctor(raw);

    case "PopStateEvent":

      return new PopStateEventWrappingImplementation._wrap$ctor(raw);

    case "ProgressEvent":

      return new ProgressEventWrappingImplementation._wrap$ctor(raw);

    case "SVGZoomEvent":

      return new SVGZoomEventWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputEvent":

      return new SpeechInputEventWrappingImplementation._wrap$ctor(raw);

    case "StorageEvent":

      return new StorageEventWrappingImplementation._wrap$ctor(raw);

    case "TextEvent":

      return new TextEventWrappingImplementation._wrap$ctor(raw);

    case "TouchEvent":

      return new TouchEventWrappingImplementation._wrap$ctor(raw);

    case "WebKitTransitionEvent":

      return new TransitionEventWrappingImplementation._wrap$ctor(raw);

    case "UIEvent":

      return new UIEventWrappingImplementation._wrap$ctor(raw);

    case "WebGLContextEvent":

      return new WebGLContextEventWrappingImplementation._wrap$ctor(raw);

    case "WheelEvent":

      return new WheelEventWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestProgressEvent":

      return new XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException("Unknown type:" + raw.toString$0()));

  }
}
LevelDom.wrapSVGAnimatedLength = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedLengthWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGAnimatedNumberList = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new SVGAnimatedNumberListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapWindow = function(raw) {
  return raw == null ? null : raw.get$dartObjectLocalStorage() != null ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.unwrapMaybePrimitive = function(raw) {
  return (raw == null || (typeof(raw) == 'string') || (typeof(raw) == 'number') || (typeof(raw) == 'boolean')) ? raw : raw.get$_ptr();
}
LevelDom.unwrap = function(raw) {
  return raw == null ? null : raw.get$_ptr();
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for AnimationEventWrappingImplementation **************
$inherits(AnimationEventWrappingImplementation, EventWrappingImplementation);
function AnimationEventWrappingImplementation() {}
AnimationEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnimationEventWrappingImplementation._wrap$ctor.prototype = AnimationEventWrappingImplementation.prototype;
// ********** Code for BeforeLoadEventWrappingImplementation **************
$inherits(BeforeLoadEventWrappingImplementation, EventWrappingImplementation);
function BeforeLoadEventWrappingImplementation() {}
BeforeLoadEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
BeforeLoadEventWrappingImplementation._wrap$ctor.prototype = BeforeLoadEventWrappingImplementation.prototype;
// ********** Code for BodyElementWrappingImplementation **************
$inherits(BodyElementWrappingImplementation, ElementWrappingImplementation);
function BodyElementWrappingImplementation() {}
BodyElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BodyElementWrappingImplementation._wrap$ctor.prototype = BodyElementWrappingImplementation.prototype;
// ********** Code for CloseEventWrappingImplementation **************
$inherits(CloseEventWrappingImplementation, EventWrappingImplementation);
function CloseEventWrappingImplementation() {}
CloseEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CloseEventWrappingImplementation._wrap$ctor.prototype = CloseEventWrappingImplementation.prototype;
// ********** Code for CompositionEventWrappingImplementation **************
$inherits(CompositionEventWrappingImplementation, UIEventWrappingImplementation);
function CompositionEventWrappingImplementation() {}
CompositionEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CompositionEventWrappingImplementation._wrap$ctor.prototype = CompositionEventWrappingImplementation.prototype;
// ********** Code for CustomEventWrappingImplementation **************
$inherits(CustomEventWrappingImplementation, EventWrappingImplementation);
function CustomEventWrappingImplementation() {}
CustomEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CustomEventWrappingImplementation._wrap$ctor.prototype = CustomEventWrappingImplementation.prototype;
// ********** Code for DeviceMotionEventWrappingImplementation **************
$inherits(DeviceMotionEventWrappingImplementation, EventWrappingImplementation);
function DeviceMotionEventWrappingImplementation() {}
DeviceMotionEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceMotionEventWrappingImplementation._wrap$ctor.prototype = DeviceMotionEventWrappingImplementation.prototype;
// ********** Code for DeviceOrientationEventWrappingImplementation **************
$inherits(DeviceOrientationEventWrappingImplementation, EventWrappingImplementation);
function DeviceOrientationEventWrappingImplementation() {}
DeviceOrientationEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceOrientationEventWrappingImplementation._wrap$ctor.prototype = DeviceOrientationEventWrappingImplementation.prototype;
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
function DocumentWrappingImplementation() {}
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
// ********** Code for EventsImplementation **************
function EventsImplementation() {}
EventsImplementation._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  // Initializers done
  this._listenerMap = new HashMapImplementation();
}
EventsImplementation._wrap$ctor.prototype = EventsImplementation.prototype;
EventsImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventsImplementation.prototype.set$_ptr = function(value) { return this._ptr = value; };
EventsImplementation.prototype._get = function(type) {
  var $this = this; // closure support
  return this._listenerMap.putIfAbsent(type, (function () {
    return new EventListenerListImplementation($this._ptr, type);
  })
  );
}
// ********** Code for ElementEventsImplementation **************
$inherits(ElementEventsImplementation, EventsImplementation);
function ElementEventsImplementation() {}
ElementEventsImplementation._wrap$ctor = function(_ptr) {
  // Initializers done
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
ElementEventsImplementation._wrap$ctor.prototype = ElementEventsImplementation.prototype;
ElementEventsImplementation.prototype.get$click = function() {
  return this._get("click");
}
ElementEventsImplementation.prototype.get$error = function() {
  return this._get("error");
}
ElementEventsImplementation.prototype.get$load = function() {
  return this._get("load");
}
ElementEventsImplementation.prototype.get$mouseMove = function() {
  return this._get("mousemove");
}
// ********** Code for SimpleClientRect **************
function SimpleClientRect(left, top, width, height) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  // Initializers done
}
SimpleClientRect.prototype.get$left = function() { return this.left; };
SimpleClientRect.prototype.get$top = function() { return this.top; };
SimpleClientRect.prototype.get$width = function() { return this.width; };
SimpleClientRect.prototype.get$height = function() { return this.height; };
SimpleClientRect.prototype.$eq = function(other) {
  return other != null && this.left == other.get$left() && this.top == other.get$top() && this.width == other.get$width() && this.height == other.get$height();
}
SimpleClientRect.prototype.toString = function() {
  return ("(" + this.left + ", " + this.top + ", " + this.width + ", " + this.height + ")");
}
SimpleClientRect.prototype.toString$0 = SimpleClientRect.prototype.toString;
// ********** Code for ElementRectWrappingImplementation **************
function ElementRectWrappingImplementation(element) {
  this.client = new SimpleClientRect(element.clientLeft, element.clientTop, element.clientWidth, element.clientHeight);
  this.offset = new SimpleClientRect(element.offsetLeft, element.offsetTop, element.offsetWidth, element.offsetHeight);
  this.scroll = new SimpleClientRect(element.scrollLeft, element.scrollTop, element.scrollWidth, element.scrollHeight);
  this._boundingClientRect = element.getBoundingClientRect();
  this._clientRects = element.getClientRects();
  // Initializers done
}
ElementRectWrappingImplementation.prototype.get$bounding = function() {
  return LevelDom.wrapClientRect(this._boundingClientRect);
}
// ********** Code for ErrorEventWrappingImplementation **************
$inherits(ErrorEventWrappingImplementation, EventWrappingImplementation);
function ErrorEventWrappingImplementation() {}
ErrorEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ErrorEventWrappingImplementation._wrap$ctor.prototype = ErrorEventWrappingImplementation.prototype;
// ********** Code for _EventListenerWrapper **************
function _EventListenerWrapper(raw, wrapped, useCapture) {
  this.raw = raw;
  this.wrapped = wrapped;
  this.useCapture = useCapture;
  // Initializers done
}
// ********** Code for EventListenerListImplementation **************
function EventListenerListImplementation(_ptr, _type) {
  this._ptr = _ptr;
  this._type = _type;
  this._wrappers = new Array();
  // Initializers done
}
EventListenerListImplementation.prototype.get$_ptr = function() { return this._ptr; };
EventListenerListImplementation.prototype.add = function(listener, useCapture) {
  this._add(listener, useCapture);
  return this;
}
EventListenerListImplementation.prototype._add = function(listener, useCapture) {
  this._ptr.addEventListener$3(this._type, this._findOrAddWrapper(listener, useCapture), useCapture);
}
EventListenerListImplementation.prototype._findOrAddWrapper = function(listener, useCapture) {
  if (this._wrappers == null) {
    this._wrappers = [];
  }
  else {
    var $$list = this._wrappers;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var wrapper = $$list.$index($$i);
      if (wrapper.raw === listener && $eq(wrapper.useCapture, useCapture)) {
        return wrapper.wrapped;
      }
    }
  }
  var wrapped = (function (e) {
    listener(LevelDom.wrapEvent(e));
  })
  ;
  this._wrappers.add(new _EventListenerWrapper(listener, wrapped, useCapture));
  return wrapped;
}
EventListenerListImplementation.prototype.add$1 = function($0) {
  return this.add(to$call$1($0), false);
};
// ********** Code for HashChangeEventWrappingImplementation **************
$inherits(HashChangeEventWrappingImplementation, EventWrappingImplementation);
function HashChangeEventWrappingImplementation() {}
HashChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
HashChangeEventWrappingImplementation._wrap$ctor.prototype = HashChangeEventWrappingImplementation.prototype;
// ********** Code for KeyboardEventWrappingImplementation **************
$inherits(KeyboardEventWrappingImplementation, UIEventWrappingImplementation);
function KeyboardEventWrappingImplementation() {}
KeyboardEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeyboardEventWrappingImplementation._wrap$ctor.prototype = KeyboardEventWrappingImplementation.prototype;
// ********** Code for _MeasurementRequest **************
function _MeasurementRequest(computeValue, completer) {
  this.exception = false
  this.computeValue = computeValue;
  this.completer = completer;
  // Initializers done
}
_MeasurementRequest.prototype.get$value = function() { return this.value; };
_MeasurementRequest.prototype.set$value = function(value) { return this.value = value; };
// ********** Code for MessageEventWrappingImplementation **************
$inherits(MessageEventWrappingImplementation, EventWrappingImplementation);
function MessageEventWrappingImplementation() {}
MessageEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessageEventWrappingImplementation._wrap$ctor.prototype = MessageEventWrappingImplementation.prototype;
// ********** Code for MouseEventWrappingImplementation **************
$inherits(MouseEventWrappingImplementation, UIEventWrappingImplementation);
function MouseEventWrappingImplementation() {}
MouseEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MouseEventWrappingImplementation._wrap$ctor.prototype = MouseEventWrappingImplementation.prototype;
MouseEventWrappingImplementation.prototype.get$clientX = function() {
  return this._ptr.get$clientX();
}
MouseEventWrappingImplementation.prototype.get$clientY = function() {
  return this._ptr.get$clientY();
}
// ********** Code for MutationEventWrappingImplementation **************
$inherits(MutationEventWrappingImplementation, EventWrappingImplementation);
function MutationEventWrappingImplementation() {}
MutationEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MutationEventWrappingImplementation._wrap$ctor.prototype = MutationEventWrappingImplementation.prototype;
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
ObjectElementWrappingImplementation.prototype.get$height = function() {
  return this._ptr.get$height();
}
ObjectElementWrappingImplementation.prototype.set$height = function(value) {
  this._ptr.set$height(value);
}
ObjectElementWrappingImplementation.prototype.get$width = function() {
  return this._ptr.get$width();
}
ObjectElementWrappingImplementation.prototype.set$width = function(value) {
  this._ptr.set$width(value);
}
// ********** Code for OverflowEventWrappingImplementation **************
$inherits(OverflowEventWrappingImplementation, EventWrappingImplementation);
function OverflowEventWrappingImplementation() {}
OverflowEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OverflowEventWrappingImplementation._wrap$ctor.prototype = OverflowEventWrappingImplementation.prototype;
// ********** Code for PageTransitionEventWrappingImplementation **************
$inherits(PageTransitionEventWrappingImplementation, EventWrappingImplementation);
function PageTransitionEventWrappingImplementation() {}
PageTransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PageTransitionEventWrappingImplementation._wrap$ctor.prototype = PageTransitionEventWrappingImplementation.prototype;
// ********** Code for PopStateEventWrappingImplementation **************
$inherits(PopStateEventWrappingImplementation, EventWrappingImplementation);
function PopStateEventWrappingImplementation() {}
PopStateEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PopStateEventWrappingImplementation._wrap$ctor.prototype = PopStateEventWrappingImplementation.prototype;
// ********** Code for ProgressEventWrappingImplementation **************
$inherits(ProgressEventWrappingImplementation, EventWrappingImplementation);
function ProgressEventWrappingImplementation() {}
ProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressEventWrappingImplementation._wrap$ctor.prototype = ProgressEventWrappingImplementation.prototype;
// ********** Code for StorageEventWrappingImplementation **************
$inherits(StorageEventWrappingImplementation, EventWrappingImplementation);
function StorageEventWrappingImplementation() {}
StorageEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
StorageEventWrappingImplementation._wrap$ctor.prototype = StorageEventWrappingImplementation.prototype;
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
function SVGDocumentWrappingImplementation() {}
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.rootElement);
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
SVGSVGElementWrappingImplementation.prototype.get$height = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$height());
}
SVGSVGElementWrappingImplementation.prototype.get$width = function() {
  return LevelDom.wrapSVGAnimatedLength(this._ptr.get$width());
}
// ********** Code for TextEventWrappingImplementation **************
$inherits(TextEventWrappingImplementation, UIEventWrappingImplementation);
function TextEventWrappingImplementation() {}
TextEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextEventWrappingImplementation._wrap$ctor.prototype = TextEventWrappingImplementation.prototype;
// ********** Code for TouchEventWrappingImplementation **************
$inherits(TouchEventWrappingImplementation, UIEventWrappingImplementation);
function TouchEventWrappingImplementation() {}
TouchEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TouchEventWrappingImplementation._wrap$ctor.prototype = TouchEventWrappingImplementation.prototype;
// ********** Code for TransitionEventWrappingImplementation **************
$inherits(TransitionEventWrappingImplementation, EventWrappingImplementation);
function TransitionEventWrappingImplementation() {}
TransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TransitionEventWrappingImplementation._wrap$ctor.prototype = TransitionEventWrappingImplementation.prototype;
// ********** Code for WheelEventWrappingImplementation **************
$inherits(WheelEventWrappingImplementation, UIEventWrappingImplementation);
function WheelEventWrappingImplementation() {}
WheelEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WheelEventWrappingImplementation._wrap$ctor.prototype = WheelEventWrappingImplementation.prototype;
WheelEventWrappingImplementation.prototype.get$clientX = function() {
  return this._ptr.get$clientX();
}
WheelEventWrappingImplementation.prototype.get$clientY = function() {
  return this._ptr.get$clientY();
}
// ********** Code for WindowEventsImplementation **************
$inherits(WindowEventsImplementation, EventsImplementation);
function WindowEventsImplementation() {}
WindowEventsImplementation._wrap$ctor = function(_ptr) {
  // Initializers done
  EventsImplementation._wrap$ctor.call(this, _ptr);
}
WindowEventsImplementation._wrap$ctor.prototype = WindowEventsImplementation.prototype;
WindowEventsImplementation.prototype.get$message = function() {
  return this._get('message');
}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
function WindowWrappingImplementation() {}
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
WindowWrappingImplementation.prototype.get$top = function() {
  return LevelDom.wrapWindow(this._ptr.get$top());
}
WindowWrappingImplementation.prototype.postMessage = function(message, messagePort, targetOrigin) {
  if (targetOrigin == null) {
    if (messagePort == null) {
      this._ptr.postMessage$1(message);
      return;
    }
    else {
      this._ptr.postMessage$2(message, messagePort);
      return;
    }
  }
  else {
    this._ptr.postMessage$3(message, LevelDom.unwrap(messagePort), targetOrigin);
    return;
  }
  $throw("Incorrect number or type of arguments");
}
WindowWrappingImplementation.prototype.webkitRequestAnimationFrame = function(callback, element) {
  return this._ptr.webkitRequestAnimationFrame$2(callback, LevelDom.unwrap(element));
}
WindowWrappingImplementation.prototype.get$on = function() {
  if (this._on == null) {
    this._on = new WindowEventsImplementation._wrap$ctor(this._ptr);
  }
  return this._on;
}
WindowWrappingImplementation.prototype.postMessage$1 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$2 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.postMessage$3 = WindowWrappingImplementation.prototype.postMessage;
WindowWrappingImplementation.prototype.webkitRequestAnimationFrame$2 = function($0, $1) {
  return this.webkitRequestAnimationFrame(to$call$1($0), $1);
};
// ********** Code for XMLHttpRequestProgressEventWrappingImplementation **************
$inherits(XMLHttpRequestProgressEventWrappingImplementation, ProgressEventWrappingImplementation);
function XMLHttpRequestProgressEventWrappingImplementation() {}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  // Initializers done
  ProgressEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestProgressEventWrappingImplementation.prototype;
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
function _maybeScheduleMeasurementFrame() {
  if ($globals._nextMeasurementFrameScheduled) return;
  $globals._nextMeasurementFrameScheduled = true;
  if ($globals._firstMeasurementRequest) {
    html_get$window().get$on().get$message().add$1((function (e) {
      return _completeMeasurementFutures();
    })
    );
    $globals._firstMeasurementRequest = false;
  }
  html_get$window().postMessage("DART-MEASURE"/*null._MEASUREMENT_MESSAGE*/, "*");
}
function _createMeasurementFuture(computeValue, completer) {
  if ($globals._pendingRequests == null) {
    $globals._pendingRequests = [];
    _maybeScheduleMeasurementFrame();
  }
  $globals._pendingRequests.add(new _MeasurementRequest(computeValue, completer));
  return completer.get$future();
}
function _completeMeasurementFutures() {
  if ($eq($globals._nextMeasurementFrameScheduled, false)) {
    return;
  }
  $globals._nextMeasurementFrameScheduled = false;
  if ($globals._pendingRequests != null) {
    var $$list = $globals._pendingRequests;
    for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
      var request = $$list.$index($$i);
      try {
        request.value = request.computeValue();
      } catch (e) {
        e = _toDartException(e);
        request.value = e;
        request.exception = true;
      }
    }
  }
  var completedRequests = $globals._pendingRequests;
  var readyMeasurementFrameCallbacks = $globals._pendingMeasurementFrameCallbacks;
  $globals._pendingRequests = null;
  $globals._pendingMeasurementFrameCallbacks = null;
  if (completedRequests != null) {
    for (var $$i = 0;$$i < completedRequests.get$length(); $$i++) {
      var request = completedRequests.$index($$i);
      if (request.exception) {
        request.completer.completeException(request.value);
      }
      else {
        request.completer.complete(request.value);
      }
    }
  }
  if (readyMeasurementFrameCallbacks != null) {
    for (var $$i = 0;$$i < readyMeasurementFrameCallbacks.get$length(); $$i++) {
      var handler = readyMeasurementFrameCallbacks.$index($$i);
      handler();
    }
  }
}
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$window() {
  if ($globals.secretWindow == null) {
    LevelDom.initialize();
  }
  return $globals.secretWindow;
}
function html_get$document() {
  if ($globals.secretWindow == null) {
    LevelDom.initialize();
  }
  return $globals.secretDocument;
}
//  ********** Library BadAliensDart **************
// ********** Code for AssetManager **************
function AssetManager() {
  this.successCount = 0
  this.errorCount = 0
  // Initializers done
  this.downloadQueue = [];
  this.cache = new HashMapImplementation();
}
AssetManager.prototype.queueDownload = function(path) {
  this.downloadQueue.add(path);
}
AssetManager.prototype.downloadAll = function(downloadCallback) {
  var $this = this; // closure support
  if (this.downloadQueue.get$length() == 0) {
    downloadCallback.call$0();
  }
  var $$list = this.downloadQueue;
  for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
    var path = $$list.$index($$i);
    var img = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("img");
    img.get$on().get$load().add$1((function (img, event) {
      dart_core_print(img.get$src() + ' is loaded');
      $this.successCount = $this.successCount + 1;
      if ($this.isDone()) {
        downloadCallback.call$0();
      }
    }).bind(null, img)
    );
    img.get$on().get$error().add$1((function (event) {
      $this.errorCount = $this.errorCount + 1;
      if ($this.isDone()) {
        downloadCallback.call$0();
      }
    })
    );
    img.set$src(path);
    this.cache.$setindex(path, img);
  }
}
AssetManager.prototype.getAsset = function(path) {
  return this.cache.$index(path);
}
AssetManager.prototype.isDone = function() {
  return (this.downloadQueue.get$length() == this.successCount + this.errorCount);
}
// ********** Code for Animation **************
function Animation(spriteSheet, frameWidth, frameDuration, loop) {
  this.elapsedTime = 0
  this.spriteSheet = spriteSheet;
  this.frameWidth = frameWidth;
  this.frameDuration = frameDuration;
  this.loop = loop;
  // Initializers done
  this.frameHeight = this.spriteSheet.get$height();
  this.totalTime = (this.spriteSheet.get$width() / this.frameWidth) * this.frameDuration;
}
Animation.prototype.drawFrame = function(tick, ctx, x, y, scaleBy) {
  this.elapsedTime = this.elapsedTime + tick;
  if (this.loop) {
    if (this.isDone()) {
      this.elapsedTime = 0;
    }
  }
  else if (this.isDone()) {
    return;
  }
  var index = this.currentFrame();
  var locX = x - (this.frameWidth / 2) * scaleBy;
  var locY = y - (this.frameHeight / 2) * scaleBy;
  ctx.drawImage$9(this.spriteSheet, index * this.frameWidth, 0, this.frameWidth, this.frameHeight, locX, locY, this.frameWidth * scaleBy, this.frameHeight * scaleBy);
}
Animation.prototype.isDone = function() {
  return (this.elapsedTime >= this.totalTime);
}
Animation.prototype.currentFrame = function() {
  return (this.elapsedTime / this.frameDuration).floor();
}
// ********** Code for Timer **************
function Timer() {
  this.gameTime = 0
  this.wallLastTimestamp = 0
  // Initializers done
}
Timer.prototype.tick = function() {
  var wallCurrent = new DateImplementation.now$ctor().value;
  var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
  this.wallLastTimestamp = wallCurrent;
  var gameDelta = Math.min(wallDelta, 0.05/*Timer.MAX_STEP*/);
  this.gameTime += gameDelta;
  return gameDelta;
}
// ********** Code for GameEntity **************
function GameEntity(game) {
  this.removeFromWorld = false
  this.game = game;
  // Initializers done
}
GameEntity.withPosition$ctor = function(game, x, y) {
  this.removeFromWorld = false
  this.game = game;
  this.x = x;
  this.y = y;
  // Initializers done
}
GameEntity.withPosition$ctor.prototype = GameEntity.prototype;
GameEntity.prototype.get$removeFromWorld = function() { return this.removeFromWorld; };
GameEntity.prototype.set$removeFromWorld = function(value) { return this.removeFromWorld = value; };
GameEntity.prototype.update = function() {

}
GameEntity.prototype.draw = function(ctx) {
  if (this.game.showOutlines) {
    ctx.beginPath$0();
    ctx.set$strokeStyle("green");
    ctx.arc$6(this.x, this.y, this.radius, 0, 6.283185/*Math.PI*2*/, false);
    ctx.stroke$0();
    ctx.closePath$0();
  }
}
GameEntity.prototype.drawSpriteCentered = function(ctx) {
  var x = this.x - this.sprite.get$width() / 2;
  var y = this.y - this.sprite.get$height() / 2;
  ctx.drawImage$3(this.sprite, x, y);
}
GameEntity.prototype.outsideScreen = function() {
  return (this.x > this.game.halfSurfaceWidth || this.x < -(this.game.halfSurfaceWidth) || this.y > this.game.halfSurfaceHeight || this.y < -(this.game.halfSurfaceHeight));
}
GameEntity.prototype.rotateAndCache = function(image, angle) {
  var offscreenCanvas = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("canvas");
  var size = Math.max(image.get$width(), image.get$height());
  offscreenCanvas.set$width(size);
  offscreenCanvas.set$height(size);
  var offscreenCtx = offscreenCanvas.getContext$1('2d');
  offscreenCtx.save$0();
  offscreenCtx.translate$2(size / 2, size / 2);
  offscreenCtx.rotate$1(angle + 1.570796/*Math.PI/2*/);
  offscreenCtx.translate$2(0, 0);
  offscreenCtx.drawImage$3(image, -(image.get$width() / 2), -(image.get$height() / 2));
  offscreenCtx.restore$0();
  return offscreenCanvas;
}
GameEntity.prototype.update$0 = GameEntity.prototype.update;
// ********** Code for Game **************
function Game(assetManager) {
  this.showOutlines = false
  this.assetManager = assetManager;
  // Initializers done
  this.timer = new Timer();
  this.entities = [];
}
Game.prototype.init = function(ctx) {
  var $this = this; // closure support
  this.ctx = ctx;
  this.surfaceWidth = ctx.get$canvas().get$width();
  this.surfaceHeight = ctx.get$canvas().get$height();
  this.halfSurfaceWidth = this.surfaceWidth / 2;
  this.halfSurfaceHeight = this.surfaceHeight / 2;
  var futureRect = ctx.get$canvas().get$rect();
  futureRect.then((function (rect) {
    $this.clientBoundingRect = new Point(rect.get$bounding().get$left(), rect.get$bounding().get$top());
  })
  );
  this.startInput();
  dart_core_print('game initialized');
}
Game.prototype.start = function() {
  dart_core_print("starting game");
  html_get$window().webkitRequestAnimationFrame(this.get$loop(), this.ctx.get$canvas());
}
Game.prototype.get$start = function() {
  return this.start.bind(this);
}
Game.prototype.loop = function(time) {
  this.clockTick = this.timer.tick();
  this.update();
  this.draw();
  this.click = null;
  html_get$window().webkitRequestAnimationFrame(this.get$loop(), this.ctx.get$canvas());
}
Game.prototype.get$loop = function() {
  return this.loop.bind(this);
}
Game.prototype.startInput = function() {
  var $this = this; // closure support
  dart_core_print('Starting input');
  function getXandY(e) {
    var x = e.get$clientX() - $this.clientBoundingRect.x - ($this.ctx.get$canvas().get$width() / 2);
    var y = e.get$clientY() - $this.clientBoundingRect.y - ($this.ctx.get$canvas().get$height() / 2);
    return new Point(x, y);
  }
  this.ctx.get$canvas().get$on().get$click().add$1((function (e) {
    $this.click = getXandY(e);
  })
  );
  this.ctx.get$canvas().get$on().get$mouseMove().add$1((function (e) {
    $this.mouse = getXandY(e);
  })
  );
  dart_core_print('Input started');
}
Game.prototype.addEntity = function(entity) {
  this.entities.add(entity);
}
Game.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.ctx.get$canvas().get$width(), this.ctx.get$canvas().get$height());
  this.ctx.save();
  this.ctx.translate(this.ctx.get$canvas().get$width() / 2, this.ctx.get$canvas().get$height() / 2);
  var $$list = this.entities;
  for (var $$i = 0;$$i < $$list.get$length(); $$i++) {
    var entity = $$list.$index($$i);
    entity.draw(this.ctx);
  }
  this.drawBeforeCtxRestore();
  this.ctx.restore();
}
Game.prototype.drawBeforeCtxRestore = function() {

}
Game.prototype.update = function() {
  var entitiesCount = this.entities.get$length();
  for (var i = 0;
   i < entitiesCount; i = i + 1) {
    var entity = this.entities.$index(i);
    if (!entity.get$removeFromWorld()) {
      entity.update$0();
    }
  }
  for (var i = this.entities.get$length() - 1;
   i >= 0; (i = i - 1)) {
    if (this.entities.$index(i).get$removeFromWorld()) {
      this.entities.removeRange(i, 1);
    }
  }
}
Game.prototype.init$1 = Game.prototype.init;
Game.prototype.start$0 = Game.prototype.start;
Game.prototype.update$0 = Game.prototype.update;
// ********** Code for Point **************
function Point(x, y) {
  this.x = x;
  this.y = y;
  // Initializers done
}
// ********** Code for Alien **************
$inherits(Alien, GameEntity);
function Alien(game, radialDistance, angle) {
  this.speed = 100
  this.radialDistance = radialDistance;
  this.angle = angle;
  // Initializers done
  GameEntity.call(this, game);
  this.sprite = this.rotateAndCache(game.assetManager.getAsset('img/alien.png'), this.angle);
  this.radius = this.sprite.get$height() / 2;
  this.setCoords();
}
Alien.prototype.setCoords = function() {
  this.x = this.radialDistance * Math.cos(this.angle);
  this.y = this.radialDistance * Math.sin(this.angle);
}
Alien.prototype.update = function() {
  var $0;
  this.setCoords();
  this.radialDistance -= (this.speed * this.game.clockTick);
  if (this.hitPlanet()) {
    this.removeFromWorld = true;
    ($0 = this.game).set$lives($0.get$lives() - 1);
  }
}
Alien.prototype.draw = function(ctx) {
  this.drawSpriteCentered(ctx);
  GameEntity.prototype.draw.call(this, ctx);
}
Alien.prototype.hitPlanet = function() {
  var distance_squared = ((this.x * this.x) + (this.y * this.y));
  var radii_squared = (this.radius + 67/*Earth.RADIUS*/) * (this.radius + 67/*Earth.RADIUS*/);
  return distance_squared < radii_squared;
}
Alien.prototype.explode = function() {
  this.removeFromWorld = true;
  this.game.addEntity(new AlienExplosion(this.game, this.x, this.y));
}
Alien.prototype.explode$0 = Alien.prototype.explode;
Alien.prototype.update$0 = Alien.prototype.update;
// ********** Code for AlienExplosion **************
$inherits(AlienExplosion, GameEntity);
function AlienExplosion(game, x, y) {
  // Initializers done
  GameEntity.withPosition$ctor.call(this, game, x, y);
  this.animation = new Animation(game.assetManager.getAsset('img/alien-explosion.png'), 69, 0.05, false);
  this.radius = this.animation.frameWidth / 2;
}
AlienExplosion.prototype.update = function() {
  if (this.animation.isDone()) {
    this.removeFromWorld = true;
  }
}
AlienExplosion.prototype.draw = function(ctx) {
  GameEntity.prototype.draw.call(this, ctx);
  this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
}
AlienExplosion.prototype.update$0 = AlienExplosion.prototype.update;
// ********** Code for Sentry **************
$inherits(Sentry, GameEntity);
function Sentry(game) {
  this.angle = 0;
  // Initializers done
  GameEntity.withPosition$ctor.call(this, game, 0, 85/*Sentry.distanceFromEarthCenter*/);
  this.sprite = game.assetManager.getAsset('img/sentry.png');
  this.radius = this.sprite.get$width() / 2;
}
Sentry.prototype.update = function() {
  if (this.game.mouse != null) {
    this.angle = Math.atan2(this.game.mouse.y, this.game.mouse.x);
    if (this.angle < 0) {
      this.angle += (6.283185)/*Math.PI * 2*/;
    }
    this.x = (Math.cos(this.angle) * 85/*Sentry.distanceFromEarthCenter*/);
    this.y = (Math.sin(this.angle) * 85/*Sentry.distanceFromEarthCenter*/);
  }
  if (this.game.click != null) {
    this.shoot();
  }
}
Sentry.prototype.draw = function(ctx) {
  ctx.save$0();
  ctx.translate$2(this.x, this.y);
  ctx.rotate$1(this.angle + 1.570796/*Math.PI/2*/);
  ctx.drawImage$3(this.sprite, -this.sprite.get$width() / 2, -this.sprite.get$height() / 2);
  ctx.restore$0();
  GameEntity.prototype.draw.call(this, ctx);
}
Sentry.prototype.shoot = function() {
  var bullet = new Bullet(this.game, this.x, this.y, this.angle, this.game.click);
  this.game.addEntity(bullet);
}
Sentry.prototype.update$0 = Sentry.prototype.update;
// ********** Code for Bullet **************
$inherits(Bullet, GameEntity);
function Bullet(game, x, y, angle, explodesAt) {
  this.radialDistance = 95
  this.angle = angle;
  this.explodesAt = explodesAt;
  // Initializers done
  GameEntity.withPosition$ctor.call(this, game, x, y);
  this.sprite = game.assetManager.getAsset('img/bullet.png');
  this.animation = new Animation(this.sprite, 7, 0.05, true);
}
Bullet.prototype.update = function() {
  if (this.outsideScreen()) {
    this.removeFromWorld = true;
  }
  else if (this.x.abs() >= this.explodesAt.x.abs() || this.y.abs() >= this.explodesAt.y.abs()) {
    this.game.addEntity(new BulletExplosion(this.game, this.explodesAt.x, this.explodesAt.y));
    this.removeFromWorld = true;
  }
  else {
    this.x = this.radialDistance * Math.cos(this.angle);
    this.y = this.radialDistance * Math.sin(this.angle);
    this.radialDistance += (250/*Bullet.speed*/ * this.game.clockTick);
  }
}
Bullet.prototype.draw = function(ctx) {
  ctx.save$0();
  ctx.translate$2(this.x, this.y);
  ctx.rotate$1(this.angle + 1.570796/*Math.PI/2*/);
  ctx.translate$2(-this.x, -this.y);
  this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 1);
  ctx.restore$0();
  GameEntity.prototype.draw.call(this, ctx);
}
Bullet.prototype.update$0 = Bullet.prototype.update;
// ********** Code for BulletExplosion **************
$inherits(BulletExplosion, GameEntity);
function BulletExplosion(game, x, y) {
  // Initializers done
  GameEntity.withPosition$ctor.call(this, game, x, y);
  this.sprite = game.assetManager.getAsset('img/explosion.png');
  this.animation = new Animation(this.sprite, 34, 0.05, false);
  this.radius = this.animation.frameWidth / 2;
}
BulletExplosion.prototype.update = function() {
  var $0;
  if (this.animation.isDone()) {
    this.removeFromWorld = true;
    return;
  }
  this.radius = (this.animation.frameWidth / 2) * this.scaleFactor();
  for (var i = 0;
   i < this.game.entities.get$length(); i = i + 1) {
    var alien = this.game.entities.$index(i);
    if ((alien instanceof Alien) && this.isCaughtInExplosion(alien)) {
      ($0 = this.game).set$score($0.get$score() + 10);
      alien.explode$0();
    }
  }
}
BulletExplosion.prototype.isCaughtInExplosion = function(alien) {
  var distance_squared = (((this.x - alien.x) * (this.x - alien.x)) + ((this.y - alien.y) * (this.y - alien.y)));
  var radii_squared = (this.radius + alien.radius) * (this.radius + alien.radius);
  return distance_squared < radii_squared;
}
BulletExplosion.prototype.scaleFactor = function() {
  return 1 + (this.animation.currentFrame() / 3);
}
BulletExplosion.prototype.draw = function(ctx) {
  this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scaleFactor());
  GameEntity.prototype.draw.call(this, ctx);
}
BulletExplosion.prototype.update$0 = BulletExplosion.prototype.update;
// ********** Code for Earth **************
$inherits(Earth, GameEntity);
function Earth(game) {
  // Initializers done
  GameEntity.withPosition$ctor.call(this, game, 0, 0);
  this.sprite = game.assetManager.getAsset('img/earth.png');
}
Earth.prototype.draw = function(ctx) {
  ctx.drawImage$3(this.sprite, this.x - this.sprite.get$width() / 2, this.y - this.sprite.get$height() / 2);
}
// ********** Code for EvilAliens **************
$inherits(EvilAliens, Game);
function EvilAliens(assetManager) {
  this.lives = 10
  this.score = 0
  // Initializers done
  Game.call(this, assetManager);
}
EvilAliens.prototype.get$lives = function() { return this.lives; };
EvilAliens.prototype.set$lives = function(value) { return this.lives = value; };
EvilAliens.prototype.get$score = function() { return this.score; };
EvilAliens.prototype.set$score = function(value) { return this.score = value; };
EvilAliens.prototype.start = function() {
  this.sentry = new Sentry(this);
  this.earth = new Earth(this);
  this.addEntity(this.earth);
  this.addEntity(this.sentry);
  Game.prototype.start.call(this);
}
EvilAliens.prototype.get$start = function() {
  return this.start.bind(this);
}
EvilAliens.prototype.update = function() {
  if (this.lastAlienAddedAt == null || (this.timer.gameTime - this.lastAlienAddedAt) > 1) {
    this.addEntity(new Alien(this, this.ctx.get$canvas().get$width(), Math.random() * 3.1415926535897932/*Math.PI*/ * 180));
    this.lastAlienAddedAt = this.timer.gameTime;
  }
  if (this.score <= 0) {
  }
  Game.prototype.update.call(this);
}
EvilAliens.prototype.drawBeforeCtxRestore = function() {
  this.drawScore();
  this.drawLives();
}
EvilAliens.prototype.drawLives = function() {
  this.ctx.set$fillStyle("red");
  this.ctx.set$font("bold 2em Arial");
  this.ctx.fillText("Lives: " + this.lives, -this.ctx.get$canvas().get$width() / 2 + 50, this.ctx.get$canvas().get$height() / 2 - 80);
}
EvilAliens.prototype.drawScore = function() {
  this.ctx.set$fillStyle("red");
  this.ctx.set$font("bold 2em Arial");
  this.ctx.fillText("Score: " + this.score, -this.ctx.get$canvas().get$width() / 2 + 50, this.ctx.get$canvas().get$height() / 2 - 50);
}
EvilAliens.prototype.start$0 = EvilAliens.prototype.start;
EvilAliens.prototype.update$0 = EvilAliens.prototype.update;
// ********** Code for top level **************
function main() {
  var canvas = html_get$document().query('#surface');
  var ctx = canvas.getContext$1('2d');
  var assetManager = new AssetManager();
  assetManager.queueDownload('img/alien-explosion.png');
  assetManager.queueDownload('img/alien.png');
  assetManager.queueDownload('img/bullet.png');
  assetManager.queueDownload('img/earth.png');
  assetManager.queueDownload('img/sentry.png');
  assetManager.queueDownload('img/explosion.png');
  var game = new EvilAliens(assetManager);
  assetManager.downloadAll((function () {
    game.init$1(ctx);
    game.start$0();
  })
  );
}
//  ********** Globals **************
function $static_init(){
  $globals._firstMeasurementRequest = true;
  $globals._nextMeasurementFrameScheduled = false;
}
var const$3 = new _DeletedKeySentinel()/*const _DeletedKeySentinel()*/;
var $globals = {};
$static_init();
main();
