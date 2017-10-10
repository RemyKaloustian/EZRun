<?php
/**
 * Created by PhpStorm.
 * User: Adrian
 * Date: 10/10/2017
 * Time: 17:46
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RunController extends Controller {

    public function postData(Request $request){
        return response()->json([
            'walkTime' => $request->input('walkTime', 'NONE')
        ]);
    }

}