import { Injectable } from '@angular/core';
import { Storage, StorageJSON } from 'megajs';
import { v4 as uuidv4 } from 'uuid'; 

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
            resolve();
          })
          .catch((error: any) => {
            reject(error);
          });
      } catch (error) {
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
          const fileName = `${uuidv4()}`;
          console.log(`📂 Uploading file as: ${fileName}`);

          const uploadStream = this.storage.upload({ name: fileName, size: buffer.length });
          uploadStream.on('complete', (uploadedFile: any) => {
            resolve(uploadedFile);
          });
  
          uploadStream.on('error', (err: any) => {
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


  logout(): void {
    if (this.storage) {
      try {
        this.storage.close(); 
        this.storage = null; 
        console.log('✅ Logged out from Mega successfully.');
      } catch (error) {
        console.error('❌ Error logging out:', error);
      }
    } else {
      console.warn('⚠️ No active Mega session to log out from.');
    }
  }
  
}
