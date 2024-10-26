---
title: Источники данных (v2)
description: Документация Tabbled платформы | Источники данных (v2)
---

# Работа с источниками данных в API DataSource v2

## Конфигурация

### Получение настроек источника данных по алиасу

Метод: GET /v2/datasource/:alias

**Uri параметры запроса**
* alias - алиас источника указанного при создании

**Параметры ответа (200 OK)**

* statusCode (int, required) - успешность запроса,
* item (DataSourceConfigDto, required) - параметры источника данных


### Получение списка источников данных

Метод: GET /v2/datasource

**Параметры ответа (200 OK)**

* statusCode (int, required) - успешность запроса,
* items (DataSourceConfigDto[], required) - список источников данных


### Создание источника данных
**Метод**: POST /v2/datasource

Создает новый источник данных по указанным настройкам

**Параметры тела запроса** 

Параметры из DataSourceConfigDto

**Параметры ответа (200 OK) - json object**: 

* statusCode (int, required) - успешность запроса,
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

* statusCode (int, required) - успешность запроса,
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

* statusCode (int, required) - успешность запроса,
* errors (Error[], optional, если success = false) - список возникших ошибок,
* data (object, optional)
    * id (string, required) - идентификатор измененного источника данных


## Работа с данными: создание, получение и изменение

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

* statusCode (int, required) - успешность запроса,
* items (object[], optional) - список данных
  * ... все поля или указанные поля в параметре `fields`
* errors (Error[], optional, если success = false) - список возникших ошибок,
* count (int, required) - кол-во записей в выборке
* totals (object, optional) - агрегированные значения полей переданных в запросе agg
  * [field] (number, required) - значение агрегации по полю по всем данным их запроса

### Получение итоговых значений данных

Используется для отображения в колонках таблиц в подвале

Метод: POST /v2/datasource/:alias/data/totals

**Параметры тела запроса**

* filter (FilterItemInterface[], optional) - фильтры
* filterBy (string, optional) - фильтр с sql синтакисом, имеет приоритет над filter
* query (string, optional) - поисковый запрос, если указаны фильтры, то с учетом фильтров
* parentId (string, optional) - фильтр по родительскому элементу
* agg (object[], optional) - агрегировать значения по полям
    * field (string, required) - поле для агрегации
    * func (string:enum, required) - функция, доступны значения
        * none - не агрегировать
        * sum - сумма всех значений
        * avg - среднее значение
        * min - минимальное значение
        * max - максимальное значение

**Параметры тела ответа**

* statusCode (int, required) - успешность запроса,
* totals (object, optional) - агрегированные значения полей переданных в запросе agg
    * [field] (number, required) - значение агрегации по полю по всем данным их запроса

### Экспорт данных в формате csv

Используется для выгрузки данных по указанным колонкм, филльтрации и сортировки.
Работает только для плоской структуры данных `isTree = false`

Метод: POST /v2/datasource/:alias/data/export

**Параметры тела запроса**

* filter (FilterItemInterface[], optional) - фильтры
* filterBy (string, optional) - фильтр с sql синтакисом, имеет приоритет над filter
* query (string, optional) - поисковый запрос, если указаны фильтры, то с учетом фильтров

**Параметры тела ответа**

* statusCode (int, required) - успешность запроса,
* file (string:base64, required) - файл закодированный в строку base64

### Получение записи по идентификатору

Метод: GET /v2/datasource/:alias/data/:itemId

Параметры:
* :alias - алиас источника данных
* :itemId - идентификатор записи
* fields - список полей, которые необходимо включить, если не указан, то все поля, включая системные

Параметры тела ответа

* statusCode (int, required) - успешность запроса,
* item (object, required) - данные записи
  * ... все поля записи или только указанные поля в запросе

### Добавить или обновить записи

Метод: PUT /v2/datasource/:alias/data

Принимает массив записей, которые должны буть добавлены или обновлены в источнике данных. 
Если ид не передан или не существует в бд, будет добавлен новый.

Работа с данными доступна только для типа источника данных internal-db

Если в одной из записей ошибка, то все записи не будут обработаны.

Параметры:
* :alias - алиас источника данных

Параметры запроса

* items (object[], required, 1..100) - записи для добавления или обновления. Для существующей записи, не переданные поля будут иметь прежние значения, т.е. перезапишутся только переданные. Максимум 100 записей в одном запросе.
  * id (string, optional) - если передан и существует в бд, то будет обновлен в бд
  * [DataSourceField.alias] (any, optional) - значения параметры по алиасу поля
* returnItems (bool, optional, default false) - если true, то в ответе будет возвращен массив добавленных/обновленных записей

Параметры ответ

* statusCode (int, required) - успешность запроса,
* items (object[], optional) - список данных, если returnItems=true
    * ... все поля записи включая системные
* errors (Error[], optional, если success = false) - список возникших ошибок,


### Удалить записи

Метод: DELETE /v2/datasource/:alias/data

Метод удаляет 

Параметры:
* :alias - алиас источника данных

Параметры запроса

* ids (string[], optional) - идентификаторы записей
* where (string, optional) - sql like запрос удаления данных по условию
* soft (bool, optional, default true) - мягкое удаление, если true, то ставится пометка удаления, запись в бд остается, но в списке больше не выводиться 

Параметры ответа:

* statusCode (int, required) - успешность запроса,
* errors (Error[], optional, если success = false) - список возникших ошибок

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

* statusCode (int, required) - успешность запроса,
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


## Структура объектов

### DataSourceConfigDto
* title (string, required) - название,
* type (string:enum, required) - тип источника, может принимать значения:
    * internal - внутрениий источник данных, данные храняться в единой таблице в виде json объекта,
    * custom - для особых случаев работы с данными, исполняется на стороне клинета, для обработки больших данных лучше не использовать
    * restapi `в разработке` - загружает данные через метод апи стороннего сервиса
    * sql `в разработке` - позволяет получать данные с помощью SQL запроса,
* alias (string, required) - уникальный алиас или псевдоним источника данных,
* fields (Field[], required) - поля
* readonly (bool, optional, default false) - только для чтения,
* isTree (bool, optional, default false) - древовидный источник данных,
* permissions (object, required) - разрешения
    * [Action] (string:enum) - возможные значения
      * type: 
        * all - все могут
        * roles - могут перечисленные роли, указанные в `can{Action}Roles`
        * nobody - никто
      * roles (string[], optional) - опеределенные роли, которым разрешено, в случае если тип указан roles

### Field

Настройка полей источника данных

Параметры

* alias (string, required) - алиас поля
* type (FieldType, required) - тип поля
* title (string, required) - заголовок поля
* searchable (boolean, optional, default true) - поле для полтотекстового поиска, по умолчанию false, доступна установка в true только для типа string
* filterable (boolean, optional, default true) - фильтруемое поле, по умолчанию true для полей с типом number, enum, link, bool, time, date, datetime
* sortable (boolean, optional, default true) - сортируемое поле, по умолчанию true для number, string
* isMultiple (bool, optional) - множественные значения, доступно только для link, enum, image, file
* defaultValue (string, optional) - значение по умолчанию
* datasourceReference (string, optional) - алиас источника данных, обязательно для типа link и table. Для link будет являться источником данных для отображения в выпадающем списке. Для table будет служить определением вложенной структуры данных, ссылатся может только на источник данных с типом field
* autoincrement (boolean, optional, default false) - счетчик, только для типа number
* isNullable (boolean, optional, default true) - значение может принимать null
* precision (boolean, optional) - точность числового значения
* enumValues (enum[], optional) - значения перечисления, обязательно для типа enum 


### FieldType

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

### Action
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
    "canAdd": {
      "type": "roles",
      "roles": [
        "managers"
      ]
    },
    "canSelect": {
      "type": "any" 
    }
  }
}
```

### EventHandler

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


### Error

Ошибка выполнения запросов

Тип: объект

Параметры:

* statusCode (string, optional) - код ошибки
* error (string, required) - описание ошибки
* message (string[], optional) - ошибки при валидации запроса