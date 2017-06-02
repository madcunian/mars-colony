import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter'
import { EncountersService } from '../../services/encounters.service';
import { Router } from '@angular/router';
import { 
  FormGroup,
  FormControl,
  FormBuilder,
  Validators, 
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService]
})
export class EncountersComponent implements OnInit {

  message = 'Recent Encounters';
  encounters: Encounter[] = [];
  encounterForm: FormGroup;

  constructor(private router: Router, private encounterService: EncountersService) {

  }

  ngOnInit() {
    this.encounterService.getData()
    .subscribe((data) => {
      this.encounters = data.encounters;
    });
  }

  report_encounter(e) {
    e.preventDefault();
    // const id = this.encounterForm.get('id').value;
    // const atype = this.encounterForm.get('atype').value;
    // const date = new Date;
    // const action = this.encounterForm.get('action').value;
    // const colonist_id = window.localStorage.colonist_id;

    // const encounters = new Encounters(id, date, colonist_id, atype, action);
    // this.encounterService.postData(encounters)
    //                      .subscribe(newEncounter => {
                           this.router.navigate(['report']);
                        //  });
  }

}