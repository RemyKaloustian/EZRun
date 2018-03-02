webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelloIonicPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HelloIonicPage = (function () {
    function HelloIonicPage(navCtrl, geolocation, device, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.device = device;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this._udid = '5468298290002';
        this._button_text = "START";
        this._time_text = "Let's go baby !";
        //Added after moving to branch demo
        this._page_title = 'EZRun version 1.0';
        this._result_title = '';
        this._difficulties = ['easy 👌', 'medium 💪', 'hard 🙏'];
        this._v2results = [];
        this._on_stats = false;
        this._on_v1stats = false;
        this._on_v2stats = false;
        this._v1_stats = [];
        this._v2_stats = [];
        // Cette URL (172.20.10.3 ou localhost ou autre) doit etre
        // la même dans le script de lancement de l'API !!
        this._api_url = "http://10.212.97.188:8080/";
        this.difficulty = null;
        this.error = false;
        this.errorMsg = "";
        this.numberOfRuns = null;
    }
    HelloIonicPage.prototype.alert = function (title, msg, btn) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: btn
        });
        alert.present();
    };
    /**
     * Convert the final time in minutes from milliseconds.
     *
     * @returns {number}
     *          The final time in minutes
     */
    HelloIonicPage.prototype.getFinalTimeInMinutes = function () {
        return Math.floor(this.getFinalTimeInSeconds() / 60);
    };
    /**
     * Convert the final time in seconds from milliseconds.
     *
     * @returns {number}
     *          The final time in seconds
     */
    HelloIonicPage.prototype.getFinalTimeInSeconds = function () {
        return Math.floor(this._final_time / 1000);
    };
    HelloIonicPage.prototype.ToggleTimer = function () {
        //this._udid = this.device.uuid;
        //this._udid = "1234567890";
        var _this = this;
        if (this._button_text == "START") {
            this.geolocation.getCurrentPosition().then(function (pos) {
                _this._start_lat = pos.coords.latitude;
                _this._start_lon = pos.coords.longitude;
                _this._start_date = new Date();
                _this._time_text = "Running...";
                _this._button_text = "STOP";
                _this.difficulty = null;
                _this._result_title = '';
                _this._v2results = [];
            }, function (err) {
                _this.alert('Error', 'We were not able to retreive your GPS location.', ['OK']);
                console.log(err);
            });
        }
        else if (this._button_text == "STOP") {
            this._geo_text = this._button_text = "Loading...";
            this.geolocation.getCurrentPosition().then(function (pos) {
                _this._end_lat = pos.coords.latitude;
                _this._end_lon = pos.coords.longitude;
                _this._geo_text = " Your position at the end is : " + 'lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude;
                _this._end_date = new Date();
                _this._button_text = "START";
                _this._final_time = _this._end_date.getTime() - _this._start_date.getTime();
                _this._time_text = "You moved for " + _this.getFinalTimeInMinutes() + " minute(s)";
                _this._time_text += (_this.getFinalTimeInSeconds() !== 0) ? " and " + _this.getFinalTimeInSeconds() + " second(s)." : ".";
                _this.ShowResults();
            });
        }
    }; //ToggleTimer()
    HelloIonicPage.prototype.ShowResults = function () {
        if (this._page_title.indexOf('1') > -1) {
            this._result_title = 'Based on your previous runs, this one is :';
            this.difficulty = this.GetDifficulty();
        }
        else {
            this._result_title = 'Here is your run broken down:';
            this._v2results = this.GetV2Results();
        }
    };
    HelloIonicPage.prototype.GetDifficulty = function () {
        return this._difficulties[Math.floor(Math.random() * (this._difficulties.length - 0) + 0)];
    };
    HelloIonicPage.prototype.GetV2Results = function () {
        var results = [];
        var resultsNb = Math.floor(Math.random() * (8 - 4) + 4);
        var times = ['3', '6', '9'];
        for (var index = 0; index < resultsNb; index++) {
            //Pushing a random time and random difficulty
            results.push({
                time: times[Math.floor(Math.random() * (times.length - 0) + 0)],
                difficulty: this.GetDifficulty()
            });
        }
        return results;
    };
    HelloIonicPage.prototype.ToV1 = function () {
        this._page_title = 'EZRun version 1.0';
        this.Initialize();
    };
    HelloIonicPage.prototype.ToV2 = function () {
        this._page_title = 'EZRun version 2.0';
        this.Initialize();
    };
    HelloIonicPage.prototype.ChangeVersion = function () {
        console.log("CHanging version");
        if (this._page_title.indexOf('1') > -1) {
            this.ToV2();
        }
        else {
            this.ToV1();
        }
    };
    HelloIonicPage.prototype.Initialize = function () {
        this._time_text = 'Let\'s go baby !';
        this._result_title = '';
        this.difficulty = '';
        this._v2results = [];
        this._start_lat = '';
        this._start_lon = '';
        this._end_lat = '';
        this._end_lon = '';
    };
    HelloIonicPage.prototype.GetVersion = function () {
        if (this._page_title.indexOf('1') > -1)
            return 1;
        else
            return 2;
    };
    HelloIonicPage.prototype.ShowStats = function () {
        if (this.GetVersion() == 1) {
            console.log("Showing V1 sats");
            this._on_stats = true;
            this._on_v1stats = true;
            this._v1_stats = [{ date: '3/02/2018', duration: '16', difficulty: this._difficulties[0] },
                { date: '6/02/2018', duration: '55', difficulty: this._difficulties[2] },
                { date: '10/02/2018', duration: '8', difficulty: this._difficulties[0] },
                { date: '12/02/2018', duration: '34', difficulty: this._difficulties[1] },
                { date: '16/02/2018', duration: '40', difficulty: this._difficulties[2] },
            ];
        }
        else {
            console.log("Showing V2 sats");
            this._on_stats = true;
            this._on_v2stats = true;
            this._v2_stats = [
                { date: '7/02/2018', fragments: [
                        { duration: '15', difficulty: this._difficulties[1] },
                        { duration: '21', difficulty: this._difficulties[0] },
                        { duration: '3', difficulty: this._difficulties[1] }
                    ] },
                { date: '11/02/2018', fragments: [
                        { duration: '27', difficulty: this._difficulties[2] },
                        { duration: '15', difficulty: this._difficulties[1] }
                    ] },
                { date: '13/02/2018', fragments: [
                        { duration: '3', difficulty: this._difficulties[0] },
                        { duration: '9', difficulty: this._difficulties[1] },
                        { duration: '21', difficulty: this._difficulties[2] },
                        { duration: '18', difficulty: this._difficulties[1] }
                    ] }
            ];
        }
    };
    HelloIonicPage.prototype.QuitStats = function () {
        this._on_stats = false;
        this._on_v1stats = false;
        this._on_v2stats = false;
    };
    return HelloIonicPage;
}()); //HelloIonicPage
HelloIonicPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-hello-ionic',template:/*ion-inline-start:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\hello-ionic\hello-ionic.html"*/'<ion-header id="navbar">\n\n  <ion-navbar (click)=\'ChangeVersion()\'>\n\n    <ion-title>{{_page_title}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div *ngIf="!_on_stats">\n\n    <h3>{{_time_text}}</h3>\n\n\n\n    <h5 *ngIf="numberOfRuns"><i>{{ numberOfRuns }} run(s).</i></h5>\n\n\n\n    <button ion-button color="primary" (click)=\'ToggleTimer()\'>{{_button_text}}</button>\n\n    \n\n    <div *ngIf="error" class="alert alert-danger">\n\n      {{ errorMsg }}\n\n    </div>\n\n\n\n    <div id="results">\n\n      <h3 class="result">{{_result_title}}</h3>\n\n      <h4 *ngIf="difficulty != null" [ngClass]="{\'easy\': difficulty == \'easy\', \'medium\': difficulty == \'medium\', \'hard\': difficulty == \'hard\'}">\n\n          {{ difficulty.toUpperCase() }}\n\n      </h4>\n\n\n\n      <p *ngFor="let res of _v2results" class="v2result">\n\n          For {{res.time}} minutes it was {{res.difficulty}}\n\n      </p>\n\n    </div> \n\n\n\n    <div id="data-check">\n\n      <h3>Data check</h3>\n\n      <p>Start position :lat: {{_start_lat}} , lng: {{_start_lon}}</p>\n\n      <p>End position : lat: {{_end_lat}} , lng: {{_end_lon}}</p>\n\n      <p>UDID: {{_udid}}</p>\n\n    </div>  \n\n    <button ion-button color="primary" (click)=\'ShowStats()\'>STATS</button>\n\n  </div>\n\n\n\n  <div *ngIf="_on_stats">\n\n    <h3 >Stats</h3> \n\n    <div *ngIf="_on_v1stats">    \n\n      <p *ngFor="let stat of _v1_stats">\n\n          {{stat.date}}, you ran {{stat.duration}} minutes, it was {{stat.difficulty}}\n\n      </p>\n\n    </div>\n\n    <div *ngIf="_on_v2stats">\n\n        <h5>7/02/2018, you ran 36 minutes</h5>\n\n          <p>for 15, minutes it was medium 💪</p>\n\n          <p>for 9, minutes it was easy 👌 </p>\n\n          <p>for 12, minutes it was hard 🙏</p>\n\n          \n\n\n\n        <h5>11/02/2018, you ran 48 minutes</h5>\n\n        <p>for 18, minutes it was medium 💪</p>\n\n        <p>for 30, minutes it was hard 🙏</p>\n\n        \n\n\n\n        <h5>13/02/2018, you ran 30 minutes</h5>\n\n        <p>for 3, minutes it was easy 👌</p>\n\n        <p>for 9, minutes it was medium 💪 </p>\n\n        <p>for 6, minutes it was hard 🙏</p>\n\n        <p>for 12, minutes it was medium 💪</p>\n\n        \n\n        \n\n    </div>\n\n    <button ion-button color="primary" (click)=\'QuitStats()\'>BACK</button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\hello-ionic\hello-ionic.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object])
], HelloIonicPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=hello-ionic.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__item_details_item_details__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListPage = (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__item_details_item_details__["a" /* ItemDetailsPage */], {
            item: item
        });
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>My First List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon name="{{item.icon}}" item-left></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-right>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ItemDetailsPage = (function () {
    function ItemDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
    }
    return ItemDetailsPage;
}());
ItemDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-item-details',template:/*ion-inline-start:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\item-details\item-details.html"*/'<ion-header>\n  <ion-navbar>\n    <button menuToggle *ngIf="!selectedItem">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Item Details</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <h3 text-center *ngIf="selectedItem">\n    {{selectedItem.title}}\n    <ion-icon [name]="selectedItem.icon"></ion-icon>\n  </h3>\n  <h4 text-center *ngIf="selectedItem">\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </h4>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\pages\item-details\item-details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], ItemDetailsPage);

//# sourceMappingURL=item-details.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(217);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_hello_ionic_hello_ionic__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_item_details_item_details__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_list_list__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_http__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_item_details_item_details__["a" /* ItemDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_list_list__["a" /* ListPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_hello_ionic_hello_ionic__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_list_list__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, menu, statusBar, splashScreen) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        // make HelloIonicPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */];
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Hello Ionic', component: __WEBPACK_IMPORTED_MODULE_2__pages_hello_ionic_hello_ionic__["a" /* HelloIonicPage */] },
            { title: 'My First List', component: __WEBPACK_IMPORTED_MODULE_3__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\app\app.html"*/'\n\n<ion-menu [content]="content">\n\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Pages</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Users\Rémy Kaloustian\Desktop\WORK\MOBILE\EZRun\EZRunApp\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map