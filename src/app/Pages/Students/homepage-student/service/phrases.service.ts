import { Injectable } from '@angular/core';
interface IPhrase {
  id: number;
  sentence: string;
}
@Injectable({
  providedIn: 'root'
})
export class PhrasesService {

  constructor() { }

    private messages: IPhrase[] =[
   { id: 1, sentence: "Always smile, it's an act of worship. 😊" },
  { id: 2, sentence: "Positive thinking opens closed doors. 🚪✨" },
  { id: 3, sentence: "Believe in your abilities and achieve the impossible. 💪🚀" },
  { id: 4, sentence: "Don't let failure break you, make it a lesson for success. 📉➡️📈" },
  { id: 5, sentence: "Hard work is the key to achieving goals. 🛠️🎯" },
  { id: 6, sentence: "Every day is a new beginning. 🌅" },
  { id: 7, sentence: "Enjoy the journey toward your goals, not just the destination. 🛤️😊" },
  { id: 8, sentence: "Success requires taking risks. 🎲🏆" },
  { id: 9, sentence: "Learn from your mistakes and keep striving. 📚🔁" },
  { id: 10, sentence: "Be patient—patience is the key to relief. 🕊️⏳" },
  { id: 11, sentence: "Overcome obstacles with determination—nothing is impossible. 🧗‍♂️🔥" },
  { id: 12, sentence: "Teamwork leads to great success. 🤝🏆" },
  { id: 13, sentence: "Be an inspiration to others and build a better community. 🌟🏘️" },
  { id: 14, sentence: "Always challenge yourself to do better. 🧠⚔️" },
  { id: 15, sentence: "Turn every experience into a life lesson. 🎓📖" },
  { id: 16, sentence: "Listen to advice—it contributes to your success. 👂💡" },
  { id: 17, sentence: "Be honest with yourself and others—honesty builds trust. 🪞🤝" },
  { id: 18, sentence: "Faith in God gives strength and stability. 🙏🛡️" },
  { id: 19, sentence: "Trust in God and begin your journey with confidence. 🧭✨" },
  { id: 20, sentence: "Work hard and strive—success will come by God's will. 🏃‍♂️🤲🏆" },
  { id: 21, sentence: "Dream big and take action every day. 🌠🚀" },
    { id: 22, sentence: "Stay focused on your goals, ignore distractions. 🎯🚫📵" },
    { id: 23, sentence: "Success is a journey, not just a destination. 🛤️🏆" },
    { id: 24, sentence: "Your mindset shapes your reality. 🧠🔮" },
    { id: 25, sentence: "Small steps lead to big achievements. 🐾🏔️" },
    { id: 26, sentence: "Stay positive, even in tough times. 🌈💪" },
    { id: 27, sentence: "Believe in yourself and keep moving forward. 🦶✨" },
    { id: 28, sentence: "Challenges make you stronger and wiser. 💪🧠" },
    { id: 29, sentence: "Never give up, success is near. 🏁👊" },
    { id: 30, sentence: "Take responsibility for your life and choices. 🎛️✅" },
    { id: 31, sentence: "Be kind to yourself during growth. 🌱❤️" },
    { id: 32, sentence: "Celebrate every small victory. 🎉🥳" },
    { id: 33, sentence: "Hard times teach valuable lessons. 🕰️📚" },
    { id: 34, sentence: "Your effort today shapes your tomorrow. 🔨🌅" },
    { id: 35, sentence: "Be the change you want to see. 🌍✨" },
    { id: 36, sentence: "Success needs consistency and patience. ⏳🔄" },
    { id: 37, sentence: "Learn something new every day. 📖🌟" },
    { id: 38, sentence: "Stay humble in success, strong in failure. 🤲💪" },
    { id: 39, sentence: "Trust the process, keep pushing. 🔄🚴‍♂️" },
    { id: 40, sentence: "Your passion fuels your progress. 🔥🏃‍♀️" },
    { id: 41, sentence: "Opportunities come to those who prepare. 🎯🛠️" },
{ id: 42, sentence: "Stay curious and open to new ideas. 🤔💡" },
{ id: 43, sentence: "Mistakes are proof that you are trying. ❌➡️✅" },
{ id: 44, sentence: "Keep your dreams alive with daily effort. 🌙💪" },
{ id: 45, sentence: "Surround yourself with positive people. 👥🌞" },
{ id: 46, sentence: "Never stop learning and growing. 📚🌱" },
{ id: 47, sentence: "Take breaks, recharge, and come back stronger. 🧘‍♂️🔋" },
{ id: 48, sentence: "Your attitude determines your direction. ↗️😃" },
{ id: 49, sentence: "Be fearless in the pursuit of what excites you. 🦁🔥" },
{ id: 50, sentence: "Gratitude turns what we have into enough. 🙏💖" },
{ id: 51, sentence: "Don’t compare yourself to others, grow at your own pace. 🐢🏃‍♂️" },
{ id: 52, sentence: "Success is earned, not given. 🏆💼" },
{ id: 53, sentence: "Believe that you can and you're halfway there. 🧠🚀" },
{ id: 54, sentence: "Positivity attracts more positivity. ✨➕✨" },
{ id: 55, sentence: "Take control of your thoughts to control your life. 🧠🎮" },
{ id: 56, sentence: "Persistence breaks down every barrier. 🛠️🧱" },
{ id: 57, sentence: "A healthy mind leads to a healthy life. 🧘‍♀️💚" },
{ id: 58, sentence: "Turn your weaknesses into strengths. 🔄💪" },
{ id: 59, sentence: "Be patient, success takes time to grow. ⏳🌳" },
{ id: 60, sentence: "Your future depends on what you do today. 📅🚀" },
{ id: 61, sentence: "Dream it. Believe it. Achieve it. 💭💡🏅" },
{ id: 62, sentence: "Focus on progress, not perfection. 📈🔍" },
{ id: 63, sentence: "Be bold enough to start and strong enough to finish. 🏁💪" },
{ id: 64, sentence: "Embrace failure as a step to success. 📉➡️📈" },
{ id: 65, sentence: "Let your actions speak louder than words. 🗣️🤐" },
{ id: 66, sentence: "You are stronger than your excuses. 🚫🛑" },
{ id: 67, sentence: "Keep pushing your limits every day. 🚧⚡" },
{ id: 68, sentence: "Celebrate the journey, not just the outcome. 🛤️🥂" },
{ id: 69, sentence: "Great things never come from comfort zones. 🛋️➡️🏔️" },
{ id: 70, sentence: "Stay dedicated, results will follow. 📅🏅" },
{ id: 71, sentence: "Believe in miracles but work for them too. ✨🛠️" },
{ id: 72, sentence: "Success is a marathon, not a sprint. 🏃‍♂️⏳" },
{ id: 73, sentence: "The harder you work, the luckier you get. 🍀💼" },
{ id: 74, sentence: "Feed your mind with positive thoughts. 🧠🌈" },
{ id: 75, sentence: "Always keep learning, always keep growing. 🌱📘" },
{ id: 76, sentence: "Confidence is the key to success. 🔑😎" },
{ id: 77, sentence: "Don’t fear change, embrace it. 🔄🌟" },
{ id: 78, sentence: "Stay humble and hungry for knowledge. 🍽️📖" },
{ id: 79, sentence: "Motivation gets you started, habit keeps you going. 🔥⏰" },
{ id: 80, sentence: "Be your own biggest supporter. 💪🎉" },
{ id: 81, sentence: "Focus on what you can control. 🎮🛠️" },
{ id: 82, sentence: "Take risks, great rewards await. 🎲💰" },
{ id: 83, sentence: "Stay true to yourself and your dreams. 💖🌠" },
{ id: 84, sentence: "Work hard in silence, let success make the noise. 🤫🏆" },
{ id: 85, sentence: "Your energy introduces you before you speak. ⚡🗣️" },
{ id: 86, sentence: "Don’t wait for opportunity, create it. 🏗️🚀" },
{ id: 87, sentence: "Be consistent, consistency builds success. 🔄🏅" },
{ id: 88, sentence: "Invest in yourself, it pays the best interest. 💰📈" },
{ id: 89, sentence: "Dream, believe, work, achieve. 🌙✨💼🏅" },
{ id: 90, sentence: "A positive mindset changes everything. 🧠🌞" },
{ id: 91, sentence: "Stay strong through every storm. 🌪️🛡️" },
{ id: 92, sentence: "Let your passion be your guide. ❤️🧭" },
{ id: 93, sentence: "Think big, act bigger. 🧠📢" },
{ id: 94, sentence: "The best way out is always through. 🚪➡️🏃‍♂️" },
{ id: 95, sentence: "Turn setbacks into comebacks. 🔙➡️🔝" },
{ id: 96, sentence: "You have the power to change your story. ✍️📖" },
{ id: 97, sentence: "Keep your eyes on the stars, feet on the ground. ⭐👣" },
{ id: 98, sentence: "Your attitude shapes your destiny. 🎭🌟" },
{ id: 99, sentence: "Be the light in someone’s darkness. 🕯️🌑" },
{ id: 100, sentence: "Success is built one step at a time. 🏗️👣" },


]


  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    return this.messages[randomIndex].sentence;
  }

  
}
