import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  // Сообщение для tooltip
  tooltipMessage = 'Скопировать';

  copyCode(value: string, tooltip: MatTooltip) {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        // Меняем сообщение tooltip на "Скопировано!"
        this.tooltipMessage = 'Скопировано!';
        tooltip.show(); // Показать tooltip

        // Возвращаем сообщение через 2 секунды
        setTimeout(() => {
          this.tooltipMessage = 'Скопировать';
          tooltip.hide(); // Скрыть tooltip после смены сообщения
        }, 2000);
      })
      .catch(err => {
        console.error('Ошибка при копировании: ', err);
      });
  }
}
