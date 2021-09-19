<?php

namespace App\Service;

use App\Entity\CryptoConversion;
use Doctrine\ORM\EntityManagerInterface;

class CryptoConverterLogger
{
    private EntityManagerInterface $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function log(string $from, string $to, float $amount, float $result): void
    {
        $conversion = new CryptoConversion();

        $conversion
            ->setCurrencyFrom($from)
            ->setCurrencyTo($to)
            ->setAmount($amount)
            ->setResult($result)
        ;

        $this->entityManager->persist($conversion);
        $this->entityManager->flush();
    }
}
