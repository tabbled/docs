# Настройка Script Context: Пошаговое руководство

При выполнении выражений на страницах или в функциях прокидывается глобальные переменные, 
которые позволяют расширить функционал, выполнить проверки или дополнительную логику.

## Глобальные переменные

* `pages` (PagesService) - позволяет работать со страницами
* `dataSources` (DataSourceService) - сервис доступа к источникам данных
* `functions` (FunctionsService) - сервис позволяет вызывать и работать с функциями
* `users` (UsersService) - работа с пользователями
* `page` (PageParams) - текущие параметры страницы, доступно только в визульных компонентах и страницах
* `message` (Message) - позволяет отобразить сообщение пользователю в виде всплыващего окна


### PagesService

Доступно только при испольнении интерфейсного кода, переменная `ctx.pages`

#### Функции

##### open(alias: string, params: any)
Открыть страницу по алиасу

Параметры:
* `alias`: string - алиас указанный в настройках страницы
* `params`: any - параметры открытия страницы, который будут доступны в переменной контекста `ctx`

Для страниц редактирования (`isEditPage=true`) обязательным параметром для открытия конкретной сущности является указание в `params` параметра `id` требуемой сущности, которые подставляется в route, наприме `/example-entity/{id}`. Если требуется открыть странцу для создания новой сущности, то передать `id=new`

Пример открытия страницы редактирования существующей сущности (наприме выбранной в строке таблицы):
```js
pages.open('"example-entity"', {
    "id": "1681863152662220800"
})
```
Пример открытия страницы редактирования для создания новой сущности
```js
ctx.pages.open('"example-entity"', {
    "id": "new"
})
```

##### design (alias: string)

Открыть страницу по алиасу в дизайнере страниц

Параметры:
* `alias`: string - алиас указанный в настройках страницы

##### openDialog (options: DialogOptions)

Открыть страницу в диалоговом окне

Структура DialogOptions:

* `page` (string, required) - алиас страницы 
* `title` (string, optional) - заголовок страницы
* `modal` (bool, optional, default false) boolean - модальное окно, невозможно закрыть кликом мыши вне диалога
* `width` (number, optional, default 400px) number - ширина окна
* `selecting` (bool, optional, default false) boolean - диалог выбора, на странице должен быть компонент Table, который передает выбранные строки после нажатия кноки "Выбрать"
* `onClose` (Function, optional) - callback вызываемый при закрытии окна
* `onSelect` (Function, optional) - callback вызываемый после нажатия кнопки "Выбрать"
* `onOpen` (Function, optional) - callback вызываемый при открытии страницы

Пример вызова
```js
ctx.pages.openDialog({
    page: "example-dialog",
    title: "Выбрать что то",
    selecting: true,
    onSelect: (event) => {
        console.log(event)
    }
})
```

### DataSourceService

Работа с источниками данных

#### Функции

##### getByAlias(alias: string) : DataSource

Параметры

* `alias` (string, required) - алиас источника данных указанного в настройках

Возвращает экземпляр класса `DataSource`

#### DataSource

Позволяет работать с данными конкретного источника данных.

##### Функции

###### getMany(options?: GetDataManyOptions): Promise\<GetManyResponse\>

Возвращает набор сущностей по заданным фильтрам

Структура `GetDataManyOptions`:
* `filter` (array of FilterItemInterface, optional) - фильтры по полям
* `fields` (array of string, optional, default all fields) - необходимые для выборки поля по алиасам
* `search` (string, optional) - поиск по совпадения текста, действуте только для полей с установленным полнотекстовым поиском
* `take` (number, optional, default 100) - ограничение по кол-ву записей в выборке
* `skip` (number, optional, default 0) - пропустить кол-во записей 
* `sort` (object, optional), - сортировка, доступны параметры: 
  * `field` (string, required) - алиас поля
  * `ask` (boolean,  required) - по возрастанию 
* `include` (array of string) - обязательно включить записи в выборку если они даже не подходят в поиске или фильтре


###### getById(id: string) : Promise\<EntityInterface | undefined\>

Возвращает сущность по его идентификатору

###### getByKeys?(keys: any) : Promise\<EntityInterface | undefined\>

Возвращает запись по ключевым полям, требуется для источников агрегаторов

###### insert(id: string, value: any, parentId?: string, route?: string[]): Promise\<EntityInterface\>

Добавить новую запись

###### updateById(id: string, value: object): Promise\<EntityInterface\>

Обновить щапись по идентификатору

###### removeById(id: string, route?: string[]): Promise\<boolean\>

Удалить запись по идентификатору, удаление мягкое, т.е. устанавливается пометка об удалении, потом запись можно найти в удаленных.

###### setValue?(id: string, field: string, value: any): Promise\<void\>

Обновить значение поля по идентификатору

###### setVariable?(alias: string, value: any)

Установить переменную для источника данных

###### getFieldByAlias(alias: string): FieldInterface | undefined

Возвращает параметры поля источника данных

###### hasPermission(action: string, userPermissions: any)

Возвращает, имеет ли пользователь полномочия на действие

Доступные значения `alias`:
* `Add` - добавление
* `Edit` - изменения
* `Remove` - удаление

### FunctionsService

Работа с функциями

#### Функции

##### invoke (alias: string, context: any) : Promise\<any\>

Вызов функции по алиасу с передачей контекста в функцию

Пример

```js
functions.invoke('some-func', {
    makeSomething: true
})
```
