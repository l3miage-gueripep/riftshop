import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../../environment';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseLoginService } from 'src/app/services/firebase-login.service';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.css']
})
export class PaypalCheckoutComponent {
  private paypal: any;
  @ViewChild('alerts') alerts!: ElementRef<HTMLInputElement>;
  protected paymentStateMessage: string = "";
  @Input() product?: Product;

  constructor(private cartService: CartService, private firebaseLoginService: FirebaseLoginService) {
  }

  ngAfterViewInit() {
    document.addEventListener("click", this.handle_click);
    const paypal_sdk_url = "https://www.paypal.com/sdk/js";
    const client_id = "AUl1hn7dWxmzdW8VHFD8FR1ymszs4HtroLIUeLuYleV0kd7PD2HY6aFFScD26IX_Vslc7x_MLnHpHI8Z";
    const currency = "EUR";
    const intent = "capture";

    //PayPal Code
    //https://developer.paypal.com/sdk/js/configuration/#link-queryparameters
    this.url_to_head(`${paypal_sdk_url}?client-id=${client_id}&currency=${currency}&intent=${intent}`)
      .then(() => {
        const self = this;
        //Handle loading spinner
        document.getElementById("loading")?.classList.add("hide");
        document.getElementById("content")?.classList.remove("hide");
        // @ts-ignore
        this.paypal = window['paypal'] as any;
        let paypal_buttons = this.paypal.Buttons({ // https://developer.paypal.com/sdk/js/reference
          onClick: (data: any) => { // https://developer.paypal.com/sdk/js/reference/#link-oninitonclick
            //Custom JS here
          },
          style: { //https://developer.paypal.com/sdk/js/reference/#link-style
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal'
          },

          createOrder: function (data: any, actions: any) { //https://developer.paypal.com/docs/api/orders/v2/#orders_create
            //get the product bought or the cart content
            //TODO: get the id
            const cartContent: CartItem[] = self.product ? [new CartItem(self.product, 1)] : [...self.cartService.content];
              
            return fetch(`${environment.apiUrl}/create_order`, {
              method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
              body: JSON.stringify({ "intent": intent, orderContent: JSON.stringify(cartContent), userUid: JSON.stringify(self.firebaseLoginService.user?.uid) })
            })
              .then((response) => response.json())
              .then((order) => { return order.id; });
          },

          onApprove: function (data: any, actions: any) {
            let order_id = data.orderID;
            return fetch(`${environment.apiUrl}/complete_order`, {
              method: "post", headers: { "Content-Type": "application/json; charset=utf-8" },
              body: JSON.stringify({
                "intent": intent,
                "order_id": order_id
              })
            })
              .then((response) => response.json())
              .then((order_details) => {
                //https://developer.paypal.com/docs/api/orders/v2/#orders_capture!c=201&path=create_time&t=response
                let intent_object = "captures";
                //Custom Successful Message
                self.paymentStateMessage = `Thank you ${order_details.payer.name.given_name} ${order_details.payer.name.surname} for your payment of 
                ${order_details.purchase_units[0].payments[intent_object][0].amount.value} ${order_details.purchase_units[0].payments[intent_object][0].amount.currency_code}!`;
                //Close out the PayPal buttons that were rendered
                paypal_buttons.close();

                //Clear the cart
                self.cartService.clearCart();
                
              })
              .catch((error) => {
                console.log(error);
                self.paymentStateMessage = `An Error Ocurred!`;
              });
          },

          onCancel: function (data: any) {
            self.paymentStateMessage = `Order cancelled!`;
          },

          onError: function (err: Error) {
            console.log(err);
          }
        });
        paypal_buttons.render('#payment_options');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Helper / Utility functions
  url_to_head(url: string) {
    return new Promise<void>(function (resolve, reject) {
      let script = document.createElement('script');
      script.src = url;
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject('Error loading script.');
      };
      document.head.appendChild(script);
    });
  }
  handle_close(event: Event) {
    const target = event.target as HTMLElement;
    target.closest(".ms-alert")?.remove();
  }
  handle_click(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("ms-close")) {
      this.handle_close(event);
    }
  }
}
