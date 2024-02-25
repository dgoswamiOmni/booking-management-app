import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://localhost:3002"
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {
  }

  //constructor
  // constructor(){
  //   let savedReservations = localStorage.getItem('reservations');
  //     this.reservations = savedReservations? JSON.parse(savedReservations): [];
  //
  // }

  //CRUD

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl+ "/reservations");
  }
  //search reservation by id
  getReservation(id: string): Observable<Reservation>{
    return this.http.get<Reservation>(this.apiUrl+ "/reservation/" +id);
  }
  addReservation(reservation: Reservation): Observable<void>{
    return this.http.post<void>(this.apiUrl+ "/reservation/" , reservation);
    // reservation.id =  Date.now().toString();
    // this.reservations.push(reservation);
    // console.log(this.reservations);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }
  //delete a reservation by id
  deleteReservation(id: String): Observable<void>{

    return this.http.delete<void>(this.apiUrl+ "/reservation/" +id);

    // let index = this.reservations.findIndex(res => res.id === res.id);
    // this.reservations.splice(index, 1);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }
  //update a reservation
  updateReservation(id:string, updatedReservation: Reservation): Observable<void>{

    return this.http.put<void>(this.apiUrl + "/reservation/" + id, updatedReservation)


    //
    // let index = this.reservations.findIndex(res => res.id === id);
    // this.reservations[index] = updatedReservation;
    // // localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }


}
