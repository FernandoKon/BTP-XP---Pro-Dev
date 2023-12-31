sap.ui.define([
   "sap/ui/core/format/DateFormat"
 ], function (DateFormat) {
    "use strict";
 
    return {
      formatDate: function (oDate) {
         if (!oDate) {
             return "";
         }
     
         const oDateFormat = DateFormat.getDateTimeInstance({
             style: "medium",
             pattern: "dd/MM/yyyy' - 'HH'h'mm"
         });

         if (!(oDate instanceof Date)) {
            oDate = new Date(oDate);
         }

         return oDateFormat.format(oDate);
     },
    };
 });