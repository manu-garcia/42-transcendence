import { Injectable } from '@angular/core';

import { environment } from 'env/environment';

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
    return environment.baseApiUrl;
  }

  private trimStartingSlash(url: string): string {
    if (!url || !url.length) {
      return '';
    }

    return url.startsWith('/') ? url.substring(1) : url;
  }
}
