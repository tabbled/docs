# Работа с источниками данных в API DataSource v2

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

* filter (FilterItemInterface[], optional) - фильтры 
* filterBy (string, optional) - фильтр с sql синтакисом, имеет приоритет над filter
* fields (string[], optional) - выбираемые поля
* searchBy (string[], optional) - искать по полям, если не указан, то ищет по всем полям указанных как сортируемые `sortable=true`
* query (string, optional) - поисковый запрос, если указаны фильтры, то с учетом фильтров
* limit (integer, optional,  default 50) - кол-во записей в выборке, макс 500
* offset (integer, optional, default 0) - кол-во записей которые нужно пропустить
* sort (string[], optional) - сортиировка, в формате `field_name:asc|desc`, например `name:asc`
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

### Индексировать данные

Индексирует данные для быстрого поиска и фильтрации списка данных. Для индексации создается задача которая выполняется отдельным процессом, в ответ получаем `taskId` статус которого можно узнать в отдельном методе. 

Если передан параметр `ids` то будет проиндексирован только указанные по идентификаторам записи.
 
Данные в `internal` источнике данных индексируются автоматически.

Метод: POST /v2/datasource/:alias/data/index

Url параметры:
* :alias - алиас источника данных

Body параметры:
* ids (string[], optional) - идентификаторы записей, которые необходимо проиндексировать


Параметры ответа:
* statusCode (int, required) - статус код
* taskId -

## История изменений записи

### Получение список изменений записи по идентификатору записи

Возвращает список изменений по записи отсротированные по дате создания по убыванию (самые новые первые)

Метод: GET /v2/datasource/:alias/data/:itemId/revision

Параметры запроса:
* :alias - алиас источника данных
* :itemId - идентификатор записи

Параметры ответа: 

* items (object, required) - данные записи
    * id (string, required) - ид истории изменения
    * version - версия
    * createdBy (string, required)
      * id (int, required) - ид пользователя,
      * username (string, required if id not null) - имя пользователя
      * title (string, optional if id not null) - Полное имя (Имя + Фамилия) 
    * createdAt (timestamp, required) - дата и время внесения изменения
* count (int, required) - кол-во записей

### Получение изменения записи по идентификатору записи и ид изменения

Возвращает данные записи по ид изменения.

Метод: GET /v2/datasource/:alias/data/:itemId/revision/:revId

Параметры запроса:
* :alias - алиас источника данных
* :itemId - идентификатор записи
* :revId - идентификатор изменения

Параметры ответа:

* id (string, required) - идентификатор изменения
* version (int, required) - версия
* createdAt (timestamp, required) - дата и время внесения изменения
* createdBy (string, required)
  * id (int, required) - ид пользователя,
  * username (string, required if id not null) - имя пользователя
  * title (string, optional if id not null) - Полное имя (Имя + Фамилия)
* data (object, required) - данные после изменения


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

* statusCode (string, optional) - код ошибки
* error (string, required) - описание ошибки
* message (string[], optional) - ошибки при валидации запроса