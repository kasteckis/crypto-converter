<?php

namespace App\Repository;

use App\Entity\CryptoConversion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CryptoConversion|null find($id, $lockMode = null, $lockVersion = null)
 * @method CryptoConversion|null findOneBy(array $criteria, array $orderBy = null)
 * @method CryptoConversion[]    findAll()
 * @method CryptoConversion[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CryptoConversionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CryptoConversion::class);
    }

    // /**
    //  * @return CryptoConversion[] Returns an array of CryptoConversion objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CryptoConversion
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
