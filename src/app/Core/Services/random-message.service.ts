import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomMessageService {
  private messages: string[] = [
    'مرحباً بك في منصتنا التعليمية! 📚',
    'استكشف دوراتنا المتنوعة واختر ما يناسبك 🎯',
    'نحن هنا لمساعدتك في رحلتك التعليمية ✨',
    'تعلم في أي وقت وأي مكان 🌍',
    'ابدأ رحلتك التعليمية اليوم 🚀',
    'اكتشف مهارات جديدة مع خبرائنا 💡',
    'التعلم المستمر هو مفتاح النجاح 🔑',
    'شارك معرفتك مع الآخرين 🤝',
    'كن جزءاً من مجتمعنا التعليمي 🌟',
    'طور مهاراتك مع أفضل المدربين 👨‍🏫'
  ];

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex];
  }
}
