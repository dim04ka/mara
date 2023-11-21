import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private token = '6915127467:AAGPtQkaC_LhD-XjnSMx8E1G7mV-zLiTyvI'; // Replace with your backend server URL

  constructor(private http: HttpClient) {}

  sendMessageToTelegram(chatId: string, message: string): Observable<any> {
    const payload = { chatId, message };
    return this.http.post<any>(
      `https://api.telegram.org/bot${this.token}/getUpdates`,
      payload
    );
  }
}
