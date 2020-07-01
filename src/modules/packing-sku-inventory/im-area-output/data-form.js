import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Service } from "./service";

let InspectionAreaLoader = require("../../../loader/input-inspection-material-loader");
let FilterSPPLoader = require("../../../loader/pre-output-im-spp-loader");

@inject(Service)
export class DataForm {
    @bindable title;
    @bindable readOnly;
    @bindable data;
    @bindable error;
    formOptions = {
        cancelText: "Kembali",
        saveText: "Simpan",
        deleteText: "Hapus",
        editText: "Ubah",
    }
    controlOptions = {
        label: {
            length: 4,
        },
        control: {
            length: 4,
        },
    };
    itemColumns = [];
    // itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Keterangan Transit", "Satuan", "Saldo", "Qty Keluar"];
    shifts = ["PAGI", "SIANG"];
    detailOptions = {};
    destinationAreas = ["TRANSIT", "PACKING", "GUDANG AVAL", "PRODUKSI"];
    areas = ["INSPECTION MATERIAL", "PROD", "TRANSIT", "PACK", "GUDANG JADI", "SHIP", "AWAL", "LAB"]
    constructor(service) {
        this.service = service;
    }
    groups = ["A", "B"];
    get inspectionAreaLoader() {
        return InspectionAreaLoader;
    }

    get filterSPPLoader() {
        return FilterSPPLoader;
    }

    areaMovementTextFormatter = (areaInput) => {
        return `${areaInput.bonNo}`
    }


    sppTextFormatter = (spp) => {
        return `${spp.productionOrder.no}`
    }

    @computedFrom("data.id")
    get isEdit() {
        return (this.data.id || '').toString() != '';
    }

    @bindable ItemsCollection;
    bind(context) {
        this.context = context;
        this.data = this.context.data;

        this.data.area = "INSPECTION MATERIAL";

        this.error = this.context.error;
        this.cancelCallback = this.context.cancelCallback;
        this.deleteCallback = this.context.deleteCallback;
        this.editCallback = this.context.editCallback;
        this.saveCallback = this.context.saveCallback;

        if (this.data.destinationArea) {
            this.destinationArea = this.data.destinationArea;
        }

        this.detailOptions = {
            isEdit: this.isEdit,
            destinationArea: this.destinationArea
        }

        if (this.destinationArea === "GUDANG AVAL") {
            if (this.readOnly) {
                this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan"];
            } else {
                if (this.isEdit) {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo", ""];
                } else {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo"];
                }

            }

        } else {
            if (this.readOnly) {
                this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Satuan"];
            } else {
                if (this.isEdit) {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo", ""];
                } else {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo"];
                }

            }

        }

        if (this.data.inspectionMaterialProductionOrders) {
            this.data.displayInspectionMaterialProductionOrders = this.data.inspectionMaterialProductionOrders;

        }

        if (this.ItemsCollection) {
            this.ItemsCollection.bind();
        }

        // this.detailOptions.isEdit = this.isEdit;
        // this.detailOptions.destinationArea = this.data.destinationArea;

    }
    addItemCallback = (e) => {
        this.data.displayInspectionMaterialProductionOrders = this.data.displayInspectionMaterialProductionOrders || [];
        this.data.displayInspectionMaterialProductionOrders.push({})
    };

    // @bindable selectedInspectionMaterial;
    // selectedInspectionMaterialChanged(n, o) {
    //     if (this.selectedInspectionMaterial) {
    //         this.data.inputInspectionMaterialId = this.selectedInspectionMaterial.id;
    //         if (this.selectedInspectionMaterial.inspectionMaterialProductionOrders) {
    //             this.data.inspectionMaterialProductionOrders = this.selectedInspectionMaterial.inspectionMaterialProductionOrders.filter(s => s.isChecked == true && s.hasOutputDocument == false);
    //         }

    //     }

    // }

    @bindable destinationArea;
    destinationAreaChanged(n, o) {
        if (this.destinationArea) {
            this.data.destinationArea = this.destinationArea;
            this.detailOptions.destinationArea = this.data.destinationArea;
            if (this.destinationArea === "GUDANG AVAL") {
                if (this.readOnly) {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan"];
                } else {
                    if (this.isEdit) {
                        this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo", ""];
                    } else {
                        this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo"];
                    }

                }

            } else {
                if (this.readOnly) {
                    this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Satuan"];
                } else {
                    if (this.isEdit) {
                        this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo", ""];
                    } else {
                        this.itemColumns = ["No. SPP", "Qty Order", "No. Kereta", "Material", "Unit", "Buyer", "Warna", "Motif", "Keterangan", "Mesin", "Satuan", "Saldo"];
                    }

                }

            }
            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
            // if (!this.data.id) {

            //     this.selectedInspectionMaterial = null;
            //     this.data.inspectionMaterialProductionOrders = [];
            // }
        }
    }

    ExportToExcel() {
        this.service.generateExcel(this.data.id);
    }

    @bindable selectedFilterSPP;
    async selectedFilterSPPChanged(n, o) {
        if (this.selectedFilterSPP) {

            this.data.displayInspectionMaterialProductionOrders = await this.service.getProductionOrderInputById(this.selectedFilterSPP.productionOrder.id);
            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
        } else {

            this.data.displayInspectionMaterialProductionOrders = await this.service.getProductionOrderInput();
            if (this.ItemsCollection) {
                this.ItemsCollection.bind();
            }
        }
    }
}


