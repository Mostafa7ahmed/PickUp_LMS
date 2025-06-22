import {
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AllStagesComponent } from '../all-stages/all-stages.component';
import { PaginateTopicService } from '../../Service/paginate-topic.service';
import { IPaginationResponse } from '../../../../Core/Shared/Interface/irespose';
import { TopicResult } from '../../Core/Interface/itopic';
import { CommonModule, DatePipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SetDefaultTopicService } from '../../Service/set-default-topic.service';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteTopicComponent } from '../delete-topic/delete-topic.component';
import { filter, Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-topic',
  standalone: true,
  imports: [AllStagesComponent, DeleteTopicComponent,FormsModule, CommonModule, RouterLink,TooltipModule, TranslateModule, DatePipe],
  templateUrl: './all-topic.component.html',
  styleUrl: './all-topic.component.scss',
})
export class AllTopicComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
    private subscriptioncall = new Subscription();

  openPopup() { this.router.navigate([{ outlets: { dialog: [ 'addTopic'] } }]);  }
  constructor(private router: Router) {

  }

  //Values
  isShown: boolean = false;
  paginationTpoicsResponse: IPaginationResponse<TopicResult> = {} as IPaginationResponse<TopicResult>;
  filteredTopics: TopicResult[] = [];
  searchTerm: string = '';
  selectedTopicId: number | null = null;
  pageNumber = 1;
  pageSize = 80;
  loading = false;
  hasMoreData = true;
  isVisible = false;
  isSuccess = true;
  showPopup = false;

  //Values

  //Injecration
  private readonly _SetDefaultTopicService = inject(SetDefaultTopicService);
  private readonly _topicService = inject(PaginateTopicService);

  //Injecration

  //Funcation

  toggleShow(topicId: number | null) {
    this.selectedTopicId = this.selectedTopicId === topicId ? null : topicId;
  }

  getAllTopics() {
    this.subscription = this._topicService.getTopics().subscribe({
      next: (res) => {
        this.paginationTpoicsResponse = res;
        this.applySearch(); // Apply search filter after loading
        console.log('All Topics', this.paginationTpoicsResponse);
      },
      error: (error) => {
        console.error('Error fetching topics', error);
      },
    });
  }



  setDefaultTopic(id: number): void {
    this._SetDefaultTopicService.setDefaultTopic(id).subscribe((res) => {
      if (res.success) {
        let newDefaultTopicIndex =
          this.paginationTpoicsResponse.result.findIndex(
            (topic) => topic.id === res.result.newDefaultTopicId
          );
        this.paginationTpoicsResponse.result[newDefaultTopicIndex].default =
          true;
        let oldDefaultTopicIndex =
          this.paginationTpoicsResponse.result.findIndex(
            (topic) => topic.id === res.result.oldDefaultTopicId
          );
        this.paginationTpoicsResponse.result[oldDefaultTopicIndex].default =
          false;
        this.applySearch(); // Update filtered topics after default change
        this.selectedTopicId = null;
      } else {
        console.error('Failed to set default topic:', res);
      }
    });
  }

  ngOnInit(): void {
    this.getAllTopics();
     this.subscriptioncall.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          if (event.url === '/topics') {
            this.getAllTopics();
          }
        })
    );
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  openViewTopic(id: any) { 
    this.router.navigate([{ outlets: { dialog: ['ViewTopic', id] } }]);
  }
  isDeletePopupVisible = false;
  selectedDeleteId: number | null = null;
  isConfirmTopic = false;
  isDeleteTopic = true;
  isMoveTopic = false;

  openDeletePopup(topicId: number , hasCourses : boolean = false){

    if (!hasCourses) {
      this.isConfirmTopic = false;
      this.isDeleteTopic = true;
      this.isMoveTopic = false;
      this.selectedDeleteId = topicId;
        this.isDeletePopupVisible = true;
        console.log(hasCourses)
        this.toggleShow(null)
    }
    else {
      this.isConfirmTopic = true;
      this.isDeleteTopic = false;
      this.isMoveTopic = false;
      this.selectedDeleteId = topicId;
        this.isDeletePopupVisible = true;
        console.log(hasCourses)
        this.toggleShow(null)
    }

  }

  closeDeletePopup() {
    this.isDeletePopupVisible = false;
    this.selectedDeleteId = null;
  }
  handleDeletedTopic(deletedId: number) {
    this.paginationTpoicsResponse.result = this.paginationTpoicsResponse.result.filter(topic => topic.id !== deletedId);
    this.applySearch(); // Update filtered topics after deletion
    this.closeDeletePopup();
  }

  openEditTopic(idTopic: number) {
    this.router.navigate([{ outlets: { dialog: ['editTopic', idTopic] } }]);

    this.toggleShow(null)
  }

  // Search functionality
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applySearch();
  }

  applySearch() {
    if (!this.paginationTpoicsResponse.result) {
      this.filteredTopics = [];
      return;
    }

    if (!this.searchTerm.trim()) {
      this.filteredTopics = [...this.paginationTpoicsResponse.result];
    } else {
      const searchLower = this.searchTerm.toLowerCase().trim();
      this.filteredTopics = this.paginationTpoicsResponse.result.filter(topic =>
        topic.name.toLowerCase().includes(searchLower) ||
        topic.creator.name.toLowerCase().includes(searchLower) ||
        (topic.updater && topic.updater.name.toLowerCase().includes(searchLower)) ||
        topic.stages.some(stage => stage.name.toLowerCase().includes(searchLower))
      );
    }
    console.log(`🔍 Search results: ${this.filteredTopics.length} topics found for "${this.searchTerm}"`);
  }

  clearSearch() {
    this.searchTerm = '';
    this.applySearch();
  }

  // Handle keyboard shortcuts
  onSearchKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.clearSearch();
      (event.target as HTMLInputElement).blur();
    }
  }

  // Get search placeholder based on results
  getSearchPlaceholder(): string {
    if (!this.paginationTpoicsResponse.result || this.paginationTpoicsResponse.result.length === 0) {
      return 'No topics to search...';
    }
    return `Search ${this.paginationTpoicsResponse.result.length} topics...`;
  }

  // Highlight search terms in text
  highlightSearchTerm(text: string): string {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const searchRegex = new RegExp(`(${this.searchTerm.trim()})`, 'gi');
    return text.replace(searchRegex, '<mark class="search-highlight">$1</mark>');
  }

  // Safe getter for total topics count
  getTotalTopicsCount(): number {
    return this.paginationTpoicsResponse.result?.length || 0;
  }
}
