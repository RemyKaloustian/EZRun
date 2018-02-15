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
    public _udid = '5468298290002';
    public _button_text = "START";
    public _time_text = "Let's go baby !";


    //Added after moving to branch demo

    public _page_title = 'EZRun version 1.0'
    public _result_title = '';
    public _difficulties = ['easy 👌', 'medium 💪', 'hard 🙏'];
    public _v2results = [];
    public _on_stats = false;
    public _v1_stats = [];


    // Cette URL (172.20.10.3 ou localhost ou autre) doit etre
    // la même dans le script de lancement de l'API !!
    public _api_url = "http://10.212.97.188:8080/";

    public difficulty = null;
    public error = false;
    public errorMsg = "";
    public numberOfRuns = null;

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
        //this._udid = this.device.uuid;
        this._udid = "1234567890";

        if(this._button_text == "START") {
            this.geolocation.getCurrentPosition().then(
                pos => {
                    this._start_lat = pos.coords.latitude;
                    this._start_lon = pos.coords.longitude;

                    this._start_date = new Date();
                    this._time_text = "Running...";
                    this._button_text = "STOP";
                    this.difficulty = null;
                    this._result_title = '';
                    this._v2results = [];
                },
                err => {
                    this.alert('Error', 'We were not able to retreive your GPS location.', ['OK']);
                    console.log(err);
                });
        }
        else if(this._button_text == "STOP")
        {
            this._geo_text = this._button_text = "Loading...";

            this.geolocation.getCurrentPosition().then(pos => {
                this._end_lat = pos.coords.latitude;
                this._end_lon = pos.coords.longitude;

                this._geo_text =" Your position at the end is : " + 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;

                this._end_date = new Date();
                this._button_text = "START";
                this._final_time = this._end_date.getTime() - this._start_date.getTime();
                this._time_text = "You moved for "+ this.getFinalTimeInMinutes() + " minute(s)";
                this._time_text += (this.getFinalTimeInSeconds() !== 0) ? " and "+ this.getFinalTimeInSeconds() +" second(s)." : ".";
                this.ShowResults();
            });
        }
    }//ToggleTimer()

    ShowResults()
    {
        if(this._page_title.indexOf('1') > -1)
        {
            this._result_title = 'Based on your previous runs, this one is :';
            this.difficulty = this.GetDifficulty();
        }
        else    
        {
            this._result_title = 'Here is your run broken down:';

            this._v2results = this.GetV2Results() ;
        }       
    }

    GetDifficulty() //
    {
        return this._difficulties[Math.floor(Math.random() * (this._difficulties.length - 0) + 0)];
    }

    GetV2Results() //Simulation of results we'd get for a same run analysis, breaking sections of the run in difficulty
    {
        let results = [];
        let resultsNb = Math.floor(Math.random() * (8 - 4) + 4)

        for (let index = 0; index < resultsNb; index++) 
        {
            //Pushing a random time and random difficulty
            results.push(
                {
                    time:Math.floor(Math.random() * (10 - 5) + 5),
                    difficulty: this.GetDifficulty()
                });
            
        }
        return results;
    }

    ToV1() //Displaying V1
    {
        this._page_title = 'EZRun version 1.0';   
        this.Initialize();     
    }

    ToV2()//Displaying V2
    {
        this._page_title = 'EZRun version 2.0';
        this.Initialize();
    }

    ChangeVersion() //When clicked the navbar
    {
        console.log("CHanging version");
        if(this._page_title.indexOf('1') > -1)
        {
            this.ToV2();
        }
        else
        {
            this.ToV1();
        }
    }

    Initialize() //Resetting variables, so that the version displayed is cleaned of the old values
    {
        this._time_text = 'Let\'s go baby !';
        this._result_title = '';
        this.difficulty = '';
        this._v2results = [];
        this._start_lat = '';
        this._start_lon = '';
        this._end_lat = '';
        this._end_lon = '';
    }

    GetVersion()
    {
        if(this._page_title.indexOf('1') > -1)
            return 1;
        else
            return 2;
    }

    ShowStats()
    {
        if(this.GetVersion() == 1)
        {
            console.log("Showing V1 sats");
            this._on_stats = true;
            this._v1_stats =[ {date:'3/02/2018', duration:'16', difficulty: this._difficulties[0]},
            {date:'6/02/2018', duration:'55', difficulty: this._difficulties[2]},
            {date:'10/02/2018', duration:'8', difficulty: this._difficulties[0]},
            {date:'12/02/2018', duration:'34', difficulty: this._difficulties[1]},
            {date:'16/02/2018', duration:'40', difficulty: this._difficulties[2]},
            ];
        }
        else
        {
            console.log("Showing V2 sats");   
            this._on_stats = true;         
        }
    }

    QuitStats()
    {
        this._on_stats = false;
    }

}//HelloIonicPage
