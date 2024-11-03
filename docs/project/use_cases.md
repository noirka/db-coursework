# Розроблення функціональних вимог до системи


## Загальна схема
```plantuml

@startuml
skinparam noteFontColor white

actor "Робітник" as Collaborator


usecase "<b>SignUp</b>\nЗареєструватися" as SignUp
usecase "<b>Login</b>\nВвхід у систему" as Login
usecase "<b>ManageTasks</b>\nУправління завданнями" as ManageTasks
usecase "<b>EditUser</b>\nРедагування даних користувача" as EditUser


Collaborator -r-> SignUp
Collaborator -u-> Login
Collaborator -l-> ManageTasks
Collaborator -u-> EditUser




note bottom of Collaborator  #4e4e4e

   Робітник може повною мірою керувати тільки<b>власними завданнями</b>
   та на призначених йому завданнях він має можливість тільки
   <b>змінювати статус</b> (to-do/in progress/done/in rewiew).
   <b>Фільтрувати</b> та <b>коментувати</b> робітник може повною мірою <b>всі</b>
   <b>завдання проекту</b>.
   

end note

actor "Тімлід" as Teamlead

usecase "<b>ProjectManage</b>\nКерувати проектом" as ProjectManage



Teamlead -> ProjectManage
Teamlead -u-|> Collaborator

actor "Адміністратор системи" as Admin

usecase "<b>DataManage</b>\nКерувати даними системи" as DataManage


Admin --> DataManage

Admin -u-|> Teamlead
@enduml

```

## Робітник

```plantuml
@startuml
skinparam noteFontColor white

actor "Робітник" as Collaborator

usecase "<b>SignUp</b>\nРеєстрація" as SignUp
usecase "<b>UserSignUp</b>\nРеєстрація користувача" as UserSignUp
usecase "<b>LogIn</b>\nВхід" as Login
usecase "<b>UserLogIn</b>\nВхід користувача" as UserLogIn
usecase "<b>EditUser</b>\nРедагувати дані користувача" as EditUser
usecase "<b>ManageTasks</b>\nКерувати завданнями" as ManageTasks
usecase "<b>CreateTask</b>\nСтворити завдання" as CreateTask
usecase "<b>EditTask</b>\nРедагувати завдання" as EditTask
usecase "<b>DeleteTask</b>\nВидалити завдання" as DeleteTask
usecase "<b>FilterTask</b>\nВідфільтрувати завдання" as FilterTask
usecase "<b>CommentTask</b>\nКоментувати завдання" as CommentTask

Collaborator -l-> SignUp
SignUp <.d. UserSignUp:extends
Collaborator -r-> Login
Login <.d. UserLogIn:extends
Collaborator --d-> EditUser
Collaborator -u-> ManageTasks
ManageTasks <.u. CommentTask:extends
ManageTasks <.u. FilterTask:extends
ManageTasks <.u. DeleteTask:extends
ManageTasks <.u. EditTask:extends
ManageTasks<.u. CreateTask:extends

note bottom of Collaborator #4e4e4e

    Робітник може повною мірою керувати тільки<b>власними завданнями</b>
   та на призначених йому завданнях він має можливість тільки
   <b>змінювати статус</b> (to-do/in progress/done/in rewiew).
   <b>Фільтрувати</b> та <b>коментувати</b> робітник може повною мірою <b>всі</b>
   <b>завдання проекту</b>.
   

end note
@enduml

```
## Тімлід
```plantuml
@startuml
top to bottom direction

actor "Тімлід" as Lead

usecase "<b>CreateProject</b>\nСтворити проект" as CreateProject
usecase "<b>DeleteProject</b>\nВидалити проект" as DeleteProject
usecase "<b>EditProject</b>\nРедагувати проект" as EditProject
usecase "<b>ProjectManage</b>\nКерувати проєктом" as ProjectManage

CreateProject .d.> ProjectManage: extends
DeleteProject .d.> ProjectManage: extends
EditProject .d.> ProjectManage: extends

Lead -u-> ProjectManage
@enduml
```
## Адміністратор
```plantuml
@startuml
actor "Адміністратор системи" as Admin
usecase "<b>DataManage</b>\nКерувати даними системи" as DataManage
usecase "<b>BanUser</b>\nЗаблокувати користувача" as BanUser
usecase "<b>UnBanUser</b>\nРозблокувати користувача" as UnBanUser

Admin -d-> DataManage
BanUser .u.> DataManage:extends
UnBanUser .u.> DataManage:extends
@enduml
```
## Сценерії 

<table>
    <tr>
        <th>ID</th>
        <th id="EditUser"><code>EditUser</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Редагувати користувача</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, адміністратор,система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач ввійшов до системи</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Користувача успішно відредаговано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Користувача не знайдено (UserNotFoundException)</li>
                <li>Недостатні права для редагування (InsufficientPermissionsException)</li>
                <li>Введені дані некоректні (InvalidDataException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вносить зміни в дані.</li>
                <li>Система перевіряє коректність введених даних (можливе InvalidDataException).</li>
                <li>Система зберігає зміни в даних користувача.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Натискає на кнопку "Редагувати";

: Вносить зміни в дані;

|Система|
: Перевіряє коректність введених даних;

note right #ffaaaa
<b> Можливе виключення:
<b> InvalidDataException
end note

: Зберігає зміни в даних користувача;

|Користувач|
: Успішно редагує дані;

stop;

@enduml
```
</center>
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="UserSignUp"><code>UserSignUp</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Реєстрація користувача</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач не зареєстрований у системі</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Користувача успішно зареєстровано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Користувач вже існує (UserAlreadyExistsException)</li>
                <li>Недостатні дані (InsufficientDataException)</li>
                <li>Введені дані некоректні (InvalidDataException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач заповнює форму реєстрації.</li>
                <li>Система перевіряє введені дані (можливе InvalidDataException або InsufficientDataException).</li>
                <li>Система перевіряє, чи користувач вже існує (можливе UserAlreadyExistsException).</li>
                <li>Користувача успішно реєструють у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Заповнює форму реєстрації;

: Натискає на кнопку "Зареєструватися";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InvalidDataException
<b> InsufficientDataException
end note

: Перевіряє, чи користувач вже існує;

note right #ffaaaa
<b> Можливе виключення:
<b> UserAlreadyExistsException
end note

|Користувач|
: Успішно реєструється у системі;

stop;

@enduml
```
</center>
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="UserLogIn"><code>UserLogIn</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Вхід користувача</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач зареєстрований у системі</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Користувача успішно авторизовано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Користувач ввів неправильне ім'я користувача (InvalidUsernameException)</li>
                <li>Користувач ввів неправильний пароль (InvalidPasswordException)</li>
                <li>Користувач заблокований (UserBannedException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вводить ім'я користувача і пароль.</li>
                <li>Користувач натискає на кнопку "Увійти".</li>
                <li>Система перевіряє введені дані (можливе InvalidUsernameException або InvalidPasswordException).</li>
                <li>Система перевіряє статус користувача (можливе UserBannedException).</li>
                <li>Користувача успішно авторизують у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Вводить ім'я користувача і пароль;

: Натискає на кнопку "Увійти";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InvalidUsernameException
<b> InvalidPasswordException
end note

: Перевіряє статус користувача;

note right #ffaaaa
<b> Можливе виключення:
<b> UserBannedException
end note

|Користувач|
: Успішно авторизується у системі;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="CreateTask"><code>CreateTask</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Створення задачі</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач увійшов до системи</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Задача успішно створена</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Недостатні дані для створення задачі (InsufficientDataException)</li>
                <li>Задача з таким же ідентифікатором вже існує (TaskAlreadyExistsException)</li>
                <li>Недостатні права для створення задачі (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач заповнює форму створення задачі.</li>
                <li>Користувач натискає на кнопку "Створити задачу".</li>
                <li>Система перевіряє введені дані (можливе InsufficientDataException).</li>
                <li>Система перевіряє, чи існує задача з таким же ідентифікатором (можливе TaskAlreadyExistsException).</li>
                <li>Задача успішно створена у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Заповнює форму створення задачі;

: Натискає на кнопку "Створити задачу";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InsufficientDataException
end note

: Перевіряє, чи існує задача з таким же ідентифікатором;

note right #ffaaaa
<b> Можливе виключення:
<b> TaskAlreadyExistsException
end note

|Користувач|
: Успішно створює задачу;

stop;

@enduml
```
</center>
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="EditTask"><code>EditTask</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Редагування задачі</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач увійшов до системи і має доступ до задачі</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Задача успішно редагована</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Недостатні дані для редагування задачі (InsufficientDataException)</li>
                <li>Задача не знайдена (TaskNotFoundException)</li>
                <li>Недостатні права для редагування задачі (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вибирає задачу для редагування.</li>
                <li>Користувач вносить зміни до задачі.</li>
                <li>Користувач натискає на кнопку "Зберегти зміни".</li>
                <li>Система перевіряє введені дані (можливе InsufficientDataException).</li>
                <li>Система перевіряє, чи існує задача (можливе TaskNotFoundException).</li>
                <li>Задача успішно редагована у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Вибирає задачу для редагування;

: Вносить зміни до задачі;

: Натискає на кнопку "Зберегти зміни";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InsufficientDataException
end note

: Перевіряє, чи існує задача;

note right #ffaaaa
<b> Можливе виключення:
<b> TaskNotFoundException
end note

|Користувач|
: Успішно редагує задачу;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="DeleteTask"><code>DeleteTask</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Видалення задачі</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач увійшов до системи і має доступ до задачі</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Задача успішно видалена</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Задача не знайдена (TaskNotFoundException)</li>
                <li>Недостатні права для видалення задачі (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вибирає задачу для видалення.</li>
                <li>Користувач підтверджує видалення задачі.</li>
                <li>Система перевіряє, чи існує задача (можливе TaskNotFoundException).</li>
                <li>Задача успішно видалена з системи.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Вибирає задачу для видалення;

: Підтверджує видалення задачі;

|Система|
: Перевіряє, чи існує задача;

note right #ffaaaa
<b> Можливе виключення:
<b> TaskNotFoundException
end note

|Користувач|
: Успішно видаляє задачу;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="FilterTask"><code>FilterTask</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Фільтрація задач</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач увійшов до системи та має доступ до списку задач</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Система відображає відфільтрований список задач</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Немає задач, що відповідають критеріям фільтрації (NoTasksFoundException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вводить критерії фільтрації.</li>
                <li>Користувач натискає на кнопку "Фільтрувати".</li>
                <li>Система обробляє запит на фільтрацію.</li>
                <li>Система перевіряє наявність задач, що відповідають критеріям (можливе NoTasksFoundException).</li>
                <li>Система відображає відфільтрований список задач.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Вводить критерії фільтрації;

: Натискає на кнопку "Фільтрувати";

|Система|
: Обробляє запит на фільтрацію;

: Перевіряє наявність задач, що відповідають критеріям;

note right #ffaaaa
<b> Можливе виключення:
<b> NoTasksFoundException
end note

|Користувач|
: Відображає відфільтрований список задач;

stop;

@enduml
```
</center>
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="CommentTask"><code>CommentTask</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Додавання коментаря до задачі</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Користувач, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Користувач увійшов до системи і має доступ до задачі</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Коментар успішно додано до задачі</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Задача не знайдена (TaskNotFoundException)</li>
                <li>Недостатні права для додавання коментаря (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Користувач вибирає задачу, до якої хоче додати коментар.</li>
                <li>Користувач вводить текст коментаря.</li>
                <li>Користувач натискає на кнопку "Додати коментар".</li>
                <li>Система перевіряє, чи існує задача (можливе TaskNotFoundException).</li>
                <li>Система перевіряє права користувача на додавання коментаря (можливе InsufficientPermissionsException).</li>
                <li>Коментар успішно додано до задачі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Користувач|
start;
: Вибирає задачу для додавання коментаря;

: Вводить текст коментаря;

: Натискає на кнопку "Додати коментар";

|Система|
: Перевіряє, чи існує задача;

note right #ffaaaa
<b> Можливе виключення:
<b> TaskNotFoundException
end note

: Перевіряє права користувача на додавання коментаря;

note right #ffaaaa
<b> Можливе виключення:
<b> InsufficientPermissionsException
end note

|Користувач|
: Успішно додає коментар до задачі;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="CreateProject"><code>CreateProject</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Створення проекту</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Тімлід, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Тімлід увійшов до системи</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Проект успішно створено</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Недостатні дані для створення проекту (InsufficientDataException)</li>
                <li>Проект з таким же ідентифікатором вже існує (ProjectAlreadyExistsException)</li>
                <li>Недостатні права для створення проекту (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Тімлід заповнює форму створення проекту.</li>
                <li>Тімлід натискає на кнопку "Створити проект".</li>
                <li>Система перевіряє введені дані (можливе InsufficientDataException).</li>
                <li>Система перевіряє, чи існує проект з таким же ідентифікатором (можливе ProjectAlreadyExistsException).</li>
                <li>Проект успішно створено у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Тімлід|
start;
: Заповнює форму створення проекту;

: Натискає на кнопку "Створити проект";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InsufficientDataException
end note

: Перевіряє, чи існує проект з таким же ідентифікатором;

note right #ffaaaa
<b> Можливе виключення:
<b> ProjectAlreadyExistsException
end note

|Тімлід|
: Успішно створює проект;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="EditProject"><code>EditProject</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Редагування проекту</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Тімлід, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Тімлід увійшов до системи і має доступ до проекту</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Проект успішно редаговано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Недостатні дані для редагування проекту (InsufficientDataException)</li>
                <li>Проект не знайдено (ProjectNotFoundException)</li>
                <li>Недостатні права для редагування проекту (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Тімлід вибирає проект для редагування.</li>
                <li>Тімлід вносить зміни до проекту.</li>
                <li>Тімлід натискає на кнопку "Зберегти зміни".</li>
                <li>Система перевіряє введені дані (можливе InsufficientDataException).</li>
                <li>Система перевіряє, чи існує проект (можливе ProjectNotFoundException).</li>
                <li>Проект успішно редаговано у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Тімлід|
start;
: Вибирає проект для редагування;

: Вносить зміни до проекту;

: Натискає на кнопку "Зберегти зміни";

|Система|
: Перевіряє введені дані;

note right #ffaaaa
<b> Можливі виключення:
<b> InsufficientDataException
end note

: Перевіряє, чи існує проект;

note right #ffaaaa
<b> Можливе виключення:
<b> ProjectNotFoundException
end note

|Тімлід|
: Успішно редагує проект;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="DeleteProject"><code>DeleteProject</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Видалення проекту</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Тімлід, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Тімлід увійшов до системи і має доступ до проекту</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Проект успішно видалено</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Проект не знайдено (ProjectNotFoundException)</li>
                <li>Недостатні права для видалення проекту (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Тімлід вибирає проект для видалення.</li>
                <li>Тімлід підтверджує видалення проекту.</li>
                <li>Система перевіряє, чи існує проект (можливе ProjectNotFoundException).</li>
                <li>Проект успішно видалено з системи.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Тімлід|
start;
: Вибирає проект для видалення;

: Підтверджує видалення проекту;

|Система|
: Перевіряє, чи існує проект;

note right #ffaaaa
<b> Можливе виключення:
<b> ProjectNotFoundException
end note

|Тімлід|
: Успішно видаляє проект;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="BanUser"><code>BanUser</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Блокування користувача</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Адміністратор, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Адміністратор увійшов до системи</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Користувача успішно заблоковано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Користувача не знайдено (UserNotFoundException)</li>
                <li>Недостатні права для блокування користувача (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Адміністратор вибирає користувача для блокування.</li>
                <li>Адміністратор підтверджує блокування користувача.</li>
                <li>Система перевіряє, чи існує користувач (можливе UserNotFoundException).</li>
                <li>Користувача успішно заблоковано у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Адміністратор|
start;
: Вибирає користувача для блокування;

: Підтверджує блокування користувача;

|Система|
: Перевіряє, чи існує користувач;

note right #ffaaaa
<b> Можливе виключення:
<b> UserNotFoundException
end note

|Адміністратор|
: Успішно блокує користувача;

stop;

@enduml
```
</center> 
<br>
<table>
    <tr>
        <th>ID</th>
        <th id="UnbanUser"><code>UnbanUser</code></th>
    </tr>
    <tr>
        <th>Назва</th>
        <td>Розблокування користувача</td>
    </tr>
    <tr>
        <th>Учасники</th>
        <td>Адміністратор, система</td>
    </tr>
    <tr>
        <th>Передумови</th>
        <td>Адміністратор увійшов до системи</td>
    </tr>
    <tr>
        <th>Результат</th>
        <td>Користувача успішно розблоковано</td>
    </tr>
    <tr>
        <th>Виключні ситуації</th>
        <td>
            <ul>
                <li>Користувача не знайдено (UserNotFoundException)</li>
                <li>Користувач не заблокований (UserNotBannedException)</li>
                <li>Недостатні права для розблокування користувача (InsufficientPermissionsException)</li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Основний сценарій</th>
        <td>
            <ol>
                <li>Адміністратор вибирає користувача для розблокування.</li>
                <li>Адміністратор підтверджує розблокування користувача.</li>
                <li>Система перевіряє, чи існує користувач (можливе UserNotFoundException).</li>
                <li>Система перевіряє, чи користувач заблокований (можливе UserNotBannedException).</li>
                <li>Користувача успішно розблоковано у системі.</li>
            </ol>
        </td>
    </tr>
</table>

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;">

```plantuml
@startuml

|Адміністратор|
start;
: Вибирає користувача для розблокування;

: Підтверджує розблокування користувача;

|Система|
: Перевіряє, чи існує користувач;

note right #ffaaaa
<b> Можливе виключення:
<b> UserNotFoundException
end note

: Перевіряє, чи користувач заблокований;

note right #ffaaaa
<b> Можливе виключення:
<b> UserNotBannedException
end note

|Адміністратор|
: Успішно розблоковує користувача;

stop;

@enduml
```
</center> 
