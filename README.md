simpleTabs jQuery Plugin v0.1
=============================

Простой плагин jQuery, который может работать с неограниченным количеством
наборов табов на странице. Без всяких эффектов и наворотов.
### Для работы достаточно:
- передать коллекцию элементов jQuery
- Назначить класс "content-tab" контейнерам с контентом
- Назначить класс "tab-control" переключателям

### Опции:
```javascript
// Передать объект в аргумент функции
{
    classNameTabControl: 'string',          // Переопределить имя класса по умолчанию для переключателей
    classNameTabContent: 'string',          // Переопределить имя класса по умолчанию для контента табов
    classNameTabControlActive: 'string',    // Переопределить имя класса по умолчанию для активного переключателя
    verticalTabs : {width: int},            // Использовать вертикальные табы на ширине экрана до указанного
    verticalTabs : true                     // Использовать для всех разрешений
}
```
### require:
> jQuery 1.10.1 или выше

### quick start:
```html
<script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
<script type="text/javascript" src="src/simpleTabs.js"></script>
$('.tabs').simpleTabs();
```

### demo:
demo.html


