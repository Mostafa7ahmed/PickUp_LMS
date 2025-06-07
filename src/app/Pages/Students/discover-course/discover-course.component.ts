import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomslectwithiconComponent } from "../../Courses/Components/customslectwithicon/customslectwithicon.component";
import { ItopicList } from '../../Topics/Core/Interface/itopic-list-result';
import { CourseCardComponent } from "../homepage-student/components/course-card/course-card.component";

@Component({
  selector: 'app-discover-course',
  standalone: true,
  imports: [CustomslectwithiconComponent, CourseCardComponent],
  templateUrl: './discover-course.component.html',
  styleUrl: './discover-course.component.scss'
})
export class DiscoverCourseComponent implements OnInit {
  topicsList: ItopicList[] = [
        {
            "id": 309,
            "name": "sdsdfs",
            "color": "#a0151e",
            "icon": "fa fa-file-pen",
            "order": 8,
            "default": false,
            "stages": [
                {
                    "id": 929,
                    "order": 1,
                    "name": "New",
                    "color": "#3e97ff",
                    "icon": "fa-ff",
                    "shadow": "#3e97ff",
                    "default": true,
                    "type": 0
                },
                {
                    "id": 930,
                    "order": 10,
                    "name": "Published",
                    "color": "#48b29a",
                    "icon": "fa-home",
                    "shadow": "#48b29a",
                    "default": false,
                    "type": 2
                }
            ]
        },
        {
            "id": 308,
            "name": "asd",
            "color": "#6f0dd1",
            "icon": "fa fa-file-pen",
            "order": 7,
            "default": false,
            "stages": [
                {
                    "id": 928,
                    "order": 10,
                    "name": "Published",
                    "color": "#48b29a",
                    "icon": "fa-home",
                    "shadow": "#48b29a",
                    "default": false,
                    "type": 2
                },
                {
                    "id": 927,
                    "order": 1,
                    "name": "New",
                    "color": "#3e97ff",
                    "icon": "fa-ff",
                    "shadow": "#3e97ff",
                    "default": true,
                    "type": 0
                }
            ]
        },
        {
            "id": 303,
            "name": "Computer Science",
            "color": "#a0151e",
            "icon": "fa fa-file-pen",
            "order": 6,
            "default": true,
            "stages": [
                {
                    "id": 914,
                    "order": 1,
                    "name": "New",
                    "color": "#3e97ff",
                    "icon": "fa-ff",
                    "shadow": "#3e97ff",
                    "default": true,
                    "type": 0
                },
                {
                    "id": 915,
                    "order": 10,
                    "name": "Published",
                    "color": "#48b29a",
                    "icon": "fa-home",
                    "shadow": "#48b29a",
                    "default": false,
                    "type": 2
                },
                {
                    "id": 916,
                    "order": 2,
                    "name": "Working on",
                    "color": "#515f32",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                }
            ]
        },
        {
            "id": 296,
            "name": "تطوير كورس إلكتروني",
            "color": "#298dba",
            "icon": "fa fa-globe",
            "order": 5,
            "default": false,
            "stages": [
                {
                    "id": 891,
                    "order": 10,
                    "name": "Published",
                    "color": "#48b29a",
                    "icon": "fa-home",
                    "shadow": "#48b29a",
                    "default": false,
                    "type": 2
                },
                {
                    "id": 893,
                    "order": 3,
                    "name": "إعداد المحتوى",
                    "color": "#dfde0d",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 894,
                    "order": 4,
                    "name": " تسجيل الفيديو",
                    "color": "#f4d7c5",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 895,
                    "order": 5,
                    "name": "رفع المحتوى على المنصة",
                    "color": "#6f0dd1",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 896,
                    "order": 6,
                    "name": "الاختبار والمراجعة",
                    "color": "#298dba",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 890,
                    "order": 1,
                    "name": "New",
                    "color": "#3e97ff",
                    "icon": "fa-ff",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 0
                },
                {
                    "id": 892,
                    "order": 2,
                    "name": "التخطيط",
                    "color": "#515f32",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": true,
                    "type": 1
                }
            ]
        },
        {
            "id": 285,
            "name": "C# Topic ",
            "color": "#dfde0d",
            "icon": "fa fa-globe",
            "order": 2,
            "default": false,
            "stages": [
                {
                    "id": 863,
                    "order": 3,
                    "name": "Explain",
                    "color": "#dfde0d",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 860,
                    "order": 1,
                    "name": "New",
                    "color": "#3e97ff",
                    "icon": "fa-ff",
                    "shadow": "#3e97ff",
                    "default": true,
                    "type": 0
                },
                {
                    "id": 861,
                    "order": 10,
                    "name": "Published",
                    "color": "#48b29a",
                    "icon": "fa-home",
                    "shadow": "#48b29a",
                    "default": false,
                    "type": 2
                },
                {
                    "id": 862,
                    "order": 2,
                    "name": "Recording",
                    "color": "#515f32",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                },
                {
                    "id": 864,
                    "order": 4,
                    "name": "View",
                    "color": "#f4d7c5",
                    "icon": "fa fa-address-book",
                    "shadow": "#3e97ff",
                    "default": false,
                    "type": 1
                }
            ]
        }
    ]
  selectedValue: ItopicList = {} as ItopicList;

  selectOption(option: any): void {


    console.log(option.id)
    


  }
  ngOnInit(): void {
            this.selectedValue = this.topicsList.find((e: ItopicList) => e.id === 285) || {} as ItopicList;

  }
}
