<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Base\Template_Controller;
use App\Http\Controllers\Base\Language_Controller;
use App\Http\Controllers\Landings\LandingPage_Controller;


// Route::get('/', function () {
//     return view('welcome');
// });




Route::middleware('setLocale')->group(function () { // All routes will be applied with the middleware
    // Route for the landing page
    Route::get('/', [LandingPage_Controller::class, 'index']);
    Route::get('/landing', [LandingPage_Controller::class, 'index']);
    Route::get('/temp', [Template_Controller::class, 'template']);
});

Route::get('/lang/{locale}', [Language_Controller::class, 'switchLanguage'])
    ->name('lang.switch');
