import { Component, OnInit } from '@angular/core';
import { Encounter } from '../../models/encounter'
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss'],
  providers: [EncountersService]
})
export class EncountersComponent implements OnInit {

  message = 'Recent Encounters';
  encounters: Encounter[] = [];

  constructor(private encounterService: EncountersService) {

  }

  ngOnInit() {
    this.encounterService.getData()
    .subscribe((data) => {
      this.encounters = data.encounters;
    });
  }

}

// interval;
//   message = 'Recent Encounters';
//   listOfMessages = [
//     'Aloha',
//     'What\'s up',
//     'I\'m Batman'
//   ];

//   ngOnInit() {
//     this.interval = setInterval(() => {
//       let index = Math.floor(Math.random() * this.listOfMessages.length)
//       // console.log(index);
//       this.message = this.listOfMessages[index];
//       this.listOfMessages.push('New Message');
//     }, 1000);
//   }

//   stopTheMadness(e) {
//     e.preventDefault();
//     clearInterval(this.interval);
//   }

// }

//  ngOnInit() {
//     EncountersService.get(this.ENCOUNTERS_URL).then((list) => {
//       this.encounters = list;
//     });