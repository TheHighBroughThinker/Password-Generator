import { Component } from '@angular/core';
import { PasswordGeneratorComponent } from './components/password-generator/password-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PasswordGeneratorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Password Generator';
}
