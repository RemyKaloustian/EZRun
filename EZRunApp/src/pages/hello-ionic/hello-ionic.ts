import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import {Http, URLSearchParams} from '@angular/http';

@Component({
    selector: 'page-hello-ionic',
    templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

    public _start_date;
    public _end_date;
    public _final_time;
    public _start_lat;
    public _start_lon;

    public _end_lat;
    public _end_lon;

    public _hours;
    public _minutes;
    public _seconds;
    public _geo_text;
    public _uid = "UID";
    public _button_text = "START";
    public _time_text = "Let's go baby !";

    constructor(private navCtrl: NavController,  private geolocation: Geolocation, private device: Device, private http:Http, private alertCtrl: AlertController) {


    }//constructor

    ToggleTimer()
    {
        this._uid ="UID = " + this.device.uuid;

        if(this._button_text == "START") {
            this.geolocation.getCurrentPosition().then(
                pos => {
                    this._start_lat = pos.coords.latitude;
                    this._start_lon = pos.coords.longitude;
                    this._geo_text =" Your position at the start is : " + 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;

                    this._start_date = new Date();
                    this._time_text = "Running...";
                    this._button_text = "STOP";
                },
                err => {
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: 'We were not able to retreive your GPS location.',
                        buttons: ['OK']
                    });
                    alert.present();
                });
        }
        else if(this._button_text == "STOP")
        {
            this.geolocation.getCurrentPosition().then(pos => {
                this._end_lat = pos.coords.latitude;
                this._end_lon = pos.coords.longitude;

                this._geo_text =" Your position at the end is : " + 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;

            });
            this._end_date = new Date();
            this._button_text = "START";
            this._final_time = Math.floor(Number((this._end_date.getTime()/1000)/60 - (this._start_date.getTime()/1000)/60));
            this._time_text = "You moved for "+ this._final_time + " minutes.";

            //sending request to server

            // API URL ?
            this.http
                .post('http://localhost:8080/', {
                    walkTime: this._final_time,
                    startPosition: this._start_lat +","+this._start_lon,
                    endPosition: this._end_lat +","+this._end_lon
                })
                .subscribe(
                    data => {
                        console.table(data.json());
                        let alert = this.alertCtrl.create({
                            title: 'Run',
                            subTitle: "You ran about "+ data.json().walkTime +" seconds.",
                            buttons: ['Amazing!']
                        });
                        alert.present();
                    },
                    error => {
                        console.log(JSON.stringify(error.json()));
                    });
        }
    }//ToggleTimer()

}//HelloIonicPage
