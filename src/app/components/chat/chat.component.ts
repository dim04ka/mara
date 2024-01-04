import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  value = '';
  isChatOpen = false;
  toggleOpen() {
    // if (this.isChatOpen) return;
    this.isChatOpen = !this.isChatOpen;
  }

  handleSend(): void {
    console.log(this.value);
  }
}
