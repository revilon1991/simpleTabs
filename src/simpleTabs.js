/**
 * simpleTabs v0.1
 * https://gitlab.com/revilon/simpleTabs
 *
 * Простой плагин jQuery, который может работать с неограниченным количеством
 * наборов табов на странице. Без всяких эффектов и наворотов.
 * Для работы достаточно только передать коллекцию элементов jQuery
 *
 * Опции:
 * options.classNameTabControl - Переопределить имя класса по умолчанию для переключателей
 * options.classNameTabContent - Переопределить имя класса по умолчанию для контента табов
 * options.classNameTabControlActive - Переопределить имя класса по умолчанию для активного переключателя
 * options.verticalTabs : {width: [int]} - Использовать вертикальные табы на ширине экрана до указанного
 * options.verticalTabs : true - Использовать для всех разрешений
 *
 * require:
 * > jQuery 1.10.1
 */
(function ($) {
    jQuery.fn.simpleTabs = function (options) {

        function HandlerSimpleTabs(allStackTabs, options) {
            /**
             * Constructor
             */
            $ = jQuery;
            this.allStackTabs = allStackTabs;
            this.tabsArray = [];
            this.numberStackTabs = 0;
            this.classNameTabControl = options !== undefined && 'classNameTabControl' in options ? options['classNameTabControl'] : 'tab-control';
            this.classNameTabControlActive = options !== undefined && 'classNameTabControlActive' in options ? options['classNameTabControlActive'] : 'active';
            this.classNameTabContent = options !== undefined && 'classNameTabContent' in options ? options['classNameTabContent'] : 'content-tab';
            this.verticalTabsOptions = options !== undefined && 'verticalTabs' in options ? options.verticalTabs : false;

            /**
             * Разделить все табы на стеки в виде массива
             */
            this.getArrayFromAllTabs = function() {
                var Parent = this;
                $(Parent.allStackTabs).each(function () {
                    Parent.tabsArray.push(this);
                });
            };

            /**
             *
             */
            this.setAllStacksTabsLogic = function() {
                var Parent = this;
                $(Parent.tabsArray).each(function () {
                    Parent.createStackTabs(this);
                });
            };

            /**
             * Инициализировать стек табов
             * @param stackTabs
             */
            this.createStackTabs = function (stackTabs) {
                var Parent = this,
                    i = 0;
                $(stackTabs).attr('data-stack-tabs', Parent.numberStackTabs);
                $(stackTabs).find('.' + Parent.classNameTabControl).each(function (index, element) {
                    $(element).attr("data-page", i);
                    i++;
                });
                $(stackTabs).find('.' + Parent.classNameTabControl).click(function () {
                    var stack = $(this).closest(stackTabs),
                        page = parseInt($(this).attr('data-page'));
                    Parent.showTab(stack, page);
                });
                Parent.numberStackTabs++;
            };

            /**
             * Открыть таб у нужного стека табов
             * @param stackTabs object
             * @param i integer
             */
            this.showTab = function (stackTabs, i) {
                var Parent = this;
                $(stackTabs).find('.' + Parent.classNameTabContent).hide();
                $(stackTabs).find('.' + Parent.classNameTabContent).eq(i).show();
                $(stackTabs).find('.' + Parent.classNameTabControl).removeClass(Parent.classNameTabControlActive);
                $(stackTabs).find('.' + Parent.classNameTabControl).eq(i).addClass(Parent.classNameTabControlActive);
            };

            /**
             * Открыть первый таб у всех стеков, остальные скрыть
             */
            this.showTabFirstStack = function () {
                var Parent = this;
                $(Parent.tabsArray).each(function () {
                    $(this).find('.' + Parent.classNameTabContent).hide();
                    $(this).find('.' + Parent.classNameTabContent).eq(0).show();
                    $(this).find('.' + Parent.classNameTabControl).removeClass(Parent.classNameTabControlActive);
                    $(this).find('.' + Parent.classNameTabControl).eq(0).addClass(Parent.classNameTabControlActive);
                });
            };

            /**
             * Использовать конструкцию вертикальных табов
             */
            this.verticalTabs = function () {
                var Parent = this,
                    ScreenWidth;
                if (Parent.verticalTabsOptions === true) {
                    Parent.verticalTabsAction();
                }
                if (typeof Parent.verticalTabsOptions == 'object' && 'width' in Parent.verticalTabsOptions) {
                    ScreenWidth = screen.width;
                    if (ScreenWidth <= Parent.verticalTabsOptions.width) {
                        Parent.verticalTabsAction();
                    }
                }
            };

            /**
             * Действие для организации вертикальных табов
             */
            this.verticalTabsAction = function (width) {
                var Parent = this,
                    numberStackTabs,
                    currentStackTabs,
                    contentDetach;
                for(numberStackTabs in Parent.tabsArray) {
                    currentStackTabs = $(Parent.tabsArray[numberStackTabs]);
                    currentStackTabs.find('.' + Parent.classNameTabControl).each(function(index) {
                        contentDetach = $(this).closest(currentStackTabs).find('.' + Parent.classNameTabContent).eq(index).detach();
                        contentDetach.insertAfter($(this));
                    });
                }
            }

        }

        var tabs = new HandlerSimpleTabs(this, options);
        tabs.getArrayFromAllTabs();
        tabs.setAllStacksTabsLogic();
        tabs.showTabFirstStack();
        tabs.verticalTabs();

        return true;
    };
})(jQuery);
