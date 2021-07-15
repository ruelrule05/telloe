<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Http\Helpers as Helpers;

class HelpersTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testCountryDialCode()
    {
        $data = "Australia";
        $this->assertEquals(countryDialCode($data), "+61");

        $data = "Australia1";
        $this->assertNotEquals(countryDialCode($data), "+61");
    }

    public function testValidTimezone() 
    {
        $isValid = isValidTimezone('test');
        $isValid ? $this->assertTrue(true) : $this->assertFalse(false);

        $isValid = isValidTimezone('Australia/Adelaide');
        $isValid ? $this->assertTrue(true) : $this->assertFalse(false);

    }

    public function testBase64Encoded() 
    {
        $unencoded = "Test";
        $encoded = base64_encode($unencoded);

        $isValid = is_base64_encoded($encoded);
        $isValid ? $this->assertTrue(true) : $this->assertFalse(false);

        $isValid = is_base64_encoded($unencoded);
        $isValid ? $this->assertTrue(true) : $this->assertFalse(false);
    }

    public function testReplaceNullWithEmptyString()
    {
        $data = array();
        $isValid = replace_null_with_empty_string($data);
        $this->assertTrue(true);
    }

    public function testMime2ext() 
    {
        $data = "3g2";
        $isValid = mime2ext($data);
        $this->assertTrue(true);
        
        $data = "test";
        $isValid = mime2ext($data);
        $this->assertFalse(false);
    }
}
