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

    public function getAvailableCrypto(): array
    {
        return ['BTC', 'AHG'];
    }

    public function convert(string $base, float $amount, string $crypto): float
    {
        $reqUrl = $_ENV['CONVERTER_API'] . '?from=' . $base . '&to=' . $crypto;

        $responseJson = file_get_contents($reqUrl);
        if (false !== $responseJson) {
            $response = json_decode($responseJson);
            if ($response->result) {
                $result = (float)$response->result * $amount;
                $this->cryptoConverterLogger->log($base, $crypto, $amount, $result);
                return $result;
            } else {
                throw new CryptoDoesNotExistException();
            }
        } else {
            throw new \RuntimeException('Unexpected API result');
        }
    }
}
