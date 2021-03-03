<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Rennokki\QueryCache\Traits\QueryCacheable;

class BaseModel extends Model
{
    use QueryCacheable;
    public $cacheFor = 3600;
    public $cacheDriver = 'file';
    protected static $flushCacheOnUpdate = true;

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
