import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-generate-cohort',
  templateUrl: './generate-cohort.component.html',
  styleUrls: ['./generate-cohort.component.scss']
})
export class GenerateCohortComponent implements OnInit {
  @Input() isPreview: boolean;
  constructor() { }

  ngOnInit(): void {
    console.log("generate cohort",this.isPreview);
  }

}
