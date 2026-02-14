import { Injectable } from '@angular/core';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordGeneratorService {
  private readonly upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private readonly lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private readonly numberChars = '0123456789';
  private readonly symbolChars = '!@#$%^&*()_-+=';

  generate(options: PasswordOptions): string {
    let chars = '';

    if (options.uppercase) chars += this.upperCaseChars;
    if (options.lowercase) chars += this.lowerCaseChars;
    if (options.numbers) chars += this.numberChars;
    if (options.symbols) chars += this.symbolChars;

    if (chars.length === 0) {
      return '';
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return password;
  }
}
