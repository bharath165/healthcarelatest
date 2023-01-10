import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName = '';
  isAdmin = false;
  isProblemBtnClick = false;
  isIdeathonBtnClick = false;
  isExperimentBtnClick = false;
  isInnovationBtnClick = false;
  isMyInitiativeBtnClick = false;
  @Output()
  myInitiativesTab = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
  }

  goToActiveProblems() {
    this.router.navigate(['']);
  }

  goToProblemArea() {
    this.router.navigate(['']);
  }

  goToIdeathons() {
    this.router.navigate(['analytics']);
  }

  goToExperiments() {
    this.router.navigate(['ourdata-methodology']);
  }

  goToAdmin() {
    this.router.navigate(['/admin-member']);
  }

  goToMyinitiatives(option) {
    localStorage.setItem('myInitiativeClicked', option);
    this.myInitiativesTab.emit(option);
    this.router.navigate(['/my-initiatives']);
  }

  goToInnovationAssurance() {
    this.router.navigate(['/innovation-assurance']);
  }

  comingSoon() {
    this.router.navigate(['/coming-soon']);
  }

  problemMappingClick() {
    this.isProblemBtnClick = !this.isProblemBtnClick;
    this.isIdeathonBtnClick = false;
    this.isExperimentBtnClick = false;
    this.isMyInitiativeBtnClick = false;
    this.isInnovationBtnClick = false;
  }

  ideathonClick() {
    this.isIdeathonBtnClick = !this.isIdeathonBtnClick;
    this.isProblemBtnClick = false;
    this.isExperimentBtnClick = false;
    this.isInnovationBtnClick = false;
    this.isMyInitiativeBtnClick = false;
  }

  experimentClick() {
    this.isExperimentBtnClick = !this.isExperimentBtnClick;
    this.isProblemBtnClick = false;
    this.isIdeathonBtnClick = false;
    this.isInnovationBtnClick = false;
    this.isMyInitiativeBtnClick = false;
  }

  innovationClick() {
    this.isInnovationBtnClick = !this.isInnovationBtnClick;
    this.isProblemBtnClick = false;
    this.isIdeathonBtnClick = false;
    this.isExperimentBtnClick = false;
    this.isMyInitiativeBtnClick = false;
  }

  myInitiativeClick() {
    this.isMyInitiativeBtnClick = !this.isMyInitiativeBtnClick;
    this.isProblemBtnClick = false;
    this.isIdeathonBtnClick = false;
    this.isExperimentBtnClick = false;
    this.isInnovationBtnClick = false;
  }

  closeAlert() {
    this.isProblemBtnClick = false;
    this.isIdeathonBtnClick = false;
    this.isExperimentBtnClick = false;
    this.isInnovationBtnClick = false;
    this.isMyInitiativeBtnClick = false;
  }

}
