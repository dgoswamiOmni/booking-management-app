import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }


  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', [Validators.required]],
      checkOutDate: ['', [Validators.required]],
      guestName: ['', [Validators.required]],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required]]

  })
  // get the id from the route
  let id = this.activatedRoute.snapshot.paramMap.get('id');

  if (id){
    this.reservationService.getReservation(id).subscribe(reservation=> {
      if(reservation){
        // patching the value from a reservation object if we have a reservation
        this.reservationForm.patchValue(reservation);
      }
    });

  }
}


  onSubmit() {
    if (this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        if(id){
        this.reservationService.updateReservation(id ,reservation).subscribe(()=>{
          console.log('reservation update processed')
        });}
      }
      else{
        //add a new reservation
        this.reservationService.addReservation(reservation).subscribe(()=> {
          console.log("reservation add processed")
        });

      }
      //route user to list component after adding a reservation
      this.router.navigate(['/list']);
  }
}
}

