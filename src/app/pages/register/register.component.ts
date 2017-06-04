import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/job.service';
import { Colonist } from '../../models/colonist';
import { ColonistService } from '../../services/colonist.service';
import { Router } from '@angular/router';
import { 
  FormGroup,
  FormControl,
  FormBuilder,
  Validators, 
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

const cantBe = (value: string): ValidatorFn => {
  return (control: AbstractControl) => {
    return control.value === value ? { 'Can\'t be this value': value } : null;
  };
};

const age = (tooYoung: number, tooOld: number): ValidatorFn => {
  return (control: AbstractControl) => {
    if (tooYoung < 0 || tooOld < 0) {
      throw new Error('You can\'t be negative age...');
    }
    return control.value < 0 || control.value < tooYoung || control.value > tooOld ? 
      { 'You\'re not the right age to go to Mars': age } : null;
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [JobsService, ColonistService]
})
export class RegisterComponent implements OnInit {

  jobs: Job[];
  colonist: Colonist;
  registerForm: FormGroup;
  NO_JOB_SELECTED = '(none)';

  constructor(
    private router: Router,
    private jobService: JobsService,
    private colonistService: ColonistService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.jobService.getData()
        .subscribe((data) => {
          this.jobs = data.jobs;
        });

    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3)
      ]),
      age: new FormControl('', [Validators.required, age(16, 65)]),
      job_id: new FormControl(this.NO_JOB_SELECTED, [cantBe(this.NO_JOB_SELECTED)])
    })
  }

  register(e) {
    e.preventDefault();
    if (this.registerForm.invalid) {
      // the form is invalid
    } else {
      const name = this.registerForm.get('name').value;
      const age = this.registerForm.get('age').value;
      const job_id = this.registerForm.get('job_id').value;

      const colonist = new Colonist(name, age, job_id);
      this.colonistService.postData(colonist)
                          .subscribe(newColonist => {
                            window.localStorage.setItem('colonist_id', newColonist.colonist.id);
                            this.router.navigate(['encounters']);
                          });
    }
  }
}
