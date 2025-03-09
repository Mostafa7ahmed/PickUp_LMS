import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconListService {



   icons = [
    { icon: 'fa fa-file-pen' },      // إنشاء موضوع جديد
    { icon: 'fa fa-comments' },      // المناقشة وطرح المواضيع
    { icon: 'fa fa-plus-circle' },   // الإضافة
    { icon: 'fa fa-newspaper' },     // المقالات والمواضيع
    { icon: 'fa fa-pen' },           // القلم للكتابة
    { icon: 'fa fa-bullhorn' },      // الإعلان عن موضوع جديد
    { icon: 'fa fa-tags' },          // التصنيف للموضوع
    { icon: 'fa fa-file-alt' },      // المستند الجديد
    { icon: 'fa fa-rocket' },        // الانطلاق والبدء السريع
    { icon: 'fa fa-lightbulb' },     // فكرة جديدة
    { icon: 'fa fa-edit' },          // تعديل المحتوى
    { icon: 'fa fa-share' },         // مشاركة الموضوع
    { icon: 'fa fa-book-open' },     // قراءة المحتوى
    { icon: 'fa fa-folder-open' },   // تنظيم المواضيع
    { icon: 'fa fa-comment-dots' },  // التعليقات والنقاشات
    { icon: 'fa fa-list-alt' },      // عرض المواضيع
    { icon: 'fa fa-inbox' },         // إدارة المواضيع المستلمة
    { icon: 'fa fa-globe' }          // موضوع عالمي أو عام
  ];
  getIcons() {
    return this.icons.map(i => i.icon);
  }
  constructor() { }




}
