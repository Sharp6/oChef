define(['knockout', 'jquery', 'datepicker', 'moment'], function(ko, $, datepicker, moment) {
  
  function sanitizeDate(something) {
    var myMoment = moment(something);
    return myMoment.format("YYYY-DD-MM");
  }

  ko.bindingHandlers.datepicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
      //initialize datepicker with some optional options
      var options = allBindingsAccessor().datepickerOptions || {};
      $(element).datepicker(options);

      $('#myModal').on('shown.bs.modal', function() {
        $(element).datepicker(options);

      });


      //when a user changes the date, update the view model
      ko.utils.registerEventHandler(element, "changeDate", function(event) {
             var value = valueAccessor();
             if (ko.isObservable(value)) {
                var myDate = sanitizeDate(event.date);
                 value(myDate);
             }                
      });
    },
    update: function(element, valueAccessor)   {
        /*
        var widget = $(element).data("datepicker");
         //when the view model is updated, update the widget
        if (widget) {
            widget.date = ko.utils.unwrapObservable(valueAccessor());
            if (widget.date) {
                widget.setValue();            
            }
        }
        */
    }
  };
});


