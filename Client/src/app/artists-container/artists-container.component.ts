import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artists-container',
  templateUrl: './artists-container.component.html',
})
export class ArtistsContainerComponent implements OnInit {
  artists: Artist[] = [];
  constructor(private service: ArtistService) {}

  ngOnInit() {
    const pagingQueryString = '?pageSize=12&page=1';
    this.service.getAll(pagingQueryString).subscribe((response) => {
      this.artists = response;
    });
  }
}
