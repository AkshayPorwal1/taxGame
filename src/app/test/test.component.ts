import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  selectedFiles: File[] = [];
  totalSizeExceeded: boolean = false;

  constructor(private http: HttpClient) { }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileSelected(event: any): void {
    this.handleFiles(event.target.files);
  }

  handleFiles(files: FileList): void {
    const allowedFileTypes = ['.pdf', '.txt'];

    // Filter out files with disallowed extensions
    const validFiles = Array.from(files).filter(file => {
      const fileExtension = '.' + file.name.split('.').pop();
      return allowedFileTypes.includes(fileExtension);
    });

    // Update the selectedFiles array
    this.selectedFiles = this.selectedFiles.concat(validFiles);

    // Check total size
    const totalSize = this.selectedFiles.reduce((acc, file) => acc + file.size, 0);
    this.totalSizeExceeded = totalSize > 25 * 1024 * 1024; // 25MB in bytes
  }

  deleteFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  formatBytes(bytes: number): string {
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    if (bytes === 0) return '0 Byte';

    const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(k))), 10);

    return Math.round(100 * bytes / Math.pow(k, i)) / 100 + ' ' + sizes[i];
  }

  onFilesDropped(event: CdkDragDrop<File[]>): void {
    moveItemInArray(this.selectedFiles, event.previousIndex, event.currentIndex);
  }

  uploadFiles(): void {
    // Assuming your backend API endpoint for file upload is '/api/upload'
    const uploadUrl = '/api/upload';

    const formData = new FormData();
    this.selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    this.http.post(uploadUrl, formData)
      .subscribe(
        response => {
          console.log('Files uploaded successfully:', response);
          // Optionally, you can reset the selectedFiles array here
          // this.selectedFiles = [];
        },
        error => {
          console.error('Error uploading files:', error);
        }
      );
  }
}
