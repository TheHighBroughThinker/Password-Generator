import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { vi } from 'vitest';
import { PasswordGeneratorComponent } from './password-generator.component';
import { PasswordGeneratorService } from '../../services/password-generator.service';

describe('PasswordGeneratorComponent', () => {
  let component: PasswordGeneratorComponent;
  let fixture: ReturnType<typeof TestBed.createComponent<PasswordGeneratorComponent>>;
  let service: PasswordGeneratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordGeneratorComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordGeneratorComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PasswordGeneratorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default values', () => {
    expect(component.password).toBe('');
    expect(component.length).toBe(12);
    expect(component.uppercase).toBe(false);
    expect(component.lowercase).toBe(false);
    expect(component.numbers).toBe(false);
    expect(component.symbols).toBe(false);
    expect(component.justGenerated).toBe(false);
  });

  it('should generate a password by calling the service', () => {
    const spy = vi.spyOn(service, 'generate').mockReturnValue('TestPass123');
    component.uppercase = true;
    component.lowercase = true;
    component.numbers = true;

    component.generatePassword();

    expect(spy).toHaveBeenCalledWith({
      length: 12,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
    });
    expect(component.password).toBe('TestPass123');
    spy.mockRestore();
  });

  it('should trigger shimmer animation when generating password', () => {
    vi.spyOn(service, 'generate').mockReturnValue('TestPass123');
    vi.useFakeTimers();

    component.generatePassword();
    
    expect(component.justGenerated).toBe(true);
    
    vi.advanceTimersByTime(1000);
    expect(component.justGenerated).toBe(false);
    
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should call clipboard writeText when copying a password', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });
    component.password = 'MyPassword';

    component.copyPassword();

    expect(writeTextMock).toHaveBeenCalledWith('MyPassword');
  });

  it('should not call clipboard writeText when password is empty', () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });
    component.password = '';

    component.copyPassword();

    expect(writeTextMock).not.toHaveBeenCalled();
  });

  it('should render the password generator card with nature theme elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('mat-card.generator-card');
    expect(card).toBeTruthy();
    expect(card?.getAttribute('appearance')).toBe('outlined');
  });

  it('should render nature-themed icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleIcon = compiled.querySelector('.title-icon mat-icon');
    const generateIcon = compiled.querySelector('.generate-button mat-icon');
    
    expect(titleIcon?.textContent).toBe('eco');
    expect(generateIcon?.textContent).toBe('park');
  });

  it('should render the subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('mat-card-subtitle');
    expect(subtitle?.textContent).toBe('Create strong, secure passwords');
  });

  it('should render password display container with shimmer class binding', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.password-display-container');
    expect(container).toBeTruthy();
  });

  it('should apply just-generated class when password is generated', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.password-display-container');
    
    expect(container?.classList.contains('just-generated')).toBe(false);
    
    vi.spyOn(service, 'generate').mockReturnValue('TestPass123');
    component.generatePassword();
    fixture.detectChanges();
    
    expect(container?.classList.contains('just-generated')).toBe(true);
  });

  it('should render slider with separate value display', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sliderValue = compiled.querySelector('.slider-value');
    expect(sliderValue?.textContent).toBe('12');
  });

  it('should render checkbox options with descriptive icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const optionIcons = compiled.querySelectorAll('.option-icon mat-icon');
    
    expect(optionIcons).toHaveLength(4);
    expect(optionIcons[0].textContent).toBe('text_fields');
    expect(optionIcons[1].textContent).toBe('lowercase');
    expect(optionIcons[2].textContent).toBe('pin');
    expect(optionIcons[3].textContent).toBe('tag');
  });

  it('should render generate button with correct text and styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('.generate-button');
    expect(button?.textContent).toContain('Generate Password');
    expect(button?.getAttribute('mat-flat-button')).toBe('');
  });

  it('should update slider value display when length changes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sliderValue = compiled.querySelector('.slider-value');
    
    component.length = 16;
    fixture.detectChanges();
    
    expect(sliderValue?.textContent).toBe('16');
  });

  it('should have proper responsive structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const controlsSection = compiled.querySelector('.controls-section');
    const sliderSection = compiled.querySelector('.slider-section');
    const optionsSection = compiled.querySelector('.options-section');
    const optionGrid = compiled.querySelector('.option-grid');
    
    expect(controlsSection).toBeTruthy();
    expect(sliderSection).toBeTruthy();
    expect(optionsSection).toBeTruthy();
    expect(optionGrid).toBeTruthy();
  });

  it('should render all checkbox options with correct labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const optionLabels = compiled.querySelectorAll('.option-label');
    
    expect(optionLabels).toHaveLength(4);
    expect(optionLabels[0].textContent).toContain('Uppercase Letters');
    expect(optionLabels[1].textContent).toContain('Lowercase Letters');
    expect(optionLabels[2].textContent).toContain('Numbers');
    expect(optionLabels[3].textContent).toContain('Symbols');
  });

  it('should have proper form field structure for password display', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const formField = compiled.querySelector('.password-field');
    const input = formField?.querySelector('input');
    
    expect(formField?.getAttribute('appearance')).toBe('outline');
    expect(input?.getAttribute('readonly')).toBe('');
    expect(input?.getAttribute('placeholder')).toBe('P4$5W0rD!');
  });

  it('should render copy button with correct attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyButton = compiled.querySelector('.copy-button');
    
    expect(copyButton?.getAttribute('mat-icon-button')).toBe('');
    expect(copyButton?.getAttribute('disabled')).toBe('');
  });

  it('should enable copy button when password is present', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const copyButton = compiled.querySelector('.copy-button');
    
    component.password = 'test';
    fixture.detectChanges();
    
    expect(copyButton?.hasAttribute('disabled')).toBe(false);
  });

  it('should handle slider change and trigger instant password generation', () => {
    const spy = vi.spyOn(service, 'generate').mockReturnValue('NewPass123');

    component.onSliderChange({ value: 16 });
    
    expect(component.length).toBe(16);
    expect(spy).toHaveBeenCalledWith({
      length: 16,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(component.password).toBe('NewPass123');
    
    vi.restoreAllMocks();
  });

  it('should generate password for each slider change', () => {
    const spy = vi.spyOn(service, 'generate').mockReturnValue('TestPass');

    component.onSliderChange({ value: 8 });
    component.onSliderChange({ value: 10 });
    component.onSliderChange({ value: 14 });
    
    // Should generate for each change since it's instant
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenNthCalledWith(1, {
      length: 8,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(spy).toHaveBeenNthCalledWith(2, {
      length: 10,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    expect(spy).toHaveBeenNthCalledWith(3, {
      length: 14,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    
    vi.restoreAllMocks();
  });

  it('should handle slider change with target.value', () => {
    const spy = vi.spyOn(service, 'generate').mockReturnValue('TargetPass');

    component.onSliderChange({ target: { value: 18 } });
    
    expect(component.length).toBe(18);
    expect(spy).toHaveBeenCalledWith({
      length: 18,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
    });
    
    vi.restoreAllMocks();
  });

  it('should not generate password for invalid slider values', () => {
    const spy = vi.spyOn(service, 'generate').mockReturnValue('TestPass');

    component.onSliderChange({ value: null });
    component.onSliderChange({ value: undefined });
    component.onSliderChange({ target: { value: null } });
    
    expect(spy).not.toHaveBeenCalled();
    
    vi.restoreAllMocks();
  });
});
