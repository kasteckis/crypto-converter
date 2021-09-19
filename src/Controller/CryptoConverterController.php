<?php

namespace App\Controller;

use App\Exception\CryptoDoesNotExistException;
use App\Form\ConvertCryptoType;
use App\Service\CryptoConverterService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CryptoConverterController extends AbstractController
{
    private CryptoConverterService $cryptoConverterService;

    /**
     * @param CryptoConverterService $cryptoConverterService
     */
    public function __construct(CryptoConverterService $cryptoConverterService)
    {
        $this->cryptoConverterService = $cryptoConverterService;
    }

    /**
     * @Route("/api/convert", name="api_convert_post", methods={"POST"})
     */
    public function convert(Request $request): Response
    {
        $convertData = json_decode($request->getContent(), true);

        $form = $this->createForm(ConvertCryptoType::class);
        $form->submit($convertData);

        if (!$form->isValid()) {
            return $this->json([
                'success' => false,
                'text' => $form->getErrors(true)->current()->getMessage()
            ]);
        }

        try {
            $convertedAmount = $this->cryptoConverterService->convert($convertData['currency'], $convertData['amount'], $convertData['crypto']);
        } catch (CryptoDoesNotExistException $exception) {
            return $this->json([
                'success' => false,
                'text' => 'Crypto does not exist'
            ]);
        }

        return $this->json([
            'success' => true,
            'converted' => $convertedAmount
        ]);
    }
}
