# Источники данных (v2) - `в разработке`

## Конфигурация

### Получение настроек источника данных по алиасу

Метод: GET /v2/datasource/:alias

**Uri параметры запроса**
* alias - алиас источника указанного при создании

**Параметры ответа (200 OK)**

* success (bool, required) - успешный запрос
* item (DataSourceConfigDto, required) - параметры источника данных


### Получение списка источников данных

Метод: GET /v2/datasource

**Параметры ответа (200 OK)**

* success (bool, required) - успешный запрос
* items (DataSourceConfigDto[], required) - список источников данных


### Создание источника данных
**Метод**: POST /v2/datasource

Создает новый источник данных по указанным настройкам

**Параметры тела запроса** 

Параметры из DataSourceConfigDto

**Параметры ответа (200 OK) - json object**: 

* success (bool, required) - успешность запроса,
* errors (Error[], optional, если success = false) - список возникших ошибок,
* data (object, optional) - данные по созданному источнику данных 
  * id (string, required) - идентификатор созданного источника данных

### Изменение источника данных по алиасу

Перезаписывает настройки по алиасу

**Метод**: PUT /v2/datasource/:alias

**Uri параметры запроса**
* alias - алиас источника указанного при создании

**Параметры тела запроса**: DataSourceConfigDto

**Параметры ответа** (200 OK):

* success (bool, required) - успешность запроса,
* errors (Error[], optional, если success = false) - список возникших ошибок,
* data (object, optional)
    * id (string, required) - идентификатор измененного источника данных

### Обновление параметров настроек по алиасу

Обновляет по алиасу настройки которые были переданы, те которые не переданы оставляет в исходном виде

**Метод**: PATCH /v2/datasource/:alias

**Uri параметры запроса**
* alias - алиас источника указанного при создании

**Параметры тела запроса**: DataSourceConfigDto

**Параметры ответа** (200 OK):

* success (bool, required) - успешность запроса,
* errors (Error[], optional, если success = false) - список возникших ошибок,
* data (object, optional)
    * id (string, required) - идентификатор измененного источника данных


## Работа с данными

### Получение списка данных

Метод: POST /v2/datasource/:alias/data

**Параметры тела запроса**

* filters (FilterItemInterface[], optional) - фильтры 
* fields (string[], optional) - выбираемые поля
* search (string, optional) - поисковый запрос, если указаны фильтры, то с учетом фильтров
* take (integer, optional,  default 50) - кол-во записей в выборке, макс 500
* skip (integer, optional, default 0) - кол-во записей которые нужно пропустить
* sort (object[], optional) - сортиировка по полям, параметры объект массива
  * field (string, required) - поле сортировки
  * ask (boolean, optional) - по возрастанию
* route (string[], optional) - фильтр по пути записей, работает для источника с isTree = true
* parentId (string, optional) - фильтр по родительскому элементу


**Параметры тела ответа**

* success (bool, required) - успешность запроса,
* items (object[], optional) - список данных
  * ... все поля или указанные поля в параметре `fields`
* errors (Error[], optional, если success = false) - список возникших ошибок,
* count (int, required) - кол-во записей в выборке


### Получение записи по идентификатору

Метод: GET /v2/datasource/:alias/data/:itemId

Параметры:
* :alias - алиас источника данных
* :itemId - идентификатор записи
* fields - список полей, которые необходимо включить, если не указан, то все поля, включая системные

Параметры тела ответа

* success (bool, required) - успешность запроса,
* item (object, required) - данные записи
  * ... все поля записи или только указанные поля в запросе

### Получение список изменений записи по идентификатору записи

Метод: GET /v2/datasource/:alias/data/:itemId/revisions

Параметры запроса:
* :alias - алиас источника данных
* :itemId - идентификатор записи

Параметры ответа: 

* success (bool, required) - успешность запроса,
* items (object, required) - данные записи
    * id (string, required) - ид истории изменения
    * version - версия
    * createdBy (string, required) - ид пользователя внесшего изменения
    * createdAt (timestamp, required) - дата и время внесения изменения


### Получение изменения записи по идентификатору записи и ид изменения

Метод: GET /v2/datasource/:alias/data/:itemId/revisions/:revId

Параметры запроса:
* :alias - алиас источника данных
* :itemId - идентификатор записи
* :revId - идентификатор изменения

Параметры ответа:

* success (bool, required) - успешность запроса,
* item (object, required) - все данные записи истории изменения
* revisionId - идентификатор изменения
* version - версия



# Структура объектов

## DataSourceConfigDto
* title (string, required) - название,
* type (string:enum, required) - тип источника, может принимать значения:
    * internal `deprecated` - внутрениий источник данных, данные храняться в единой таблице в виде json объекта,
    * internal-db `в разработке` - внутрениий источник данных, умеет управлять полями таблиц, данные храняться в отдельной таблице
    * custom - для особых случаев работы с данными, исполняется на стороне клинета, поэтому для обработки больших данных лучше не использовать
    * restapi `в разработке` - загружает данные через метод апи стороннего сервиса
    * sql `в разработке` - позволяет получать данные с помощью SQL запроса,
* alias (string, required) - уникальный алиас или псевдоним источника данных,
* fields (Field[], required) - поля
* readonly (bool, optional, default false) - только для чтения,
* isTree (bool, optional, default false) - древовидный источник данных,
* keyFields (string[], optional, default [id]) - ключевые поля, доступно только для типа `internal-db`, если установлено, то можно загружать данные по ключу через метод `POST /v2/datasource/:alias/data/by-keys`
* eventHandlers (EventHandler[], optional, default []) - подпись на события изменения в данных
* permissions (object, required) - разрешения
    * can{`Action`} (string:enum) - возможные значения
        * all - все могут
        * roles - могут перечисленные роли, указанные в `can{Action}Roles`
        * nobody - никто
    * can{`Action`}Roles - роли, обязательно для `can{Action} = roles`

## Field

Настройка полей источника данных

Параметры

* alias
* type


## FieldType

Перечисление типов полей источника данных

Доступные значения:
* number
* string
* bool
* text
* enum
* image
* file
* datetime
* date
* time
* link
* table

## Action
Действие над данными источника данных, возможные значения

Тип: Перечисление

Доступные значения:
* Add - добавить строку
* Edit - изменить строку
* Remove - удалить строку

Пример:
```json
{
  ...
  "permissions": {
    "canAdd": "roles",
    "canEdit": "roles",
    "canRemove": "roles",
    "canAddRoles": [
      "managers"
    ],
    "canEditRoles": [
      "managers"
    ],
    "canRemoveRoles": [
      "managers"
    ]
  }
```

## EventHandler

Обработчик событий, при изменениях в источнике данных

Параметры:

* event (string:enum, required) - событие по которому запуститься обработчик
* handler (object, required) - обработчик
  * type (string:enum, required) - тип обработчка
    * script - скрипт javascript
    * function - функция
  * functionAlias (string, required if type = function) - алиас функции
  * script (string, required if type = script) - скрипт

Пример:

```json
{
  "event": "onAdd",
  "handler": {
    "type": "function",
    "functionAlias": "get-orders"
  }
}
```


## Error

Ошибка выполнения запросов

Тип: объект

Параметры:

* code (string, optional) - код ошибки
* description (string, required) - человекопонятное описание ошибки