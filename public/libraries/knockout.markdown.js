(function (factory) {
    // Module systems magic dance.

    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), require("markdown"));
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "markdown"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, markdownit);
    }
}
(function (ko, markdown) {
    ko.markdown = markdown();

	ko.bindingHandlers.markdown = {
		update: function(element, valueAccessor, allBindingsAccessor) {
			var allBindings = allBindingsAccessor();
			var markdownBinding = allBindings.markdown;

            var markdownData = ko.unwrap(markdownBinding);
            element.innerHTML = ko.markdown.render(markdownData);
		}
	};
}));