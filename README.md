# Document Management Application (Русская версия ниже)

### The application is available at - http://217.18.61.214/
Login - admin@admin.ru <br>
Password - admin

For other users, the password is - 123

This repository contains the <img height="16" width="16" src="https://cdn.simpleicons.org/htmx/#3366CC" /> frontend <img height="16" width="16" src="https://cdn.simpleicons.org/htmx/#3366CC" /> part of the application. The backend was implemented by [glebushnik](https://github.com/glebushnik). The project is hosted in the repository https://github.com/glebushnik/documentApp.

The application serves as a platform for document exchange and employee organization.

## Main Features of the Application
Administration:
  * Adding and editing new users through the admin panel
  * Filtering users
  * Blocking / permanently deleting users
  * Creating and editing user groups
  * Creating and editing document groups

Profile: 
  * Viewing personal information

Users:
  * Viewing all non-banned users

Documents:
  * Displaying available documents (details on display principles will be described later)
  * Creating and editing documents (only the owner or an administrator can edit a document)
  * Downloading documents
  * Adding comments
  * Filtering documents

Tasks:
  * Creating and editing tasks
  * Marking tasks with various statuses (completed, in progress, etc.)

Sending:
  * Sending selected documents from the application to a specified email

#### Document Access Scheme
![document access scheme](https://github.com/TrojanDll/document-flow-client/assets/60787064/313d7c65-49e2-41f8-9b81-21ca181b421b)

___

### Frontend Technology Stack:
  * TypeScript <img height="16" width="16" src="https://cdn.simpleicons.org/typescript/#3178C6" />
  * React <img height="16" width="16" src="https://cdn.simpleicons.org/react/#61DAFB" />
  * Redux Toolkit, RTK Query <img height="16" width="16" src="https://cdn.simpleicons.org/redux/#764ABC" />
  * Bootstrap <img height="16" width="16" src="https://cdn.simpleicons.org/bootstrap/#7952B3" />
  * Vite <img height="16" width="16" src="https://cdn.simpleicons.org/vite/#646CFF" />

___

### Running the Project Locally
  * `git clone https://github.com/TrojanDll/document-flow-client.git` 
  * `npm install`
  * `npm run dev`

<br>
<br>
<br>
<br>

# Приложение документооборота

### Приложение доступно по адресу - http://217.18.61.214/
Логин - admin@admin.ru <br>
Пароль - admin

Для остальных пользователей пароль - 123

В данном репозитории представлена <img height="16" width="16" src="https://cdn.simpleicons.org/htmx/#3366CC" /> frontend <img height="16" width="16" src="https://cdn.simpleicons.org/htmx/#3366CC" /> часть приложения. Backend выполнил [glebushnik](https://github.com/glebushnik). Проект лежит в репозитории https://github.com/glebushnik/documentApp.

Приложение представляет собой платформу для обмена документами, организации сотрудников.

## Основные функции приложения
Администрирование:
  * Добавление нового пользователя и его редактирование через административную панель
  * Фильтрация пользователей
  * Блокировка / полное удаление пользователя
  * Создание и редактирование групп пользователей
  * Создание и редактирование групп документов

Профиль: 
  * Просмотр личной информации

Пользователи:
  * Просмотр всех незабаненых пользователей

Документы:
  * Отображение доступных документов (о принципах отображения будет описано далее)
  * Создание и редактирование документов (редактировать документ может только владелец или администратор)
  * Скачивание документа
  * Добавлиение комментариев
  * Фильтрация документов

Задачи:
  * Создание и редактирование задач
  * Пометка задач различными статусами (выполнено, в работе ...)

Отправка:
  * Отправка выбранных документов из приложения на указанную почту

#### Схема разделения доступа к документам
![схема доступа к документам](https://github.com/TrojanDll/document-flow-client/assets/60787064/313d7c65-49e2-41f8-9b81-21ca181b421b)

___

### Стек технологий на frontend:
  * TypeScript <img height="16" width="16" src="https://cdn.simpleicons.org/typescript/#3178C6" />
  * React <img height="16" width="16" src="https://cdn.simpleicons.org/react/#61DAFB" />
  * Redux Toolkit, RTK Query <img height="16" width="16" src="https://cdn.simpleicons.org/redux/#764ABC" />
  * Bootstrap <img height="16" width="16" src="https://cdn.simpleicons.org/bootstrap/#7952B3" />
  * Vite <img height="16" width="16" src="https://cdn.simpleicons.org/vite/#646CFF" />

___

### Запуск проекта локально
  * `git clone https://github.com/TrojanDll/document-flow-client.git` 
  * `npm install`
  * `npm run dev`

