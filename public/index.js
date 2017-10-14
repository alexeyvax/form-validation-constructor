'use strict';

/**
 * Perform function more than once,
 * Is not exceeded the interval between calls
 * @param {Function} func
 * @param {number=100} threshold
 * @param {boolean=false} atBeginning
 * @returns {Function}
 */
var debounce = function debounce(func) {
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
};

/** Warnings */
var IS_NON_EMPTY = 'isNonEmpty';
var ONLY_LETTERS = 'onlyLetters';
var IS_VALID_NUMBER = 'isValidNumber';
var MIN_MAX = 'minMax';
var MIN = 'min';
var MAX = 'max';
var IS_EMAIL_CORRECT = 'isEmailCorrect';
var IS_VALID_TEL = 'isValidTel';
var IS_VALID_URL = 'isValidUrl';
var IS_REQUIRED = 'isRequired';
var IS_EMPTY_GROUP = 'isEmptyGroup';

/** Language */
var EN = 'en';

var INSTRUCTION_EN = 'instructions-en';
var INSTRUCTION_RU = 'instructions-ru';

/** Classes */
var CLASS_SHOW = 'show';
var CLASS_NOTIFY = 'notify';

/** Events */
var EVENT_SUBMIT = 'submit';
var EVENT_INPUT = 'input';
var EVENT_CHANGE = 'change';

/** Types group element */
var RADIO = 'radio';
var CHECKBOX = 'checkbox';

/**
 * Checks distributed depending on the type of field
 * 
 * config {Object}
 */
var config$1 = {
  /** inpyt type="text" */
  text: [IS_NON_EMPTY, ONLY_LETTERS],
  /** inpyt type="number" */
  number: [IS_NON_EMPTY, IS_VALID_NUMBER, MIN_MAX, MIN, MAX],
  /** inpyt type="email" */
  email: [IS_NON_EMPTY, IS_EMAIL_CORRECT],
  /** inpyt type="password" */
  password: [IS_NON_EMPTY],
  /** inpyt type="file" */
  file: [IS_NON_EMPTY],
  /** inpyt type="search" */
  search: [IS_NON_EMPTY, ONLY_LETTERS],
  /** inpyt type="tel" */
  tel: [IS_NON_EMPTY, IS_VALID_TEL],
  /** inpyt type="url" */
  url: [IS_NON_EMPTY, IS_VALID_URL],
  /** inpyt type="checkbox" */
  checkbox: [IS_REQUIRED, IS_EMPTY_GROUP],
  /** inpyt type="radio" */
  radio: [IS_REQUIRED, IS_EMPTY_GROUP]
};

/**
 * Find and out warnings
 * 
 * @param element {HTMLInputElement}
 * @param arr {Array}
 * @returns mediateArray {Array}
 */
var findWarning = function findWarning(_ref, arr) {
  var name = _ref.name,
      type = _ref.type;

  var mediateArray = [];

  if (!arr.length) {
    return mediateArray;
  }

  arr.forEach(function (item) {
    if (config$1[type].includes(item)) {
      return mediateArray.push(item);
    }

    return console.error('Warning: field named "' + name + '" with type="' + type + '". \n      data-options can not contain check to "' + item + '"');
  });
  return mediateArray;
};

var warnings = {
  en: {
    isNonEmpty: 'This field can not be empty.',
    onlyLetters: 'value can only be the letters "a" to "z".',
    isValidNumber: 'value can only be a number, such as 1, 3.14 or 2010',
    minMax: 'value can only be a number no less and no more than min max',
    min: 'value can only be a number not less than min',
    max: 'value can only be a number not more than max',
    isEmailCorrect: 'enter a valid email',
    isValidTel: 'enter a valid phone',
    isValidUrl: 'enter a valid url',
    isRequired: 'for to continue activate a mandatory field',
    isEmptyGroup: 'you need to select at least one item'
  },
  ru: {
    isNonEmpty: 'это поле не может быть пустым.',
    onlyLetters: 'значением может быть только буквы от "а" до "я".',
    isValidNumber: 'значением может быть только число­, например 1, 3.14 или 2010',
    minMax: 'значением может быть только число не меньше min и не больше max',
    min: 'значением может быть только число не меньше min',
    max: 'значением может быть только число не больше max',
    isEmailCorrect: 'введите корректный email',
    isValidTel: 'введите корректный телефон',
    isValidUrl: 'введите корректный url',
    isRequired: 'для продолжения активируйте обязательное поле',
    isEmptyGroup: 'необходимо выбрать хоть один пункт'
  }
};

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





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _isNonEmpty;
var _onlyLetters;
var _isValidNumber;
var _minMax;
var _min;
var _max;
var _isEmailCorrect;
var _isValidTel;
var _isValidUrl;
var _isRequired;
var _isEmptyGroup;

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
  isNonEmpty: (_isNonEmpty = {
    validate: function validate(input) {
      return input.value !== '';
    }
  }, defineProperty(_isNonEmpty, INSTRUCTION_EN, warnings.en.isNonEmpty), defineProperty(_isNonEmpty, INSTRUCTION_RU, warnings.ru.isNonEmpty), _isNonEmpty),
  /**
  * Check on the entered letters without special characters
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  onlyLetters: (_onlyLetters = {
    validate: function validate(input) {
      return !/[^a-zа-яё ]/gi.test(input.value);
    }
  }, defineProperty(_onlyLetters, INSTRUCTION_EN, warnings.en.onlyLetters), defineProperty(_onlyLetters, INSTRUCTION_RU, warnings.ru.onlyLetters), _onlyLetters),
  /**
  * Check of the number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidNumber: (_isValidNumber = {
    validate: function validate(input) {
      return !isNaN(input.value);
    }
  }, defineProperty(_isValidNumber, INSTRUCTION_EN, warnings.en.isValidNumber), defineProperty(_isValidNumber, INSTRUCTION_RU, warnings.ru.isValidNumber), _isValidNumber),
  /**
  * Check for compliance with the number of not less than min and not more than max 
  * (works if given and min and max at the input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  minMax: (_minMax = {
    validate: function validate(input) {
      var min = Number(input.min);
      var max = Number(input.max);
      var value = Number(input.value);
      return min > value || value > max;
    }
  }, defineProperty(_minMax, INSTRUCTION_EN, warnings.en.minMax), defineProperty(_minMax, INSTRUCTION_RU, warnings.ru.minMax), _minMax),
  /**
  * Check for compliance of not less than min (for input type="number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  min: (_min = {
    validate: function validate(input) {
      var min = Number(input.min);
      var value = Number(input.value);
      return min > value;
    }
  }, defineProperty(_min, INSTRUCTION_EN, warnings.en.min), defineProperty(_min, INSTRUCTION_RU, warnings.ru.min), _min),
  /**
  * Check for compliance of not more than max (for input type = "number")
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  max: (_max = {
    validate: function validate(input) {
      var max = Number(input.max);
      var value = Number(input.value);
      return value > max;
    }
  }, defineProperty(_max, INSTRUCTION_EN, warnings.en.max), defineProperty(_max, INSTRUCTION_RU, warnings.ru.max), _max),
  /**
  * Check the validity of the entered email address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isEmailCorrect: (_isEmailCorrect = {
    validate: function validate(input) {
      return (/^.+@.+$/.test(input.value)
      );
    }
  }, defineProperty(_isEmailCorrect, INSTRUCTION_EN, warnings.en.isEmailCorrect), defineProperty(_isEmailCorrect, INSTRUCTION_RU, warnings.ru.isEmailCorrect), _isEmailCorrect),
  /**
  * Check on the validity of the entered phone number
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidTel: (_isValidTel = {
    validate: function validate(input) {
      return !/[^0-9 .()*+-]/g.test(input.value);
    }
  }, defineProperty(_isValidTel, INSTRUCTION_EN, warnings.en.isValidTel), defineProperty(_isValidTel, INSTRUCTION_RU, warnings.ru.isValidTel), _isValidTel),
  /**
  * Check on the validity of the entered url address
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isValidUrl: (_isValidUrl = {
    validate: function validate(input) {
      return (/^(https?|s?ftp|file):\/\/[a-zа-яё_-]+[\a-zа-яё\.]{2,6}\??([a-zа-яё_-]+)\#?([a-zа-яё_-]+)/g.test(input.value)
      );
    }
  }, defineProperty(_isValidUrl, INSTRUCTION_EN, warnings.en.isValidUrl), defineProperty(_isValidUrl, INSTRUCTION_RU, warnings.ru.isValidUrl), _isValidUrl),
  /**
  * Check activation of the required field (for checkbox or radio)
  * 
  * @param input {HTMLInputElement}
  * @returns true or false {boolean}
  */
  isRequired: (_isRequired = {
    validate: function validate(input) {
      return input.checked;
    }
  }, defineProperty(_isRequired, INSTRUCTION_EN, warnings.en.isRequired), defineProperty(_isRequired, INSTRUCTION_RU, warnings.ru.isRequired), _isRequired),
  /**
  * Check the activation of elements of at least one of the groups (for checkbox or radio)
  * 
  * @param array {Array}
  * @returns rezult {boolean}
  */
  isEmptyGroup: (_isEmptyGroup = {
    validate: function validate(array) {
      return array.some(function (item) {
        return item.checked;
      });
    }
  }, defineProperty(_isEmptyGroup, INSTRUCTION_EN, warnings.en.isEmptyGroup), defineProperty(_isEmptyGroup, INSTRUCTION_RU, warnings.ru.isEmptyGroup), _isEmptyGroup)
};

/**
 * Determines error on ordinary field
 * 
 * @param config {Object}
 * @param inputElement {HTMPInputElement}
 * @param instructions {String}
 * @returns storeErrors {Map}
 */

var getMessageError = function getMessageError(config, inputElement, instructions) {
  var message = '';
  config.some(function (item) {
    var checker = types[item];
    if (!checker) {
      return false;
    }

    var result = checker.validate(inputElement);
    if (!result) {
      message = checker[instructions];
      return true;
    }
    return false;
  });
  return message;
};

/**
 * Determines error on ordinary field
 * 
 * @param dataInput {Object}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
var checkValue = function checkValue(dataInput, storeErrors) {
  var toArray = Object.values(dataInput);
  var instructions = 'instructions-' + types.lang;

  if (!toArray.length) {
    return storeErrors;
  }

  toArray.forEach(function (_ref) {
    var inputElement = _ref.inputElement,
        config = _ref.config;

    var message = getMessageError(config, inputElement, instructions);
    storeErrors.set(inputElement, message);
  });
  return storeErrors;
};

/**
 * Determines field in the group or ordinary
 * 
 * @param item {HTMLInputElement}
 * @returns true or false {boolean}
 */
var checkAttrGroup = function checkAttrGroup(item) {
  return item === IS_EMPTY_GROUP;
};

/**
 * Detected name of its group
 * 
 * @param groupName {String}
 * @param name {String}
 * @param listOfErrors {Array}
 * @returns name {String}
 */
var checkGroupName = function checkGroupName(groupName, name, listOfErrors) {
  var newName = void 0;
  if (groupName) {
    newName = groupName;
  } else if (!listOfErrors.includes(name)) {
    listOfErrors.push(name);
    console.error('Please enter valid groupname for input with name ' + name + ' \n      and type="checkbox"');
  }
  return newName;
};

/**
 * Detected field type and detected name of its group
 * 
 * @param item {HTMLInputElement}
 * @returns name {String}
 */
var sortForName = function sortForName(_ref, listOfErrors) {
  var type = _ref.type,
      name = _ref.name,
      dataset = _ref.dataset;

  var newName = void 0;

  if (type === RADIO) {
    newName = name;
  } else if (type === CHECKBOX) {
    newName = checkGroupName(dataset.groupname, name, listOfErrors);
  }
  return newName;
};

/**
 * It passes through the main list, and created groups to check
 * 
 * @param arrName {String}
 * @param list {Array}
 * @returns arr {Array}
 */
var selectAllElementsCurrentGroup = function selectAllElementsCurrentGroup(currentName, list, listOfErrors) {
  var arr = [];

  list.forEach(function (item) {
    var name = sortForName(item, listOfErrors);
    if (currentName === name) {
      arr.push(item);
    }
  });
  return arr;
};

/**
 * Sort the field to check on groups
 * 
 * @param listGroups {Array}
 * @returns arr {Array}
 */
var sortGroups = function sortGroups(listGroups) {
  var groups = [];
  var listGroupsName = [];
  var listOfErrors = [];

  listGroups.forEach(function (item) {
    var currentName = sortForName(item, listOfErrors);
    if (!listGroupsName.includes(currentName)) {
      var currentCroup = selectAllElementsCurrentGroup(currentName, listGroups, listOfErrors);
      listGroupsName.push(currentName);
      groups.push(currentCroup);
    }
  });
  return groups;
};

/**
 * Get message about error
 * 
 * @param arr {Array}
 * @returns message {String}
 */
var getMessage = function getMessage(arr, instructions) {
  var message = '';

  if (!arr.length) {
    return message;
  }

  arr.some(function () {
    var checker = types[IS_EMPTY_GROUP];
    if (!checker) {
      return false;
    }

    var result = checker.validate(arr);
    if (!result) {
      message = checker[instructions];
      return true;
    }
    return false;
  });
  return message;
};

/**
 * Field group check
 * 
 * @param groupRadio {Array}
 * @param storeErrors {Map}
 * @returns storeErrors {Map}
 */
var checkValueGroup = function checkValueGroup(groupRadio, storeErrors) {
  var instructions = 'instructions-' + types.lang;

  if (!groupRadio.length) {
    return storeErrors;
  }

  groupRadio.forEach(function (arr) {
    var message = getMessage(arr, instructions);
    storeErrors.set(arr[0], message);
  });
  return storeErrors;
};

var addedClasses = function addedClasses(element) {
  for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    classes[_key - 1] = arguments[_key];
  }

  return element.classList.add(classes);
};
var removedClasses = function removedClasses(element) {
  for (var _len2 = arguments.length, classes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    classes[_key2 - 1] = arguments[_key2];
  }

  return element.classList.remove(classes);
};

/* Out errors */

var OutputErrors = function () {
  /* Creates an instance of OutputErrors */
  function OutputErrors() {
    classCallCheck(this, OutputErrors);

    /* Store created tooltips */
    this.storeCreateElements = new Map();
    /* Object with input field and message about error */
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

      messages.forEach(function (message, element) {
        if (message) {
          if (!_this.storeCreateElements.has(element)) {
            _this.errorNotificationElement = {
              createdElement: _this.createErrorElement(element, message),
              message: message
            };
            _this.storeCreateElements.set(element, _this.errorNotificationElement);
          } else if (_this.storeCreateElements.get(element).message !== message) {
            var notifyElement = _this.storeCreateElements.get(element);
            notifyElement.createdElement.textContent = message;
            notifyElement.message = message;
            addedClasses(notifyElement.createdElement, CLASS_SHOW);
          }
        } else if (_this.storeCreateElements.has(element)) {
          var _notifyElement = _this.storeCreateElements.get(element);
          _notifyElement.createdElement.textContent = '';
          _notifyElement.message = '';
          removedClasses(_notifyElement.createdElement, CLASS_SHOW);
        }
      });
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
      addedClasses(span, CLASS_NOTIFY);
      setTimeout(function () {
        return addedClasses(span, CLASS_SHOW);
      });
      span.textContent = message;
      element.parentElement.insertBefore(span, element);
      return span;
    }
  }]);
  return OutputErrors;
}();

/* Store */

var Store = function () {
  /* Creates an instance of Store */
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

/* The main class for validation form */

var Validation = function () {
  /**
  * Creates an instance of Validation.
  * 
  * @param form {HTMLFormElement}
  */
  function Validation(form) {
    var _this = this;

    classCallCheck(this, Validation);

    this.form = form;
    this.listInputElement = form.querySelectorAll('\n      input[type=text],\n      input[type=number],\n      input[type=email],\n      input[type=password],\n      input[type=file],\n      input[type=search],\n      input[type=tel],\n      input[type=url],\n      input[type=checkbox],\n      input[type=radio]\n    ');

    this.store = new Store();
    this.storeErrors = new Map();
    this.dataSimpleInput = Object.create(null);
    this.dataGroupElements = [];
    this.isFormRegisterHandler = false;

    this.boundFormInputHandler = debounce(function (e) {
      return _this.validation(e);
    }, 100, true);
    this.boundFormChangeHandler = debounce(function (e) {
      return _this.validation(e);
    }, 100, true);
    this.registerHandlers();
  }

  /* Registed handlers */


  createClass(Validation, [{
    key: 'registerHandlers',
    value: function registerHandlers() {
      var _this2 = this;

      this.init();
      this.form.addEventListener(EVENT_SUBMIT, function (e) {
        return _this2.validation(e);
      });
    }
  }, {
    key: 'formRegisterHandlers',
    value: function formRegisterHandlers() {
      if (!this.isFormRegisterHandler) {
        this.form.addEventListener(EVENT_INPUT, this.boundFormInputHandler);
        this.form.addEventListener(EVENT_CHANGE, this.boundFormChangeHandler);
        this.isFormRegisterHandler = true;
      }
    }
  }, {
    key: 'formUnRegisterHandlers',
    value: function formUnRegisterHandlers() {
      this.form.removeEventListener(EVENT_INPUT, this.boundFormInputHandler);
      this.form.removeEventListener(EVENT_CHANGE, this.boundFormChangeHandler);
      this.isFormRegisterHandler = false;
    }

    /* Passes through the list of forms of gathering data about each */

  }, {
    key: 'init',
    value: function init() {
      var _this3 = this;

      var listGroups = [];

      Array.prototype.forEach.call(this.listInputElement, function (inputElement, index) {
        var dataset = inputElement.dataset.options;
        if (!dataset) {
          return;
        }
        var datasetToArray = dataset.split(' ');
        if (inputElement.type === RADIO || inputElement.type === CHECKBOX) {
          var isGroup = datasetToArray.some(checkAttrGroup);
          if (isGroup) {
            listGroups.push(inputElement);
            return;
          }
        }
        _this3.dataSimpleInput[index] = {
          inputElement: inputElement,
          name: inputElement.name,
          config: findWarning(inputElement, datasetToArray)
        };
      });
      this.dataGroupElements = sortGroups(listGroups);
    }

    /**
     * Checks forms
     * 
     * @param event {Event}
     */

  }, {
    key: 'validation',
    value: function validation(event) {
      event.preventDefault();
      /** check the ordinary fields */
      checkValue(this.dataSimpleInput, this.storeErrors);
      /** checking the group fields */
      checkValueGroup(this.dataGroupElements, this.storeErrors);

      this.store.getMessage(this.storeErrors);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.storeErrors.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (value !== '') {
            this.formRegisterHandlers();
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (event.type === EVENT_SUBMIT) {
        this.formUnRegisterHandlers();
        this.form.submit();
      }
    }
  }]);
  return Validation;
}();

/**
 * The passing through of the list forms and creating an instance of the class for each form
 * 
 * @param forms список форм {NodeListOf<HTMLFormElement>}
 */
var initValidation = function initValidation(forms) {
  return Array.prototype.forEach.call(forms, function (item) {
    return new Validation(item);
  });
};

/* Find all forms on the page */
var validation = function validation() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof window === 'undefined') {
    console.error('Sorry but this library is designed to work in the browser!');
    return;
  }

  var forms = document.querySelectorAll('form[data-validation=true]');
  if (config.lang) {
    types.lang = config.lang;
  } else {
    var htmlLang = document.documentElement.lang;
    types.lang = htmlLang || EN;
  }
  var configToArray = Object.values(config);
  if (configToArray.length) {
    configToArray.map(function (_ref) {
      var typeField = _ref.typeField,
          checkName = _ref.checkName;
      return typeField.forEach(function (i) {
        return config$1[i].push(checkName);
      });
    });
    Object.assign(types, config);
  }
  initValidation(forms);
};

// module.exports = validation;
var config = {
  isTestCheck: {
    lang: 'en',
    typeField: ['text', 'number'],
    checkName: 'isTestCheck',
    validate: function validate(input) {
      return input.value !== '';
    },

    'instructions-ru': 'это поле не может быть пустым.',
    'instructions-en': 'This field can not be empty.'
  }
};

validation(config);
