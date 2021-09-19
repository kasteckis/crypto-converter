<?php

namespace App\Service;

use App\Exception\CryptoDoesNotExistException;

class CryptoConverterService
{
    private CryptoConverterLogger $cryptoConverterLogger;

    /**
     * @param CryptoConverterLogger $cryptoConverterLogger
     */
    public function __construct(CryptoConverterLogger $cryptoConverterLogger)
    {
        $this->cryptoConverterLogger = $cryptoConverterLogger;
    }

    public function convert(string $base, float $amount, string $crypto): ?string
    {
        $base = strtoupper($base);
        $crypto = strtoupper($crypto);
        $req_url = $_ENV['CONVERTER_API'] . '?from=' . $base . '&to=' . $crypto;
        $response_json = file_get_contents($req_url);
        if(false !== $response_json) {
            $response = json_decode($response_json);
            if ($response->result) {
                $result = (float)$response->result * $amount;
                $this->cryptoConverterLogger->log($base, $crypto, $amount, $result);
                return $result;
            } else {
                throw new CryptoDoesNotExistException();
            }
        }

        return null;
    }
}
