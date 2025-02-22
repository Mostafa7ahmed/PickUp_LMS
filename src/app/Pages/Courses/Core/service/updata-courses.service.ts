import { Injectable } from '@angular/core';
import { Storage, StorageJSON } from 'megajs';

@Injectable({
  providedIn: 'root'
})
export class UpdataCoursesService {

  private storage: any;

  constructor() {}

  initializeMega(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.storage = new Storage({ email: email, password: password });

        this.storage.ready
          .then(() => {
            console.log('Storage Initialized:', JSON.stringify(this.storage, null, 2));
            resolve();
          })
          .catch((error: any) => {
            console.error('Error initializing storage:', error);
            reject(error);
          });
      } catch (error) {
        console.error('Storage initialization failed:', error);
        reject(error);
      }
    });
  }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.storage) {
        return reject(new Error('❌ Mega session is not initialized'));
      }
  
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
  
      reader.onload = async () => {
        try {
          const buffer = new Uint8Array(reader.result as ArrayBuffer);
          console.log('🟢 File Data:', buffer);


  
          const uploadStream = this.storage.upload({ name: file.name, size: buffer.length  });

  
          uploadStream.on('progress', (bytesLoaded: number, bytesTotal: number) => {
            const progress = ((bytesLoaded / bytesTotal) * 100).toFixed(2);
            console.log(`📶 Upload Progress: ${progress}%`);
          });
          uploadStream.on('complete', (uploadedFile: any) => {
            console.log('✅ File :', uploadedFile);
            resolve(uploadedFile);
          });
  
          uploadStream.on('error', (err: any) => {
            console.error('❌ Upload failed:', err);
            uploadStream.destroy();
            reject(err);
          });
  
          uploadStream.end(buffer);
        } catch (error) {
          reject(new Error('❌ Error processing file for upload'));
        }
      };
  
      reader.onerror = () => {
        reject(new Error('❌ Failed to read file as buffer'));
      };
    });
  }
  
}
