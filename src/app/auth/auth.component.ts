import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    // var
    isLogin = true;
    submitted = false;
    loginForm: FormGroup;
    signupForm: FormGroup;
    isProgress = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.checkIsLogin();
        this.setLoginFormControl();
        this.setSignupFormControl();
    }
    get fS() {
        return this.signupForm.controls;
    }
    get fL() {
        return this.loginForm.controls;
    }

    setLoginFormControl() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(8)]],
            password: ['', [Validators.required]],
        });
    }
    setSignupFormControl() {
        this.signupForm = this.formBuilder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', []],
            username: ['', [Validators.required, Validators.maxLength(8)]],
            password: ['', [Validators.required]],
        });
    }


    login() {
        if (this.loginForm.valid) {
            this.isProgress = true;
            this.authService.login(this.loginForm.value).subscribe((result: any) => {
                this.isProgress = false;
                if (result.size === 0) {
                    alert('User Does not exists.');
                } else {
                    this.processLogin(result);
                }
            });
        }
    }

    signup() {
        if (this.signupForm.valid) {
            this.isProgress = true;
            this.signupForm.value.password = btoa(this.signupForm.value.password);
            this.authService.singup(this.signupForm.value).subscribe((response) => {
                this.isProgress = false;
                if (response.size === 0) {
                    this.addNewUser();
                } else {
                   this.processSignup(response);
                }
            });
        }
    }


    processLogin(result) {
        result.forEach(doc => {
            this.isProgress = false;
            if (doc.exists) {
                const data: any = doc.data();
                data.docId = doc.id;
                if (data.password === btoa(this.loginForm.value.password)) {
                    this.localStorageService.setItem('token', btoa(doc.id));
                    this.localStorageService.setItem('user', data);
                    this.router.navigate(['chat']);
                } else {
                    alert('Your password is incorrect');
                }
            } else {
                alert('User Does not exists');
            }
        });
    }

    processSignup(response) {
        response.forEach(doc => {
            this.isProgress = false;
            if (doc.exists) {
                alert ('username is taken');
            } else {
                this.addNewUser();
            }
        });
    }

    toggleLogin() {
        this.isLogin = !this.isLogin;
        this.submitted = false;
        this.resetForms();
    }

    resetForms() {
        this.loginForm.reset();
        this.signupForm.reset();
    }


    addNewUser() {
        this.authService.insertUser(this.signupForm.value).then((result) => {
            alert('success');
            this.isLogin = true;
        }).catch((err) => {
            alert('there mihgt be some error');
        });
    }


    checkIsLogin() {
        const token = this.localStorageService.getItem('token');
        if (token !== null) {
            this.router.navigate(['chat']);
        }
    }

}
