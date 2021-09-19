<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class ConvertCryptoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('amount', NumberType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Amount cannot be empty'])
                ]
            ])
            ->add('currency', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Currency cannot be empty'])
                ]
            ])
            ->add('crypto', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Crypto cannot be empty'])
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'csrf_protection' => false
        ]);
    }
}
