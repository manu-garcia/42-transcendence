import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SessionService {
	private languageKey = 'app_language';

	constructor() { }

	getLanguage(): string {
		return sessionStorage.getItem(this.languageKey) || 'en';
	}

	setLanguage(language: string): void {
		sessionStorage.setItem(this.languageKey, language);
	}
}