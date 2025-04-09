import { CanDeactivateFn } from '@angular/router';
import { MembersEditComponent } from '../memebers/members-edit/members-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MembersEditComponent> = (component) => {
  if(component.editForm?.dirty){
    return confirm("Hola amigo, que?");
  }
  return true;
};
