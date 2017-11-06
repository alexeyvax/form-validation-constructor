# form-validation-constructor

Простая библиотека-конструктор для валидации формы на стороне клиента.

Конструктор построен на основе паттерна "Стратегия". Который позволяет осуществить
подстановку нужных проверок к нужным полям ввода.

form-validation-constructor расчитан на дополнение существующих браузерных проверок
своими кастомными проверками и на замену их.

В разделе [как добавить свою проверку](#add-custom-ckeck), можно ознакомиться с примером
добавления своей проверки к проверяемому элементу.

## Обратите внимание

Это не конечная версия конструктора.

Может работать не корректно.

В настоящее время ведётся доработка проекта.

## Посмотреть пример

[Посмотреть пример кода](https://github.com/alexeyvax/form-validation-constructor/tree/master/example)

![Example1](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example.gif)

```javascript
Вам необходимо склонировать репозиторий и ввести в консоли

npm install

после

npm start
```

и открыть в вашем браузере файл index.html


## Установка

Для установки библиотеки скачайте её командой

```javascript
npm install --save form-validation-constructor
```

После необходимо подключить
Лучше всего подключать в вашем корневом файле, куда подключаются все скрипты
пример:

```javascript
// index.js or main.js
// подключите
import formValidationConstructor from 'form-validation-constructor';

// запустите
formValidationConstructor();
```

или

**скачайте скрипт** form-validation-constructor

версия [form-validation-constructor.min.js](https://github.com/alexeyvax/form-validation-constructor/blob/master/download/form-validation-constructor.min.js)

и подключите

```javascript
// index.html
<script src="your-path/form-validation-constructor.min.js"></script>
```

## Инструкция по использованию

Для начала, добавьте форму на страницу

```javascript
// index.html
<form name="form" action="/" method="post"></form>
```

Для проверки формы необходимо указать у неё **data** атрибут **data-validation="true"**

```javascript
<form name="form" action="/" method="post" data-validation="true"></form>
```

Теперь форма добавится в список проверяющихся, после необходимо добавить в форму поля ввода, к примеру
у нас есть простая форма состоящая из трёх полей: имя, email, и подтверждение о согласии.

Запишем следующим образом:

```javascript
<form name="form" action="/" method="post" data-validation="true">
  // имя
  <label for="name">Имя пользователя</label>
  <input type="text" name="name" id="name" data-options="isNonEmpty onlyLetters" placeholder="Имя *" />
  // email
  <label for="email">Email адрес</label>
  <input type="email" name="email" id="email" data-options="isNonEmpty isEmailCorrect" placeholder="Email *" />
  // согласие
  <label for="agreed">Согласен на обработку...</label>
  <input type="checkbox" name="agreed" id="agreed" data-options="isRequired" />
</form>
```

В первом поле необходимо ввести имя, которое содержит только буквы, без спец символов.
Для этого добавляем в атрибут **data-options="isNonEmpty onlyLetters"** нужные проверки.

Во втором поле **input type="email"** мы используем проверку на пустоту и на корректность введённого email адреса.

В третьем поле чекбокс с согласием, для проверки необходимо добавить атрибут
**data-options="isRequired"** и тогда поле будет обязательным к заполнению.
Важный момент, атрибут **"isRequired"** работает только для полей ввода с типами **checkbox** и **radio**.

**Важное дополнение** в data атрибут **data-options** можно добавлять сколько угодно соответствующих
проверок перечислив их через пробел, например так:

```javascript
data-options="isNonEmpty onlyLetters"
```

Если вы допустили **ошибку** или не к тому типу поля поставили проверку, то выведется предупреждение в консоль
с описанием ошибки.
![Example error](https://github.com/alexeyvax/form-validation-constructor/blob/master/gif-example/example-error.png)

Если в форме есть необязательные поля, то просто не ставьте у них атрибут **data-options**

### Стили

Если вы хотите использовать готовые стили, вы можете добавить эту строку в ваш тег <head>
пример:

```javascript
<link rel="stylesheet" type="text/css" href="./node_modules/form-validation-constructor/public/style.css">
```

расположить тултипы на странице вы можете сами, просто добавив что-то вроде этого

```
.tooltip {
  bottom: 10px;
  left: 230px;
}
```

но если вы хотите написать свои стили, вы можете написать их используя классы .tooltip и .message
пример структуры тултипа:

```
<div class="tooltip">
  <span class="message">message about error</span>
</div>
```

### Установка языка всплывающих подсказок

Всплывающие подсказки на данный момент на английском и русском языках. Язык подсказок соответствует языку,
который передан при инициализации скрипта пример:

```javascript
formValidationConstructor({ lang: 'en' });
```

или указан в атрибуте **lang** в теге **html**

```javascript
<html lang="en">
```

Если не передан язык при инициализации или не установлен в атрибуте **lang**,
то язык по умолчанию будет английский 'en'.

### <a name="add-custom-ckeck"></a> Kак добавить свою проверку

Идея в том, что можно дописать свою кастомную проверку к уже существующим, записав её следующим образом
и передать первым аргументом при подключении скрипта

пример:

```javascript
const config = {
  // установить язык
  lang: 'en',
  // список ваших проверок {Object}
  listOfChecks: [ // (перечислены в массиве{Array})
    {
      // название вашей проверки
      name: 'isTestCheck',
      // типы полей к которым будет применена проверка(перечислены в массиве{Array})
      typeField: [
        'text',
        'number',
      ],
      // функция проверки, принимает проверяемый елемент input {HTMLInputElement}
      // функция должна возвращать true или false {Boolean}
      validate(input) {
        return input.value !== '';
      },
      // вывод текста ошибок на нужном языке
      instructions: {
        en: {
          // ключ - название проверки, значение - сообщение
          isTestCheck: 'This field can not be empty.',
        },
        ru: {
          isTestCheck: 'это поле не может быть пустым.',
        },
      },
    },
    ...
  ],
};

formValidationConstructor(config);
```

и теперь можно добавить проверку к элементу

```javascript
<input type="text" name="name" id="name" data-options="isTestCheck" placeholder="Имя *" />
```

### Создание группы для элементов с типом checkbox

Всем элементам с типом checkbox, которые будут в одной группе, необходимо добавить data атрибут
**data-groupname=""** с названием группы и data атрибут **data-options="isEmptyGroup"**
для проверки на то, что выбран хоть один чекбокс.

пример:
```javascript
<input type="checkbox" name="checkbox-first" data-groupname="one" data-options="isEmptyGroup" />
<input type="checkbox" name="checkbox-second" data-groupname="one" data-options="isEmptyGroup" />
<input type="checkbox" name="checkbox-third" data-groupname="one" data-options="isEmptyGroup" />
```

## Список существующих проверок

* **isNonEmpty** - проверка на пустоту поля, (аналог **required** для всех полей ввода кроме *ckeckbox* и *radio*)
* **isValidNumber** - проверка на число
* **isEmailCorrect** - проверка на валидность введённого email адреса
* **isValidTel** - проверка на валидность введённого номера телефона
* **isValidUrl** - проверка на валидность введённого url адреса
* **onlyLetters** - проверка на введение букв без спец символов
* **minMax** - проверка на соответствие числа, не меньше min и не больше max (работает если указаны **min** и **max** у input **type="number"**)
* **min** - проверка на соответствия числа, не меньше min (для input **type="number"**)
* **max** - проверка соответствия числа, не больше max (для input **type="number"**)
* **isRequired** - проверка на активацию обязательного поля (для **checkbox** и **radio**)
* **group** - проверка группы элементов на активацию хотя бы одного из группы (для **checkbox** и **radio**)


## Полная таблица проверок

| **тип поля**      | **существующие проверки** |
| ----------------- | ------------------------- |
| text              | isNonEmpty                |
|                   | onlyLetters               |
| number            | isNonEmpty                |
|                   | isValidNumber             |
|                   | minMax                    |
|                   | min                       |
|                   | max                       |
| email             | isNonEmpty                |
|                   | isEmailCorrect            |
| password          | isNonEmpty                |
| file              | isNonEmpty                |
| search            | isNonEmpty                |
|                   | onlyLetters               |
| tel               | isNonEmpty                |
|                   | isValidTel                |
| url               | isNonEmpty                |
|                   | isValidUrl                |
| checkbox          | isRequired                |
|                   | group                     |
| radio             | isRequired                |
|                   | group                     |

## Лицензия

[MIT](https://github.com/alexeyvax/form-validation-constructor/blob/master/LICENSE.md)
