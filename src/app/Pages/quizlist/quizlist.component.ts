import { Component, inject } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { WidgetquizlistComponent } from "./Components/widgetquizlist/widgetquizlist.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CardqiuzComponent } from "./Components/cardqiuz/cardqiuz.component";

@Component({
  selector: 'app-quizlist',
  standalone: true,
    imports: [WidgetquizlistComponent, CommonModule, RouterModule, ButtonModule, TranslateModule, FormsModule, TabsModule, MatTooltipModule, CardqiuzComponent],
  
  templateUrl: './quizlist.component.html',
  styleUrls:[ './quizlist.component.scss', "../../Pages/Courses/courses/courses.component.scss" ]
})
export class QuizlistComponent {

  showInfoCoupon = false;


  toggShowInfo() {
    this.showInfoCoupon = !this.showInfoCoupon;
  }



  ngOnInit(): void {
    
  
    
  }
}
