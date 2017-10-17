<?php
/**
 * Created by PhpStorm.
 * User: Adrian
 * Date: 10/10/2017
 * Time: 17:46
 */

namespace App\Http\Controllers;

use App\Run;
use Illuminate\Http\Request;
use Phpml\Clustering\KMeans;

class RunController extends Controller {

    private static $POS_DELIMITER = ",";
    private static $LEVELS = [
        0 => "Facile",
        1 => "Moyen",
        2 => "Difficile"
    ];

    public function getRunsForUdid($id) {
        return response()->json($this->getAllRunsForUdid($id));
    }

    private function getAllRunsForUdid($udid) {
        return Run::all()->where('udid', $udid);
    }

    private static function getLevelName($level) {
        if ($level < 0 && $level >= count(RunController::$LEVELS))
            return "Inconnu";

        return RunController::$LEVELS[$level];
    }

    private function getDifficultyForRun($run) {
        $runsForKMeans = [];

        foreach ($this->getAllRunsForUdid($run->udid) as $r) {
            $runsForKMeans[] = [
                $r->walk_time,
                $r->speed
            ];
        }

        $currentRunPoint = [$run->walk_time, $run->speed];

        $kmeans = new KMeans(3);
        $clusters = $kmeans->cluster($runsForKMeans);

        $level = -1;

        foreach ($clusters as $i => $c) {
            if (array_search($currentRunPoint, $c) !== false) {
                $level = $i;
                break;
            }
        }

        $levelString = RunController::getLevelName($level);

        return response(["level" => $levelString, "runNumber" => count($runsForKMeans)], 200);
    }

    private function checkForCoordinatesPresents($coor) {
        $coorSplit = explode(RunController::$POS_DELIMITER, $coor);

        // If we dont have 2 coordinates
        if (count($coorSplit) != 2)
            return false;

        // Check if the two coordinates are numerics values
        return is_numeric($coorSplit[0]) && is_numeric($coorSplit[1]);
    }

    public function postData(Request $request) {
        $this->validate($request, [
            'udid'          => 'required',
            'walkTime'      => 'numeric|required',
            'startPosition' => 'required',
            'endPosition'   => 'required',
        ]);

        $RunsForUDID = $this->getAllRunsForUdid($request->input('udid'));

        // Check for the start position
        if (!$this->checkForCoordinatesPresents($request->input('startPosition')))
            return response(["message" => "StartPosition: invalid coordinates."], 400);

        // Check for the end position
        if (!$this->checkForCoordinatesPresents($request->input('endPosition')))
            return response(["message" => "EndPosition: invalid coordinates."], 400);

        $startPos   = explode(RunController::$POS_DELIMITER, $request->input('startPosition'));
        $endPos     = explode(RunController::$POS_DELIMITER, $request->input('endPosition'));

        $run = new Run;
        $run->udid      = $request->input('udid');
        $run->walk_time = $request->input('walkTime');
        $run->start_lat = $startPos[0];
        $run->start_lng = $startPos[1];
        $run->end_lat   = $endPos[0];
        $run->end_lng   = $endPos[1];

        $run->computeSpeedWithVincentyGreatCircleDistance();

        $run->save();

        return $this->getDifficultyForRun($run->fresh());
    }

}