
import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyleft'; // you can override any options available
  newestOnTop = false;
  showCloseButton = false;
 // positionClass
  positionClass: 'toast-top-right';
  //positionclass:toast-top-center = true;

}