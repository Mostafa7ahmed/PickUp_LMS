import { inject, Inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _render2 = inject(RendererFactory2).createRenderer(null,null);
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const savedLang = localStorage.getItem('lang');
      this._TranslateService.setDefaultLang('en');
      this._TranslateService.addLangs(['en', 'ar']);
      this.SetLang();
    }
   }


   SetLang() {
    if (!isPlatformBrowser(this._PLATFORM_ID)) {
      return;
    }

    const savedLang = localStorage.getItem('lang');
    // Always ensure a language is set; default to English if none stored
    const langToUse = savedLang ?? 'en';
    
    // Set the language
    this._TranslateService.use(langToUse);

    // Update document attributes
    if (langToUse === 'en') {
      this._render2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._render2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (langToUse === 'ar') {
      this._render2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._render2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  ChangeLang(lang: string) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);
      this.SetLang();
    }
  }
 }
