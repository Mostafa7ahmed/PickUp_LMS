import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourse',
  standalone: true
})
export class FilterCoursePipe implements PipeTransform {
  transform(courses: any[], searchTerm: string): any[] {
    if (!courses) return [];
    if (!searchTerm) return courses;
    const term = searchTerm.toLowerCase();
    return courses.filter(course =>
      (course.name && course.name.toLowerCase().includes(term)) ||
      (course.topicName && course.topicName.toLowerCase().includes(term))
    );
  }
}
