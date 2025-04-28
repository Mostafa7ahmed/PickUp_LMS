import { Injectable } from '@angular/core';
import { IRating, ReviewsByDate } from '../interface/irating';

@Injectable({
  providedIn: 'root'
})
export class ReviewsRatngService {

  constructor() {}

  getReviewsByDate(): ReviewsByDate[] {
    return [
      {
        date: "2024-04-20",
        reviews: [
          {
            name: "Mostafa Hamed",
            stars: 5,
            comment: "Amazing course! Highly recommend it.",
            date: "2024-04-20T10:30:00"
          },
          {
            name: "Mona Adel",
            stars: 3,
            comment: "It was okay, could have been better organized.",
            date: "2024-04-20T12:00:00"
          },
          {
            name: "Sara Ali",
            stars: 2.5,
            comment: "The course is really well-organized with clear explanations. A great choice for anyone starting with Python!",
            date: "2024-04-20T14:45:00"
          },
          {
            name: "Khaled Samir",
            stars: 3.5,
            comment: "Good course but needs more practical examples.",
            date: "2024-04-20T16:00:00"
          }
        ]
      },
      {
        date: "2024-04-21",
        reviews: [
          {
            name: "Youssef Magdy",
            stars: 4,
            comment: "Very helpful course with clear explanations.",
            date: "2024-04-21T09:15:00"
          },
          {
            name: "Nourhan Tarek",
            stars: 5,
            date: "2024-04-21T11:20:00"
          },
          {
            name: "Mohamed Yasser",
            stars: 4,
            comment: "Loved the structure and the practical examples.",
            date: "2024-04-21T13:00:00"
          },
          {
            name: "Amira Salah",
            stars: 3.5,
            comment: "Good course but could use more assignments.",
            date: "2024-04-21T15:10:00"
          }
        ]
      },
      {
        date: "2024-04-22",
        reviews: [
          {
            name: "Omar Khaled",
            stars: 4.5,
            comment: "A great course with detailed content.",
            date: "2024-04-22T10:00:00"
          },
          {
            name: "Salma Mohamed",
            stars: 5,
            comment: "Excellent explanation style and great examples.",
            date: "2024-04-22T11:45:00"
          },
          {
            name: "Hana Adel",
            stars: 3,
            comment: "Good effort but needs a bit more depth.",
            date: "2024-04-22T13:30:00"
          }
        ]
      }
    ];
  }

}
