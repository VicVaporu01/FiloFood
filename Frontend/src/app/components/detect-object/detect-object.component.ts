import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detect-object',
  templateUrl: './detect-object.component.html',
  styleUrls: ['./detect-object.component.css'],
})
export class DetectObjectComponent implements OnInit {
  logged: boolean = false;
  user:any;
  pet:any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (localStorage.getItem('logged') === '1') {
      this.logged = true;
    }
    this.userService.getUserInfo().subscribe(
      (res) => {
        this.user=res;
        this.pet=this.user.pet;
        console.log(this.pet);
      },
      (error) => console.log(error)
    );
  }
}
