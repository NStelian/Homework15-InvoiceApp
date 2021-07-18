import { Component, OnInit } from '@angular/core';
import { InvoiceService } from "../../shared/services/invoice.service";
import { InvoiceModel } from "../../shared/models/invoice.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { InvoiceRequest } from "../../shared/request/invoice.request";

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrls: ['./invoices-table.component.scss']
})
export class InvoicesTableComponent implements OnInit {
  invoices: InvoiceModel[] = [];
  invoiceRequest: InvoiceRequest = new InvoiceRequest('', 0, '', '');

  constructor(
    private invoiceService: InvoiceService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  getAllInvoices() {
    this.invoiceService.getAllInvoices().subscribe((response: InvoiceModel[]) => {
      this.invoices = response;
    });
  }

  deleteInvoice(invoiceId: string) {
    this.invoiceService.deleteInvoice(invoiceId).subscribe((response) => {
      this.getAllInvoices();
    })
  }

  createInvoice(modalReference: any) {
    this.invoiceService.createInvoice(this.invoiceRequest).subscribe((response) => {
      this.getAllInvoices();
    });
    this.clearInvoiceRequest();
    modalReference.close();
  }

  closeModal(modalReference: any) {
    this.clearInvoiceRequest();
    modalReference.close()
  }

  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  private clearInvoiceRequest() {
    this.invoiceRequest = new InvoiceRequest('', 0, '', '');
  }
}
