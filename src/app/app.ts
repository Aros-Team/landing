import { Component, signal, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Project } from './project/project';
import { TopBar } from './top-bar/top-bar';
import { Collaborator } from './collaborator/collaborator';
import { Chat } from './chat/chat';

@Component({
  selector: 'app-root',
  imports: [Project, TopBar, Collaborator, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  title = 'Aros';
  activeSection = signal('projects');

  @ViewChildren('sectionRef') sectionRefs!: QueryList<ElementRef>;

  sections = ['projects', 'about-us', 'contact-us', 'partners'];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.sectionRefs.forEach((ref) => {
      observer.observe(ref.nativeElement);
    });
  }
}
