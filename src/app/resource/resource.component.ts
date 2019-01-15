import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  specialResource: string;

  constructor(private _resourceService: ResourceService) { }

  ngOnInit() {
    this._resourceService.getResource()
    .subscribe(
      res => this.specialResource = res.resource,
      err => console.log(err)
    );
  }

}
