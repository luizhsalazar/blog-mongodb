import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private url = 'http://localhost:4000/users';
    
    constructor(private http: HttpClient) { }
    
    login(email: string) {
        return this.http.get(`${this.url}/${email}`);
    }

    signUp(user: User) {
        return this.http.post(`${this.url}/signup`, user);
    }
}