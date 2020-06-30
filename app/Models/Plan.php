<?php

namespace App\Models;

class Plan extends BaseModel
{
    //

    public function getPriceAttribute($value)
    {
    	return number_format($value, 2);
    }
}
