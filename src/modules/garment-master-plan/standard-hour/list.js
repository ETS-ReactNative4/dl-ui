import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
    context = ["detail"];
    columns = [
        { field: "BuyerName", title: "Buyer" },
        { field: "ComodityName", title: "Comodity" },
        { 
            field: "SMVDate", title: "Tanggal Update", 
            formatter: function (value, data, index) {
                return moment(value).format("DD MMM YYYY");
            }
        },
        { field: "MinuteCutting", title: "SMV Cutting" },
        { field: "MinuteSewing", title: "SMV Sewing" },
        { field: "MinuteFinishing", title: "SMV Finishing" },
    ];

    loader = (info) => {
        var order = {};
    if (info.sort)
      order[info.sort] = info.order;

    var arg = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      size: info.limit,
      keyword: info.search,
      order: order
    }

    return this.service.search(arg)
      .then(result => {
        return {
          total: result.info.total,
          data: result.data
        }
      });
    }

    constructor(router, service) {
        this.service = service;
        this.router = router;
    }

    contextClickCallback(event) {
        var arg = event.detail;
        var data = arg.data;
        switch (arg.name) {
            case "detail":
                this.router.navigateToRoute('view', { id: data.Id });
                break;
        }
    }

    create() {
        this.router.navigateToRoute('create');
    }
}