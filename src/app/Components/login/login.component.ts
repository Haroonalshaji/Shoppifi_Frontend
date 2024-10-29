import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) { }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z@.0-9]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
  })

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password
      console.log(email, password);

      const user = { email, password };
      this.api.login(user).subscribe({
        next: (res: any) => {
          console.log(res);
          const token = res.token;
          sessionStorage.setItem('token', token)

          Swal.fire({
            title: 'Success!',
            text: 'Login successfull',
            icon: 'success',
            confirmButtonText: 'Login'
          })
          this.router.navigateByUrl('/')
        },
        error: (err) => {
          alert("error message");
        }
      })

    } else {
      alert("Invalid Registration Form")
    }
  }

}
