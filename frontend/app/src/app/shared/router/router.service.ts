import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  public getApiUrl(url: string): string {
    if (!url || !url.length) {
      return url;
    }

    return `${this.getApiBaseUrl()}${this.trimStartingSlash(url)}`;
  }

  private getApiBaseUrl() {
    // TODO: should get this from the environment configuration (local, dev or prod)
    return 'http://localhost:3000/';
  }

  private trimStartingSlash(url: string): string {
    if (!url || !url.length) {
      return '';
    }

    return url.startsWith('/') ? url.substring(1) : url;
  }
}
