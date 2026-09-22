import { Component } from '@angular/core';
import { NavbarComponent } from "../../general/navbar/navbar.component";
import { FooterComponent } from "../../general/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layaout',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './auth-layaout.component.html',
  styleUrl: './auth-layaout.component.css'
})
export class AuthLayaoutComponent {

}
