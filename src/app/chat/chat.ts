import { Component, ViewChild, ElementRef, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Assistant } from '../services/assistant';
import { EmailService } from '../services/email/email';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  
  messages = signal<{ text: string; role: 'user' | 'bot' }[]>([]);
  
  userMessage = signal('');

  isLoading = signal(false);

  isChatOpened = signal(false);

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private assistantService: Assistant, private emailService: EmailService) {
    effect(() => {
      if (this.messages().length > 0) {
        this.scrollToBottom();
      }
    });
  }

  toggleChat() {
    this.isChatOpened.update(v => !v);
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.chatContainer?.nativeElement) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    });
  }

  sendMessage() {
    const prompt = this.userMessage().trim();
    if (!prompt) return;

    this.messages.update(msgs => [...msgs, { text: prompt, role: 'user' }]);
    this.userMessage.set('');
    this.isLoading.set(true);

    const historyForApi = this.messages().map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    this.assistantService.sendMessage(prompt, historyForApi).subscribe({
      next: (response) => {
        let fullText = response.candidates[0].content.parts[0].text;
        let textToShow = fullText;

        const jsonMatch = fullText.match(/~~~JSON\s*([\s\S]*?)\s*~~~/);

        if (jsonMatch) {
          try {
            const leadData = JSON.parse(jsonMatch[1]);
            
            console.log("información de contacto obtenida");
            this.emailService.sendLead(leadData);

            textToShow = fullText.replace(jsonMatch[0], '').trim();
          } catch (e) {
            console.error("Error al leer la nota secreta:", e);
          }
        }
        
        this.isLoading.set(false);
        this.messages.update(msgs => [...msgs, { text: textToShow, role: 'bot' }]);
      },
      error: (err) => {
        console.error('Error al hablar con el asistente:', err);
        this.messages.update(msgs => [...msgs, { text: 'Lo siento, hubo un error de conexión.', role: 'bot' }]);
        this.isLoading.set(false);
      }
    });
  }
}
