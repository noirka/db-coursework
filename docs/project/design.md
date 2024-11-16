# Проєктування бази даних
##Модель бізнес об'єктів

@startuml

entity User
entity User.nickname
entity User.email
entity User.photo
entity User.password
entity User.isBanned

User.nickname --* User
User.email --* User
User.photo --* User
User.password --* User
User.isBanned --* User

entity Project
entity Project.name
entity Project.description

Project.name --* Project
Project.description --* Project

entity Task
entity Task.name
entity Task.description
entity Task.deadline
entity Task.status
entity Task.comment

Task.name --* Task
Task.description --* Task
Task.deadline --* Task
Task.status --* Task
Task.comment "0,*" -- "1,1" Task
Task.comment "0,*" -- "1,1" User : author

entity Team
Team "1,1" -- "0,*" Task
Team "0,*" -- "1,1" Project

entity Assignment
Task "1,1" -- "0,*" Assignment
User "1,1" -- "0,*" Assignment

entity Label
Label "0,*" -- "1,1" Task

entity Action
entity Action.date
Action.date --* Action
Action "0,*" -- "0,1" Assignment
Action "0,*" -- "0,1" User
Action "0,*" -- "0,1" Task

@enduml

В рамках проекту розробляється: 

- ER-модель
- реляційна схема

