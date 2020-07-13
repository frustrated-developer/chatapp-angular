import { LocalStorageService } from './../services/local-storage.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
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
            username: ['', [Validators.required, Validators.maxLength(6)]],
            password: ['', [Validators.required]],
        });
    }
    setSignupFormControl() {
        this.signupForm = this.formBuilder.group({
            firstname: ['', [Validators.required]],
            lastname: ['', []],
            username: ['', [Validators.required, Validators.maxLength(6)]],
            password: ['', [Validators.required]],
        });
    }


    login() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe((result: any) => {
                if (result[0].status) {
                    if (result[0].data.password === btoa(this.loginForm.value.password)) {
                        this.localStorageService.setItem('token', btoa(result[0].data.username));
                        this.localStorageService.setItem('user', result[0].data);
                        this.router.navigate(['chat']);
                    } else {
                        alert('Your password is incorrect');
                    }
                } else {
                    alert('User Does not exists');
                }
            });
        }
    }

    signup() {
        if (this.signupForm.valid) {
            this.signupForm.value.password = btoa(this.signupForm.value.password);
            this.authService.singup(this.signupForm.value).then((snapshot: any) => {
                if (snapshot.exists()) {
                    alert ('username is taken');
                } else {
                    this.authService.insertUser(this.signupForm.value).then((result) => {
                        alert('success');
                        this.isLogin = true;
                    }).catch((err) => {
                        alert('there mihgt be some error');
                    });
                }
            });
        }
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




}
