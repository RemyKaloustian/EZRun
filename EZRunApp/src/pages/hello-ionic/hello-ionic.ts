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
    public _api_url = "http://172.20.10.3:8080/";

    public difficulty = null;
    public error = false;

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

    /**
     * Convert the final time in minutes from milliseconds.
     *
     * @returns {number}
     *          The final time in minutes
     */
    public getFinalTimeInMinutes() {
        return Math.floor(this.getFinalTimeInSeconds()/60);
    }

    /**
     * Convert the final time in seconds from milliseconds.
     *
     * @returns {number}
     *          The final time in seconds
     */
    public getFinalTimeInSeconds() {
        return Math.floor(this._final_time/1000);
    }

    ToggleTimer() {
        this._udid = this.device.uuid;
        this._udid = "1234567890";

        // this.http
        //     .post(this._api_url, {
        //         walkTime        : "1800",
        //         startPosition   : "1.45343434,2",
        //         endPosition     : "1.45343434,2",
        //         udid            : "1234"
        //     })
        //     .subscribe(
        //         data => {
        //             this.difficulty = data.json().level;
        //             console.table(data.json());
        //         },
        //         error => {
        //             this.alert('Error', JSON.stringify(error.json()), ['OK']);
        //             console.log(JSON.stringify(error.json()));
        //         });

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
            this._final_time = this._end_date.getTime() - this._start_date.getTime();
            this._time_text = "You moved for "+ this.getFinalTimeInMinutes() + " minutes";
            this._time_text += (this.getFinalTimeInSeconds() !== 0) ? " and "+ this.getFinalTimeInSeconds() +" seconds." : ".";

            //sending request to server

            // API URL ?
            this.http
                .post(this._api_url, {
                    walkTime        : this.getFinalTimeInSeconds(),
                    startPosition   : this._start_lat +","+this._start_lon,
                    endPosition     : this._end_lat +","+this._end_lon,
                    udid            : this._udid
                })
                .subscribe(
                    data => {
                        this.difficulty = data.json().level;
                        this.error = false;
                        console.table(data.json());
                    },
                    error => {
                        this.alert('Error', 'm An error occured while trying to communicate with the server.', ['Damn it!']);
                        this.error = true;
                        this._final_time = JSON.stringify(error.json());
                        console.log(JSON.stringify(error.json()));
                    });
        }
    }//ToggleTimer()

}//HelloIonicPage
