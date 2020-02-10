/**
 * @module test/Sample/controller/TestController
 */
sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @yields {typeof sap.ui.core.mvc.Controller}
     */
    Controller => {
        /**
         * @alias module:test/Sample/controller/TestController
         */
        const extObj = {
            /**
             * @function
             */
            bla() {},

            fasel() {
                this.bla()
            }
        }
        return Controller.extend("test.Sample.controller.TestController", extObj)
    }
)
