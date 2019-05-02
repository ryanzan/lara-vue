<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('api')->group(function (){
    $this->get('search','API\UsersController@search');

});

Route::middleware('auth:api')->group(function () {
    $this->get('profile','API\UsersController@profile');
    $this->put('profile','API\UsersController@updateProfile');
    $this->get('search','API\UsersController@search');
    Route::apiResources([
        'users' => 'API\UsersController'
    ]);
});
