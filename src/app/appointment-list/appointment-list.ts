import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../models/appointment';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.css',
})
export class AppointmentList implements OnInit {
  newApppointmentDescription: string = '';
  newAppointmentDate: string = '';

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointments = JSON.parse(storedAppointments);
    }
  }

  AddAppointment() {

    // Implementation for adding a new appointment
    if (!this.newApppointmentDescription || !this.newAppointmentDate) {
      return;
    }


    const newAppointment: Appointment = {
      id: this.appointments.length + 1,
      title: this.newApppointmentDescription,
      date: new Date(this.newAppointmentDate),
      time: '09:00 AM', // Default time for simplicity
      description: this.newApppointmentDescription
    };
    this.appointments.push(newAppointment);

    localStorage.setItem('appointments', JSON.stringify(this.appointments));

    this.newApppointmentDescription = '';
    this.newAppointmentDate = '';
  }

  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter(appointment => appointment.id !== id);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  appointments: Appointment[] = [
    {
      id: 1,
      title: 'Doctor Appointment',
      date: new Date(),
      time: '10:00 AM',
      description: 'Annual check-up with Dr. Smith'
    }
  ];
}