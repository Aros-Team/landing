import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  private apiUrl = `${environment.apiBaseUrl}/lead`;

  constructor() { }
  
  async sendLead(data: any): Promise<void> {
    // TODO: Descomentar cuando la API esté disponible
    // const response = await fetch(this.apiUrl, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });

    console.log('[MOCK] Lead capturado:', data);
    console.log('[MOCK] Se enviaría a:', this.apiUrl);
  }
}
