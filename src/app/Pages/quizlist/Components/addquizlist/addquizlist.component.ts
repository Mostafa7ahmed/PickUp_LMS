import { Component, inject, OnInit } from '@angular/core';
import { TopPopComponent } from "../../../../Components/top-pop/top-pop.component";
import { CommonModule } from '@angular/common';
import { TextHeaderComponent } from "../../../Courses/Components/text-header/text-header.component";
import { ListCourse } from '../../../Courses/Core/interface/icourses';
import { environment } from '../../../../Environments/environment';
import { SplicTextPipe } from '../../../Courses/Core/Pipes/splic-text.pipe';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { ListCourseService } from '../../../Courses/Core/service/list-course.service';
import { Select } from 'primeng/select';
import { FormArray, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TrueFalseComponent } from "../true-false/true-false.component";
import { ShortAnswerComponent } from "../short-answer/short-answer.component";
import { MultipleChoiceComponent } from "../multiple-choice/multiple-choice.component";

@Component({
  selector: 'app-addquizlist',
  standalone: true,
  imports: [TopPopComponent, CommonModule, FormsModule, TextHeaderComponent, Select, SplicTextPipe, TrueFalseComponent, ShortAnswerComponent, MultipleChoiceComponent],
  templateUrl: './addquizlist.component.html',
  styleUrl: './addquizlist.component.scss'
})
export class AddquizlistComponent implements OnInit {
  paginationCoursesResponse: IPaginationResponse<ListCourse> = {} as IPaginationResponse<ListCourse>;
  private router = inject(Router);
  showFirstPopup = true;
  showSecondPopup = false;
  currentSectionName = '';
  showSectionForm = false;

  // Sections management
  sections: any[] = [];
  currentSectionIndex = -1;
  private _paginateCoursesService = inject(ListCourseService);
value = 0;
changeValue(val: number) {
  this.value = val;
}

  selectedCourse: ListCourse | null = null;
  showDropdownCourse = false;
  selectedDiscountType: number = 1;
  baseUrl: string = environment.baseUrlFiles;
  isLoadCourse = false;
  discountTypes: any[] = [
    { label: 'Hours', value: 1 },
    { label: 'Minutes', value: 0 }
  ]

  toggleDropdownCourse() {
    this.showDropdownCourse = !this.showDropdownCourse;
  }
  removeCourse() {
    this.selectedCourse = null;
    this.showDropdownCourse = false;
  }
  selectCourse(course: ListCourse) {
    this.selectedCourse = course;
    this.showDropdownCourse = false;
  }
  getCourse() {

    this._paginateCoursesService.getCourses().subscribe((response) => {
      this.paginationCoursesResponse = response;
      this.isLoadCourse = true;
      console.log(response.result)




    });
  }
form = new FormGroup({
  trueFalseQuestions: new FormArray([]),
  shortAnswerQuestions: new FormArray([]),
  multipleChoiceQuestions: new FormArray([]),
})
get trueFalseQuestions(): FormArray {
  return this.form.get('trueFalseQuestions') as FormArray;
}

get shortAnswerQuestions(): FormArray {
  return this.form.get('shortAnswerQuestions') as FormArray;
}

get multipleChoiceQuestions(): FormArray {
  return this.form.get('multipleChoiceQuestions') as FormArray;
}

addTrueFalse() {
  this.trueFalseQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.trueFalseQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      trueAndFalse: new FormGroup({
        answer: new FormControl(true)
      })
    })
  );
}

addShortAnswer() {
  this.shortAnswerQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.shortAnswerQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      shortAnswer: new FormGroup({
        answer: new FormControl('')
      })
    })
  );
}

addMultipleChoice() {
  this.multipleChoiceQuestions.push(
    new FormGroup({
      courseId: new FormControl(0),
      quizId: new FormControl(0),
      quizSectionId: new FormControl(0),
      order: new FormControl(this.multipleChoiceQuestions.length + 1),
      hint: new FormControl(''),
      text: new FormControl(''),
      multipleChoise: new FormArray([
        new FormGroup({
          answer: new FormControl(''),
          correct: new FormControl(true) // First choice is correct by default
        }),
        new FormGroup({
          answer: new FormControl(''),
          correct: new FormControl(false)
        })
      ])
    })
  );
}
addQuestion() {
  // Check if there's an active section or section form is shown
  const activeSection = this.sections.find(s => s.isActive);

  if (!activeSection && !this.showSectionForm) {
    alert('Please create a section first before adding questions.');
    return;
  }

  // If there's an active section, make sure we're on the right question type
  if (activeSection && activeSection.type !== this.value) {
    const shouldSwitch = confirm(`This section is for ${activeSection.typeName} questions. Switch to ${activeSection.typeName} tab?`);
    if (shouldSwitch) {
      this.value = activeSection.type;
    } else {
      return;
    }
  }

  if (this.value === 0) {
    this.addTrueFalse();
  } else if (this.value === 1) {
    this.addShortAnswer();
  } else if (this.value === 2) {
    this.addMultipleChoice();
  }
}

removeTrueFalseQuestion(index: number) {
  this.trueFalseQuestions.removeAt(index);
}

removeShortAnswerQuestion(index: number) {
  this.shortAnswerQuestions.removeAt(index);
}

removeMultipleChoiceQuestion(index: number) {
  this.multipleChoiceQuestions.removeAt(index);
}
  nextPopup() {
    // Validate that a course is selected
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }

    this.showFirstPopup = false;
    setTimeout(() => {
      this.showSecondPopup = true;
    }, 300); // مدة الأنيميشن
  }

  closePopup() {
    this.showFirstPopup = false;
    this.showSecondPopup = false;
    setTimeout(() => {
      this.router.navigate([{ outlets: { dialog: null } }]);
    }, 300);
  }

  goBack() {
    this.showSecondPopup = false;
    setTimeout(() => {
      this.showFirstPopup = true;
    }, 300);
  }

  ngOnInit(): void {
    this.getCourse();
  }

  // Get current tab name for display
  getCurrentTabName(): string {
    switch(this.value) {
      case 0: return 'True/False';
      case 1: return 'Short Answer';
      case 2: return 'Multiple Choice';
      default: return 'Questions';
    }
  }

  // Get current questions count
  getCurrentQuestionsCount(): number {
    switch(this.value) {
      case 0: return this.trueFalseQuestions.length;
      case 1: return this.shortAnswerQuestions.length;
      case 2: return this.multipleChoiceQuestions.length;
      default: return 0;
    }
  }



  // Method to create quiz section first, then add questions
  saveQuestions() {
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }

    // Get current tab questions
    const currentQuestions = this.getCurrentTabQuestions();

    if (currentQuestions.length === 0) {
      alert('Please add at least one question before saving.');
      return;
    }

    // Validate questions
    if (!this.validateCurrentQuestions(currentQuestions)) {
      return;
    }

    // Create quiz section for current tab only
    this.createQuizSection();
  }

  // Method to save all question types as separate sections
  saveAllQuestions() {
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }

    const sectionsToCreate = [];
    let sectionOrder = 1;

    // Check True/False questions
    if (this.trueFalseQuestions.length > 0) {
      const sectionName = prompt('Enter name for True/False section:', 'True/False Questions');
      if (sectionName) {
        sectionsToCreate.push({
          type: 0,
          name: sectionName.trim(),
          questions: this.trueFalseQuestions.controls,
          order: sectionOrder++
        });
      }
    }

    // Check Short Answer questions
    if (this.shortAnswerQuestions.length > 0) {
      const sectionName = prompt('Enter name for Short Answer section:', 'Short Answer Questions');
      if (sectionName) {
        sectionsToCreate.push({
          type: 1,
          name: sectionName.trim(),
          questions: this.shortAnswerQuestions.controls,
          order: sectionOrder++
        });
      }
    }

    // Check Multiple Choice questions
    if (this.multipleChoiceQuestions.length > 0) {
      const sectionName = prompt('Enter name for Multiple Choice section:', 'Multiple Choice Questions');
      if (sectionName) {
        sectionsToCreate.push({
          type: 2,
          name: sectionName.trim(),
          questions: this.multipleChoiceQuestions.controls,
          order: sectionOrder++
        });
      }
    }

    if (sectionsToCreate.length === 0) {
      alert('Please add at least one question before saving.');
      return;
    }

    // Create sections sequentially
    this.createMultipleSections(sectionsToCreate, 0);
  }

  getCurrentTabQuestions() {
    switch(this.value) {
      case 0: return this.trueFalseQuestions.controls;
      case 1: return this.shortAnswerQuestions.controls;
      case 2: return this.multipleChoiceQuestions.controls;
      default: return [];
    }
  }

  validateCurrentQuestions(questions: any[]): boolean {
    // Validate questions have text
    const invalidQuestions = questions.filter(q => !q.get('text')?.value || q.get('text')?.value.trim() === '');
    if (invalidQuestions.length > 0) {
      alert('Please fill in all question texts before saving.');
      return false;
    }

    // Validate multiple choice questions
    if (this.value === 2) {
      for (let question of questions) {
        const choices = question.get('multipleChoise')?.value || [];
        const validChoices = choices.filter((choice: any) => choice.answer && choice.answer.trim());

        if (validChoices.length < 2) {
          alert('Multiple choice questions must have at least 2 valid choices with text.');
          return false;
        }

        const hasCorrectAnswer = choices.some((choice: any) => choice.correct);
        if (!hasCorrectAnswer) {
          alert('Please select a correct answer for all multiple choice questions.');
          return false;
        }
      }
    }

    return true;
  }

  createQuizSection() {
    // Validate section name
    if (!this.currentSectionName || this.currentSectionName.trim() === '') {
      alert('Please enter a section name before saving.');
      return;
    }

    const sectionData = {
      quizId: 0, // You'll need to get this from somewhere
      order: 1,
      name: this.currentSectionName.trim(),
      type: this.value // 0 = True/False, 1 = Short Answer, 2 = Multiple Choice
    };

    console.log('🚀 Creating quiz section:', sectionData);
    console.log('📋 Section API Call:', {
      url: 'https://pickup.runasp.net/pickup-lms/api/v1/quiz-section/create',
      method: 'POST',
      body: sectionData
    });

    // Here you would call your service to create the section
    // Example: this._quizService.createSection(sectionData).subscribe(...)

    // For now, simulate section creation and then add questions
    setTimeout(() => {
      const mockSectionId = Math.floor(Math.random() * 1000);
      console.log(`✅ Section created with ID: ${mockSectionId}`);
      this.addQuestionsToSection(mockSectionId);
    }, 500);
  }

  addQuestionsToSection(sectionId: number) {
    const questions = this.prepareQuestionsForSection(sectionId);

    console.log(`📝 Adding ${questions.length} questions to section ${sectionId}:`, questions);
    console.log('📋 Questions API Calls:', questions.map((q, index) => ({
      url: 'https://pickup.runasp.net/pickup-lms/api/v1/quiz-question/create',
      method: 'POST',
      body: q,
      order: index + 1
    })));

    // Here you would call your service to add questions
    // Example: this._quizService.addQuestions(questions).subscribe(...)

    alert(`✅ ${this.getCurrentTabName()} Section created successfully!\n${questions.length} questions prepared for saving.\n\nCheck console for API details.`);
  }

  prepareQuestionsForSection(sectionId: number) {
    const currentQuestions = this.getCurrentTabQuestions();
    const questions: any[] = [];

    currentQuestions.forEach((question, index) => {
      const questionData = question.value;

      const baseQuestion = {
        courseId: this.selectedCourse?.id || 0,
        quizId: 0,
        quizSectionId: sectionId,
        order: index + 1,
        hint: questionData.hint || '',
        text: questionData.text
      };

      // Add type-specific data
      if (this.value === 0) { // True/False
        questions.push({
          ...baseQuestion,
          trueAndFalse: {
            answer: questionData.trueAndFalse.answer
          }
        });
      } else if (this.value === 1) { // Short Answer
        questions.push({
          ...baseQuestion,
          shortAnswer: {
            answer: questionData.shortAnswer.answer
          }
        });
      } else if (this.value === 2) { // Multiple Choice
        questions.push({
          ...baseQuestion,
          multipleChoise: questionData.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim())
        });
      }
    });

    return questions;
  }

  // Create new section (can be empty)
  createNewSection() {
    if (!this.currentSectionName || this.currentSectionName.trim() === '') {
      alert('Please enter a section name before creating.');
      return;
    }

    const currentQuestions = this.getCurrentTabQuestions();

    // Validate current questions if any exist
    if (currentQuestions.length > 0 && !this.validateCurrentQuestions(currentQuestions)) {
      return;
    }

    // Create section object
    const newSection = {
      id: Date.now(), // Temporary ID
      name: this.currentSectionName.trim(),
      type: this.value,
      typeName: this.getCurrentTabName(),
      questions: currentQuestions.map(q => ({ ...q.value })),
      questionCount: currentQuestions.length,
      createdAt: new Date(),
      collapsed: false,
      isActive: true // Mark as active section for adding questions
    };

    // Mark all other sections as inactive
    this.sections.forEach(section => section.isActive = false);

    // Add to sections array
    this.sections.push(newSection);

    // Clear current questions and section name
    this.clearCurrentQuestions();
    this.currentSectionName = '';
    this.showSectionForm = false;

    const message = currentQuestions.length > 0
      ? `✅ Section "${newSection.name}" created successfully!\n${newSection.questionCount} questions added.`
      : `✅ Section "${newSection.name}" created successfully!\nYou can now add questions to this section.`;

    alert(message);
  }

  clearCurrentQuestions() {
    switch(this.value) {
      case 0:
        this.trueFalseQuestions.clear();
        break;
      case 1:
        this.shortAnswerQuestions.clear();
        break;
      case 2:
        this.multipleChoiceQuestions.clear();
        break;
    }
  }

  // Save all created sections
  saveAllSections() {
    if (!this.selectedCourse) {
      alert('Please select a course first.');
      return;
    }

    if (this.sections.length === 0) {
      alert('Please create at least one section before saving.');
      return;
    }

    console.log('🚀 Saving all sections:', this.sections);

    // Create sections sequentially
    this.createSectionsSequentially(this.sections, 0);
  }

  createSectionsSequentially(sectionsToCreate: any[], currentIndex: number) {
    if (currentIndex >= sectionsToCreate.length) {
      alert(`✅ All sections saved successfully!\nCreated ${sectionsToCreate.length} sections.`);
      return;
    }

    const section = sectionsToCreate[currentIndex];
    const sectionData = {
      quizId: 0,
      order: currentIndex + 1,
      name: section.name,
      type: section.type
    };

    console.log(`📋 Creating section ${currentIndex + 1}:`, sectionData);

    // Here you would call your service to create the section
    // Example: this._quizService.createSection(sectionData).subscribe(...)

    // For now, simulate section creation
    setTimeout(() => {
      const mockSectionId = Math.floor(Math.random() * 1000) + currentIndex;
      console.log(`✅ Section created with ID: ${mockSectionId}`);

      // Add questions to this section
      this.addQuestionsToSectionFromData(mockSectionId, section.questions, section.type);

      // Create next section
      setTimeout(() => {
        this.createSectionsSequentially(sectionsToCreate, currentIndex + 1);
      }, 500);
    }, 500);
  }

  addQuestionsToSectionFromData(sectionId: number, questions: any[], questionType: number) {
    const preparedQuestions: any[] = [];

    questions.forEach((questionData, index) => {
      const baseQuestion = {
        courseId: this.selectedCourse?.id || 0,
        quizId: 0,
        quizSectionId: sectionId,
        order: index + 1,
        hint: questionData.hint || '',
        text: questionData.text
      };

      // Add type-specific data
      if (questionType === 0) { // True/False
        preparedQuestions.push({
          ...baseQuestion,
          trueAndFalse: {
            answer: questionData.trueAndFalse.answer
          }
        });
      } else if (questionType === 1) { // Short Answer
        preparedQuestions.push({
          ...baseQuestion,
          shortAnswer: {
            answer: questionData.shortAnswer.answer
          }
        });
      } else if (questionType === 2) { // Multiple Choice
        preparedQuestions.push({
          ...baseQuestion,
          multipleChoise: questionData.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim())
        });
      }
    });

    console.log(`📝 Adding ${preparedQuestions.length} questions to section ${sectionId}:`, preparedQuestions);

    // Here you would call your service to add questions
    // Example: this._quizService.addQuestions(preparedQuestions).subscribe(...)
  }

  removeSection(index: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (confirm(`Are you sure you want to remove section "${this.sections[index].name}"?`)) {
      this.sections.splice(index, 1);
    }
  }

  toggleSection(index: number) {
    this.sections[index].collapsed = !this.sections[index].collapsed;
  }

  addMoreQuestionsToSection(index: number, event: Event) {
    event.stopPropagation();

    // Switch to the section's question type
    this.value = this.sections[index].type;

    // Show message to user
    alert(`Switched to ${this.sections[index].typeName} tab.\nAdd your questions and they will be added to "${this.sections[index].name}" section.`);

    // Set the section name for easy identification
    this.currentSectionName = this.sections[index].name + ' - Additional Questions';
  }

  onSectionNameChange() {
    // This method is called when section name input changes
    // Can be used for validation or other logic if needed
  }

  startNewSection() {
    this.showSectionForm = true;
    this.currentSectionName = '';
  }

  cancelSectionCreation() {
    this.showSectionForm = false;
    this.currentSectionName = '';
  }

  // Add questions to active section
  addQuestionsToActiveSection() {
    const activeSection = this.sections.find(s => s.isActive);
    if (!activeSection) return;

    const currentQuestions = this.getCurrentTabQuestions();
    if (currentQuestions.length === 0) return;

    // Validate questions
    if (!this.validateCurrentQuestions(currentQuestions)) {
      return;
    }

    // Add questions to the active section
    const newQuestions = currentQuestions.map(q => ({ ...q.value }));
    activeSection.questions.push(...newQuestions);
    activeSection.questionCount = activeSection.questions.length;

    // Clear current questions
    this.clearCurrentQuestions();

    alert(`✅ ${newQuestions.length} questions added to "${activeSection.name}" section!`);
  }

  // Set active section
  setActiveSection(index: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    // Mark all sections as inactive
    this.sections.forEach(section => section.isActive = false);

    // Mark selected section as active
    this.sections[index].isActive = true;

    // Switch to the section's question type
    this.value = this.sections[index].type;

    alert(`Now adding questions to "${this.sections[index].name}" section.`);
  }

  // Helper methods for template
  hasActiveSection(): boolean {
    return this.sections.some(s => s.isActive);
  }

  getActiveSection() {
    return this.sections.find(s => s.isActive);
  }

  canAddQuestion(): boolean {
    return this.showSectionForm || this.hasActiveSection();
  }

  shouldShowAddToSectionButton(): boolean {
    return this.hasActiveSection() && this.getCurrentTabQuestions().length > 0;
  }

  createMultipleSections(sections: any[], currentIndex: number) {
    if (currentIndex >= sections.length) {
      alert(`✅ All sections created successfully!\nCreated ${sections.length} sections with questions.`);
      return;
    }

    const section = sections[currentIndex];
    const sectionData = {
      quizId: 0,
      order: section.order || (currentIndex + 1),
      name: section.name,
      type: section.type
    };

    console.log(`Creating section ${currentIndex + 1}:`, sectionData);

    // Here you would call your service to create the section
    // Example: this._quizService.createSection(sectionData).subscribe(...)

    // For now, simulate section creation
    setTimeout(() => {
      const mockSectionId = Math.floor(Math.random() * 1000) + currentIndex;
      this.addQuestionsToSectionBatch(mockSectionId, section.questions, section.type);

      // Create next section
      setTimeout(() => {
        this.createMultipleSections(sections, currentIndex + 1);
      }, 500);
    }, 500);
  }

  addQuestionsToSectionBatch(sectionId: number, questions: any[], questionType: number) {
    const preparedQuestions: any[] = [];

    questions.forEach((question, index) => {
      const questionData = question.value;

      const baseQuestion = {
        courseId: this.selectedCourse?.id || 0,
        quizId: 0,
        quizSectionId: sectionId,
        order: index + 1,
        hint: questionData.hint || '',
        text: questionData.text
      };

      // Add type-specific data
      if (questionType === 0) { // True/False
        preparedQuestions.push({
          ...baseQuestion,
          trueAndFalse: {
            answer: questionData.trueAndFalse.answer
          }
        });
      } else if (questionType === 1) { // Short Answer
        preparedQuestions.push({
          ...baseQuestion,
          shortAnswer: {
            answer: questionData.shortAnswer.answer
          }
        });
      } else if (questionType === 2) { // Multiple Choice
        preparedQuestions.push({
          ...baseQuestion,
          multipleChoise: questionData.multipleChoise.filter((choice: any) => choice.answer && choice.answer.trim())
        });
      }
    });

    console.log(`Adding ${preparedQuestions.length} questions to section ${sectionId}:`, preparedQuestions);

    // Here you would call your service to add questions
    // Example: this._quizService.addQuestions(preparedQuestions).subscribe(...)
  }

}
