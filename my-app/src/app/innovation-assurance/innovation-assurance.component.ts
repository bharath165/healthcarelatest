import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-innovation-assurance',
  templateUrl: './innovation-assurance.component.html',
  styleUrls: ['./innovation-assurance.component.scss']
})
export class InnovationAssuranceComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }


  goToHexa1() {
    this.router.navigate(['analytics']);
  }

  goToHexa2() {
    this.router.navigate(['analytics']);
  }

  goToHexa3() {
    this.router.navigate(['analytics']);
  }

  goToHexa4() {
    this.router.navigate(['analytics']);
  }

  goToHexa5() {
    this.router.navigate(['analytics']);
  }

  goToHexa6() {
    this.router.navigate(['cohort-builder']);
  }

  goToHexa7() {
    this.router.navigate(['analytics']);
  }

  goToHexa8() {
    this.router.navigate(['analytics-live']);
  }

  goToHexa9() {
    this.router.navigate(['analytics']);
  }

  goToHexa10() {
    this.router.navigate(['analytics']);
  }

  goToHexa11() {
    this.router.navigate(['analytics']);
  }

  goToHexa12() {
    this.router.navigate(['analytics']);
  }

  goToHexa13() {
    this.router.navigate(['analytics']);
  }

  goToHexa14() {
    this.router.navigate(['analytics']);
  }
}
