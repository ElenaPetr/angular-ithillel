import { environment } from './../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isActive = true;


  title = 'ithellel';
  cat = 'assets/imgs/cat.jpeg';

  public users = [
    {
      id: '1',
      username: 'Dima',
      desc: 'Developer',
      color: 'red',
      reiting: 1
    },
    {
      id: '2',
      username: 'Denys',
      desc: 'QA',
      color: 'green',
      reiting: 2

    },
    {
      id: '3',
      username: 'Denys 3',
      desc: 'QA3',
      color: 'green',
      reiting: 5

    }
  ]



  ngOnInit() {
    console.log(environment);

  }

  deleteItem(id: string) {
    this.users = this.users.filter((item) => item.id !== id);
  }

  updateRaiting(event: any) {
    console.log(event);

  }


  chnangeView() {
    this.isActive = !this.isActive;
  }
}
