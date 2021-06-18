<?php

namespace App\Models;

use GeneaLabs\LaravelModelCaching\Traits\Cachable;
use Illuminate\Database\Eloquent\Model;

abstract class BaseModel extends Model
{
    use Cachable;
    public $cacheCooldownSeconds = 43200;

    protected function castAttribute($key, $value)
    {
        if (is_null($value)) {
            switch ($this->getCastType($key)) {
                case 'array':
                    return [];

                case 'object':
                    return new \stdClass();
            }
        }

        return parent::castAttribute($key, $value);
    }
}
