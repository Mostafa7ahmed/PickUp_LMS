import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TopPopComponent } from '../../../../Components/top-pop/top-pop.component';
import { TextHeaderComponent } from '../text-header/text-header.component';
import { CustomSelectPriceOrFreeComponent } from '../custom-select-price-or-free/custom-select-price-or-free.component';
import { CustomslectwithiconComponent } from '../customslectwithicon/customslectwithicon.component';
import { CoustomSelectStageComponent } from '../coustom-select-stage/coustom-select-stage.component';
import { SplicTextPipe } from '../../Core/Pipes/splic-text.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { UpdateCourseService, IUpdateCourseRequest } from '../../Core/service/update-course.service';
import { GetonecourseService } from '../../Core/service/getonecourse.service';
import { TopiclistService } from '../../../Topics/Service/topiclist.service';
import { TagesService } from '../../Core/service/tages.service';
import { CustomFildsService } from '../../Core/service/custom-filds.service';
import { StreamService } from '../../../../Core/Services/stream.service';
import { StreamType } from '../../../../Core/Interface/stream-type';
import { environment } from '../../../../Environments/environment';


@Component({
    selector: 'app-edit-course',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TopPopComponent,
        TextHeaderComponent,
        CustomSelectPriceOrFreeComponent,
        CustomslectwithiconComponent,
        CoustomSelectStageComponent,
        SplicTextPipe,
        TooltipModule,
        MultiSelectModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        SelectModule,
        SplitButtonModule,
        KeyFilterModule
    ],
    templateUrl: './edit-course.component.html',
    styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit {
    @Input() courseId!: number;
    @Output() close = new EventEmitter<void>();
    @Output() courseUpdated = new EventEmitter<void>();

    @ViewChild('ImageInput') ImageInput!: ElementRef;
    @ViewChild('VideoInput') VideoInput!: ElementRef;
    @ViewChild('fileInput') fileInput!: ElementRef;

    courseForm!: FormGroup;
    fieldForm!: FormGroup;

    isLoad = false;
    isLoadTopic = false;
    isLoadCustomField = false;
    showDescription = false;
    isChecked = false;
    isPercentage = false;
    discountSymbol = 'EGP';

    // File upload states
    isUploadingImage = false;
    isUploadingVideo = false;
    isUploadingFile = false;
    selectedImageUrl: string | null = null;
    selectedVideoUrl: string | null = null;
    selectedImageName: string | null = null;
    selectedVideoName: string | null = null;
    uploadedFiles: any[] = [];

    // Data lists
    topicsList: any[] = [];
    stageList: any[] = [];
    tagsListResponse: any = { result: [] };
    customFieldListResponse: any = { result: [] };
    newCustomFieldList: any[] = [];

    // Selected items
    selectTopicDefault: any = null;
    selectStageDefault: any = null;

    // Discount types
    discountTypes = [
        { label: 'Percentage', value: 0 },
        { label: 'Fixed Amount', value: 1 }
    ];

    baseUrl = environment.baseUrlFiles;

    private _FormBuilder = inject(FormBuilder);
    private _updateCourseService = inject(UpdateCourseService);
    private _getOneCourseService = inject(GetonecourseService);
    private _topicListService = inject(TopiclistService);
    private _tagsService = inject(TagesService);
    private _customFieldsService = inject(CustomFildsService);
    private _streamService = inject(StreamService);
    private _activatedRoute = inject(ActivatedRoute);

    constructor(private router: Router) {
        this.initializeForms();
    }

    ngOnInit() {
        console.log('🔧 Edit Course Component - ngOnInit called');
        console.log('🔧 Route snapshot params:', this._activatedRoute.snapshot.params);
        console.log('🔧 Route snapshot outlet:', this._activatedRoute.snapshot.outlet);

        // Get courseId from route parameters
        this._activatedRoute.params.subscribe(params => {
            console.log('🔧 Route params subscription triggered:', params);
            this.courseId = +params['courseId'];
            console.log('🔧 Edit Course - Course ID:', this.courseId);

            if (this.courseId && !isNaN(this.courseId)) {
                console.log('✅ Valid course ID found, loading data...');
                this.loadInitialData();
                this.loadCourseData();
            } else {
                console.error('❌ No valid course ID provided for editing');
                console.error('❌ Params received:', params);
                console.error('❌ Parsed courseId:', this.courseId);
                alert('No valid course ID provided for editing');
                this.closePopup();
            }
        });
    }

    private initializeForms() {
        this.courseForm = this._FormBuilder.group({
            name: ['', Validators.required],
            description: [''],
            price: [0, [Validators.required, Validators.min(0)]],
            free: [false],
            topicId: [null, Validators.required],
            stageId: [null, Validators.required],
            photoUrl: [''],
            introductionVideoUrl: [''],
            fileUrls: [[]],
            tags: [[]],
            customFields: this._FormBuilder.array([]),
            discount: this._FormBuilder.group({
                type: [0],
                amount: [0, [Validators.min(0)]]
            })
        });

        this.fieldForm = this._FormBuilder.group({
            key: [''],
            value: ['']
        });

        console.log('📝 Form initialized with controls:', Object.keys(this.courseForm.controls));
    }

    private loadInitialData() {
        console.log('📊 Loading initial data for edit course...');
        this.getTopicList();
        this.getTagsList();
        this.getICustomField();
    }

    private loadCourseData() {
        if (this.courseId) {
            console.log('📖 Loading course data for ID:', this.courseId);
            this._getOneCourseService.getCourse(this.courseId).subscribe({
                next: (response) => {
                    console.log('📖 Course data response:', response);
                    if (response.success) {
                        this.populateForm(response.result);
                    } else {
                        console.error('❌ Failed to load course data:', response.message);
                        alert('Failed to load course data: ' + response.message);
                        this.closePopup();
                    }
                },
                error: (error) => {
                    console.error('❌ Error loading course data:', error);
                    alert('Error loading course data. Please try again.');
                    this.closePopup();
                }
            });
        }
    }

    private populateForm(courseData: any) {
        console.log('📝 Populating form with course data:', courseData);

        // Set basic course information
        this.courseForm.patchValue({
            name: courseData.name,
            description: courseData.description,
            price: courseData.price,
            free: courseData.free,
            topicId: courseData.stage?.topicId,
            stageId: courseData.stage?.id,
            photoUrl: courseData.photoUrl,
            introductionVideoUrl: courseData.introductionVideoUrl
        });

        // Set tags if they exist
        if (courseData.tags && Array.isArray(courseData.tags)) {
            const tagIds = courseData.tags.map((tag: any) => tag.id);
            this.courseForm.patchValue({ tags: tagIds });
            console.log('📝 Tags set:', tagIds);
        }

        // Set selected topic and stage
        if (courseData.stage) {
            // Find the topic and stage objects from the lists for proper binding
            const topicObj = this.topicsList.find(t => t.id === courseData.stage.topicId) || { id: courseData.stage.topicId };
            const stageObj = (topicObj.stages || []).find((s: any) => s.id === courseData.stage.id) || { id: courseData.stage.id };
            this.selectTopicDefault = topicObj;
            this.selectStageDefault = stageObj;

            // Load stages for the selected topic
            this.loadStagesForTopic(courseData.stage.topicId);
            // Patch form values
            this.courseForm.patchValue({
                topicId: topicObj.id,
                stageId: stageObj.id
            });
        }

        // Set image preview if exists
        if (courseData.photoUrl) {
            this.selectedImageUrl = this.baseUrl + courseData.photoUrl;
        }

        // Set video preview if exists
        if (courseData.introductionVideoUrl) {
            this.selectedVideoUrl = this.baseUrl + courseData.introductionVideoUrl;
        }

        // Set discount if exists
        if (courseData.discount) {
            this.isChecked = true;
            this.courseForm.patchValue({
                discount: {
                    type: courseData.discount.type,
                    amount: courseData.discount.amount
                }
            });
            this.onDiscountTypeChange();
        }

        // Show description if it exists
        if (courseData.description) {
            this.showDescription = true;
        }

        this.isLoadTopic = true;
        this.isLoadCustomField = true;

        // Mark form as touched to enable validation
        this.courseForm.markAllAsTouched();

        console.log('✅ Form populated successfully');
        console.log('📝 Final form value:', this.courseForm.value);
        console.log('📝 Form valid:', this.courseForm.valid);
        console.log('📝 Form errors:', this.getFormValidationErrors());
    }

    private loadStagesForTopic(topicId: number) {
        console.log('🔄 Loading stages for topic ID:', topicId);
        console.log('🔄 Available topics:', this.topicsList);

        const topic = this.topicsList.find(t => t.id === topicId);
        if (topic) {
            console.log('✅ Topic found:', topic);
            console.log('📋 Raw stages from topic:', topic.stages);

            // Filter stages like other components do (exclude type 2)
            if (topic.stages && Array.isArray(topic.stages)) {
                this.stageList = topic.stages.filter((stage: any) => stage.type !== 2);
                console.log('📋 Filtered stages (excluding type 2):', this.stageList);
            } else {
                this.stageList = [];
                console.log('⚠️ No stages found in topic or stages is not an array');
            }
        } else {
            console.error('❌ Topic not found for ID:', topicId);
            this.stageList = [];
        }
    }

    getTopicList() {
        this._topicListService.getAlllits().subscribe({
            next: (res: any) => {
                console.log('📋 Topics loaded:', res);
                this.topicsList = res.result;

                // Log each topic and its stages for debugging
                this.topicsList.forEach((topic: any) => {
                    console.log(`📋 Topic "${topic.name}" (ID: ${topic.id}) has ${topic.stages?.length || 0} stages:`, topic.stages);
                });

                // If editing, reload stages and selected topic/stage after topics are loaded
                if (this.courseForm.get('topicId')?.value) {
                    const topicId = this.courseForm.get('topicId')?.value;
                    console.log('🔄 Reloading stages for existing topic ID:', topicId);
                    this.loadStagesForTopic(topicId);

                    // Set selectTopicDefault and selectStageDefault to the actual objects
                    const topicObj = this.topicsList.find(t => t.id === topicId);
                    if (topicObj) {
                        this.selectTopicDefault = topicObj;
                        console.log('✅ Topic object found and set:', topicObj);

                        const stageId = this.courseForm.get('stageId')?.value;
                        if (stageId && topicObj.stages) {
                            const stageObj = topicObj.stages.find((s: any) => s.id === stageId);
                            if (stageObj) {
                                this.selectStageDefault = stageObj;
                                console.log('✅ Stage object found and set:', stageObj);
                            }
                        }
                    }
                }
            },
            error: (error) => {
                console.error('❌ Error loading topics:', error);
            }
        });
    }

    getTagsList() {
        this._tagsService.getTags().subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.tagsListResponse = res;
                }
            },
            error: (error) => {
                console.error('❌ Error loading tags:', error);
            }
        });
    }

    getICustomField() {
        this._customFieldsService.getCustomField().subscribe({
            next: (res: any) => {
                if (res.success) {
                    this.customFieldListResponse = res;
                }
            },
            error: (error) => {
                console.error('❌ Error loading custom fields:', error);
            }
        });
    }

    onTopicSelected(selectedTopicId: number) {
        console.log('🎯 Topic ID selected:', selectedTopicId);
        console.log('🎯 All topics list:', this.topicsList);

        // Find the full topic object by ID
        const selectedTopic = this.topicsList.find((topic: any) => topic.id === selectedTopicId);

        if (selectedTopic) {
            console.log('✅ Topic found:', selectedTopic);
            this.selectTopicDefault = selectedTopic;
            this.courseForm.patchValue({ topicId: selectedTopicId });

            // Load stages for this topic with filtering
            if (selectedTopic.stages && Array.isArray(selectedTopic.stages)) {
                this.stageList = selectedTopic.stages.filter((stage: any) => stage.type !== 2);
                console.log('📋 Filtered stages loaded for topic (excluding type 2):', this.stageList);
            } else {
                this.stageList = [];
                console.log('⚠️ No stages found in selected topic or stages is not an array');
            }

            // Reset stage selection
            this.selectStageDefault = null;
            this.courseForm.patchValue({ stageId: null });

            // Mark form controls as touched
            this.courseForm.get('topicId')?.markAsTouched();
            this.courseForm.get('stageId')?.markAsTouched();

            console.log('📝 Form after topic selection:', this.courseForm.value);
            console.log('📝 Form valid after topic selection:', this.courseForm.valid);
        } else {
            console.error('❌ Topic not found for ID:', selectedTopicId);
        }
    }

    onStageSelected(selectedStageId: number) {
        console.log('🎯 Stage ID selected:', selectedStageId);
        console.log('🎯 Available stages:', this.stageList);

        // Find the full stage object by ID
        const selectedStage = this.stageList.find((stage: any) => stage.id === selectedStageId);

        if (selectedStage) {
            console.log('✅ Stage found:', selectedStage);
            this.selectStageDefault = selectedStage;
            this.courseForm.patchValue({ stageId: selectedStageId });
            this.courseForm.get('stageId')?.markAsTouched();

            console.log('📝 Form after stage selection:', this.courseForm.value);
            console.log('📝 Form valid after stage selection:', this.courseForm.valid);
        } else {
            console.error('❌ Stage not found for ID:', selectedStageId);
        }
    }

    handleValueChange(event: any) {
        const isFree = event.free;
        this.courseForm.patchValue({
            free: isFree,
            price: isFree ? 0 : event.price
        });

        if (isFree) {
            this.isChecked = false;
        }
    }

    onDiscountCheckboxChange() {
        console.log('💰 Discount checkbox changed:', this.isChecked);
        if (!this.isChecked) {
            // Reset discount values when unchecked
            this.courseForm.patchValue({
                discount: {
                    type: 0,
                    amount: 0
                }
            });
        }
    }

    onDiscountTypeChange() {
        const discountType = this.courseForm.get('discount.type')?.value;
        this.isPercentage = discountType === 0;
        this.discountSymbol = this.isPercentage ? '%' : 'EGP';

        // Reset amount when type changes
        this.courseForm.get('discount.amount')?.setValue(0);
    }

    onAmountInput() {
        const amount = this.courseForm.get('discount.amount')?.value;
        const maxValue = this.isPercentage ? 100 : this.courseForm.get('price')?.value;

        if (amount > maxValue) {
            this.courseForm.get('discount.amount')?.setValue(maxValue);
        }
    }

    ShowDescription() {
        this.showDescription = !this.showDescription;
    }

    closePopup() {
        this.router.navigate([{ outlets: { dialog: null } }]);
    }

    updateCourse() {
        console.log('🔄 Attempting to update course...');
        console.log('📝 Form valid:', this.courseForm.valid);
        console.log('📝 Form value:', this.courseForm.value);
        console.log('📝 Form errors:', this.getFormValidationErrors());
        console.log('📝 Topic ID:', this.courseForm.get('topicId')?.value);
        console.log('📝 Stage ID:', this.courseForm.get('stageId')?.value);
        console.log('📝 Course Name:', this.courseForm.get('name')?.value);

        if (this.courseForm.valid) {
            this.isLoad = true;
            const updateRequest = this.collectUpdateCourseRequest();
            console.log('📤 Update request:', updateRequest);

            this._updateCourseService.updateCourse(updateRequest).subscribe({
                next: (response) => {
                    this.isLoad = false;
                    console.log('✅ Update response:', response);
                    if (response.success) {
                        console.log('✅ Course updated successfully!', response);
                        alert('Course updated successfully!');
                        this.closePopup();
                        // Optionally refresh the page or emit an event
                        window.location.reload();
                    } else {
                        console.error('❌ Failed to update course:', response.message);
                        alert('Failed to update course: ' + response.message);
                    }
                },
                error: (err) => {
                    this.isLoad = false;
                    console.error('❌ Error updating course:', err);
                    alert('Error updating course. Please try again.');
                }
            });
        } else {
            this.isLoad = false;
            console.log('❌ Form is invalid');
            this.markFormGroupTouched(this.courseForm);
            alert('Please fill in all required fields correctly.');
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            control?.markAsTouched({ onlySelf: true });
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private getFormValidationErrors() {
        const formErrors: any = {};
        Object.keys(this.courseForm.controls).forEach(key => {
            const controlErrors = this.courseForm.get(key)?.errors;
            if (controlErrors) {
                formErrors[key] = controlErrors;
            }
        });
        return formErrors;
    }

    private collectUpdateCourseRequest(): IUpdateCourseRequest {
        const formValue = this.courseForm.value;

        // Fix tags: if tags is array of IDs, map to array of {id}
        let tags: any[] = [];
        if (Array.isArray(formValue.tags)) {
            if (typeof formValue.tags[0] === 'object') {
                tags = formValue.tags.map((tag: any) => ({ id: tag.id, name: tag.name }));
            } else {
                tags = formValue.tags.map((id: number) => ({ id }));
            }
        }

        const customFields = this.customFieldsArray.value || [];

        const request: IUpdateCourseRequest = {
            id: this.courseId,
            topicId: formValue.topicId,
            stageId: formValue.stageId,
            name: formValue.name,
            price: formValue.free ? 0 : formValue.price,
            free: formValue.free,
            description: formValue.description || null,
            photoUrl: this.extractFileName(formValue.photoUrl) || null,
            introductionVideoUrl: this.extractFileName(formValue.introductionVideoUrl) || null,
            fileUrls: this.uploadedFiles.map(file => file.url) || [],
            tags: tags,
            customFields: customFields,
            discount: this.isChecked && !formValue.free ? formValue.discount : undefined
        };

        return request;
    }

    private extractFileName(url: string): string | null {
        if (!url) return null;
        if (url.startsWith('http')) {
            return url.split('/').pop() || null;
        }
        return url;
    }

    get customFieldsArray() {
        return this.courseForm.get('customFields') as FormArray;
    }

    get customFieldsControls() {
        return this.customFieldsArray.controls as FormGroup[];
    }

    // File upload methods
    triggerFileInput(type: string) {
        if (type === 'image') {
            this.ImageInput.nativeElement.click();
        } else if (type === 'video') {
            this.VideoInput.nativeElement.click();
        } else if (type === 'file') {
            this.fileInput.nativeElement.click();
        }
    }

    onFileSelectedImage(event: any) {
        const file = event.target.files[0];
        if (file) {
            console.log('📷 Image selected:', file.name);
            this.isUploadingImage = true;
            this.selectedImageName = file.name;

            this._streamService.upload(file, StreamType.photo).subscribe({
                next: (response) => {
                    const result = response?.body?.result;
                    if (result) {
                        this.selectedImageUrl = this.baseUrl + result.url;
                        this.courseForm.patchValue({ photoUrl: result.url });
                        console.log('✅ Image uploaded successfully');
                    }
                    this.isUploadingImage = false;
                },
                error: (error) => {
                    this.isUploadingImage = false;
                    console.error('❌ Error uploading image:', error);
                    alert('Error uploading image. Please try again.');
                }
            });
        }
    }

    onFileSelectedVideo(event: any) {
        const file = event.target.files[0];
        if (file) {
            console.log('🎥 Video selected:', file.name);
            this.isUploadingVideo = true;
            this.selectedVideoName = file.name;

            this._streamService.upload(file, StreamType.video).subscribe({
                next: (response) => {
                    const result = response?.body?.result;
                    if (result) {
                        this.selectedVideoUrl = this.baseUrl + result.url;
                        this.courseForm.patchValue({ introductionVideoUrl: result.url });
                        console.log('✅ Video uploaded successfully');
                    }
                    this.isUploadingVideo = false;
                },
                error: (error) => {
                    this.isUploadingVideo = false;
                    console.error('❌ Error uploading video:', error);
                    alert('Error uploading video. Please try again.');
                }
            });
        }
    }

    removeImage() {
        this.selectedImageUrl = null;
        this.selectedImageName = null;
        this.courseForm.patchValue({ photoUrl: '' });
        this.ImageInput.nativeElement.value = '';
    }

    removeVideo() {
        this.selectedVideoUrl = null;
        this.selectedVideoName = null;
        this.courseForm.patchValue({ introductionVideoUrl: '' });
        this.VideoInput.nativeElement.value = '';
    }

    onImageLoad() {
        // Handle image load if needed
    }

    // Additional methods needed for the template
    addTags(input: HTMLInputElement): void {
        const value = input.value.trim();
        if (!value || this.tagsListResponse.result.some((tag: any) => tag.name === value)) {
            return;
        }

        const newTag = {
            id: null,
            instructorId: 1,
            name: value,
            createdOn: null
        };

        this.tagsListResponse.result.unshift(newTag);
        input.value = '';
    }

    addField() {
        const keyControl = this.fieldForm.get('key')?.value;
        const valueControl = this.fieldForm.get('value')?.value;

        if ((!keyControl && keyControl !== 0) || !valueControl?.trim()) {
            return;
        }

        let key: string;
        let id: number | null;
        if (typeof keyControl === 'object' && keyControl !== null) {
            key = keyControl.key;
            id = keyControl.id;
        } else {
            key = keyControl.trim();
            id = null;
        }

        const isInSelectOptions = this.customFieldListResponse.result.some((option: any) => option.key === key);
        if (id === null && isInSelectOptions) return;

        const isExist = this.customFieldsArray.value.some((field: any) => field.key === key);
        if (isExist) return;

        const newFieldEntry = this._FormBuilder.group({
            id: [id],
            key: [key],
            value: [valueControl.trim()],
            visible: [true]
        });

        this.customFieldsArray.push(newFieldEntry);

        if (id === null && !isInSelectOptions) {
            this.customFieldListResponse.result.push({
                id: null,
                key: key,
                value: 0,
                createdOn: null
            });
        }

        this.newCustomFieldList = this.customFieldsArray.value;
        this.fieldForm.get('key')?.reset();
        this.fieldForm.get('value')?.reset();
    }

    removeField(index: number) {
        this.customFieldsArray.removeAt(index);
        this.newCustomFieldList = this.customFieldsArray.value;
    }

    onVisibleChange(index: number) {
        const field = this.customFieldsArray.at(index);
        console.log('Visible Now:', field.get('visible')?.value);
    }

    onFileSelectedFile(_event: Event) {
        // File upload functionality can be added if needed
        console.log('File upload not implemented yet');
    }

    removeFile(_index: number, _fileUrl: string) {
        // File removal functionality can be added if needed
        console.log('File removal not implemented yet');
    }
}
