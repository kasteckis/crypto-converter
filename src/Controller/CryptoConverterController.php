<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CryptoConverterController extends AbstractController
{
    /**
     * @Route("/api/convert", name="api_convert_post", methods={"POST"})
     */
    public function convert(): Response
    {
        return $this->json('converted');
    }
}
