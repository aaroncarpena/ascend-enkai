<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Municipio;

class MunicipioApiController extends Controller
{
    public function index()
    {
        return Municipio::with('provincia.pais')
            ->orderBy('nombre')
            ->get();
    }
}
