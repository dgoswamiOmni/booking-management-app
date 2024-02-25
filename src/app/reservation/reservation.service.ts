import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = [];

  //constructor
  constructor(){
    let savedReservations = localStorage.getItem('reservations');
      this.reservations = savedReservations? JSON.parse(savedReservations): [];

  }

  //CRUD

  getReservations(){
    return this.reservations;
  }
  //search reservation by id
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }
  addReservation(reservation: Reservation): void{
    reservation.id =  Date.now().toString();
    this.reservations.push(reservation);
    console.log(this.reservations);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }
  //delete a reservation by id
  deleteReservation(id: String): void{
    let index = this.reservations.findIndex(res => res.id === res.id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }
  //update a reservation
  updateReservation(id:string, updatedReservation: Reservation): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));

  }


}
