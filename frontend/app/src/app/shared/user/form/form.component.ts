import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { MessageService } from 'primeng/api';

import { IUser } from 'shared/user/user';
import { UserService } from 'shared/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './form.component.html',
})
export class UserFormComponent implements OnChanges {
  @Input() user: IUser;

  public form: FormGroup;

  constructor(private messageService: MessageService, private userService: UserService) {}

  ngOnChanges() {
    this.form = this.buildForm(this.user);
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({ profile_pic: file });
      this.form.get('profile_pic').markAsDirty();
      this.form.get('profile_pic').markAsTouched();
    }
  }

  public save() {
    if (this.form.valid) {
      const updatedUser: IUser = { ...this.user, ...this.form.value };

      const formData = new FormData();
      for (const key in updatedUser) {
        // dont send profile pic if we have not changed it
        if (key != 'profile_pic' || !this.form.get('profile_pic').pristine) {
          formData.append(key, updatedUser[key]);
        }
      }

      // TODO: We need to change the type of user id from string to number
      this.userService.saveUser(Number(this.user.id), formData).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
        location.reload();
      });
    }
  }

  private buildForm(user: IUser): FormGroup {
    return new FormGroup({
      profile_pic: new FormControl<string>(user?.profile_pic || null),
      first_name: new FormControl<string>(user?.first_name || null, Validators.required),
    });
  }
}
