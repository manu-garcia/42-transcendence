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
  selectedFile: File | null = null;

  constructor(private messageService: MessageService, private userService: UserService) {}

  ngOnChanges() {
    this.form = this.buildForm(this.user);
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const file = event.target.files[0];
      this.form.patchValue({ profilePic: file });
      this.form.get('profilePic').markAsDirty();
      this.form.get('profilePic').markAsTouched();
    } else {
      this.selectedFile = null;
    }
  }

  public save() {
    if (this.form.valid) {
      const updatedUser: IUser = { ...this.user, ...this.form.value };

      const formData = new FormData();
      formData.append('id', this.user.id.toLocaleString());
      formData.append('firstName', updatedUser.firstName);

      // dont send profile pic if we have not changed it
      if (!this.form.get('profilePic').pristine) {
        formData.append('profilePic', updatedUser.profilePic);
      }

      // TODO: We need to change the type of user id from string to number
      this.userService.saveUserFormData(this.user.id, formData).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
        location.reload();
      });
    }
  }

  private buildForm(user: IUser): FormGroup {
    return new FormGroup({
      profilePic: new FormControl<string>(user?.profilePic || null),
      firstName: new FormControl<string>(user?.firstName || null, Validators.required),
    });
  }
}
