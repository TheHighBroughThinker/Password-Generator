import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PasswordGeneratorService } from '../../services/password-generator.service';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './password-generator.component.html',
  styleUrl: './password-generator.component.scss'
})
export class PasswordGeneratorComponent {
  password = '';
  length = 12;
  uppercase = true;
  lowercase = true;
  numbers = true;
  symbols = true;
  justGenerated = false;

  constructor(
    private passwordService: PasswordGeneratorService,
    private snackBar: MatSnackBar,
  ) {
    // Generate initial password with all options selected
    this.generatePassword();
  }

  onSliderChange(event: any): void {
    // Get the value from the event (handles both direct value and target.value)
    const newValue = event.value || event.target?.value;
    if (newValue !== undefined && newValue !== null) {
      this.length = newValue;
      this.generatePassword(); // Generate new password with new length
    }
  }

  generatePassword(): void {
    this.password = this.passwordService.generate({
      length: this.length,
      uppercase: this.uppercase,
      lowercase: this.lowercase,
      numbers: this.numbers,
      symbols: this.symbols
    });
    // Trigger shimmer animation
    this.justGenerated = true;
    setTimeout(() => this.justGenerated = false, 1000);
  }

  regeneratePassword(): void {
    this.generatePassword();
  }

  copyPassword(): void {
    if (this.password) {
      navigator.clipboard.writeText(this.password);
      this.snackBar.open('Password copied to clipboard!', 'OK', {
        duration: 2000,
      });
    }
  }
}
