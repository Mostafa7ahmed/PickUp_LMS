import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Follower {
  name: string;
  title: string;
  image: string;
}
@Component({
  selector: 'app-porfile',
  standalone: true,
  imports: [FormsModule , CommonModule ],
  templateUrl: './porfile.component.html',
  styleUrl: './porfile.component.scss'
})
export class PorfileComponent {
  searchText = '';
followers: Follower[] = [
  { name: 'Nehad Naiem', title: 'Data Analyst at TechCorp', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mohamed Yasser', title: 'ML Engineer at AI Solutions', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Mahmoud Gamal', title: 'Student at MIT', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sarah Johnson', title: 'Data Scientist at HealthTech', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Olivia Martinez', title: 'AI Researcher at Google', image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  { name: 'Robert Taylor', title: 'CTO at DataWorks', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Amina Ali', title: 'Student at Stanford', image: 'https://randomuser.me/api/portraits/women/30.jpg' },
  { name: 'Kareem Abdallah', title: 'AI Intern at OpenAI', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
  { name: 'Lana Rose', title: 'ML Research Assistant', image: 'https://randomuser.me/api/portraits/women/16.jpg' },
  { name: 'Ahmed Tarek', title: 'Data Engineer at IBM', image: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { name: 'Fatima Zahra', title: 'AI Ethics Researcher', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
  { name: 'James Brown', title: 'Full Stack Developer', image: 'https://randomuser.me/api/portraits/men/53.jpg' },
];

  filteredFollowers(): Follower[] {
    return this.followers.filter(f =>
      f.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
