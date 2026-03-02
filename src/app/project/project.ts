import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  projects = [
    {
      name: "Restaurant order system",
      images: ["/Proyecto-muestra.jpeg"],
      description: "Software for managing restaurant orders efficiently."
    },
    {
      name: "E-commerce Platform",
      images: ["/Proyecto-muestra.jpeg"],
      description: "Complete online store with payment integration."
    },
    {
      name: "Task Manager",
      images: ["/Proyecto-muestra.jpeg"],
      description: "Productivity app for team collaboration."
    },
    {
      name: "Health Tracker",
      images: ["/Proyecto-muestra.jpeg"],
      description: "Mobile app for monitoring health metrics."
    }
  ];

  currentIndex = signal(0);

  prevIndex = computed(() => 
    (this.currentIndex() - 1 + this.projects.length) % this.projects.length
  );

  nextIndex = computed(() => 
    (this.currentIndex() + 1) % this.projects.length
  );

  next() {
    this.currentIndex.update(i => (i + 1) % this.projects.length);
  }

  prev() {
    this.currentIndex.update(i => (i - 1 + this.projects.length) % this.projects.length);
  }

  goTo(index: number) {
    this.currentIndex.set(index);
  }
}
