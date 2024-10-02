---
title: Источники данных (v2)
description: Документация Tabbled платформы | Источники данных (v2)
---

# Работа с источниками данных в API DataSource v2

## Конфигурация

### Получить список страниц

### Получить страницу по алиасу

### Обновить параметры страницы

# Структура объектов

## PageDto
* alias (string, required) - алиас страницы
* title (string, required) - название,
* datasets (array[object]) - наборы данных подключенных к старнице, параметры
  * alias (string, required) - алиас
  * datasource (string, required) - алиас источника данных
  * fields (array[string], optional) - поля для выборки, если не указан, выбирает все доступные поля источника данных
* elements (array[object], required) - элементы страницы
  * id (string) - ид элемента
  * componentName (string) - имя компонента
  * properties (object) - параметры компонента, зависит от доступного набора параметров компонента
  * colSpan (number) - ширина компонента, кол-во колонок в 12 колоночном гриде
* headerActions (array[object]) - действия в шапке старницы

## Error

Ошибка выполнения запросов

Тип: объект

Параметры:

* statusCode (string, optional) - код ошибки
* error (string, required) - описание ошибки
* message (string[], optional) - ошибки при валидации запроса