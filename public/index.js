'use strict';

/**
 * Perform function more than once,
 * Is not exceeded the interval between calls
 * @param {Function} func
 * @param {number=100} threshold
 * @param {boolean=false} atBeginning
 * @returns {Function}
 */
function debounce(func) {
	var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
	var atBeginning = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	var timerId = void 0;

	return function debounced() {
		var _this = this;

		for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
			rest[_key] = arguments[_key];
		}

		if (timerId) {
			clearTimeout(timerId);
		} else if (atBeginning) {
			func.apply(this, rest);
		}

		timerId = setTimeout(function () {
			if (!atBeginning) {
				func.apply(_this, rest);
			}

			timerId = 0;
		}, threshold);
	};
}

/**
 * Contains embedded objects that contain check methods and a description of errors
 * 
 * types {Object} 
 */

var types = {
	/**
  * Check field on the empty
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isNonEmpty: {
		validate: function validate(input) {
			return input.value !== '';
		},
		'instructions-ru': 'это поле не может быть пустым.',
		'instructions-en': 'This field can not be empty.'
	},
	/**
  * Check on the entered letters without special characters
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	onlyLetters: {
		validate: function validate(input) {
			return !/[^a-zа-яё ]/gi.test(input.value);
		},
		'instructions-ru': 'значением может быть только буквы от "а" до "я".',
		'instructions-en': 'value can only be the letters "a" to "z".'
	},
	/**
  * Check of the number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isValidNumber: {
		validate: function validate(input) {
			return !isNaN(input.value);
		},
		'instructions-ru': 'значением может быть только число­, например 1, 3.14 или 2010',
		'instructions-en': 'value can only be a number, such as 1, 3.14 or 2010'
	},
	/**
  * Check for compliance with the number of not less than min and not more than max 
  * (works if given and min and max at the input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	minMax: {
		validate: function validate(input) {
			var min = Number(input.min);
			var max = Number(input.max);
			var value = Number(input.value);

			if (min > value || value > max) {
				return false;
			}

			return true;
		},
		'instructions-ru': 'значением может быть только число не меньше min и не больше max',
		'instructions-en': 'value can only be a number no less and no more than min max'
	},
	/**
  * Check for compliance of not less than min (for input type="number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	min: {
		validate: function validate(input) {
			var min = Number(input.min);
			var value = Number(input.value);

			if (min > value) {
				return false;
			}

			return true;
		},
		'instructions-ru': 'значением может быть только число не меньше min',
		'instructions-en': 'value can only be a number not less than min'
	},
	/**
  * Check for compliance of not more than max (for input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	max: {
		validate: function validate(input) {
			var max = Number(input.max);
			var value = Number(input.value);

			if (value > max) {
				return false;
			}

			return true;
		},
		'instructions-ru': 'значением может быть только число не больше max',
		'instructions-en': 'value can only be a number not more than max'
	},
	/**
  * Check the validity of the entered email address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isEmailCorrect: {
		validate: function validate(input) {
			return (/^.+@.+$/.test(input.value)
			);
		},
		'instructions-ru': 'введите корректный email',
		'instructions-en': 'enter a valid email'
	},
	/**
  * Check on the validity of the entered phone number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isValidTel: {
		validate: function validate(input) {
			return !/[^0-9 .()*+-]/g.test(input.value);
		},
		'instructions-ru': 'введите корректный телефон',
		'instructions-en': 'enter a valid phone'
	},
	/**
  * Check on the validity of the entered url address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isValidUrl: {
		validate: function validate(input) {
			return (/^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test(input.value)
			);
		},
		'instructions-ru': 'введите корректный url',
		'instructions-en': 'enter a valid url'
	},
	/**
  * Check activation of the required field (for checkbox or radio)
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
	isRequired: {
		validate: function validate(input) {
			return input.checked;
		},
		'instructions-ru': 'для продолжения активируйте обязательное поле',
		'instructions-en': 'for to continue activate a mandatory field'
	},
	/**
  * Check the activation of elements of at least one of the groups (for checkbox or radio)
  * 
  * @param array {Array}
  * @returns rezult {boolean}
  */
	isEmptyGroup: {
		validate: function validate(array) {
			var rezult = array.some(function (item) {
				if (item.checked) {
					return true;
				} else {
					return false;
				}
			});

			return rezult;
		},
		'instructions-ru': 'необходимо выбрать хоть один пункт',
		'instructions-en': 'you need to select at least one item'
	}
};

/**
 * Checks distributed depending on the type of field
 * 
 * config {Object}
 */
var config$1 = {
	/** inpyt type="text" */
	text: ['isNonEmpty', 'onlyLetters'],
	/** inpyt type="number" */
	number: ['isNonEmpty', 'isValidNumber', 'minMax', 'min', 'max'],
	/** inpyt type="email" */
	email: ['isNonEmpty', 'isEmailCorrect'],
	/** inpyt type="password" */
	password: ['isNonEmpty'],
	/** inpyt type="file" */
	file: ['isNonEmpty'],
	/** inpyt type="search" */
	search: ['isNonEmpty', 'onlyLetters'],
	/** inpyt type="tel" */
	tel: ['isNonEmpty', 'isValidTel'],
	/** inpyt type="url" */
	url: ['isNonEmpty', 'isValidUrl'],
	/** inpyt type="checkbox" */
	checkbox: ['isRequired', 'group'],
	/** inpyt type="radio" */
	radio: ['isRequired', 'group']
};

/**
 * Find and out warnings
 * 
 * @param element {HTMLInputElement}
 * @param arr {Array}
 * @returns mediateArray {Array}
 */
function findWarning(element, arr) {
	var name = element.name;
	var type = element.type;
	var mediateArray = [];

	arr.forEach(function (item) {
		if (config$1[type].indexOf(item) !== -1) {
			mediateArray.push(item);
		} else {
			console.error('Warning: field named "' + name + '" with type="' + type + '". data-options can not contain check to "' + item + '"');
		}
	});

	return mediateArray;
}

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValue(dataInput, storeErrors) {
	var length = Object.keys(dataInput).length;

	var _loop = function _loop(i) {
		var data = dataInput[i];
		var element = data['input'];
		var config = data['config'];
		var instructions = 'instructions-' + data['lang'];
		var message = '';

		var getMessage = function getMessage(item) {
			var checker = types[item];

			if (checker) {
				var result = checker.validate(element);

				if (!result) {
					var msg = checker[instructions];

					message = msg;

					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		};

		if (config) {
			config.some(getMessage);
		}

		storeErrors.set(element, message);
	};

	for (var i = 0; i < length; i++) {
		_loop(i);
	}

	return storeErrors;
}

/**
 * Determines field in the group or ordinary
 * 
 * @param item {HTMLInputElement}
 * @returns true or false {boolean}
 */
var checkAttrGroup = function checkAttrGroup(item) {
	if (item === 'group') {
		return true;
	} else {
		return false;
	}
};

/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
function sortGroups(listGroups) {
	var groups = [];

	listGroups.forEach(function (item) {
		var name = sortForName(item);

		if (groups.indexOf(name) === -1) {
			groups.push(name);
		}
	});

	var arr = [];

	groups.forEach(function (arrName) {
		var itemArr = forEachGroup(arrName, listGroups);

		arr.push(itemArr);
	});

	return arr;
}

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
function forEachGroup(arrName, list) {
	var arr = [];

	list.forEach(function (item) {
		var name = sortForName(item);

		if (arrName === name) {
			arr.push(item);
			return true;
		} else {
			return false;
		}
	});

	return arr;
}

/**
 * Detected field type and detected name of its group
 * 
 * @param item {HTMLInputElement}
 * @returns name {String}
 */
function sortForName(item) {
	var type = item.type;
	var name = void 0;

	if (type === 'radio') {
		name = item.name;
	} else if (type === 'checkbox') {
		var dataset = item.dataset['groupname'];

		if (dataset) {
			name = dataset;
		}
	}

	return name;
}

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
function checkValueGroup(groupRadio, storeErrors) {
	groupRadio.forEach(function (arr) {
		var message = getMessage$1(arr);

		storeErrors.set(arr[0], message);
	});

	return storeErrors;
}

/**
 * Get message about error
 * 
 * @param arr {Array}
 * @returns message {String}
 */
function getMessage$1(arr) {
	var instructions = 'instructions-en';
	var message = '';

	var checkValue = function checkValue(item) {
		var checker = types['isEmptyGroup'];

		if (checker) {
			var result = checker.validate(arr);

			if (!result) {
				var msg = checker[instructions];

				message = msg;

				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	arr.some(checkValue);

	return message;
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * Out errors
 * 
 * @class OutputErrors
 */
var OutputErrors = function () {
	/**
  * Creates an instance of OutputErrors.
  * 
  */
	function OutputErrors() {
		classCallCheck(this, OutputErrors);

		/** Store created tooltips */
		this.storeCreateElements = new Map();
		/** Object with input field and message about error */
		this.errorNotificationElement = Object.create(null);
	}

	/**
  * Sort messages and follow actions them
  * 
  * @param messages {Map}
  */


	createClass(OutputErrors, [{
		key: 'sortMessages',
		value: function sortMessages(messages) {
			var _this = this;

			var firstElement = messages.keys().next().value;
			var currentForm = firstElement.closest('form');

			messages.forEach(function (value, key, map) {
				var element = key;
				var message = value;

				if (message) {
					if (!_this.storeCreateElements.has(element)) {
						_this.errorNotificationElement = {
							newElement: _this.createErrorElement(element, message),
							message: message
						};

						_this.storeCreateElements.set(element, _this.errorNotificationElement);
					} else if (_this.storeCreateElements.get(element)['message'] !== message) {
						_this.storeCreateElements.get(element)['newElement'].textContent = message;
						_this.storeCreateElements.get(element)['message'] = message;
					}
				} else {
					if (_this.storeCreateElements.has(element)) {
						(function () {
							var notifyElement = _this.storeCreateElements.get(element)['newElement'];

							notifyElement.classList.add('hide');

							setTimeout(function () {
								element.parentElement.removeChild(notifyElement);
								_this.storeCreateElements.delete(element);
							}, 100);
						})();
					}
				}
			});

			if (this.storeCreateElements.size === 0) {
				currentForm.submit();
			}
		}

		/**
   * Create tooltip with error
   * 
   * @param element {HTMLInputElement}
   * @param message {String}
   * @returns span {HTMLSpanElement}
   */

	}, {
		key: 'createErrorElement',
		value: function createErrorElement(element, message) {
			var span = document.createElement('span');
			span.classList.add('notify');
			setTimeout(function () {
				return span.classList.add('show');
			}, 0);
			span.textContent = message;

			element.parentElement.insertBefore(span, element);

			return span;
		}
	}]);
	return OutputErrors;
}();

/**
 * Store
 * 
 * @class Store
 */

var Store = function () {
	/**
  * Creates an instance of Store.
  * 
  */
	function Store() {
		classCallCheck(this, Store);

		this.outputErrors = new OutputErrors();
	}

	/**
  * Get messages
  * 
  * @param messages {Map}
  */


	createClass(Store, [{
		key: 'getMessage',
		value: function getMessage(messages) {
			this.outMessage(messages);
		}

		/**
   * Out messages
   * 
   * @param messages {Map}
   */

	}, {
		key: 'outMessage',
		value: function outMessage(messages) {
			this.outputErrors.sortMessages(messages);
		}
	}]);
	return Store;
}();

/**
* @class Validation
 * 
 * The main class for validation form
 */

var Validation = function () {
	/**
  * Creates an instance of Validation.
  * 
  * @param form {HTMLFormElement}
  */
	function Validation(form) {
		classCallCheck(this, Validation);

		this.form = form;
		this.listInputElement = form.querySelectorAll('input[type=text], input[type=number], input[type=email], input[type=password], input[type=file], \n\t\t\tinput[type=search], input[type=tel], input[type=url], input[type=checkbox], input[type=radio]');

		this.store = new Store();
		this.storeErrors = new Map();

		this.groupsElements = [];
		this.dataInput = Object.create(null);
		/** Is this first press to send form? */
		this.isFirst = true;

		this.registerHandlers();
	}

	/**
  * Registed handlers
  */


	createClass(Validation, [{
		key: 'registerHandlers',
		value: function registerHandlers() {
			var _this = this;

			this.init();
			this.form.addEventListener('submit', function (event) {
				return _this.validation(event);
			});
		}

		/**
   * Passes through the list of forms of gathering data about each
   */

	}, {
		key: 'init',
		value: function init() {
			var _this2 = this;

			var lang = document.documentElement.lang;
			var arrayInputElement = [];
			var listGroups = [];

			Array.prototype.filter.call(this.listInputElement, function (input) {
				var dataset = input.dataset['options'];

				if (dataset) {
					if (input.type === 'radio' || input.type === 'checkbox') {
						var datasetToArray = dataset.split(' ');
						var config = findWarning(input, datasetToArray);
						var isGroup = datasetToArray.some(checkAttrGroup);

						if (isGroup) {
							listGroups.push(input);

							return true;
						} else {
							arrayInputElement.push(input);

							return false;
						}
					} else {
						arrayInputElement.push(input);

						return false;
					}
				}
			});

			this.groupsElements = sortGroups(listGroups);

			arrayInputElement.forEach(function (input, index) {
				var dataset = input.dataset['options'];
				var config = void 0;

				if (dataset) {
					var datasetToArray = dataset.split(' ');

					config = findWarning(input, datasetToArray);
				}

				_this2.dataInput[index] = {
					input: input,
					name: input.name,
					config: config,
					lang: lang
				};
			});
		}

		/**
   * Checks forms
   * 
   * @param event {Event}
   */

	}, {
		key: 'validation',
		value: function validation(event) {
			var _this3 = this;

			event.preventDefault();

			/** check the ordinary fields */
			var storeErrors = checkValue(this.dataInput, this.storeErrors);

			/** checking the group fields */
			storeErrors = checkValueGroup(this.groupsElements, this.storeErrors);

			this.store.getMessage(storeErrors);

			if (this.isFirst) {
				this.form.addEventListener('input', debounce(function (event) {
					return _this3.validation(event);
				}, 100, true));
				this.form.addEventListener('change', debounce(function (event) {
					return _this3.validation(event);
				}, 100, true));
				this.isFirst = false;
			}
		}
	}]);
	return Validation;
}();

/**
 * Find all forms on the page
 */
function validation$1(config) {
	var forms = document.querySelectorAll('form[data-validation=true]');

	for (var key in config) {
		var type = config[key]['typeField'];
		var name = config[key]['checkName'];

		config$1[type].push(name);
	}

	Object.assign(types, config);

	initValidation(forms);
}

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
function initValidation(forms) {
	Array.prototype.forEach.call(forms, function (item) {
		new Validation(item);
	});
}

var config = {
	'isTest': {
		'typeField': 'text',
		'checkName': 'isTest',
		validate: function validate(input) {
			return input.value !== '';
		},
		'instructions-ru': 'это поле не может быть пустым.',
		'instructions-en': 'This field can not be empty.'
	},
	'isTestTwo': {
		'typeField': 'number',
		'checkName': 'isTestTwo',
		validate: function validate(input) {
			return input.value !== '';
		},
		'instructions-ru': 'это поле не может быть пустым.',
		'instructions-en': 'This field can not be empty.'
	}
};

validation$1(config);
/*function main()
{
	validation();
}

export {
	main as default,
}*/

// export {
// 	validation as default,
// }
// module.exports = validation;

function count() {
	// count.howCount ? count.howCount : count.howCount = 0;
	count.howCount = count.howCount || 0;

	return ++count.howCount;
}

console.log(count());
console.log(count());
console.log(count());
