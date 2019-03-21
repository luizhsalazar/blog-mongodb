import { Component } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { AppService } from './app.service';
import { User } from './shared/models/user.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	
	public user: SocialUser;
	public loggedIn: boolean = false;
	
	constructor(
		private authService: AuthService,
		private appService: AppService
		) { }
		
		ngOnInit(): void {
			this.authService.authState.subscribe((user) => {
				this.user = user;
				this.loggedIn = (user != null);
				
				this.loggedIn && this.appService.login(user.email).subscribe((response: []) => {
					if (response.length <= 0) {
						let user: User = {
							name: this.user.name,
							email: this.user.email,
							photo_url: this.user.photoUrl
						}
						this.signUpUser(user);
					}
				}
				);
			});
		}
		
		signUpUser(user: User) {
			this.appService.signUp(user)
				.subscribe(response => {
					console.log('User registered!');
				}
			);
		}
		
		signInWithGoogle(): void {
			this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
		}
		
		signOut(): void {
			this.authService.signOut();
		}
	}
	