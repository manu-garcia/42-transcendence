import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private languageKey = 'app_language';

  constructor() { }

  setCookie(value: string) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Ejemplo: la cookie expira en un año
    document.cookie = `${this.languageKey}=${value}; expires=${expires.toUTCString()}; path=/`;
  }

  getCookie(): string {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === this.languageKey) {
        return cookieValue;
      }
    }
    return 'en'; // Devuelve "en" por defecto si no se encuentra la cookie
  }

  deleteCookie() {
    const name = 'app_language';
    const expires = new Date(0);
    document.cookie = `${name}=; expires=${expires.toUTCString()}; path=/`;
  }
}
