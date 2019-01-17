import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  specialResource: string;

  constructor(private _resourceService: ResourceService,
              private _router: Router) { }

  ngOnInit() {
    this._resourceService.getResource()
    .subscribe(
      res => this.specialResource = res.resource,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            localStorage.removeItem('token');
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

}
