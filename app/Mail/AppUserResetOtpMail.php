<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AppUserResetOtpMail extends Mailable
{
    use Queueable, SerializesModels;

    public $otp;

    public function __construct($otp)
    {
        $this->otp = $otp;
    }

    public function build()
    {
        return $this->subject('XRent - Kode Verifikasi Lupa Password')
        ->html("
            <h2>Hallo!</h2>
            <p>Ini adalah kode verifikasi untuk reset password:</p>
            <h1>{$this->otp}</h1>
            <p>Kode ini berlaku selama 10 menit.</p>
            <p>Jika Anda tidak merasa melakukan permintaan ini, mohon abaikan email ini.Terimakasih</p>
            <p><h2>X-Rent Indonesia<h2></>
        ");
                    
    }
}
