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
    public _udid = null;
    public _button_text = "START";
    public _time_text = "Let's go baby !";

    // Cette URL (172.20.10.3 ou localhost ou autre) doit etre
    // la même dans le script de lancement de l'API !!
    public _api_url = "http://localhost:8080/";

    constructor(private navCtrl: NavController,  private geolocation: Geolocation, private device: Device, private http:Http, private alertCtrl: AlertController)
        { }

    public alert(title: string, msg: string, btn: [string]) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: btn
        });
        alert.present();
    }

    ToggleTimer() {
        this._udid = this.device.uuid;
        this._udid = "1234567890";

        this.http
            .post(this._api_url, {
                walkTime        : this._final_time,
                startPosition   : this._start_lat +","+this._start_lon,
                endPosition     : this._end_lat +","+this._end_lon,
                udid            : this._udid
            })
            .subscribe(
                data => {
                    this.alert('Run', "You ran about "+ data.json().walkTime +" seconds.", ['Amazing!']);
                    console.table(data.json());
                },
                error => {
                    this.alert('Error', JSON.stringify(error.json()), ['OK']);
                    console.log(JSON.stringify(error.json()));
                });

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
                    this.alert('Error', 'We were not able to retreive your GPS location.', ['OK']);
                    console.log(err);
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
                .post(this._api_url, {
                    walkTime        : this._final_time,
                    startPosition   : this._start_lat +","+this._start_lon,
                    endPosition     : this._end_lat +","+this._end_lon,
                    udid            : this._udid
                })
                .subscribe(
                    data => {
                        this.alert('Run', "You ran about "+ data.json().walkTime +" seconds.", ['Amazing!']);
                        console.table(data.json());
                    },
                    error => {
                        this.alert('Error', JSON.stringify(error.json()), ['OK']);
                        console.log(JSON.stringify(error.json()));
                    });
        }
    }//ToggleTimer()

}//HelloIonicPage
