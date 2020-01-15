sap.ui.define(["test/Sample/controller/BaseController", "sap/m/MessageToast"], (Controller, MessageToast) => {
    "use strict"

    return Controller.extend("test.Sample.controller.Main", {
        // (live) transpiling async functions to ES5 generators not yet doable in ui5-tooling ecosys :)
        /* async */ onInit() {
            // let response;
            // let oLatestUI5 = {
            //     version: "n/a"
            // };
            // try {
            //     response = await fetch('/proxy/api/v1/latest?format=json');
            //     oLatestUI5 = await response.json();
            // } catch (err) {
            //     console.error(err)
            // }
            // this.getModel('LatestUI5').setProperty("/latest", latestU5version.version)

            fetch("/proxy/api/v1/latest?format=json")
                .then(response => response.json())
                .then(latestU5version => {
                    this.getModel("LatestUI5").setProperty("/latest", latestU5version.version)
                })
                .catch(err => console.error(err))
        },

        navFwd() {
            return this.getOwnerComponent()
                .getRouter()
                .navTo("RouteOther")
        },

        handleUploadPress(oEvent) {
            const oFileUploader = this.byId("FileUploader")
            if (oFileUploader.getValue() === "") {
                return MessageToast.show(this.getResourceBundle().getText("startPage.upload.chooseFileText"))
            }
            // Create new image entity:
            const sUuidV4 = this.getView().getController().generateUuidv4()

            const oPayload = {
                ID: sUuidV4,
                mediatype: "image/png"
            }

            fetch(`${oFileUploader.getUploadUrl()}`, {
                method: "POST",
                body: JSON.stringify(oPayload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`${response.status} - ${response.statusText}`)
                    }
                    return true
                })
                .then(_ => {
                    oFileUploader.setUploadUrl(`${oFileUploader.getUploadUrl()}(${sUuidV4})/content`)
                    oFileUploader.setSendXHR(true)
                    oFileUploader.upload()
                })
                .catch(err => {
                    MessageToast.show(`Error: ${err}`)
                })
        },

        onUploadComplete(oEvent) {
            const iStatus = oEvent.getParameter("status")
            let sMsg = ""
            if (iStatus === 204) {
                sMsg = `Return Code ${iStatus} - Success`
                oEvent.getSource().setValue("")
                this.byId("ListOfItems")
                    .getBinding("items")
                    .refresh()
            } else {
                sMsg = `Error: ${oEvent.getParameter("response")}`
            }

            MessageToast.show(sMsg)
        }
    })
})
