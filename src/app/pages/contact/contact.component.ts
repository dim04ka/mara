import { Component } from '@angular/core';
// @ts-ignore
// import ymaps from '$GLOBAL$';

// interface Placemark {
//   geometry: number[];
//   properties: ymaps.IPlacemarkProperties;
//   options: ymaps.IPlacemarkOptions;
// }

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  // clustererOptions: ymaps.IClustererOptions = {
  //   gridSize: 32,
  //   clusterDisableClickZoom: true,
  //   preset: 'islands#greenClusterIcons',
  // };

  // placemarks: Placemark[] = [];

  // points = [[41.681992, 44.839039]];

  ngOnInit(): void {
    // this.points.forEach((geometry, index) => {
    //   this.placemarks.push({
    //     geometry,
    //     properties: {
    //       balloonContent: 'We are here',
    //       iconCaption: 'MARA candle store',
    //     },
    //     options: {
    //       preset: 'islands#blackDotIconWithCaption',
    //     },
    //   });
    // });
  }
}
