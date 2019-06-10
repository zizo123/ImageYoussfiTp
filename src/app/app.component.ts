import {Component} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  motCle = '';
  images: any;
  pageSize = 5;
  currentPage = 1;
  totalPages: number;
  pages: Array<number> = [];
  mode = 'LIST';
  currentImage = null;
  host = 'https://pixabay.com/api/?key=5832566-81dc7429a63c86e3b707d0429&q=';

  getImages() {
    // tslint:disable-next-line:max-line-length
    this.http.get(this.host + this.motCle + ' &per_page=' + this.pageSize + ' &page=' + this.currentPage)
      .subscribe(data => {
        console.log(data);
        this.images = data;
        this.totalPages = this.images.totalHits / this.pageSize;
        if (this.images.totalHits % this.pageSize !== 0) {
          this.totalPages += 1;
        }
        this.pages = new Array(this.totalPages);
      });
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.getImages();
  }

  detailImage(im) {
    this.mode = 'DETAIL';
    this.currentImage = im;
  }

  constructor(private http: HttpClient) {}
}
