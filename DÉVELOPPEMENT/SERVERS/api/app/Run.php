<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Run extends Model
{
    protected $fillable = ['udid', 'walk_time', 'start_lat', 'start_lng', 'end_lat', 'end_lng', 'speed'];

    public function computeSpeedWithVincentyGreatCircleDistance($earthRadius = 6371000) {
        // convert from degrees to radians
        $latFrom = deg2rad($this->start_lat);
        $lonFrom = deg2rad($this->start_lng);
        $latTo = deg2rad($this->end_lat);
        $lonTo = deg2rad($this->end_lng);

        $lonDelta = $lonTo - $lonFrom;
        $a = pow(cos($latTo) * sin($lonDelta), 2) +
            pow(cos($latFrom) * sin($latTo) - sin($latFrom) * cos($latTo) * cos($lonDelta), 2);
        $b = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($lonDelta);

        $angle = atan2(sqrt($a), $b);
        $this->speed = $angle * $earthRadius / $this->walk_time;
    }
}
?>