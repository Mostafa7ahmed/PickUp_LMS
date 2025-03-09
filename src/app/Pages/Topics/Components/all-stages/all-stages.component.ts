import { CommonModule } from '@angular/common';
import { Stage } from './../../Core/Interface/itopic';
import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-stages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-stages.component.html',
  styleUrl: './all-stages.component.scss'
})
export class AllStagesComponent  implements OnInit {

  @Input() Stage:Stage[] = []; 
  borderColors: string[] = [];
  
  ngOnInit(): void {
    if (this.Stage.length > 0) {
      this.borderColors = this.Stage.map(stage => this.convertHexToRgba(stage.color, 0.1));
      console.log(this.borderColors);
    }
  }
  
  

  getBoxShadow(hex: string, opacity: number): string {
    hex = hex.replace(/^#/, '');
  
    if (hex.length !== 6) {
      console.warn('لون غير صالح:', hex);
      return ' 0 2px 6px #606c803d '; 
    }
  
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
  
    return `0px 0px 6px rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  convertHexToRgba(hex: string, opacity: number = 1): string {
    hex = hex.replace('#', '');

    if (hex.length !== 6) {
      return '#6d9ff44c';
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
}
