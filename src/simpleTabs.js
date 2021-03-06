/**
 * simpleTabs v0.1
 * https://gitlab.com/revilon/simpleTabs
 *
 * Простой плагин jQuery, который может работать с неограниченным количеством
 * наборов табов на странице. Без всяких эффектов и наворотов.
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
            this.switchStyle = options !== undefined && 'switchStyle' in options ? options.switchStyle : false;

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
             * Применить логику для каждого набора табов
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
                    i = 0,
                    contentId = 0;
                $(stackTabs).attr('data-stack-tabs', Parent.numberStackTabs);
                $(stackTabs).find('.' + Parent.classNameTabControl).each(function (index, element) {
                    $(element).attr("data-page", i);
                    i++;
                });
                $(stackTabs).find('.' + Parent.classNameTabContent).each(function (index, element) {
                    $(element).attr("data-page", contentId);
                    contentId++;
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
                var Parent = this,
                    switchStyle = this.switchStyle;
                $(stackTabs).find('.' + Parent.classNameTabControl).removeClass(Parent.classNameTabControlActive);
                $(stackTabs).find('.' + Parent.classNameTabControl + '[data-page=' + i + ']').addClass(Parent.classNameTabControlActive);
                $(stackTabs).find('.' + Parent.classNameTabContent).hide();
                switch (switchStyle) {
                    case 'slide':
                        $(stackTabs).find('.' + Parent.classNameTabContent + '[data-page=' + i + ']').slideDown('slow');
                        break;
                    case 'fade':
                        $(stackTabs).find('.' + Parent.classNameTabContent + '[data-page=' + i + ']').fadeIn('slow');
                        break;
                    default:
                        $(stackTabs).find('.' + Parent.classNameTabContent).hide();
                        $(stackTabs).find('.' + Parent.classNameTabContent + '[data-page=' + i + ']').show();
                }
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
                    $(window).resize(function() {
                        ScreenWidth = screen.width;
                        if (ScreenWidth <= Parent.verticalTabsOptions.width) {
                            Parent.verticalTabsAction();
                        } else {
                            Parent.horizontalTabsAction();
                        }
                    });
                }
            };

            /**
             * Действие для организации вертикальных табов
             */
            this.verticalTabsAction = function () {
                var Parent = this,
                    numberStackTabs,
                    currentStackTabs,
                    contentDetach;
                for(numberStackTabs in Parent.tabsArray) {
                    currentStackTabs = $(Parent.tabsArray[numberStackTabs]);
                    currentStackTabs.find('.' + Parent.classNameTabControl).each(function(index) {
                        contentDetach = $(this)
                            .closest(currentStackTabs)
                            .find('.' + Parent.classNameTabContent + '[data-page=' + index + ']')
                            .detach();
                        contentDetach.insertAfter($(this).filter('[data-page=' + index + ']'));
                    });
                }
            };

            /**
             * Действие для организации горизонтальных табов
             */
            this.horizontalTabsAction = function () {
                var Parent = this,
                    numberStackTabs,
                    currentStackTabs,
                    contentDetach;
                for(numberStackTabs in Parent.tabsArray) {
                    currentStackTabs = $(Parent.tabsArray[numberStackTabs]);
                    currentStackTabs.find('.' + Parent.classNameTabContent).each(function() {
                        contentDetach = $(this).detach();
                        contentDetach.insertAfter(currentStackTabs.find('.' + Parent.classNameTabControl).last());
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
