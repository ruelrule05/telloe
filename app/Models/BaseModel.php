<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
	
 	protected function castAttribute($key, $value)
    {
        if(is_null($value)) :
            switch($this->getCastType($key)) :
                case 'array':
                    return [];

                case 'object':
                    return new \stdClass();
            endswitch;
        endif;

        return parent::castAttribute($key, $value);
    }
}