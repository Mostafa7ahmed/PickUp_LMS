import { ITopic, TopicResult } from './../../Core/Interface/itopic';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { CustomslectwithiconComponent } from '../../../Courses/Components/customslectwithicon/customslectwithicon.component';
import { IconListService } from '../../../../Core/Shared/service/icon-list.service';
import { ColorlistService } from '../../../../Core/Shared/service/colorlist.service';
import { SelectIconComponent } from '../../../../Components/select-icon/select-icon.component';
import { TopiclistService } from '../../Service/topiclist.service';
import { ITopiclist } from '../../../Courses/Core/interface/itopiclist';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTopicService } from '../../Service/add-topic.service';
import { IResponseOf } from '../../../../Core/Shared/Interface/irespose';
import { AddStageTopicService } from '../../Service/add-stage-topic.service';
import { GetoneTopicService } from '../../Service/getone-topic.service';
import { UpdateTopicService } from '../../Service/update-topic.service';
import { CustomValidators } from '../../../../Core/Shared/validators/custom-validators';
import { ValidationService } from '../../../../Core/Services/validation.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-edit-topic',
  standalone: true,
  imports: [TopPopComponent, CommonModule, SelectIconComponent, ReactiveFormsModule, CustomslectwithiconComponent, RouterModule],
  templateUrl: './edit-topic.component.html',
  styleUrl: '../add-topic/add-topic.component.scss'
})
export class EditTopicComponent {
  icons: string[] = [];
  colors: string[] = [];
  currentIcon: string = 'fa fa-file-pen';
  colorDefault: string = "#778fe6cf";
  ishowTab: boolean = true;
  isnext: boolean = true;
  selectedColors: string[] = [];
  maxStages = 8;
  isLoad: boolean = false;
  isVisble: boolean = true;
  isAddTopicPopupOpened: boolean = false;
  selectedTopicId: number | null = null;
  selectedValue: any
  topicsList: ITopiclist[] = [];
  openIndex: number | null = null;
  openExistingStageIndex: number | null = null; // For existing stages color picker
  topicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;

  topicID: number = 0;

  private _topiclistService = inject(TopiclistService);
  private router = inject(Router);
  private colorlistService = inject(ColorlistService);
  private iconsService = inject(IconListService);
  private _FormBuilder = inject(FormBuilder);
  private _UpdateTopicService = inject(UpdateTopicService);
  private _AddStageTopicService = inject(AddStageTopicService);
  private _getoneTopicService = inject(GetoneTopicService);
  private _validationService = inject(ValidationService);
  private _messageService = inject(NzMessageService);
  TopicResult: IResponseOf<TopicResult> = {} as IResponseOf<TopicResult>;
  topicForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, CustomValidators.name(), Validators.minLength(3), Validators.maxLength(50)]],
    color: ['#778fe6cf'],
    icon: ['fa fa-file-pen'],
    description: ['', [Validators.maxLength(500)]],
    isMain: [false],
    mainId: [null],
    id: [null]
  });

  // Validation properties
  showValidationErrors: boolean = false;

  constructor(private _ActivatedRoute: ActivatedRoute, private _Router: Router) {
    this.icons = this.iconsService.getIcons();
    this.colors = this.colorlistService.getColors();

    // Initialize topicResult with safe defaults
    this.topicResult = {
      success: false,
      statusCode: 0,
      message: '',
      result: {
        id: 0,
        instructorId: 0,
        creatorId: 0,
        updaterId: 0,
        name: '',
        description: '',
        color: '#778fe6cf',
        icon: 'fa fa-file-pen',
        isMain: false,
        mainId: 0,
        order: 0,
        default: false,
        snapshot: {
          totalPrice: 0,
          hasCourses: false,
          coursesCount: 0
        },
        createdOn: '',
        updatedOn: '',
        creator: {
          id: 0,
          name: '',
          photo: ''
        },
        updater: {
          id: 0,
          name: '',
          photo: ''
        },
        stages: []
      }
    };
  }

  handleIconSelected(icon: string) {
    this.currentIcon = icon;
    this.topicForm.controls['icon'].setValue(icon);

  }

  handleColorSelected(color: string) {
    this.colorDefault = color;
    this.topicForm.controls['color'].setValue(color);

  }


  showTab() {
    this.ishowTab = !this.ishowTab;
  }
  closePopup() {
    this.router.navigate([{ outlets: { dialog: null } }]);
  }


  submitFormTopic() {
    this.showValidationErrors = true;
    
    // Mark all fields as touched to show validation errors
    this._validationService.markAllFieldsAsTouched(this.topicForm);

    if (!this.topicForm.valid) {
      this._messageService.error('يرجى تصحيح الأخطاء في النموذج');
      return;
    }

    this.isLoad = true;

    if (this.topicForm.get('isMain')?.value) {
      this.topicForm.get('mainId')?.enable();
      this.topicForm.patchValue({ mainId: null });
    } else {
      const mainIdValue = this.selectedTopicId ?? this.selectedValue?.id ?? null;
      if (mainIdValue !== null) {
        this.topicForm.patchValue({ mainId: mainIdValue });
      }
    }
    
    this._UpdateTopicService.updateTopic(this.topicForm.value).subscribe({
      next: (res) => {
        if (res.success) {
          this.topicResult.result = res.result;
          this.topicID = this.topicResult.result.id;
          this.stageForm.patchValue({ topicId: this.topicID });

          // Ensure stages array exists after update
          if (!this.topicResult.result.stages) {
            this.topicResult.result.stages = [];
            console.log('⚠️ Stages array was missing after update, initialized empty array');
          }

          this._messageService.success('تم تحديث الموضوع بنجاح');
          console.log('📊 Final stages after update:', this.topicResult.result.stages);
          this.isnext = false;
          this.showValidationErrors = false;
        } else {
          this._messageService.error(res.message || 'فشل في تحديث الموضوع');
        }
        this.isLoad = false;
      },
      error: (err) => {
        console.error('Error updating topic:', err);
        this._messageService.error('حدث خطأ أثناء تحديث الموضوع');
        this.isLoad = false;
      },
    });

    console.log(this.topicForm.value)
  }

  onTopicSelected(selectedId: number) {
    this.selectedTopicId = selectedId;
    console.log('Selected Topic ID:', selectedId);
  }

  // Validation helper methods
  isFieldInvalid(fieldName: string): boolean {
    return this._validationService.isFieldInvalid(this.topicForm, fieldName);
  }

  isFieldValid(fieldName: string): boolean {
    return this._validationService.isFieldValid(this.topicForm, fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.topicForm.get(fieldName);
    return this._validationService.getErrorMessage(control, fieldName);
  }

  getFieldCssClass(fieldName: string): string {
    return this._validationService.getFieldCssClass(this.topicForm, fieldName);
  }

  // Stage validation helpers
  isStageFieldInvalid(stageIndex: number, fieldName: string): boolean {
    const stageGroup = this.stages.at(stageIndex) as FormGroup;
    const field = stageGroup?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getStageErrorMessage(stageIndex: number, fieldName: string): string {
    const stageGroup = this.stages.at(stageIndex) as FormGroup;
    const field = stageGroup?.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return 'اسم المرحلة مطلوب';
      }
      if (field.errors['minlength']) {
        return 'اسم المرحلة يجب أن يكون 3 أحرف على الأقل';
      }
      if (field.errors['maxlength']) {
        return 'اسم المرحلة لا يمكن أن يتجاوز 50 حرف';
      }
    }
    return '';
  }


  // Create Stage


  stageForm: FormGroup = new FormGroup({
    topicId: new FormControl(),
    newStages: new FormArray([])
  });



  createFormStage() {
    this.stageForm = new FormGroup({
      newStages: new FormArray([])
    });
  }

  get stages(): FormArray {
    return this.stageForm?.get('newStages') as FormArray || new FormArray([]);
  }
  addStage() {
    const index = this.stages.length;
    const orderValue = index + 2;
    const selectedColor = this.selectedColors[index] || this.colors[index % this.colors.length];

    const stageGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      color: new FormControl(selectedColor, Validators.required),
      icon: new FormControl('fa fa-address-book', Validators.required),
      shadow: new FormControl(selectedColor, Validators.required),
      order: new FormControl(orderValue),
      id: new FormControl(0), // New stage has ID 0
      default: new FormControl(false),
      type: new FormControl(1) // Custom stage type
    });

    this.stages.push(stageGroup);
    this.selectedColors.push(selectedColor);

    console.log('➕ Added new stage:', stageGroup.value);
    console.log('📊 Current stages:', this.stages.value);
  }

  selectColor(index: number, color: string) {
    this.selectedColors[index] = color;

    // Update both color and shadow in the form
    const stageControl = this.stages.at(index);
    if (stageControl) {
      stageControl.get('color')?.setValue(color);
      stageControl.get('shadow')?.setValue(color);
    }

    this.openIndex = null;
    // Close existing stages color picker if open
    this.openExistingStageIndex = null;
  }
  removeStage(index: number) {
    this.stages.removeAt(index);
  }
  togglePackageColor(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
  next() {
    console.log(this.stageForm.value)

  }
  submitFormStage() {
    this.isLoad = true;

    // Ensure unique orders before submission
    this.updateStageOrders();

    // Validate stage orders
    if (!this.validateStageOrders()) {
      alert('من فضلك اختر ترتيب مميز لكل مرحلة');
      this.isLoad = false;
      return;
    }

    // Validate stage names
    if (!this.validateStageNames()) {
      alert('من فضلك تأكد من أن جميع المراحل لها أسماء صحيحة');
      this.isLoad = false;
      return;
    }

    // Get all stages from the form
    const formStages = this.stageForm.get('newStages')?.value || [];
    console.log('📊 All form stages:', formStages);

    // Get existing stages from topicResult
    const existingStages = this.topicResult?.result?.stages || [];
    console.log('📊 Existing stages:', existingStages);

    // Prepare new stages (stages without ID or with ID <= 0)
    const newStages = formStages
      .filter((stage: any) => !stage.id || stage.id <= 0)
      .map((stage: any) => ({
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        shadow: stage.shadow || stage.color,
        order: stage.order
      }));

    // Prepare updated stages (existing stages that can be modified)
    const updatedStages = existingStages
      .filter((stage: any) => {
        const isFromAPI = stage.id > 0;
        const isNotDefault = !stage.default;
        const isNotType2 = stage.type !== 2;
        console.log(`Stage ${stage.id} - isFromAPI:${isFromAPI}, isNotDefault:${isNotDefault}, isNotType2:${isNotType2}`);
        return isFromAPI && isNotDefault && isNotType2;
      })
      .map((stage: any) => ({
        id: stage.id,
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        shadow: stage.shadow || stage.color,
        order: stage.order
      }));

    // Prepare final data
    const stageData = {
      topicId: this.topicID,
      newStages: newStages,
      updatedStages: updatedStages
    };

    console.log('📝 Final stage data to submit:', stageData);
    console.log('📊 New stages count:', newStages.length);
    console.log('📊 Updated stages count:', updatedStages.length);

    // Debug stages
    console.log('🔍 Debug stages:');
    console.log('Form stages:', formStages);
    console.log('Existing stages:', existingStages);
    console.log('New stages:', newStages);
    console.log('Updated stages:', updatedStages);

    this._AddStageTopicService.addStageFromTopic(stageData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('✅ Stages updated successfully:', res);
          this.isLoad = false;
          this.closePopup();
        }
      },
      error: (err) => {
        console.error('❌ Error updating stages:', err);
        if (err.error?.message) {
          alert(err.error.message);
        } else if (err.message) {
          alert(err.message);
        } else {
          alert('حدث خطأ أثناء تحديث المراحل');
        }
        this.isLoad = false;
      },
    });
  }



  // Get updated existing stages (ALL stages that came from API getone)
  private getUpdatedStages(): any[] {
    if (!this.topicResult?.result?.stages) {
      console.log('🔍 getUpdatedStages: No stages array found');
      return [];
    }

    console.log('🔍 getUpdatedStages: Processing stages:', this.topicResult.result.stages.map(s => `ID:${s.id} Name:${s.name}`));

    const updatedStages = this.topicResult.result.stages
      .filter(stage => {
        // Only include stages that can be updated:
        // 1. Must have a valid ID (from API)
        // 2. Must not be a default stage
        // 3. Must not be type 2
        const isFromAPI = stage.id > 0;
        const isNotDefault = !stage.default;
        const isNotType2 = stage.type !== 2;
        
        const canUpdate = isFromAPI && isNotDefault && isNotType2;
        
        console.log(`  🔍 Stage ${stage.id}:"${stage.name}" - canUpdate: ${canUpdate} (isFromAPI:${isFromAPI}, isNotDefault:${isNotDefault}, isNotType2:${isNotType2})`);
        return canUpdate;
      })
      .map(stage => ({
        id: stage.id,
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        shadow: stage.shadow || stage.color, // Use shadow or fallback to color
        order: stage.order
      }));

    console.log('📊 Updated stages result (filtered for update):', updatedStages);
    return updatedStages;
  }

  // Get new stages (stages added by user)
  private getNewStages(): any[] {
    if (!this.topicResult?.result?.stages) {
      console.log('🔍 getNewStages: No stages array found');
      return [];
    }

    console.log('🔍 getNewStages: Processing stages:', this.topicResult.result.stages.map(s => `ID:${s.id} Name:${s.name}`));

    const newStages = this.topicResult.result.stages
      .filter(stage => {
        // Only newly added stages (id = 0 or negative)
        const isNew = stage.id <= 0;
        console.log(`  🔍 Stage ${stage.id}:"${stage.name}" - isNew: ${isNew}`);
        return isNew;
      })
      .map(stage => ({
        name: stage.name,
        color: stage.color,
        icon: stage.icon,
        shadow: stage.shadow || stage.color, // Use shadow or fallback to color
        order: stage.order
      }));

    console.log('📊 New stages result (ONLY user added):', newStages);
    return newStages;
  }

  getTopicList() {
    this._topiclistService.getAlllits().subscribe(topics => {
      this.topicsList = topics.result;
      let defaultTopic = this.topicsList.find((e: ITopiclist) => e.id === this.topicResult.result.mainId);
      if (!defaultTopic) {
        defaultTopic = this.topicsList.find((e: ITopiclist) => e.default);
      }
      if (!defaultTopic && this.topicsList.length > 0) {
        defaultTopic = this.topicsList[0];
      }
      this.selectedValue = defaultTopic;
    });
  }

  getTopicById(topicID: number) {
    this._getoneTopicService.getTopicById(topicID).subscribe({
      next: (topic) => {
        this.topicResult = topic;
        console.log('📥 Loaded topic:', this.topicResult);

        // Ensure stages array exists
        if (!this.topicResult.result.stages) {
          this.topicResult.result.stages = [];
        }

        // Initialize form stages if needed
        if (!this.stageForm.get('newStages')) {
          this.stageForm.addControl('newStages', new FormArray([]));
        }

        // Clear existing form stages
        const newStagesArray = this.stageForm.get('newStages') as FormArray;
        newStagesArray.clear();

        // Add existing stages to form
        this.topicResult.result.stages.forEach(stage => {
          const stageGroup = new FormGroup({
            id: new FormControl(stage.id),
            name: new FormControl(stage.name),
            color: new FormControl(stage.color),
            icon: new FormControl(stage.icon),
            shadow: new FormControl(stage.shadow || stage.color),
            order: new FormControl(stage.order),
            default: new FormControl(stage.default),
            type: new FormControl(stage.type)
          });
          newStagesArray.push(stageGroup);
          console.log('➕ Added existing stage to form:', stageGroup.value);
        });

        console.log('📊 Form stages after initialization:', this.stageForm.get('newStages')?.value);
        console.log('📊 Topic stages:', this.topicResult.result.stages);

        this.topicForm.patchValue(this.topicResult.result);
        this.stageForm.patchValue({ topicId: this.topicResult.result.id });

        this.getTopicList();
      },
      error: (error) => {
        console.error('Error fetching topic:', error);
      }
    });
  }


  // Safe getter methods for template
  getStageColor(index: number): string {
    try {
      return this.topicResult?.result?.stages?.[index]?.color || '#778fe6cf';
    } catch (error) {
      console.warn(`Error getting stage color at index ${index}:`, error);
      return '#778fe6cf';
    }
  }

  getStageName(index: number): string {
    try {
      return this.topicResult?.result?.stages?.[index]?.name || '';
    } catch (error) {
      console.warn(`Error getting stage name at index ${index}:`, error);
      return '';
    }
  }

  hasStages(): boolean {
    try {
      return !!(this.topicResult?.result?.stages && this.topicResult.result.stages.length > 0);
    } catch (error) {
      console.warn('Error checking if has stages:', error);
      return false;
    }
  }

  hasStageAtIndex(index: number): boolean {
    try {
      return !!(this.topicResult?.result?.stages && this.topicResult.result.stages.length > index);
    } catch (error) {
      console.warn(`Error checking stage at index ${index}:`, error);
      return false;
    }
  }

  // Debug method for template
  getStagesDebugInfo(): string {
    try {
      const stages = this.topicResult?.result?.stages;
      if (!stages) return 'No stages array';

      const stageInfo = stages.map((s, i) =>
        `${i}:${s?.name || 'unnamed'}(order:${s?.order || 'none'})`
      ).join(', ');

      return `${stages.length} stages: [${stageInfo}]`;
    } catch (error) {
      return `Error: ${error}`;
    }
  }

  // Display detailed stages information
  private displayStagesInfo(): void {
    if (!this.topicResult?.result?.stages) {
      console.log('🔍 No stages to display');
      return;
    }

    console.log('🎯 STAGES FROM API (getone):');
    console.log('================================');

    this.topicResult.result.stages.forEach((stage, index) => {
      console.log(`📌 Stage ${index + 1}:`);
      console.log(`   ID: ${stage.id}`);
      console.log(`   Name: "${stage.name}"`);
      console.log(`   Order: ${stage.order}`);
      console.log(`   Color: ${stage.color}`);
      console.log(`   Shadow: ${stage.shadow || 'null'}`);
      console.log(`   Type: ${stage.type} (${this.getStageTypeLabel(stage.type)})`);
      console.log(`   Default: ${stage.default}`);
      console.log(`   Icon: ${stage.icon}`);
      console.log(`   Created: ${stage.createdOn}`);
      console.log('   ---');
    });

    console.log('================================');
    console.log(`📊 Total stages: ${this.topicResult.result.stages.length}`);
    console.log(`📊 Default stages: ${this.topicResult.result.stages.filter(s => s.default).length}`);
    console.log(`📊 Custom stages: ${this.topicResult.result.stages.filter(s => !s.default).length}`);
  }

  // Get stage type label for debugging
  private getStageTypeLabel(type: number): string {
    switch (type) {
      case 0: return 'New/Initial';
      case 1: return 'Custom';
      case 2: return 'Published/Final';
      default: return 'Unknown';
    }
  }

  // Track by function for stages
  trackByStageId(index: number, stage: any): number {
    return stage.id || index;
  }

  // Update stage name
  updateStageName(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const newName = target.value.trim();

    if (this.topicResult?.result?.stages?.[index]) {
      this.topicResult.result.stages[index].name = newName;
      console.log(`📝 Updated stage ${index} name to: ${newName}`);
    }
  }

  // Toggle color picker for existing stages
  toggleExistingStageColor(index: number): void {
    this.openExistingStageIndex = this.openExistingStageIndex === index ? null : index;
    // Close form stages color picker if open
    this.openIndex = null;
  }

  // Select color for existing stage
  selectExistingStageColor(index: number, color: string): void {
    if (this.topicResult?.result?.stages?.[index]) {
      this.topicResult.result.stages[index].color = color;
      this.topicResult.result.stages[index].shadow = color; // Update shadow too
      console.log(`🎨 Updated stage ${index} color to: ${color}`);
    }
    this.openExistingStageIndex = null;
  }

  // Remove existing stage
  removeExistingStage(_stageId: number, index: number): void {
    if (!this.topicResult?.result?.stages) return;

    const stage = this.topicResult.result.stages[index];
    if (stage.default) {
      alert('Cannot delete default stage');
      return;
    }

    if (confirm(`Are you sure you want to delete "${stage.name}" stage?`)) {
      // Remove from local array
      this.topicResult.result.stages.splice(index, 1);
      this.updateStageOrders();
      console.log(`🗑️ Removed stage: ${stage.name}`);

      // TODO: Call API to delete stage from backend if it's an existing stage
      // this.deleteStageFromAPI(stageId);
    }
  }

  // Add new stage to existing stages
  addNewStage(): void {
    if (!this.topicResult?.result?.stages) {
      this.topicResult = { ...this.topicResult, result: { ...this.topicResult?.result, stages: [] } };
    }

    const newStage = {
      id: 0, // New stage ID (will be assigned by backend)
      topicId: this.topicID,
      instructorId: this.topicResult.result.instructorId,
      name: `New Stage ${this.topicResult.result.stages.length + 1}`,
      order: this.topicResult.result.stages.length + 1,
      color: '#778fe6cf',
      icon: 'fa fa-address-book',
      shadow: '#778fe6cf',
      type: 1, // Custom stage type
      createdOn: new Date().toISOString(),
      default: false,
      snapshot: {
        id: 0,
        totalPrice: 0,
        hasCourses: false,
        coursesCount: 0
      },
      courses: []
    };

    this.topicResult.result.stages.push(newStage);
    this.updateStageOrders();
    console.log('➕ Added new stage:', newStage);
  }

  // Update stage orders after add/remove operations
  private updateStageOrders(): void {
    if (!this.topicResult?.result?.stages) return;

    console.log('🔄 Before order update:', this.topicResult.result.stages.map(s => `${s.name}:${s.order}`));

    // Sort stages by current order first to maintain relative positions
    this.topicResult.result.stages.sort((a, b) => a.order - b.order);

    // Assign unique sequential orders starting from 1
    this.topicResult.result.stages.forEach((stage, index) => {
      const oldOrder = stage.order;
      stage.order = index + 1;
      if (oldOrder !== stage.order) {
        console.log(`  🔄 Updated "${stage.name}": ${oldOrder} → ${stage.order}`);
      }
    });

    console.log('✅ After order update:', this.topicResult.result.stages.map(s => `${s.name}:${s.order}`));
  }

  // Validate stage orders before submission
  private validateStageOrders(): boolean {
    if (!this.topicResult?.result?.stages) return true;

    const orders = this.topicResult.result.stages.map(s => s.order);
    const uniqueOrders = new Set(orders);

    if (orders.length !== uniqueOrders.size) {
      console.error('❌ Duplicate stage orders found:', orders);
      return false;
    }

    // Check for sequential orders starting from 1
    const sortedOrders = [...orders].sort((a, b) => a - b);
    for (let i = 0; i < sortedOrders.length; i++) {
      if (sortedOrders[i] !== i + 1) {
        console.error('❌ Non-sequential stage orders:', sortedOrders);
        return false;
      }
    }

    return true;
  }

  // Validate stage names
  private validateStageNames(): boolean {
    if (!this.topicResult?.result?.stages) return true;

    for (const stage of this.topicResult.result.stages) {
      if (!stage.name || stage.name.trim().length < 3) {
        console.error('❌ Invalid stage name:', stage.name);
        return false;
      }
    }

    // Check form stages as well
    const formStages = this.stageForm.get('newStages')?.value || [];
    for (const stage of formStages) {
      if (!stage.name || stage.name.trim().length < 3) {
        console.error('❌ Invalid form stage name:', stage.name);
        return false;
      }
    }

    return true;
  }

  // Fix stage orders on initial load
  private fixStageOrders(): void {
    if (!this.topicResult?.result?.stages) return;

    console.log('🔧 Checking stage orders...');

    // Check if orders need fixing
    const orders = this.topicResult.result.stages.map(s => s.order);
    const uniqueOrders = new Set(orders);
    const sortedOrders = [...orders].sort((a, b) => a - b);

    console.log(`📊 Current orders: [${orders.join(', ')}]`);
    console.log(`📊 Sorted orders: [${sortedOrders.join(', ')}]`);
    console.log(`📊 Unique orders: ${uniqueOrders.size}/${orders.length}`);

    // Check if we need to fix orders
    let needsFix = false;

    // Check for duplicates
    if (orders.length !== uniqueOrders.size) {
      console.log('⚠️ Found duplicate orders');
      needsFix = true;
    }

    // Check if orders start from 1 and are sequential
    for (let i = 0; i < sortedOrders.length; i++) {
      if (sortedOrders[i] !== i + 1) {
        console.log(`⚠️ Non-sequential order found: expected ${i + 1}, got ${sortedOrders[i]}`);
        needsFix = true;
        break;
      }
    }

    if (needsFix) {
      console.log('🔧 Fixing stage orders...');
      this.updateStageOrders();
    } else {
      console.log('✅ Stage orders are correct');
    }
  }



  ngOnInit(): void {
    this.topicForm.get('isMain')?.valueChanges.subscribe((isChecked) => {
      if (isChecked) {
        this.topicForm.get('mainId')?.setValue(null, { emitEvent: false });
        this.topicForm.get('mainId')?.disable({ emitEvent: false });
      } else {
        this.topicForm.get('mainId')?.enable({ emitEvent: false });
      }
    });

    this._ActivatedRoute.params.subscribe(params => {
      if (params['topicId'] && params['topicId'] !== '0') {
        this.topicID = +params['topicId'];
        this.getTopicById(this.topicID);
      }
    });

    // Close color pickers when clicking outside
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.color-popup') && !target.closest('.packageColor')) {
        this.openIndex = null;
        this.openExistingStageIndex = null;
      }
    });
  }

}
