import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRIORITY, REPORTER, STATUS } from '../app.constants';
import {Router} from "@angular/router";
import { BugService } from '../bug.service';
import { Subscription } from 'rxjs';

interface Option {
  value: number,
  name: string
}

@Component({
  selector: 'app-bug-new',
  templateUrl: './bug-new.component.html',
  styleUrls: ['./bug-new.component.scss']
})
export class BugNewComponent implements OnInit, OnDestroy{

  bugForm!: FormGroup;

  priorityOptions : Option[] = [
      {value: 0, name: PRIORITY.MINOR },
      {value: 1, name: PRIORITY.MAJOR },
      {value: 2, name: PRIORITY.CRITICAL },
];

  reporterOptions : REPORTER[] = Object.values(REPORTER);

  statusOptions : STATUS[] = Object.values(STATUS);

  subscription : Subscription = new Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private bugService: BugService) { 

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() : void {
    this.bugForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: ["", [Validators.required]],
      reporter: ["", [Validators.required]],
      status: [""]
    });

    this.subscription = this.bugForm.controls['reporter'].valueChanges.subscribe({
      next: (value) => {
        if (value == REPORTER.QA) {
          this.bugForm.controls['status'].addValidators(Validators.required);
        } else {
          this.bugForm.controls['status'].removeValidators(Validators.required);
        }
        this.bugForm.controls['status'].updateValueAndValidity();
    }
  });

  }

  get title() {
    return this.bugForm.get('title');
  }

  get description() {
    return this.bugForm.get('description');
  }

  get priority() {
    return this.bugForm.get('priority');
  }

  get reporter() {
    return this.bugForm.get('reporter');
  }

  get status() {
    return this.bugForm.get('status');
  }

  addBug() {
    this.bugService.create(this.bugForm.value).subscribe({
      next: () => {
        console.log("Bug submitted!");
        this.router.navigate(["/"]);
      },
      error:(error) => {
        console.log(error);
      }
  });

  }

  isMandatory(control: string) {
    return this.bugForm.get(control)?.hasValidator(Validators.required);
  }

}
