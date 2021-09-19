<?php

namespace App\Helper;

class CryptoFormDataHelper
{
    public static function toUpperCase($cryptoFormData): array
    {
        $cryptoFormData['currency'] = strtoupper($cryptoFormData['currency']);
        $cryptoFormData['crypto'] = strtoupper($cryptoFormData['crypto']);

        return $cryptoFormData;
    }
}
