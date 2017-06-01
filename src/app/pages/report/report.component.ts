import { Component, OnInit } from '@angular/core';
import { Alien } from '../../models/alien';
import { AliensService } from '../../services/alien.service';

import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [AliensService, ReportService]
})
export class ReportComponent implements OnInit {

  aliens: Alien[] = [];
  reportAtype: string;
  reportDate: string;
  reportAction: string;
  reportColonistId: string = "no alien";
  report: Report;

  constructor(private alienService: AliensService, private reportService: ReportService) {

  }

  ngOnInit() {
    this.alienService.getData()
    .subscribe((data) => {
      this.aliens = data.aliens;
    })
  }

  postReport() {
    const report = new Report(this.reportAtype, this.reportDate, this.reportAction, this.reportColonistId);
    this.reportService.postData(report)
                      .subscribe((newReport) => {
    });
  }


}
