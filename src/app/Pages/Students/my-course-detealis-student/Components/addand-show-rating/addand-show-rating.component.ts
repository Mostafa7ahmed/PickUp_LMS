import { Component } from '@angular/core';
import { Rating } from '../../../discover-course-details/Core/Interface/ires-course-details-discover';
import { environment } from '../../../../../Environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addand-show-rating',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './addand-show-rating.component.html',
  styleUrl: './addand-show-rating.component.scss'
})
export class AddandShowRatingComponent {

reviewsByDates: Rating[]  =[
    {
        "id": 4,
        "value": 5,
        "note": "string",
        "createdOn": "2025-06-29T07:58:07.726544Z",
        "student": {
            "id": 45,
            "userId": 45,
            "name": "sasaqwsdfd",
            "bio": null,
            "photo": "student/45/photo/.jpg/091d4b10-663e-4567-9c6f-b9c2d0edc6ce.jpg",
            "rating": 0
        }
    },
    {
        "id": 6,
        "value": 5,
        "note": "asdasdasdasd",
        "createdOn": "2025-06-29T07:59:47.396794Z",
        "student": {
            "id": 91,
            "userId": 91,
            "name": "sasahamed500",
            "bio": null,
            "photo": "student/91/photo/.jpeg/33733112-5ce9-4161-9edd-e15595a33dac.jpeg",
            "rating": 0
        }
    },
    {
        "id": 10,
        "value": 5,
        "note": "string",
        "createdOn": "2025-06-29T09:55:11.453372Z",
        "student": {
            "id": 42,
            "userId": 42,
            "name": "Mostrafa Hamed ",
            "bio": null,
            "photo": "instructor/42/photo/.jpg/0f18daad-e6eb-4b02-a633-0041897b5842.jpg",
            "rating": 0
        }
    },
    {
        "id": 11,
        "value": 5,
        "note": "string",
        "createdOn": "2025-06-29T09:55:36.640061Z",
        "student": {
            "id": 43,
            "userId": 43,
            "name": "mostafa hamed",
            "bio": null,
            "photo": "instructor/43/photo/.png/f7225932-1eab-4f1b-8f0c-b10df24dcf28.png",
            "rating": 0
        }
    }
]


   baseUrl:string = environment.baseUrlFiles

  getStarsArray(stars: number): number[] {
    return Array(Math.floor(stars)).fill(0);
  }

  newRating: number = 0;
  newNote: string = '';

  setRating(rating: number) {
    this.newRating = rating;
  }

  submitRating() {
    if (!this.newRating || !this.newNote) return;
    if (this.hasRated) return;
    const newReview: Rating = {
      id: Date.now(),
      value: this.newRating,
      note: this.newNote,
      createdOn: new Date().toISOString(),
      student: {
        id: 0, 
        userId: 0, 
        name: 'You', 
        bio: null,
        photo: 'instructor/42/photo/.jpg/0f18daad-e6eb-4b02-a633-0041897b5842.jpg', 
        rating: 0
      }
    };
    this.reviewsByDates.push(newReview);
    this.hasRated = true;
    this.newRating = 0;
    this.newNote = '';
  }

  hasRated: boolean = false;
}
