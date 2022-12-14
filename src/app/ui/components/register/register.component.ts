import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompconfigbaseComponent } from 'src/app/compconfigbase/compconfigbase.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends CompconfigbaseComponent implements OnInit {

  constructor(private formBuilder: UntypedFormBuilder,private toastrService: CustomToastrService, spinner: NgxSpinnerService,private router:Router, private userService: UserService) {
    super(spinner)
  }

  frm: UntypedFormGroup;
  
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      passwordConfirm: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("passwordConfirm").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;

  async onSubmit(user: User) {
    this.submitted = true;

    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(user);
    if (result.succeeded){
      this.toastrService.message(result.message, "Kullan??c?? Kayd?? Ba??ar??l??", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
      this.router.navigate([""]);
    }
    else
      this.toastrService.message(result.message, "Hata", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
  }

}
