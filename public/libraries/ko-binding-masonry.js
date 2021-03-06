(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), require("masonry"));
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "masonry"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, masonry);
    }
}
(function (ko,Masonry) {
    var msnry, haveInitialized, itemClass, masonryOptions;

    ko.bindingHandlers.masonry = {
        defaultItemClass: 'grid-item',
        // Wrap value accessor with options to the template binding,
        // which implements the foreach logic
        makeTemplateValueAccessor: function (valueAccessor) {
            return function () {
                var modelValue = valueAccessor(),
                    options,
                    unwrappedValue = ko.utils.peekObservable(modelValue);    // Unwrap without setting a dependency here

                options = {
                };

                // If unwrappedValue.data is the array, preserve all relevant
                // options and unwrap value so we get updates
                ko.utils.unwrapObservable(modelValue);
                ko.utils.extend(options, {
                    'foreach': unwrappedValue.data,
                    'as': unwrappedValue.as,
                    'includeDestroyed': unwrappedValue.includeDestroyed,
                    'templateEngine': ko.nativeTemplateEngine.instance
                });
                return options;
            };
        },
        'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            itemClass = ko.bindingHandlers.masonry.defaultItemClass;
            masonryOptions = {};
            haveInitialized = false;

            var parameters = ko.utils.unwrapObservable(valueAccessor());
            if (parameters && typeof parameters == 'object' && !('length' in parameters)) {
                if (parameters.masonryOptions) {
                    var clientOptions;
                    if (typeof parameters.masonryOptions === 'function') {
                        clientOptions = parameters.masonryOptions();
                        if (typeof clientOptions !== 'object') {
                            throw new Error('masonryOptions callback must return object');
                        }
                    } else if (typeof parameters.masonryOptions !== 'object') {
                        throw new Error('masonryOptions must be an object or function');
                    } else {
                        clientOptions = parameters.masonryOptions;
                    }
                    ko.utils.extend(masonryOptions, clientOptions);
                }
                if (parameters.masonryOptions.itemClass) {
                    itemClass = parameters.masonryOptions.itemClass;
                }
            }

            // Initialize template engine, moving child template element to an
            // "anonymous template" associated with the element
            ko.bindingHandlers.template.init(
                element,
                ko.bindingHandlers.masonry.makeTemplateValueAccessor(valueAccessor)
            );

            return { controlsDescendantBindings: true };
        },
        'update': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.template.update(element,
                    ko.bindingHandlers.masonry.makeTemplateValueAccessor(valueAccessor),
                    allBindingsAccessor, viewModel, bindingContext);

            // Make this function depend on the view model, so it gets called for updates
            var data = ko.bindingHandlers.masonry.makeTemplateValueAccessor(
                        valueAccessor)().foreach;
            ko.utils.unwrapObservable(data);

            if (!haveInitialized) {
                masonryOptions.itemSelector = '.' + itemClass;
                msnry = new Masonry( element, masonryOptions);
		haveInitialized = true;
            }
            else {
		msnry.reloadItems();
                msnry.layout();
            }

            // Update gets called upon initial rendering as well
            // haveInitialized = true;
            return { controlsDescendantBindings: true };
        }
    };
}));
