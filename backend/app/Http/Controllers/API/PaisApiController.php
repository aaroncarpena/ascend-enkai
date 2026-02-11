<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Vtiful\Kernel\Excel;

class PaisApiController extends Controller
{
    public function import(){
        Excel::load();
    }
}
