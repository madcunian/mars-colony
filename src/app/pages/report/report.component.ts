import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AliensService } from '../../services/alien.service';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[];
  report: Report;
  reportForm: FormGroup;
  NO_ALIEN_SELECTED = '(none)';

  constructor(
    private router: Router,
    private alienService: AliensService,
    private reportService: ReportService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.alienService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
    });

    this.reportForm = new FormGroup({
      action: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      atype: new FormControl(
        this.NO_ALIEN_SELECTED,
        [Validators.required])
    })
  }

  reported(e) {
    e.preventDefault();
    if (this.reportForm.invalid) {

    } else {
      const atype = this.reportForm.get('atype').value;
      const date = new Date;
      const prettyDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      const action = this.reportForm.get('action').value;
      const colonist_id = window.localStorage.colonist_id;

      const report = new Report(atype, prettyDate, action, colonist_id);
      this.reportService.postData(report)
                        .subscribe((newReport) => {
                          window.localStorage.setItem('action',
                          newReport.report);
                          this.router.navigate(['encounters']);
      });
    }
  }

}
