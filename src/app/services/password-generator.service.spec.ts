import { TestBed } from '@angular/core/testing';
import { PasswordGeneratorService } from './password-generator.service';

describe('PasswordGeneratorService', () => {
  let service: PasswordGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty string when no options are selected', () => {
    const result = service.generate({
      length: 10,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(result).toBe('');
  });

  it('should generate password of correct length', () => {
    const result = service.generate({
      length: 16,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    expect(result.length).toBe(16);
  });

  it('should generate password with only uppercase chars when only uppercase is selected', () => {
    const result = service.generate({
      length: 50,
      uppercase: true,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(result).toMatch(/^[A-Z]+$/);
  });

  it('should generate password with only lowercase chars when only lowercase is selected', () => {
    const result = service.generate({
      length: 50,
      uppercase: false,
      lowercase: true,
      numbers: false,
      symbols: false,
    });
    expect(result).toMatch(/^[a-z]+$/);
  });

  it('should generate password with only numbers when only numbers is selected', () => {
    const result = service.generate({
      length: 50,
      uppercase: false,
      lowercase: false,
      numbers: true,
      symbols: false,
    });
    expect(result).toMatch(/^[0-9]+$/);
  });

  it('should generate password with only symbols when only symbols is selected', () => {
    const result = service.generate({
      length: 50,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: true,
    });
    expect(result).toMatch(/^[!@#$%^&*()_\-+=]+$/);
  });

  it('should respect different length values', () => {
    for (const len of [6, 10, 15, 20]) {
      const result = service.generate({
        length: len,
        uppercase: true,
        lowercase: true,
        numbers: false,
        symbols: false,
      });
      expect(result.length).toBe(len);
    }
  });
});
